-- Run only against the separate Supabase staging project rkigkmmtlqwmbwtyijpp.
-- Removes only the AMS/ARN/DUB/BER SEO audit fixtures inserted on 2026-10-26.
-- Deletes airport rows by their fixed fixture IDs; related rows cascade.
begin;

delete from public.airports
where id in (
  'e672cbb1-788d-4386-8230-af84b9d5a0bf', -- AMS
  '707b5659-29c0-49b6-98d3-85ca2364b5e5', -- ARN
  'c93afc23-4482-4720-a9e6-a8c6330bde23', -- DUB
  'dcfe2cc3-5040-46be-82c3-9a3c7019cc83'  -- BER
);

commit;
