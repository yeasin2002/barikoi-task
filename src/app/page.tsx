'use client'

import LocationSearch from '@/components/map/location-search'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { geolocationOptions, isGeolocationSupported, mapKey, parseGeolocationError } from '@/lib'
import { setIsPopupOpen } from '@/redux/features/location-search-slice'
import { LoaderCircle, LocateFixed } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Map, Marker, NavigationControl, Popup, type MapRef } from 'react-bkoi-gl'
import 'react-bkoi-gl/styles'
import { MissingEnvWarning } from '../components/missing-env-warning'

type UserLocation = {
  longitude: number
  latitude: number
}

const dhakaViewState = {
  longitude: 90.4071,
  latitude: 23.7925,
  zoom: 12,
}

export default function RootPage() {
  const dispatch = useAppDispatch()
  const mapRef = useRef<MapRef | null>(null)
  const hasRequestedLocationRef = useRef(false)
  const selectedLocation = useAppSelector((state) => state.locationSearch.selectedLocation)
  const isPopupOpen = useAppSelector((state) => state.locationSearch.isPopupOpen)
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [isLocating, setIsLocating] = useState(false)

  const locateUser = useCallback((shouldFocusMap: boolean) => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      return
    }

    setIsLocating(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextLocation = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        }

        setUserLocation(nextLocation)
        setIsLocating(false)

        if (shouldFocusMap) {
          mapRef.current?.flyTo({
            center: [nextLocation.longitude, nextLocation.latitude],
            zoom: 16,
            essential: true,
            duration: 1200,
          })
        }
      },
      (error) => {
        setUserLocation(null)
        setIsLocating(false)

        if (error.code !== error.PERMISSION_DENIED) {
          console.error(parseGeolocationError(error), error)
        }
      },
      geolocationOptions
    )
  }, [])

  useEffect(() => {
    if (hasRequestedLocationRef.current) {
      return
    }

    hasRequestedLocationRef.current = true
    locateUser(true)
  }, [locateUser])

  useEffect(() => {
    const nextCenter = selectedLocation
      ? {
          center: [selectedLocation.longitude, selectedLocation.latitude] as [number, number],
          zoom: 15,
        }
      : {
          center: [dhakaViewState.longitude, dhakaViewState.latitude] as [number, number],
          zoom: dhakaViewState.zoom,
        }

    mapRef.current?.flyTo({
      ...nextCenter,
      essential: true,
      duration: 1200,
    })
  }, [selectedLocation])

  if (!mapKey) return <MissingEnvWarning />

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-slate-950">
      <LocationSearch />
      <button
        aria-label="Use my current location"
        className="pointer-events-auto absolute right-4 bottom-20 z-20 flex size-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:right-6 sm:bottom-6"
        disabled={isLocating || !isGeolocationSupported}
        onClick={() => locateUser(true)}
        type="button"
        title={isGeolocationSupported ? 'Use my current location' : 'Geolocation is not supported'}
      >
        {isLocating ? (
          <LoaderCircle className="size-5 animate-spin" />
        ) : (
          <LocateFixed className="size-5" />
        )}
      </button>
      <Map
        ref={mapRef}
        mapStyle={`https://map.barikoi.com/styles/osm-liberty/style.json?key=${mapKey}`}
        initialViewState={dhakaViewState}
        style={{ width: '100%', height: '100%' }}
        reuseMaps
      >
        <NavigationControl position="top-right" />

        {userLocation ? (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
            anchor="bottom"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute size-8 animate-ping rounded-full bg-sky-500/30" />
              <span className="size-3 rounded-full border-2 border-white bg-sky-600 shadow-[0_2px_6px_rgba(0,0,0,0.35)]" />
            </div>
          </Marker>
        ) : null}

        {selectedLocation ? (
          <>
            <Marker
              longitude={selectedLocation.longitude}
              latitude={selectedLocation.latitude}
              color="#2563eb"
              onClick={() => dispatch(setIsPopupOpen(true))}
            />
            {isPopupOpen ? (
              <Popup
                anchor="bottom"
                closeButton={true}
                closeOnClick={false}
                longitude={selectedLocation.longitude}
                latitude={selectedLocation.latitude}
                maxWidth="260px"
                offset={18}
                onClose={() => dispatch(setIsPopupOpen(false))}
              >
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {selectedLocation.placeName}
                  </p>
                  <p className="text-xs leading-5 text-slate-600">{selectedLocation.address}</p>
                </div>
              </Popup>
            ) : null}
          </>
        ) : null}
      </Map>
    </main>
  )
}
