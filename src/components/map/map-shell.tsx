'use client'

import { useEffect, useRef } from 'react'
import { Map, Marker, NavigationControl, Popup, type MapRef } from 'react-bkoi-gl'
import 'react-bkoi-gl/styles'
import LocationSearch from '@/components/map/location-search'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setIsPopupOpen } from '@/redux/features/location-search-slice'

type MapShellProps = {
  mapKey: string
}

const dhakaViewState = {
  longitude: 90.4071,
  latitude: 23.7925,
  zoom: 12,
}

export default function MapShell({ mapKey }: MapShellProps) {
  const dispatch = useAppDispatch()
  const mapRef = useRef<MapRef | null>(null)
  const selectedLocation = useAppSelector((state) => state.locationSearch.selectedLocation)
  const isPopupOpen = useAppSelector((state) => state.locationSearch.isPopupOpen)

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

  if (!mapKey) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-slate-50">
        <div className="max-w-md space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
            Barikoi Location Finder
          </p>
          <h1 className="text-2xl font-semibold">Missing map key</h1>
          <p className="text-sm leading-6 text-slate-300">
            Set `NEXT_PUBLIC_BARIKOI_MAP_KEY` in `.env.local` to load the Barikoi map tiles.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-slate-950">
      <LocationSearch />
      <Map
        ref={mapRef}
        mapStyle={`https://map.barikoi.com/styles/osm-liberty/style.json?key=${mapKey}`}
        initialViewState={dhakaViewState}
        style={{ width: '100%', height: '100%' }}
        reuseMaps
      >
        <NavigationControl position="top-right" />

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
                  <p className="text-sm font-semibold text-slate-900">{selectedLocation.placeName}</p>
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
