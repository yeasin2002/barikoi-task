import { configureStore } from '@reduxjs/toolkit'
import locationSearchReducer from '@/lib/features/location-search-slice'

export const makeStore = () =>
  configureStore({
    reducer: {
      locationSearch: locationSearchReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
