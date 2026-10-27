-- Run only against the separate Supabase staging project rkigkmmtlqwmbwtyijpp.
-- Removes only ATH/CPH/FRA/HEL SEO audit fixtures inserted on 2026-10-26.
-- Deletes airport rows by their fixed fixture IDs; related rows cascade.
begin;

delete from public.airports
where id in (
  '60a36bed-d9af-42b1-a5c3-ac15d76e6802', -- ATH
  '1db6a1ea-8b92-4485-8a24-0e1a0458069e', -- CPH
  '9cc45dd4-2caa-43df-9f09-898e1dec2344', -- FRA
  '114cc8a3-edce-46dd-bccb-c201005add2f'  -- HEL
);

commit;
