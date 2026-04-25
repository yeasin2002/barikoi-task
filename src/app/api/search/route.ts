import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { barikoi } from '@/lib/barikoi'
import type { LocationSuggestion } from '@/types/location'

const searchParamsSchema = z.object({
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

export async function GET(request: NextRequest) {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries())
  const parsedParams = searchParamsSchema.safeParse(searchParams)

  if (!parsedParams.success) {
    return NextResponse.json(
      {
        places: [],
        error: 'Query parameter "q" is required.',
      },
      { status: 400 },
    )
  }

  try {
    const result = await barikoi.autocomplete({
      q: parsedParams.data.q,
      bangla: false,
    })

    const places =
      result.data?.places?.flatMap((place): LocationSuggestion[] => {
        const latitude = parseCoordinate(place.latitude)
        const longitude = parseCoordinate(place.longitude)

        if (latitude === null || longitude === null) {
          return []
        }

        return [
          {
            id: place.id,
            placeName: place.address?.trim() || place.area?.trim() || place.city?.trim() || '',
            address: place.address?.trim() || '',
            area: place.area?.trim() || '',
            city: place.city?.trim() || '',
            latitude,
            longitude,
            uCode: place.uCode,
          },
        ]
      }) ?? []

    return NextResponse.json({ places })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to search locations.'

    return NextResponse.json(
      {
        places: [],
        error: message,
      },
      { status: 500 },
    )
  }
}
