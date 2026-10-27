import { NextRequest, NextResponse } from 'next/server';
import { adminDb, isAdminIdentity, requireAdmin } from '@/lib/admin/server';

export async function GET(request: NextRequest, context: { params: Promise<{ kind: string; id: string }> }) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  if (!adminDb) return NextResponse.json({ error: 'Archivio admin non configurato.' }, { status: 503 });
  const { kind, id } = await context.params;
  const table = kind === 'suggestions' ? 'airport_suggestions' : kind === 'feedback' ? 'site_feedback' : null;
  if (!table) return NextResponse.json({ error: 'Sezione non valida.' }, { status: 400 });
  const { data, error } = await adminDb.from(table).select('*').eq('id', id).maybeSingle();
  if (error) return NextResponse.json({ error: 'Impossibile caricare il dettaglio.' }, { status: 503 });
  if (!data) return NextResponse.json({ error: 'Elemento non trovato.' }, { status: 404 });
  return NextResponse.json({ item: data });
}
