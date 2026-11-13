import { NextRequest, NextResponse } from 'next/server';
import { airportsData } from '@/data/airports';
import { makeAirportSlug } from '@/lib/airport-slug';

type AirportSlugRow = {
  iata_code: string;
  name_it: string | null;
  seo_slug_it: string | null;
};

function slugFromDatabaseName(name: string, iata: string): string {
  const normalized = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${normalized || 'aeroporto'}-${iata.toLowerCase()}`;
}

async function getAirportSlug(iata: string): Promise<string | null> {
  const staticAirport = airportsData.find((airport) => airport.iata.toUpperCase() === iata);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const endpoint = new URL('/rest/v1/airports', supabaseUrl);
      endpoint.searchParams.set('select', 'iata_code,name_it,seo_slug_it');
      endpoint.searchParams.set('iata_code', `eq.${iata}`);
      endpoint.searchParams.set('limit', '1');
      const response = await fetch(endpoint, {
        headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${supabaseAnonKey}` },
        cache: 'no-store',
      });
      if (response.ok) {
        const rows = await response.json() as AirportSlugRow[];
        const row = rows[0];
        if (row) {
          if (row.seo_slug_it) return row.seo_slug_it;
          if (!staticAirport && row.name_it) return slugFromDatabaseName(row.name_it, iata);
        }
      }
    } catch {
      // Keep legacy links working for the curated static airport catalog.
    }
  }

  return staticAirport ? makeAirportSlug(staticAirport, 'it') : null;
}

function hasStaticAirportSlug(slug: string, lang: 'it' | 'en' | 'es'): boolean {
  return airportsData.some((airport) => makeAirportSlug(airport, lang) === slug);
}

function findStaticAirportByAlias(rawSlug: string): { airport: typeof airportsData[0]; iata: string } | null {
  const norm = rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (!norm) return null;

  // 1. Direct IATA code (e.g. fco)
  if (/^[a-z0-9]{3}$/i.test(norm)) {
    const direct = airportsData.find((a) => a.iata.toLowerCase() === norm);
    if (direct) return { airport: direct, iata: direct.iata };
  }

  // 2. Exact match in canonical slugs
  for (const a of airportsData) {
    if (makeAirportSlug(a, 'it') === norm || makeAirportSlug(a, 'en') === norm || makeAirportSlug(a, 'es') === norm) {
      return { airport: a, iata: a.iata };
    }
  }

  // 3. Ends with -iata (e.g. roma-fiumicino-fco)
  for (const a of airportsData) {
    const iataLower = a.iata.toLowerCase();
    if (norm === iataLower || norm.endsWith(`-${iataLower}`)) {
      return { airport: a, iata: a.iata };
    }
  }

  // 4. Match airport id or city
  for (const a of airportsData) {
    const id = a.id?.toLowerCase();
    const cityIt = a.city_it?.toLowerCase();
    const cityEn = a.city_en?.toLowerCase();
    const cityEs = a.city_es?.toLowerCase();
    if (norm === id || norm === cityIt || norm === cityEn || norm === cityEs) {
      return { airport: a, iata: a.iata };
    }
  }

  // 5. Friendly substring inside canonical slugs (e.g. fiumicino, malpensa, london-heathrow)
  for (const a of airportsData) {
    const slugIt = makeAirportSlug(a, 'it');
    const slugEn = makeAirportSlug(a, 'en');
    if (slugIt.includes(norm) || slugEn.includes(norm)) {
      return { airport: a, iata: a.iata };
    }
  }

  return null;
}

export async function proxy(request: NextRequest) {
  const italianSlug = request.nextUrl.pathname.match(/^\/aeroporti\/([^/]+)\/?$/)?.[1];
  const englishSlug = request.nextUrl.pathname.match(/^\/en\/airports\/([^/]+)\/?$/)?.[1];
  const spanishSlug = request.nextUrl.pathname.match(/^\/es\/airports\/([^/]+)\/?$/)?.[1];
  const slug = italianSlug || englishSlug || spanishSlug;
  if (slug) {
    const lang = italianSlug ? 'it' : (spanishSlug ? 'es' : 'en');
    if (hasStaticAirportSlug(slug, lang)) return NextResponse.next();

    // Resolve alias or friendly slug (e.g. /aeroporti/fiumicino -> /aeroporti/aeroporto-internazionale-leonardo-da-vinci-fiumicino-fco)
    const staticMatch = findStaticAirportByAlias(slug);
    if (staticMatch) {
      const canonicalSlug = makeAirportSlug(staticMatch.airport, lang);
      if (canonicalSlug !== slug) {
        const destination = request.nextUrl.clone();
        destination.pathname = lang === 'it'
          ? `/aeroporti/${canonicalSlug}`
          : (lang === 'es' ? `/es/airports/${canonicalSlug}` : `/en/airports/${canonicalSlug}`);
        destination.search = '';
        return NextResponse.redirect(destination, 308);
      }
      return NextResponse.next();
    }

    // Support short IATA codes or uppercase/lowercase IATA aliases from database
    const upperSlug = slug.toUpperCase();
    if (/^[A-Z0-9]{3}$/.test(upperSlug)) {
      const dbSlug = await getAirportSlug(upperSlug);
      if (dbSlug) {
        const destination = request.nextUrl.clone();
        destination.pathname = lang === 'it'
          ? `/aeroporti/${dbSlug}`
          : (lang === 'es' ? `/es/airports/${dbSlug}` : `/en/airports/${dbSlug}`);
        destination.search = '';
        return NextResponse.redirect(destination, 308);
      }
    }

    // Let Next.js App Router handle dynamic database lookup and native branded 404
    return NextResponse.next();
  }

  if (request.nextUrl.pathname !== '/') return NextResponse.next();
  const rawIata = request.nextUrl.searchParams.get('airport');
  if (!rawIata) return NextResponse.next();

  const iata = rawIata.trim().toUpperCase();
  if (!/^[A-Z0-9]{3}$/.test(iata)) return NextResponse.next();

  const airportSlug = await getAirportSlug(iata);
  if (!airportSlug) return NextResponse.next();

  const destination = request.nextUrl.clone();
  destination.pathname = `/aeroporti/${airportSlug}`;
  destination.search = '';
  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: [
    { source: '/', has: [{ type: 'query', key: 'airport' }] },
    '/aeroporti/:slug',
    '/en/airports/:slug',
    '/es/airports/:slug',
  ],
};
