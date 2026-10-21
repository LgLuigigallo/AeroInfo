'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { AirportDetail } from '@/components/AirportDetail';
import { Footer } from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/lib/i18n';
import { airportsData } from '@/data/airports';
import { Airport } from '@/types/airport';

function MainContent() {
  const { lang, t } = useLanguage();
  const [airports, setAirports] = useState<Airport[]>(airportsData);
  const defaultAirport = airportsData.find((a) => a.iata.toUpperCase() === 'FCO') || airportsData[0];
  const [selectedAirport, setSelectedAirport] = useState<Airport>(defaultAirport);

  // Fetch live airports dynamically from Supabase / API
  const refreshLiveAirports = useCallback(async (): Promise<Airport[]> => {
    try {
      const res = await fetch('/api/airports');
      const data = await res.json();
      if (data?.airports && Array.isArray(data.airports) && data.airports.length > 0) {
        setAirports(data.airports);
        return data.airports;
      }
    } catch (err) {
      console.warn('Failed to refresh live airports:', err);
    }
    return airportsData;
  }, []);

  // Read URL query parameter on mount and sync with live data
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

    // Load live database catalogue
    refreshLiveAirports().then((liveList) => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const airportParam = params.get('airport');
        if (airportParam && liveList) {
          const found = liveList.find(
            (a) => a.iata.toLowerCase() === airportParam.toLowerCase() || a.id.toLowerCase() === airportParam.toLowerCase()
          );
          if (found) {
            setSelectedAirport(found);
          }
        }
      }
    });
  }, [refreshLiveAirports]);

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
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16 space-y-8">
        {/* Editorial Aviation Briefing Header & Search Console */}
        <section className="text-center space-y-4 pt-2">
          {/* Subtle System Status Ticker */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-600 dark:text-zinc-300 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-tight uppercase">
              {lang === 'it' ? 'Database Ufficiale • Aggiornamento Continuo 24h' : 'Official Database • 24h Continuous Sync'}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white max-w-3xl mx-auto leading-tight">
              {lang === 'it' ? 'Tutto ciò che devi sapere prima di volare.' : 'Everything you need to know before you fly.'}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto font-normal leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Search Console */}
          <div className="pt-2">
            <SearchBar 
              selectedAirport={selectedAirport} 
              onSelectAirport={handleSelectAirport} 
              airports={airports}
              onRefreshAirports={refreshLiveAirports}
            />
          </div>
        </section>

        {/* Selected Airport Dossier */}
        <section id="airport-details" className="pt-2">
          <AirportDetail 
            airport={selectedAirport} 
            onSelectAirport={(iata) => {
              const found = airports.find(
                (a) => a.iata.toLowerCase() === iata.toLowerCase()
              );
              if (found) {
                handleSelectAirport(found);
              }
            }}
          />
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
