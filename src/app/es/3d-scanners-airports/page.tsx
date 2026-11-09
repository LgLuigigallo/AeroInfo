import type { Metadata } from 'next';
import { connection } from 'next/server';
import { getIndexableAirports, SITE_URL } from '@/lib/seo/airports';
import { getScannersHubStructuredData } from '@/lib/seo/structured-data';
import { ScannersHubClient } from '@/components/ScannersHubClient';

export const instant = false;

async function loadAirports() {
  await connection();
  return getIndexableAirports();
}

const canonical = `${SITE_URL}/es/3d-scanners-airports`;
const alternateIt = `${SITE_URL}/scanner-3d-aeroporti`;
const alternateEn = `${SITE_URL}/en/3d-scanners-airports`;

export const metadata: Metadata = {
  title: 'Escáneres 3D en Aeropuertos: Dónde Están Activos y Reglas de Líquidos | AeroInfo',
  description: 'Lista actualizada de aeropuertos con escáneres tomográficos 3D EDS-CB C3 en España y Europa. Dónde llevar líquidos y ordenadores en el equipaje de mano sin sacarlos.',
  alternates: {
    canonical,
    languages: {
      it: alternateIt,
      en: alternateEn,
      es: canonical,
      'x-default': alternateIt,
    },
  },
  openGraph: {
    title: 'Escáneres 3D en Aeropuertos: Dónde Están Activos y Reglas de Líquidos | AeroInfo',
    description: 'Lista actualizada de aeropuertos con escáneres tomográficos 3D EDS-CB C3 en España y Europa. Dónde llevar líquidos y ordenadores en el equipaje de mano sin sacarlos.',
    url: canonical,
    siteName: 'AeroInfo',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Escáneres 3D en Aeropuertos: Dónde Están Activos y Reglas de Líquidos | AeroInfo',
    description: 'Lista actualizada de aeropuertos con escáneres tomográficos 3D EDS-CB C3 en España y Europa. Dónde llevar líquidos y ordenadores en el equipaje de mano sin sacarlos.',
  },
};

export default async function ScannersHubPageEs() {
  const airports = await loadAirports();
  const structuredData = getScannersHubStructuredData(airports, 'es');

  return (
    <>
      <ScannersHubClient airports={airports} lang="es" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
