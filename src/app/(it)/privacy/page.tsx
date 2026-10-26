'use client';

import Link from 'next/link';
import { ArrowLeft, Plane } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { LanguageProvider } from '@/lib/i18n';

const sections = [
  {
    title: '1. Titolare del trattamento e contatti',
    content: <p>Il titolare del trattamento è AeroInfo, contattabile per ogni comunicazione relativa alla privacy all’indirizzo <a href="mailto:vireontech@gmail.com">vireontech@gmail.com</a>.</p>,
  },
  {
    title: '2. Dati trattati e finalità',
    content: <>
      <p>Il sito tratta i dati necessari a fornire le sue funzioni e a mantenere il servizio sicuro:</p>
      <ul>
        <li><strong>Richieste di aeroporti:</strong> aeroporto o località cercata e, se la inserisci, email per ricevere aggiornamenti e conferme.</li>
        <li><strong>Suggerimenti e segnalazioni:</strong> codice IATA, categoria, descrizione, eventuale link alla fonte ed email facoltativa.</li>
        <li><strong>Feedback:</strong> categoria, oggetto e messaggio; nome ed email sono facoltativi.</li>
        <li><strong>Dati tecnici e di sicurezza:</strong> indirizzo IP e informazioni della richiesta possono essere usati per limitare abusi, proteggere il servizio e diagnosticare errori.</li>
        <li><strong>Console amministrativa:</strong> l’accesso è riservato agli account autorizzati. Se accedi come amministratore, Supabase Auth tratta l’identificativo dell’account Google e l’indirizzo email per autenticazione e controllo degli accessi; le attività amministrative sono registrate.</li>
      </ul>
      <p>Le informazioni inviate vengono usate per gestire la richiesta, valutare contributi, migliorare le schede aeroportuali, inviare gli aggiornamenti richiesti e rispondere ai feedback. Non inserire nei campi informazioni non necessarie o dati particolari.</p>
    </>,
  },
  {
    title: '3. Base giuridica',
    content: <p>Le richieste e gli aggiornamenti via email sono trattati per fornire la funzione richiesta e adottare misure precontrattuali; feedback e suggerimenti sono gestiti sulla base del legittimo interesse a mantenere e migliorare AeroInfo. I dati tecnici sono trattati per sicurezza e funzionamento del sito. Gli strumenti analitici facoltativi sono attivati secondo la scelta espressa nel pannello cookie. L’accesso amministrativo è trattato per proteggere e gestire il servizio.</p>,
  },
  {
    title: '4. Destinatari e fornitori',
    content: <p>I dati possono essere trattati, secondo necessità, dai fornitori che ospitano il sito e il database o che forniscono autenticazione, analisi e invio di email: Vercel, Supabase, Google e il servizio email configurato (Gmail SMTP o Resend). Questi fornitori agiscono secondo i rispettivi ruoli e accordi. I dati non sono venduti. Alcuni fornitori possono trattare dati fuori dallo Spazio economico europeo; in tal caso si applicano i meccanismi di trasferimento previsti dalla normativa.</p>,
  },
  {
    title: '5. Conservazione',
    content: <p>I dati delle richieste e dei suggerimenti sono conservati per gestirli e mantenere lo storico editoriale e operativo; i feedback sono conservati per gestirli e migliorare il servizio. I dati tecnici sono conservati per il tempo necessario alle finalità di sicurezza e funzionamento, anche secondo i periodi dei fornitori. L’email usata per ricevere aggiornamenti può essere rimossa tramite la funzione di disiscrizione; le copie già presenti nei messaggi di posta o nei log tecnici possono restare soggette ai tempi di conservazione dei rispettivi fornitori. I dati possono essere conservati più a lungo quando necessario per obblighi di legge o tutela dei diritti.</p>,
  },
  {
    title: '6. Cookie e strumenti di analisi',
    content: <>
      <p>AeroInfo usa il browser per memorizzare la preferenza del banner cookie (<code>aeroinfo_cookie_consent_v1</code>), così da ricordare la tua scelta. Questo dato resta nel tuo browser.</p>
      <p>Il sito integra Vercel Analytics per statistiche tecniche di utilizzo. Google Analytics può essere caricato quando è configurato per il sito; il pannello di consenso gestisce la preferenza analitica tramite Google Consent Mode. Puoi modificare la scelta in qualsiasi momento dal collegamento “Impostazioni cookie” nel footer. Gli strumenti e le tecnologie dei fornitori possono usare identificatori e dati tecnici secondo le loro informative.</p>
    </>,
  },
  {
    title: '7. Conferimenti e conseguenze',
    content: <p>Puoi consultare le pagine pubbliche senza inviare dati identificativi. I campi email, nome e fonte sono facoltativi dove indicato; senza email non potremo inviarti aggiornamenti o rispondere direttamente. I dati richiesti nei moduli sono necessari per gestire la relativa richiesta o segnalazione.</p>,
  },
  {
    title: '8. I tuoi diritti',
    content: <p>Nei casi previsti puoi chiedere accesso, rettifica, cancellazione, limitazione o opposizione al trattamento, nonché portabilità dei dati. Puoi inoltre revocare il consenso agli strumenti analitici tramite le impostazioni cookie, senza pregiudicare i trattamenti già effettuati. Per esercitare i diritti scrivi a <a href="mailto:vireontech@gmail.com">vireontech@gmail.com</a>. Hai anche diritto di proporre reclamo al <a href="https://www.garanteprivacy.it/" target="_blank" rel="noopener noreferrer">Garante per la protezione dei dati personali</a>.</p>,
  },
  {
    title: '9. Aggiornamenti',
    content: <p>Questa informativa può essere aggiornata quando cambiano il sito o i trattamenti. La versione pubblicata in questa pagina è quella attualmente applicabile.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LanguageProvider>
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-14">
        <header className="mb-10 space-y-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2.5 font-bold tracking-tight text-lg">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"><Plane className="h-4 w-4 -rotate-45" /></span>
              <span>Aero<span className="text-blue-600 dark:text-blue-400">Info</span></span>
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600 transition hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> Torna al sito</Link>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Informazioni legali</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Privacy & Cookie Policy</h1>
            <p className="max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">Come AeroInfo raccoglie e utilizza i dati quando navighi sul sito o ci invii una richiesta, un suggerimento o un feedback.</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">Ultimo aggiornamento: 26 ottobre 2026</p>
          </div>
        </header>

        <div className="space-y-4">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7 dark:border-zinc-800 dark:bg-zinc-900/60">
              <h2 className="mb-3 text-base font-bold tracking-tight sm:text-lg">{section.title}</h2>
              <div className="privacy-copy space-y-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{section.content}</div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-950 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-100">
          <strong>Domande sulla privacy?</strong> Contattaci a <a className="font-semibold underline underline-offset-2" href="mailto:vireontech@gmail.com">vireontech@gmail.com</a>.
        </div>
      </main>
      <Footer />
      <CookieConsent />
      <style>{`.privacy-copy a { color: #2563eb; text-decoration: underline; text-underline-offset: 2px; } .privacy-copy ul { list-style: disc; padding-left: 1.25rem; } .privacy-copy li + li { margin-top: .5rem; } .privacy-copy code { border-radius: .375rem; background: rgb(244 244 245); padding: .125rem .375rem; font-size: .8em; } .dark .privacy-copy code { background: rgb(39 39 42); }`}</style>
    </div>
    </LanguageProvider>
  );
}
