'use client';

import { useState, useEffect } from 'react';
import { useEventStore } from '@/store/useEventStore';
import { useFilters } from '@/hooks/useFilters';
import { Event } from '@/types/event';
import FilterBar from '@/components/FilterBar';
import EventList from '@/components/EventList';
import EventForm from '@/components/EventForm';
import Modal from '@/components/Modal';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/Pagination';

export default function EventsPage() {
  const {
    getPaginatedEvents,
    getTotalPages,
    currentPage,
    setPage,
    setFilter,
    addEvent,
    updateEvent,
    deleteEvent,
    toggleFavorite,
  } = useEventStore();

  const [filters] = useFilters();

  const [formOpen, setFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const [sortBy, sortOrder] = filters.sort.split('-') as ['date' | 'title', 'asc' | 'desc'];
    setFilter('search', filters.search);
    setFilter('category', filters.category ?? '');
    setFilter('status', filters.status ?? '');
    setFilter('sortBy', sortBy);
    setFilter('sortOrder', sortOrder);
  }, [filters.search, filters.category, filters.status, filters.sort]);

  const events = getPaginatedEvents();
  const totalPages = getTotalPages();

  function handleSubmit(data: Partial<Event>) {
    if (editingEvent) {
      updateEvent(editingEvent.id, data);
    } else {
      addEvent(data as Omit<Event, 'id'>);
    }
    setFormOpen(false);
    setEditingEvent(null);
  }

  function handleEdit(event: Event) {
    setEditingEvent(event);
    setFormOpen(true);
  }

  function handleDeleteConfirm() {
    if (deletingId !== null) {
      deleteEvent(deletingId);
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Events</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and track all your events</p>
        </div>
        <button
          onClick={() => { setEditingEvent(null); setFormOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Event
        </button>
      </div>

      <FilterBar />

      {events.length === 0 ? (
        <EmptyState
          message="No events found. Try adjusting your filters or add a new event."
          actionLabel="Add Event"
          onAction={() => { setEditingEvent(null); setFormOpen(true); }}
        />
      ) : (
        <>
          <EventList
            events={events}
            onEdit={handleEdit}
            onDelete={(event) => setDeletingId(event.id)}
            onToggleFavorite={(event) => toggleFavorite(event.id)}
          />
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
          )}
        </>
      )}

      {formOpen && (
        <EventForm
          defaultValues={editingEvent ?? undefined}
          onSubmit={handleSubmit}
          onClose={() => { setFormOpen(false); setEditingEvent(null); }}
        />
      )}

      {deletingId !== null && (
        <Modal
          message="Are you sure you want to delete this event? This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
