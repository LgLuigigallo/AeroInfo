import { NextRequest, NextResponse } from 'next/server';
import { adminDb, isAdminIdentity, requireAdmin } from '@/lib/admin/server';

export async function GET(request: NextRequest) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  if (!adminDb) return NextResponse.json({ error: 'Archivio admin non configurato.' }, { status: 503 });
  const [requests, suggestions, feedback, seo, syncs] = await Promise.all([
    adminDb.from('airport_requests').select('id', { count: 'exact', head: true }).in('status', ['pending', 'queued', 'queued_weekly', 'scraping']),
    adminDb.from('airport_suggestions').select('id', { count: 'exact', head: true }).eq('status', 'pending_verification'),
    adminDb.from('site_feedback').select('id', { count: 'exact', head: true }).in('status', ['new', 'reviewed']),
    adminDb.from('airports').select('iata_code', { count: 'exact', head: true }).eq('seo_status', 'pending_quality'),
    adminDb.from('sync_logs').select('id, airport_iata, status, executed_at, changes_detected').order('executed_at', { ascending: false }).limit(8),
  ]);
  const errors = [requests, suggestions, feedback, seo, syncs].filter((result) => result.error);
  if (errors.length) return NextResponse.json({ error: 'Impossibile caricare la panoramica.' }, { status: 503 });
  return NextResponse.json({
    counts: { requests: requests.count || 0, suggestions: suggestions.count || 0, feedback: feedback.count || 0, seo: seo.count || 0 },
    recentSyncs: syncs.data || [],
  }, { headers: { 'Cache-Control': 'no-store' } });
}
