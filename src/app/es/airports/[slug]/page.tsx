import type { Metadata } from 'next';
import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import { AirportSeoDossier } from '@/components/AirportSeoDossier';
import { airportPath } from '@/lib/airport-slug';
import { getAirportBySlug, getAirportSeoStatus, getSeoAirports, SITE_URL } from '@/lib/seo/airports';

type PageProps = { params: Promise<{ slug: string }> };

export const instant = false;

async function loadAirport(slug: string) {
  await connection();
  return getAirportBySlug(slug, 'es');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const airport = await loadAirport(slug);
  if (!airport) return { robots: { index: false, follow: false } };
  const indexable = getAirportSeoStatus(airport) === 'indexable';

  const has3D = Boolean(airport.securityPolicy?.has3DScanners);
  const airportName = airport.name_es || airport.name_en || airport.name_it;

  const title = has3D
    ? `Información Aeropuerto ${airportName} (${airport.iata}): Escáneres 3D, Líquidos y Terminales | AeroInfo`
    : `Información Aeropuerto ${airportName} (${airport.iata}): Controles de Seguridad, Líquidos y Terminales | AeroInfo`;

  const description = has3D
    ? `Información de ${airportName} (${airport.iata}): escáneres 3D para no sacar líquidos ni ordenadores, terminales y controles. Datos de fuentes oficiales actualizados cada 24h.`
    : `Información de ${airportName} (${airport.iata}): límite de líquidos de 100ml en bolsa transparente, reglas de equipaje y terminales. Datos de fuentes oficiales actualizados cada 24h.`;

  const canonicalUrl = new URL(airportPath(airport, 'es'), SITE_URL).toString();
  const alternateIt = new URL(airportPath(airport, 'it'), SITE_URL).toString();
  const alternateEn = new URL(airportPath(airport, 'en'), SITE_URL).toString();

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        it: alternateIt,
        en: alternateEn,
        es: canonicalUrl,
        'x-default': alternateIt,
      },
    },
    robots: { index: indexable, follow: true },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'AeroInfo',
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function SpanishAirportPage({ params }: PageProps) {
  const { slug } = await params;
  const airport = await loadAirport(slug);
  if (!airport) notFound();
  const airports = await getSeoAirports();
  return <AirportSeoDossier airport={airport} airports={airports} lang="es" />;
}
