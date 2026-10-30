# Strategia SEO e GEO AeroInfo

**Stato aggiornato al 2026-10-29:** Produzione Vercel completamente allineata a `main`. Tutte le route SEO server-rendered bilingue (`/aeroporti/[slug]` e `/en/airports/[slug]`), la sitemap dinamica a 78 URL, i dati strutturati Schema.org `@graph` e l'integrazione IndexNow sono **attivi e verificati in produzione**.
**Ultimo aggiornamento:** 2026-10-29  
**Mercati:** Italiano prioritario; Inglese internazionale  
**Scopo:** Acquisire traffico organico qualificato e rendere le informazioni aeroportuali comprensibili e citabili da motori di ricerca tradizionali (Google, Bing) e motori di risposta AI (Perplexity, ChatGPT Search, Copilot). Nessuna attività garantisce posizionamenti o indicizzazione arbitraria.

---

## Aggiornamento operativo — 2026-10-29

- **Rilascio in Produzione:** L'infrastruttura SEO (precedentemente isolata in branch preview) è confluita con successo su `main` ed è distribuita su Vercel con Partial Prerendering (PPR) edge.
- **Sitemap & Google Search Console:** Google Search Console ha elaborato con successo `https://www.aero-info.eu/sitemap.xml?v=1` con stato **"Riuscita" (78 pagine rilevate)**. La homepage risulta già indicizzata.
- **IndexNow:** Endpoint `/api/admin/indexnow` e trigger automatico nel cron giornaliero implementati per notificare istantaneamente Bing e Yandex delle variazioni di contenuto.
- **Dati Strutturati Schema.org:** Il blocco JSON-LD `@graph` è verificato e include `BreadcrumbList`, `Airport` (con codici IATA/ICAO, coordinate geo, indirizzo e fonte ufficiale istituzionale `sameAs`), `FAQPage` bilingue, `WebSite` e `Organization`.
- **Architettura Link Interni (Footer & Cross-linking):** 
  - La guida sui liquidi (`/guide/liquidi-bagaglio-a-mano` e `/en/guides/liquids-in-carry-on-baggage`) è collegata stabilmente nel footer accanto al feedback su tutte le pagine, eliminando lo stato di pagina orfana.
  - I collegamenti tra scali della stessa area metropolitana (es. MXP → Linate, Bergamo) sono stati convertiti da bottoni JavaScript a veri tag `<Link href="...">` HTML crawlabili.
- **Design Rule 100% Borderless:** Blindata nel file `AGENTS.md` e protetta dalla suite di test automatici `npm test` (`tests/seo-schema.test.mjs`).

---

## Registro attività

### P0 — Baseline e qualità dei dati

- [x] **P0.1 Baseline tecnica** — 2026-10-25. `src/app/page.tsx` client-side con fallback sicuro; canonical globale e alternates bilingue.
- [x] **P0.2 Inventario iniziale** — 2026-10-25. 38 aeroporti statici curati nel codice; catalogo esteso con stato SEO.
- [x] **P0.3 Flusso cron e sync** — 2026-10-25 / 2026-10-28. Cron giornaliero con Rate Limiter, sync incrementale e trigger automatico IndexNow.
- [x] **P0.4 Schema stato SEO in Production** — 2026-10-26. Tabella `public.airports` dotata di campi `seo_status`, slug bilingue, timestamp di verifica e motivi di blocco.
- [x] **P0.5 Idoneità automatica & Gate di Qualità** — 2026-10-27. `evaluateAirportSeoQuality` e `getAirportSeoStatus` applicano regole severe: solo dati sostanziali, fonti HTTPS ufficiali, assenza di testi segnaposto e coordinate valide abilitano lo stato `indexable`. Roma Urbe (QUR) bloccato categoricamente (`blocked`) in quanto aviazione generale.
- [x] **P0.6 Scrittura e timestamp delle verifiche** — 2026-10-27. `source_verified_at` valorizzato esclusivamente in presenza di verifica esplicita con data; persistenza sicura senza inventare date storiche.
- [x] **P0.7 Audit e arricchimento fatti catalogo (48/48 scali commerciali)** — 2026-10-30.
  - [x] **Lotto Italia (13/13):** Regole scanner 3D C3 / 2 Litri (BLQ, BGY, FCO, LIN, MXP, VCE) e regola standard 100 ml (BRI, CIA, CTA, NAP, PMO, PSA); bonifica completa di VCE Marco Polo (da segnaposto generico a scheda certificata); QUR bloccato (aviazione generale).
  - [x] **Lotto Internazionale Primario (4/4):** AMS (100 ml con scanner CT), ARN (T2 100 ml con estrazione / T5 senza estrazione), DUB (2 L rollout C3 completato), BER (T1 corsie 1 e 5 / T2 fino a 2 L; corsie tradizionali 100 ml).
  - [x] **Lotto Internazionale Secondario (31/31):** DXB (CT T3, limite 100ml GCAA, Metro Red Line), PMI (Moduli A-D, standard Aena 100ml), IBZ (T1 2 livelli, Aena 100ml), STR (T1-4, S-Bahn S2/S3, standard 100ml), HKG (Smart channels CT, Airport Express), RAK (ONDA, T1-2, obbligo boarding pass cartacea), HER (autorità YPA/HCAA, standard 100ml), NAS (US CBP Preclearance T-A, LPIA 100ml), DJG (EGSA Alger, standard 100ml), oltre a tutti gli altri scali europei ed extra-europei (FRA, MUC, CDG, ORY, LHR, LGW, MAD, BCN, ZRH, VIE, HEL, CPH, LIS, WAW, KRK, BUD, ATH, HND, JFK, FUE, LPA, TFS).
  - [x] **Risultato:** 48 aeroporti commerciali `indexable` (con 0 motivi di blocco nei controlli automatici di qualità), 1 aeroporto `blocked` (QUR). La sitemap dinamica include ora **100 URL bilingui**.

---

### P1 — URL e pagine aeroporto

- [x] **P1.1 Route IT/EN server-rendered** — 2026-10-27 Production. `/aeroporti/[slug]` e `/en/airports/[slug]` rispondono HTTP 200 con Partial Prerendering (PPR) e contenuto nell'HTML iniziale.
- [x] **P1.2 Slug persistenti** — 2026-10-27 Production. Slug univoci generati e conservati nel database; fallback trasparente su IATA.
- [x] **P1.3 Metadati e lingue** — 2026-10-27 Production. Titoli e meta description differenziati per presenza scanner 3D; canonical autoreferenziale e tre alternates `hreflang` (`it`, `en`, `x-default`) speculari.
- [x] **P1.4 Compatibilità URL legacy** — 2026-10-27 Production. Proxy reindirizza in modo permanente con HTTP 308 i vecchi URL `/?airport=IATA` al dossier canonico `/aeroporti/...`.
- [x] **P1.5 Gestione Errori e Noindex** — 2026-10-27 Production. Unmatched path restituiscono HTTP 404; schede pending o bloccate inviano `<meta name="robots" content="noindex, follow"/>`.

---

### P2 — Sitemap, crawler e link interni

- [x] **P2.1 Sitemap dinamica a 78 URL** — 2026-10-28 Production. `https://www.aero-info.eu/sitemap.xml` include Home (IT/EN), Guida Liquidi (IT/EN) e tutti i 37 aeroporti approvati (IT/EN) con tag `xhtml:link rel="alternate"` e timestamp `lastmod`. Zero URL con parametri query.
- [x] **P2.2 Freschezza e Cache sitemap** — 2026-10-28 Production. Header `Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400` conforme per i webmaster bot.
- [x] **P2.3 Robots.txt & Accessibilità bot AI** — 2026-10-28 Production. Consente `Googlebot`, `Bingbot`, `OAI-SearchBot` e `*`; disabilita solo `/api/`; punta a `sitemap.xml`.
- [x] **P2.4 Link crawlable & Architettura interna** — 2026-10-29 Production. Link alla Guida Liquidi nel Footer su tutte le pagine; badge "Stessa area" convertiti in veri `<Link href="...">` HTML; navigazione di ritorno "Cambia aeroporto" resa crawlabile verso la Home.
- [x] **P2.5 Webmaster Tools & IndexNow** — 2026-10-29. Proprietà verificata su Google Search Console; `sitemap.xml?v=1` elaborata con successo ("Riuscita", 78 pagine rilevate); IndexNow configurato e integrato.

---

### P3 — Contenuti, GEO e misurazione

- [x] **P3.1 Template dossier** — 2026-10-27 Production. `AirportSeoDossier` e `AirportBubblesView` rendono identità, sicurezza/liquidi, terminal, compagnie, servizi, trasporti, FAQ e fonti ufficiali.
- [x] **P3.2a Guida liquidi/scanner IT/EN** — 2026-10-27 Production. Route `/guide/liquidi-bagaglio-a-mano` e `/en/guides/liquids-in-carry-on-baggage` live con fonti europee primarie e aggiornamento visibile.
- [x] **P3.4 Dati strutturati Schema.org** — 2026-10-28 Production. `@graph` unificato (Organization, WebSite, BreadcrumbList, Airport, FAQPage) valido e conforme per Rich Snippets.
- [ ] **P3.5 Misurazione continuativa** — Monitoraggio settimanale in Google Search Console del passaggio dei 78 URL da "Scansionate" a "Indicizzate", impressioni e CTR; controllo referral AI (`utm_source=chatgpt.com`).

---

## Focus Operativo Corrente: P3.5 Misurazione & Indexing Monitor

Obiettivo: Monitorare in Google Search Console e Bing Webmaster Tools l'indicizzazione dei 100 URL della sitemap aggiornata, verificare il traffico organico in ingresso verso i dossier aeroportuali e verificare eventuali citazioni o referral da motori di risposta AI (Perplexity, ChatGPT Search con utm_source).
