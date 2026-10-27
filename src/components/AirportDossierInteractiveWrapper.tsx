'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AirportBubblesView } from './AirportBubblesView';
import { useLanguage } from '@/lib/i18n';
import { airportPath } from '@/lib/airport-slug';
import { Airport, Language } from '@/types/airport';

interface AirportDossierInteractiveWrapperProps {
  airport: Airport;
  airports: Airport[];
  lang?: Language;
}

export function AirportDossierInteractiveWrapper({
  airport,
  airports
}: AirportDossierInteractiveWrapperProps) {
  const router = useRouter();
  const { lang } = useLanguage();

  const handleBack = () => {
    router.push(lang === 'it' ? '/' : '/en');
  };

  const handleSelectAirport = (selected: Airport) => {
    router.push(airportPath(selected, lang));
  };

  return (
    <div className="w-full">
      <AirportBubblesView
        airport={airport}
        airports={airports}
        onBack={handleBack}
        onSelectAirport={handleSelectAirport}
      />
    </div>
  );
}
