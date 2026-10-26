-- Run only against the separate Supabase staging project rkigkmmtlqwmbwtyijpp.
-- Removes only the BCN/CDG/LHR/MAD SEO audit fixtures inserted on 2026-10-26.
-- Deletes airport rows by their fixed fixture IDs; related rows cascade.
begin;

delete from public.airports
where id in (
  'd6b7ed12-333d-489e-a66a-8f3dd7e49e9b', -- BCN
  '7456a867-cf9a-4fc3-983c-9df42062e4bf', -- CDG
  '3d197835-def8-4909-a2e4-79bbed713770', -- LHR
  '4d2eba6b-6d31-4da8-b562-3ac7643c26db'  -- MAD
);

commit;
