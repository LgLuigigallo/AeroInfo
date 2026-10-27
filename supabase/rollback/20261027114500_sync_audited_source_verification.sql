-- Rollback: 20261027114500_sync_audited_source_verification.sql
-- Description: Reverts source_verified_at populated by migration 20261027114500.

begin;

update public.security_policies sp
set 
  source_verified_at = null,
  updated_at = now()
from public.airports a
where sp.airport_id = a.id
  and a.iata_code in (
    'PRG', 'FCO', 'CIA', 'MXP', 'LIN', 'BGY', 'WAW', 'KRK', 'BUD', 'ATH',
    'ZRH', 'FRA', 'MUC', 'MAD', 'BCN', 'AMS', 'CDG', 'ORY', 'DUB', 'LIS',
    'VIE', 'CPH', 'ARN', 'HEL', 'LHR', 'LGW', 'HND', 'JFK', 'FUE', 'PMO', 'CTA',
    'LPA', 'TFS', 'NAP', 'BRI', 'BLQ', 'PSA', 'BER'
  );

commit;
