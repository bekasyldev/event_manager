import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Event } from '@/types/event';
import { mockEvents } from '@/lib/mockData';
import { PAGE_SIZE } from '@/lib/constants';

interface Filters {
  search: string;
  category: string;
  status: string;
  sortBy: 'date' | 'title';
  sortOrder: 'asc' | 'desc';
}

interface EventStore {
  events: Event[];
  filters: Filters;
  currentPage: number;

  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: number, data: Partial<Event>) => void;
  deleteEvent: (id: number) => void;
  toggleFavorite: (id: number) => void;
  setFilter: (key: keyof Filters, value: string) => void;
  setPage: (page: number) => void;

  getFilteredEvents: () => Event[];
  getPaginatedEvents: () => Event[];
  getTotalPages: () => number;
}

export const useEventStore = create<EventStore>()(
  persist(
    (set, get) => ({
      events: mockEvents,
      filters: {
        search: '',
        category: '',
        status: '',
        sortBy: 'date',
        sortOrder: 'asc',
      },
      currentPage: 1,

      addEvent: (data) =>
        set((state) => ({
          events: [...state.events, { ...data, id: Date.now(), isFavorite: false }],
        })),

      updateEvent: (id, data) =>
        set((state) => ({
          events: state.events.map((e) => (e.id === id ? { ...e, ...data } : e)),
        })),

      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, isFavorite: !e.isFavorite } : e,
          ),
        })),

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
          currentPage: 1,
        })),

      setPage: (page) => set({ currentPage: page }),

      getFilteredEvents: () => {
        const { events, filters } = get();
        let result = [...events];

        if (filters.search)
          result = result.filter(
            (e) =>
              e.title.toLowerCase().includes(filters.search.toLowerCase()) ||
              e.description?.toLowerCase().includes(filters.search.toLowerCase()),
          );

        if (filters.category)
          result = result.filter((e) => e.category === filters.category);

        if (filters.status)
          result = result.filter((e) => e.status === filters.status);

        result.sort((a, b) => {
          if (filters.sortBy === 'date') {
            return filters.sortOrder === 'asc'
              ? new Date(a.date).getTime() - new Date(b.date).getTime()
              : new Date(b.date).getTime() - new Date(a.date).getTime();
          }
          return filters.sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        });

        return result;
      },

      getPaginatedEvents: () => {
        const { currentPage } = get();
        const filtered = get().getFilteredEvents();
        const start = (currentPage - 1) * PAGE_SIZE;
        return filtered.slice(start, start + PAGE_SIZE);
      },

      getTotalPages: () => {
        const filtered = get().getFilteredEvents();
        return Math.ceil(filtered.length / PAGE_SIZE);
      },
    }),
    { name: 'event-store' },
  ),
);
