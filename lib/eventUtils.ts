import { Category, Status } from '@/types/event';

export const categoryStyles: Record<Category, string> = {
  Conference: 'bg-indigo-100 text-indigo-700',
  Webinar: 'bg-purple-100 text-purple-700',
  Meeting: 'bg-teal-100 text-teal-700',
};

export const statusStyles: Record<Status, string> = {
  Planned: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
};

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
