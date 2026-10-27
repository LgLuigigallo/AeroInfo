import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { AirportDossierInteractiveWrapper } from '@/components/AirportDossierInteractiveWrapper';
import { AirportSemanticDossier } from '@/components/AirportSemanticDossier';
import { LanguageProvider } from '@/lib/i18n';
import { getAirportCombinedStructuredData } from '@/lib/seo/structured-data';
import type { Airport, Language } from '@/types/airport';

type Props = { airport: Airport; airports: Airport[]; lang: Language };

const text = (it: string | undefined, en: string | undefined, lang: Language) => (lang === 'it' ? it : en);

export function AirportSeoDossier({ airport, airports, lang }: Props) {
  const isItalian = lang === 'it';
  const displayName = text(airport.name_it, airport.name_en, lang) || airport.iata;
  const structuredData = getAirportCombinedStructuredData(airport, lang);

  return (
    <LanguageProvider initialLang={lang}>
      <div className="min-h-screen bg-[#FBFBFB] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-[#05668D] selection:text-white">
        <Header />

        <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-3 sm:pt-5 pb-16">
          {/* Breadcrumb Navigation HTML */}
          <nav aria-label={isItalian ? 'Percorso di navigazione' : 'Breadcrumb'} className="text-xs text-zinc-500 pb-3">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href={isItalian ? '/' : '/en'} className="hover:underline text-zinc-600 dark:text-zinc-400">
                  {isItalian ? 'Home' : 'Home'}
                </Link>
              </li>
              <li aria-hidden="true" className="text-zinc-400">/</li>
              <li>
                <Link href={isItalian ? '/' : '/en'} className="hover:underline text-zinc-600 dark:text-zinc-400">
                  {isItalian ? 'Aeroporti' : 'Airports'}
                </Link>
              </li>
              <li aria-hidden="true" className="text-zinc-400">/</li>
              <li aria-current="page" className="font-semibold text-zinc-900 dark:text-zinc-100">
                {displayName} ({airport.iata})
              </li>
            </ol>
          </nav>

          {/* Interactive 4-Bubble Experience */}
          <AirportDossierInteractiveWrapper airport={airport} airports={airports} lang={lang} />

          {/* Comprehensive Semantic SSR Dossier (Indexed by Googlebot, Bingbot, Perplexity, GPT-Search) */}
          <AirportSemanticDossier airport={airport} airports={airports} lang={lang} />
        </main>

        <Footer />
        <CookieConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
      </div>
    </LanguageProvider>
  );
}
