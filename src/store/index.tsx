import { configureStore } from '@reduxjs/toolkit'
import {reducersMapping} from './slices'

export const store = configureStore({
  reducer: reducersMapping,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch