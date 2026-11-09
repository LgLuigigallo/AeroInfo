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

const canonical = `${SITE_URL}/en/3d-scanners-airports`;
const alternate = `${SITE_URL}/scanner-3d-aeroporti`;

export const metadata: Metadata = {
  title: '3D Airport Scanners: Active Airports & Liquid Rules | AeroInfo',
  description: 'Updated list of airports with next-gen EDS-CB C3 3D scanners in Italy and Europe. Check where you can leave liquids and laptops inside carry-on luggage.',
  alternates: {
    canonical,
    languages: {
      it: alternate,
      en: canonical,
      es: `${SITE_URL}/es/3d-scanners-airports`,
      'x-default': alternate,
    },
  },
  openGraph: {
    title: '3D Airport Scanners: Active Airports & Liquid Rules | AeroInfo',
    description: 'Updated list of airports with next-gen EDS-CB C3 3D scanners in Italy and Europe. Check where you can leave liquids and laptops inside carry-on luggage.',
    url: canonical,
    siteName: 'AeroInfo',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '3D Airport Scanners: Active Airports & Liquid Rules | AeroInfo',
    description: 'Updated list of airports with next-gen EDS-CB C3 3D scanners in Italy and Europe. Check where you can leave liquids and laptops inside carry-on luggage.',
  },
};

export default async function ScannersHubPageEn() {
  const airports = await loadAirports();
  const structuredData = getScannersHubStructuredData(airports, 'en');

  return (
    <>
      <ScannersHubClient airports={airports} lang="en" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
