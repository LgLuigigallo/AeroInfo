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
    ? `${airportName} (${airport.iata}): 3D Scanners & Liquid Rules | AeroInfo`
    : `${airportName} (${airport.iata}): Security Screening, Liquids & Terminals | AeroInfo`;

  const description = has3D
    ? `Airport security guide for ${airportName} (${airport.iata}): next-gen 3D scanners in use, carry-on liquids and electronics rules, terminals, and city transport.`
    : `Security screening guide for ${airportName} (${airport.iata}): 100ml liquid limits, cabin baggage rules, terminals, and airport navigation in ${cityName}.`;

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
