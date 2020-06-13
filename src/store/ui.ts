import { IAction } from './_types'

/**
 * Actions types
 */
export const SET_IS_MOBILE = 'SET_IS_MOBILE'
export const SET_GLOBAL_MESSAGE = 'SET_GLOBAL_MESSAGE'
export const SET_SIDEMENU_VISIBLE = 'SET_SIDEMENU_VISIBLE'
export const SET_MOOD_MODAL_VISIBLE = 'SET_MOOD_MODAL_VISIBLE'
export const SET_TUTORIAL_VISIBLE = 'SET_TUTORIAL_VISIBLE'
export const RESET_UI_STORE = 'RESET_UI_STORE'

const firstAccess = localStorage.getItem('firstAccess') || 'true'

/**
 * Initial State
 */
export const uiInitialState = {
  isMobile: false,
  globalMessage: '',
  globalMessageType: '',
  isSideMenuOpen: false,
  isMoodModalVisible: false,
  firstAccess,
  tutorialVisible: false,
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
        globalMessage: action.payload.message,
        globalMessageType: action.payload.type,
      }
    }

    case SET_SIDEMENU_VISIBLE: {
      return {
        ...state,
        isSideMenuOpen: action.payload,
      }
    }

    case SET_MOOD_MODAL_VISIBLE: {
      return {
        ...state,
        isMoodModalVisible: action.payload,
      }
    }

    case SET_TUTORIAL_VISIBLE: {
      if (firstAccess === 'true') {
        localStorage.setItem('firstAccess', 'false')
      }

      return {
        ...state,
        firstAccess: 'false',
        tutorialVisible: action.payload,
      }
    }

    case RESET_UI_STORE: {
      const { isMobile, ...restUIInitialState } = uiInitialState

      return {
        ...state,
        ...restUIInitialState,
      }
    }

    default:
      return state
  }
}
