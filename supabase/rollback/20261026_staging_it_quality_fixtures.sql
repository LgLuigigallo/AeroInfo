-- Run only against the separate Supabase staging project rkigkmmtlqwmbwtyijpp.
-- Removes the 12 Italian SEO-audit fixtures inserted on 2026-10-26.
-- Leaves the pre-existing airport request untouched.
begin;

delete from public.security_policies
where id in (
  '218cc085-735a-4fe9-ac23-484c638d7f97', -- BLQ
  'f6cf4a8c-b8ae-436c-b99f-de0570aeedcc', -- BGY
  '9eb41151-bb97-4a4f-b607-abb5d4743981', -- BRI
  '696d826e-488e-4932-bbdd-e22839fa30cf', -- CIA
  '13a9f9b3-65c8-488c-ab4a-20bf664db3e1', -- CTA
  '2d599844-986e-4de9-a4d6-d1e7d8ce386d', -- FCO
  '1985cc48-5c68-439d-8623-878018485c61', -- LIN
  'a4a842ab-8dfe-4ed4-bc85-dc4c235c6306', -- MXP
  'a5f89ef0-5be8-4101-8ed8-1ade561bdfc9', -- NAP
  '7a8b57b4-15ec-481e-9381-714dc5e499d8', -- PMO
  'e260fe75-7065-4d38-b7e4-e324e509f5bc', -- PSA
  'f43b4c1e-5179-44bf-a6d4-ff9ddf22117a'  -- QUR
);

delete from public.airports
where id in (
  '0be7c3a4-73f3-4f8c-9e7b-0f79faa18a2c', -- BLQ
  'c4e39f04-ab6d-46b5-8c6c-9aef26b95319', -- BGY
  'd0db06b0-ca78-465e-b9c4-c11d084556bd', -- BRI
  'a8bebc56-1869-41aa-a9ca-71f5894648b7', -- CIA
  'ce711038-4e6e-425e-9980-4403c35796ab', -- CTA
  '75b77af9-c331-4dab-995c-50854814c320', -- FCO
  '17397c05-f020-4751-bf5f-41a1d6856b67', -- LIN
  'c5beac6a-38b4-4960-b3e0-52dfb3033315', -- MXP
  '89dd03e3-7904-40bf-9620-19d128660174', -- NAP
  'fe6ada1c-b818-44c0-97b1-543a15886d39', -- PMO
  '737ed6c8-42d7-4da8-94a3-fb76d6724317', -- PSA
  'd8c7057d-7a8f-4e6c-88cf-5ba9c92194f1'  -- QUR
);

commit;
