<div align="center">

# ✈️ AeroInfo

**Global Airport Intelligence & Traveler Guide**

*Tutto ciò che devi sapere prima di volare: liquidi 100ml e scanner 3D, regole droni, terminal, prese di ricarica e trasporti — verificati direttamente dalle autorità aeroportuali.*

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-white?style=for-the-badge&logo=vercel)](https://aero-info.vercel.app)
[![Security Audited](https://img.shields.io/badge/Security-A%2B%20Certified-emerald?style=for-the-badge&logo=securityscorecard)](https://aero-info.vercel.app)

[🌐 **Visita l'Applicazione Live**](https://aero-info.vercel.app) • [💬 **Invia Feedback**](https://aero-info.vercel.app/feedback) • [📄 **Report di Sicurezza**](tests/security.test.ts)

</div>

---

## 📖 Panoramica del Progetto

**AeroInfo** è una piattaforma web moderna, ad altissime prestazioni e focalizzata sull'usabilità per i viaggiatori internazionali. Il suo principio cardine è **"2-Click to Info"**: permettere a qualsiasi passeggero di scoprire le normative esatte del proprio volo (scanner 3D, flaconi liquidi, borracce, droni, terminal e prese elettriche) in meno di 2 secondi.

Tutti i dati visualizzati provengono da canali ufficiali certificati o da un motore di compilazione autonomo con verifica delle discrepanze. Se un'informazione proviene da segnalazioni della community in attesa di conferma ufficiale, viene chiaramente evidenziata con badge esplicativi a scomparsa.

---

## 🌟 Funzionalità Principali

### 🔍 1. Ricerca Istantanea e Universale
- Ricerca istantanea per **codice IATA** (`FCO`, `MXP`, `CDG`, `DXB`, `BCN`, `JFK`), codice ICAO, nome aeroporto, città o nazione.
- **Scorciatoia da tastiera globale:** premi `/` o `Cmd+K` da qualsiasi punto della pagina per cercare.
- Cronologia ricerche recenti salvata localmente in modo sicuro e senza cookie invasivi.
- Possibilità di richiedere l'indicizzazione di nuovi aeroporti con notifica via email (conforme GDPR).

### 🛡️ 2. Regolamenti Sicurezza & Scanner 3D (EDS-CB C3)
- Distinzione chiara e immediata tra aeroporti con **scanner tomografici 3D attivi** (liquidi oltre 100ml e laptop possono restare nel bagaglio a mano) e **normative standard 100ml** (obbligo bustina trasparente da 1 litro ed estrazione al varco).
- Regolamenti specifici per **droni e batterie al litio/powerbank** (trasporto in cabina vs divieto in stiva).
- Tempi medi di attesa stimati ai controlli e ore di anticipo consigliate (voli nazionali vs intercontinentali).

### 🗺️ 3. Mappe Interattive dei Terminal & Punti di Interesse
- Schema visivo e navigabile dei terminal con concourse, gate e aree partenze/arrivi.
- Punti di interesse filtrabili con un click: prese di ricarica 230V e porte USB, fontanelle d'acqua potabile gratuite, ristorazione, bar/caffetterie, duty-free e farmacie.

### 📝 4. Suggerimento Modifiche Community & Verifica in Background
- I passeggeri possono segnalare variazioni per qualsiasi aeroporto direttamente dalla scheda ("Suggerisci modifica").
- **Elaborazione controllata:** le modifiche ricevute **non vengono pubblicate istantaneamente**, ma registrate in background.
- Se una segnalazione non ha ancora trovato conferma sul portale ufficiale dell'aeroporto, compare un **disclaimer a scomparsa ("i")** che avvisa i passeggeri di possibili modifiche imminenti, consigliando le precauzioni standard.
- Il motore di sincronizzazione automatica (`/api/cron/sync`) verifica periodicamente le segnalazioni con le fonti ufficiali.

### 💬 5. Portale Feedback & Contatti Utente
- Pagina dedicata [`/feedback`](https://aero-info.vercel.app/feedback) per inviare commenti, suggerimenti, domande generali o segnalare bug.
- Protezione anti-abuso, rate limiting e notifica istantanea all'amministratore.

### 🌐 6. Bilingue & Accessibile (IT / EN)
- Supporto completo multilingua (Italiano / Inglese) con memorizzazione delle preferenze.
- Contrasti elevati, supporto per Dark/Light mode, etichette ARIA e navigazione completa da tastiera.

---

## 🔒 Sicurezza & Certificazione di Produzione

Il progetto è stato sottoposto a una **security review approfondita** e soddisfa tutti i **36 punti della checklist di produzione**:

```
🔒 AUTOMATED SECURITY TEST SUITE:
  ✅ HTML Escaping (prevenzione XSS & injection nelle email)
  ✅ Validazione RFC 5322 sul formato degli indirizzi email
  ✅ Sanificazione parametri PostgREST (.or, .ilike AST injection defense)
  ✅ Sliding-Window Rate Limiter (blocco a 429 oltre 5 richieste / 10 min per IP)
  ✅ HTTP Security Headers (CSP, HSTS 2 anni, X-Frame-Options DENY, nosniff, Referrer, Permissions)
  ✅ Protezione SSRF (blocco tassativo di IP privati, loopback e metadati cloud link-local)
```

- **Row Level Security (RLS) su Supabase:** Le email degli utenti registrate nella tabella `airport_requests` sono inaccessibili al pubblico (`SELECT` negato ad `anon`) e consultabili unicamente dal `service_role` server-side.
- **Fail-Closed Authorization:** Gli endpoint operativi `/api/cron/sync` e `/api/admin/seed` richiedono un Bearer token segreto a 256-bit (`CRON_SECRET` / `ADMIN_SECRET_KEY`).
- **Zero Tracking Cookies:** Nessun cookie di profilazione o tracciamento invasivo di terze parti (piena conformità GDPR ed ePrivacy).

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

---

## 📁 Struttura del Progetto

```
AeroInfo/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── api/
│   │   │   ├── admin/seed/          # Endpoint autenticato di seeding Supabase
│   │   │   ├── airports/            # API catalogo aeroporti
│   │   │   │   ├── request/         # Richiesta indicizzazione nuovo aeroporto
│   │   │   │   └── suggest/         # Suggerimento modifiche community (con verifica)
│   │   │   ├── cron/sync/           # Cron job settimanale / giornaliero autenticato
│   │   │   └── feedback/            # Invio feedback e commenti generici
│   │   ├── feedback/                # Pagina utente per feedback e messaggi
│   │   ├── not-found.tsx            # Pagina 404 personalizzata a tema aeronautico
│   │   ├── robots.ts                # Generazione dinamica robots.txt per SEO
│   │   ├── sitemap.ts               # Mappa del sito dinamica sitemap.xml
│   │   ├── layout.tsx               # Root layout con metadata OpenGraph e viewport
│   │   └── page.tsx                 # Dashboard principale AeroInfo
│   ├── components/                  # Componenti React riutilizzabili
│   │   ├── tabs/                    # Tab specializzate (Sicurezza, Mappa, Terminal, Prese, ecc.)
│   │   ├── AirportDetail.tsx        # Scheda dossier dettagliata dell'aeroporto
│   │   ├── Header.tsx               # Barra di navigazione superiore con lingua e link
│   │   ├── Footer.tsx               # Footer con legenda, advisory e trasparenza GDPR
│   │   ├── SearchBar.tsx            # Barra di ricerca con autocomplete e scorciatoia '/'
│   │   ├── SuggestAirportEditModal.tsx # Modale per proporre modifiche alla scheda
│   │   └── UnverifiedBadge.tsx      # Badge informativo rosso "i" con modale esplicativo
│   ├── data/                        # Dataset certificato di fallback (50+ aeroporti)
│   ├── lib/
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
│   └── security.test.ts             # Suite automatizzata di test di sicurezza
└── next.config.ts                   # Configurazione Next.js e HTTP Security Headers
```

---

## 🚀 Installazione & Avvio Locale

### 1. Clona il repository
```bash
git clone https://github.com/LgLuigigallo/AeroInfo.git
cd AeroInfo
```

### 2. Installa le dipendenze
```bash
npm install
```

### 3. Configura le variabili d'ambiente
Copia il file di esempio `.env.example` in `.env.local`:
```bash
cp .env.example .env.local
```
Configura i valori necessari:
```ini
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key

# Email Transazionali (Gmail SMTP o Resend)
SMTP_USER=tua-email@gmail.com
SMTP_PASS=tua-password-per-le-app
RESEND_API_KEY=re_your_api_key

# Autenticazione API & Cron
CRON_SECRET=il-tuo-segreto-cron-a-256-bit
ADMIN_SECRET_KEY=il-tuo-segreto-admin-a-256-bit
```

### 4. Avvia i test di sicurezza
```bash
npm test
```

### 5. Avvia il server di sviluppo
```bash
npm run dev
```
L'applicazione sarà accessibile su `http://localhost:3000`.

---

## 🗄️ Database & Migrazioni Supabase

Per configurare le tabelle e le policy di sicurezza su Supabase:
1. Accedi al **SQL Editor** della dashboard Supabase.
2. Esegui lo script iniziale [`supabase/schema.sql`](supabase/schema.sql).
3. Esegui la migrazione di sicurezza RLS [`supabase/migrations/20261022_rls_security_hardening.sql`](supabase/migrations/20261022_rls_security_hardening.sql).
4. Esegui la migrazione per feedback e suggerimenti [`supabase/migrations/20261022_feedback_and_suggestions.sql`](supabase/migrations/20261022_feedback_and_suggestions.sql).

---

## 👨‍💻 Autore & Manutenzione

Sviluppato e curato da **Luigi Gallo**.

- 📧 Email: [vireontech@gmail.com](mailto:vireontech@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/luigigallo12](https://www.linkedin.com/in/luigigallo12)
- 🌐 Live App: [aero-info.vercel.app](https://aero-info.vercel.app)

---

## 📄 Licenza

Questo progetto è rilasciato sotto licenza [MIT](LICENSE).
Tutti i dati e i regolamenti aeroportuali appartengono ai rispettivi enti e autorità di gestione aeroportuale.
