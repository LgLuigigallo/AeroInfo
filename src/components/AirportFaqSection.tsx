'use client';

import React from 'react';
import { ChevronDown, ExternalLink, MapPin, Clock, Navigation, ShieldCheck, BatteryCharging } from 'lucide-react';
import { cleanOfficialWebsiteUrl } from '@/lib/aviation-authority';
import type { Airport, Language } from '@/types/airport';

interface AirportFaqSectionProps {
  airport: Airport;
  lang: Language;
}

/**
 * Ultra-minimalist, single-row collapsible FAQ & Airport Details bar.
 * Keeps the page completely clean by default (one slim discrete row).
 * Expands on tap to show comprehensive, authoritative travel details:
 * 1. Liquids & 3D Scanner Regulations (EDS-CB C3 vs standard 100ml)
 * 2. Lithium Batteries & Powerbank Safety Rules (Cabin only)
 * 3. Recommended Arrival Timing & Security Screening Wait
 * 4. Ground Transport to the City Centre (Durations & Costs)
 * 5. Location, Google Maps Directions & Official Website Link
 * 
 * 100% Borderless Minimalist Aesthetic enforced.
 */
export function AirportFaqSection({ airport, lang }: AirportFaqSectionProps) {
  const isItalian = lang === 'it';
  const name = isItalian ? airport.name_it : airport.name_en;
  const city = isItalian ? airport.city_it : airport.city_en;
  const country = isItalian ? airport.country_it : airport.country_en;

  const domHours = airport.recommendedArrivalHours?.domestic || 2;
  const intHours = airport.recommendedArrivalHours?.international || 3;
  const waitMin = airport.averageSecurityWaitMin || 15;

  const security = airport.securityPolicy;
  const has3D = Boolean(security?.has3DScanners);
  const liquidsAllowance = security ? (isItalian ? security.liquidsAllowance_it : security.liquidsAllowance_en) : '';
  const scannersNote = security ? (isItalian ? security.scannersNote_it : security.scannersNote_en) : '';
  const electronicsInBag = Boolean(security?.electronicsInBag);

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
      <details className="group rounded-2xl bg-white dark:bg-zinc-900 shadow-xs overflow-hidden transition-all duration-200">
        <summary className="flex items-center justify-between p-3.5 sm:p-4 cursor-pointer list-none select-none hover:bg-zinc-50/60 dark:hover:bg-zinc-850/60 transition-colors">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] font-black px-2 py-0.5 rounded-md bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8]">
              FAQ
            </span>
            <span className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
              {isItalian 
                ? `FAQ, sicurezza liquidi e info pratiche su ${name}` 
                : `FAQ, liquids rules & travel info for ${name}`}
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

        {/* Expandable Clean Details Grid - 100% Borderless */}
        <div className="p-4 sm:p-5 bg-zinc-50/30 dark:bg-zinc-900/40 text-xs sm:text-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            
            {/* 1. Regole Liquidi & Scanner 3D */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-850 shadow-2xs space-y-2.5 md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#05668D] dark:text-[#5EAAA8]" />
                  <span>{isItalian ? 'Regole Liquidi & Scanner 3D' : 'Liquids & 3D Scanners'}</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  has3D 
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' 
                    : 'bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8]'
                }`}>
                  {has3D ? 'Scanner 3D C3' : (isItalian ? 'Standard 100 ml' : 'Standard 100ml')}
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                <p>
                  {has3D ? (
                    isItalian
                      ? `Nello scalo sono attive corsie con scanner tomografici 3D EDS-CB C3. ${scannersNote || liquidsAllowance}`
                      : `Checkpoints equipped with EDS-CB C3 3D scanners are operational. ${scannersNote || liquidsAllowance}`
                  ) : (
                    isItalian
                      ? `Vige la normativa standard: liquidi ammessi solo in flaconi da massimo 100 ml ciascuno, riposti in una busta trasparente da 1 litro.`
                      : `Standard security rules apply: liquids allowed in containers of max 100ml each, inside a clear 1-litre resealable bag.`
                  )}
                </p>
                <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400">
                  <strong className="text-zinc-700 dark:text-zinc-200">
                    {isItalian ? 'Dispositivi elettronici:' : 'Electronic devices:'}
                  </strong>{' '}
                  {electronicsInBag 
                    ? (isItalian ? 'Laptop e tablet possono rimanere all’interno del bagaglio a mano.' : 'Laptops and tablets can remain inside carry-on luggage.')
                    : (isItalian ? 'Vanno estratti e inseriti nelle apposite vaschette.' : 'Must be removed and screened in separate trays.')}
                </p>
              </div>
            </div>

            {/* 2. Powerbank & Batterie al Litio */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-850 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-xs">
                  <BatteryCharging className="w-3.5 h-3.5 text-[#05668D] dark:text-[#5EAAA8]" />
                  <span>{isItalian ? 'Powerbank & Batterie' : 'Powerbanks & Batteries'}</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300">
                  {isItalian ? 'Solo a mano' : 'Cabin only'}
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                <p>
                  {isItalian
                    ? 'Le powerbank, le batterie al litio sciolte e le sigarette elettroniche devono essere portate esclusivamente nel bagaglio a mano.'
                    : 'Powerbanks, spare lithium batteries, and e-cigarettes must strictly be carried inside cabin hand baggage.'}
                </p>
                <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400">
                  {isItalian
                    ? 'Limite tipico: max 100 Wh (fino a 160 Wh su autorizzazione). Severamente vietate in stiva.'
                    : 'Standard rating: up to 100 Wh (up to 160 Wh with airline permit). Strictly forbidden in checked hold luggage.'}
                </p>
              </div>
            </div>

            {/* 3. Anticipo Orario e Tempi di Attesa */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-850 shadow-2xs space-y-2.5">
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

            {/* 4. Trasporti verso la Città */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-850 shadow-2xs space-y-2.5">
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

            {/* 5. Info e Contatti Aeroporto con Google Maps */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-850 shadow-2xs space-y-2.5">
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

          </div>
        </div>
      </details>
    </div>
  );
}
