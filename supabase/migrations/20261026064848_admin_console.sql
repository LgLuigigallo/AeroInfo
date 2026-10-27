-- Admin console audit, reversible request cancellation, and protected content provenance.
create table if not exists public.admin_audit_log (
  id uuid primary key default extensions.uuid_generate_v4(),
  actor_id uuid not null,
  actor_email text not null,
  action text not null,
  entity_type text not null,
  entity_id text,
  outcome text not null default 'attempted',
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists admin_audit_log_created_at_idx on public.admin_audit_log (created_at desc);
create index if not exists admin_audit_log_entity_idx on public.admin_audit_log (entity_type, entity_id, created_at desc);
alter table public.admin_audit_log enable row level security;
drop policy if exists admin_audit_service_role_only on public.admin_audit_log;
create policy admin_audit_service_role_only
  on public.admin_audit_log for all to service_role using (true) with check (true);

create or replace function public.prevent_admin_audit_mutation()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'admin_audit_log is append-only';
end;
$$;
drop trigger if exists admin_audit_log_append_only on public.admin_audit_log;
create trigger admin_audit_log_append_only
  before update or delete on public.admin_audit_log
  for each row execute function public.prevent_admin_audit_mutation();

alter table public.airports add column if not exists admin_content_locked boolean not null default false;
create index if not exists airports_admin_content_locked_idx on public.airports (admin_content_locked) where admin_content_locked;
create index if not exists airport_requests_admin_queue_idx on public.airport_requests (status, created_at desc);
create index if not exists site_feedback_admin_queue_idx on public.site_feedback (status, created_at desc);
alter table public.airport_requests add column if not exists admin_reviewed_at timestamptz;
alter table public.airport_requests add column if not exists admin_reviewed_by text;
alter table public.airport_requests add column if not exists status text not null default 'pending';
update public.airport_requests set status = 'pending' where status is null;
alter table public.airport_requests alter column status set default 'pending';
