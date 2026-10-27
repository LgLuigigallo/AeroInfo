import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Droplets, 
  Luggage, 
  BatteryCharging, 
  Plane, 
  Train, 
  Bus, 
  Car, 
  Wifi, 
  Zap, 
  Coffee, 
  ShoppingBag, 
  MapPin, 
  Clock, 
  CreditCard
} from 'lucide-react';
import { airportPath } from '@/lib/airport-slug';
import { cleanOfficialWebsiteUrl } from '@/lib/aviation-authority';
import type { Airport, Language, GroundTransportItem, AmenityItem, VenueItem, TerminalDetail, AirlineTerminalMapping } from '@/types/airport';

interface AirportSemanticDossierProps {
  airport: Airport;
  airports: Airport[];
  lang: Language;
}

export function AirportSemanticDossier({ airport, airports, lang }: AirportSemanticDossierProps) {
  const isItalian = lang === 'it';
  const displayName = (isItalian ? airport.name_it : airport.name_en) || airport.iata;
  const city = (isItalian ? airport.city_it : airport.city_en) || '';
  const country = (isItalian ? airport.country_it : airport.country_en) || '';
  const policy = airport.securityPolicy;

  // Clean source and official URLs
  const officialUrl = policy.officialSourceUrl 
    ? cleanOfficialWebsiteUrl(policy.officialSourceUrl, airport.iata) 
    : (airport.officialWebsite ? cleanOfficialWebsiteUrl(airport.officialWebsite, airport.iata) : null);

  const verifiedDateFormatted = policy.lastVerifiedDate
    ? new Intl.DateTimeFormat(isItalian ? 'it-IT' : 'en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${policy.lastVerifiedDate}T00:00:00Z`))
    : null;

  // Related sibling airports
  const relatedCodes = new Set((airport.otherCityAirports || []).map((item) => item.iata.toUpperCase()));
  const relatedAirports = airports.filter((item) => item.iata.toUpperCase() !== airport.iata.toUpperCase() && relatedCodes.has(item.iata.toUpperCase()));

  return (
    <article 
      aria-label={isItalian ? `Guida completa aeroporto ${displayName}` : `Complete guide for ${displayName} airport`}
      className="max-w-5xl mx-auto mt-10 pt-10 border-t border-zinc-200 dark:border-zinc-800 space-y-12"
    >
      {/* 1. Header del Dossier & Credenziali E-E-A-T */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#05668D] text-white">
              {airport.iata}
            </span>
            {airport.icao && (
              <span className="font-mono text-zinc-500 dark:text-zinc-400">
                ICAO: {airport.icao}
              </span>
            )}
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-zinc-500 dark:text-zinc-400">
              {city}, {country}
            </span>
          </div>

          {verifiedDateFormatted && (
            <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#05668D] dark:text-[#5EAAA8]" />
              <span>{isItalian ? 'Dati ufficiali verificati il' : 'Official data verified on'} {verifiedDateFormatted}</span>
            </div>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {isItalian 
            ? `Guida ai controlli di sicurezza, liquidi e terminal a ${displayName}` 
            : `Security checkpoints, liquids rules and terminals at ${displayName}`}
        </h2>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
          {isItalian
            ? `Tutte le informazioni ufficiali e verificate per i viaggiatori in partenza o in transito presso l'aeroporto di ${displayName} (${airport.iata}). Scopri se sono attivi gli scanner 3D di ultima generazione, i limiti per i liquidi nel bagaglio a mano, i terminal assegnati a ciascuna compagnia aerea e i collegamenti con il centro di ${city}.`
            : `All official and verified passenger information for departures and transfers at ${displayName} (${airport.iata}). Check current 3D scanner status, carry-on liquids allowances, departure terminals by airline, and transit connections to ${city} city center.`}
        </p>

        {officialUrl && (
          <div className="pt-1">
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#05668D] dark:text-[#5EAAA8] hover:underline"
            >
              <span>{isItalian ? 'Sito web ufficiale dello scalo' : 'Official airport website'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </header>

      {/* 2. Sezione: Controlli di Sicurezza & Liquidi (ID ancorabile per link diretti) */}
      <section id="sicurezza-liquidi" className="rounded-3xl bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] flex items-center justify-center shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              {isItalian ? 'Regole dei liquidi e scanner ai controlli' : 'Liquids rules and security scanners'}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {isItalian ? 'Controlli di sicurezza passeggeri in cabina' : 'Cabin passenger security screening'}
            </p>
          </div>
        </div>

        {/* Status Callout Banner */}
        <div className={`p-4 sm:p-5 rounded-2xl flex items-start gap-3.5 ${
          policy.has3DScanners
            ? 'bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 border border-emerald-500/20'
            : 'bg-amber-500/10 text-amber-950 dark:text-amber-200 border border-amber-500/20'
        }`}>
          {policy.has3DScanners ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <h4 className="font-bold text-sm sm:text-base">
              {policy.has3DScanners
                ? (isItalian ? 'Scanner 3D EDS-CB C3 Attivi' : '3D EDS-CB C3 Scanners Active')
                : (isItalian ? 'Regola Standard 100ml in Vigore' : 'Standard 100ml Rule in Force')}
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed opacity-95">
              {isItalian ? policy.liquidsAllowance_it : policy.liquidsAllowance_en}
            </p>
            {policy.scannersNote_it && isItalian && (
              <p className="text-xs opacity-90 pt-1 border-t border-emerald-500/10 dark:border-emerald-400/10">
                {policy.scannersNote_it}
              </p>
            )}
            {policy.scannersNote_en && !isItalian && (
              <p className="text-xs opacity-90 pt-1 border-t border-emerald-500/10 dark:border-emerald-400/10">
                {policy.scannersNote_en}
              </p>
            )}
          </div>
        </div>

        {/* Differenziazione per Terminal (se presente) */}
        {policy.terminalRules && policy.terminalRules.length > 0 && (
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-mono">
              {isItalian ? 'Dettaglio regole per singolo terminal:' : 'Rules by departure terminal:'}
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {policy.terminalRules.map((rule, idx) => {
                const liquidsText = isItalian 
                  ? (rule.bottleAllowance_it || (rule.has3DScanners ? 'Contenitori oltre 100ml ammessi nel bagaglio' : 'Norma standard max 100ml a flacone'))
                  : (rule.bottleAllowance_en || (rule.has3DScanners ? 'Containers over 100ml allowed inside bag' : 'Standard 100ml per container limit'));
                const notes = isItalian ? rule.notes_it : rule.notes_en;

                return (
                  <div key={idx} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-900 dark:text-white text-sm">{rule.terminalName}</span>
                      {rule.has3DScanners ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
                          {isItalian ? 'Scanner C3' : 'C3 Scanners'}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-[11px]">
                          100ml
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-300">
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">{isItalian ? 'Liquidi: ' : 'Liquids: '}</span>
                      {liquidsText}
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">{isItalian ? 'Dispositivi: ' : 'Devices: '}</span>
                      {rule.electronicsInBag 
                        ? (isItalian ? 'Nel bagaglio a mano' : 'Inside cabin bag')
                        : (isItalian ? 'Da estrarre nei vassoi' : 'Remove into trays')}
                    </p>
                    {notes && (
                      <p className="text-[11px] text-zinc-500 italic pt-1 border-t border-zinc-200/50 dark:border-zinc-700/50">
                        {notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Elettronica, Powerbank e Droni */}
        <div className="grid gap-4 sm:grid-cols-2 pt-2 text-xs">
          <div className="p-4 rounded-2xl bg-[#E8F1F2]/50 dark:bg-zinc-800/40 border border-[#05668D]/10 dark:border-zinc-700/50 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-sm">
              <Luggage className="w-4 h-4 text-[#05668D] dark:text-[#5EAAA8]" />
              <span>{isItalian ? 'Dispositivi Elettronici (Laptop/Tablet)' : 'Electronics (Laptops/Tablets)'}</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {policy.electronicsInBag
                ? (isItalian ? 'Nei controlli dotati di scanner 3D non è necessario estrarre computer portatili, tablet e lettori e-book dalla borsa.' : 'At checkpoints with 3D scanners, laptops, tablets, and e-readers can remain inside your carry-on bag.')
                : (isItalian ? 'È obbligatorio estrarre computer portatili, tablet e grandi dispositivi elettronici e depositarli separatamente nei vassoi.' : 'You must remove laptops, tablets, and large electronics from your bags and place them separately in security trays.')}
            </p>
            {policy.electronicsNote_it && isItalian && (
              <p className="text-zinc-500 dark:text-zinc-400 italic pt-1">{policy.electronicsNote_it}</p>
            )}
            {policy.electronicsNote_en && !isItalian && (
              <p className="text-zinc-500 dark:text-zinc-400 italic pt-1">{policy.electronicsNote_en}</p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-zinc-800/40 border border-amber-500/15 dark:border-zinc-700/50 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-sm">
              <BatteryCharging className="w-4 h-4 text-amber-600 dark:text-[#F4D35E]" />
              <span>{isItalian ? 'Powerbank e Batterie al Litio' : 'Powerbanks & Lithium Batteries'}</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {isItalian
                ? 'I powerbank e le batterie di ricambio devono essere trasportati TASSATIVAMENTE nel bagaglio a mano (massimo 100Wh). È severamente vietato imbarcarli nella stiva.'
                : 'Powerbanks and spare lithium batteries must STRICTLY travel in your carry-on bag (up to 100Wh). Strictly forbidden in checked hold luggage.'}
            </p>
            {policy.powerbankPolicy_it && isItalian && (
              <p className="text-zinc-500 dark:text-zinc-400 italic pt-1">{policy.powerbankPolicy_it}</p>
            )}
            {policy.powerbankPolicy_en && !isItalian && (
              <p className="text-zinc-500 dark:text-zinc-400 italic pt-1">{policy.powerbankPolicy_en}</p>
            )}
          </div>
        </div>
      </section>

      {/* 3. Sezione: Terminal & Compagnie Aeree */}
      <section id="terminal-compagnie" className="rounded-3xl bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] flex items-center justify-center shrink-0">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              {isItalian ? 'Terminal passeggeri e compagnie aeree' : 'Passenger terminals and airlines'}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {isItalian ? 'Mappatura partenze e banchi check-in' : 'Departures mapping and check-in desks'}
            </p>
          </div>
        </div>

        {/* Elenco Terminal con dettagli di trasferimento */}
        {airport.terminals && airport.terminals.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-zinc-400">
              {isItalian ? 'Terminal operativi:' : 'Operating terminals:'}
            </h4>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {airport.terminals.map((terminal) => (
                <div key={terminal.id} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-800 space-y-1">
                  <h5 className="font-bold text-sm text-zinc-900 dark:text-white">{terminal.name}</h5>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {isItalian ? terminal.transferInfo_it : terminal.transferInfo_en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabella Compagnie Aeree & Terminal */}
        {airport.airlines && airport.airlines.length > 0 ? (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-zinc-400">
              {isItalian ? 'Elenco compagnie aeree operanti a questo scalo:' : 'Airlines operating at this airport:'}
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#E8F1F2]/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-bold border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th scope="col" className="p-3 sm:p-3.5">{isItalian ? 'Compagnia Aerea' : 'Airline'}</th>
                    <th scope="col" className="p-3 sm:p-3.5">{isItalian ? 'Codice' : 'Code'}</th>
                    <th scope="col" className="p-3 sm:p-3.5">{isItalian ? 'Terminal di Partenza' : 'Departure Terminal'}</th>
                    <th scope="col" className="p-3 sm:p-3.5">{isItalian ? 'Banchi Check-in' : 'Check-in Desk / Zone'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
                  {airport.airlines.map((item, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="p-3 sm:p-3.5 font-bold text-zinc-900 dark:text-white">
                        {item.airlineName}
                      </td>
                      <td className="p-3 sm:p-3.5 font-mono text-[#05668D] dark:text-[#5EAAA8] font-bold">
                        {item.iataCode || '—'}
                      </td>
                      <td className="p-3 sm:p-3.5">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 font-medium">
                          {item.terminal}
                        </span>
                      </td>
                      <td className="p-3 sm:p-3.5 text-zinc-600 dark:text-zinc-400">
                        {item.checkInZone || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-xs text-zinc-500 italic">
            {isItalian 
              ? 'Mappatura delle compagnie aeree in fase di aggiornamento per questo scalo.' 
              : 'Airline terminal directory currently being updated for this airport.'}
          </p>
        )}
      </section>

      {/* 4. Sezione: Collegamenti e Trasporti verso il Centro */}
      {airport.transports && airport.transports.length > 0 && (
        <section id="trasporti-collegamenti" className="rounded-3xl bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] flex items-center justify-center shrink-0">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                {isItalian 
                  ? `Come raggiungere l'aeroporto di ${displayName} e il centro` 
                  : `Ground transport and transfers to ${city} city center`}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {isItalian ? 'Treni espressi, autobus navetta, metropolitana e taxi' : 'Express trains, shuttle buses, metro and taxi services'}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {airport.transports.map((transport) => {
              const name = isItalian ? transport.name_it : transport.name_en;
              const details = isItalian ? transport.details_it : transport.details_en;
              const pickup = isItalian ? transport.pickupLocation_it : transport.pickupLocation_en;

              return (
                <div key={transport.id} className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-800 space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
                      {name}
                    </h4>
                    <span className="font-mono px-2 py-0.5 rounded-full bg-[#E8F1F2] dark:bg-zinc-800 text-[#05668D] dark:text-[#5EAAA8] text-[11px] font-bold uppercase shrink-0">
                      {transport.type}
                    </span>
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {details}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-zinc-200/50 dark:border-zinc-700/50 text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                    {transport.duration && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#05668D] dark:text-[#5EAAA8]" />
                        <span>{transport.duration}</span>
                      </span>
                    )}
                    {transport.estimatedCost && (
                      <span className="inline-flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5 text-[#05668D] dark:text-[#5EAAA8]" />
                        <span>{transport.estimatedCost}</span>
                      </span>
                    )}
                    {pickup && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{pickup}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. Sezione: Servizi Utili nei Terminal */}
      {airport.amenities && airport.amenities.length > 0 && (
        <section id="servizi-utili" className="rounded-3xl bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-[#F4D35E] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                {isItalian ? 'Servizi per i passeggeri nei terminal' : 'Passenger amenities and services'}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {isItalian ? 'Wi-Fi gratuito, fontanelle acqua potabile e prese di ricarica' : 'Free Wi-Fi, water refill stations and charging ports'}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 text-xs">
            {airport.amenities.map((amenity) => {
              const title = isItalian ? amenity.title_it : amenity.title_en;
              const details = isItalian ? amenity.details_it : amenity.details_en;
              const location = isItalian ? amenity.location_it : amenity.location_en;

              return (
                <div key={amenity.id} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{title}</h4>
                    {amenity.availability && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                        {amenity.availability}
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{details}</p>
                  {location && (
                    <p className="text-[11px] text-zinc-400 font-mono pt-1">
                      📍 {location}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. Aeroporti alternativi / correlati della stessa area metropolitana */}
      {relatedAirports.length > 0 && (
        <nav aria-label={isItalian ? 'Aeroporti correlati' : 'Related airports'} className="rounded-3xl bg-zinc-100/70 dark:bg-zinc-900/60 p-6 sm:p-7 space-y-3">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            {isItalian 
              ? `Altri aeroporti serviti nell'area di ${city}` 
              : `Other airports serving ${city} region`}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isItalian 
              ? 'Se il tuo volo parte o arriva in un altro scalo metropolitano, consulta la scheda dedicata:' 
              : 'If your flight departs or arrives at another regional hub, explore the dedicated guide:'}
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {relatedAirports.map((other) => {
              const otherName = isItalian ? other.name_it : other.name_en;
              return (
                <Link
                  key={other.iata}
                  href={airportPath(other, lang)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-[#05668D] dark:hover:border-[#5EAAA8] hover:text-[#05668D] dark:hover:text-[#5EAAA8] transition-all shadow-2xs"
                >
                  <span className="font-mono font-bold text-[#05668D] dark:text-[#5EAAA8]">{other.iata}</span>
                  <span>{otherName}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </article>
  );
}
