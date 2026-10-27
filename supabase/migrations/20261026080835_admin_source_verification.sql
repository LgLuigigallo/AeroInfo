-- Keep evidence from a successful official-source scrape separate from the
-- legacy catalog timestamp, which may have been populated by seeds.
alter table public.security_policies
  add column if not exists source_verified_at timestamptz;
