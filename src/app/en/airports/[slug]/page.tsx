import type { Metadata } from 'next';
import { Suspense } from 'react';
import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import { AirportSeoDossier } from '@/components/AirportSeoDossier';
import { airportPath } from '@/lib/airport-slug';
import { getAirportBySlug, getAirportSeoStatus, getSeoAirports, SITE_URL } from '@/lib/seo/airports';

type PageProps = { params: Promise<{ slug: string }> };

async function loadAirport(slug: string) {
  await connection();
  return getAirportBySlug(slug, 'en');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const airport = await loadAirport(slug);
  if (!airport) return { robots: { index: false, follow: false } };
  const indexable = getAirportSeoStatus(airport) === 'indexable';
  const title = `${airport.name_en} (${airport.iata}): security, liquids and terminals | AeroInfo`;
  const description = `Security screening, baggage rules, terminals and travel information for ${airport.name_en} in ${airport.city_en}.`;
  return {
    title,
    description,
    alternates: {
      canonical: new URL(airportPath(airport, 'en'), SITE_URL).toString(),
      languages: {
        it: new URL(airportPath(airport, 'it'), SITE_URL).toString(),
        en: new URL(airportPath(airport, 'en'), SITE_URL).toString(),
        'x-default': new URL(airportPath(airport, 'it'), SITE_URL).toString(),
      },
    },
    robots: { index: indexable, follow: true },
    openGraph: { title, description, url: new URL(airportPath(airport, 'en'), SITE_URL).toString(), siteName: 'AeroInfo', locale: 'en_GB', type: 'article' },
  };
}

export default function EnglishAirportPage({ params }: PageProps) {
  return (
    <Suspense fallback={<p className="mx-auto max-w-5xl px-4 py-12 text-sm text-zinc-600">Loading airport page…</p>}>
      <EnglishAirportPageContent params={params} />
    </Suspense>
  );
}

async function EnglishAirportPageContent({ params }: PageProps) {
  const { slug } = await params;
  const airport = await loadAirport(slug);
  if (!airport) notFound();
  const airports = await getSeoAirports();
  return <AirportSeoDossier airport={airport} airports={airports} lang="en" />;
}
