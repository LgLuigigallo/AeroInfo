# Strategia SEO e GEO AeroInfo

**Stato:** implementazione sul branch isolato `codex/seo-geo-foundation`; Preview Vercel in verifica, nessuna modifica a Production
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

**Avanzamento implementazione locale (2026-10-25):**

- [x] **P0.4a Migrazione reversibile preparata** — campi SEO, slug univoci, `source_verified_at`; rimozione dei default che inventavano date sulle nuove righe. Rollback in `supabase/rollback/20261025000000_airport_seo_quality.sql`. Applicata al solo progetto `aero-info-staging` il 2026-10-25; produzione invariata.
- [x] **P0.4b Ambiente Supabase staging** — creato `aero-info-staging` (`rkigkmmtlqwmbwtyijpp`, EU West); schema e 3 migrazioni applicati. Query di verifica: 11 tabelle pubbliche, 29 colonne aeroporti, RLS attiva; zero policy SELECT anon/authenticated su `airport_suggestions`; Security Advisor senza rilievi.
- [ ] **P0.4c Migrazioni riproducibili** — aggiungere una baseline schema versionata prima delle migrazioni datate e verificare il replay su database vuoto. Il branch locale non ha Supabase CLI installata; schema staging è stato inizializzato separatamente via MCP.
- [x] **P0.5a Gate codice** — nuovi record `pending_quality`; allowlist esplicita per i record statici approvati; record generici con dati non verificati e coordinate/template non diventano indicizzabili. La verifica runtime dipende dallo schema.
- [x] **P0.6a Flusso codice** — cron FIFO sui pending, whitelist estesa ai 47 codici attuali, persistenza solo di regole esplicite; seed conserva stato e slug; compilazione fallita non pubblica la richiesta; venue aggiunte/aggiornate senza cancellare le altre.
- [x] **P0.7a Audit meccanico** — 33 statici: 33 superano il gate automatico dopo normalizzazione del prefisso `www` per fonti regolatorie come TSA. Database: 47/47 superano controlli automatici di identità bilingue, URL HTTPS, campi core bilingui, due dettagli bilingui e coordinate; questo non prova che i fatti siano corretti o che le fonti siano state raggiunte.

**Blocco P0 residuo:** Production AeroInfo resta invariata: mancano campi SEO e `source_verified_at`; le 47 date legacy non provano un fetch riuscito. Staging è inizializzato ma vuoto. Vercel Preview ha URL, chiave pubblica e `SUPABASE_SERVICE_ROLE_KEY` di staging, limitati al branch `codex/seo-geo-foundation`. Le variabili da sole non avviano un nuovo deploy. Branch pubblicato su GitHub; Preview ha compilato codice e TypeScript ma fallito durante il prerender di `/`. Correzione in corso: redirect legacy anticipato in `src/proxy.ts`; lettura Supabase dei link pagina avvolta in `Suspense`. Build locale non completabile nell’ambiente corrente: `next/font` non raggiunge Google Fonts; `tsc` locale non disponibile (`node_modules/.bin/tsc` punta a un file mancante). Serve nuova build Preview per verificare la correzione. Nessuna modifica Production.

### P1 — URL e pagine aeroporto

- [ ] **P1.1 Route IT/EN server-rendered** — mantenere home IT su `/`; creare `/aeroporti/[slug]` e `/en/airports/[slug]`; HTML iniziale include contenuto e metadati della scheda.
- [ ] **P1.2 Slug persistenti** — generare slug localizzati con codice IATA, salvati in Supabase e immutabili dopo pubblicazione. Nome aggiornato non cambia URL.
- [ ] **P1.3 Metadati e lingue** — titolo, description, Open Graph, canonical autoreferenziale, `hreflang` reciproco e `html lang` corretto per route.
- [ ] **P1.4 Compatibilità URL legacy** — `/?airport=IATA` fa redirect permanente alla scheda IT. Ricerca, selettori, email e condivisione usano URL canoniche.
- [ ] **P1.5 Errori e noindex** — slug sconosciuto restituisce 404; record `pending_quality`/`blocked` restituisce contenuto visitabile ma `noindex`, senza canonical verso altre schede.

**Avanzamento implementazione (2026-10-25):** le route IT/EN server-rendered, i metadati per scheda, il redirect legacy, il dossier e i link alla ricerca sono nel branch. Preview iniziale ha fallito il prerender della home; redirect legacy spostato nel Proxy e lettura link dinamici avvolta in `Suspense`. Restano da verificare via nuova build Preview e URL reali; non sono rilasciati su Production.

### P2 — Sitemap, crawler e link interni

- [ ] **P2.1 Sitemap dinamica** — includere home e sole schede `indexable`, entrambe le lingue e alternates; usare date di verifica effettive. Escludere query, feedback e unsubscribe. Se DB indisponibile, includere solo fallback statici approvati.
- [ ] **P2.2 Freschezza sitemap** — nuova scheda idonea compare alla richiesta successiva senza redeploy; testare caching Next/Vercel e invalidazione necessaria.
- [ ] **P2.3 Robots e crawler** — permettere pagine pubbliche a Googlebot, Bingbot e `OAI-SearchBot`; bloccare `/api/`; verificare firewall/CDN e status HTTP effettivo.
- [ ] **P2.4 Link crawlable** — aggiungere anchor HTML dalla home agli aeroporti principali e collegamenti tra aeroporti della stessa città, breadcrumb e percorsi per paese quando utili.
- [ ] **P2.5 Webmaster tools** — verificare dominio e inviare sitemap a Google Search Console e Bing Webmaster Tools. Valutare IndexNow per aggiornamenti; invio URL non garantisce inclusione nell’indice.

**Avanzamento implementazione locale (2026-10-25):** sitemap runtime e robots sono implementati localmente. La verifica della sitemap aggiornata senza redeploy, degli status HTTP e delle regole crawler su Vercel resta da fare dopo il rilascio.

### P3 — Contenuti, GEO e misurazione

- [ ] **P3.1 Template dossier** — testata ufficiale; sicurezza/liquidi per terminal; terminal e compagnie; servizi e POI; trasporti; fonti e ultima verifica; aeroporti correlati. Omettere sezioni prive di dati attendibili invece di riempirle con testo generico.
- [ ] **P3.2 Intenti e contenuti** — coprire query reali IT/EN su regole liquidi/scanner, terminal, trasporti, batterie e servizi. FAQ/guide solo con contenuto originale, fonti primarie e utilità autonoma.
- [ ] **P3.3 Fonti e fiducia** — link alla fonte ufficiale vicino alle affermazioni, data verifica, indicatore chiaro per segnalazioni non confermate; distinguere fatti da stime.
- [ ] **P3.4 Dati strutturati** — `Organization`/`WebSite` per identità e `BreadcrumbList` per percorso se coerenti; JSON-LD deve corrispondere al contenuto visibile. Niente rating o certificazioni inventate.
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
