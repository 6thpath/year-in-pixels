import React from 'react'
import ReactDOM from 'react-dom'

// Fonts
import './fonts.less'

// Makes browsers render all elements more consistently and in line with modern standards
import 'normalize.css'

// Theme
import { ThemeProvider } from 'styled-components'
import theme from 'theme'

// Store
import { StoreProvider } from 'store'

// React-helmet
import { HelmetProvider } from 'react-helmet-async'

// Firebase
import 'utils/firebase'

import App from './components/App'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <StoreProvider>
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
