import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { useWindowSize } from 'hooks/useWindowSize'
import { useStore } from 'store'
import { SET_AUTH_USER, CLEAR_AUTH_USER } from 'store/auth'
import { SET_IS_DESKTOP } from 'store/ui'
import { firebase } from 'utils/firebase'
import theme from 'theme'

import AuthLayout from 'pages/Auth'
import { GlobalStyle } from './GlobalStyles'
import ScrollToTop from './ScrollToTop'
import AppLayout from './AppLayout'

const App = () => {
  const [{ auth }, dispatch] = useStore()

  const windowSize = useWindowSize()
  const isDesktop = windowSize.width >= parseInt(theme.screen.md, 10)

  useEffect(() => {
    dispatch({ type: SET_IS_DESKTOP, payload: { isDesktop } })
  }, [dispatch, isDesktop])

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: SET_AUTH_USER, payload: authUser })
      } else {
        // User is signed out.
        console.log('signed out')
        dispatch({ type: CLEAR_AUTH_USER })
      }
    })
  }, [dispatch])

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
