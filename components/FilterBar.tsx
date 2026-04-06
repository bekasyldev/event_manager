'use client';

import { Category, Status } from '@/types/event';

type SortOption = 'date-asc' | 'date-desc' | 'title-asc' | 'title-desc';

interface FilterBarProps {
  onSearchChange?: (value: string) => void;
  onCategoryChange?: (value: Category | '') => void;
  onStatusChange?: (value: Status | '') => void;
  onSortChange?: (sort: SortOption) => void;
  activeSort?: SortOption;
}

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Date ↑', value: 'date-asc' },
  { label: 'Date ↓', value: 'date-desc' },
  { label: 'Title A–Z', value: 'title-asc' },
  { label: 'Title Z–A', value: 'title-desc' },
];

export default function FilterBar({
  onSearchChange = () => {},
  onCategoryChange = () => {},
  onStatusChange = () => {},
  onSortChange = () => {},
  activeSort,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      {/* Search */}
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
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search events"
          className="w-full pl-9 pr-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Category select */}
      <select
        onChange={(e) => onCategoryChange(e.target.value as Category | '')}
        defaultValue=""
        aria-label="Filter by category"
        className="px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-pointer"
      >
        <option value="">All Categories</option>
        <option value="Conference">Conference</option>
        <option value="Webinar">Webinar</option>
        <option value="Meeting">Meeting</option>
      </select>

      {/* Status select */}
      <select
        onChange={(e) => onStatusChange(e.target.value as Status | '')}
        defaultValue=""
        aria-label="Filter by status"
        className="px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-pointer"
      >
        <option value="">All Statuses</option>
        <option value="Planned">Planned</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Sort buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none sm:overflow-visible">
        {sortOptions.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onSortChange(value)}
            aria-pressed={activeSort === value}
            className={`shrink-0 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
              ${
                activeSort === value
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
