# ✈️ AeroInfo — Airport Intelligence & Traveler Guide

AeroInfo è un aggregatore web moderno, ultra-rapido e minimale, progettato per fornire ai viaggiatori le informazioni essenziali sui principali aeroporti mondiali in meno di 2 secondi ("2-Click to Info").

Tutti i dati primari provengono esclusivamente dai **siti web ufficiali degli aeroporti**, con aggiornamento settimanale automatizzato. Ogni informazione non confermata o ricavata dall'esperienza di altri viaggiatori viene evidenziata con un badge informativo rosso **`"i"`**.

---

## ✨ Funzionalità Chiave

1. **Ricerca Istantanea Intelligente:**
   - Cerca per codice IATA (`FCO`, `MXP`, `JFK`, `LHR`, `HND`, `CDG`), codice ICAO, nome aeroporto, città o nazione.
   - Scorciatoia rapida da tastiera: premi `/` in qualsiasi momento per cercare.
   - Accesso rapido a Top Hubs mondiali e cronologia ricerche recenti.

2. **Scheda Aeroporto Modulare a 6 Tab:**
   - 💧 **Sicurezza & Bagagli:** Riconoscimento scanner tomografici 3D (liquidi oltre 100ml e laptop in borsa vs obbligo estrazione), regolamento droni e batterie/powerbank.
   - ✈️ **Terminal & Compagnie:** Tabella interattiva e ricercabile per associare ogni compagnia al suo terminal e all'area check-in, più dettagli sui collegamenti inter-terminal.
   - ⏱️ **Difficoltà & Tempi:** Punteggio di complessità (1-5), tempi medi di attesa stimati ai varchi, anticipo consigliato (voli nazionali vs intercontinentali) e consigli di navigazione.
   - ⚡ **Prese & Servizi:** Mappatura precisa delle poltrone con prese AC 230V e porte USB, Wi-Fi gratuito (SSID e velocità), fontanelle d'acqua per borracce e depositi bagagli.
   - 🍽️ **Ristorazione & Shopping:** Filtri per Ristoranti, Bar/Caffè, Grab & Go, Duty-Free e Farmacie con indicazione di orari e servizi h24.
   - 🚆 **Arrivi & Trasporti:** Treni express, metropolitana, bus navetta e tariffe fisse ufficiali dei taxi per il centro città.

3. **Sistema di Verifica & Badge Rosso `"i"`:**
   - Cliccando su qualsiasi dato contrassegnato dal badge rosso `"i"`, si apre un modale esplicativo:
     > *"Questa informazione non è stata verificata sul sito ufficiale, ma è derivata dall'esperienza di altri viaggiatori."*

4. **Bilingue (Italiano & Inglese):**
   - Switch istantaneo in testata (`IT` $\leftrightarrow$ `EN`) con memorizzazione automatica delle preferenze.

5. **Scraper Ufficiale & Aggiornamento Settimanale:**
   - Pipeline di web scraping limitata a whitelist di domini ufficiali (`src/lib/scraper/engine.ts`).
   - Endpoint protetto `/api/cron/sync` configurato per Vercel Cron ogni lunedì alle 02:00 AM (`vercel.json`).

6. **Database Supabase:**
   - Schema PostgreSQL completo pronto all'uso con Full-Text Search e Row Level Security (`supabase/schema.sql`).
   - Modalità ibrida: funziona immediatamente con il dataset verificato integrato e si sincronizza istantaneamente a Supabase non appena vengono fornite le chiavi API in `.env.local`.

---

## 🚀 Avvio Locale

```bash
# 1. Installa le dipendenze
npm install

# 2. Avvia il server di sviluppo
npm run dev

# 3. Apri il browser su:
http://localhost:3000
```

---

## 🗄️ Configurazione Supabase (Opzionale)

1. Crea un progetto gratuito su [Supabase](https://supabase.com).
2. Vai nell'**SQL Editor** di Supabase e incolla il contenuto del file [`supabase/schema.sql`](./supabase/schema.sql).
3. Copia l'URL e la Anon Key nelle variabili d'ambiente:
   ```bash
   cp .env.example .env.local
   ```
   Compila `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

---

## 🌐 Deploy su Vercel

1. Collega il repository GitHub su [Vercel](https://vercel.com).
2. Aggiungi le variabili d'ambiente in **Project Settings -> Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `CRON_SECRET` (stringa casuale a tua scelta per proteggere il cron)
3. Clicca su **Deploy**. Il file `vercel.json` attiverà automaticamente la sincronizzazione settimanale ogni lunedì.
