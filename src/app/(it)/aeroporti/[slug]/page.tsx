import type { Metadata } from 'next';
import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import { AirportSeoDossier } from '@/components/AirportSeoDossier';
import { airportPath } from '@/lib/airport-slug';
import { getAirportBySlug, getAirportSeoStatus, getSeoAirports, SITE_URL } from '@/lib/seo/airports';

type PageProps = { params: Promise<{ slug: string }> };

// Airport data is loaded per request; resolve it before sending a response so
// an unknown slug can return a real HTTP 404 rather than a streamed 200.
export const instant = false;

async function loadAirport(slug: string) {
  await connection();
  return getAirportBySlug(slug, 'it');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const airport = await loadAirport(slug);
  if (!airport) return { robots: { index: false, follow: false } };
  const indexable = getAirportSeoStatus(airport) === 'indexable';

  const has3D = Boolean(airport.securityPolicy?.has3DScanners);
  const title = has3D
    ? `${airport.name_it} (${airport.iata}): Scanner 3D e Regole Liquidi | AeroInfo`
    : `${airport.name_it} (${airport.iata}): Controlli Sicurezza, Liquidi e Terminal | AeroInfo`;

  const description = has3D
    ? `Guida ai controlli di ${airport.name_it} (${airport.iata}): presenza di scanner 3D per non estrarre liquidi e PC, regole bagagli, terminal e collegamenti per ${airport.city_it}.`
    : `Guida ai controlli di sicurezza a ${airport.name_it} (${airport.iata}): limite liquidi 100ml in busta trasparente, regole bagaglio a mano, terminal e tempi di attesa.`;

  const canonicalUrl = new URL(airportPath(airport, 'it'), SITE_URL).toString();
  const alternateEn = new URL(airportPath(airport, 'en'), SITE_URL).toString();

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        it: canonicalUrl,
        en: alternateEn,
        'x-default': canonicalUrl,
      },
    },
    robots: { index: indexable, follow: true },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'AeroInfo',
      locale: 'it_IT',
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function AirportPage({ params }: PageProps) {
  const { slug } = await params;
  const airport = await loadAirport(slug);
  if (!airport) notFound();
  const airports = await getSeoAirports();
  return <AirportSeoDossier airport={airport} airports={airports} lang="it" />;
}
