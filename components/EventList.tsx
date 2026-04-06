'use client';

import { Event } from '@/types/event';
import EventCard from '@/components/EventCard';

interface EventListProps {
  events: Event[];
  onEdit?: (event: Event) => void;
  onDelete?: (event: Event) => void;
  onToggleFavorite?: (event: Event) => void;
}

export default function EventList({
  events,
  onEdit = () => {},
  onDelete = () => {},
  onToggleFavorite = () => {},
}: EventListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={() => onEdit(event)}
          onDelete={() => onDelete(event)}
          onToggleFavorite={() => onToggleFavorite(event)}
        />
      ))}
    </div>
  );
}
