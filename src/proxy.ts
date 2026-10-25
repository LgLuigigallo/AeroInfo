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

export async function proxy(request: NextRequest) {
  const rawIata = request.nextUrl.searchParams.get('airport');
  if (!rawIata) return NextResponse.next();

  const iata = rawIata.trim().toUpperCase();
  if (!/^[A-Z0-9]{3}$/.test(iata)) return NextResponse.next();

  const slug = await getAirportSlug(iata);
  if (!slug) return NextResponse.next();

  const destination = request.nextUrl.clone();
  destination.pathname = `/aeroporti/${slug}`;
  destination.search = '';
  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: [{ source: '/', has: [{ type: 'query', key: 'airport' }] }],
};
