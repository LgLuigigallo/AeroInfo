import { NextRequest, NextResponse } from 'next/server';
import { adminDb, isAdminIdentity, requireAdmin } from '@/lib/admin/server';

export async function GET(request: NextRequest) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  if (!adminDb) return NextResponse.json({ error: 'Archivio admin non configurato.' }, { status: 503 });
  const page = Math.max(1, Number(request.nextUrl.searchParams.get('page')) || 1);
  const pageSize = Math.min(100, Math.max(10, Number(request.nextUrl.searchParams.get('pageSize')) || 30));
  const { data, count, error } = await adminDb.from('admin_audit_log').select('id, actor_email, action, entity_type, entity_id, outcome, details, created_at', { count: 'exact' }).order('created_at', { ascending: false }).range((page - 1) * pageSize, page * pageSize - 1);
  if (error) return NextResponse.json({ error: 'Impossibile caricare il registro.' }, { status: 503 });
  return NextResponse.json({ items: data || [], count: count || 0, page, pageSize });
}
