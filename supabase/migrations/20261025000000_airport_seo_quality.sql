alter table public.airports
  add column if not exists seo_status text not null default 'pending_quality',
  add column if not exists seo_slug_it text,
  add column if not exists seo_slug_en text,
  add column if not exists seo_last_evaluated_at timestamptz,
  add column if not exists seo_block_reasons text[] not null default '{}';

update public.airports
set seo_slug_it = coalesce(
      seo_slug_it,
      trim(both '-' from regexp_replace(lower(name_it), '[^a-z0-9]+', '-', 'g')) || '-' || lower(iata_code)
    ),
    seo_slug_en = coalesce(
      seo_slug_en,
      trim(both '-' from regexp_replace(lower(name_en), '[^a-z0-9]+', '-', 'g')) || '-' || lower(iata_code)
    );

alter table public.airports
  alter column seo_slug_it set not null,
  alter column seo_slug_en set not null;

do $$ begin
  alter table public.airports add constraint airports_seo_status_check
    check (seo_status in ('pending_quality', 'indexable', 'blocked'));
exception when duplicate_object then null;
end $$;

create unique index if not exists airports_seo_slug_it_key on public.airports (seo_slug_it);
create unique index if not exists airports_seo_slug_en_key on public.airports (seo_slug_en);
create index if not exists airports_seo_status_idx on public.airports (seo_status);

-- Store successful crawler verification separately from the legacy seed timestamp.
alter table public.security_policies
  add column if not exists source_verified_at timestamptz;

-- Stop assigning verification timestamps automatically on future inserts.
-- Existing historical values stay intact; successful crawls write source_verified_at.
alter table public.airports
  alter column last_verified_at drop default;

alter table public.security_policies
  alter column last_verified_at drop default;
