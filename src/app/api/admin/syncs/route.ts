import { NextRequest, NextResponse } from 'next/server';
import { scraperEngine } from '@/lib/scraper/engine';
import { getLiveAirports } from '@/lib/supabase';
import { adminDb, isAdminIdentity, requireAdmin, writeAdminAudit } from '@/lib/admin/server';
import { evaluateAirportSeoQuality, saveAirportSeoEvaluation } from '@/lib/seo/airports';

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  if (!adminDb) return NextResponse.json({ error: 'Archivio admin non configurato.' }, { status: 503 });
  const page = Math.max(1, Number(request.nextUrl.searchParams.get('page')) || 1);
  const pageSize = Math.min(50, Math.max(10, Number(request.nextUrl.searchParams.get('pageSize')) || 20));
  let query = adminDb.from('sync_logs').select('id, airport_iata, official_url, status, changes_detected, log_details, executed_at', { count: 'exact' }).order('executed_at', { ascending: false });
  const params = request.nextUrl.searchParams;
  if (params.get('status')) query = query.eq('status', params.get('status'));
  if (params.get('q')) query = query.ilike('airport_iata', `%${params.get('q')!.replace(/[^A-Z0-9]/gi, '')}%`);
  if (params.get('from')) query = query.gte('executed_at', params.get('from')!);
  if (params.get('to')) query = query.lte('executed_at', `${params.get('to')}T23:59:59.999Z`);
  const { data, count, error } = await query.range((page - 1) * pageSize, page * pageSize - 1);
  if (error) return NextResponse.json({ error: 'Impossibile caricare le sincronizzazioni.' }, { status: 503 });
  return NextResponse.json({ items: data || [], count: count || 0, page, pageSize });
}

export async function POST(request: NextRequest) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  if (!adminDb) return NextResponse.json({ error: 'Archivio admin non configurato.' }, { status: 503 });
  let body: { iata?: string };
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Richiesta non valida.' }, { status: 400 }); }
  const iata = body.iata?.toUpperCase();
  if (!iata || !/^[A-Z0-9]{3}$/.test(iata)) return NextResponse.json({ error: 'Codice IATA non valido.' }, { status: 400 });
  const airport = (await getLiveAirports()).find((item) => item.iata.toUpperCase() === iata);
  if (!airport) return NextResponse.json({ error: 'Aeroporto non trovato.' }, { status: 404 });
  try { await writeAdminAudit(identity, 'sync.run', 'airport', iata); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Audit non disponibile.' }, { status: 503 }); }
  const [result] = await scraperEngine.runWeeklySync([airport]);
  if (!result) return NextResponse.json({ error: 'La sincronizzazione non ha restituito un risultato.' }, { status: 502 });
  const persistenceErrors: string[] = [];
  if (result.success && result.policyVerified && result.extractedPolicy) {
    const { data: row, error: airportError } = await adminDb.from('airports').select('id').eq('iata_code', iata).maybeSingle();
    if (airportError || !row) persistenceErrors.push('Scheda aeroporto non disponibile per il salvataggio.');
    else {
      const policy = result.extractedPolicy;
      const payload = {
        airport_id: row.id,
        ...(typeof policy.has3DScanners === 'boolean' ? { has_3d_scanners: policy.has3DScanners } : {}),
        ...(typeof policy.liquidsMustBeRemoved === 'boolean' ? { liquids_must_be_removed: policy.liquidsMustBeRemoved } : {}),
        ...(policy.liquidsAllowance_it ? { liquids_allowance_it: policy.liquidsAllowance_it } : {}),
        ...(policy.liquidsAllowance_en ? { liquids_allowance_en: policy.liquidsAllowance_en } : {}),
        ...(typeof policy.electronicsInBag === 'boolean' ? { electronics_in_bag: policy.electronicsInBag } : {}),
        official_source_url: result.sourceUrl,
        source_verified_at: policy.lastVerifiedDate ? `${policy.lastVerifiedDate}T00:00:00.000Z` : result.timestamp,
      };
      const { data: existing, error: readError } = await adminDb.from('security_policies').select('id').eq('airport_id', row.id).maybeSingle();
      if (readError) persistenceErrors.push('Lettura politica sicurezza non riuscita.');
      else {
        const write = existing?.id
          ? await adminDb.from('security_policies').update(payload).eq('id', existing.id)
          : await adminDb.from('security_policies').insert(payload);
        if (write.error) persistenceErrors.push('Salvataggio politica sicurezza non riuscito.');
      }
    }
  }
  if (result.extractedVenues?.length) {
    const { data: row } = await adminDb.from('airports').select('id').eq('iata_code', iata).maybeSingle();
    const venues = result.extractedVenues.filter((venue) => !venue.isUnverified && venue.terminal && venue.location);
    if (row && venues.length) {
      for (const venue of venues) {
        const { data: existing } = await adminDb.from('venues').select('id').eq('airport_id', row.id).ilike('name', venue.name).maybeSingle();
        const payload = { airport_id: row.id, name: venue.name, category: venue.category, terminal: venue.terminal, location: venue.location, hours: venue.hours || null, is_24_hours: Boolean(venue.is24Hours), is_unverified: false };
        const write = existing?.id ? await adminDb.from('venues').update(payload).eq('id', existing.id) : await adminDb.from('venues').insert(payload);
        if (write.error) persistenceErrors.push(`Salvataggio locale non riuscito: ${venue.name.slice(0, 80)}.`);
      }
    }
  }
  const refreshed = (await getLiveAirports()).find((item) => item.iata.toUpperCase() === iata) || airport;
  const seoReasons = evaluateAirportSeoQuality(refreshed);
  const seoStatus = seoReasons.some((reason) => reason.includes('segnaposto/generici')) ? 'blocked' : seoReasons.length ? 'pending_quality' : 'indexable';
  try { await saveAirportSeoEvaluation(refreshed, seoStatus, seoReasons); }
  catch { persistenceErrors.push('Valutazione SEO non salvata.'); }
  const { error: logError } = await adminDb.from('sync_logs').insert({ airport_iata: iata, official_url: result.sourceUrl, status: result.success && persistenceErrors.length === 0 ? 'SUCCESS' : 'FAILED', changes_detected: Boolean(result.discrepanciesFound?.length), log_details: { ...result, persistenceErrors, seoStatus, seoReasons } });
  if (logError) persistenceErrors.push('Registro sincronizzazione non aggiornato.');
  return NextResponse.json({ success: result.success && persistenceErrors.length === 0, result, persistenceErrors, seoStatus, seoReasons }, { status: persistenceErrors.length ? 500 : result.success ? 200 : 422 });
}
