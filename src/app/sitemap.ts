import type { MetadataRoute } from 'next';
import { airportsData } from '@/data/airports';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aero-info.vercel.app';
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/feedback`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const airportRoutes: MetadataRoute.Sitemap = airportsData.map((airport) => ({
    url: `${baseUrl}/?airport=${airport.iata.toLowerCase()}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...airportRoutes];
}
