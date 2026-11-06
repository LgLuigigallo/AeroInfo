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

const canonical = `${SITE_URL}/scanner-3d-aeroporti`;
const alternate = `${SITE_URL}/en/3d-scanners-airports`;

export const metadata: Metadata = {
  title: 'Scanner 3D negli Aeroporti: Dove Sono Attivi e Regole Liquidi | AeroInfo',
  description: 'Elenco aggiornato degli aeroporti con scanner tomografici 3D EDS-CB C3 in Italia ed Europa. Scopri dove puoi portare liquidi e PC nel bagaglio a mano senza estrarli.',
  alternates: {
    canonical,
    languages: {
      it: canonical,
      en: alternate,
      'x-default': canonical,
    },
  },
  openGraph: {
    title: 'Scanner 3D negli Aeroporti: Dove Sono Attivi e Regole Liquidi | AeroInfo',
    description: 'Elenco aggiornato degli aeroporti con scanner tomografici 3D EDS-CB C3 in Italia ed Europa. Scopri dove puoi portare liquidi e PC nel bagaglio a mano senza estrarli.',
    url: canonical,
    siteName: 'AeroInfo',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Scanner 3D negli Aeroporti: Dove Sono Attivi e Regole Liquidi | AeroInfo',
    description: 'Elenco aggiornato degli aeroporti con scanner tomografici 3D EDS-CB C3 in Italia ed Europa. Scopri dove puoi portare liquidi e PC nel bagaglio a mano senza estrarli.',
  },
};

export default async function ScannersHubPageIt() {
  const airports = await loadAirports();
  const structuredData = getScannersHubStructuredData(airports, 'it');

  return (
    <>
      <ScannersHubClient airports={airports} lang="it" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
