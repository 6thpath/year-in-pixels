import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { message } from 'antd'

import { useWindowSize } from 'hooks/useWindowSize'
import { useStore } from 'store'
import { SET_AUTH_USER, CLEAR_AUTH_USER } from 'store/auth'
import { CLEAR_DATA } from 'store/data'
import { SET_IS_DESKTOP } from 'store/ui'
import { firebase, getUsersProfile } from 'utils/firebase'
import theme from 'theme'

import { Background } from 'components/Layout'
import AuthLayout from 'pages/Auth'
import { GlobalStyle } from './GlobalStyles'
import ScrollToTop from './ScrollToTop'
import AppLayout from './AppLayout'

const App = () => {
  const [{ auth, ui }, dispatch] = useStore()

  const windowSize = useWindowSize()
  const isDesktop = windowSize.width >= parseInt(theme.screen.md, 10)

  useEffect(() => {
    dispatch({ type: SET_IS_DESKTOP, payload: isDesktop })
  }, [dispatch, isDesktop])

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: SET_AUTH_USER, payload: { user: getUsersProfile(authUser) } })
      } else {
        // User is signed out.
        window.localStorage.removeItem('accessToken')
        dispatch({ type: CLEAR_AUTH_USER })
        dispatch({ type: CLEAR_DATA })
      }
    })
  }, [dispatch])

  useEffect(() => {
    let hideFunction

    if (ui.globalMessage) {
      hideFunction = message.loading(ui.globalMessage, 0)
    } else if (typeof hideFunction === 'function') {
      hideFunction()
    }

    return () => {
      if (typeof hideFunction === 'function') hideFunction()
    }
  }, [ui.globalMessage])

  return (
    <Router>
      <GlobalStyle />
      <Background />

      <ScrollToTop>
        <Switch>{auth?.user ? <Route exact component={AppLayout} /> : <Route exact component={AuthLayout} />}</Switch>
      </ScrollToTop>
    </Router>
  )
}

export default App
