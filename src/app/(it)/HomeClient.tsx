'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { AirportBubblesView } from '@/components/AirportBubblesView';
import { WelcomeView } from '@/components/WelcomeView';
import { CookieConsent } from '@/components/CookieConsent';
import { Footer } from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/lib/i18n';
import { airportsData } from '@/data/airports';
import { Airport, Language } from '@/types/airport';
import { airportPath } from '@/lib/airport-slug';

function MainContent() {
  const router = useRouter();
  const { lang, t } = useLanguage();
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
        if (isMounted && Array.isArray(data?.airports) && data.airports.length > 0) {
          setAirports(data.airports);
        }
      })
      .catch((err) => console.warn('Failed to load airport catalog:', err));
    return () => { isMounted = false; };
  }, []);

  // Sync back button / popstate with airport selection
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/' || window.location.pathname === '/en') {
        setSelectedAirport(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectAirport = (airport: Airport) => {
    setSelectedAirport(airport);
    try {
      const targetPath = airportPath(airport, lang);
      window.history.pushState({ iata: airport.iata }, '', targetPath);
    } catch {
      // fallback
    }
  };

  const handleResetHome = () => {
    setSelectedAirport(null);
    try {
      window.history.pushState({}, '', lang === 'it' ? '/' : '/en');
    } catch {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-[#05668D] selection:text-white">
      <Header onResetHome={handleResetHome} />

      <main className="flex-1 w-full flex flex-col items-center">
        {selectedAirport ? (
          /* Airport 4-Bubble Interactive View - Spanning Full Width */
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 pb-16">
            <AirportBubblesView 
              airport={selectedAirport}
              airports={airports}
              onBack={handleResetHome}
              onSelectAirport={handleSelectAirport}
              onRefreshAirports={refreshLiveAirports}
            />
          </div>
        ) : (
          /* Clean Minimalist Welcome Page */
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

export default function Home({ initialLang = 'it' }: { initialLang?: Language }) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <MainContent />
    </LanguageProvider>
  );
}
