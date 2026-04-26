'use server'

import { z } from 'zod'
import { barikoi } from '@/lib/barikoi'
import type { LocationSuggestion } from '@/types/location'

const searchSchema = z.object({
  q: z.string().trim().min(1).max(100),
})

const parseCoordinate = (value: string | number | undefined) => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }

  if (typeof value === 'string') {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }

  return null
}

const normalizePlace = (place: {
  id?: number
  longitude?: string | number
  latitude?: string | number
  address?: string
  area?: string
  city?: string
  uCode?: string
}) => {
  const latitude = parseCoordinate(place.latitude)
  const longitude = parseCoordinate(place.longitude)

  if (latitude === null || longitude === null) {
    return null
  }

  const address = place.address?.trim() ?? ''
  const area = place.area?.trim() ?? ''
  const city = place.city?.trim() ?? ''

  return {
    id: place.id,
    placeName: address || area || city || '',
    address,
    area,
    city,
    latitude,
    longitude,
    uCode: place.uCode,
  } satisfies LocationSuggestion
}

export type SearchLocationsResult = {
  places: LocationSuggestion[]
  error?: string
}

export async function searchLocations(query: string): Promise<SearchLocationsResult> {
  const parsedQuery = searchSchema.safeParse({ q: query })

  if (!parsedQuery.success) {
    return {
      places: [],
      error: 'Query parameter "q" is required.',
    }
  }

  try {
    const result = await barikoi.autocomplete({
      q: parsedQuery.data.q,
      bangla: false,
    })

    return {
      places: result.data?.places?.flatMap((place) => {
        const normalizedPlace = normalizePlace(place)
        return normalizedPlace ? [normalizedPlace] : []
      }) ?? [],
    }
  } catch (error) {
    return {
      places: [],
      error: error instanceof Error ? error.message : 'Failed to search locations.',
    }
  }
}
