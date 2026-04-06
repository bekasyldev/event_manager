'use client';

import { useState } from 'react';
import { useEventStore } from '@/store/useEventStore';
import { Event } from '@/types/event';
import EventList from '@/components/EventList';
import EventForm from '@/components/EventForm';
import Modal from '@/components/Modal';
import EmptyState from '@/components/EmptyState';

export default function FavoritesPage() {
  const { getFilteredEvents, updateEvent, deleteEvent, toggleFavorite } = useEventStore();

  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const favorites = getFilteredEvents().filter((e) => e.isFavorite);

  function handleEdit(event: Event) {
    setEditingEvent(event);
  }

  function handleSubmit(data: Partial<Event>) {
    if (editingEvent) {
      updateEvent(editingEvent.id, data);
    }
    setEditingEvent(null);
  }

  function handleDeleteConfirm() {
    if (deletingId !== null) {
      deleteEvent(deletingId);
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Favorites</h1>
        <p className="text-sm text-gray-500 mt-0.5">Events you&apos;ve starred</p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState message="No favorites yet. Star events to save them here." />
      ) : (
        <EventList
          events={favorites}
          onEdit={handleEdit}
          onDelete={(event) => setDeletingId(event.id)}
          onToggleFavorite={(event) => toggleFavorite(event.id)}
        />
      )}

      {editingEvent && (
        <EventForm
          defaultValues={editingEvent}
          onSubmit={handleSubmit}
          onClose={() => setEditingEvent(null)}
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
