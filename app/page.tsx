import FilterBar from '@/components/FilterBar';
import EventList from '@/components/EventList';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/Pagination';

export default function EventsPage() {
  // Placeholder — wire up state and handlers here
  const events = [] as Parameters<typeof EventList>[0]['events'];

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Events</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and track all your events</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Event
        </button>
      </div>

      {/* Filters */}
      <FilterBar />

      {/* List or empty state */}
      {events.length === 0 ? (
        <EmptyState
          message="No events yet. Create your first event to get started."
          actionLabel="Add Event"
        />
      ) : (
        <>
          <EventList events={events} />
          <Pagination currentPage={1} totalPages={1} />
        </>
      )}
    </div>
  );
}
