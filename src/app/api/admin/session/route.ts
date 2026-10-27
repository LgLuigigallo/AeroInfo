import { NextRequest, NextResponse } from 'next/server';
import { getAdminIdentity, isAdminIdentity, requireAdmin, writeAdminAudit } from '@/lib/admin/server';

export async function GET(request: NextRequest) {
  const identity = await getAdminIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Accesso admin non autorizzato.' }, { status: 401 });
  return NextResponse.json({ email: identity.email, role: 'admin' }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: NextRequest) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  try {
    await writeAdminAudit(identity, 'admin.session', 'session', null, {}, 'success');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Operazione non disponibile.' }, { status: 503 });
  }
}
