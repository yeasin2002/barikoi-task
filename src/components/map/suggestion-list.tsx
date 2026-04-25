'use client'

import { MapPin } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import type { LocationSuggestion, SearchRequestStatus } from '@/types/location'

type SuggestionListProps = {
  activeIndex: number
  errorMessage: string | null
  onSelect: (location: LocationSuggestion) => void
  results: LocationSuggestion[]
  status: SearchRequestStatus
}

export default function SuggestionList({
  activeIndex,
  errorMessage,
  onSelect,
  results,
  status,
}: SuggestionListProps) {
  if (status === 'loading') {
    return (
      <div className="rounded-2xl border border-white/15 bg-slate-950/92 p-4 text-sm text-slate-300 shadow-2xl backdrop-blur-md">
        Searching locations...
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="rounded-2xl border border-red-400/30 bg-slate-950/92 p-4 text-sm text-red-200 shadow-2xl backdrop-blur-md">
        {errorMessage ?? 'Something went wrong while searching.'}
      </div>
    )
  }

  if (status === 'success' && results.length === 0) {
    return (
      <div className="rounded-2xl border border-white/15 bg-slate-950/92 p-4 text-sm text-slate-300 shadow-2xl backdrop-blur-md">
        No locations found.
      </div>
    )
  }

  if (results.length === 0) {
    return null
  }

  return (
    <ul
      aria-label="Location suggestions"
      className="max-h-80 overflow-y-auto rounded-2xl border border-white/15 bg-slate-950/92 p-2 shadow-2xl backdrop-blur-md"
      role="listbox"
    >
      {results.map((result, index) => {
        const isActive = index === activeIndex

        const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
          if (event.key !== 'Enter' && event.key !== ' ') {
            return
          }

          event.preventDefault()
          onSelect(result)
        }

        return (
          <li
            aria-selected={isActive}
            className={`flex cursor-pointer items-start gap-3 rounded-xl px-3 py-3 outline-none transition ${
              isActive ? 'bg-blue-500/20 text-white' : 'text-slate-200 hover:bg-white/8'
            }`}
            key={`${result.uCode ?? result.placeName}-${result.latitude}-${result.longitude}`}
            onClick={() => onSelect(result)}
            onKeyDown={handleKeyDown}
            role="option"
            tabIndex={0}
          >
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-500/18 text-blue-200">
              <MapPin className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{result.placeName}</p>
              <p className="truncate text-xs text-slate-400">
                {[result.area, result.city].filter(Boolean).join(', ')}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
