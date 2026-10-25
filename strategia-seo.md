# Strategia SEO e GEO AeroInfo

**Stato:** Preview `READY` sul branch isolato `codex/seo-geo-foundation`; nessuna modifica a Production
**Ultimo aggiornamento:** 2026-10-25  
**Mercati:** italiano prioritario; inglese internazionale  
**Scopo:** acquisire traffico organico qualificato e rendere le informazioni aeroportuali comprensibili e citabili da motori di ricerca e motori di risposta AI. Nessuna attività garantisce posizionamenti o indicizzazione.

## Registro attività

Aggiornare questa sezione al completamento di ogni attività: spuntare la voce, aggiungere data e prova sintetica (file, URL, migrazione o report). Non segnare un’attività completa finché i criteri indicati non sono verificati.

### P0 — Baseline e qualità dei dati

- [x] **P0.1 Baseline tecnica** — 2026-10-25. `src/app/page.tsx` è client-side e seleziona aeroporti da `?airport=`; canonical globale punta alla home; `html` ha `lang="it"`; sitemap usa il dataset statico e URL query.
- [x] **P0.2 Inventario iniziale** — 2026-10-25. 33 aeroporti statici nel codice; 47 record `public.airports` in Supabase.
- [x] **P0.3 Flusso cron attuale** — 2026-10-25. Il compilatore può creare dati standard generici; il cron normale limita il sync ai primi 15 aeroporti; l’esito scraper finisce in `sync_logs` ma non aggiorna i record catalogo.
- [ ] **P0.4 Stato SEO separato in produzione** — campi, slug IT/EN, data di valutazione e motivi di blocco sono pronti nel branch e già applicati allo staging; applicare al progetto AeroInfo Production solo dopo la validazione completa e approvazione del rilascio.
- [ ] **P0.5 Idoneità automatica** — nuove schede partono non indicizzabili; promuovere a `indexable` solo dati localizzati sostanziali, fonte ufficiale HTTPS, politica di sicurezza verificata con data, coordinate e contenuti non segnaposto. Registrare motivi leggibili se `blocked`.
- [ ] **P0.6 Scrittura delle verifiche** — cron mirato ai nuovi record; persistire solo estrazioni supportate da fonte e aggiornare date di verifica solo dopo fetch/estrazione riusciti. Non confondere richiesta `published` con approvazione SEO.
- [ ] **P0.7 Audit 47 record** — applicare gli stessi criteri ai dati esistenti; le schede incomplete restano fruibili nell’app, ma fuori sitemap e con `noindex`.

**Avanzamento implementazione (2026-10-25):**

- [x] **P0.4a Migrazione reversibile preparata** — campi SEO, slug univoci, `source_verified_at`; rimozione dei default che inventavano date sulle nuove righe. Rollback in `supabase/rollback/20261025000000_airport_seo_quality.sql`. Applicata al solo progetto `aero-info-staging` il 2026-10-25; produzione invariata.
- [x] **P0.4b Ambiente Supabase staging** — creato `aero-info-staging` (`rkigkmmtlqwmbwtyijpp`, EU West); schema e 3 migrazioni applicati. Query di verifica: 11 tabelle pubbliche, 29 colonne aeroporti, RLS attiva; zero policy SELECT anon/authenticated su `airport_suggestions`; Security Advisor senza rilievi.
- [ ] **P0.4c Migrazioni riproducibili** — baseline `20261025210543_staging_initial_schema.sql` aggiunta da `supabase/schema.sql`; tre file successivi rinominati con le versioni risultanti da `supabase_migrations.schema_migrations` sullo staging. Versioni locali combaciano con le quattro versioni registrate sullo staging. Rimane da verificare il replay su database vuoto: CLI Supabase non installata, Docker daemon non disponibile e staging esistente non va azzerato. Build Preview `READY` sul commit `59dd999f`.
- [x] **P0.5a Gate codice** — nuovi record `pending_quality`; allowlist esplicita per i record statici approvati; record generici con dati non verificati e coordinate/template non diventano indicizzabili. La verifica runtime dipende dallo schema.
- [x] **P0.6a Flusso codice** — cron FIFO sui pending, whitelist estesa ai 47 codici attuali, persistenza solo di regole esplicite; seed conserva stato e slug ma non trasforma date del catalogo in verifiche riuscite; promozione a `indexable` solo dopo estrazione esplicita riuscita nel run corrente; compilazione fallita non pubblica la richiesta; venue aggiunte/aggiornate senza cancellare le altre. 2026-10-25: audit ha corretto il riuso delle date seed/storiche come prova di fetch.
- [x] **P0.7a Audit meccanico** — 33 statici: 33 superano il gate automatico dopo normalizzazione del prefisso `www` per fonti regolatorie come TSA. Database: 47/47 superano controlli automatici di identità bilingue, URL HTTPS, campi core bilingui, due dettagli bilingui e coordinate; questo non prova che i fatti siano corretti o che le fonti siano state raggiunte.

**Blocco P0 residuo (aggiornato 2026-10-25):** Production AeroInfo non modificata. Lettura Supabase Production: 47 aeroporti e 47 policy; tutte hanno `last_verified_at` tra 21 e 22 ottobre 2026, ma schema non contiene `source_verified_at` né i campi SEO, quindi le date legacy non dimostrano un fetch del crawler. Staging `aero-info-staging` ha schema e migrazioni ma zero righe. Vercel Preview ha URL, chiave pubblica e `SUPABASE_SERVICE_ROLE_KEY` di staging, limitati a `codex/seo-geo-foundation`; `CRON_SECRET` manca. Il fetch MCP del cron è fermato dalla protezione del deployment, quindi runtime del cron non verificato. Preview `READY` sul commit `59dd999f`; dossier PRG risponde 200 con HTML SSR, canonical, hreflang e `robots=index, follow`. Restano da replayare le migrazioni, popolare staging in modo controllato e verificare il cron senza toccare Production.

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
- [ ] **P2.5 Webmaster tools** — verificare dominio e inviare sitemap a Google Search Console e Bing Webmaster Tools. Valutare IndexNow per aggiornamenti; invio URL non garantisce inclusione nell’indice.

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
- **Reversibilità e isolamento:** codice e commit solo in `codex/seo-geo-foundation`; branch remoto attiva solo Preview. Production Supabase e Vercel Production non modificati. Schema applicato solo al progetto staging nuovo e vuoto; env vars modificate solo nel target Vercel Preview e branch-scoped. Migrazione additiva con rollback in `supabase/rollback/20261025000000_airport_seo_quality.sql`. Merge o deploy Production richiede decisione separata.
- **Verifiche webmaster:** configurazione Search Console/Bing dipende dall’accesso agli account; finché non verificata, resta attività aperta.
