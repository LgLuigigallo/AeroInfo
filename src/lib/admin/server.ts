import 'server-only';

import { createClient, type User } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const authClient = url && publicKey
  ? createClient(url, publicKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;

export const adminDb = url && serviceKey
  ? createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;

export type AdminIdentity = { id: string; email: string };

function allowedAdminEmails(): Set<string> {
  return new Set((process.env.ADMIN_EMAILS || '').split(',').map((value) => value.trim().toLowerCase()).filter(Boolean));
}

export async function getAdminIdentity(request: NextRequest): Promise<AdminIdentity | null> {
  const token = request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1];
  const allowed = allowedAdminEmails();
  if (!token || !authClient || !adminDb || allowed.size === 0) return null;

  const { data, error } = await authClient.auth.getUser(token);
  const user: User | null = data.user;
  const email = user?.email?.trim().toLowerCase();
  if (error || !user || !email || !allowed.has(email)) return null;
  return { id: user.id, email };
}

export async function requireAdmin(request: NextRequest): Promise<AdminIdentity | NextResponse> {
  const identity = await getAdminIdentity(request);
  if (identity) return identity;
  return NextResponse.json({ error: 'Accesso admin non autorizzato.' }, { status: 401 });
}

export function isAdminIdentity(value: AdminIdentity | NextResponse): value is AdminIdentity {
  return !(value instanceof NextResponse);
}

export async function writeAdminAudit(
  actor: AdminIdentity,
  action: string,
  entityType: string,
  entityId: string | null,
  details: Record<string, unknown> = {},
  outcome = 'attempted',
): Promise<void> {
  if (!adminDb) throw new Error('Admin storage is unavailable.');
  const { error } = await adminDb.from('admin_audit_log').insert({
    actor_id: actor.id,
    actor_email: actor.email,
    action,
    entity_type: entityType,
    entity_id: entityId,
    outcome,
    details,
  });
  if (error) throw new Error('Audit log unavailable; operation was not performed.');
}

export function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
