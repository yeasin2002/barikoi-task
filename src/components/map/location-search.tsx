'use client'

import SuggestionList from '@/components/map/suggestion-list'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/hooks'
import {
  resetLocationSearchState,
  setErrorMessage,
  setQuery,
  setResults,
  setSelectedLocation,
  setStatus,
} from '@/redux/features/location-search-slice'
import type { LocationSuggestion } from '@/types/location'
import { LoaderCircle, Search, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

type SearchResponse = {
  places: LocationSuggestion[]
  error?: string
}

export default function LocationSearch() {
  const dispatch = useAppDispatch()
  const { errorMessage, query, results, status } = useAppSelector((state) => state.locationSearch)
  const [activeIndex, setActiveIndex] = useState(-1)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (trimmedQuery.length < 1) {
      abortRef.current?.abort()
      dispatch(setResults([]))
      dispatch(setStatus('idle'))
      dispatch(setErrorMessage(null))
      return
    }

    const timeoutId = window.setTimeout(async () => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      dispatch(setStatus('loading'))
      dispatch(setErrorMessage(null))

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}`, {
          signal: controller.signal,
        })
        const data = (await response.json()) as SearchResponse

        if (!response.ok) {
          throw new Error(data.error ?? 'Failed to search locations.')
        }

        dispatch(setResults(data.places))
        dispatch(setStatus('success'))
        setActiveIndex(data.places.length > 0 ? 0 : -1)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        dispatch(setResults([]))
        dispatch(setStatus('error'))
        dispatch(
          setErrorMessage(error instanceof Error ? error.message : 'Failed to search locations.')
        )
        setActiveIndex(-1)
      }
    }, 300)

    return () => {
      window.clearTimeout(timeoutId)
      abortRef.current?.abort()
    }
  }, [dispatch, query])

  const handleClear = () => {
    abortRef.current?.abort()
    dispatch(resetLocationSearchState())
    setActiveIndex(-1)
  }

  const handleSelect = (location: LocationSuggestion) => {
    dispatch(setQuery(location.placeName))
    dispatch(setSelectedLocation(location))
    dispatch(setResults([]))
    dispatch(setStatus('idle'))
    dispatch(setErrorMessage(null))
    setActiveIndex(-1)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((currentIndex) => {
        if (currentIndex >= results.length - 1) {
          return 0
        }

        return currentIndex + 1
      })
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((currentIndex) => {
        if (currentIndex <= 0) {
          return results.length - 1
        }

        return currentIndex - 1
      })
      return
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      handleSelect(results[activeIndex])
    }
  }

  return (
    <div className="pointer-events-auto absolute top-4 left-4 z-10 w-[calc(100%-2rem)] max-w-md space-y-2 sm:top-6 sm:left-6">
      <label className="sr-only" htmlFor="location-search">
        Search for a location
      </label>
      <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-slate-950/92 p-2 shadow-2xl backdrop-blur-md">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/8 text-slate-300">
          {status === 'loading' ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
        </div>
        <Input
          autoComplete="off"
          className="h-9 border-0 bg-transparent px-0 text-sm text-white placeholder:text-slate-400 focus-visible:ring-0 dark:bg-transparent"
          id="location-search"
          onChange={(event) => dispatch(setQuery(event.target.value))}
          onKeyDown={handleKeyDown}
          placeholder="Search places..."
          value={query}
        />
        {query ? (
          <Button
            aria-label="Clear search"
            className="text-slate-300 hover:text-white"
            onClick={handleClear}
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        ) : null}
      </div>

      <SuggestionList
        activeIndex={activeIndex}
        errorMessage={errorMessage}
        onSelect={handleSelect}
        results={results}
        status={status}
      />
    </div>
  )
}
