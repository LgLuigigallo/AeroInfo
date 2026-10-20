'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { AirportDetail } from '@/components/AirportDetail';
import { Footer } from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/lib/i18n';
import { airportsData } from '@/data/airports';
import { Airport } from '@/types/airport';

function MainContent() {
  const { lang, t } = useLanguage();
  const [selectedAirport, setSelectedAirport] = useState<Airport>(airportsData[0]);

  // Read URL query parameter if present on mount (e.g. ?airport=mxp)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const airportParam = params.get('airport');
      if (airportParam) {
        const found = airportsData.find(
          (a) => a.iata.toLowerCase() === airportParam.toLowerCase() || a.id.toLowerCase() === airportParam.toLowerCase()
        );
        if (found) {
          setSelectedAirport(found);
        }
      }
    }
  }, []);

  const handleSelectAirport = (airport: Airport) => {
    setSelectedAirport(airport);
    // Update URL without page reload
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('airport', airport.iata.toLowerCase());
      window.history.pushState({}, '', url.toString());
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-8 pb-16 space-y-10">
        {/* Hero & Search Section */}
        <section className="text-center space-y-4 pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{lang === 'it' ? 'Database Ufficiale Aggiornato' : 'Official Database Updated'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white max-w-2xl mx-auto leading-tight">
            {lang === 'it' ? 'Tutto ciò che devi sapere prima di volare.' : 'Everything you need to know before you fly.'}
          </h2>

          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            {t('tagline')}
          </p>

          <div className="pt-2">
            <SearchBar 
              selectedAirport={selectedAirport} 
              onSelectAirport={handleSelectAirport} 
            />
          </div>
        </section>

        {/* Selected Airport Tabbed Details */}
        <section id="airport-details" className="pt-2">
          <AirportDetail airport={selectedAirport} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
