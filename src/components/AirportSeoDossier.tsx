import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { AirportDossierInteractiveWrapper } from '@/components/AirportDossierInteractiveWrapper';
import { LanguageProvider } from '@/lib/i18n';
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
    <LanguageProvider initialLang={lang}>
      <div className="min-h-screen bg-[#FBFBFB] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
        <Header />

        <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 pb-16 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label={isItalian ? 'Percorso di navigazione' : 'Breadcrumb'} className="text-xs text-zinc-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:underline text-zinc-600 dark:text-zinc-400">AeroInfo</Link></li>
              <li aria-hidden="true" className="text-zinc-400">/</li>
              <li><Link href="/" className="hover:underline text-zinc-600 dark:text-zinc-400">{homeLabel}</Link></li>
              <li aria-hidden="true" className="text-zinc-400">/</li>
              <li aria-current="page" className="font-semibold text-zinc-900 dark:text-zinc-100">{displayName} ({airport.iata})</li>
            </ol>
          </nav>

          {/* PRIMARY INTERACTIVE EXPERIENCE: 4 Bolle Principali (Full-Width) */}
          <section aria-label="Interfaccia rapida a bolle" className="w-full">
            <AirportDossierInteractiveWrapper airport={airport} airports={airports} lang={lang} />
          </section>

          {/* COMPREHENSIVE DOSSIER & SEARCH ENGINE SECTION */}
          <article className="max-w-6xl mx-auto pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
            <header className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#05668D] dark:text-[#5EAAA8]">
                  {isItalian ? 'Scheda ufficiale' : 'Official dossier'} · {airport.iata}{airport.icao ? ` / ${airport.icao}` : ''}
                </p>
                <Link href={alternatePath} hrefLang={isItalian ? 'en' : 'it'} className="text-xs font-semibold text-[#05668D] dark:text-[#5EAAA8] hover:underline">
                  {isItalian ? '🇬🇧 Read in English' : '🇮🇹 Leggi in italiano'}
                </Link>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {displayName} ({airport.iata}) — {isItalian ? 'Dossier Aeroporto' : 'Airport Dossier'}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {isItalian
                  ? `Guida completa ai controlli di sicurezza, liquidi, terminal e servizi per lo scalo di ${displayName} a ${city}, ${country}.`
                  : `Comprehensive guide to security lanes, liquids allowances, terminals and passenger amenities at ${displayName} in ${city}, ${country}.`}
              </p>
              {updated && <p className="text-xs text-zinc-400">{isItalian ? 'Dati ufficiali verificati il' : 'Official data verified on'} {updated}.</p>}
            </header>

            {status !== 'indexable' && (
              <p className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
                {isItalian
                  ? 'Questa scheda è attualmente in fase di revisione da parte del nostro team editoriale.'
                  : 'This dossier is currently being reviewed by our editorial team.'}
              </p>
            )}

            {status === 'indexable' && airport.terminals.length > 0 && (
              <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-850">
                <h3 className="text-lg font-bold">{isItalian ? 'Terminal Passeggeri' : 'Passenger Terminals'}</h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {strongItems(airport.terminals).map((terminal) => (
                    <li key={terminal.id} className="rounded-2xl border border-zinc-200/80 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 shadow-2xs">
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{terminal.name}</h4>
                      <p className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">{text(terminal.transferInfo_it, terminal.transferInfo_en, lang)}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {status === 'indexable' && airport.transports.some((item) => !item.isUnverified) && (
              <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-850">
                <h3 className="text-lg font-bold">{isItalian ? 'Collegamenti e Trasporti' : 'Ground Transportation'}</h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {strongItems(airport.transports).map((item) => (
                    <li key={item.id} className="rounded-2xl border border-zinc-200/80 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 shadow-2xs space-y-1">
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{text(item.name_it, item.name_en, lang)}</h4>
                      <p className="text-xs leading-5 text-zinc-600 dark:text-zinc-400">{text(item.details_it, item.details_en, lang)}</p>
                      <p className="text-[11px] text-zinc-400">{text(item.pickupLocation_it, item.pickupLocation_en, lang)}{item.duration ? ` · ${item.duration}` : ''}{item.estimatedCost ? ` · ${item.estimatedCost}` : ''}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {related.length > 0 && (
              <nav aria-label={isItalian ? 'Aeroporti correlati' : 'Related airports'} className="space-y-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                <h3 className="text-base font-bold">{isItalian ? 'Altri aeroporti della stessa area' : 'Other airports serving this region'}</h3>
                <ul className="flex flex-wrap gap-2">
                  {related.map((item) => (
                    <li key={item.iata}>
                      <Link className="inline-block px-3 py-1 text-xs rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#5EAAA8] transition-colors" href={airportPath(item, lang)}>
                        {text(item.name_it, item.name_en, lang)} ({item.iata})
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </article>
        </main>

        <Footer />
        <CookieConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, '\\u003c') }} />
      </div>
    </LanguageProvider>
  );
}
