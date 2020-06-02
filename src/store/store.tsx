import React, { createContext, useContext, useReducer } from 'react'

import { authReducer, authInitialState } from './auth'
import { uiReducer, uiInitialState } from './ui'

/**
 * Combine initial states
 */
const initialStates = {
  auth: authInitialState,
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
export const useStore = (): [typeof initialStates, (arg: { action: string; payload: any }) => {}] =>
  useContext(StoreContext) as any
