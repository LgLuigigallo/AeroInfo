import type { Metadata } from 'next';
import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import { AirportSeoDossier } from '@/components/AirportSeoDossier';
import { airportPath } from '@/lib/airport-slug';
import { getAirportBySlug, getAirportSeoStatus, getSeoAirports, SITE_URL } from '@/lib/seo/airports';

type PageProps = { params: Promise<{ slug: string }> };

// Resolve request-time airport data before responding, preserving real 404s.
export const instant = false;

async function loadAirport(slug: string) {
  await connection();
  return getAirportBySlug(slug, 'en');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const airport = await loadAirport(slug);
  if (!airport) return { robots: { index: false, follow: false } };
  const indexable = getAirportSeoStatus(airport) === 'indexable';

  const has3D = Boolean(airport.securityPolicy?.has3DScanners);
  const airportName = airport.name_en || airport.name_it;
  const cityName = airport.city_en || airport.city_it;

  const title = has3D
    ? `${airportName} (${airport.iata}) Airport Info: 3D Scanners, Liquids & Terminal Guide | AeroInfo`
    : `${airportName} (${airport.iata}) Airport Info: Security Screening, Liquids & Terminals | AeroInfo`;

  const description = has3D
    ? `${airportName} (${airport.iata}) airport guide: next-gen 3D scanners, liquids & cabin baggage rules. Verified exclusively from official sources, updated every 24h.`
    : `${airportName} (${airport.iata}) airport guide: 100ml liquid limits, cabin baggage rules & terminals. Verified exclusively from official sources, updated every 24h.`;

  const canonicalUrl = new URL(airportPath(airport, 'en'), SITE_URL).toString();
  const alternateIt = new URL(airportPath(airport, 'it'), SITE_URL).toString();

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        it: alternateIt,
        en: canonicalUrl,
        'x-default': alternateIt,
      },
    },
    robots: { index: indexable, follow: true },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'AeroInfo',
      locale: 'en_GB',
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function EnglishAirportPage({ params }: PageProps) {
  const { slug } = await params;
  const airport = await loadAirport(slug);
  if (!airport) notFound();
  const airports = await getSeoAirports();
  return <AirportSeoDossier airport={airport} airports={airports} lang="en" />;
}
