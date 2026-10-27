<div align="center">

# ✈️ AeroInfo

**Global Airport Intelligence & Traveler Guide**

*Tutto ciò che devi sapere prima di volare: liquidi 100ml e scanner 3D, regole droni, terminal, prese di ricarica e trasporti — verificati direttamente dalle autorità aeroportuali.*

[![Dominio Ufficiale](https://img.shields.io/badge/Dominio-www.aero--info.eu-0284c7?style=for-the-badge&logo=spaceship)](https://www.aero-info.eu)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Production-white?style=for-the-badge&logo=vercel)](https://www.aero-info.eu)
[![Security](https://img.shields.io/badge/Security-tests%20available-emerald?style=for-the-badge&logo=securityscorecard)](tests/security.test.ts)

[🌐 **Applicazione**](https://www.aero-info.eu) • [💬 **Feedback**](https://www.aero-info.eu/feedback) • [🔕 **Disiscrizione**](https://www.aero-info.eu/unsubscribe) • [🔐 **Privacy e Cookie Policy**](https://www.aero-info.eu/privacy) • [📄 **Test sicurezza**](tests/security.test.ts)

</div>

---

## 📖 Panoramica del Progetto

**AeroInfo** (`aero-info.eu`) è una piattaforma web moderna, ad altissime prestazioni e focalizzata sull'usabilità per i viaggiatori internazionali. Il suo principio cardine è **"2-Click to Info"**: permettere a qualsiasi passeggero di scoprire le normative esatte del proprio volo (scanner 3D, flaconi liquidi, borracce, droni, terminal e prese elettriche) in meno di 2 secondi.

Tutti i dati visualizzati provengono da canali ufficiali verificati o da un motore di compilazione autonomo con verifica delle discrepanze. Se un'informazione proviene da segnalazioni della community in attesa di conferma ufficiale, viene chiaramente evidenziata con badge esplicativi a scomparsa.

---

## 🌟 Funzionalità Principali

### 🔍 1. Ricerca Istantanea, Universale & Welcome Experience
- **Welcome Page Pulita:** All'apertura del portale l'utente viene accolto da un'interfaccia elegante e priva di sovrastrutture, con scorciatoie rapide per i principali hub internazionali senza forzare la selezione di scali predefiniti.
- Ricerca istantanea per **codice IATA** (`FCO`, `MXP`, `CDG`, `DXB`, `BCN`, `JFK`), codice ICAO, nome aeroporto, città o nazione.
- **Scorciatoia da tastiera globale:** premi `/` o `Cmd+K` da qualsiasi punto della pagina per cercare.
- Cronologia ricerche recenti salvata localmente in modo sicuro e senza cookie invasivi.
- Possibilità di richiedere l'indicizzazione di nuovi aeroporti con notifica via email (conforme GDPR).

### 🛡️ 2. Regolamenti Sicurezza & Scanner 3D (EDS-CB C3)
- Distinzione chiara e immediata tra aeroporti con **scanner tomografici 3D attivi** (liquidi oltre 100ml e laptop possono restare nel bagaglio a mano) e **normative standard 100ml** (obbligo bustina trasparente da 1 litro ed estrazione al varco).
- Regolamenti specifici per **droni e batterie al litio/powerbank** (trasporto in cabina vs divieto in stiva).
- Tempi medi di attesa stimati ai controlli e ore di anticipo consigliate (voli nazionali vs intercontinentali).

### 🛩️ 3. Aviazione Generale & Voli Privati
- Classificazione e **tag dedicato per scali non commerciali** o dedicati all'aviazione generale e commerciale privata (es. Roma Urbe `QUR`).
- Avvisi specifici e banner contestuale con raccomandazioni per i passeggeri di linea che cercano per errore tali scali.

### 🌐 4. Risoluzione Autorità Ufficiali & Filtro Link Motori di Ricerca
- Modulo di validazione rigoroso (`aviation-authority.ts`) che **elimina categoricamente link a ricerche Google o Bing**.
- Risoluzione automatica e fallback sui portali istituzionali dell'aviazione civile ed enti di gestione nazionali (ENAC, AENA, DGAC, ADV, CAA, EGSA, ONDA, ecc.).

### 🖼️ 5. Frame Dossier Unificato
- Visualizzazione a blocco unico: l'intera scheda informativa dell'aeroporto selezionato (header, statistiche, tab e contatti) è racchiusa in una **cornice visiva coerente**, permettendo all'utente di identificare immediatamente il perimetro del dossier durante lo scorrimento.

### 💡 6. Bolla Floating "Suggerisci Modifica"
- **Floating Action Button** sempre visibile durante lo scroll della pagina per consentire ai viaggiatori di segnalare variazioni in qualunque momento.
- **Elaborazione controllata:** le modifiche ricevute **non vengono pubblicate istantaneamente**, ma registrate in background.
- Se una segnalazione non ha ancora trovato conferma sul portale ufficiale dell'aeroporto, compare un **disclaimer a scomparsa ("i")** che avvisa i passeggeri di possibili modifiche imminenti, consigliando le precauzioni standard.
- Il motore di sincronizzazione automatica (`/api/cron/sync`) verifica periodicamente le segnalazioni con le fonti ufficiali.

### 🗺️ 7. Mappe Interattive dei Terminal & Punti di Interesse
- Schema visivo e navigabile dei terminal con concourse, gate e aree partenze/arrivi.
- Punti di interesse filtrabili con un click: prese di ricarica 230V e porte USB, fontanelle d'acqua potabile gratuite, ristorazione, bar/caffetterie, duty-free e farmacie.

### 🍪 8. Gestione Consenso Cookie & Privacy (GDPR & ePrivacy)
- Banner e modale di consenso cookie leggero e non invasivo, con salvataggio delle preferenze in `localStorage`.
- Totale assenza di cookie di tracciamento di terze parti o pixel pubblicitari.

### 🔕 9. Portale Disiscrizione Email Notifiche (`/unsubscribe`)
- Pagina dedicata conforme al GDPR per consentire la cancellazione immediata da qualsiasi notifica di aggiornamento o scansione aeroportuale richiesta in precedenza.
- Validazione crittografica e token di disiscrizione sicuro con feedback in tempo reale.

### 💬 10. Portale Feedback & Contatti Utente
- Pagina dedicata [`/feedback`](https://www.aero-info.eu/feedback) per inviare commenti, suggerimenti, domande generali o segnalare bug.
- Protezione anti-abuso, rate limiting e notifica istantanea all'amministratore.

### 🌍 11. Bilingue & Accessibile (IT / EN)
- Supporto completo multilingua (Italiano / Inglese) con memorizzazione istantanea delle preferenze.
- Contrasti elevati, supporto per Dark/Light mode, etichette ARIA e navigazione completa da tastiera.

---

## 🔒 Sicurezza e test

Il repository include controlli automatici per le principali difese applicative. Il superamento della suite non costituisce una certificazione né sostituisce verifiche end-to-end sull'ambiente distribuito.

```
🔒 AUTOMATED SECURITY TEST SUITE:
  ✅ HTML Escaping (prevenzione XSS & injection nelle email)
  ✅ Validazione RFC 5322 sul formato degli indirizzi email
  ✅ Sanificazione parametri PostgREST (.or, .ilike AST injection defense)
  ✅ Sliding-Window Rate Limiter (blocco a 429 oltre 5 richieste / 10 min per IP)
  ✅ HTTP Security Headers (CSP, HSTS 2 anni, X-Frame-Options DENY, nosniff, Referrer, Permissions)
  ✅ Protezione SSRF (blocco tassativo di IP privati, loopback e metadati cloud link-local)
  ✅ Validazione & Sicurezza Parametri Disiscrizione (/unsubscribe)
  ✅ Risoluzione Autorità Ufficiali & Classificazione Aviazione Generale
```

- **API amministrative:** `/api/cron/sync` usa `CRON_SECRET`; la console `/admin` usa sessioni Supabase Auth verificate rispetto a `ADMIN_EMAILS`. `SUPABASE_SERVICE_ROLE_KEY` resta lato server.
- **Verifiche online:** i controlli anonimi eseguiti il 2026-10-26 hanno ricevuto `401` dagli endpoint amministrativi protetti. Non coprono l'intero flusso admin autenticato, la concorrenza o ogni policy RLS.
- **Privacy:** la policy è disponibile su [`/privacy`](https://www.aero-info.eu/privacy); verificare la configurazione del consenso e i trattamenti effettivi prima di formulare dichiarazioni di conformità.

---

## 🧭 Console amministrativa

La console privata è disponibile su `/admin`. Il login usa Google tramite Supabase Auth; dopo l’accesso, il server autorizza solo le email elencate in `ADMIN_EMAILS` (separate da virgole). Le API admin verificano il token Supabase a ogni richiesta e usano `SUPABASE_SERVICE_ROLE_KEY` solo lato server.

### Attivazione

1. In Supabase abilita il provider Google e inserisci le credenziali OAuth del progetto. Configura l’URL callback mostrato da Supabase, normalmente `https://<project-ref>.supabase.co/auth/v1/callback`, nella console Google.
2. In Supabase Authentication → URL Configuration, aggiungi `https://www.aero-info.eu/admin/callback` e l’URL locale di sviluppo, ad esempio `http://localhost:3000/admin/callback`, alla lista dei redirect consentiti.
3. Imposta `ADMIN_EMAILS` nell’ambiente server (ad esempio `amministratore@dominio.it`). Mantieni `SUPABASE_SERVICE_ROLE_KEY` solo tra le variabili server, senza prefisso `NEXT_PUBLIC_`.
4. Verifica che nel progetto Supabase di destinazione siano applicate tutte le migrazioni richieste dalla versione distribuita, consultando lo storico delle migrazioni e la documentazione del rilascio.

La console gestisce la revisione e l’avvio/annullamento delle richieste, i suggerimenti e i feedback, il catalogo aeroporti, le valutazioni SEO, le sincronizzazioni singole e il registro append-only delle azioni. Le richieste restano nel ciclo automatico anche dopo l’approvazione; “Avvia ora” le elabora subito. Le modifiche al catalogo impostano un blocco di provenienza che impedisce al seeding statico successivo di sovrascriverle.

Le email dei richiedenti non vengono incluse negli elenchi; sono accessibili solo nel dettaglio protetto. Se il login non è configurato o la migrazione non è stata applicata, la console resta chiusa.

## 🚀 Rilascio e branch

- `main` è il branch collegato alla produzione Vercel. Al 2026-10-26, `main` e `codex/admin-console` puntano al commit `0a781f4c`.
- Il tag `backup/admin-console-2026-10-26` conserva un riferimento recuperabile a quella versione della console.
- `codex/seo-geo-foundation` resta separato; le sue modifiche SEO non vanno considerate rilasciate in produzione senza verifica del deploy.
- La copia locale può contenere modifiche non committate: prima di sincronizzarla, controllare `git status` e preservare il lavoro in corso.

---

## Console amministrativa

La console privata è disponibile su `/admin`. Il login usa Google tramite Supabase Auth; il server autorizza solo gli indirizzi elencati in `ADMIN_EMAILS` e usa `SUPABASE_SERVICE_ROLE_KEY` solo lato server.

La console gestisce richieste, segnalazioni, feedback, catalogo aeroporti, qualità SEO, sincronizzazioni singole e registro append-only. Le richieste restano nel flusso automatico; “Avvia ora” elabora soltanto la selezionata. Le modifiche al catalogo sono protette dal seeding statico successivo. I dati di contatto sono visibili solo nei dettagli protetti.

Prima di abilitare la console, configura Google OAuth in Supabase e aggiungi `https://www.aero-info.eu/admin/callback` agli URL di reindirizzamento consentiti. Le migrazioni richieste sono `20261026064848_admin_console.sql`, `20261026080708_admin_seo_fields.sql` e `20261026081500_admin_source_verification.sql`.

---

## 🛠️ Stack Tecnologico

| Layer | Tecnologie Utilizzate |
| :--- | :--- |
| **Frontend** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Partial Prefetching, Cache Components), [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icone & UI** | [Lucide React](https://lucide.dev/), Geist Sans & Geist Mono (self-hosted fonts) |
| **Backend & API** | Next.js Serverless Route Handlers (Edge & Node.js runtime) |
| **Database** | [Supabase](https://supabase.com/) (PostgreSQL 15+, Row Level Security, Full-Text Search GIN) |
| **Scraping & Parsing** | [Cheerio](https://cheerio.js.org/), SSRF outbound validator, Autonomous Compiler Engine |
| **Email Transazionali** | [Nodemailer](https://nodemailer.com/) (Gmail SMTP) & [Resend](https://resend.com/) con fallback |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/) (Edge Network, Vercel Cron, Automatic SSL) |
| **Dominio & DNS** | [Spaceship](https://www.spaceship.com/) + Vercel Anycast DNS (`aero-info.eu`) |

---

## 📁 Struttura del Progetto

```
AeroInfo/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── api/
│   │   │   ├── admin/               # API amministrative con verifica sessione Google
│   │   │   ├── airports/            # API catalogo aeroporti
│   │   │   │   ├── request/         # Richiesta indicizzazione nuovo aeroporto
│   │   │   │   ├── suggest/         # Suggerimento modifiche community (con verifica)
│   │   │   │   └── unsubscribe/     # Endpoint disiscrizione email GDPR
│   │   │   ├── cron/sync/           # Cron job periodico autenticato
│   │   │   └── feedback/            # Invio feedback e commenti generici
│   │   ├── feedback/                # Pagina utente per feedback e messaggi
│   │   ├── unsubscribe/             # Portale disiscrizione notifiche GDPR
│   │   ├── not-found.tsx            # Pagina 404 personalizzata a tema aeronautico
│   │   ├── robots.ts                # Generazione dinamica robots.txt per SEO
│   │   ├── sitemap.ts               # Mappa del sito dinamica sitemap.xml
│   │   ├── layout.tsx               # Root layout con metadata OpenGraph e viewport
│   │   └── page.tsx                 # Dashboard principale AeroInfo con Welcome State
│   ├── components/                  # Componenti React riutilizzabili
│   │   ├── tabs/                    # Tab specializzate (Sicurezza, Mappa, Terminal, Prese, ecc.)
│   │   ├── AirportDetail.tsx        # Scheda dossier con frame unificato e floating suggest button
│   │   ├── CookieBanner.tsx         # Banner e modale preferenze cookie GDPR
│   │   ├── Header.tsx               # Barra di navigazione superiore con lingua e link
│   │   ├── Footer.tsx               # Footer con legenda, advisory e trasparenza GDPR
│   │   ├── SearchBar.tsx            # Barra di ricerca con autocomplete e scorciatoia '/'
│   │   ├── SuggestAirportEditModal.tsx # Modale per proporre modifiche alla scheda
│   │   └── UnverifiedBadge.tsx      # Badge informativo rosso "i" con modale esplicativo
│   ├── data/                        # Dataset di fallback (50+ aeroporti)
│   ├── lib/
│   │   ├── aviation-authority.ts    # Risoluzione autorità ufficiali & filtro link Google
│   │   ├── compiler/                # Motore di risoluzione e compilazione aeroportuale
│   │   ├── scraper/                 # Motore di web scraping con whitelist ufficiale
│   │   ├── security/                # Utility: sanificazione, rate limiting, SSRF filter
│   │   ├── email.ts                 # Dispatcher email con template HTML sanificati
│   │   ├── i18n.tsx                 # Provider multilingua (Italiano / Inglese)
│   │   └── supabase.ts              # Client Supabase con isolamento service_role
│   └── types/                       # Definizioni TypeScript (Airport, POI, Suggestions)
├── supabase/
│   ├── migrations/                  # Script di migrazione SQL e RLS hardening
│   └── schema.sql                   # Schema iniziale completo PostgreSQL
├── tests/
│   └── security.test.ts             # Suite automatizzata di test di sicurezza (8 suite)
└── next.config.ts                   # Configurazione Next.js e HTTP Security Headers
```

---

## 👨‍💻 Autore & Manutenzione

Sviluppato e curato da **Luigi Gallo**.

- 📧 Email: [vireontech@gmail.com](mailto:vireontech@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/luigigallo12](https://www.linkedin.com/in/luigigallo12)
- 🌐 Live App: [www.aero-info.eu](https://www.aero-info.eu)

---

## 📄 Licenza

Questo progetto è rilasciato sotto licenza [MIT](LICENSE).
Tutti i dati e i regolamenti aeroportuali appartengono ai rispettivi enti e autorità di gestione aeroportuale.
