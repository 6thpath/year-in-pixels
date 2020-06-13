import { createGlobalStyle, css } from 'styled-components'

import theme from 'theme'

const scrollCss = css`
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

/** Global styles for the application */
export const GlobalStyle = createGlobalStyle`
  ${scrollCss}

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

    &::-webkit-scrollbar {
      display: none;
    }
  }

  #root {
    min-height: 100%;
    position: relative;
  }

  .styled-pwd-modal {
    .ant-modal-content {
      border-radius: 10px;
      overflow: hidden;
    }
  }

  .styled-mood-modal {
    border-radius: 20px;
  }


  .styled-tooltip-overlay {
    > div {
      > .ant-tooltip-inner {
        border-radius: 4px;
      }
    }
  }
`
