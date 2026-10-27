import { NextRequest, NextResponse } from 'next/server';
import { getLiveAirports } from '@/lib/supabase';
import { seedAllAirportsToSupabase } from '@/lib/supabase-sync';
import { adminDb, isAdminIdentity, requireAdmin, writeAdminAudit } from '@/lib/admin/server';
import { evaluateAirportSeoQuality } from '@/lib/seo/airports';
import type { Airport } from '@/types/airport';

export async function GET(request: NextRequest) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  if (!adminDb) return NextResponse.json({ error: 'Archivio admin non configurato.' }, { status: 503 });
  const airports = await getLiveAirports();
  const params = request.nextUrl.searchParams;
  const query = params.get('q')?.trim().toLocaleLowerCase();
  const status = params.get('seoStatus');
  const items = airports.filter((airport) => {
    const matchesQuery = !query || [airport.iata, airport.name_it, airport.name_en, airport.city_it, airport.city_en, airport.country_it, airport.country_en].some((value) => value?.toLocaleLowerCase().includes(query));
    const matchesStatus = !status || airport.seoStatus === status;
    return matchesQuery && matchesStatus;
  }).map((airport) => ({
    ...airport,
    seoReasons: evaluateAirportSeoQuality(airport),
  }));
  const page = Math.max(1, Number(params.get('page')) || 1);
  const pageSize = 25;
  return NextResponse.json({ items: items.slice((page - 1) * pageSize, page * pageSize), count: items.length, page, pageSize });
}

export async function PUT(request: NextRequest) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  if (!adminDb) return NextResponse.json({ error: 'Archivio admin non configurato.' }, { status: 503 });
  if (Number(request.headers.get('content-length') || 0) > 250_000) return NextResponse.json({ error: 'Scheda troppo grande.' }, { status: 413 });
  let airport: Airport;
  try { airport = await request.json(); } catch { return NextResponse.json({ error: 'JSON non valido.' }, { status: 400 }); }
  if (!airport || typeof airport !== 'object' || !/^[A-Z0-9]{3}$/.test(String(airport.iata || '').toUpperCase())) return NextResponse.json({ error: 'Scheda aeroporto non valida.' }, { status: 400 });
  const required = ['name_it', 'name_en', 'city_it', 'city_en', 'country_it', 'country_en', 'countryCode', 'officialWebsite'];
  if (required.some((field) => typeof (airport as unknown as Record<string, unknown>)[field] !== 'string' || !(airport as unknown as Record<string, string>)[field].trim())) return NextResponse.json({ error: 'Completa nome, città, paese e sito ufficiale in entrambe le lingue.' }, { status: 400 });
  let siteUrl: URL;
  try { siteUrl = new URL(airport.officialWebsite); } catch { return NextResponse.json({ error: 'Il sito ufficiale deve essere un URL HTTPS valido.' }, { status: 400 }); }
  if (siteUrl.protocol !== 'https:' || !/^[A-Z]{2}$/.test(airport.countryCode) || !Number.isFinite(airport.coordinates?.lat) || !Number.isFinite(airport.coordinates?.lng) || Math.abs(airport.coordinates.lat) > 90 || Math.abs(airport.coordinates.lng) > 180 || !Number.isInteger(airport.difficultyRating) || airport.difficultyRating < 1 || airport.difficultyRating > 5) {
    return NextResponse.json({ error: 'Codice paese, coordinate o difficoltà non validi.' }, { status: 400 });
  }
  if (!airport.securityPolicy || !Array.isArray(airport.terminals) || !Array.isArray(airport.airlines) || !Array.isArray(airport.amenities) || !Array.isArray(airport.venues) || !Array.isArray(airport.transports)) {
    return NextResponse.json({ error: 'La politica di sicurezza e gli elenchi della scheda sono obbligatori.' }, { status: 400 });
  }
  const current = (await getLiveAirports()).find((item) => item.iata.toUpperCase() === airport.iata.toUpperCase());
  if (!current) return NextResponse.json({ error: 'Aeroporto non trovato.' }, { status: 404 });
  const changedFields = Object.keys(airport).filter((key) => JSON.stringify((airport as unknown as Record<string, unknown>)[key]) !== JSON.stringify((current as unknown as Record<string, unknown>)[key]));
  try { await writeAdminAudit(identity, 'airport.update', 'airport', airport.iata.toUpperCase(), { changedFields }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Audit non disponibile.' }, { status: 503 }); }
  const { error: lockError } = await adminDb.from('airports').update({ admin_content_locked: true, updated_at: new Date().toISOString() }).eq('iata_code', airport.iata.toUpperCase());
  if (lockError) return NextResponse.json({ error: 'Impossibile proteggere la scheda dal seeding; modifica non applicata.' }, { status: 503 });
  const result = await seedAllAirportsToSupabase([{ ...airport, iata: airport.iata.toUpperCase() }], { allowAdminLocked: true });
  if (!result.success) {
    await writeAdminAudit(identity, 'airport.update.completed', 'airport', airport.iata.toUpperCase(), { outcome: 'partial_failure', changedFields, errorCount: result.errors.length }, 'failure');
    return NextResponse.json({ error: 'Salvataggio incompleto.', details: result.errors }, { status: 503 });
  }
  await writeAdminAudit(identity, 'airport.update.completed', 'airport', airport.iata.toUpperCase(), { changedFields }, 'success');
  return NextResponse.json({ success: true, changedFields, seoReasons: evaluateAirportSeoQuality(airport) });
}
