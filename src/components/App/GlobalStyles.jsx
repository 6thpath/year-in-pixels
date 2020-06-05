import { createGlobalStyle, css } from 'styled-components'

import background from 'assets/images/background.png'

import theme from 'theme'

const Scroll = css`
  /* width */
  ::-webkit-scrollbar {
    width: 4px;
    height: 8px;
    background: transparent !important;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
    height: 3px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }
`

/**
 * Global styles for the application
 */
export const GlobalStyle = createGlobalStyle`
  ${Scroll}

  html {
    height: 100%;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    font-family: ${theme.font.family};
    color: ${theme.colors.text.primary};
    ${'' /* background-color: ${theme.colors.body}; */}


    &::after {
      background-image: url(${background});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;

      content: "";
      opacity: 0.5;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: -1;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  #root {
    min-height: 100%;
  }
`
