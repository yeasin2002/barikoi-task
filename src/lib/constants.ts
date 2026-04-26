export const parseGeolocationError = (error: GeolocationPositionError) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return 'Permission denied.'
    case error.POSITION_UNAVAILABLE:
      return 'Location unavailable.'
    case error.TIMEOUT:
      return 'Location request timed out.'
    default:
      return 'Failed to determine your location.'
  }
}

export const geolocationOptions: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 10000,
}

export const isGeolocationSupported = typeof navigator !== 'undefined' && 'geolocation' in navigator