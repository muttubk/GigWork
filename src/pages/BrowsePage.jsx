import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X, LayoutGrid, List, ChevronDown } from 'lucide-react'
import { useWorkerFilters } from '../hooks/useWorkerFilters'
import { CATEGORIES, CITIES } from '../constants'
import WorkerCard from '../components/ui/WorkerCard'
import WorkerListItem from '../components/ui/WorkerListItem'

const AVAILABILITY_OPTIONS = [
  { value: 'all',   label: 'Any time'       },
  { value: 'now',   label: 'Available now'  },
  { value: 'today', label: 'Available today'},
  { value: 'week',  label: 'This week'      },
]

const SORT_OPTIONS = [
  { value: 'rating',    label: 'Top rated'    },
  { value: 'reviews',   label: 'Most reviews' },
  { value: 'rate_low',  label: 'Rate: low–high'},
  { value: 'rate_high', label: 'Rate: high–low'},
]

export default function BrowsePage() {
  const [searchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')       // 'grid' | 'list'
  const [sidebarOpen, setSidebarOpen] = useState(false)  // mobile sidebar

  const { filters, updateFilter, resetFilters, filtered } = useWorkerFilters()

  // Sync category from URL param on first render
  useState(() => {
    const cat = searchParams.get('category')
    if (cat) updateFilter('category', cat)
  }, [])

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.city !== 'All' ||
    filters.availability !== 'all' ||
    filters.minRate > 0 ||
    filters.maxRate < 5000

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Top search bar ── */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container-page py-3 flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name, role, or skill..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
            {filters.search && (
              <button onClick={() => updateFilter('search', '')} className="text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 text-sm font-medium border border-gray-200 bg-white px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={15} />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-brand-600" />
            )}
          </button>

          {/* View toggle */}
          <div className="hidden sm:flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="container-page py-8 flex gap-8">

        {/* ── Sidebar filters ── */}
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-72 lg:w-64 xl:w-72 flex-shrink-0
          bg-white lg:bg-transparent
          overflow-y-auto lg:overflow-visible
          transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:max-h-[calc(100vh-8rem)] lg:sticky lg:top-32
        `}>
          <div className="p-5 lg:p-0">

            {/* Mobile header */}
            <div className="flex items-center justify-between mb-5 lg:hidden">
              <h2 className="font-medium text-gray-900">Filters</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-400"><X size={20} /></button>
            </div>

            {/* Filter card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-6">

              {/* Reset */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-brand-600 font-medium hover:underline flex items-center gap-1"
                >
                  <X size={11} /> Clear all filters
                </button>
              )}

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Category
                </label>
                <div className="space-y-1">
                  {['All', ...CATEGORIES.map((c) => c.name)].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => updateFilter('category', cat)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                        filters.category === cat
                          ? 'bg-brand-600 text-white font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  City
                </label>
                <div className="relative">
                  <select
                    value={filters.city}
                    onChange={(e) => updateFilter('city', e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 pr-8 outline-none bg-white text-gray-700 appearance-none cursor-pointer focus:border-brand-600 transition-colors"
                  >
                    <option value="All">All cities</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Hourly rate range */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Hourly rate
                </label>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    ₹{filters.minRate.toLocaleString()}
                  </span>
                  <span className="text-gray-300">—</span>
                  <span className="text-sm font-medium text-gray-700">
                    ₹{filters.maxRate >= 5000 ? '5,000+' : filters.maxRate.toLocaleString()}
                  </span>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={0} max={5000} step={100}
                    value={filters.minRate}
                    onChange={(e) => updateFilter('minRate', Number(e.target.value))}
                    className="w-full accent-brand-600"
                  />
                  <input
                    type="range"
                    min={0} max={5000} step={100}
                    value={filters.maxRate}
                    onChange={(e) => updateFilter('maxRate', Number(e.target.value))}
                    className="w-full accent-brand-600"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹0</span><span>₹5,000+</span>
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Availability
                </label>
                <div className="space-y-1">
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateFilter('availability', opt.value)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                        filters.availability === opt.value
                          ? 'bg-brand-600 text-white font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Results area ── */}
        <div className="flex-1 min-w-0">

          {/* Results header */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-900">{filtered.length}</span> workers found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 hidden sm:block">Sort by</span>
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-2 pr-7 outline-none bg-white text-gray-700 appearance-none cursor-pointer focus:border-brand-600 transition-colors"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.category !== 'All' && (
                <FilterChip label={filters.category} onRemove={() => updateFilter('category', 'All')} />
              )}
              {filters.city !== 'All' && (
                <FilterChip label={filters.city} onRemove={() => updateFilter('city', 'All')} />
              )}
              {filters.availability !== 'all' && (
                <FilterChip
                  label={AVAILABILITY_OPTIONS.find((o) => o.value === filters.availability)?.label}
                  onRemove={() => updateFilter('availability', 'all')}
                />
              )}
              {(filters.minRate > 0 || filters.maxRate < 5000) && (
                <FilterChip
                  label={`₹${filters.minRate}–₹${filters.maxRate >= 5000 ? '5000+' : filters.maxRate}`}
                  onRemove={() => { updateFilter('minRate', 0); updateFilter('maxRate', 5000) }}
                />
              )}
            </div>
          )}

          {/* No results */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="font-serif text-xl font-normal text-gray-900 mb-2">No workers found</h3>
              <p className="text-sm text-gray-400 font-light mb-4">Try adjusting your filters or search term.</p>
              <button
                onClick={resetFilters}
                className="text-sm font-medium text-brand-600 border border-brand-600 px-5 py-2 rounded-full hover:bg-brand-600 hover:text-white transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Grid view */}
          {filtered.length > 0 && viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((w) => (
                <WorkerCard key={w.id} worker={w} />
              ))}
            </div>
          )}

          {/* List view */}
          {filtered.length > 0 && viewMode === 'list' && (
            <div className="flex flex-col gap-3">
              {filtered.map((w) => (
                <WorkerListItem key={w.id} worker={w} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Small reusable filter chip
function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-brand-600 text-white px-3 py-1.5 rounded-full">
      {label}
      <button onClick={onRemove} className="hover:opacity-70">
        <X size={11} />
      </button>
    </span>
  )
}
