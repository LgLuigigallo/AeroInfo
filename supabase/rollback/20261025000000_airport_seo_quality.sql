-- Rollback for 20261025000000_airport_seo_quality.sql.
-- This removes only columns, indexes and constraints introduced by that migration.
-- It intentionally does not touch the legacy last_verified_at values.
-- Running this also deletes SEO status, slugs, and source verification dates
-- collected after the migration, so export those values first if they matter.

drop index if exists public.airports_seo_status_idx;
drop index if exists public.airports_seo_slug_en_key;
drop index if exists public.airports_seo_slug_it_key;

alter table public.airports
  drop constraint if exists airports_seo_status_check,
  drop column if exists seo_block_reasons,
  drop column if exists seo_last_evaluated_at,
  drop column if exists seo_slug_en,
  drop column if exists seo_slug_it,
  drop column if exists seo_status;

alter table public.security_policies
  drop column if exists source_verified_at;

alter table public.airports
  alter column last_verified_at set default now();

alter table public.security_policies
  alter column last_verified_at set default now();
