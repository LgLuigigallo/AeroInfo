import { Suspense } from 'react';
import HomeClient from './HomeClient';
import { IndexableAirportLinks } from '@/components/IndexableAirportLinks';

export default function HomePage() {
  return (
    <>
      <HomeClient />
      <Suspense fallback={null}>
        <IndexableAirportLinks />
      </Suspense>
    </>
  );
}
