-- Run only against the separate Supabase staging project rkigkmmtlqwmbwtyijpp.
-- Adds reversible SEO audit fixtures for ATH/CPH/FRA/HEL.
-- Keep all records pending_quality until full bilingual dossiers pass review.
begin;

insert into public.airports (
  id, iata_code, name_it, name_en, city_it, city_en, country_it, country_en,
  country_code, official_website, latitude, longitude, seo_slug_it, seo_slug_en,
  seo_status, seo_block_reasons
) values
  ('60a36bed-d9af-42b1-a5c3-ac15d76e6802', 'ATH', 'Aeroporto Internazionale di Atene (Eleftherios Venizelos)', 'Athens International Airport (Eleftherios Venizelos)', 'Atene', 'Athens', 'Grecia', 'Greece', 'GR', 'https://www.aia.gr', 37.9364, 23.9445, 'aeroporto-internazionale-di-atene-eleftherios-venizelos-ath', 'athens-international-airport-eleftherios-venizelos-ath', 'pending_quality', '{}'),
  ('1db6a1ea-8b92-4485-8a24-0e1a0458069e', 'CPH', 'Aeroporto di Copenaghen-Kastrup', 'Copenhagen Airport (Kastrup)', 'Copenaghen', 'Copenhagen', 'Danimarca', 'Denmark', 'DK', 'https://www.cph.dk', 55.618, 12.6508, 'aeroporto-di-copenaghen-kastrup-cph', 'copenhagen-airport-kastrup-cph', 'pending_quality', '{}'),
  ('9cc45dd4-2caa-43df-9f09-898e1dec2344', 'FRA', 'Aeroporto di Francoforte sul Meno', 'Frankfurt Airport', 'Francoforte', 'Frankfurt', 'Germania', 'Germany', 'DE', 'https://www.frankfurt-airport.com', 50.0379, 8.5622, 'aeroporto-di-francoforte-sul-meno-fra', 'frankfurt-airport-fra', 'pending_quality', '{}'),
  ('114cc8a3-edce-46dd-bccb-c201005add2f', 'HEL', 'Aeroporto di Helsinki-Vantaa', 'Helsinki Airport (Vantaa)', 'Helsinki', 'Helsinki', 'Finlandia', 'Finland', 'FI', 'https://www.finavia.fi/en/airports/helsinki-airport', 60.3172, 24.9633, 'aeroporto-di-helsinki-vantaa-hel', 'helsinki-airport-vantaa-hel', 'pending_quality', '{}');

insert into public.security_policies (
  id, airport_id, has_3d_scanners, scanners_note_it, scanners_note_en,
  liquids_allowance_it, liquids_allowance_en, liquids_must_be_removed,
  liquids_unverified, liquids_note_it, liquids_note_en, electronics_in_bag,
  electronics_note_it, electronics_note_en, electronics_unverified,
  drone_unverified, powerbank_unverified, official_source_url,
  last_verified_at, source_verified_at
) values
  (
    'b17749be-e0b6-4092-8f56-48e912ca7bf6', '60a36bed-d9af-42b1-a5c3-ac15d76e6802', false,
    'Le istruzioni pubbliche indicano di presentare separatamente busta dei liquidi e laptop/tablet; non specificano il modello degli scanner. Segui la segnaletica del varco.',
    'Published instructions ask passengers to present the liquids bag and laptop/tablet separately; scanner model is not specified. Follow checkpoint signage.',
    'Contenitori fino a 100 ml, in un solo sacchetto trasparente richiudibile da massimo 1 litro. Eccezioni per medicinali e alimenti per neonati necessari durante il viaggio.',
    'Containers up to 100 ml, in one transparent resealable bag of up to 1 litre. Exceptions apply to medicines and baby food needed during the journey.',
    true, false,
    'La busta va estratta dal bagaglio per il controllo.',
    'The liquids bag should be removed from carry-on for screening.',
    false,
    'Laptop, tablet o dispositivo simile vanno presentati separatamente.',
    'Laptops, tablets and similar devices should be presented separately.',
    false, true, true,
    'https://www.aia.gr/en/traveller/procedures/security-airport', now(), now()
  ),
  (
    '0c288479-c7af-4926-8d93-ce0c2b23cda9', '1db6a1ea-8b92-4485-8a24-0e1a0458069e', false,
    'La pagina del checkpoint non identifica la tecnologia degli scanner; segui le istruzioni del personale e la segnaletica.',
    'The checkpoint page does not identify scanner technology; follow staff instructions and checkpoint signage.',
    'Contenitori sotto 100 ml in un sacchetto richiudibile da 1 litro. La busta dei liquidi va estratta al controllo.',
    'Containers under 100 ml in a resealable 1-litre bag. The liquids bag must be removed at security.',
    true, false,
    'Alimenti per neonati, alimenti speciali e medicinali liquidi vanno presentati separatamente.',
    'Baby food, special dietary food and liquid medicine should be presented separately.',
    true,
    'Laptop, tablet e fotocamere possono rimanere nel bagaglio a mano secondo le istruzioni del checkpoint.',
    'Laptops, tablets and cameras can remain in carry-on according to checkpoint instructions.',
    false, true, true,
    'https://www.cph.dk/en/practical/security-checkpoint', now(), now()
  ),
  (
    '3c626e0b-a875-4a23-ae9d-7657242adfbc', '9cc45dd4-2caa-43df-9f09-898e1dec2344', true,
    'Scanner CT: la maggior parte dei checkpoint T1 e tutti quelli T3 consentono liquidi ed elettronica nel bagaglio. Regole differenti ai varchi C1, C2, C4, C6, a checkpoint speciali T1 e nei trasferimenti.',
    'CT scanners: most T1 checkpoints and all T3 checkpoints allow liquids and electronics to stay in carry-on. Different rules apply at gates C1, C2, C4, C6, special T1 checkpoints and transfer screening.',
    'Regole diverse per varco: fino a 2 litri nei checkpoint CT coperti; ai varchi C1, C2, C4, C6, checkpoint speciali T1 e trasferimenti valgono contenitori fino a 100 ml in sacchetto da 1 litro. Verifica il varco di partenza.',
    'Rules vary by checkpoint: up to 2 litres at covered CT checkpoints; gates C1, C2, C4, C6, special T1 checkpoints and transfer screening use containers up to 100 ml in a 1-litre bag. Check your departure checkpoint.',
    false, true,
    'L’aeroporto pubblica eccezioni per varco e per i trasferimenti; non presumere che la regola CT valga ovunque.',
    'The airport publishes checkpoint and transfer exceptions; do not assume the CT rule applies everywhere.',
    true,
    'Dispositivi possono restare nel bagaglio ai checkpoint CT descritti; altrove le istruzioni possono cambiare.',
    'Devices can remain in carry-on at the described CT checkpoints; instructions may differ elsewhere.',
    true, true, true,
    'https://www.frankfurt-airport.com/en/travel-planning/check-in-luggage-controls/security-check.html/d20260305lh866.html', now(), now()
  ),
  (
    'c3e83306-4925-4319-97d1-d682f26ec7d4', '114cc8a3-edce-46dd-bccb-c201005add2f', false,
    'A Helsinki Partenze, liquidi ed elettronica restano nel bagaglio; la pagina operativa non specifica il modello dello scanner. Ai controlli transfer si applicano istruzioni differenti.',
    'At Helsinki Departures, liquids and electronics stay in carry-on; the operating page does not identify scanner model. Different instructions apply at transfer screening.',
    'A Helsinki Partenze: contenitori fino a 100 ml e volume totale massimo di 2 litri per passeggero; sacchetto da 1 litro non richiesto. Per i trasferimenti si applicano regole diverse.',
    'At Helsinki Departures: containers up to 100 ml and a total maximum volume of 2 litres per passenger; a 1-litre bag is not required. Different rules apply at transfer screening.',
    false, false,
    'Le istruzioni riguardano la security Partenze; le eccezioni per i trasferimenti sono documentate separatamente.',
    'These instructions cover Departures security; transfer exceptions are documented separately.',
    true,
    'A Helsinki Partenze, dispositivi elettronici non vanno estratti dal bagaglio.',
    'At Helsinki Departures, electronic devices do not need to be removed from carry-on.',
    false, true, true,
    'https://www.finavia.fi/en/airport/security-control', now(), now()
  );

commit;
