import { NextRequest, NextResponse } from 'next/server';
import { adminDb, isAdminIdentity, requireAdmin, writeAdminAudit } from '@/lib/admin/server';
import { airportCompilerEngine } from '@/lib/compiler/engine';
import { sanitizePostgrestParam } from '@/lib/security/sanitize';

export async function GET(request: NextRequest) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  if (!adminDb) return NextResponse.json({ error: 'Archivio admin non configurato.' }, { status: 503 });
  const params = request.nextUrl.searchParams;
  const page = Math.max(1, Number(params.get('page')) || 1);
  const pageSize = Math.min(50, Math.max(10, Number(params.get('pageSize')) || 20));
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  let query = adminDb.from('airport_requests').select('id, query, iata_code, status, scheduled_for, created_at, updated_at, admin_reviewed_at, admin_reviewed_by, requester_email', { count: 'exact' }).order('created_at', { ascending: false }).range(from, to);
  if (params.get('status')) query = query.eq('status', params.get('status'));
  if (params.get('from')) query = query.gte('created_at', params.get('from'));
  if (params.get('to')) query = query.lte('created_at', `${params.get('to')}T23:59:59.999Z`);
  if (params.get('q')) {
    const term = sanitizePostgrestParam(params.get('q')!);
    if (term) query = query.or(`query.ilike.%${term}%,iata_code.ilike.%${term}%`);
  }
  const { data, count, error } = await query;
  if (error) return NextResponse.json({ error: 'Impossibile caricare le richieste.' }, { status: 503 });
  const rows = data || [];
  const resolvedIatas = [...new Set(rows.map((row) => airportCompilerEngine.resolveAirport(row.query, row.iata_code)?.iata).filter((iata): iata is string => Boolean(iata)))];
  const existing = resolvedIatas.length
    ? await adminDb.from('airports').select('iata_code').in('iata_code', resolvedIatas)
    : { data: [], error: null };
  if (existing.error) return NextResponse.json({ error: 'Impossibile verificare gli aeroporti già presenti.' }, { status: 503 });
  const existingIatas = new Set((existing.data || []).map((row) => row.iata_code));
  return NextResponse.json({ items: rows.map(({ requester_email, ...row }) => {
    const resolved = airportCompilerEngine.resolveAirport(row.query, row.iata_code);
    const iata = row.iata_code || resolved?.iata || null;
    return {
      ...row,
      resolved_iata: resolved?.iata || null,
      hasRequesterEmail: Boolean(requester_email),
      existingAirportIata: iata && existingIatas.has(iata) ? iata : null
    };
  }), count: count || 0, page, pageSize });
}

export async function POST(request: NextRequest) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  if (!adminDb) return NextResponse.json({ error: 'Archivio admin non configurato.' }, { status: 503 });
  let body: { id?: string; action?: string; iata_code?: string };
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Richiesta non valida.' }, { status: 400 }); }
  const { id, action } = body;
  const rawIata = typeof body.iata_code === 'string' ? body.iata_code.trim().toUpperCase() : null;
  const manualIata = rawIata && /^[A-Z]{3}$/.test(rawIata) ? rawIata : null;

  if (!id || !/^[0-9a-f-]{36}$/i.test(id) || !['approve', 'run', 'cancel', 'assign_iata'].includes(action || '')) {
    return NextResponse.json({ error: 'Azione o identificativo non valido.' }, { status: 400 });
  }
  const actionName = action === 'run' ? 'request.run' : action === 'cancel' ? 'request.cancel' : action === 'assign_iata' ? 'request.assign_iata' : 'request.approve';
  try { await writeAdminAudit(identity, actionName, 'airport_request', id); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Audit non disponibile.' }, { status: 503 }); }

  const eligible = ['pending', 'queued', 'queued_weekly'];
  if (action === 'assign_iata') {
    if (!manualIata) {
      return NextResponse.json({ error: 'Codice IATA non valido (richieste esattamente 3 lettere, es. NAS).' }, { status: 400 });
    }
    const { data, error } = await adminDb.from('airport_requests').update({ iata_code: manualIata, updated_at: new Date().toISOString() }).eq('id', id).select('id, iata_code').maybeSingle();
    if (error) return NextResponse.json({ error: 'Impossibile aggiornare il codice IATA.' }, { status: 503 });
    if (!data) return NextResponse.json({ error: 'Richiesta non trovata.' }, { status: 404 });
    await writeAdminAudit(identity, 'request.assign_iata.completed', 'airport_request', id, { iata_code: manualIata }, 'success');
    return NextResponse.json({ success: true, iata_code: manualIata });
  }
  if (action === 'approve') {
    const { data, error } = await adminDb.from('airport_requests').update({ admin_reviewed_at: new Date().toISOString(), admin_reviewed_by: identity.email, updated_at: new Date().toISOString() }).eq('id', id).in('status', eligible).select('id').maybeSingle();
    if (error) return NextResponse.json({ error: 'Impossibile approvare la richiesta.' }, { status: 503 });
    if (!data) return NextResponse.json({ error: 'La richiesta non è più in attesa o è già stata elaborata.' }, { status: 409 });
    await writeAdminAudit(identity, 'request.approve.completed', 'airport_request', id, { reviewedBy: identity.email }, 'success');
    return NextResponse.json({ success: true, status: 'approved' });
  }
  if (action === 'cancel') {
    const { data, error } = await adminDb.from('airport_requests').update({ status: 'cancelled', updated_at: new Date().toISOString() }).eq('id', id).in('status', eligible).select('id').maybeSingle();
    if (error) return NextResponse.json({ error: 'Impossibile annullare la richiesta.' }, { status: 503 });
    if (!data) return NextResponse.json({ error: 'La richiesta non è più in attesa o è già stata elaborata.' }, { status: 409 });
    await writeAdminAudit(identity, 'request.cancel.completed', 'airport_request', id, { status: 'cancelled' }, 'success');
    return NextResponse.json({ success: true, status: 'cancelled' });
  }

  const { data: claim, error: claimError } = await adminDb.from('airport_requests').update({ status: 'scraping', updated_at: new Date().toISOString() }).eq('id', id).in('status', eligible).select('id, query, iata_code').maybeSingle();
  if (claimError) return NextResponse.json({ error: 'Impossibile avviare la richiesta.' }, { status: 503 });
  if (!claim) return NextResponse.json({ error: 'La richiesta non è più in attesa o è già stata elaborata.' }, { status: 409 });

  const effectiveIata = manualIata || claim.iata_code || null;
  if (manualIata && claim.iata_code !== manualIata) {
    await adminDb.from('airport_requests').update({ iata_code: manualIata, updated_at: new Date().toISOString() }).eq('id', id);
  }

  let relatedQuery = adminDb.from('airport_requests').select('id').in('status', eligible);
  relatedQuery = effectiveIata
    ? relatedQuery.eq('iata_code', effectiveIata)
    : relatedQuery.eq('query', claim.query);
  const { data: related } = await relatedQuery;
  const relatedIds = (related || []).map((row) => row.id);
  let claimedIds = [claim.id];
  if (relatedIds.length) {
    const { data: relatedClaims } = await adminDb.from('airport_requests').update({ status: 'scraping', updated_at: new Date().toISOString() }).in('id', relatedIds).in('status', eligible).select('id');
    claimedIds = [...claimedIds, ...(relatedClaims || []).map((row) => row.id)];
  }
  const resolvedAirport = airportCompilerEngine.resolveAirport(claim.query, effectiveIata);
  const { data: existingAirport, error: existingError } = resolvedAirport
    ? await adminDb.from('airports').select('iata_code').eq('iata_code', resolvedAirport.iata.toUpperCase()).maybeSingle()
    : { data: null, error: null };
  if (existingError) {
    await adminDb.from('airport_requests').update({ status: 'queued', updated_at: new Date().toISOString() }).in('id', claimedIds).eq('status', 'scraping');
    return NextResponse.json({ error: 'Impossibile verificare se l’aeroporto è già presente.' }, { status: 503 });
  }
  const result = await airportCompilerEngine.compileAndPublishAirport(claim.query, effectiveIata, claimedIds);
  if (!result.success) {
    await adminDb.from('airport_requests').update({ status: 'queued', updated_at: new Date().toISOString(), scraped_data: { admin_run_error: result.error || 'Elaborazione non riuscita' } }).in('id', claimedIds).eq('status', 'scraping');
    await writeAdminAudit(identity, 'request.run.completed', 'airport_request', id, { status: 'failed' }, 'failure');
    return NextResponse.json({ success: false, error: result.error || 'Elaborazione non riuscita.' }, { status: 422 });
  }
  const { data: finalRequest } = await adminDb.from('airport_requests').select('status').eq('id', id).maybeSingle();
  await writeAdminAudit(identity, 'request.run.completed', 'airport_request', id, { status: finalRequest?.status || 'published', airportIata: result.airport?.iata, notificationsSent: result.notificationsSent || 0, notificationErrorCount: result.notificationErrors?.length || 0 }, 'success');
  return NextResponse.json({ success: true, airportIata: result.airport?.iata, status: finalRequest?.status || 'published', linkedExistingAirport: Boolean(existingAirport), notificationsSent: result.notificationsSent || 0, notificationErrors: result.notificationErrors || [] });
}
