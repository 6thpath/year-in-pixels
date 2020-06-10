import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { message } from 'antd'

import { useWindowSize } from 'hooks/useWindowSize'
import { useStore } from 'store'
import { SET_AUTH_USER, CLEAR_AUTH_USER } from 'store/auth'
import { CLEAR_DATA } from 'store/data'
import { SET_IS_MOBILE, SET_GLOBAL_MESSAGE, RESET_UI_STORE } from 'store/ui'
import { firebase, getUsersProfile } from 'utils/firebase'
import theme from 'theme'

import Loading from './Loading'
import AuthLayout from 'pages/Auth'
import { GlobalStyle } from './GlobalStyles'
import ScrollToTop from './ScrollToTop'
import AppLayout from './AppLayout'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [{ auth, ui }, dispatch] = useStore()

  const windowSize = useWindowSize()
  const isMobile = windowSize.width <= parseInt(theme.screen.sm, 10)

  useEffect(() => {
    dispatch({ type: SET_IS_MOBILE, payload: isMobile })
  }, [dispatch, isMobile])

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: SET_AUTH_USER, payload: { user: getUsersProfile(authUser) } })
      } else {
        // User is signed out.
        window.localStorage.removeItem('accessToken')
        dispatch({ type: CLEAR_AUTH_USER })
        dispatch({ type: CLEAR_DATA })
        dispatch({ type: RESET_UI_STORE })
      }

      setLoading(false)
    })
  }, [dispatch])

  useEffect(() => {
    let hideFunction

    if (ui.globalMessage && ui.globalMessageType) {
      const duration = ui.globalMessageType === 'success' ? 2 : ui.globalMessageType === 'error' ? 4 : 3

      hideFunction = message[ui.globalMessageType](ui.globalMessage, duration, () =>
        dispatch({ type: SET_GLOBAL_MESSAGE, payload: { message: '', type: '' } })
      )
    } else if (typeof hideFunction === 'function' && !ui.globalMessage) {
      hideFunction()
    }

    return () => {
      if (typeof hideFunction === 'function') hideFunction()
    }
  }, [dispatch, ui.globalMessage, ui.globalMessageType])

  if (loading) return <Loading />

  return (
    <Router>
      <GlobalStyle />

      <ScrollToTop>
        <Switch>{auth?.user ? <Route exact component={AppLayout} /> : <Route exact component={AuthLayout} />}</Switch>
      </ScrollToTop>
    </Router>
  )
}

export default App
