/**
 * Actions types
 */
export const SET_IS_DESKTOP = 'SET_IS_DESKTOP'
export const SET_GLOBAL_MESSAGE = 'SET_GLOBAL_MESSAGE'

/**
 * Initial State
 */
export const uiInitialState = {
  isDesktop: false,
  globalMessage: '',
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
    case SET_IS_DESKTOP: {
      return {
        ...state,
        isDesktop: action.payload,
      }
    }

    case SET_GLOBAL_MESSAGE: {
      return {
        ...state,
        globalMessage: action.payload,
      }
    }

    default:
      return state
  }
}
