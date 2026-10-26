'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from './Header';
import { AirportBubblesView } from './AirportBubblesView';
import { LanguageProvider, useLanguage } from '@/lib/i18n';
import { airportPath } from '@/lib/airport-slug';
import { Airport, Language } from '@/types/airport';

interface AirportDossierInteractiveWrapperProps {
  airport: Airport;
  airports: Airport[];
  lang: Language;
}

function InnerInteractive({ airport, airports, lang }: AirportDossierInteractiveWrapperProps) {
  const router = useRouter();

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

export function AirportDossierInteractiveWrapper(props: AirportDossierInteractiveWrapperProps) {
  return (
    <LanguageProvider>
      <InnerInteractive {...props} />
    </LanguageProvider>
  );
}
