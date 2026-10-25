export type GuideLanguage = 'it' | 'en';

export type GuideContent = {
  path: string;
  title: string;
  description: string;
  introduction: string;
  reviewedAt: string;
  sections: Array<{
    heading: string;
    paragraphs: Array<{ text: string; sourceIndex?: number }>;
  }>;
  sources: Array<{ label: string; href: string }>;
};

export const liquidsGuide: Record<GuideLanguage, GuideContent> = {
  it: {
    path: '/guide/liquidi-bagaglio-a-mano',
    title: 'Liquidi nel bagaglio a mano: limiti e regole per aeroporto',
    description: 'La regola dei 100 ml è generale, ma alcuni aeroporti pubblicano eccezioni. Scopri come controllare limiti, scanner e scali di transito.',
    introduction: 'Il limite può dipendere dall’aeroporto e dal controllo di sicurezza. Non dedurre un’eccezione dalla sola presenza di scanner nuovi: verifica le istruzioni ufficiali dello scalo da cui parti e di ogni aeroporto in cui fai scalo.',
    reviewedAt: '2026-10-25',
    sections: [
      {
        heading: 'La regola generale nell’Unione Europea',
        paragraphs: [
          { text: 'La pagina per i viaggiatori della Commissione Europea indica come regola generale contenitori fino a 100 ml, raccolti in una busta trasparente richiudibile da non più di 1 litro. La stessa pagina prevede eccezioni per medicinali essenziali, alimenti per neonati e latte destinati al viaggio.', sourceIndex: 0 },
          { text: 'La categoria comprende anche gel, creme, aerosol, dentifricio e prodotti di consistenza simile. Controlla sempre la pagina dell’aeroporto: questa guida non sostituisce le istruzioni applicate al tuo specifico volo.' },
        ],
      },
      {
        heading: 'Le istruzioni possono cambiare da uno scalo all’altro',
        paragraphs: [
          { text: 'Alcuni aeroporti pubblicano limiti diversi quando i controlli usano sistemi approvati. Aeroporti di Roma ha annunciato l’uso a Fiumicino di scanner EDS C3 che consentono contenitori fino a 2 litri e di lasciarli nel bagaglio durante il controllo. Heathrow indica a sua volta contenitori fino a 2 litri e liquidi lasciati nel bagaglio a mano.', sourceIndex: 1 },
          { text: 'Questi esempi riguardano le istruzioni dei singoli aeroporti. Non dimostrano che lo stesso limite valga in tutti gli aeroporti, terminal, controlli o voli in transito; verifica l’informazione ufficiale più recente prima di preparare il bagaglio.', sourceIndex: 2 },
        ],
      },
      {
        heading: 'Cosa controllare prima di partire',
        paragraphs: [
          { text: '1. Cerca la pagina ufficiale “sicurezza” o “bagaglio a mano” dell’aeroporto di partenza. 2. Controlla se le istruzioni citano il tuo terminal o il tipo di controllo. 3. Se cambi aeroporto, verifica anche le regole del controllo successivo. 4. Se non trovi una deroga esplicita e aggiornata, prepara i liquidi seguendo la regola generale da 100 ml e 1 litro.' },
          { text: 'Il limite dei liquidi riguarda i controlli di sicurezza; misure e peso del bagaglio a mano restano soggetti alle regole della compagnia aerea.' },
        ],
      },
    ],
    sources: [
      { label: 'Commissione Europea — Informazioni per i viaggiatori', href: 'https://transport.ec.europa.eu/transport-modes/air/aviation-security/information-air-travellers_en' },
      { label: 'Aeroporti di Roma — comunicati stampa (annuncio Fiumicino del 25 luglio 2025)', href: 'https://www.adr.it/comunicati-stampa' },
      { label: 'Heathrow — Security and baggage FAQs', href: 'https://www.heathrow.com/customer-support/faq/faq-security' },
    ],
  },
  en: {
    path: '/en/guides/liquids-in-carry-on-baggage',
    title: 'Liquids in carry-on baggage: limits by airport',
    description: 'The 100 ml rule is general, but some airports publish exceptions. Check limits, scanners and transfer airports before packing.',
    introduction: 'The limit can depend on the airport and security checkpoint. Do not assume that new scanners automatically mean an exception: check the official instructions for your departure airport and every airport where you transfer.',
    reviewedAt: '2026-10-25',
    sections: [
      {
        heading: 'The general rule in the European Union',
        paragraphs: [
          { text: 'The European Commission’s traveller information states the general rule as containers of up to 100 ml, placed in one transparent resealable bag with a capacity of no more than 1 litre. It also lists exceptions for essential medicines, baby food and milk needed during the trip.', sourceIndex: 0 },
          { text: 'Liquids include gels, creams, aerosols, toothpaste and similar-consistency products. Always check your airport’s own page: this guide does not replace the instructions for your specific flight.' },
        ],
      },
      {
        heading: 'Instructions can differ between airports',
        paragraphs: [
          { text: 'Some airports publish different limits where approved screening systems are in use. Aeroporti di Roma announced that Fiumicino’s EDS C3 scanners allow containers of up to 2 litres and liquids to remain in cabin baggage during screening. Heathrow also states that containers up to 2 litres are permitted and can stay in cabin baggage.', sourceIndex: 1 },
          { text: 'These examples describe the individual airports’ instructions. They do not show that the same limit applies at every airport, terminal, checkpoint or transfer. Check the latest official information before packing.', sourceIndex: 2 },
        ],
      },
      {
        heading: 'What to check before you leave',
        paragraphs: [
          { text: '1. Find the departure airport’s official security or cabin-baggage page. 2. Check whether its instructions mention your terminal or checkpoint. 3. If you transfer, check the next airport’s rules too. 4. If you cannot find an explicit, current exception, pack liquids using the general 100 ml and 1 litre rule.' },
          { text: 'Liquid limits concern security screening; cabin-bag size and weight remain subject to your airline’s rules.' },
        ],
      },
    ],
    sources: [
      { label: 'European Commission — Information for air travellers', href: 'https://transport.ec.europa.eu/transport-modes/air/aviation-security/information-air-travellers_en' },
      { label: 'Aeroporti di Roma — press releases (Fiumicino announcement, 25 July 2025)', href: 'https://www.adr.it/comunicati-stampa' },
      { label: 'Heathrow — Security and baggage FAQs', href: 'https://www.heathrow.com/customer-support/faq/faq-security' },
    ],
  },
};
