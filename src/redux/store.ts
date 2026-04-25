import locationSearchReducer from '@/redux/features/location-search-slice'
import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () =>
  configureStore({
    reducer: {
      locationSearch: locationSearchReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
