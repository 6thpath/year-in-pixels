import { IAction } from './_types'

/**
 * Actions types
 */
export const SET_AUTH_USER = 'SET_AUTH_USER'
export const SET_TOKEN = 'SET_TOKEN'
export const RESET_AUTH_STORE = 'RESET_AUTH_STORE'

/**
 * Initial State
 */
export const authInitialState = {
  user: null,
  token: null,
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
      }

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }

    case RESET_AUTH_STORE: {
      return {
        ...state,
        ...authInitialState,
      }
    }

    default:
      return state
  }
}
