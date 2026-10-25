import type { MetadataRoute } from 'next';
import { connection } from 'next/server';
import { airportPath } from '@/lib/airport-slug';
import { getAirportSeoStatus, getIndexableAirports, SITE_URL } from '@/lib/seo/airports';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const airports = await getIndexableAirports();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'daily', priority: 1 },
  ];

  for (const airport of airports) {
    if (getAirportSeoStatus(airport) !== 'indexable') continue;
    const it = new URL(airportPath(airport, 'it'), SITE_URL).toString();
    const en = new URL(airportPath(airport, 'en'), SITE_URL).toString();
    const verifiedDate = airport.securityPolicy.lastVerifiedDate;
    const lastModified = verifiedDate ? new Date(`${verifiedDate}T00:00:00Z`) : undefined;
    entries.push(
      {
        url: it,
        ...(lastModified && !Number.isNaN(lastModified.getTime()) ? { lastModified } : {}),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: { languages: { it, en, 'x-default': it } },
      },
      {
        url: en,
        ...(lastModified && !Number.isNaN(lastModified.getTime()) ? { lastModified } : {}),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: { languages: { it, en, 'x-default': it } },
      },
    );
  }

  return entries;
}
