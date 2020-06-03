/**
 * Actions types
 */
export const SET_AUTH_USER = 'SET_AUTH_USER'
export const SET_TOKEN = 'SET_TOKEN'
export const CLEAR_AUTH_USER = 'CLEAR_AUTH_USER'

/**
 * Initial State
 */
export const authInitialState = {
  user: null,
  token: null,
}

interface IAction {
  type: string
  payload: any
}

/**
 * Reducer
 */
export const authReducer = (state = authInitialState, action: IAction) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        user: action.payload?.user,
        token: action.payload?.token,
      }

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }

    case CLEAR_AUTH_USER: {
      return {
        ...state,
        ...authInitialState,
      }
    }

    default:
      return state
  }
}
