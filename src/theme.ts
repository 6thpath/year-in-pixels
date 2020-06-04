/**
 * Theme for applying consistent styling to the app
 */

export default {
  /**
   * Font
   */
  font: {
    family: `'Quicksand', sans-serif`,
    weight: {
      light: '300',
      normal: '500',
      bold: '600',
    },
    size: {
      tiny: '11px',
      xxs: '13px',
      xs: '14px',
      sm: '16px',
      md: '18px',
      lg: '24px',
      xl: '34px',
    },
  },

  /**
   * Colors
   */
  colors: {
    body: '#f7f7f7',
    black: '#000000',
    white: '#ffffff',

    primary: {
      lighter: '#f4eeff',
      light: '#dcd6f7',
      semi: '#a6b1e1',
      main: '#424874',
      dark: '#363b5e',
      contrastText: '#ffffff',
    },

    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },

    skeleton: {
      background: '#f3f3f3',
      foreground: '#ecebeb',
    },

    error: {
      lighter: '#ffccc7',
      light: '#ffa39e',
      semi: '#ff4d4f',
      main: '#f5222d',
      dark: '#cf1322',
      contrastText: '#ffffff',
    },

    success: {
      lighter: '#d9f7be',
      light: '#b7eb8f',
      semi: '#73d13d',
      main: '#52c41a',
      dark: '#389e0d',
    },

    warning: {
      lighter: '#ffffb8',
      light: '#fffb8f',
      semi: '#ffec3d',
      main: '#fadb14',
      dark: '#d4b106',
    },

    info: {
      lighter: '#bae7ff',
      light: '#91d5ff',
      semi: '#40a9ff',
      main: '#1890ff',
      dark: '#096dd9',
    },

    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },

  /**
   * Shadows
   */
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: 'rgba(0, 0, 0, 0.3) 0px 1px 8px 0px',
    lg: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    xl: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },

  /**
   * Breakpoints
   */
  screen: {
    xs: '540px',
    sm: '640px',
    md: '1007px',
    lg: '1100px',
    xl: '1230px',
  },

  /**
   * Spacing
   */
  spacing: {
    none: 0,
    xxs: '5px',
    xs: '10px',
    sm: '20px',
    md: '30px',
    lg: '40px',
    xl: '60px',
  },

  /**
   * Border radius
   */
  radius: {
    sm: '3px',
    md: '6px',
    lg: '12px',
  },

  /**
   * z-index
   */
  zIndex: {
    background: -1,
    xs: 10,
    sm: 20,
    md: 30,
    lg: 40,
    xl: 50,
  },

  /**
   * Transition
   */
  transition: {
    duration: '0.5s',
  },
}
