import { Suspense } from 'react';
import EventsContent from './_components/EventsContent';

export default function Page() {
  return (
    <Suspense>
      <EventsContent />
    </Suspense>
  );
}
