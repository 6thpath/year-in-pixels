import moment from 'moment'

import { IAction } from './_types'

/**
 * Actions types
 */
export const SET_YEAR = 'SET_YEAR'
export const SET_DATA = 'SET_DATA'
export const RESET_DATA_STORE = 'RESET_DATA_STORE'

/**
 * Initial State
 */
export const dataInitialState = {
  todayDataKey: moment().format('YYYY-MMM-D'),
  selectedYear: moment(),
  data: {},
}

/**
 * Reducer
 */
export const dataReducer = (state = dataInitialState, action: IAction) => {
  switch (action.type) {
    case SET_YEAR: {
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

    case RESET_DATA_STORE: {
      return {
        ...state,
        ...dataInitialState,
      }
    }

    default:
      return state
  }
}
