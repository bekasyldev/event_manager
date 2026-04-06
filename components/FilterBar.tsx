'use client';

import { useFilters, sortOptions, SortOption } from '@/hooks/useFilters';
import { CATEGORIES, STATUSES } from '@/lib/constants';

const sortLabels: Record<SortOption, string> = {
  'date-asc': 'Date ↑',
  'date-desc': 'Date ↓',
  'title-asc': 'Title A–Z',
  'title-desc': 'Title Z–A',
};

export default function FilterBar() {
  const [filters, setFilters] = useFilters();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      <div className="relative flex-1 min-w-[180px]">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search events…"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value || null })}
          aria-label="Search events"
          className="w-full pl-9 pr-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <select
        value={filters.category ?? ''}
        onChange={(e) => setFilters({ category: (e.target.value as typeof filters.category) || null })}
        aria-label="Filter by category"
        className="px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-pointer"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={filters.status ?? ''}
        onChange={(e) => setFilters({ status: (e.target.value as typeof filters.status) || null })}
        aria-label="Filter by status"
        className="px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-pointer"
      >
        <option value="">All Statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none sm:overflow-visible">
        {sortOptions.map((value) => (
          <button
            key={value}
            onClick={() => setFilters({ sort: value })}
            aria-pressed={filters.sort === value}
            className={`shrink-0 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
              ${
                filters.sort === value
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {sortLabels[value]}
          </button>
        ))}
      </div>
    </div>
  );
}
