import type { Metadata } from 'next';
import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import { AirportSeoDossier } from '@/components/AirportSeoDossier';
import { airportPath } from '@/lib/airport-slug';
import { getAirportBySlug, getAirportSeoStatus, getSeoAirports, SITE_URL } from '@/lib/seo/airports';

type PageProps = { params: Promise<{ slug: string }> };

async function loadAirport(slug: string) {
  await connection();
  return getAirportBySlug(slug, 'it');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const airport = await loadAirport(slug);
  if (!airport) return { robots: { index: false, follow: false } };
  const indexable = getAirportSeoStatus(airport) === 'indexable';
  const title = `${airport.name_it} (${airport.iata}): sicurezza, liquidi e terminal | AeroInfo`;
  const description = `Regole di sicurezza, liquidi, terminal e informazioni di viaggio per ${airport.name_it}, aeroporto di ${airport.city_it}.`;
  return {
    title,
    description,
    alternates: {
      canonical: new URL(airportPath(airport, 'it'), SITE_URL).toString(),
      languages: {
        it: new URL(airportPath(airport, 'it'), SITE_URL).toString(),
        en: new URL(airportPath(airport, 'en'), SITE_URL).toString(),
        'x-default': new URL(airportPath(airport, 'it'), SITE_URL).toString(),
      },
    },
    robots: { index: indexable, follow: true },
    openGraph: { title, description, url: new URL(airportPath(airport, 'it'), SITE_URL).toString(), siteName: 'AeroInfo', locale: 'it_IT', type: 'article' },
  };
}

export default async function AirportPage({ params }: PageProps) {
  const { slug } = await params;
  const airport = await loadAirport(slug);
  if (!airport) notFound();
  const airports = await getSeoAirports();
  return <AirportSeoDossier airport={airport} airports={airports} lang="it" />;
}
