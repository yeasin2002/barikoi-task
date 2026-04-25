export type LocationSuggestion = {
  id?: number
  placeName: string
  address: string
  area: string
  city: string
  latitude: number
  longitude: number
  uCode?: string
}

export type SearchRequestStatus = 'idle' | 'loading' | 'success' | 'error'
