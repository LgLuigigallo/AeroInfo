import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin/server';

export async function GET() {
  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.ADMIN_EMAILS?.split(',').some((email) => email.trim()) &&
    adminDb,
  );
  const { error } = configured
    ? await adminDb!.from('admin_audit_log').select('id', { head: true, count: 'exact' })
    : { error: true };
  const ready = configured && !error;
  return NextResponse.json({ ready }, { headers: { 'Cache-Control': 'no-store' } });
}
