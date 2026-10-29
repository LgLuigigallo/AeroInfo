<div align="center">

# ✈️ AeroInfo

**Guida e Informazioni per Viaggiatori Aeroportuali**

*Tutto ciò che serve prima di volare: liquidi 100ml e scanner 3D, regole droni e batterie, terminal, punti di ricarica e servizi — informazioni verificate con le fonti ufficiali degli scali.*

[![Dominio Ufficiale](https://img.shields.io/badge/Dominio-www.aero--info.eu-0284c7?style=for-the-badge&logo=spaceship)](https://www.aero-info.eu)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Production-white?style=for-the-badge&logo=vercel)](https://www.aero-info.eu)

[🌐 **Applicazione**](https://www.aero-info.eu) • [💬 **Feedback**](https://www.aero-info.eu/feedback) • [🔕 **Disiscrizione**](https://www.aero-info.eu/unsubscribe) • [🔐 **Privacy e Cookie Policy**](https://www.aero-info.eu/privacy)

</div>

---

## 📖 Panoramica del Progetto

**AeroInfo** ([aero-info.eu](https://www.aero-info.eu)) è un portale web moderno e veloce progettato per i viaggiatori. L'obiettivo è permettere a chiunque di conoscere con esattezza le regole del proprio scalo di partenza o transito (presenza di scanner tomografici 3D, limiti sui liquidi nel bagaglio a mano, gestione dispositivi elettronici, terminal e servizi essenziali) in pochi istanti.

Tutte le informazioni pubblicate vengono verificate con i canali e le normative ufficiali degli enti aeroportuali. Le segnalazioni o le richieste della community passano attraverso un processo di convalida prima di essere integrate nel catalogo.

---

## 🌟 Funzionalità Principali

### 🔍 1. Ricerca Rapida & Esperienza Utente
- **Interfaccia Pulita:** Homepage essenziale e priva di distrazioni, ottimizzata per mobile e desktop.
- Ricerca istantanea per **codice IATA** (es. `FCO`, `MXP`, `NAP`, `BGY`, `VCE`, `JFK`, `DXB`), codice ICAO, nome dell'aeroporto, città o nazione.
- **Scorciatoia globale:** premi `/` o `Cmd+K` da qualsiasi punto della pagina per cercare subito.
- Cronologia delle ricerche recenti salvata localmente nel browser, senza cookie invasivi.
- Possibilità di richiedere l'inserimento di nuovi aeroporti con notifica via email (conforme GDPR).

### 🛡️ 2. Regolamenti Sicurezza & Scanner 3D (EDS-CB C3)
- Distinzione chiara tra aeroporti con **scanner tomografici 3D operativi** (in cui liquidi oltre 100ml e laptop possono rimanere nel bagaglio a mano) e aeroporti con **normative standard** (limite 100ml in bustina trasparente richiudibile ed estrazione ai varchi).
- Informazioni dettagliate sul trasporto di **droni, batterie al litio e powerbank** (cabina vs stiva).
- Consigli sui tempi di attesa stimati e anticipo suggerito all'arrivo in aeroporto.

### 🛩️ 3. Classificazione Aviazione Generale
- Riconoscimento e segnalazione dedicata per scali non aperti al traffico di linea o riservati all'aviazione generale e commerciale privata (es. Roma Urbe `QUR`), con avvisi specifici per i passeggeri.

### 🌐 4. Risoluzione Fonti Istituzionali
- Validazione rigorosa dei collegamenti esterni che rimandano esclusivamente ai portali istituzionali degli enti di gestione e autorità di aviazione civile (ENAC, ADR, SEA, AENA, DGAC, ecc.), escludendo link a motori di ricerca o fonti non autorevoli.

### 💡 5. Segnalazioni della Community
- Possibilità per gli utenti di inviare suggerimenti o aggiornamenti sulle schede degli aeroporti.
- Le modifiche vengono registrate e verificate con le fonti ufficiali prima della pubblicazione.

### 🗺️ 6. Guida ai Terminal & Servizi
- Dettaglio su concourse, gate, punti di ricarica dispositivi (prese 230V e USB), fontanelle d'acqua potabile gratuite, negozi e ristorazione.

### 🍪 7. Privacy e Conformità GDPR
- Gestione trasparente del consenso cookie con salvataggio locale.
- Totale assenza di tracker invasivi di terze parti o pixel di profilazione commerciale.
- Pagina dedicata [`/unsubscribe`](https://www.aero-info.eu/unsubscribe) per cancellarsi in un click dalle notifiche di aggiornamento.

### 🌍 8. Bilingue & Accessibile (IT / EN)
- Supporto multilingua completo (Italiano e Inglese) con memorizzazione della preferenza.
- Supporto nativo per Dark e Light mode, contrasti curati, navigazione completa da tastiera e supporto screen reader.

---

## 🔒 Sicurezza e Affidabilità

Il codice include difese applicative verificate tramite suite di test automatizzati:

- **Protezione XSS & Injection:** Sanificazione rigorosa dell'output e dei parametri PostgREST/AST.
- **Validazione Input:** Verifica conforme a RFC 5322 per gli indirizzi email e restrizioni sulla dimensione dei payload.
- **Rate Limiting:** Controllo della frequenza delle richieste per prevenire abusi sugli endpoint pubblici.
- **HTTP Security Headers:** Content Security Policy (CSP), HSTS a 2 anni con preload, X-Frame-Options DENY, nosniff, Referrer-Policy e Permissions-Policy.
- **Protezione SSRF:** Filtro restrittivo sulle chiamate outbound verso IP privati, loopback e metadati cloud.
- **Routing Sicuro:** Protezione Edge con redirezioni canoniche 308 e gestione centralizzata degli errori 404/500 tramite Next.js App Router.

---

## 🧭 Area Riservata

AeroInfo include un'area amministrativa protetta (`/admin`) dedicata alla moderazione delle segnalazioni inviate dagli utenti, alla gestione del catalogo e al controllo dei cicli di sincronizzazione.

- L'accesso è strettamente limitato agli account autorizzati tramite autenticazione sicura OAuth.
- Le operazioni amministrative sono tracciate in un registro di audit interno.
- Le credenziali e le chiavi ad alto privilegio (`service_role`) operano esclusivamente lato server e non sono mai esposte al client.

---

## 🛠️ Stack Tecnologico

| Layer | Tecnologie Utilizzate |
| :--- | :--- |
| **Frontend** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Partial Prefetching, Cache Components), [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icone & UI** | [Lucide React](https://lucide.dev/), font Geist (self-hosted) |
| **Backend & Routing** | Next.js Serverless Route Handlers & Edge Proxy |
| **Database** | [Supabase](https://supabase.com/) (PostgreSQL con Row Level Security) |
| **Parser & Scraper** | [Cheerio](https://cheerio.js.org/), validatore SSRF outbound, motore di sincronizzazione automatizzato |
| **Email Transazionali** | [Nodemailer](https://nodemailer.com/) (Gmail SMTP) & [Resend](https://resend.com/) con fallback |
| **Hosting & CDN** | [Vercel](https://vercel.com/) (Anycast Edge Network, Vercel Cron, SSL automatico) |
| **Dominio & DNS** | [Spaceship](https://www.spaceship.com/) + DNS Anycast Vercel (`aero-info.eu`) |

---

## 📁 Struttura del Progetto

```
AeroInfo/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (admin)/                 # Console amministrativa protetta
│   │   ├── (en)/                    # Pagine e rotte localizzate in lingua inglese
│   │   ├── (it)/                    # Pagine e rotte localizzate in lingua italiana
│   │   ├── api/                     # Endpoint API (catalogo, richieste, feedback, cron)
│   │   ├── feedback/                # Modulo feedback utenti
│   │   ├── unsubscribe/             # Portale disiscrizione notifiche GDPR
│   │   ├── not-found.tsx            # Pagina 404 personalizzata
│   │   ├── robots.ts                # Configurazione robots.txt
│   │   ├── sitemap.xml/             # Generazione dinamica sitemap.xml
│   │   └── layout.tsx               # Root layout con metadata OpenGraph
│   ├── components/                  # Componenti UI (Header, Footer, SearchBar, Dossier)
│   ├── data/                        # Dataset di base aeroporti
│   ├── lib/                         # Utility di business logic, sicurezza, email e database
│   ├── proxy.ts                     # Edge proxy per redirect IATA e routing canonico
│   └── types/                       # Definizioni TypeScript
├── supabase/                        # Schema del database e migrazioni PostgreSQL
├── tests/                           # Suite di test automatizzati (sicurezza, SEO, admin)
└── next.config.ts                   # Configurazione Next.js e Security Headers
```

---

## 💻 Sviluppo Locale

### Prerequisiti
- Node.js 20+
- npm o pnpm

### Installazione e avvio

```bash
# 1. Clona il repository
git clone https://github.com/luigigallo12/AeroInfo.git
cd AeroInfo

# 2. Installa le dipendenze
npm install

# 3. Configura le variabili d'ambiente (copia dal template)
cp .env.example .env.local

# 4. Avvia il server di sviluppo
npm run dev

# 5. Esegui la suite di test
npm test

# 6. Verifica la build di produzione
npm run build
```

L'applicazione sarà raggiungibile su `http://localhost:3000`.

---

## 👨‍💻 Autore & Manutenzione

Sviluppato e curato da **Luigi Gallo**.

- 📧 Email: [vireontech@gmail.com](mailto:vireontech@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/luigigallo12](https://www.linkedin.com/in/luigigallo12)
- 🌐 Live App: [www.aero-info.eu](https://www.aero-info.eu)

---

## 📄 Licenza

Questo progetto è rilasciato sotto licenza [MIT](LICENSE).  
I marchi e i dati operativi aeroportuali citati appartengono ai rispettivi enti e autorità di gestione.
