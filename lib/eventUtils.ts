import { Category, Status, Event } from '@/types/event';

export const categoryStyles: Record<Category, string> = {
  Conference: 'bg-indigo-100 text-indigo-700',
  Webinar: 'bg-purple-100 text-purple-700',
  Meeting: 'bg-teal-100 text-teal-700',
};

export const statusStyles: Record<Status, string> = {
  Planned: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
};

export function exportEventsToJson(events: Event[], filename = 'events.json') {
  const blob = new Blob([JSON.stringify(events, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}
