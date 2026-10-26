import { NextRequest, NextResponse } from 'next/server';
import { adminDb, isAdminIdentity, requireAdmin, writeAdminAudit } from '@/lib/admin/server';
import { sanitizePostgrestParam } from '@/lib/security/sanitize';

const tables = { suggestions: 'airport_suggestions', feedback: 'site_feedback' } as const;

export async function GET(request: NextRequest) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  if (!adminDb) return NextResponse.json({ error: 'Archivio admin non configurato.' }, { status: 503 });
  const kind = request.nextUrl.searchParams.get('kind') as keyof typeof tables | null;
  if (!kind || !(kind in tables)) return NextResponse.json({ error: 'Sezione non valida.' }, { status: 400 });
  const params = request.nextUrl.searchParams;
  const page = Math.max(1, Number(params.get('page')) || 1);
  const pageSize = Math.min(50, Math.max(10, Number(params.get('pageSize')) || 20));
  const from = (page - 1) * pageSize;
  let query = kind === 'suggestions'
    ? adminDb.from(tables[kind]).select('id, airport_iata, category, details, source_url, status, created_at', { count: 'exact' }).order('created_at', { ascending: false })
    : adminDb.from(tables[kind]).select('id, category, subject, status, created_at', { count: 'exact' }).order('created_at', { ascending: false });
  query = query.range(from, from + pageSize - 1);
  if (params.get('status')) query = query.eq('status', params.get('status'));
  if (params.get('category')) query = query.eq('category', params.get('category'));
  if (kind === 'suggestions' && params.get('iata')) query = query.eq('airport_iata', params.get('iata')!.toUpperCase());
  if (params.get('from')) query = query.gte('created_at', params.get('from')!);
  if (params.get('to')) query = query.lte('created_at', `${params.get('to')}T23:59:59.999Z`);
  if (params.get('q')) {
    const term = sanitizePostgrestParam(params.get('q')!);
    if (term && kind === 'suggestions') query = query.or(`airport_iata.ilike.%${term}%,details.ilike.%${term}%,category.ilike.%${term}%`);
    if (term && kind === 'feedback') query = query.or(`subject.ilike.%${term}%,category.ilike.%${term}%`);
  }
  const { data, count, error } = await query;
  if (error) return NextResponse.json({ error: 'Impossibile caricare gli elementi.' }, { status: 503 });
  return NextResponse.json({ items: data || [], count: count || 0, page, pageSize });
}

export async function PATCH(request: NextRequest) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  if (!adminDb) return NextResponse.json({ error: 'Archivio admin non configurato.' }, { status: 503 });
  let body: { kind?: keyof typeof tables; id?: string; status?: string };
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Richiesta non valida.' }, { status: 400 }); }
  const { kind, id, status } = body;
  const validStatus = kind === 'suggestions'
    ? ['pending_verification', 'verified', 'unconfirmed'].includes(status || '')
    : kind === 'feedback' && ['new', 'reviewed', 'resolved'].includes(status || '');
  if (!kind || !(kind in tables) || !id || !/^[0-9a-f-]{36}$/i.test(id) || !validStatus) return NextResponse.json({ error: 'Stato o identificativo non valido.' }, { status: 400 });
  try { await writeAdminAudit(identity, `${kind}.status`, kind, id, { status }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Audit non disponibile.' }, { status: 503 }); }
  const update = kind === 'suggestions' ? { status, updated_at: new Date().toISOString() } : { status };
  const { data, error } = await adminDb.from(tables[kind]).update(update).eq('id', id).select('id').maybeSingle();
  if (error) return NextResponse.json({ error: 'Impossibile aggiornare lo stato.' }, { status: 503 });
  if (!data) return NextResponse.json({ error: 'Elemento non trovato.' }, { status: 404 });
  await writeAdminAudit(identity, `${kind}.status.completed`, kind, id, { status }, 'success');
  return NextResponse.json({ success: true, status });
}
