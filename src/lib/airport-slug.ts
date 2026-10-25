import type { Airport, Language } from '@/types/airport';

function slugPart(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function makeAirportSlug(airport: Airport, lang: Language): string {
  const persisted = lang === 'it' ? airport.seoSlugIt : airport.seoSlugEn;
  if (persisted) return persisted;
  const name = lang === 'it' ? airport.name_it : airport.name_en;
  const city = lang === 'it' ? airport.city_it : airport.city_en;
  return `${slugPart(name || city || 'aeroporto')}-${airport.iata.toLowerCase()}`;
}

export function airportPath(airport: Airport, lang: Language): string {
  const slug = makeAirportSlug(airport, lang);
  return lang === 'it' ? `/aeroporti/${slug}` : `/en/airports/${slug}`;
}
