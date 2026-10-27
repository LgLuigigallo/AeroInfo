import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { AirportDossierInteractiveWrapper } from '@/components/AirportDossierInteractiveWrapper';
import { LanguageProvider } from '@/lib/i18n';
import { getAirportBreadcrumbStructuredData } from '@/lib/seo/structured-data';
import type { Airport, Language } from '@/types/airport';

type Props = { airport: Airport; airports: Airport[]; lang: Language };

const text = (it: string | undefined, en: string | undefined, lang: Language) => (lang === 'it' ? it : en);

export function AirportSeoDossier({ airport, airports, lang }: Props) {
  const displayName = text(airport.name_it, airport.name_en, lang) || airport.iata;
  const breadcrumbs = getAirportBreadcrumbStructuredData(displayName, lang);

  return (
    <LanguageProvider initialLang={lang}>
      <div className="min-h-screen bg-[#FBFBFB] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-[#05668D] selection:text-white">
        <Header />

        <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 pb-16">
          <AirportDossierInteractiveWrapper airport={airport} airports={airports} lang={lang} />
        </main>

        <Footer />
        <CookieConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, '\\u003c') }}
        />
      </div>
    </LanguageProvider>
  );
}
