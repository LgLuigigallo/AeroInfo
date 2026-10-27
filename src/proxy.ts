import { NextRequest, NextResponse } from 'next/server';
import { airportsData } from '@/data/airports';
import { makeAirportSlug } from '@/lib/airport-slug';

type AirportSlugRow = {
  iata_code: string;
  name_it: string | null;
  seo_slug_it: string | null;
};

type LocalizedSlug = 'seo_slug_it' | 'seo_slug_en';

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

function hasStaticAirportSlug(slug: string, lang: 'it' | 'en'): boolean {
  return airportsData.some((airport) => makeAirportSlug(airport, lang) === slug);
}

async function isAirportSlugInDatabase(slug: string, column: LocalizedSlug): Promise<boolean | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;

  try {
    const endpoint = new URL('/rest/v1/airports', supabaseUrl);
    endpoint.searchParams.set('select', column);
    endpoint.searchParams.set(column, `eq.${slug}`);
    endpoint.searchParams.set('limit', '1');
    const response = await fetch(endpoint, {
      headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${supabaseAnonKey}` },
      cache: 'no-store',
    });
    if (!response.ok) return null;
    const rows = await response.json() as Array<Record<LocalizedSlug, string>>;
    return rows.length > 0;
  } catch {
    return null;
  }
}

function unavailableResponse(lang: 'it' | 'en'): NextResponse {
  const title = lang === 'it' ? 'Scheda temporaneamente non disponibile' : 'Airport page temporarily unavailable';
  const message = lang === 'it'
    ? 'Non riusciamo a verificare questo indirizzo in questo momento. Riprova tra poco.'
    : 'We cannot verify this address right now. Please try again shortly.';
  const homeLabel = lang === 'it' ? 'Torna alla home' : 'Back to home';
  const homePath = '/';
  return new NextResponse(
    `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | AeroInfo</title></head><body><main><h1>${title}</h1><p>${message}</p><a href="${homePath}">${homeLabel}</a></main></body></html>`,
    { status: 503, headers: { 'content-type': 'text/html; charset=utf-8', 'retry-after': '60', 'x-robots-tag': 'noindex' } },
  );
}

function notFoundResponse(lang: 'it' | 'en'): NextResponse {
  const title = lang === 'it' ? 'Aeroporto non trovato' : 'Airport not found';
  const message = lang === 'it'
    ? 'La scheda richiesta non esiste o il suo indirizzo non è valido.'
    : 'The requested airport page does not exist or its address is invalid.';
  const homeLabel = lang === 'it' ? 'Torna alla home' : 'Browse airports';
  const homePath = '/';
  return new NextResponse(
    `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | AeroInfo</title></head><body><main><h1>${title}</h1><p>${message}</p><a href="${homePath}">${homeLabel}</a></main></body></html>`,
    { status: 404, headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' } },
  );
}

export async function proxy(request: NextRequest) {
  const italianSlug = request.nextUrl.pathname.match(/^\/aeroporti\/([^/]+)\/?$/)?.[1];
  const englishSlug = request.nextUrl.pathname.match(/^\/en\/airports\/([^/]+)\/?$/)?.[1];
  const slug = italianSlug || englishSlug;
  if (slug) {
    const lang = italianSlug ? 'it' : 'en';
    if (hasStaticAirportSlug(slug, lang)) return NextResponse.next();

    // Support short IATA codes or uppercase/lowercase IATA aliases (e.g. /aeroporti/fco, /aeroporti/FCO)
    const upperSlug = slug.toUpperCase();
    if (/^[A-Z0-9]{3}$/.test(upperSlug)) {
      const staticAirportByIata = airportsData.find((a) => a.iata.toUpperCase() === upperSlug);
      if (staticAirportByIata) {
        const canonicalSlug = makeAirportSlug(staticAirportByIata, lang);
        const destination = request.nextUrl.clone();
        destination.pathname = lang === 'it' ? `/aeroporti/${canonicalSlug}` : `/en/airports/${canonicalSlug}`;
        destination.search = '';
        return NextResponse.redirect(destination, 308);
      }

      const dbSlug = await getAirportSlug(upperSlug);
      if (dbSlug) {
        const destination = request.nextUrl.clone();
        destination.pathname = lang === 'it' ? `/aeroporti/${dbSlug}` : `/en/airports/${dbSlug}`;
        destination.search = '';
        return NextResponse.redirect(destination, 308);
      }
    }

    const isInDatabase = await isAirportSlugInDatabase(slug, lang === 'it' ? 'seo_slug_it' : 'seo_slug_en');
    if (isInDatabase === true) return NextResponse.next();
    if (isInDatabase === false) return notFoundResponse(lang);
    return unavailableResponse(lang);
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
  ],
};
