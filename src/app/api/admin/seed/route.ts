import { NextRequest, NextResponse } from 'next/server';
import { airportsData } from '@/data/airports';
import { seedAllAirportsToSupabase } from '@/lib/supabase-sync';
import { isAdminIdentity, requireAdmin, writeAdminAudit } from '@/lib/admin/server';

export const maxDuration = 60;

export async function GET() {
  return NextResponse.json({ error: 'Usa POST con conferma esplicita.' }, { status: 405, headers: { Allow: 'POST' } });
}

export async function POST(request: NextRequest) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 2048) return NextResponse.json({ error: 'Richiesta troppo grande.' }, { status: 413 });
  let body: { confirm?: boolean };
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Conferma non valida.' }, { status: 400 }); }
  if (body.confirm !== true) return NextResponse.json({ error: 'Conferma richiesta prima di avviare il seeding.' }, { status: 400 });
  try { await writeAdminAudit(identity, 'catalog.seed', 'catalog', null, { source: 'static' }, 'attempted'); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Audit non disponibile.' }, { status: 503 }); }
  const result = await seedAllAirportsToSupabase(airportsData);
  return NextResponse.json(result, { status: result.success ? 200 : 503 });
}
