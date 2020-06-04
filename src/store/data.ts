/**
 * Actions types
 */
export const SET_DISPLAY_TYPE = 'SET_DISPLAY_TYPE'
export const SET_DATETIME = 'SET_DATETIME'
export const CLEAR_DATA = 'CLEAR_DATA'

/**
 * Initial State
 */
export const dataInitialState = {
  displayType: 'month',
  selectedDate: null,
}

interface IAction {
  type: string
  payload: any
}

/**
 * Reducer
 */
export const dataReducer = (state = dataInitialState, action: IAction) => {
  switch (action.type) {
    case SET_DISPLAY_TYPE: {
      return {
        ...state,
        displayType: action.payload,
      }
    }

    case SET_DATETIME: {
      return {
        ...state,
        selectedDate: action.payload,
      }
    }

    case CLEAR_DATA: {
      return {
        ...state,
        ...dataInitialState,
      }
    }

    default:
      return state
  }
}
