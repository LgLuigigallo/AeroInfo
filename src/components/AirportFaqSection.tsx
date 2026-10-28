'use client';

import React from 'react';
import { ChevronDown, ExternalLink, MapPin, Clock, Navigation } from 'lucide-react';
import { cleanOfficialWebsiteUrl } from '@/lib/aviation-authority';
import type { Airport, Language } from '@/types/airport';

interface AirportFaqSectionProps {
  airport: Airport;
  lang: Language;
}

/**
 * Ultra-minimalist, single-row collapsible FAQ & Airport Details bar.
 * Keeps the page completely clean by default (one slim discrete row).
 * Expands on tap to show non-redundant practical details:
 * - Airport info, clickable address with Google Maps directions, coordinates & official website
 * - Recommended arrival timing & average security wait
 * - Ground transport to the city centre
 */
export function AirportFaqSection({ airport, lang }: AirportFaqSectionProps) {
  const isItalian = lang === 'it';
  const name = isItalian ? airport.name_it : airport.name_en;
  const city = isItalian ? airport.city_it : airport.city_en;
  const country = isItalian ? airport.country_it : airport.country_en;

  const domHours = airport.recommendedArrivalHours?.domestic || 2;
  const intHours = airport.recommendedArrivalHours?.international || 3;
  const waitMin = airport.averageSecurityWaitMin || 15;

  const officialUrl = airport.officialWebsite 
    ? cleanOfficialWebsiteUrl(airport.officialWebsite, airport.iata)
    : null;

  // Google Maps Directions destination URL with strict coordinate and finiteness check
  const hasValidCoords = Number.isFinite(airport.coordinates?.lat) &&
    Number.isFinite(airport.coordinates?.lng) &&
    (airport.coordinates.lat !== 0 || airport.coordinates.lng !== 0);

  const mapsUrl = hasValidCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${airport.coordinates.lat},${airport.coordinates.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${city}`)}`;

  return (
    <div className="w-full pt-2">
      <details className="group rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 shadow-2xs overflow-hidden transition-all duration-200">
        <summary className="flex items-center justify-between p-3.5 sm:p-4 cursor-pointer list-none select-none hover:bg-zinc-50/60 dark:hover:bg-zinc-850/60 transition-colors">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] font-black px-2 py-0.5 rounded-md bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8]">
              FAQ
            </span>
            <span className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
              {isItalian 
                ? `FAQ, contatti e info pratiche su ${name}` 
                : `FAQ, contacts & practical info for ${name}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 hidden sm:inline">
              {isItalian ? 'Tocca per aprire' : 'Tap to open'}
            </span>
            <span className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:bg-[#05668D] group-hover:text-white transition-colors">
              <ChevronDown className="w-3.5 h-3.5 group-open:rotate-180 transition-transform duration-200" />
            </span>
          </div>
        </summary>

        {/* Expandable Clean Details Grid */}
        <div className="p-4 sm:p-5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/30 dark:bg-zinc-900/40 text-xs sm:text-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            
            {/* 1. Info e Contatti Aeroporto con Google Maps */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#05668D] dark:text-[#5EAAA8]" />
                <span>{isItalian ? 'Indirizzo & Contatti' : 'Location & Contacts'}</span>
              </div>
              <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                <p>
                  <strong className="text-zinc-700 dark:text-zinc-200">{isItalian ? 'Indirizzo:' : 'Address:'}</strong>{' '}
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={isItalian ? `Apri indicazioni stradali per ${name} su Google Maps` : `Open directions to ${name} on Google Maps`}
                    className="inline-flex items-center gap-1 font-semibold text-[#05668D] dark:text-[#5EAAA8] hover:underline cursor-pointer"
                  >
                    <span>{city}, {country}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </p>
                {airport.icao && (
                  <p>
                    <strong className="text-zinc-700 dark:text-zinc-200">ICAO:</strong> {airport.icao} • <strong className="text-zinc-700 dark:text-zinc-200">IATA:</strong> {airport.iata}
                  </p>
                )}
                {hasValidCoords && (
                  <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                    {airport.coordinates.lat.toFixed(4)}° N, {airport.coordinates.lng.toFixed(4)}° E
                  </p>
                )}
                
                {/* Action Buttons: Google Maps Directions & Official Website */}
                <div className="pt-1.5 flex flex-wrap items-center gap-2">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#05668D] hover:bg-[#5EAAA8] text-white font-medium text-[11px] shadow-2xs transition-colors cursor-pointer"
                    title={isItalian ? 'Calcola percorso su Google Maps' : 'Get directions on Google Maps'}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>{isItalian ? 'Indicazioni Maps' : 'Directions'}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>

                  {officialUrl && (
                    <a
                      href={officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] hover:bg-zinc-200 dark:hover:bg-zinc-700 font-medium text-[11px] transition-colors"
                    >
                      <span>{isItalian ? 'Sito ufficiale' : 'Official website'}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Anticipo Orario e Tempi di Attesa */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-xs">
                <Clock className="w-3.5 h-3.5 text-[#05668D] dark:text-[#5EAAA8]" />
                <span>{isItalian ? 'Anticipo in Aeroporto' : 'Arrival Time & Screening'}</span>
              </div>
              <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                <p>
                  <strong className="text-zinc-700 dark:text-zinc-200">{isItalian ? 'Voli Nazionali / Schengen:' : 'Domestic / Schengen:'}</strong> {domHours} {isItalian ? 'ore prima' : 'hours early'}
                </p>
                <p>
                  <strong className="text-zinc-700 dark:text-zinc-200">{isItalian ? 'Voli Internazionali:' : 'International flights:'}</strong> {intHours} {isItalian ? 'ore prima' : 'hours early'}
                </p>
                <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 pt-0.5">
                  {isItalian
                    ? `Attesa media ai varchi stimata in circa ${waitMin} minuti.`
                    : `Average security screening wait is around ${waitMin} minutes.`}
                </p>
              </div>
            </div>

            {/* 3. Trasporti verso la Città */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-xs">
                <Navigation className="w-3.5 h-3.5 text-[#05668D] dark:text-[#5EAAA8]" />
                <span>{isItalian ? 'Collegamenti Centro Città' : 'City Transport Links'}</span>
              </div>
              <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                {airport.transports && airport.transports.length > 0 ? (
                  <ul className="space-y-1">
                    {airport.transports.slice(0, 2).map((t) => (
                      <li key={t.id || t.name_it} className="truncate">
                        <strong className="text-zinc-700 dark:text-zinc-200">
                          {isItalian ? t.name_it : t.name_en}:
                        </strong>{' '}
                        <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                          ~{t.duration} ({t.estimatedCost})
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400">
                    {isItalian
                      ? `Servizi taxi ufficiali, navette bus e collegamenti stradali diretti per ${city}.`
                      : `Official taxis, express airport buses, and direct road links to ${city}.`}
                  </p>
                )}
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 pt-0.5">
                  {isItalian ? 'Taxi con tariffario ufficiale esposto' : 'Official taxis with posted flat fares'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </details>
    </div>
  );
}
