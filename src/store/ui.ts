/**
 * Actions types
 */
export const SET_IS_MOBILE = 'SET_IS_MOBILE'
export const SET_GLOBAL_MESSAGE = 'SET_GLOBAL_MESSAGE'
export const SET_SIDEMENU_STATE = 'SET_SIDEMENU_STATE'

/**
 * Initial State
 */
export const uiInitialState = {
  isMobile: false,
  globalMessage: '',
  isSideMenuOpen: false,
}

interface IAction {
  type: string
  payload: any
}

/**
 * Reducer
 */
export const uiReducer = (state = uiInitialState, action: IAction) => {
  switch (action.type) {
    case SET_IS_MOBILE: {
      return {
        ...state,
        isMobile: action.payload,
      }
    }

    case SET_GLOBAL_MESSAGE: {
      return {
        ...state,
        globalMessage: action.payload,
      }
    }

    case SET_SIDEMENU_STATE: {
      return {
        ...state,
        isSideMenuOpen: action.payload,
      }
    }

    default:
      return state
  }
}
