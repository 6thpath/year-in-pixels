import React, { createContext, useContext, useReducer } from 'react'

import { authReducer, authInitialState } from './auth'
import { dataReducer, dataInitialState } from './data'
import { uiReducer, uiInitialState } from './ui'

/**
 * Combine initial states
 */
const initialStates = {
  auth: authInitialState,
  data: dataInitialState,
  ui: uiInitialState,
}

/**
 * React context for store
 */
const StoreContext = createContext<typeof initialStates>(initialStates)

/**
 * Combine reducers
 */
const reducers = (selectedStore, action) => ({
  auth: authReducer(selectedStore.auth, action),
  data: dataReducer(selectedStore.data, action),
  ui: uiReducer(selectedStore.ui, action),
})

/**
 * Store context provider
 */
export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={useReducer(reducers, initialStates) as any}>{children}</StoreContext.Provider>
)

/**
 * React hook for consuming store
 */
export const useStore = (): [typeof initialStates, (arg: { type: string; payload: any }) => void] =>
  useContext(StoreContext) as any
