import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { LocationSuggestion, SearchRequestStatus } from '@/types/location'

export type LocationSearchState = {
  query: string
  results: LocationSuggestion[]
  selectedLocation: LocationSuggestion | null
  status: SearchRequestStatus
  errorMessage: string | null
  isPopupOpen: boolean
}

export const initialLocationSearchState: LocationSearchState = {
  query: '',
  results: [],
  selectedLocation: null,
  status: 'idle',
  errorMessage: null,
  isPopupOpen: false,
}

const locationSearchSlice = createSlice({
  name: 'locationSearch',
  initialState: initialLocationSearchState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setResults: (state, action: PayloadAction<LocationSuggestion[]>) => {
      state.results = action.payload
    },
    setSelectedLocation: (state, action: PayloadAction<LocationSuggestion | null>) => {
      state.selectedLocation = action.payload
      state.isPopupOpen = action.payload !== null
    },
    setStatus: (state, action: PayloadAction<SearchRequestStatus>) => {
      state.status = action.payload
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload
    },
    setIsPopupOpen: (state, action: PayloadAction<boolean>) => {
      state.isPopupOpen = action.payload
    },
    clearResults: (state) => {
      state.results = []
    },
    clearSelectedLocation: (state) => {
      state.selectedLocation = null
      state.isPopupOpen = false
    },
    resetLocationSearchState: () => initialLocationSearchState,
  },
})

export const {
  clearResults,
  clearSelectedLocation,
  resetLocationSearchState,
  setErrorMessage,
  setIsPopupOpen,
  setQuery,
  setResults,
  setSelectedLocation,
  setStatus,
} = locationSearchSlice.actions

export default locationSearchSlice.reducer
