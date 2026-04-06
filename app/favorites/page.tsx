import { Suspense } from 'react';
import FavoritesContent from '../_components/FavoritesContent';

export default function FavoritesPage() {
  return (
    <Suspense>
      <FavoritesContent />
    </Suspense>
  );
}
