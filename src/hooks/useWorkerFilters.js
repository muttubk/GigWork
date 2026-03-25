import { useState, useMemo } from 'react'
import { ALL_WORKERS } from '../constants'

const DEFAULT_FILTERS = {
  search:       '',
  category:     'All',
  city:         'All',
  minRate:      0,
  maxRate:      5000,
  availability: 'all',  // 'all' | 'now' | 'today' | 'week'
  sortBy:       'rating', // 'rating' | 'rate_low' | 'rate_high' | 'reviews'
}

export function useWorkerFilters() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }))

  const resetFilters = () => setFilters(DEFAULT_FILTERS)

  const filtered = useMemo(() => {
    let result = [...ALL_WORKERS]

    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.role.toLowerCase().includes(q) ||
          w.skills.some((s) => s.toLowerCase().includes(q))
      )
    }

    // Category
    if (filters.category !== 'All') {
      result = result.filter((w) => w.category === filters.category)
    }

    // City
    if (filters.city !== 'All') {
      result = result.filter((w) => w.city === filters.city)
    }

    // Rate range
    result = result.filter(
      (w) => w.hourlyRate >= filters.minRate && w.hourlyRate <= filters.maxRate
    )

    // Availability
    if (filters.availability !== 'all') {
      const order = { now: 0, today: 1, week: 2 }
      const threshold = order[filters.availability]
      result = result.filter((w) => order[w.available] <= threshold)
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rate_low':  return a.hourlyRate - b.hourlyRate
        case 'rate_high': return b.hourlyRate - a.hourlyRate
        case 'reviews':   return b.reviews - a.reviews
        default:          return b.rating - a.rating
      }
    })

    return result
  }, [filters])

  return { filters, updateFilter, resetFilters, filtered }
}
