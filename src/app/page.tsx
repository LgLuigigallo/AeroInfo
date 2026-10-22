'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

function MainContent() {
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

    // Load live database catalogue and update selected airport if active
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
        } else if (liveList) {
          setSelectedAirport((prev) => {
            if (!prev) return null;
            const found = liveList.find((a) => a.iata.toUpperCase() === prev.iata.toUpperCase());
            return found || prev;
          });
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
      // Smooth scroll to top of details
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetHome = () => {
    setSelectedAirport(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('airport');
      window.history.pushState({}, '', url.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
                  if (found) {
                    handleSelectAirport(found);
                  }
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
