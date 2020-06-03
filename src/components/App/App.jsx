import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { message } from 'antd'

import { useWindowSize } from 'hooks/useWindowSize'
import { useStore } from 'store'
import { SET_AUTH_USER, CLEAR_AUTH_USER } from 'store/auth'
import { SET_IS_DESKTOP } from 'store/ui'
import { firebase, getUsersProfile } from 'utils/firebase'
import theme from 'theme'

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
        dispatch({ type: CLEAR_AUTH_USER })
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

      <ScrollToTop>
        <Switch>
          {auth?.user ? <Route exact render={() => <AppLayout />} /> : <Route exact render={() => <AuthLayout />} />}
        </Switch>
      </ScrollToTop>
    </Router>
  )
}

export default App
