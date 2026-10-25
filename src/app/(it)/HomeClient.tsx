'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { AirportDetail } from '@/components/AirportDetail';
import { WelcomeView } from '@/components/WelcomeView';
import { CookieConsent } from '@/components/CookieConsent';
import { Footer } from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/lib/i18n';
import { airportsData } from '@/data/airports';
import { Airport } from '@/types/airport';
import { airportPath } from '@/lib/airport-slug';

function MainContent() {
  const router = useRouter();
  const { t } = useLanguage();
  const [airports, setAirports] = useState<Airport[]>(airportsData);
  // Default is null so a clean, beautiful Welcome Page is shown on initial visit
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);

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

  // Hydrate the search catalog after the static first render.
  useEffect(() => {
    let isMounted = true;
    fetch('/api/airports')
      .then((response) => response.json())
      .then((data) => {
        if (isMounted && Array.isArray(data?.airports) && data.airports.length > 0) setAirports(data.airports);
      })
      .catch((err) => console.warn('Failed to load airport catalog:', err));
    return () => { isMounted = false; };
  }, []);

  const handleSelectAirport = (airport: Airport) => {
    setSelectedAirport(airport);
    router.push(airportPath(airport, 'it'));
  };

  const handleResetHome = () => {
    setSelectedAirport(null);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <Header onResetHome={handleResetHome} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16">
        {selectedAirport ? (
          /* Airport Active Dossier View */
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Top Navigation & Fast Switcher Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
              <button
                type="button"
                onClick={handleResetHome}
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>{t('backToOverview')}</span>
              </button>

              <div className="w-full sm:w-80">
                <SearchBar 
                  selectedAirport={selectedAirport} 
                  onSelectAirport={handleSelectAirport} 
                  airports={airports}
                  onRefreshAirports={refreshLiveAirports}
                />
              </div>
            </div>

            {/* Encapsulated Master Airport Dossier Frame */}
            <section id="airport-details" className="pt-1">
              <AirportDetail 
                airport={selectedAirport} 
                onSelectAirport={(iata) => {
                  const found = airports.find(
                    (a) => a.iata.toLowerCase() === iata.toLowerCase()
                  );
                  if (found) handleSelectAirport(found);
                }}
              />
            </section>
          </div>
        ) : (
          /* Clean, High-Impact Welcome Page */
          <WelcomeView airports={airports} onSelectAirport={handleSelectAirport}>
            <SearchBar 
              selectedAirport={null} 
              onSelectAirport={handleSelectAirport} 
              airports={airports}
              onRefreshAirports={refreshLiveAirports}
            />
          </WelcomeView>
        )}
      </main>

      <Footer />

      {/* GDPR Cookie Consent Manager */}
      <CookieConsent />
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
