'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Gauge, 
  Zap, 
  Utensils, 
  Train, 
  ExternalLink,
  MapPin,
  CheckCircle2,
  Calendar,
  Compass
} from 'lucide-react';
import { Airport } from '@/types/airport';
import { useLanguage } from '@/lib/i18n';
import { SecurityTab } from './tabs/SecurityTab';
import { TerminalMapTab } from './tabs/TerminalMapTab';
import { TerminalsTab } from './tabs/TerminalsTab';
import { DifficultyTab } from './tabs/DifficultyTab';
import { AmenitiesTab } from './tabs/AmenitiesTab';
import { FoodTab } from './tabs/FoodTab';
import { TransportTab } from './tabs/TransportTab';

interface AirportDetailProps {
  airport: Airport;
  onSelectAirport?: (iata: string) => void;
}

type TabType = 'security' | 'map' | 'terminals' | 'difficulty' | 'amenities' | 'food' | 'transport';

export function AirportDetail({ airport, onSelectAirport }: AirportDetailProps) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('security');

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'security', label: t('tabSecurity'), icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'map', label: t('tabMap'), icon: <Compass className="w-4 h-4" /> },
    { id: 'terminals', label: t('tabTerminals'), icon: <Layers className="w-4 h-4" /> },
    { id: 'difficulty', label: t('tabDifficulty'), icon: <Gauge className="w-4 h-4" /> },
    { id: 'amenities', label: t('tabAmenities'), icon: <Zap className="w-4 h-4" /> },
    { id: 'food', label: t('tabFood'), icon: <Utensils className="w-4 h-4" /> },
    { id: 'transport', label: t('tabTransport'), icon: <Train className="w-4 h-4" /> }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Airport Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-extrabold text-sm tracking-wider shadow-xs">
                {airport.iata}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono text-xs font-semibold">
                {airport.icao}
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 font-medium ml-1">
                <MapPin className="w-3.5 h-3.5" />
                {lang === 'it' ? airport.city_it : airport.city_en}, {lang === 'it' ? airport.country_it : airport.country_en}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {lang === 'it' ? airport.name_it : airport.name_en}
            </h1>
          </div>

          {/* Quick Info & Official Link */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 text-xs">
            <a
              href={airport.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-850 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700/80 transition-colors font-medium"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{new URL(airport.officialWebsite).hostname.replace('www.', '')}</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>

            <div className="flex items-center gap-1 text-neutral-400 text-[11px]">
              <Calendar className="w-3 h-3" />
              <span>{t('verifiedDate')}: {airport.lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Multi-Airport City Switcher Banner */}
        {airport.otherCityAirports && airport.otherCityAirports.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200/80 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>{t('cityMultiAirport')}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {airport.otherCityAirports.map((other) => (
                <button
                  key={other.iata}
                  type="button"
                  onClick={() => onSelectAirport?.(other.iata)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white dark:bg-neutral-800 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950/40 dark:hover:border-blue-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold transition-all cursor-pointer border border-neutral-200 dark:border-neutral-700 shadow-2xs group"
                >
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-mono group-hover:bg-blue-600">
                    {other.iata}
                  </span>
                  <span>{lang === 'it' ? other.name_it : other.name_en}</span>
                  {other.distanceInfo && (
                    <span className="text-[10px] font-normal text-neutral-400">
                      • {other.distanceInfo}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Glance Key Pills */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center gap-2">
          {airport.securityPolicy.has3DScanners ? (
            <div className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{lang === 'it' ? 'Scanner 3D: Liquidi oltre 100ml ammessi' : '3D Scanners: Liquids >100ml allowed'}</span>
            </div>
          ) : (
            <div className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 text-xs font-semibold flex items-center gap-1.5">
              <span>{lang === 'it' ? 'Regola standard: 100ml in busta trasparente' : 'Standard 100ml clear bag rule'}</span>
            </div>
          )}

          <div className="px-3 py-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold">
            {lang === 'it' ? `Complessità: ${airport.difficultyRating}/5` : `Complexity: ${airport.difficultyRating}/5`}
          </div>

          <div className="px-3 py-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold">
            {lang === 'it' ? `Attesa sicurezza: ~${airport.averageSecurityWaitMin} min` : `Avg security: ~${airport.averageSecurityWaitMin} min`}
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="sticky top-16 z-30 bg-neutral-50/90 dark:bg-neutral-950/90 backdrop-blur-md py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-neutral-200/60 dark:bg-neutral-900 border border-neutral-300/40 dark:border-neutral-800 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Content Area */}
      <div className="min-h-[400px] animate-in fade-in-50 duration-150">
        {activeTab === 'security' && <SecurityTab airport={airport} />}
        {activeTab === 'map' && <TerminalMapTab airport={airport} />}
        {activeTab === 'terminals' && <TerminalsTab airport={airport} />}
        {activeTab === 'difficulty' && <DifficultyTab airport={airport} />}
        {activeTab === 'amenities' && <AmenitiesTab airport={airport} />}
        {activeTab === 'food' && <FoodTab airport={airport} />}
        {activeTab === 'transport' && <TransportTab airport={airport} />}
      </div>
    </div>
  );
}
