# Verifica di sicurezza della console admin

La suite live è intenzionalmente limitata allo staging AeroInfo verificato (`rkigkmmtlqwmbwtyijpp`). Rifiuta `aero-info.eu`, richiede un hostname HTTPS che contenga `staging` e non invoca endpoint cron. Non usare chiavi o token di produzione.

## 1. Test locali

Eseguire `npm run test:admin:unit`. Il test controlla che i guardrail del runner rifiutino la produzione e che `next.config.ts` applichi `Cache-Control: private, no-store` a tutte le API admin.

## 2. Integrazione live in staging

Preparare in un secret manager o nell’ambiente CI queste variabili, senza stamparle in log:

- `ADMIN_TEST_ENV=staging`
- `ADMIN_TEST_BASE_URL`: URL HTTPS dello staging, con `staging` nel nome host
- `ADMIN_TEST_SUPABASE_URL=https://rkigkmmtlqwmbwtyijpp.supabase.co`
- `ADMIN_TEST_PROJECT_REF=rkigkmmtlqwmbwtyijpp`
- `ADMIN_TEST_SUPABASE_ANON_KEY`: chiave pubblica dello staging
- `ADMIN_TEST_SERVICE_ROLE_KEY`: chiave privata esclusivamente dello staging
- `ADMIN_TEST_NONADMIN_ACCESS_TOKEN`: token temporaneo di un utente autenticato senza privilegi admin
- `ADMIN_TEST_ADMIN_ACCESS_TOKEN`: token temporaneo dell’account admin di staging
- `ADMIN_TEST_FIXTURE_IDS`: oggetto JSON con l’UUID sintetico predisposto in ciascuna delle cinque tabelle private, con chiavi `airport_requests`, `airport_suggestions`, `site_feedback`, `sync_logs` e `admin_audit_log`

Prima predisporre in staging una riga sintetica per ciascuna tabella privata e inserirne gli UUID in `ADMIN_TEST_FIXTURE_IDS`. Per le righe di contatto usare solo indirizzi `@example.invalid`; usare testo segnaposto non personale. La suite confronta quegli ID tramite la chiave service role e verifica che anon e l’utente autenticato valido non possano leggerli. Elimina le fixture dopo aver salvato il report.

Eseguire `npm run test:admin:staging`. Il report JSON contiene solo identificativi sintetici dei controlli, esiti, ambiente e timestamp; non registra token, risposte grezze o dati personali. Il processo valida prima entrambi i token con Supabase Auth e conferma che solo quello admin sia autorizzato alla console. Poi controlla:

- accesso anonimo e token non valido su ogni metodo delle route admin protette; accesso autenticato non admin sulle stesse route;
- forma minima e `no-store` della risposta di stato pubblica;
- lettura anonima e autenticata negata o vuota su richieste, segnalazioni, feedback, sincronizzazioni e audit; accesso di lettura `service_role` su quelle stesse tabelle;
- liste admin senza campi email/nome e con `no-store` su tutte le letture sensibili;
- payload admin invalidi e troppo grandi respinti senza avviare una mutazione.

Un `404` del Data API per una tabella è un esito non valido: segnala che il controllo RLS non ha potuto essere verificato. Un `200` per anon/authenticated è accettato solo con lista vuota per l’ID della fixture, e il service role deve vedere esattamente quella fixture.

## 3. Prove manuali con fixture isolate

Eseguire queste prove in una branch/istanza staging sacrificabile, con un provider email di test e fixture sintetiche. Ripristinare l’istanza dopo la sessione e conservare solo esiti e ID sintetici.

| Area | Prova | Esito richiesto |
| --- | --- | --- |
| OAuth | Login Google con admin ammesso, account non ammesso, callback con errore, logout e sessione/token scaduto | Solo l’admin entra; gli altri vengono rifiutati e le API tornano a `401/403` dopo logout/scadenza |
| IDOR e privacy | Cambiare gli UUID di richieste, feedback e segnalazioni; provare le API pubbliche e le liste admin | Nessun accesso anonimo/non admin; il dettaglio con PII è accessibile solo all’admin |
| Audit fail-closed | In una branch usa-e-getta rendere temporaneamente indisponibile l’inserimento audit, poi tentare una mutazione | Risposta non riuscita e record invariato; ripristinare audit e verificare che il retry venga registrato |
| Concorrenza richiesta | Su una sola richiesta sintetica inviare contemporaneamente annullamento e avvio manuale; controllare anche il worker cron simulato in test locale | Una sola transizione/claim, nessuna doppia pubblicazione o notifica, stato finale coerente e audit per ogni esito |
| Modifica e seed | Modificare un aeroporto sintetico e lanciare il seed staging | Valori curati invariati; ogni persistenza parziale è segnalata e non appare come successo completo |
| Guasti dipendenze | In staging controllato simulare timeout/errori di Auth, DB, audit, email, scraper e valutazione SEO | Nessun falso successo; stato HTTP e messaggio comprensibili; dettagli non contengono token, email o segreti |
| UI | Usare le schermate di login, liste vuote/popolate, dettaglio e conferma su desktop e mobile; rallentare o interrompere le API | Nessun dato personale nelle liste/log; errori e caricamento lento restano comprensibili; sessione scaduta non lascia azioni operative abilitate |

Non chiamare `/api/cron/sync` durante il test live: il cron esegue anche lavorazioni in coda. Il comportamento di concorrenza del worker va simulato nei test locali con dipendenze isolate, oppure in una branch staging dedicata che contenga solo fixture.

## Criterio di superamento

La revisione è superata quando tutti i test automatici obbligatori sono verdi, le prove manuali hanno evidenza registrata senza dati personali, nessun ruolo pubblico/non admin legge dati privati, le mutazioni senza audit non cambiano dati e ogni guasto critico produce un esito non-successo chiaro.
