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
  const persisted = lang === 'it' ? airport.seoSlugIt : (lang === 'es' ? (airport.seoSlugEs || airport.seoSlugEn) : airport.seoSlugEn);
  if (persisted) return persisted;
  const name = lang === 'it' ? airport.name_it : (lang === 'es' ? (airport.name_es || airport.name_en) : airport.name_en);
  const city = lang === 'it' ? airport.city_it : (lang === 'es' ? (airport.city_es || airport.city_en) : airport.city_en);
  const fallback = lang === 'it' ? 'aeroporto' : (lang === 'es' ? 'aeropuerto' : 'airport');
  return `${slugPart(name || city || fallback)}-${airport.iata.toLowerCase()}`;
}

export function airportPath(airport: Airport, lang: Language): string {
  const slug = makeAirportSlug(airport, lang);
  if (lang === 'it') return `/aeroporti/${slug}`;
  if (lang === 'es') return `/es/airports/${slug}`;
  return `/en/airports/${slug}`;
}
