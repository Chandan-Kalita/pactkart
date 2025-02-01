// hooks/useFilterState.ts
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useCallback } from 'react'

interface FilterState {
  page: number
  searchText: string
  category: number
  priceMin: number
  priceMax: number
}

export function useFilterState() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current filters from URL
  const currentFilters = useMemo((): FilterState => ({
    page: Number(searchParams.get('page')) || 1,
    searchText: searchParams.get('searchText') || '',
    category: Number(searchParams.get('category')) || 0,
    priceMin: Number(searchParams.get('priceMin')) || 0,
    priceMax: Number(searchParams.get('priceMax')) || 0
  }), [searchParams])

  // Update filters
  const updateFilters = useCallback((updates: Partial<FilterState>) => {
    const newParams = new URLSearchParams(searchParams)
    
    // Update only changed values
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value.toString())
      } else {
        newParams.delete(key)
      }
    })

    // Update URL
    router.push(`?${newParams.toString()}`)
  }, [router, searchParams])

  return {
    filters: currentFilters,
    updateFilters
  }
}