/**
 * Actions types
 */
export const SET_IS_DESKTOP = 'SET_IS_DESKTOP'

/**
 * Initial State
 */
export const uiInitialState = {
  isDesktop: false,
}

type ActionTypes = 'SET_IS_DESKTOP'
interface IAction {
  payload: any
  type: ActionTypes
}

/**
 * Reducer
 */
export const uiReducer = (state = uiInitialState, action: IAction) => {
  switch (action.type) {
    case SET_IS_DESKTOP: {
      return {
        ...state,
        ...action.payload,
      }
    }

    default:
      return state
  }
}
