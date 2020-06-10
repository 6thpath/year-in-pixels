import moment from 'moment'

/**
 * Actions types
 */
export const SET_DATETIME = 'SET_DATETIME'
export const SET_DATA = 'SET_DATA'
export const CLEAR_DATA = 'CLEAR_DATA'

/**
 * Initial State
 */
export const dataInitialState = {
  todayKey: moment().format('YYYY-MMM-D'),
  selectedYear: moment(),
  data: {},
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
    case SET_DATETIME: {
      return {
        ...state,
        selectedYear: action.payload,
      }
    }

    case SET_DATA: {
      return {
        ...state,
        data: action.payload,
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
