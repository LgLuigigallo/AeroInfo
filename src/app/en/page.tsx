import { Suspense } from 'react';
import HomeClient from '../(it)/HomeClient';
import { IndexableAirportLinks } from '@/components/IndexableAirportLinks';

export default function EnglishHomePage() {
  return (
    <>
      <HomeClient initialLang="en" />
      <Suspense fallback={null}>
        <IndexableAirportLinks />
      </Suspense>
    </>
  );
}
