import EventList from '@/components/EventList';
import EmptyState from '@/components/EmptyState';

export default function FavoritesPage() {
  // Placeholder — wire up favorites filtering here
  const favorites = [] as Parameters<typeof EventList>[0]['events'];

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Favorites</h1>
        <p className="text-sm text-gray-500 mt-0.5">Events you&apos;ve starred</p>
      </div>

      {/* List or empty state */}
      {favorites.length === 0 ? (
        <EmptyState
          message="No favorites yet. Star events to save them here."
        />
      ) : (
        <EventList events={favorites} />
      )}
    </div>
  );
}
