import Link from 'next/link';
import { airportPath } from '@/lib/airport-slug';
import { getAirportSeoStatus } from '@/lib/seo/airports';
import { getAirportBreadcrumbStructuredData } from '@/lib/seo/structured-data';
import type { Airport, Language } from '@/types/airport';

type Props = { airport: Airport; airports: Airport[]; lang: Language };

const text = (it: string | undefined, en: string | undefined, lang: Language) => lang === 'it' ? it : en;
function strongItems<T extends { isUnverified?: boolean }>(items: T[]): T[] {
  return items.filter((item) => !item.isUnverified);
}

export function AirportSeoDossier({ airport, airports, lang }: Props) {
  const isItalian = lang === 'it';
  const status = getAirportSeoStatus(airport);
  const displayName = text(airport.name_it, airport.name_en, lang) || airport.iata;
  const city = text(airport.city_it, airport.city_en, lang) || '';
  const country = text(airport.country_it, airport.country_en, lang) || '';
  const policy = airport.securityPolicy;
  const sourceUrl = (() => {
    try {
      const url = new URL(policy.officialSourceUrl);
      return url.protocol === 'https:' ? url.toString() : null;
    } catch { return null; }
  })();
  const relatedCodes = new Set((airport.otherCityAirports || []).map((item) => item.iata.toUpperCase()));
  const related = airports.filter((item) => item.iata !== airport.iata && relatedCodes.has(item.iata.toUpperCase()));
  const alternatePath = airportPath(airport, isItalian ? 'en' : 'it');
  const homeLabel = isItalian ? 'Aeroporti' : 'Airports';
  const updated = policy.lastVerifiedDate
    ? new Intl.DateTimeFormat(isItalian ? 'it-IT' : 'en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${policy.lastVerifiedDate}T00:00:00Z`))
    : null;
  const breadcrumbs = getAirportBreadcrumbStructuredData(displayName, lang);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        <nav aria-label={isItalian ? 'Percorso di navigazione' : 'Breadcrumb'} className="text-sm text-zinc-500">
          <ol className="flex flex-wrap gap-2">
            <li><Link href="/" className="underline">AeroInfo</Link></li><li aria-hidden="true">/</li>
            <li><Link href="/" className="underline">{homeLabel}</Link></li><li aria-hidden="true">/</li>
            <li aria-current="page">{displayName}</li>
          </ol>
        </nav>

        <header className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {isItalian ? 'Scheda aeroporto' : 'Airport guide'} · {airport.iata}{airport.icao ? ` / ${airport.icao}` : ''}
            </p>
            <Link href={alternatePath} hrefLang={isItalian ? 'en' : 'it'} className="text-sm underline underline-offset-4">
              {isItalian ? 'Read in English' : 'Leggi in italiano'}
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{displayName} ({airport.iata})</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300">{city}, {country}</p>
          <p className="max-w-3xl leading-7 text-zinc-700 dark:text-zinc-300">
            {isItalian
              ? `Informazioni su controlli di sicurezza, liquidi e terminal all’aeroporto ${displayName} di ${city}.`
              : `Security screening, liquids and terminal information for ${displayName} Airport in ${city}.`}
          </p>
          {updated && <p className="text-sm text-zinc-500">{isItalian ? 'Regole di sicurezza verificate il' : 'Security information verified on'} {updated}.</p>}
          {status !== 'indexable' && (
            <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
              {isItalian
                ? 'Questa scheda è in revisione. Le informazioni non ancora confermate sono indicate e la pagina non è proposta ai motori di ricerca.'
                : 'This guide is under review. Unconfirmed information is identified and this page is not offered to search engines.'}
            </p>
          )}
        </header>

        {status === 'indexable' && <section aria-labelledby="security-heading" className="space-y-3">
          <h2 id="security-heading" className="text-2xl font-semibold">{isItalian ? 'Sicurezza e bagaglio a mano' : 'Security and cabin baggage'}</h2>
          <p className="leading-7">
            <strong>{isItalian ? 'Liquidi:' : 'Liquids:'}</strong> {text(policy.liquidsAllowance_it, policy.liquidsAllowance_en, lang)}
          </p>
          {policy.scannersNote_it || policy.scannersNote_en ? <p className="leading-7">{text(policy.scannersNote_it, policy.scannersNote_en, lang)}</p> : null}
          {policy.electronicsNote_it || policy.electronicsNote_en ? <p className="leading-7"><strong>{isItalian ? 'Dispositivi elettronici:' : 'Electronic devices:'}</strong> {text(policy.electronicsNote_it, policy.electronicsNote_en, lang)}</p> : null}
          {policy.terminalRules?.length ? <ul className="list-disc pl-6 space-y-2">{policy.terminalRules.map((rule) => <li key={rule.terminalName}><strong>{rule.terminalName}:</strong> {text(rule.notes_it, rule.notes_en, lang)}</li>)}</ul> : null}
          {policy.liquidsUnverified || policy.electronicsUnverified ? <p className="text-sm text-amber-700 dark:text-amber-300">{isItalian ? 'Alcune regole sono in attesa di conferma.' : 'Some rules are awaiting confirmation.'}</p> : null}
        </section>}

        {status === 'indexable' && airport.terminals.length > 0 && <section className="space-y-3">
          <h2 className="text-2xl font-semibold">{isItalian ? 'Terminal' : 'Terminals'}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">{strongItems(airport.terminals).map((terminal) => <li key={terminal.id} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">{terminal.name}</h3><p className="mt-1 text-sm leading-6">{text(terminal.transferInfo_it, terminal.transferInfo_en, lang)}</p></li>)}</ul>
        </section>}

        {status === 'indexable' && airport.airlines.some((airline) => !airline.isUnverified) && <section className="space-y-3">
          <h2 className="text-2xl font-semibold">{isItalian ? 'Compagnie aeree' : 'Airlines'}</h2>
          <ul className="grid gap-2 sm:grid-cols-2">{strongItems(airport.airlines).map((airline, index) => <li key={`${airline.iataCode}-${airline.airlineName}-${index}`} className="rounded-lg bg-white p-3 text-sm dark:bg-zinc-900"><strong>{airline.airlineName}</strong> · {airline.terminal}{airline.checkInZone ? ` · ${airline.checkInZone}` : ''}</li>)}</ul>
        </section>}

        {status === 'indexable' && airport.amenities.some((item) => !item.isUnverified) && <section className="space-y-3">
          <h2 className="text-2xl font-semibold">{isItalian ? 'Servizi' : 'Airport services'}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">{strongItems(airport.amenities).map((item) => <li key={item.id} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">{text(item.title_it, item.title_en, lang)}</h3><p className="text-sm text-zinc-500">{text(item.location_it, item.location_en, lang)}{item.terminal ? ` · ${item.terminal}` : ''}</p><p className="mt-2 text-sm leading-6">{text(item.details_it, item.details_en, lang)}</p></li>)}</ul>
        </section>}

        {status === 'indexable' && airport.venues.some((venue) => !venue.isUnverified) && <section className="space-y-3">
          <h2 className="text-2xl font-semibold">{isItalian ? 'Ristorazione e negozi' : 'Food and shops'}</h2>
          <ul className="grid gap-2 sm:grid-cols-2">{strongItems(airport.venues).map((venue) => <li key={venue.id} className="rounded-lg bg-white p-3 text-sm dark:bg-zinc-900"><strong>{venue.name}</strong> · {venue.terminal} · {venue.location}</li>)}</ul>
        </section>}

        {status === 'indexable' && airport.transports.some((item) => !item.isUnverified) && <section className="space-y-3">
          <h2 className="text-2xl font-semibold">{isItalian ? 'Come raggiungere l’aeroporto' : 'Getting to the airport'}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">{strongItems(airport.transports).map((item) => <li key={item.id} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><h3 className="font-semibold">{text(item.name_it, item.name_en, lang)}</h3><p className="mt-1 text-sm leading-6">{text(item.details_it, item.details_en, lang)}</p><p className="mt-2 text-xs text-zinc-500">{text(item.pickupLocation_it, item.pickupLocation_en, lang)}{item.duration ? ` · ${item.duration}` : ''}{item.estimatedCost ? ` · ${item.estimatedCost}` : ''}</p></li>)}</ul>
        </section>}

        <section className="space-y-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold">{isItalian ? 'Fonti e aggiornamento' : 'Sources and updates'}</h2>
          {sourceUrl ? <p className="text-sm">{isItalian ? 'Fonte ufficiale per la sicurezza:' : 'Official security source:'} <a className="underline underline-offset-4" href={sourceUrl} target="_blank" rel="noreferrer">{isItalian ? 'consulta il sito ufficiale' : 'view the official source'}</a>.</p> : <p className="text-sm">{isItalian ? 'La fonte ufficiale per le regole di sicurezza non è ancora stata verificata.' : 'The official security source has not yet been verified.'}</p>}
          {airport.iata.toUpperCase() !== 'QUR' && airport.officialWebsite.startsWith('https://') && <p className="text-sm">{isItalian ? 'Sito ufficiale dell’aeroporto:' : 'Official airport website:'} <a className="underline underline-offset-4" href={airport.officialWebsite} target="_blank" rel="noreferrer">{airport.officialWebsite}</a></p>}
          {updated && <p className="text-sm text-zinc-500">{isItalian ? 'Ultima verifica registrata:' : 'Last recorded verification:'} {updated}.</p>}
        </section>

        {related.length > 0 && <nav aria-label={isItalian ? 'Aeroporti correlati' : 'Related airports'} className="space-y-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <h2 className="text-xl font-semibold">{isItalian ? 'Altri aeroporti della zona' : 'Other nearby airports'}</h2>
          <ul className="flex flex-wrap gap-3">{related.map((item) => <li key={item.iata}><Link className="underline underline-offset-4" href={airportPath(item, lang)}>{text(item.name_it, item.name_en, lang)} ({item.iata})</Link></li>)}</ul>
        </nav>}
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, '\\u003c') }} />
    </main>
  );
}
