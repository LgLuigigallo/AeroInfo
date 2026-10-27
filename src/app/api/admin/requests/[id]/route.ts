import { NextRequest, NextResponse } from 'next/server';
import { adminDb, isAdminIdentity, requireAdmin } from '@/lib/admin/server';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  if (!adminDb) return NextResponse.json({ error: 'Archivio admin non configurato.' }, { status: 503 });
  const { id } = await context.params;
  const { data, error } = await adminDb.from('airport_requests').select('*').eq('id', id).maybeSingle();
  if (error) return NextResponse.json({ error: 'Impossibile caricare la richiesta.' }, { status: 503 });
  if (!data) return NextResponse.json({ error: 'Richiesta non trovata.' }, { status: 404 });
  return NextResponse.json({ item: data });
}
