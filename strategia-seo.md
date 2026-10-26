# Strategia SEO e GEO AeroInfo

**Stato aggiornato al 2026-10-26:** produzione Vercel allineata a `main` e `codex/admin-console` sul commit `0a781f4c`; `codex/seo-geo-foundation` resta separato e le sue funzionalità SEO specifiche non sono da considerare rilasciate senza verifica.
**Ultimo aggiornamento:** 2026-10-26
**Mercati:** italiano prioritario; inglese internazionale  
**Scopo:** acquisire traffico organico qualificato e rendere le informazioni aeroportuali comprensibili e citabili da motori di ricerca e motori di risposta AI. Nessuna attività garantisce posizionamenti o indicizzazione.

## Aggiornamento operativo — 2026-10-26

- `main` e `codex/admin-console` sono allineati al commit `0a781f4c`; la produzione Vercel è stata pubblicata da `main`. Il tag `backup/admin-console-2026-10-26` conserva un riferimento recuperabile a questa versione.
- La console admin e la pagina Privacy con i relativi collegamenti sono incluse nella versione di produzione. I controlli anonimi degli endpoint admin hanno restituito `401`; queste prove non equivalgono a un audit completo né verificano il flusso autenticato, tutte le policy RLS o la concorrenza.
- `codex/seo-geo-foundation` rimane separato. Il lavoro SEO specifico descritto sotto è una fotografia della Preview e non va confuso con quanto è attualmente in produzione.
- Verifica live Production 2026-10-26 tramite Vercel: sitemap HTTP 200 ma ancora 36 URL legacy (home, pagine utilitarie e `?airport=`); `/aeroporti/aeroporto-di-praga-vaclav-havel-prg` restituisce 404 `noindex`. Le route SEO IT/EN non sono quindi pubblicate in Production.
- Le voci e i riepiloghi datati 2026-10-25 riportano lo stato osservato allora. In particolare, indicazioni su sitemap, pagine SEO, schema Supabase, preview e produzione devono essere ricontrollate prima di dichiarare completata o distribuita una funzionalità.
- Il checkout locale del branch SEO può contenere modifiche non committate; conservarle e verificarle prima di qualsiasi riallineamento o promozione.

## Registro attività

Aggiornare questa sezione al completamento di ogni attività: spuntare la voce, aggiungere data e prova sintetica (file, URL, migrazione o report). Non segnare un’attività completa finché i criteri indicati non sono verificati.

### P0 — Baseline e qualità dei dati

- [x] **P0.1 Baseline tecnica** — 2026-10-25. `src/app/page.tsx` è client-side e seleziona aeroporti da `?airport=`; canonical globale punta alla home; `html` ha `lang="it"`; sitemap usa il dataset statico e URL query.
- [x] **P0.2 Inventario iniziale** — 2026-10-25. 33 aeroporti statici nel codice; 47 record `public.airports` in Supabase.
- [x] **P0.3 Flusso cron attuale** — 2026-10-25. Il compilatore può creare dati standard generici; il cron normale limita il sync ai primi 15 aeroporti; l’esito scraper finisce in `sync_logs` ma non aggiorna i record catalogo.
- [x] **P0.4 Schema stato SEO in Production** — 2026-10-26. Progetto Production registra migrazioni `admin_seo_fields` e `admin_source_verification`; `public.airports` ha stato, slug IT/EN, data valutazione e motivi. Query in sola lettura: 47 aeroporti `pending_quality`, 0 slug mancanti, 43 ancora da valutare. Questo completa lo schema, non il flusso SEO pubblico.
- [ ] **P0.5 Idoneità automatica** — nuove schede partono non indicizzabili; promuovere a `indexable` solo dati localizzati sostanziali, fonte ufficiale HTTPS, politica di sicurezza verificata con data, coordinate e contenuti non segnaposto. Registrare motivi leggibili se `blocked`.
- [ ] **P0.6 Scrittura delle verifiche** — cron mirato ai nuovi record; persistire solo estrazioni supportate da fonte e aggiornare date di verifica solo dopo fetch/estrazione riusciti. Non confondere richiesta `published` con approvazione SEO.
- [ ] **P0.7 Audit 47 record** — applicare gli stessi criteri ai dati esistenti; le schede incomplete restano fruibili nell’app, ma fuori sitemap e con `noindex`.

**Prossimo lotto verifiche P0.7 (internazionale, aggiornato 2026-10-26):** priorità ai fatti sensibili o difformi dalle fonti attuali. Ricontrollo primario: AMS (ENAC/regolamento Schiphol: 100 ml dal 01/09/2024; scanner CT consentono di lasciare liquidi/dispositivi nel bagaglio), ARN (Swedavia: limite 100 ml in tutti i controlli; T5 ammette liquidi nel bagaglio senza busta da 1 L, T2 richiede estrazione), BER (aree CT 1 e 5 T1 e T2 fino a 2 L, aree tradizionali 100 ml ed estrazione; totale corsie e configurazione soggetti a cambi), DUB (daa: tutti i controlli C3, fino a 2 L, liquidi/dispositivi restano nel bagaglio; record attuale non indica capienza). Rilievi preliminari: AMS non dichiara erroneamente volume illimitato ma la scheda omette il limite e può indurre errore; ARN richiede dettaglio per terminal; BER claim sostanzialmente corretto ma da aggiornare ai controlli correnti; DUB necessita correzione di contenuto. Fonti: [Schiphol regole liquidi](https://www.schiphol.nl/en/page/liquids-in-hand-baggage/), [Schiphol preparazione security](https://www.schiphol.nl/en/prepare-for-your-flight-at-schiphol/prepare-for-security/), [Swedavia Arlanda security](https://www.swedavia.com/arlanda/security-control/), [BER controllo security](https://ber.berlin-airport.de/en/flying/controls/security-control.html), [BER annuncio operativo 2026](https://ber.berlin-airport.de/en/news/2026-05-21-anpassung-siko.html), [Dublin Airport security](https://www.dublinairport.com/at-the-airport/security), [Dublin rollout completo C3](https://www.dublinairport.com/latest-news/2025/09/17/passenger-joy-as-security-rules-eased-at-dublin-airport). Record Production consultati in sola lettura; nessuna correzione scritta.

**Avanzamento implementazione (2026-10-25):**

- [x] **P0.4a Migrazione reversibile preparata** — campi SEO, slug univoci, `source_verified_at`; rimozione dei default che inventavano date sulle nuove righe. Rollback in `supabase/rollback/20261025000000_airport_seo_quality.sql`. Applicata al solo progetto `aero-info-staging` il 2026-10-25; produzione invariata.
- [x] **P0.4b Ambiente Supabase staging** — creato `aero-info-staging` (`rkigkmmtlqwmbwtyijpp`, EU West); schema e 3 migrazioni applicati. Query di verifica: 11 tabelle pubbliche, 29 colonne aeroporti, RLS attiva; zero policy SELECT anon/authenticated su `airport_suggestions`; Security Advisor senza rilievi.
- [ ] **P0.4c Migrazioni riproducibili** — baseline `20261025210543_staging_initial_schema.sql` e successive versioni combaciano con le migrazioni SEO registrate. Snapshot 2026-10-26: staging registra 5 migrazioni, Production 4 migrazioni admin/SEO. Replay da zero ancora non verificato: CLI Supabase assente, Docker daemon irraggiungibile; staging non va azzerato. Query read-only 2026-10-26: catalogo aeroporti staging vuoto, ma c’è 1 richiesta operativa in coda; non eseguire il cron completo su staging finché la richiesta non è isolata. Preview `READY` sul commit `6b0ad74e`.
- [x] **P0.5a Gate codice** — nuovi record `pending_quality`; allowlist esplicita per i record statici approvati; record generici con dati non verificati e coordinate/template non diventano indicizzabili. La verifica runtime dipende dallo schema.
- [x] **P0.6a Flusso codice** — cron FIFO sui pending, whitelist estesa ai 47 codici attuali, persistenza solo di regole esplicite; seed conserva stato e slug ma non trasforma date del catalogo in verifiche riuscite; promozione a `indexable` solo dopo estrazione esplicita riuscita nel run corrente; compilazione fallita non pubblica la richiesta; venue aggiunte/aggiornate senza cancellare le altre. 2026-10-25: audit ha corretto il riuso delle date seed/storiche come prova di fetch.
- [x] **P0.6b Timestamp fonte** — 2026-10-26. Cron e sync admin valorizzano `source_verified_at` solo quando una policy verificata include una data esplicita; run senza tale prova lasciano invariato il timestamp precedente e non usano l’ora di esecuzione come verifica. `git diff --check` e `tsc --noEmit` superati. ESLint mirato non disponibile: lo shim `node_modules/.bin/eslint` termina con `Cannot find module '../package.json'`.
- [x] **P0.7a Audit meccanico** — 33 statici: 33 superano il gate automatico dopo normalizzazione del prefisso `www` per fonti regolatorie come TSA. Database: 47/47 superano controlli automatici di identità bilingue, URL HTTPS, campi core bilingui, due dettagli bilingui e coordinate; questo non prova che i fatti siano corretti o che le fonti siano state raggiunte.
- [x] **P0.7b Inventario fonti Production** — 2026-10-26, query Supabase read-only: 47/47 policy hanno `official_source_url`, ma 0/47 `source_verified_at`; il timestamp `last_verified_at` è presente ma non dimostra lettura o supporto della fonte. 7 URL coincidono con il sito indicato come ufficiale: CTA, DJG, PMO, QUR, RAK sono home generiche; LPA/TFS sono landing aeroporto, non pagina sicurezza. Campione Swedavia ARN verificato manualmente: pagina specifica descrive regole differenti per T2/T5. Nessuna promozione o modifica dati Production eseguita; audit dei fatti resta aperto.
- [x] **P0.7c Ricognizione fonti — Italia (12/12)** — 2026-10-26; approfondita in P0.7d con pagine primarie dirette. Fonti ufficiali confermano: BLQ 2 L dal 28/07/2025; BGY 2 L e dispositivi nel bagaglio su 14 nuove linee dal 25/11/2025; FCO 2 L salvo voli sensibili USA/Israele; LIN 2 L; MXP regole differenziate T1/T2/Fast Track T2; gli altri scali con traffico passeggeri del campione restano a 100 ml salvo ulteriori prove. CTA: report SAC 2026 riporta il limite 100 ml e cita scanner C3 come iniziativa futura, quindi non li si segna come operativi. PMO non ha fonte per i dolci tipici. Roma Urbe è uno scalo di aviazione generale; il regolamento ENAC 2026 non conferma le regole di security passeggeri rivendicate dal record. Fonti primarie: [comunicato ENAC sulle eccezioni italiane (FCO, LIN, MXP, BLQ e regola standard)](https://comunicati.enac.gov.it/it/announcement/show/enac-sono-5-gli-aeroporti-italiani-che-consentono-trasporto-liquidi-superiori-a-100-ml-nel-bagaglio-a-mano), [BLQ regola 2 L](https://www.bologna-airport.it/la-societa/sala-stampa/news/via-libera-ai-liquidi-fino-a-2-litri-nel-bagaglio-a-mano-per-i-passeggeri-in-partenza-dal-marconi/?idC=62350&idO=3020425), [BGY controlli](https://www.milanbergamoairport.it/it/controlli-sicurezza/), [BGY comunicato nuovo terminal](https://www.milanbergamoairport.it/it/news/?page=4), [CTA report SAC 2026](https://cms.aeroporto.catania.it/corporate/wp-content/uploads/sites/5/2026/05/SAC_Bilancio-di-Sostenibilita_2026.pdf), [NAP controlli](https://aeroportodinapoli.it/it/web/gesac/in-partenza), [PMO controlli](https://www.aeroportodipalermo.it/guida-del-passeggero/controlli-di-sicurezza/), [regolamento ENAC Roma Urbe](https://www.enac.gov.it/app/uploads/2026/02/RegScalo-ed-2-rev-00.pdf). Nessun record Production modificato.
- [ ] **P0.7d Convalida puntuale e correzioni del lotto Italia** — in corso, aggiornato 2026-10-26. Fonti ENAC e gestori verificate per 11 dei 12 record: BLQ, BGY, BRI, CIA, CTA, FCO, LIN, MXP, NAP, PMO e PSA. BLQ: dal 28/07/2025 liquidi fino a 2 L/contenitore, otto EDS C3, nessuna estrazione. BGY: dal 25/11/2025 nuova area con 14 linee; 2 L e dispositivi restano nel bagaglio; rimossa la distinzione non comprovata fra corsie C3 e convenzionali. FCO: corretto con eccezione ENAC per voli sensibili USA/Israele. LIN: corretto da “nessun limite” a 2 L. MXP: aggiunte differenze T1/T2 e Fast Track T2; dati singoli non appiattiti. CTA: regola 100 ml sostenuta dal report SAC 2026; scanner C3 sono descritti fra iniziative future, non come operativi; procedura dispositivo/estrazione resta non verificata. BRI/CIA/PSA: regola standard ENAC 100 ml; NAP confermata sulla guida Gesac attuale; PMO: confermate istruzioni Gesap per estrarre dispositivi e separare la busta, senza claim sui dolci. Fixture inserite solo in staging: 11 aeroporti, tutte `pending_quality`; 11 policy, `source_verified_at` datato al controllo. Preview: tutte le 11 route HTTP 200, canonical locale corretto, `noindex, follow`; sitemap HTTP 200 non contiene alcuna scheda aeroporto. Staging: 11 aeroporti, 11 policy, 0 `indexable`; la richiesta in coda resta 1 e invariata. Rollback SQL per ID esatti in `supabase/rollback/20261026_staging_it_quality_fixtures.sql`; non eseguito, solo staging `rkigkmmtlqwmbwtyijpp`. Nessuna scrittura Production. **Decisione QUR:** Roma Urbe è aviazione generale, non aeroporto di linea; ENAC documenta la categoria ma non le procedure di security o i servizi specifici rivendicati. Ora `getAirportSeoStatus()` blocca esplicitamente `QUR` anche quando il dato proviene dal fallback statico; entrambe le route generano quindi `noindex` e l’aeroporto non supera il filtro sitemap (`src/lib/seo/airports.ts`). Sullo staging QUR è assente (query read-only), quindi nessuna importazione o scrittura necessaria. Il record resta nel catalogo applicativo; per ogni futura scheda DB il valutatore dovrà mantenere `blocked` e motivare la mancanza di fonti per security/servizi. Poi chiudere il lotto con prove runtime in Preview e riprendere gli altri 35 aeroporti.

**Blocco P0 residuo (aggiornato 2026-10-26):** le migrazioni SEO/admin sono registrate su Production, ma 47/47 aeroporti sono `pending_quality`, 0/47 policy hanno `source_verified_at` e nessuno è `indexable`; `last_verified_at` storico non prova la verifica della fonte. Italia: 11/12 record verificati/corretti in fixture staging; per QUR è ora documentata la regola `blocked` se presente/inserito, ma il record non esiste nello staging (nessuna scrittura/import eseguita). Staging `aero-info-staging` contiene 11 fixture e 1 richiesta preesistente in coda; non eseguire il cron completo finché la richiesta non è isolata. Preview è collegata allo staging sul branch `codex/seo-geo-foundation`, ma manca `CRON_SECRET`. CLI Supabase assente e Docker non disponibile: replay pulito e cron runtime non verificati. Deployment Preview READY sul commit `6b0ad74e`; le modifiche locali non sono incluse. Poi auditare gli altri 35 aeroporti e verificare migrazioni, sitemap e route. Nessuna promozione Production.

### P1 — URL e pagine aeroporto

- [x] **P1.1 Route IT/EN server-rendered** — 2026-10-25 Preview. `/aeroporti/aeroporto-di-praga-vaclav-havel-prg` e `/en/airports/vaclav-havel-airport-prague-prg` rispondono 200 con H1 e contenuto nell’HTML iniziale; `html lang` corretto.
- [x] **P1.2 Slug persistenti** — 2026-10-25. Migrazione impone slug univoci; seed/cron conservano quelli persistiti; route legge lo slug salvato. Test staging con fixture XZZ: cambiato nome IT/EN, URL originale è rimasto 200 e canonical stabile; URL rigenerato dal nuovo nome è 404. Fixture eliminata, staging tornato a zero aeroporti.
- [x] **P1.3 Metadati e lingue** — 2026-10-25 Preview. Titoli e `lang` localizzati, canonical autoreferenziale, tre alternates `hreflang` reciproci; dati verificati nel sorgente HTML IT/EN.
- [x] **P1.4 Compatibilità URL legacy** — 2026-10-25 Preview. Proxy risponde con redirect permanente 308; test `/?airport=PRG` seguito fino al dossier canonical PRG. Link dalla ricerca usano route canoniche.
- [x] **P1.5 Errori e noindex** — 2026-10-25 Preview/staging. Slug inesistente IT/EN restituisce HTTP 404 `noindex`; fixture reale `pending_quality` ha risposto 200 con `noindex, follow` e canonical autoreferenziale. Fixture rimossa; staging verificato vuoto.

**Avanzamento implementazione (2026-10-25):** Preview `READY` sul branch isolato. Verificati: home IT 200 e 33 link HTML; dossier PRG IT/EN 200 nell’HTML, titolo, canonical, alternates, `lang`; legacy `?airport=PRG` risolto dal redirect Proxy; slug inesistente IT/EN HTTP 404; sitemap con 67 URL, alternates e nessuna query; robots con regole per Googlebot, Bingbot e OAI-SearchBot. Il Proxy controlla slug DB non statici e restituisce 503 `noindex` se Supabase non è raggiungibile. Cron risponde 401 perché `CRON_SECRET` non è configurato su Preview. Il dominio Production è accessibile: `https://www.aero-info.eu/` risponde 200; il controllo iniziale fallì sul redirect apex→www/tool di fetch, non per indisponibilità del sito. Preview protetta aggiunge header `X-Robots-Tag: noindex`, atteso per deploy privati. Nulla rilasciato su Production.

### P2 — Sitemap, crawler e link interni

- [x] **P2.1 Sitemap dinamica** — 2026-10-25 Preview. Ora 69 URL (home + 33 record aeroportuali statici in due lingue + guida IT/EN), alternates `hreflang`, zero URL query. Staging DB vuoto: verificato fallback statico approvato.
- [x] **P2.2 Freschezza sitemap** — 2026-10-25 Preview/staging. Fixture reversibile XZZ `indexable`: sitemap aggiornata alla richiesta successiva senza deploy (67 → 3 URL, include IT/EN); rimossa fixture, sitemap tornata a 67 URL, slug XZZ HTTP 404. DB staging verificato pulito (zero aeroporti, policy e terminal XZZ).
- [x] **P2.3 Robots e crawler** — 2026-10-25 Production/Preview. `/robots.txt` Production HTTP 200: consente `/`, disabilita `/api/`, include sitemap; stessi agenti verificati in Preview. Vercel non restituisce una configurazione firewall personalizzata e stato anomalie attive è vuoto. Prova riguarda config/HTTP pubblici, non log di fetch per ogni bot.
- [x] **P2.4 Link crawlable** — 2026-10-25 Preview. Home contiene 33 anchor HTML alle schede e link HTML alla guida; dossier contiene breadcrumb e link ad aeroporti correlati quando definiti nei dati.
- [ ] **P2.5 Webmaster tools** — verificare dominio e inviare sitemap a Google Search Console e Bing Webmaster Tools. Valutare IndexNow per aggiornamenti; invio URL non garantisce inclusione nell’indice. Il 2026-10-26 Search Console aperta con l’account disponibile mostra la schermata iniziale senza proprietà; dominio non ancora verificato. Bing da controllare.

**Avanzamento implementazione (2026-10-25):** Preview latest commit `95f1a73e` `READY`. Sitemap dinamica verificata con fixture XZZ senza redeploy e dopo cleanup; staging vuoto. Production `/robots.txt` risponde 200, consente `/`, disabilita `/api/` e indica sitemap; configurazione firewall personalizzata non trovata e anomalie attive assenti al controllo. La sitemap Production risponde 200 ma resta legacy: 36 URL, incluse `/feedback`, `/unsubscribe` e 33 URL `/?airport=...`; non contiene nuove schede localizzate. Modifiche SEO quindi solo Preview. Preview privata aggiunge `X-Robots-Tag: noindex` da Vercel.

**Avanzamento P3 (2026-10-25):** Template scheda verificato; JSON-LD `Organization`, `WebSite` e `BreadcrumbList` verificato su Preview IT/EN del commit `39aed6c5` (`READY`), contenuto nell’HTML e JSON valido.

**Avanzamento guida editoriale (2026-10-25):** Preview `f22a38d2` `READY`. Guide IT/EN HTTP 200, H1/metadata/canonical/lang verificati; contenuti e fonti nell’HTML SSR. Sitemap 69 URL comprende entrambe le lingue senza query; footer contiene link crawlable alla guida. Header `X-Robots-Tag: noindex` viene aggiunto da Vercel alle Preview protette; non è una verifica dell’indicizzabilità Production.

### P3 — Contenuti, GEO e misurazione

- [x] **P3.1 Template dossier** — 2026-10-25 Preview/codice. `AirportSeoDossier` rende identità e codici, sicurezza/liquidi e regole terminal, terminal, compagnie, servizi, locali, trasporti, fonti e ultima verifica, breadcrumb e aeroporti correlati; omette sezioni vuote e filtra elementi non verificati.
- [ ] **P3.2 Intenti e contenuti** — coprire query reali IT/EN su regole liquidi/scanner, terminal, trasporti, batterie e servizi. FAQ/guide solo con contenuto originale, fonti primarie e utilità autonoma. Query e volumi reali restano da verificare in Search Console/Bing.
  - [x] **P3.2a Guida liquidi/scanner IT/EN** — 2026-10-25 Preview commit `f22a38d2` (`READY`). Regola generale 100 ml distinta dagli esempi ufficiali di Fiumicino/Heathrow fino a 2 L; transiti e verifica specifica aeroporto spiegati con prudenza. Route IT/EN 200, HTML SSR, title, canonical e `lang` corretti; sitemap e footer aggiornati.
- [ ] **P3.3 Fonti e fiducia** — estendere a tutte le schede link ufficiali vicino ai fatti, data verifica e distinzione visibile fra verificato/stimato/segnalato.
  - [x] **P3.3a Guida liquidi: fonti e aggiornamento** — 2026-10-25 Preview. Fonte UE e pagine ufficiali Fiumicino/Heathrow collegate alle affermazioni; data controllo visibile (25 ottobre 2026). Distinti limiti pubblicati da singolo aeroporto dalla regola generale.
- [x] **P3.4 Dati strutturati** — 2026-10-25 Preview. Aggiunti `Organization` e `WebSite` bilingue; `BreadcrumbList` senza doppia voce che puntava alla home. JSON-LD estratto dall’HTML IT/EN e parsato con successo; nomi e URL corrispondono alla pagina. Nessun rating o certificazione.
- [ ] **P3.5 Misurazione** — baseline e controllo mensile di impressioni/clic/query, pagine indicizzate, traffico verso schede, referral `utm_source=chatgpt.com`, errori canonical/sitemap e Core Web Vitals. Usare GA4 e Vercel Analytics già presenti.

## Situazione tecnica iniziale

- Dominio canonico configurato nel codice: `https://www.aero-info.eu`; dominio apex reindirizza a `www` in Vercel.
- Next.js 16.4.2 con `cacheComponents: true`; route aeroporto attuale è una singola pagina client-side. Le API aeroporti leggono Supabase e fondono i record col fallback statico.
- Metadati globali attuali sono condivisi da tutte le schede. Sitemap attuale usa `/`, pagine di utilità e URL `/?airport=<iata>` dal solo dataset statico.
- `robots.ts` consente `/` e disabilita `/api/` in produzione. Verificare sul dominio che le policy Vercel/WAF non blocchino crawler.
- Supabase AeroInfo: 47 aeroporti, tabelle relazionate per sicurezza, terminal, compagnie, servizi, locali e trasporti. Le route devono continuare a funzionare con fallback sicuro se DB non raggiungibile.
- Accessi verificati il 2026-10-25: repository GitHub, progetto Vercel `aero-info` collegato al repository, database Production AeroInfo e progetto staging separato. Search Console e Bing Webmaster non risultano verificati in questo workspace.

## Struttura editoriale per ogni scheda

1. **Identità:** nome ufficiale, città/Paese, codici IATA/ICAO, breve riepilogo utile, fonte e ultima verifica.
2. **Sicurezza e bagagli:** scanner, liquidi, dispositivi e regole differenziate per terminal. Non dedurre che uno scanner 3D implichi regole più permissive senza fonte.
3. **Terminal e compagnie:** terminal di partenza, trasferimenti e check-in quando verificati.
4. **Servizi:** prese, acqua, Wi-Fi, ristorazione e altri POI con ubicazione e terminal solo quando attendibili.
5. **Trasporti:** collegamenti, fermate, durata e costi solo se supportati da fonte. Nessun costo/orario standard presentato come reale.
6. **Fonti e stato:** link ufficiali accanto ai dati, data di verifica e distinzione tra verificato, stimato e segnalato.
7. **Relazioni:** aeroporti alternativi della città, breadcrumb e link descrittivi verso dossier collegati.

Titoli, H1 e descrizioni devono essere specifici per aeroporto e lingua; testo naturale, niente ripetizioni di keyword. Le guide trasversali rispondono a bisogni ricorrenti e non duplicano il dossier.

## Flusso di pubblicazione e indicizzazione dei nuovi aeroporti

1. Richiesta utente resta nel workflow esistente; lo stato email `published` non decide l’indicizzabilità.
2. Compilatore crea/aggiorna il record e assegna `pending_quality`, slug persistenti e lingua; non aggiorna `last_verified_at` con il solo seed.
3. Cron elabora i nuovi record con priorità, controlla fonti ufficiali per IATA e salva i campi estratti solo se supportati. Esiti ambigui o fonti irraggiungibili non promuovono la scheda.
4. Valutatore verifica identità/località, contenuto IT/EN, fonte HTTPS, data di verifica recente, dati core sostanziali e assenza di segnaposto; imposta `indexable` o `blocked` con motivazione.
5. La pagina è raggiungibile con contenuto server-rendered. Solo stato `indexable` riceve canonical, alternates, link interni e presenza sitemap; schede non idonee sono `noindex` e fuori sitemap.
6. Sitemap dinamica riflette la promozione alla richiesta successiva. Search Console/Bing ricevono sitemap; IndexNow può notificare URL cambiate. Nessun passaggio promette indicizzazione automatica: i motori scelgono se e quando indicizzare.

## Criteri di qualità e accettazione

- Dati identità derivano da aeroporto/autorità ufficiale o registry curato; IATA valido, città e nome non generici, coordinate non segnaposto.
- Campi essenziali presenti in IT e EN; politica bagagli/sicurezza collegata a fonte ufficiale HTTPS e verifica riuscita con data.
- Nessuna informazione critica non verificata presentata come certa; servizi e trasporti generici non contano come contenuto originale.
- Route idonea: HTTP 200, testo utile nell’HTML senza JavaScript, metadati lingua-specifici, self-canonical e `hreflang` reciproci.
- Route bloccata: `noindex`, esclusa sitemap e non promossa da errore/fallback Supabase.
- Nuova scheda idonea appare in entrambe le URL e in sitemap senza redeploy; errore Supabase non promuove record non curati.
- Legacy `?airport=` redirige al dossier; slug inesistente restituisce 404; nessun link interno porta a query URL.
- Validare HTML/metadata, sitemap XML, robots, JSON-LD e build di produzione. Controllare gli URL live e Search Console dopo deploy.

## Fonti operative

- [Google Search Central: SEO per JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google Search Central: canonical e URL duplicate](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google Search Central: siti multi-regionali e lingue](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [OpenAI: Publisher e crawler per ChatGPT Search](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- [IndexNow: protocollo e limiti](https://www.indexnow.org/documentation)
- Guide Next.js locali per Next 16: Metadata API, sitemap, internationalization e `cacheComponents`.

## Registro decisioni e limiti

- **Indicizzazione automatica dopo verifica qualità:** richiesto dall’utente il 2026-10-25. Fallback generici non entrano nell’indice.
- **Reversibilità e isolamento:** al 2026-10-26 la console admin è stata allineata tra `main` e `codex/admin-console`, con tag `backup/admin-console-2026-10-26`; `codex/seo-geo-foundation` resta separato. Le note SEO del 2026-10-25 descrivono il lavoro SEO nella Preview e non attestano lo stato corrente di produzione. Prima di promuovere quel lavoro, verificare diff, migrazioni applicate, RLS, build, sitemap e URL pubblici; conservare eventuali modifiche locali non committate.
- **Verifiche webmaster:** configurazione Search Console/Bing dipende dall’accesso agli account; finché non verificata, resta attività aperta.

## Metodo SEO integrato

Riferimento operativo: [Agentic-SEO-Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill), consultata il 2026-10-26; licenza MIT verificata. La versione locale adattata al progetto è in `.agents/skills/aero-info-seo/SKILL.md`: conserva prove/confidenza/priorità e applica criteri aeroportuali, staging e reversibilità. Non eseguiti installer o script upstream; il repository dichiara 16 sotto-skill, 10 agenti e 89 script (88 Python e un helper shell). L’adattamento locale è separato e rimovibile con il branch.

- Ogni rilievo SEO deve riportare **area, severità, confidenza, prova, impatto e correzione**. Confidenza: `Confermato` (osservato direttamente), `Probabile` (segnale forte ma incompleto), `Ipotesi` (serve verifica). Dato assente = `Sconosciuto`, mai dedotto.
- Ordinare attività per impatto, sforzo e dipendenze; distinguere blocchi, quick win, attività strategiche e manutenzione. Severità critica solo con prova di impatto diretto su scansione/indicizzazione.
- Per audit e controlli futuri includere scansione/indicizzazione, metadata, link interni, performance (INP incluso), dati strutturati, immagini/accessibilità, qualità/autorevolezza e citabilità GEO. Registrare limiti ambientali come limiti, non come problemi confermati.
- Applicare il controllo anti-doorway ai dossier aeroportuali: contenuti e fatti locali distintivi, fonti e utilità concreta prima di indicizzazione. Le soglie generiche di parole e unicità della skill non diventano criteri automatici per le schede: sono pagine informative su entità reali, non landing locali commerciali. Conta il superamento dei criteri qualità P0 e la prova verificabile.
- Tenere JSON-LD allineato al testo visibile; non introdurre schema `FAQPage` o `HowTo` come scorciatoia SEO. Nessuna promessa su ranking, traffico o indicizzazione senza dati Search Console/Analytics.
- Non aggiungere deliverable di audit duplicati: `strategia-seo.md` resta piano operativo, con prova e stato aggiornati per attività chiusa. Creare report separati solo se richiesti o se un audit completo li rende necessari.
