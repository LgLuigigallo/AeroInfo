-- Migration: 20261027114500_sync_audited_source_verification.sql
-- Description: Align source_verified_at and seo_status for audited airports.
-- Target: Supabase Production & Staging
-- Reversible: Yes (see supabase/rollback/20261027114500_sync_audited_source_verification.sql)

begin;

-- 1. Update source_verified_at for audited scali that have confirmed primary source policies
update public.security_policies sp
set 
  source_verified_at = coalesce(sp.last_verified_at, now())
from public.airports a
where sp.airport_id = a.id
  and a.iata_code in (
    'PRG', 'FCO', 'CIA', 'MXP', 'LIN', 'BGY', 'WAW', 'KRK', 'BUD', 'ATH',
    'ZRH', 'FRA', 'MUC', 'MAD', 'BCN', 'AMS', 'CDG', 'ORY', 'DUB', 'LIS',
    'VIE', 'CPH', 'ARN', 'HEL', 'LHR', 'LGW', 'HND', 'JFK', 'FUE', 'PMO', 'CTA',
    'LPA', 'TFS', 'NAP', 'BRI', 'BLQ', 'PSA', 'BER'
  )
  and sp.source_verified_at is null;

-- 2. Update seo_status for audited scali in public.airports
update public.airports
set 
  seo_status = 'indexable',
  updated_at = now()
where iata_code in (
  'PRG', 'FCO', 'CIA', 'MXP', 'LIN', 'BGY', 'WAW', 'KRK', 'BUD', 'ATH',
  'ZRH', 'FRA', 'MUC', 'MAD', 'BCN', 'AMS', 'CDG', 'ORY', 'DUB', 'LIS',
  'VIE', 'CPH', 'ARN', 'HEL', 'LHR', 'LGW', 'HND', 'JFK', 'FUE', 'PMO', 'CTA',
  'LPA', 'TFS', 'NAP', 'BRI', 'BLQ', 'PSA', 'BER'
)
and (seo_status is null or seo_status = 'pending_quality');

commit;
