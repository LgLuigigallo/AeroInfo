import { Airport } from '@/types/airport';

export const airportsData: Airport[] = [
  // =========================================================================
  // 🇨🇿 REPUBBLICA CECA (CZECH REPUBLIC)
  // =========================================================================
  {
    id: 'prg',
    iata: 'PRG',
    icao: 'LKPR',
    name_it: 'Aeroporto di Praga Václav Havel',
    name_en: 'Václav Havel Airport Prague',
    city_it: 'Praga',
    city_en: 'Prague',
    country_it: 'Repubblica Ceca',
    country_en: 'Czech Republic',
    countryCode: 'CZ',
    officialWebsite: 'https://www.prg.aero',
    coordinates: { lat: 50.1008, lng: 14.2600 },
    difficultyRating: 2,
    difficultyLabel_it: 'Fluido & Ben Organizzato (Filobus 59 e AE Express)',
    difficultyLabel_en: 'Smooth & Well Organized (Trolleybus 59 & AE Express)',
    averageSecurityWaitMin: 10,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Attenzione alla distinzione fondamentale dei terminal: il Terminal 2 è dedicato a tutti i voli all\'interno dell\'area Schengen (controllo di sicurezza centralizzato all\'ingresso dell\'area imbarchi). Il Terminal 1 è dedicato ai voli extra-Schengen (Regno Unito, USA, ecc.) dove i controlli di sicurezza si effettuano direttamente al singolo gate d\'imbarco prima di salire a bordo.',
    navigationAdvice_en: 'Crucial terminal distinction: Terminal 2 handles all Schengen flights (centralized security checkpoint before airside). Terminal 1 handles non-Schengen flights (UK, USA, etc.) where security screening is carried out directly at each individual departure gate.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Varchi tradizionali con linee di prova per scanner 3D al Terminal 2. Controlli rapidi e personale multilingue.',
      scannersNote_en: 'Conventional X-ray screening with pilot 3D lanes at Terminal 2. Quick processing and multilingual staff.',
      liquidsAllowance_it: 'Regola standard europea 100ml: flaconi fino a 100ml inseriti in un singolo sacchetto trasparente richiudibile da 1 litro.',
      liquidsAllowance_en: 'Standard EU 100ml rule: containers max 100ml packed in one clear resealable 1-litre bag.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Laptop, tablet e dispositivi elettronici di grandi dimensioni devono essere estratti e scansionati separatamente.',
      electronicsNote_en: 'Laptops, tablets, and large electronics must be removed from bags for inspection.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni consentiti a bordo come bagaglio a mano con batterie rimosse e protette. Divieto assoluto di volo sopra il centro storico di Praga e nel raggio di 5,5 km dall\'aeroporto (normativa ÚCL).',
      dronePolicy_en: 'Drones permitted in cabin luggage with batteries protected. Strictly forbidden over Prague historic centre and within 5.5 km of airport (ÚCL rules).',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Batterie e powerbank max 100Wh consentiti solo in cabina. Vietati categoricamente nella stiva.',
      powerbankPolicy_en: 'Powerbanks up to 100Wh allowed in cabin only. Strictly forbidden in cargo hold.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.prg.aero/en/security-rules',
      lastVerifiedDate: '2026-10-19'
    },
    terminals: [
      { id: 'prg-t2', name: 'Terminal 2 (Schengen)', transferInfo_it: 'Dedicato a tutti i voli verso i Paesi UE / Schengen (Italia, Francia, Germania, Spagna, ecc.). Controllo di sicurezza centralizzato al secondo piano.', transferInfo_en: 'Dedicated to all Schengen flights (Italy, France, Germany, Spain). Centralized security on 2nd floor.' },
      { id: 'prg-t1', name: 'Terminal 1 (Non-Schengen)', transferInfo_it: 'Dedicato a voli verso Regno Unito, Irlanda, USA, Medio Oriente. I controlli di sicurezza si effettuano al singolo gate.', transferInfo_en: 'Dedicated to non-Schengen destinations (UK, Ireland, USA). Security check located at individual gates.' }
    ],
    airlines: [
      { airlineName: 'Smartwings / Czech Airlines', iataCode: 'QS/OK', terminal: 'Terminal 2 & 1', checkInZone: 'Banchi T2 Isola 1-3' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 1 & 2', checkInZone: 'Banchi T1/T2 dedicati' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 1 & 2', checkInZone: 'Banchi T2' },
      { airlineName: 'Lufthansa / Swiss', iataCode: 'LH/LX', terminal: 'Terminal 2', checkInZone: 'Banchi T2 Isola 4' },
      { airlineName: 'British Airways', iataCode: 'BA', terminal: 'Terminal 1', checkInZone: 'Banchi T1' },
      { airlineName: 'Wizz Air', iataCode: 'W4', terminal: 'Terminal 2', checkInZone: 'Banchi T2' },
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Terminal 1', checkInZone: 'Banchi T1 Isola 5' }
    ],
    amenities: [
      { id: 'prg-pwr', category: 'power_charging', title_it: 'Tavoli di lavoro con prese USB e AC 230V', title_en: 'Work desks with USB & 230V AC outlets', terminal: 'Terminal 2 & 1', location_it: 'Lungo i Gate C e D (T2) e lungo i Gate A e B (T1)', location_en: 'Along Concourse C and D (T2) and A and B (T1)', details_it: 'Sedute e banconi dotati di prese universali europee e doppie porte USB per smartphone e laptop.', details_en: 'Seating and high tables with European Schuko sockets and dual USB ports.' },
      { id: 'prg-wifi', category: 'wifi', title_it: 'Prague Airport Wi-Fi Free', title_en: 'Prague Airport Wi-Fi Free', terminal: 'Tutti i Terminal', location_it: 'Disponibile in tutti i terminal', location_en: 'Available across entire airport', details_it: 'Rete: "prg.aero-free". Wi-Fi gratuito e illimitato senza richiesta di carta o registrazione.', details_en: 'Network: "prg.aero-free". Free unlimited Wi-Fi with no card or payment.' },
      { id: 'prg-water', category: 'water_refill', title_it: 'Fontanelle di acqua potabile gratuita', title_en: 'Free Drinking Water Fountains', terminal: 'Terminal 1 & 2', location_it: 'Presso i blocchi servizi igienici vicino ai Gate C02, D01 e A04', location_en: 'Next to restrooms near Gates C02, D01 and A04', details_it: 'Distributori con beccuccio verticale per riempire agevolmente le borracce dopo i controlli.', details_en: 'Vertical spout fountains designed for water bottle refills.' },
      { id: 'prg-relax', category: 'quiet_area', title_it: 'Area Relax & Poltrone Chaise-Longue', title_en: 'Relaxation Area & Chaise-Longues', terminal: 'Terminal 2', location_it: 'Al secondo piano sopra l\'area commerciale', location_en: 'Second floor above commercial plaza', details_it: 'Poltrone ergonomiche in zona tranquilla con vista sulla pista.', details_en: 'Ergonomic lounge recliners in quiet zone overlooking apron.', isUnverified: true, details_it_unverified: 'I viaggiatori consigliano di arrivare prima delle 10:00 per trovare poltrone libere.', details_en_unverified: 'Travelers recommend arriving before 10:00 to secure open recliners.' }
    ],
    venues: [
      { id: 'prg-v1', name: 'Pilsner Urquell Original Restaurant', category: 'dining', terminal: 'Terminal 2', location: 'Partenze dopo i controlli', hours: '06:00 - 22:00' },
      { id: 'prg-v2', name: 'Costa Coffee & Paul Boulangerie', category: 'cafe', terminal: 'Terminal 1 & 2', location: 'Area partenze prima e dopo i controlli', hours: '05:00 - 22:30' },
      { id: 'prg-v3', name: 'Aelia Duty Free Prague', category: 'duty_free', terminal: 'Terminal 1 & 2', location: 'Airside centrale', hours: '05:30 - 23:00' },
      { id: 'prg-v4', name: 'Billa Supermarket', category: 'grab_and_go', terminal: 'Tra T1 e T2', location: 'Piano terra prima dei controlli', hours: '06:00 - 21:00' }
    ],
    transports: [
      { id: 'prg-tr-1', type: 'bus', name_it: 'Filobus Elettrico 59 (per Metro A Nádraží Veleslavín)', name_en: 'Trolleybus 59 (to Metro A Nádraží Veleslavín)', duration: '17 min', frequency: 'Ogni 3-6 minuti', estimatedCost: '40 CZK (~€1.60)', pickupLocation_it: 'Pensiline bus fronte Terminal 1 e Terminal 2', pickupLocation_en: 'Bus bays outside Terminal 1 and Terminal 2', details_it: 'Nuovissimo filobus elettrico articolato ad altissima frequenza. A Nádraží Veleslavín si sale sulla metro verde A che porta a Malostranská o Můstek (Piazza San Venceslao) in 10 minuti.', details_en: 'Modern high-capacity articulated electric trolleybus. Connects with Green Metro Line A directly to Old Town.' },
      { id: 'prg-tr-2', type: 'bus', name_it: 'Airport Express (AE - Diretto per Stazione Centrale Hlavní Nádraží)', name_en: 'Airport Express (AE - Direct to Main Railway Station)', duration: '30-40 min', frequency: 'Ogni 20-30 minuti', estimatedCost: '100 CZK (~€4.00)', pickupLocation_it: 'Fermata AE fronte Terminal 1', pickupLocation_en: 'AE bus stop outside Terminal 1', details_it: 'Bus espresso no-stop direttamente per la stazione ferroviaria principale di Praga.', details_en: 'Non-stop express coach direct to Prague Main Train Station.' },
      { id: 'prg-tr-3', type: 'taxi', name_it: 'Uber Airport Ufficiale / Taxi Praha', name_en: 'Official Uber Airport / Taxi Praha', duration: '25-35 min', frequency: 'Continuo', estimatedCost: '550-750 CZK (~€22.00-€30.00)', pickupLocation_it: 'Chioschi ufficiali nell\'area arrivi di T1 e T2', pickupLocation_en: 'Official booking kiosks in arrivals halls T1 and T2', details_it: 'Tariffa garantita prenotabile ai totem interattivi o tramite app Uber.', details_en: 'Guaranteed upfront pricing at airport interactive kiosks or Uber app.' }
    ],
    lastUpdated: '2026-10-19'
  },

  // =========================================================================
  // 🇮🇹 ITALIA (ITALY)
  // =========================================================================
  {
    id: 'fco',
    iata: 'FCO',
    icao: 'LIRF',
    name_it: 'Aeroporto Internazionale Leonardo da Vinci (Fiumicino)',
    name_en: 'Leonardo da Vinci International Airport (Fiumicino)',
    city_it: 'Roma',
    city_en: 'Rome',
    country_it: 'Italia',
    country_en: 'Italy',
    countryCode: 'IT',
    officialWebsite: 'https://www.adr.it/fiumicino',
    coordinates: { lat: 41.8003, lng: 12.2389 },
    difficultyRating: 2,
    difficultyLabel_it: 'Molto Organizzato & Veloce (Skytrax 5-Star)',
    difficultyLabel_en: 'Highly Organized & Smooth (Skytrax 5-Star)',
    averageSecurityWaitMin: 8,
    recommendedArrivalHours: { domestic: 2, international: 3 },
    navigationAdvice_it: 'Aeroporto modernizzato e molto intuitivo. Il Terminal 1 e il Terminal 3 sono connessi internamente. I varchi di sicurezza con scanner 3D sono tra i più rapidi d\'Europa.',
    navigationAdvice_en: 'Modern and very intuitive airport. Terminal 1 and Terminal 3 are internally connected. Security lanes equipped with 3D scanners are among the fastest in Europe.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Terminal 1 e Terminal 3 dotati di scanner tomografici Smiths Detection EDS-CB C3 di ultima generazione.',
      scannersNote_en: 'Terminal 1 and Terminal 3 equipped with state-of-the-art Smiths Detection EDS-CB C3 tomographic scanners.',
      liquidsAllowance_it: 'Nessun limite di 100ml: è consentito portare contenitori e bottiglie di liquidi oltre 100ml senza doverli estrarre dal bagaglio a mano.',
      liquidsAllowance_en: 'No 100ml limit: liquids and water bottles exceeding 100ml can stay inside carry-on baggage.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Computer portatili, tablet e dispositivi elettronici possono rimanere all\'interno della borsa/zaino durante il passaggio.',
      electronicsNote_en: 'Laptops, tablets, and electronics can stay inside your bag during screening.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi solo come bagaglio a mano. Le batterie al litio devono essere rimosse dal drone, riposte in sacchetti antincendio e con poli isolati. Vietato il trasporto in stiva.',
      dronePolicy_en: 'Drones allowed in cabin only. Lithium batteries must be removed, placed in fireproof pouches with terminals insulated. Strictly prohibited in checked luggage.',
      droneUnverified: true,
      droneNote_it: 'Alcuni addetti alla sicurezza al T3 potrebbero richiedere una verifica visiva del marchio CE e della scheda tecnica della batteria.',
      droneNote_en: 'Some security staff at T3 may perform manual inspection of CE marks and battery Wh specifications.',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Powerbank ammessi solo nel bagaglio a mano fino a 100Wh (fino a 160Wh con autorizzazione preventiva del vettore). Massimo 2 unità per passeggero.',
      powerbankPolicy_en: 'Powerbanks permitted in carry-on baggage only up to 100Wh (up to 160Wh with prior airline approval). Maximum 2 units per passenger.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.adr.it/fco-norme-di-sicurezza',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'fco-t1', name: 'Terminal 1', transferInfo_it: 'Dedicato a voli ITA Airways, partner SkyTeam, Vueling, EasyJet e voli Schengen. Connesso a piedi con il Terminal 3 (5 minuti).', transferInfo_en: 'Dedicated to ITA Airways, SkyTeam partners, Vueling, EasyJet, and Schengen flights. 5-min walk to Terminal 3.' },
      { id: 'fco-t3', name: 'Terminal 3', transferInfo_it: 'Dedicato a tutti i voli intercontinentali (USA, Medio Oriente, Asia), Ryanair, Wizz Air e vettori non-Schengen. Collegamento con l\'area imbarchi E tramite SkyBridge People Mover.', transferInfo_en: 'Dedicated to all long-haul intercontinental flights, Ryanair, Wizz Air, and non-Schengen carriers. Connected to Boarding Area E via SkyBridge People Mover.' }
    ],
    airlines: [
      { airlineName: 'ITA Airways', iataCode: 'AZ', terminal: 'Terminal 1', checkInZone: 'Banchi 100-190' },
      { airlineName: 'Air France / KLM', iataCode: 'AF/KL', terminal: 'Terminal 1', checkInZone: 'Banchi 200-240' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 1', checkInZone: 'Banchi 250-280' },
      { airlineName: 'Lufthansa / Swiss', iataCode: 'LH/LX', terminal: 'Terminal 1', checkInZone: 'Banchi 160-180' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 3', checkInZone: 'Banchi 280-320' },
      { airlineName: 'Wizz Air', iataCode: 'W4', terminal: 'Terminal 3', checkInZone: 'Banchi 330-360' },
      { airlineName: 'Delta Air Lines', iataCode: 'DL', terminal: 'Terminal 3', checkInZone: 'Banchi 370-390' },
      { airlineName: 'United Airlines', iataCode: 'UA', terminal: 'Terminal 3', checkInZone: 'Banchi 400-420' },
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Terminal 3', checkInZone: 'Banchi 430-450' }
    ],
    amenities: [
      { id: 'fco-pwr-1', category: 'power_charging', title_it: 'Poltrone con ricarica USB e prese AC 230V', title_en: 'Armchairs with USB charging & AC 230V sockets', terminal: 'Terminal 1 & Terminal 3', location_it: 'Gates A01-A80 e Nuova Area Imbarchi E (tutte le sedute fronte gate)', location_en: 'Gates A01-A80 and New Boarding Area E (integrated in gate seating)', details_it: 'Prese universali Schuko e prese USB integrate sotto ogni fila di poltrone.', details_en: 'Universal Schuko power sockets and USB ports integrated under seating rows.' },
      { id: 'fco-wifi', category: 'wifi', title_it: 'Wi-Fi gratuito illimitato ad alta velocità', title_en: 'Free Unlimited High-Speed Wi-Fi', terminal: 'Tutti i Terminal', location_it: 'Copertura totale in tutte le aree', location_en: 'Full coverage across all areas', details_it: 'Rete: "Airport-Free-WiFi". Nessuna registrazione o limite di tempo, velocità fino a 100Mbps.', details_en: 'Network: "Airport-Free-WiFi". No registration or time limits, speeds up to 100Mbps.' },
      { id: 'fco-water', category: 'water_refill', title_it: 'Fontanelle acqua potabile per borracce', title_en: 'Free Drinking Water Refill Fountains', terminal: 'Terminal 1 & 3', location_it: 'Presso i servizi igienici vicino ai Gate A27, A61, E18 ed E34', location_en: 'Next to restrooms near Gates A27, A61, E18, and E34', details_it: 'Erogatori gratuiti con acqua refrigerata e indicatore di temperatura.', details_en: 'Free dispensers with chilled drinking water.' },
      { id: 'fco-quiet', category: 'quiet_area', title_it: 'Area Relax & Poltrone Reclinabili', title_en: 'Relax Zone & Reclining Chairs', terminal: 'Terminal 3', location_it: 'Area Imbarchi E, soppalco superiore (sopra Piazza di Spagna)', location_en: 'Boarding Area E, upper mezzanine (above Piazza di Spagna)', details_it: 'Zona silenziosa con chaise-longue anatomiche e luce soffusa per riposo.', details_en: 'Quiet lounge area with ergonomic chaise-longues and dimmed lighting.', isUnverified: true, details_it_unverified: 'I viaggiatori segnalano che l\'area è molto richiesta durante le prime ore del mattino.', details_en_unverified: 'Travelers report high occupancy during early morning hours.' }
    ],
    venues: [
      { id: 'fco-v1', name: 'Eataly', category: 'dining', terminal: 'Terminal 1', location: 'Piazza del Gusto (dopo controlli)', hours: '06:00 - 22:30' },
      { id: 'fco-v2', name: 'Ferrari Spazio Bollicine', category: 'dining', terminal: 'Terminal 3', location: 'Area Imbarchi E', hours: '07:00 - 22:00' },
      { id: 'fco-v3', name: 'Venchi Cioccolato e Gelato', category: 'cafe', terminal: 'Terminal 1 & 3', location: 'Gate A31 ed Area E', hours: '06:00 - 23:00' },
      { id: 'fco-v4', name: 'Aelia Duty Free', category: 'duty_free', terminal: 'Terminal 1 & 3', location: 'Subito dopo i filtri di sicurezza', hours: '05:30 - 23:00' }
    ],
    transports: [
      { id: 'fco-tr-1', type: 'train', name_it: 'Leonardo Express (Non-stop per Roma Termini)', name_en: 'Leonardo Express (Non-stop to Rome Termini)', duration: '32 min', frequency: 'Ogni 15 minuti', estimatedCost: '€14.00', pickupLocation_it: 'Stazione ferroviaria interna dell\'aeroporto (fronte T3)', pickupLocation_en: 'Internal airport train station (in front of T3)', details_it: 'Collegamento ferroviario diretto senza fermate fino a Roma Termini.', details_en: 'Direct non-stop train link straight to Rome Termini central station.' },
      { id: 'fco-tr-4', type: 'taxi', name_it: 'Taxi Ufficiale di Roma Capitale', name_en: 'Official Rome City Taxi', duration: '35-50 min', frequency: 'Disponibilità continua', estimatedCost: '€55.00 (Tariffa fissa)', pickupLocation_it: 'Uscita arrivi Terminal 1 e Terminal 3', pickupLocation_en: 'Arrivals exits Terminal 1 and Terminal 3', details_it: 'Tariffa fissa regolamentata per destinazioni all\'interno delle Mura Aureliane.', details_en: 'Regulated fixed flat fare for all destinations inside Aurelian Walls.' }
    ],
    lastUpdated: '2026-10-19'
  },
  {
    id: 'mxp',
    iata: 'MXP',
    icao: 'LIMC',
    name_it: 'Aeroporto di Milano Malpensa',
    name_en: 'Milan Malpensa Airport',
    city_it: 'Milano',
    city_en: 'Milan',
    country_it: 'Italia',
    country_en: 'Italy',
    countryCode: 'IT',
    officialWebsite: 'https://www.milanomalpensa-airport.com',
    coordinates: { lat: 45.6301, lng: 8.7255 },
    difficultyRating: 3,
    difficultyLabel_it: 'Organizzato ma esteso (Distanze medie)',
    difficultyLabel_en: 'Well-managed but sprawling (Moderate walk distances)',
    averageSecurityWaitMin: 14,
    recommendedArrivalHours: { domestic: 2, international: 3 },
    navigationAdvice_it: 'Attenzione al terminal di partenza: il T1 ospita la maggior parte delle compagnie internazionali e tradizionali, mentre il T2 è interamente riservato a EasyJet. I due terminal distano circa 10 minuti di navetta gratuita.',
    navigationAdvice_en: 'Verify departure terminal: T1 serves major international carriers, while T2 is dedicated entirely to EasyJet. The two terminals are connected by a 10-minute free shuttle.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Terminal 1 dotato di scanner EDS-CB C3 con corsie intelligenti. Al Terminal 2 sono presenti scanner tradizionali con limite 100ml.',
      scannersNote_en: 'Terminal 1 features EDS-CB C3 smart scanners. Terminal 2 operates traditional scanners with 100ml limit.',
      liquidsAllowance_it: 'Al Terminal 1 è possibile trasportare liquidi senza limite di 100ml e senza estrarli. Al Terminal 2 vige l\'obbligo standard dei 100ml in busta trasparente.',
      liquidsAllowance_en: 'At Terminal 1 liquids can exceed 100ml and stay in luggage. Terminal 2 strictly enforces 100ml bag rule.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Al Terminal 1 i computer rimangono nel bagaglio. Al Terminal 2 vanno estratti e messi nelle vaschette.',
      electronicsNote_en: 'At Terminal 1 laptops stay inside bag. At Terminal 2 laptops must be placed in separate trays.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni consentiti a bordo come bagaglio a mano con batterie protette da cortocircuito. Vietato il trasporto in stiva.',
      dronePolicy_en: 'Drones permitted in cabin baggage with battery short-circuit protection. Prohibited in cargo hold.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh consentiti in cabina. Vietati in stiva.',
      powerbankPolicy_en: 'Maximum 100Wh permitted in cabin. Strictly prohibited in cargo hold.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.milanomalpensa-airport.com/it/guida-per-il-passeggero/sicurezza-e-controlli',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'mxp-t1', name: 'Terminal 1', transferInfo_it: 'Terminal principale per voli di linea nazionali, europei e intercontinentali. Navetta h24 gratuita ogni 7 minuti per il T2.', transferInfo_en: 'Main terminal for domestic, EU and intercontinental airlines. 24/7 free shuttle every 7 mins to T2.' },
      { id: 'mxp-t2', name: 'Terminal 2', transferInfo_it: 'Terminal interamente dedicato alle operazioni di EasyJet.', transferInfo_en: 'Terminal dedicated exclusively to EasyJet flights.' }
    ],
    airlines: [
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 2', checkInZone: 'Tutti i banchi T2' },
      { airlineName: 'ITA Airways', iataCode: 'AZ', terminal: 'Terminal 1', checkInZone: 'Area Check-in 10' },
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal 1', checkInZone: 'Area Check-in 09' },
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Terminal 1', checkInZone: 'Area Check-in 13' }
    ],
    amenities: [
      { id: 'mxp-pwr', category: 'power_charging', title_it: 'Postazioni di ricarica rapida', title_en: 'Rapid Charging Workstations', terminal: 'Terminal 1', location_it: 'Imbarchi A e B lungo il corridoio centrale', location_en: 'Gates A and B along central corridor', details_it: 'Tavoli alti da lavoro con prese USB e AC 230V.', details_en: 'High work tables equipped with USB & 230V outlets.' },
      { id: 'mxp-wifi', category: 'wifi', title_it: 'Malpensa Free Wi-Fi', title_en: 'Malpensa Free Wi-Fi', terminal: 'Terminal 1 & 2', location_it: 'Tutte le aree', location_en: 'All areas', details_it: 'Navigazione gratuita.', details_en: 'Free browsing.' }
    ],
    venues: [
      { id: 'mxp-v1', name: 'Ferrari Spazio Bollicine', category: 'dining', terminal: 'Terminal 1', location: 'Piazza del Lusso', hours: '06:00 - 22:00' }
    ],
    transports: [
      { id: 'mxp-tr-1', type: 'train', name_it: 'Malpensa Express (per Cadorna / Centrale)', name_en: 'Malpensa Express (to Cadorna / Centrale)', duration: '37-52 min', frequency: 'Ogni 15-30 minuti', estimatedCost: '€13.00', pickupLocation_it: 'Stazione sotterranea T1 e T2', pickupLocation_en: 'Underground railway station T1 and T2', details_it: 'Corse dirette per Milano Cadorna (37 min) e Milano Centrale (52 min).', details_en: 'Direct services to Milan Cadorna (37 min) and Milan Central (52 min).' },
      { id: 'mxp-tr-2', type: 'taxi', name_it: 'Taxi Ufficiale', name_en: 'Official Taxi', duration: '45-60 min', frequency: 'Continuo', estimatedCost: '€110.00 (Tariffa fissa)', pickupLocation_it: 'Porta 6 (T1) e Porta 1 (T2)', pickupLocation_en: 'Gate 6 (T1) and Gate 1 (T2)', details_it: 'Tariffa fissa per qualsiasi destinazione a Milano città.', details_en: 'Fixed rate to anywhere in Milan city.' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'lin',
    iata: 'LIN',
    icao: 'LIML',
    name_it: 'Aeroporto di Milano Linate (Enrico Forlanini)',
    name_en: 'Milan Linate Airport',
    city_it: 'Milano',
    city_en: 'Milan',
    country_it: 'Italia',
    country_en: 'Italy',
    countryCode: 'IT',
    officialWebsite: 'https://www.milanolinate-airport.com',
    coordinates: { lat: 45.4451, lng: 9.2767 },
    difficultyRating: 1,
    difficultyLabel_it: 'City Airport Estremamente Rapido (Punteggio 1/5)',
    difficultyLabel_en: 'Extremely Fast City Airport (Score 1/5)',
    averageSecurityWaitMin: 5,
    recommendedArrivalHours: { domestic: 1.5, international: 2 },
    navigationAdvice_it: 'City airport a soli 7km dal centro di Milano. Il 100% delle corsie è dotato di scanner 3D di ultima generazione e la metropolitana M4 porta direttamente in piazza San Babila in 12 minuti.',
    navigationAdvice_en: 'City airport just 7km from central Milan. 100% of security lanes feature next-gen 3D scanners, and Metro M4 line reaches San Babila square in 12 minutes.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Il 100% dei varchi di sicurezza a Linate è equipaggiato con tecnologia TAC 3D EDS-CB.',
      scannersNote_en: '100% of security screening lanes at Linate are equipped with 3D CT EDS-CB technology.',
      liquidsAllowance_it: 'Nessun limite al volume dei contenitori di liquidi. Non è necessario estrarre bottiglie, profumi o creme dal bagaglio.',
      liquidsAllowance_en: 'No restriction on liquid volume. Bottles, perfumes, and creams can stay inside carry-on.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Computer portatili, iPad e dispositivi elettronici restano all\'interno del bagaglio.',
      electronicsNote_en: 'Laptops, iPads, and electronic devices stay inside carry-on luggage.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi in cabina con batterie staccate. Divieto assoluto di volo nei pressi dell\'Idroscalo e Milano città.',
      dronePolicy_en: 'Drones in cabin only with battery terminals taped.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Fino a 100Wh consentiti nel bagaglio a mano.',
      powerbankPolicy_en: 'Up to 100Wh allowed in cabin baggage.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.milanolinate-airport.com/it/guida-per-il-passeggero/sicurezza-e-controlli',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'lin-main', name: 'Terminal Principale', transferInfo_it: 'Terminal unico, compatto e rinnovato su tre livelli.', transferInfo_en: 'Single, compact, newly renovated terminal on three levels.' }
    ],
    airlines: [
      { airlineName: 'ITA Airways', iataCode: 'AZ', terminal: 'Terminal Principale', checkInZone: 'Banchi 01-18' },
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal Principale', checkInZone: 'Banchi 20-25' }
    ],
    amenities: [
      { id: 'lin-pwr', category: 'power_charging', title_it: 'Prese e stazioni wireless in ogni seduta', title_en: 'Power outlets & wireless pads on all seats', location_it: 'Tutti i gate imbarchi A01-A24', location_en: 'All boarding gates A01-A24', details_it: 'Poltrone con porte USB Type-C e spine universali integrate.', details_en: 'Seating with USB-C and universal power sockets.' }
    ],
    venues: [
      { id: 'lin-v1', name: 'Michelangelo Restaurant', category: 'dining', terminal: 'Terminal Principale', location: 'Piano 2F prima dei controlli', hours: '12:00 - 21:30' }
    ],
    transports: [
      { id: 'lin-tr-1', type: 'metro', name_it: 'Metropolitana M4 (Linea Blu per San Babila)', name_en: 'Metro Line M4 (Blue Line to San Babila)', duration: '12 min', frequency: 'Ogni 3-4 minuti', estimatedCost: '€2.20', pickupLocation_it: 'Stazione M4 piano -1 direttamente collegata al terminal', pickupLocation_en: 'Level -1 station connected directly to arrivals', details_it: 'Il collegamento metropolitano più comodo d\'Europa con il pieno centro di Milano.', details_en: 'Direct underground metro straight into central Milan (San Babila).' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇵🇱 POLONIA (POLAND)
  // =========================================================================
  {
    id: 'waw',
    iata: 'WAW',
    icao: 'EPWA',
    name_it: 'Aeroporto di Varsavia Chopin',
    name_en: 'Warsaw Chopin Airport',
    city_it: 'Varsavia',
    city_en: 'Warsaw',
    country_it: 'Polonia',
    country_en: 'Poland',
    countryCode: 'PL',
    officialWebsite: 'https://www.lotnisko-chopina.pl',
    coordinates: { lat: 52.1672, lng: 20.9679 },
    difficultyRating: 2,
    difficultyLabel_it: 'Moderno Hub LOT Polish Airlines (Treno 20 min)',
    difficultyLabel_en: 'Modern LOT Polish Airlines Hub (Train 20 min)',
    averageSecurityWaitMin: 11,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Hub principale di LOT Polish Airlines. Terminal A integrato e moderno con due ali (North e South Pier). Treno SKM (Linee S2 e S3) direttamente collegato alla stazione centrale Warszawa Centralna in 20 minuti.',
    navigationAdvice_en: 'Primary hub for LOT Polish Airlines. Modern integrated Terminal A. Fast SKM suburban trains (S2, S3) reach Warszawa Centralna in 20 minutes.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Rollout di scanner tomografici CT 3D in corso nelle corsie di sicurezza centrali.',
      scannersNote_en: 'Ongoing rollout of 3D CT scanners in central screening checkpoints.',
      liquidsAllowance_it: 'Nelle corsie dotate di scanner 3D è consentito lasciare i liquidi all\'interno del bagaglio a mano.',
      liquidsAllowance_en: 'Liquids can remain inside carry-on luggage on 3D CT lanes.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e tablet restano nella borsa nelle nuove corsie CT.',
      electronicsNote_en: 'Laptops and tablets stay inside bag on CT lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi nel bagaglio a mano con batterie protette.',
      dronePolicy_en: 'Drones permitted in cabin luggage with protected battery terminals.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh consentiti solo a bordo.',
      powerbankPolicy_en: 'Max 100Wh allowed on board.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.lotnisko-chopina.pl/en/security-control.html',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'waw-t-a', name: 'Terminal A', transferInfo_it: 'Tutti i voli Schengen e non-Schengen operano dal Terminal A.', transferInfo_en: 'All flights operate from integrated Terminal A.' }
    ],
    airlines: [
      { airlineName: 'LOT Polish Airlines', iataCode: 'LO', terminal: 'Terminal A', checkInZone: 'Zone A & B' },
      { airlineName: 'Wizz Air', iataCode: 'W4', terminal: 'Terminal A', checkInZone: 'Zona C' },
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal A', checkInZone: 'Zona D' }
    ],
    amenities: [
      { id: 'waw-wifi', category: 'wifi', title_it: 'Chopin Airport Free Wi-Fi', title_en: 'Chopin Airport Free Wi-Fi', location_it: 'Tutto il terminal', location_en: 'Terminal-wide', details_it: 'Wi-Fi gratuito ad alta velocità illimitato.', details_en: 'Unlimited free high-speed Wi-Fi.' }
    ],
    venues: [
      { id: 'waw-v1', name: 'Polskie Smaki Restaurant', category: 'dining', terminal: 'Terminal A', location: 'Partenze Schengen', hours: '05:00 - 22:00' }
    ],
    transports: [
      { id: 'waw-tr-1', type: 'train', name_it: 'Treno SKM S2 / S3 (per Warszawa Centralna)', name_en: 'SKM Train S2 / S3 (to Warszawa Centralna)', duration: '20 min', frequency: 'Ogni 15 minuti', estimatedCost: 'PLN 4.40 (~€1.05)', pickupLocation_it: 'Stazione sotterranea adiacente al Terminal A', pickupLocation_en: 'Underground rail station adjacent to Terminal A', details_it: 'Treno suburbano rapido ed economico direttamente per il centro città.', details_en: 'Fast and cheap commuter train straight into downtown Warsaw.' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'krk',
    iata: 'KRK',
    icao: 'EPKK',
    name_it: 'Aeroporto Internazionale di Cracovia-Balice (Giovanni Paolo II)',
    name_en: 'Kraków John Paul II International Airport',
    city_it: 'Cracovia',
    city_en: 'Krakow',
    country_it: 'Polonia',
    country_en: 'Poland',
    countryCode: 'PL',
    officialWebsite: 'https://krakowairport.pl/en',
    coordinates: { lat: 50.0777, lng: 19.7848 },
    difficultyRating: 2,
    difficultyLabel_it: 'Moderno & Diretto per il Centro Storico (17 min)',
    difficultyLabel_en: 'Modern & Fast to Old Town (17 min train)',
    averageSecurityWaitMin: 12,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Secondo aeroporto più trafficato della Polonia. Terminal passeggeri compatto e moderno con passerella pedonale coperta direttamente collegata alla stazione ferroviaria.',
    navigationAdvice_en: 'Second busiest airport in Poland. Compact, modern terminal with covered footbridge directly to rail platform.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Nuovi scanner CT per il controllo di sicurezza al piano partenze.',
      scannersNote_en: 'Modern CT screening lanes on departures level.',
      liquidsAllowance_it: 'Nelle corsie con scanner CT è possibile lasciare i liquidi nel bagaglio.',
      liquidsAllowance_en: 'On CT lanes liquids can stay inside carry-on luggage.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e tablet restano nella borsa nelle corsie CT.',
      electronicsNote_en: 'Laptops and tablets stay in bag on CT lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni in cabina con batterie protette.',
      dronePolicy_en: 'Drones in cabin with battery contacts taped.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh nel bagaglio a mano.',
      powerbankPolicy_en: 'Max 100Wh in cabin bag.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://krakowairport.pl/en/passenger/security-control',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'krk-main', name: 'Terminal Passeggeri Principale', transferInfo_it: 'Tutti i voli operano dall\'edificio centrale integrato.', transferInfo_en: 'All flights operate from integrated central terminal.' }
    ],
    airlines: [
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal Principale', checkInZone: 'Banchi Check-in 1-18' },
      { airlineName: 'Wizz Air', iataCode: 'W4', terminal: 'Terminal Principale', checkInZone: 'Banchi Check-in 20-30' },
      { airlineName: 'LOT Polish Airlines', iataCode: 'LO', terminal: 'Terminal Principale', checkInZone: 'Banchi Check-in 31-36' }
    ],
    amenities: [
      { id: 'krk-wifi', category: 'wifi', title_it: 'KRK Free WiFi', title_en: 'KRK Free WiFi', location_it: 'Tutto il terminal', location_en: 'Terminal-wide', details_it: 'Wi-Fi gratuito ad alta velocità.', details_en: 'High-speed free Wi-Fi.' }
    ],
    venues: [
      { id: 'krk-v1', name: 'Suit & Tie Restaurant', category: 'dining', terminal: 'Terminal Principale', location: 'Partenze', hours: '05:30 - 22:00' }
    ],
    transports: [
      { id: 'krk-tr-1', type: 'train', name_it: 'Treno Veloce Koleje Małopolskie (SKA1 per Kraków Główny)', name_en: 'Fast Train SKA1 (to Kraków Główny)', duration: '17 min', frequency: 'Ogni 30 minuti', estimatedCost: 'PLN 17 (~€3.90)', pickupLocation_it: 'Stazione ferroviaria sopraelevata collegata da passerella al terminal', pickupLocation_en: 'Overhead train station connected via footbridge', details_it: 'Treno comodo con aria condizionata e Wi-Fi direttamente per la stazione centrale di Cracovia.', details_en: 'Comfortable rail link with AC and Wi-Fi directly to Krakow main station.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇭🇺 UNGHERIA (HUNGARY)
  // =========================================================================
  {
    id: 'bud',
    iata: 'BUD',
    icao: 'LHBP',
    name_it: 'Aeroporto Internazionale di Budapest Ferenc Liszt',
    name_en: 'Budapest Ferenc Liszt International Airport',
    city_it: 'Budapest',
    city_en: 'Budapest',
    country_it: 'Ungheria',
    country_en: 'Hungary',
    countryCode: 'HU',
    officialWebsite: 'https://www.bud.hu',
    coordinates: { lat: 47.4369, lng: 19.2556 },
    difficultyRating: 2,
    difficultyLabel_it: 'Efficace SkyCourt & Bus Espresso 100E',
    difficultyLabel_en: 'Efficient SkyCourt & 100E Express Bus',
    averageSecurityWaitMin: 12,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'I due edifici 2A (voli Schengen) e 2B (voli non-Schengen) sono uniti dalla spettacolare piazza centrale SkyCourt con negozi e ristoranti. Il bus espresso 100E collega l\'aeroporto a Deák Ferenc tér in pieno centro.',
    navigationAdvice_en: 'Terminals 2A (Schengen) and 2B (non-Schengen) connect via the SkyCourt central shopping hall. Express bus 100E links directly to Deák Ferenc tér in central Budapest.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner convenzionali a raggi X. Varchi veloci con corsie family dedicate.',
      scannersNote_en: 'Conventional X-ray scanners. Fast queues with dedicated family lanes.',
      liquidsAllowance_it: 'Regola standard 100ml in busta trasparente da 1 litro.',
      liquidsAllowance_en: 'Standard 100ml rule in 1-litre clear bag.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Dispositivi elettronici da estrarre prima del passaggio.',
      electronicsNote_en: 'Electronics must be removed prior to screening.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni in cabina con batterie protette.',
      dronePolicy_en: 'Drones in cabin with battery contacts taped.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh consentiti solo nel bagaglio a mano.',
      powerbankPolicy_en: 'Max 100Wh allowed in cabin bag only.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.bud.hu/en/passengers/flight_and_travel_info/security_screening',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'bud-t2a', name: 'Terminal 2A (Schengen)', transferInfo_it: 'Voli Schengen e hub centrale SkyCourt.', transferInfo_en: 'Schengen departures and central SkyCourt hall.' },
      { id: 'bud-t2b', name: 'Terminal 2B (Non-Schengen & Wizz Air)', transferInfo_it: 'Voli extra-Schengen e gran parte dei voli Wizz Air.', transferInfo_en: 'Non-Schengen flights and major Wizz Air hub concourse.' }
    ],
    airlines: [
      { airlineName: 'Wizz Air', iataCode: 'W4', terminal: 'Terminal 2B', checkInZone: 'Banchi T2B' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 2B', checkInZone: 'Banchi T2B' },
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal 2A', checkInZone: 'Banchi T2A' }
    ],
    amenities: [
      { id: 'bud-wifi', category: 'wifi', title_it: 'bud:free wifi', title_en: 'bud:free wifi', location_it: 'In tutto l\'aeroporto', location_en: 'Airport-wide', details_it: 'Wi-Fi gratuito illimitato.', details_en: 'Unlimited free Wi-Fi.' }
    ],
    venues: [
      { id: 'bud-v1', name: 'Gundel Restaurant & Bar', category: 'dining', terminal: 'SkyCourt', location: 'Piano superiore', hours: '06:00 - 21:30' }
    ],
    transports: [
      { id: 'bud-tr-1', type: 'bus', name_it: 'Bus Diretto 100E Airport Express (per Deák Ferenc tér)', name_en: 'Direct Bus 100E Airport Express (to Deák Ferenc tér)', duration: '35 min', frequency: 'Ogni 7-10 minuti (h24)', estimatedCost: '2.200 HUF (~€5.50)', pickupLocation_it: 'Corsia bus livello arrivi tra T2A e T2B', pickupLocation_en: 'Bus bay at arrivals between T2A and T2B', details_it: 'Bus no-stop con pagamento contactless a bordo (Budapest Pay&GO) per il cuore della città.', details_en: 'Direct express bus with onboard contactless payment to city centre.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇬🇷 GRECIA (GREECE)
  // =========================================================================
  {
    id: 'ath',
    iata: 'ATH',
    icao: 'LGAV',
    name_it: 'Aeroporto Internazionale di Atene (Eleftherios Venizelos)',
    name_en: 'Athens International Airport (Eleftherios Venizelos)',
    city_it: 'Atene',
    city_en: 'Athens',
    country_it: 'Grecia',
    country_en: 'Greece',
    countryCode: 'GR',
    officialWebsite: 'https://www.aia.gr',
    coordinates: { lat: 37.9364, lng: 23.9445 },
    difficultyRating: 2,
    difficultyLabel_it: 'Moderno & Connesso con Metro Diretta per Piazza Syntagma',
    difficultyLabel_en: 'Modern with Direct Metro to Syntagma Square',
    averageSecurityWaitMin: 12,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Hub principale di Aegean Airlines e Olympic Air. Terminal principale e Satellite collegati da tunnel pedonale sotterraneo con tapis roulant. La Metro Linea 3 (Blu) collega l\'aeroporto a Syntagma e al porto del Pireo.',
    navigationAdvice_en: 'Main hub for Aegean Airlines. Main Terminal and Satellite connected via underground moving walkway tunnel. Metro Line 3 connects to Syntagma and Piraeus port.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner convenzionali con corsie veloci e corsie preferenziali per famiglie.',
      scannersNote_en: 'Standard X-ray screening with fast lanes and family corridors.',
      liquidsAllowance_it: 'Regola 100ml standard in sacchetto trasparente richiudibile di 1 litro.',
      liquidsAllowance_en: 'Standard 100ml rule in 1-litre transparent bag.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Estrarre laptop e tablet per la scansione.',
      electronicsNote_en: 'Remove laptops and tablets for scanning.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni in cabina con batterie protette secondo le norme HCAA greche.',
      dronePolicy_en: 'Drones in cabin with battery contacts protected under Greek HCAA rules.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh nel bagaglio a mano.',
      powerbankPolicy_en: 'Max 100Wh in cabin bag.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.aia.gr/traveler/security-information',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'ath-main', name: 'Terminal Principale & Satellite', transferInfo_it: 'Terminal Principale collegato al Satellite tramite tunnel sotterraneo pedonale.', transferInfo_en: 'Main Terminal connected to Satellite building via underground moving tunnel.' }
    ],
    airlines: [
      { airlineName: 'Aegean Airlines / Olympic Air', iataCode: 'A3/OA', terminal: 'Terminal Principale', checkInZone: 'Banchi Check-in 1-30' },
      { airlineName: 'Sky Express', iataCode: 'GQ', terminal: 'Terminal Principale', checkInZone: 'Banchi Check-in 32-40' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal Principale', checkInZone: 'Banchi Check-in 42-50' }
    ],
    amenities: [
      { id: 'ath-wifi', category: 'wifi', title_it: 'ATH Free Wi-Fi', title_en: 'ATH Free Wi-Fi', location_it: 'In tutto l\'aeroporto', location_en: 'Airport-wide', details_it: 'Wi-Fi gratuito illimitato ad alta velocità.', details_en: 'Unlimited free high-speed Wi-Fi.' }
    ],
    venues: [
      { id: 'ath-v1', name: 'Greek Food & Wine Bar', category: 'dining', terminal: 'Terminal Principale', location: 'Partenze', hours: '06:00 - 22:30' }
    ],
    transports: [
      { id: 'ath-tr-1', type: 'metro', name_it: 'Metro Linea 3 (Blu per Syntagma / Monastiraki / Pireo)', name_en: 'Metro Line 3 (Blue to Syntagma / Monastiraki / Piraeus)', duration: '40 min', frequency: 'Ogni 36 minuti', estimatedCost: '€9.00', pickupLocation_it: 'Stazione sopraelevata fronte uscite partenze/arrivi', pickupLocation_en: 'Overhead station opposite terminal exit', details_it: 'Metropolitana diretta per il centro storico e per il porto d\'imbarco dei traghetti per le isole.', details_en: 'Direct subway into Athens historic center and port of Piraeus for island ferries.' },
      { id: 'ath-tr-2', type: 'bus', name_it: 'Bus Espresso 24h X95 (per Piazza Syntagma)', name_en: '24h Express Bus X95 (to Syntagma Square)', duration: '50-60 min', frequency: 'Ogni 15-20 minuti (h24)', estimatedCost: '€5.50', pickupLocation_it: 'Fermate bus tra le uscite 4 e 5 arrivi', pickupLocation_en: 'Bus rank between exit 4 and 5 at arrivals', details_it: 'Servizio di collegamento economico attivo 24 ore su 24.', details_en: 'Economical link operating 24 hours a day, 7 days a week.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇨🇭 SVIZZERA (SWITZERLAND)
  // =========================================================================
  {
    id: 'zrh',
    iata: 'ZRH',
    icao: 'LSZH',
    name_it: 'Aeroporto di Zurigo (Kloten)',
    name_en: 'Zurich Airport',
    city_it: 'Zurigo',
    city_en: 'Zurich',
    country_it: 'Svizzera',
    country_en: 'Switzerland',
    countryCode: 'CH',
    officialWebsite: 'https://www.flughafen-zuerich.ch',
    coordinates: { lat: 47.4582, lng: 8.5555 },
    difficultyRating: 1,
    difficultyLabel_it: 'Eccellenza Svizzera (Treno per HB in 9 minuti)',
    difficultyLabel_en: 'Swiss Precision & Excellence (Train to HB in 9 min)',
    averageSecurityWaitMin: 6,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Uno degli aeroporti più puntuali ed eleganti al mondo. Hub di Swiss International Air Lines. I cancelli del Dock E (Midfield) sono collegati all\'Airside Center tramite lo Skymetro, un treno sotterraneo a cuscino d\'aria.',
    navigationAdvice_en: 'Ranked among the world\'s top airports for precision. Hub for SWISS. Dock E (Midfield) gates connect to main terminal via the Skymetro underground hover-train.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Varchi di sicurezza ad alta tecnologia con tecnologia 3D CT su più linee.',
      scannersNote_en: 'High-tech screening lanes featuring 3D CT equipment on multiple checkpoints.',
      liquidsAllowance_it: 'Nelle corsie con scanner 3D i liquidi possono rimanere nel bagaglio a mano.',
      liquidsAllowance_en: 'On 3D scanner lanes liquids can stay inside carry-on baggage.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e tablet restano nella borsa nelle corsie abilitate.',
      electronicsNote_en: 'Laptops and tablets stay inside luggage on CT lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni consentiti solo in cabina con batterie protette.',
      dronePolicy_en: 'Drones allowed in cabin only with battery terminals insulated.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh nel bagaglio a mano.',
      powerbankPolicy_en: 'Max 100Wh in cabin luggage.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.flughafen-zuerich.ch/en/passengers/fly/security-and-customs',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'zrh-main', name: 'Airside Center (Dock A, B/D, E)', transferInfo_it: 'Tutti i moli convergono nell\'Airside Center. Dock E collegato dallo Skymetro (2 min).', transferInfo_en: 'All concourses link to Airside Center. Dock E served by Skymetro (2 min).' }
    ],
    airlines: [
      { airlineName: 'SWISS / Edelweiss', iataCode: 'LX/WK', terminal: 'Check-in 1 & 3', checkInZone: 'Hall Check-in 1' },
      { airlineName: 'Lufthansa Group', iataCode: 'LH', terminal: 'Check-in 1', checkInZone: 'Hall Check-in 1' },
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Check-in 2', checkInZone: 'Hall Check-in 2' }
    ],
    amenities: [
      { id: 'zrh-wifi', category: 'wifi', title_it: 'ZurichAirport Wi-Fi 4h Free', title_en: 'ZurichAirport Wi-Fi 4h Free', location_it: 'Tutto l\'aeroporto', location_en: 'Airport-wide', details_it: '4 ore di navigazione gratuita ad altissima velocità.', details_en: '4 hours of complimentary high-speed browsing.' }
    ],
    venues: [
      { id: 'zrh-v1', name: 'Sprüngli Confiserie & Café', category: 'cafe', terminal: 'Airside Center', location: 'Partenze', hours: '06:00 - 22:00' }
    ],
    transports: [
      { id: 'zrh-tr-1', type: 'train', name_it: 'Treni FFS / S-Bahn (S2, S16, S24 per Zürich HB)', name_en: 'SBB Rail / S-Bahn (S2, S16, S24 to Zurich HB)', duration: '9-12 min', frequency: 'Ogni 5-10 minuti', estimatedCost: 'CHF 7.00 (~€7.40)', pickupLocation_it: 'Stazione ferroviaria sotterranea sotto l\'Airport Shopping Center', pickupLocation_en: 'Underground rail station below Airport Shopping Center', details_it: 'Treni continui e rapidissimi direttamente nel cuore di Zurigo.', details_en: 'Ultra-frequent trains directly into central Zurich.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇩🇪 GERMANIA (GERMANY)
  // =========================================================================
  {
    id: 'fra',
    iata: 'FRA',
    icao: 'EDDF',
    name_it: 'Aeroporto di Francoforte sul Meno',
    name_en: 'Frankfurt Airport',
    city_it: 'Francoforte',
    city_en: 'Frankfurt',
    country_it: 'Germania',
    country_en: 'Germany',
    countryCode: 'DE',
    officialWebsite: 'https://www.frankfurt-airport.com',
    coordinates: { lat: 50.0379, lng: 8.5622 },
    difficultyRating: 4,
    difficultyLabel_it: 'Mega-Hub Intercontinentale (Distanze notevoli)',
    difficultyLabel_en: 'Intercontinental Mega-Hub (Substantial distances)',
    averageSecurityWaitMin: 20,
    recommendedArrivalHours: { domestic: 2, international: 3.5 },
    navigationAdvice_it: 'Uno dei più grandi hub del mondo e base di Lufthansa/Star Alliance. Prevedere almeno 45 minuti per le coincidenze tra i gate A e Z o tra i Terminal 1 e 2 (collegati dal treno Skyline). Dispone di una stazione ICE ad alta velocità interna.',
    navigationAdvice_en: 'One of the world\'s largest hubs and main base for Lufthansa/Star Alliance. Allow at least 45 minutes for connections between concourses or between T1 and T2 (linked via free Skyline train). Features an on-site ICE high-speed rail station.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Progressiva installazione di scanner 3D CT nelle corsie di sicurezza del Terminal 1 e 2.',
      scannersNote_en: 'Progressive rollout of 3D CT scanners across screening lanes in Terminal 1 and 2.',
      liquidsAllowance_it: 'Nelle corsie dotate di nuovi scanner tomografici i liquidi rimangono nel bagaglio a mano.',
      liquidsAllowance_en: 'On lanes equipped with new CT scanners, liquids stay inside carry-on luggage.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e apparecchi elettronici rimangono all\'interno della borsa sulle nuove corsie CT.',
      electronicsNote_en: 'Laptops and electronics remain inside bags on new CT lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi solo nel bagaglio a mano con batterie rimosse e protette.',
      dronePolicy_en: 'Drones in cabin only with batteries removed.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh consentiti a bordo nel bagaglio a mano.',
      powerbankPolicy_en: 'Maximum 100Wh allowed in cabin luggage.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.frankfurt-airport.com/en/flights-and-transfer/security-customs.html',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'fra-t1', name: 'Terminal 1', transferInfo_it: 'Hub Lufthansa, Star Alliance e stazioni ferroviarie (Fernbahnhof per ICE e Regionalbahnhof per S-Bahn).', transferInfo_en: 'Lufthansa, Star Alliance hub and railway stations.' },
      { id: 'fra-t2', name: 'Terminal 2', transferInfo_it: 'Oneworld e SkyTeam. Connesso al T1 dal treno automatico gratuito SkyLine e shuttle bus.', transferInfo_en: 'Oneworld and SkyTeam. Linked to T1 via free automated SkyLine train.' }
    ],
    airlines: [
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal 1', checkInZone: 'Hall A, B, C' },
      { airlineName: 'United Airlines', iataCode: 'UA', terminal: 'Terminal 1', checkInZone: 'Hall B' }
    ],
    amenities: [
      { id: 'fra-pwr', category: 'power_charging', title_it: 'Power Station e sedie ergonomiche', title_en: 'Power Stations & Ergonomic Seating', terminal: 'Terminal 1 e 2', location_it: 'Lungo tutti i moli A, B, C, D, E', location_en: 'Throughout concourses A, B, C, D, E', details_it: 'Punti di ricarica con prese Schuko 230V e porte USB.', details_en: 'Power points with 230V Schuko and USB ports.' },
      { id: 'fra-wifi', category: 'wifi', title_it: 'Fraport Free Wi-Fi 24h', title_en: 'Fraport Free Wi-Fi 24h', terminal: 'Tutti i Terminal', location_it: 'Tutte le aree', location_en: 'All areas', details_it: 'Wi-Fi gratuito illimitato.', details_en: 'High-speed free unlimited Wi-Fi.' }
    ],
    venues: [
      { id: 'fra-v1', name: 'Käfer\'s Bistro', category: 'dining', terminal: 'Terminal 1', location: 'Hall B Partenze', hours: '06:00 - 22:00' }
    ],
    transports: [
      { id: 'fra-tr-1', type: 'train', name_it: 'S-Bahn (S8 / S9 per Frankfurt Hbf)', name_en: 'S-Bahn (S8 / S9 to Frankfurt Hbf)', duration: '11-14 min', frequency: 'Ogni 15 minuti', estimatedCost: '€5.80', pickupLocation_it: 'Regionalbahnhof (sotterraneo Terminal 1)', pickupLocation_en: 'Regionalbahnhof (underground Terminal 1)', details_it: 'Treno suburbano rapido e frequente direttamente alla stazione centrale.', details_en: 'Frequent commuter train directly into Frankfurt Central Station.' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'muc',
    iata: 'MUC',
    icao: 'EDDM',
    name_it: 'Aeroporto di Monaco di Baviera (Franz Josef Strauss)',
    name_en: 'Munich Airport',
    city_it: 'Monaco di Baviera',
    city_en: 'Munich',
    country_it: 'Germania',
    country_en: 'Germany',
    countryCode: 'DE',
    officialWebsite: 'https://www.munich-airport.com',
    coordinates: { lat: 48.3537, lng: 11.7860 },
    difficultyRating: 2,
    difficultyLabel_it: '5-Star Skytrax Hub (Puntualità ed Efficienza tedesca)',
    difficultyLabel_en: '5-Star Skytrax Hub (German efficiency & punctuality)',
    averageSecurityWaitMin: 9,
    recommendedArrivalHours: { domestic: 2, international: 3 },
    navigationAdvice_it: 'Considerato tra i migliori aeroporti d\'Europa. Il Terminal 2 e il suo satellite (Lufthansa) sono collegati da un treno sotterraneo velocissimo.',
    navigationAdvice_en: 'Ranked among Europe\'s top airports. Terminal 2 and satellite connect via high-speed automated underground train.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Terminal 2 pesantemente equipaggiato con scanner TC intelligenti.',
      scannersNote_en: 'Terminal 2 extensively fitted with smart CT scanners.',
      liquidsAllowance_it: 'Liquidi e cosmetici possono rimanere nel bagaglio a mano sulle corsie con scanner tomografici.',
      liquidsAllowance_en: 'Liquids and toiletries can remain inside carry-on luggage on CT lanes.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e tablet restano nella borsa.',
      electronicsNote_en: 'Laptops and tablets stay inside bags.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni in cabina con batterie al litio protette.',
      dronePolicy_en: 'Drones in cabin with lithium batteries protected.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh consentiti solo in cabina.',
      powerbankPolicy_en: 'Max 100Wh in cabin only.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.munich-airport.com/security-checks-262106',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'muc-t1', name: 'Terminal 1', transferInfo_it: 'Moduli A, B, C, D, E per compagnie non-Star Alliance.', transferInfo_en: 'Modules A, B, C, D, E for non-Star Alliance airlines.' },
      { id: 'muc-t2', name: 'Terminal 2 & Satellite', transferInfo_it: 'Hub esclusivo Lufthansa e Star Alliance.', transferInfo_en: 'Exclusive Lufthansa & Star Alliance hub.' }
    ],
    airlines: [
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal 2', checkInZone: 'Livello 04' }
    ],
    amenities: [
      { id: 'muc-wifi', category: 'wifi', title_it: 'Telekom Free Wi-Fi', title_en: 'Telekom Free Wi-Fi', location_it: 'Tutto il terminal', location_en: 'Terminal-wide', details_it: 'Wi-Fi gratuito illimitato.', details_en: 'Unlimited free Wi-Fi.' }
    ],
    venues: [
      { id: 'muc-v1', name: 'Airbräu Brauhaus', category: 'dining', terminal: 'MAC', location: 'Tra T1 e T2', hours: '08:00 - 01:00' }
    ],
    transports: [
      { id: 'muc-tr-1', type: 'train', name_it: 'S-Bahn (Linee S1 e S8 per München Hbf)', name_en: 'S-Bahn (Lines S1 and S8 to Munich Hbf)', duration: '40 min', frequency: 'Ogni 10 minuti', estimatedCost: '€13.70', pickupLocation_it: 'Stazione S-Bahn centrale MAC', pickupLocation_en: 'Central MAC S-Bahn station', details_it: 'Due linee alternate per la stazione centrale e Marienplatz.', details_en: 'Two alternating lines reaching central station and Marienplatz.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇪🇸 SPAGNA (SPAIN)
  // =========================================================================
  {
    id: 'mad',
    iata: 'MAD',
    icao: 'LEMD',
    name_it: 'Aeroporto Adolfo Suárez Madrid-Barajas',
    name_en: 'Adolfo Suárez Madrid-Barajas Airport',
    city_it: 'Madrid',
    city_en: 'Madrid',
    country_it: 'Spagna',
    country_en: 'Spain',
    countryCode: 'ES',
    officialWebsite: 'https://www.aena.es/es/adolfo-suarez-madrid-barajas.html',
    coordinates: { lat: 40.4839, lng: -3.5680 },
    difficultyRating: 3,
    difficultyLabel_it: 'Molto Esteso (Architettura spettacolare T4/T4S)',
    difficultyLabel_en: 'Very Expansive (Striking T4/T4S architecture)',
    averageSecurityWaitMin: 12,
    recommendedArrivalHours: { domestic: 2, international: 3 },
    navigationAdvice_it: 'Principale ponte tra Europa e America Latina. T1, T2 e T3 formano un complesso unito, mentre T4 e T4S sono collegati da bus navetta e treno automatico sotterraneo.',
    navigationAdvice_en: 'Major gateway between Europe and Latin America. T1-T3 form one cluster, T4 and T4S linked by automatic train.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Scanner EDSCB con tecnologia 3D attivi in diversi varchi di T4 e T1.',
      scannersNote_en: '3D EDSCB scanners active across select T4 and T1 lanes.',
      liquidsAllowance_it: 'Nelle corsie con nuovi scanner 3D è consentito portare liquidi senza estrazione.',
      liquidsAllowance_en: 'Liquids can stay inside carry-on luggage on 3D lanes.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Nelle corsie 3D i dispositivi elettronici restano all\'interno del bagaglio.',
      electronicsNote_en: 'Electronics stay inside bag on 3D lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi nel bagaglio a mano con batterie protette.',
      dronePolicy_en: 'Drones in cabin with protected battery terminals.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh per passeggero in cabina.',
      powerbankPolicy_en: 'Max 100Wh per passenger in cabin.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.aena.es/es/pasajeros/equipajes-controles/seguridad.html',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'mad-t123', name: 'Terminal 1, 2, 3', transferInfo_it: 'SkyTeam, Air Europa, Ryanair e vettori internazionali.', transferInfo_en: 'SkyTeam, Air Europa, Ryanair.' },
      { id: 'mad-t4', name: 'Terminal 4 & T4S Satellite', transferInfo_it: 'Hub globale Iberia e oneworld (British Airways, American).', transferInfo_en: 'Global Iberia & oneworld hub.' }
    ],
    airlines: [
      { airlineName: 'Iberia', iataCode: 'IB', terminal: 'Terminal 4 & T4S', checkInZone: 'Banchi T4' }
    ],
    amenities: [
      { id: 'mad-wifi', category: 'wifi', title_it: 'AIRPORT FREE WIFI AENA', title_en: 'AIRPORT FREE WIFI AENA', location_it: 'Tutte le aree', location_en: 'All areas', details_it: 'Wi-Fi gratuito illimitato offerto da Aena.', details_en: 'Unlimited free Wi-Fi provided by Aena.' }
    ],
    venues: [
      { id: 'mad-v1', name: 'Jamón & Tapas (Enrique Tomás)', category: 'dining', terminal: 'Terminal 4', location: 'Dopo i controlli', hours: '06:00 - 23:00' }
    ],
    transports: [
      { id: 'mad-tr-1', type: 'metro', name_it: 'Metro Linea 8 (per Nuevos Ministerios)', name_en: 'Metro Line 8 (to Nuevos Ministerios)', duration: '12-15 min', frequency: 'Ogni 5 minuti', estimatedCost: '€4.50-5.00', pickupLocation_it: 'Stazioni metro T1-T2-T3 e T4', pickupLocation_en: 'Metro stations at T1-T2-T3 and T4', details_it: 'Metropolitana rapida direttamente al centro finanziario di Madrid.', details_en: 'Fast subway into Madrid business district.' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'bcn',
    iata: 'BCN',
    icao: 'LEBL',
    name_it: 'Aeroporto Josep Tarradellas Barcellona-El Prat',
    name_en: 'Josep Tarradellas Barcelona-El Prat Airport',
    city_it: 'Barcellona',
    city_en: 'Barcelona',
    country_it: 'Spagna',
    country_en: 'Spain',
    countryCode: 'ES',
    officialWebsite: 'https://www.aena.es/es/josep-tarradellas-barcelona-el-prat.html',
    coordinates: { lat: 41.2974, lng: 2.0833 },
    difficultyRating: 2,
    difficultyLabel_it: 'Ben Organizzato & Ottimi Trasporti (Punteggio 2/5)',
    difficultyLabel_en: 'Well Organized & Great Transit (Score 2/5)',
    averageSecurityWaitMin: 11,
    recommendedArrivalHours: { domestic: 2, international: 3 },
    navigationAdvice_it: 'Il Terminal 1 gestisce i vettori internazionali e Vueling. Il Terminal 2 è dedicato a Ryanair e low-cost. Navetta bus gratuita h24 ogni 5-10 minuti.',
    navigationAdvice_en: 'Terminal 1 serves legacy carriers and Vueling. Terminal 2 serves low-cost. Connected by free 24/7 shuttle.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Scanner 3D attivi in diverse corsie di sicurezza del Terminal 1.',
      scannersNote_en: '3D scanners operational on multiple lanes in Terminal 1.',
      liquidsAllowance_it: 'Sulle corsie 3D i liquidi possono restare all\'interno del bagaglio a mano.',
      liquidsAllowance_en: 'On 3D lanes liquids can remain inside carry-on luggage.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e tablet non devono essere estratti nelle corsie abilitate.',
      electronicsNote_en: 'Laptops and tablets stay inside bags on enabled lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni consentiti a bordo in cabina con batterie protette.',
      dronePolicy_en: 'Drones allowed in cabin with battery terminals insulated.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh per passeggero nel bagaglio a mano.',
      powerbankPolicy_en: 'Maximum 100Wh per passenger in carry-on.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.aena.es/es/pasajeros/equipajes-controles/seguridad.html',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'bcn-t1', name: 'Terminal 1', transferInfo_it: 'Vueling hub, Iberia, Star Alliance, SkyTeam, Emirates.', transferInfo_en: 'Vueling hub, legacy carriers.' },
      { id: 'bcn-t2', name: 'Terminal 2', transferInfo_it: 'Ryanair, EasyJet, Wizz Air.', transferInfo_en: 'Ryanair, EasyJet, Wizz Air.' }
    ],
    airlines: [
      { airlineName: 'Vueling', iataCode: 'VY', terminal: 'Terminal 1', checkInZone: 'Hall centrale T1' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 2B', checkInZone: 'Hall T2B' }
    ],
    amenities: [
      { id: 'bcn-wifi', category: 'wifi', title_it: 'AIRPORT FREE WIFI AENA', title_en: 'AIRPORT FREE WIFI AENA', location_it: 'Tutto il terminal', location_en: 'Terminal-wide', details_it: 'Wi-Fi gratuito illimitato.', details_en: 'Unlimited free Wi-Fi.' }
    ],
    venues: [
      { id: 'bcn-v1', name: 'Tapas by Enrique Tomás', category: 'dining', terminal: 'Terminal 1', location: 'Sky Center T1', hours: '06:00 - 22:30' }
    ],
    transports: [
      { id: 'bcn-tr-1', type: 'bus', name_it: 'Aerobús (A1 per T1 / A2 per T2)', name_en: 'Aerobús (A1 for T1 / A2 for T2)', duration: '25-35 min', frequency: 'Ogni 5-10 minuti', estimatedCost: '€7.25', pickupLocation_it: 'Piazzale bus fronte arrivi T1 e T2', pickupLocation_en: 'Bus terminal outside arrivals T1 and T2', details_it: 'Navetta espresso per Plaça de Catalunya e Plaça d\'Espanya.', details_en: 'Express shuttle bus to Plaça de Catalunya and Plaça d\'Espanya.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇳🇱 PAESI BASSI (NETHERLANDS)
  // =========================================================================
  {
    id: 'ams',
    iata: 'AMS',
    icao: 'EHAM',
    name_it: 'Aeroporto di Amsterdam Schiphol',
    name_en: 'Amsterdam Airport Schiphol',
    city_it: 'Amsterdam',
    city_en: 'Amsterdam',
    country_it: 'Paesi Bassi',
    country_en: 'Netherlands',
    countryCode: 'NL',
    officialWebsite: 'https://www.schiphol.nl',
    coordinates: { lat: 52.3105, lng: 4.7683 },
    difficultyRating: 2,
    difficultyLabel_it: 'Single-Terminal Concept (100% Scanner 3D)',
    difficultyLabel_en: 'Single-Terminal Concept (100% 3D Scanners)',
    averageSecurityWaitMin: 10,
    recommendedArrivalHours: { domestic: 2, international: 3 },
    navigationAdvice_it: 'Tutti i moli (Piers B fino a M) sono sotto un unico tetto. La stazione ferroviaria sotterranea Schiphol Plaza offre treni diretti per Amsterdam Centraal ogni 5 minuti (14 min).',
    navigationAdvice_en: 'Single-roof terminal concept. Railway station beneath Schiphol Plaza with direct trains to Amsterdam Central every 5 min.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Il 100% delle corsie di sicurezza a Schiphol è dotato di scanner tomografici CT 3D all\'avanguardia.',
      scannersNote_en: '100% of security checkpoints at Schiphol feature cutting-edge 3D CT scanners.',
      liquidsAllowance_it: 'I liquidi e i cosmetici possono rimanere all\'interno del bagaglio a mano. Schiphol consiglia comunque di non superare contenitori da 100ml se si viaggia verso aeroporti privi di scanner 3D.',
      liquidsAllowance_en: 'Liquids can stay inside carry-on luggage. Schiphol advises bringing 100ml flacons if transiting through non-CT airports.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Computer portatili, tablet e fotocamere possono rimanere all\'interno del bagaglio.',
      electronicsNote_en: 'Laptops, tablets, and cameras stay inside your bag during screening.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi solo nel bagaglio a mano con batterie protette.',
      dronePolicy_en: 'Drones in cabin only with battery contacts taped.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh consentiti nel bagaglio a mano.',
      powerbankPolicy_en: 'Maximum 100Wh permitted in cabin bag.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.schiphol.nl/en/page/security-rules-liquids-in-hand-baggage/',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'ams-main', name: 'Schiphol Single Terminal (Hall 1, 2, 3)', transferInfo_it: 'Unico immenso edificio diviso in Departure Halls 1, 2 e 3.', transferInfo_en: 'Single mega-terminal divided into Departure Halls 1, 2, and 3.' }
    ],
    airlines: [
      { airlineName: 'KLM Royal Dutch Airlines', iataCode: 'KL', terminal: 'Departure Hall 1 & 2', checkInZone: 'Banchi Hall 1/2' }
    ],
    amenities: [
      { id: 'ams-rijks', category: 'quiet_area', title_it: 'Rijksmuseum Schiphol (Museo gratuito)', title_en: 'Rijksmuseum Schiphol (Free Museum)', terminal: 'Holland Boulevard', location_it: 'Tra i Pier E e F', location_en: 'Between Piers E and F', details_it: 'Esposizione d\'arte con dipinti originali dei Maestri Olandesi ad accesso libero.', details_en: 'Free art annex showcasing Golden Age master paintings.' }
    ],
    venues: [
      { id: 'ams-v1', name: 'Grand Café Het Paleis', category: 'dining', terminal: 'Lounge 1', location: 'Partenze Schengen', hours: '06:00 - 22:00' }
    ],
    transports: [
      { id: 'ams-tr-1', type: 'train', name_it: 'Treno NS Diretto per Amsterdam Centraal', name_en: 'Direct NS Train to Amsterdam Centraal', duration: '14 min', frequency: 'Ogni 4-8 minuti (h24)', estimatedCost: '€4.90', pickupLocation_it: 'Stazione ferroviaria Schiphol Plaza', pickupLocation_en: 'Schiphol Plaza underground station', details_it: 'Servizio ferroviario continuo giorno e notte direttamente per la stazione centrale.', details_en: '24/7 direct railway link to Amsterdam Central Station.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇫🇷 FRANCIA (FRANCE)
  // =========================================================================
  {
    id: 'cdg',
    iata: 'CDG',
    icao: 'LFPG',
    name_it: 'Aeroporto di Parigi Charles de Gaulle',
    name_en: 'Paris Charles de Gaulle Airport',
    city_it: 'Parigi',
    city_en: 'Paris',
    country_it: 'Francia',
    country_en: 'France',
    countryCode: 'FR',
    officialWebsite: 'https://www.parisaeroport.fr/roissy-charles-de-gaulle',
    coordinates: { lat: 49.0097, lng: 2.5479 },
    difficultyRating: 4,
    difficultyLabel_it: 'Complesso e suddiviso (Navetta CDGVAL richiesta)',
    difficultyLabel_en: 'Complex & Fragmented (CDGVAL shuttle required)',
    averageSecurityWaitMin: 20,
    recommendedArrivalHours: { domestic: 2, international: 3.5 },
    navigationAdvice_it: 'Il Terminal 2 è diviso in 7 sub-terminal (2A fino a 2G). Utilizzare il treno automatico gratuito CDGVAL per muoversi tra T1, T2 e T3.',
    navigationAdvice_en: 'Terminal 2 is split into 7 sub-terminals (2A through 2G). Use the free automated train CDGVAL to travel between T1, T2, and T3.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner tradizionali nella maggior parte dei varchi con test pilota di scanner 3D al T1.',
      scannersNote_en: 'Standard X-ray scanners with pilot 3D lanes undergoing evaluation at T1.',
      liquidsAllowance_it: 'Regola classica 100ml: flaconi fino a 100ml in sacchetto trasparente richiudibile di 1 litro.',
      liquidsAllowance_en: 'Standard 100ml rule: max 100ml bottles in a single 1-litre clear plastic bag.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Tutti i laptop e tablet devono essere estratti e posizionati separatamente.',
      electronicsNote_en: 'All laptops and tablets must be placed in separate screening bins.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi esclusivamente nel bagaglio a mano con batterie protette.',
      dronePolicy_en: 'Drones permitted in cabin luggage only with battery terminals covered.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh nel bagaglio a mano. Vietati in stiva.',
      powerbankPolicy_en: 'Max 100Wh in cabin baggage. Forbidden in hold.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.parisaeroport.fr/passagers/passagers-preparer-vol/bagages-surete',
      lastVerifiedDate: '2026-10-16'
    },
    terminals: [
      { id: 'cdg-t1', name: 'Terminal 1', transferInfo_it: 'Design circolare. Star Alliance e compagnie internazionali.', transferInfo_en: 'Circular design. Star Alliance and international carriers.' },
      { id: 'cdg-t2', name: 'Terminal 2', transferInfo_it: 'Hub globale Air France & SkyTeam.', transferInfo_en: 'Air France & SkyTeam main hub.' }
    ],
    airlines: [
      { airlineName: 'Air France', iataCode: 'AF', terminal: 'Terminal 2E / 2F / 2G', checkInZone: 'Hall partenze 2E/2F' }
    ],
    amenities: [
      { id: 'cdg-wifi', category: 'wifi', title_it: 'WIFI-AIRPORT Gratuito Illimitato', title_en: 'WIFI-AIRPORT Free Unlimited', location_it: 'Tutto il terminal', location_en: 'Terminal-wide', details_it: 'Accesso gratuito senza limitazioni.', details_en: 'Free unlimited access.' }
    ],
    venues: [
      { id: 'cdg-v1', name: 'Ladurée Paris', category: 'cafe', terminal: 'Terminal 1 & 2', location: 'Partenze', hours: '06:00 - 22:00' }
    ],
    transports: [
      { id: 'cdg-tr-1', type: 'train', name_it: 'RER B (Treno Suburbano per Parigi)', name_en: 'RER B (Suburban Train to Paris)', duration: '35 min', frequency: 'Ogni 10-15 minuti', estimatedCost: '€11.80', pickupLocation_it: 'Stazione Aeroporto CDG 1 (T3) e CDG 2 (T2)', pickupLocation_en: 'Stations CDG 1 (T3) and CDG 2 (T2)', details_it: 'Arriva a Gare du Nord e Châtelet-Les Halles.', details_en: 'Reaches Gare du Nord and Châtelet-Les Halles.' }
    ],
    lastUpdated: '2026-10-17'
  },
  {
    id: 'ory',
    iata: 'ORY',
    icao: 'LFPO',
    name_it: 'Aeroporto di Parigi Orly',
    name_en: 'Paris Orly Airport',
    city_it: 'Parigi',
    city_en: 'Paris',
    country_it: 'Francia',
    country_en: 'France',
    countryCode: 'FR',
    officialWebsite: 'https://www.parisaeroport.fr/orly',
    coordinates: { lat: 48.7262, lng: 2.3652 },
    difficultyRating: 2,
    difficultyLabel_it: 'Connessione Metro 14 Rapida (25 min dal centro)',
    difficultyLabel_en: 'Fast Metro 14 Connection (25 min from downtown)',
    averageSecurityWaitMin: 14,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'La nuova estensione della linea metropolitana M14 collega Orly direttamente a Châtelet nel cuore di Parigi in soli 25 minuti.',
    navigationAdvice_en: 'Line 14 automated metro extension reaches Châtelet in central Paris in just 25 minutes.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner tradizionali attivi.',
      scannersNote_en: 'Traditional screening equipment.',
      liquidsAllowance_it: 'Regola standard 100ml in busta trasparente da 1 litro.',
      liquidsAllowance_en: 'Standard 100ml rule in 1-litre clear bag.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Portatili e tablet da estrarre.',
      electronicsNote_en: 'Laptops and tablets must be taken out.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi nel bagaglio a mano.',
      dronePolicy_en: 'Drones in cabin.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh per passeggero.',
      powerbankPolicy_en: 'Max 100Wh per passenger.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.parisaeroport.fr/passagers/passagers-preparer-vol/bagages-surete',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'ory-main', name: 'Orly 1, 2, 3, 4', transferInfo_it: 'Settori interconnessi.', transferInfo_en: 'Connected concourses.' }
    ],
    airlines: [
      { airlineName: 'Transavia', iataCode: 'TO', terminal: 'Orly 3 & 4', checkInZone: 'Hall Orly 3' }
    ],
    amenities: [
      { id: 'ory-wifi', category: 'wifi', title_it: 'WIFI-AIRPORT Gratuito', title_en: 'WIFI-AIRPORT Free', location_it: 'Tutto il terminal', location_en: 'Terminal-wide', details_it: 'Connessione illimitata.', details_en: 'Free connection.' }
    ],
    venues: [
      { id: 'ory-v1', name: 'Paul Boulangerie', category: 'cafe', terminal: 'Orly 1-4', location: 'Partenze', hours: '05:30 - 21:30' }
    ],
    transports: [
      { id: 'ory-tr-1', type: 'metro', name_it: 'Metropolitana Linea 14 (per Châtelet)', name_en: 'Metro Line 14 (to Châtelet)', duration: '25 min', frequency: 'Ogni 3-5 minuti', estimatedCost: '€10.30', pickupLocation_it: 'Stazione sotterranea fronte Orly 3', pickupLocation_en: 'Underground station facing Orly 3', details_it: 'Il collegamento più rapido per il centro.', details_en: 'Fastest link to center.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇮🇪 IRLANDA, 🇵🇹 PORTOGALLO, 🇦🇹 AUSTRIA, 🇧🇪 BELGIO, 🇩🇰 DANIMARCA, 🇸🇪 SVEZIA, 🇫🇮 FINLANDIA
  // =========================================================================
  {
    id: 'dub',
    iata: 'DUB',
    icao: 'EIDW',
    name_it: 'Aeroporto di Dublino',
    name_en: 'Dublin Airport',
    city_it: 'Dublino',
    city_en: 'Dublin',
    country_it: 'Irlanda',
    country_en: 'Ireland',
    countryCode: 'IE',
    officialWebsite: 'https://www.dublinairport.com',
    coordinates: { lat: 53.4264, lng: -6.2499 },
    difficultyRating: 3,
    difficultyLabel_it: 'Hub Ryanair & Aer Lingus (US Preclearance)',
    difficultyLabel_en: 'Ryanair & Aer Lingus Hub (US Preclearance)',
    averageSecurityWaitMin: 14,
    recommendedArrivalHours: { domestic: 2, international: 3 },
    navigationAdvice_it: 'Dispone dell\'esclusiva struttura "US Preclearance" al Terminal 2.',
    navigationAdvice_en: 'Features US Preclearance facility in Terminal 2.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Nuovi scanner C3 installati in diverse corsie.',
      scannersNote_en: 'New C3 scanners installed across several lanes.',
      liquidsAllowance_it: 'Sulle corsie con scanner C3 i liquidi possono rimanere nel bagaglio.',
      liquidsAllowance_en: 'Liquids can stay in bag on C3 lanes.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e tablet restano nella borsa sulle corsie abilitate C3.',
      electronicsNote_en: 'Laptops and tablets stay inside bag on C3 lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni in cabina con batterie protette.',
      dronePolicy_en: 'Drones in cabin with protected batteries.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh consentiti solo a bordo.',
      powerbankPolicy_en: 'Max 100Wh allowed on board.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.dublinairport.com/at-the-airport/security',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'dub-t1', name: 'Terminal 1', transferInfo_it: 'Ryanair hub.', transferInfo_en: 'Ryanair hub.' },
      { id: 'dub-t2', name: 'Terminal 2', transferInfo_it: 'Aer Lingus hub & US flights.', transferInfo_en: 'Aer Lingus hub & US flights.' }
    ],
    airlines: [
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 1', checkInZone: 'Area 1-3' }
    ],
    amenities: [
      { id: 'dub-wifi', category: 'wifi', title_it: 'Dublin Airport Free Wi-Fi', title_en: 'Dublin Airport Free Wi-Fi', location_it: 'Tutto il terminal', location_en: 'Terminal-wide', details_it: 'Wi-Fi gratuito illimitato.', details_en: 'Free unlimited Wi-Fi.' }
    ],
    venues: [
      { id: 'dub-v1', name: 'Marqette Food Hall', category: 'dining', terminal: 'Terminal 1', location: 'Partenze', hours: '04:30 - 22:00' }
    ],
    transports: [
      { id: 'dub-tr-1', type: 'bus', name_it: 'Dublin Express (Bus 782 / 784)', name_en: 'Dublin Express (Route 782 / 784)', duration: '20-30 min', frequency: 'Ogni 10-15 minuti', estimatedCost: '€8.00-10.00', pickupLocation_it: 'Pensiline bus T1/T2', pickupLocation_en: 'Bus stops outside T1/T2', details_it: 'Transita attraverso il Dublin Port Tunnel.', details_en: 'Uses Dublin Port Tunnel.' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'lis',
    iata: 'LIS',
    icao: 'LPPT',
    name_it: 'Aeroporto di Lisbona Humberto Delgado',
    name_en: 'Lisbon Humberto Delgado Airport',
    city_it: 'Lisbona',
    city_en: 'Lisbon',
    country_it: 'Portogallo',
    country_en: 'Portugal',
    countryCode: 'PT',
    officialWebsite: 'https://www.ana.pt/en/lis/home',
    coordinates: { lat: 38.7756, lng: -9.1354 },
    difficultyRating: 3,
    difficultyLabel_it: 'Affollato ma con Metro Diretta in Centro',
    difficultyLabel_en: 'Busy with Direct Metro Link to Downtown',
    averageSecurityWaitMin: 18,
    recommendedArrivalHours: { domestic: 2, international: 3 },
    navigationAdvice_it: 'Terminal 1 per compagnie di bandiera. Terminal 2 solo per le partenze dei vettori low-cost.',
    navigationAdvice_en: 'Terminal 1 for flag carriers. Terminal 2 departures-only for low-cost.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner convenzionali a raggi X.',
      scannersNote_en: 'Standard X-ray scanners.',
      liquidsAllowance_it: 'Limite di 100ml a contenitore in sacchetto trasparente.',
      liquidsAllowance_en: '100ml container limit in 1-litre transparent bag.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Portatili e tablet da estrarre.',
      electronicsNote_en: 'Laptops and tablets must be taken out.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni in cabina con batterie staccate.',
      dronePolicy_en: 'Drones in cabin with detached batteries.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh nel bagaglio a mano.',
      powerbankPolicy_en: 'Max 100Wh in cabin luggage.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.ana.pt/en/passenger-guide/what-can-i-carry',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'lis-t1', name: 'Terminal 1', transferInfo_it: 'Tutti gli arrivi e partenze TAP.', transferInfo_en: 'All arrivals and TAP departures.' },
      { id: 'lis-t2', name: 'Terminal 2', transferInfo_it: 'Partenze low-cost (Ryanair, EasyJet).', transferInfo_en: 'Low-cost departures.' }
    ],
    airlines: [
      { airlineName: 'TAP Air Portugal', iataCode: 'TP', terminal: 'Terminal 1', checkInZone: 'Hall centrale T1' }
    ],
    amenities: [
      { id: 'lis-wifi', category: 'wifi', title_it: 'VINCI Airports WiFi', title_en: 'VINCI Airports WiFi', location_it: 'Tutto il terminal', location_en: 'Terminal-wide', details_it: 'Wi-Fi gratuito illimitato.', details_en: 'Free Wi-Fi.' }
    ],
    venues: [
      { id: 'lis-v1', name: 'Pastéis de Nata Confeitaria', category: 'cafe', terminal: 'Terminal 1', location: 'Partenze', hours: '05:00 - 23:00' }
    ],
    transports: [
      { id: 'lis-tr-1', type: 'metro', name_it: 'Metro de Lisboa (Linha Vermelha)', name_en: 'Lisbon Metro (Red Line)', duration: '20 min', frequency: 'Ogni 6-9 minuti', estimatedCost: '€1.80', pickupLocation_it: 'Stazione Aeroporto sotterranea T1', pickupLocation_en: 'Airport metro station underground T1', details_it: 'Connessione comoda direttamente alla rete metropolitana.', details_en: 'Direct subway into city.' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'vie',
    iata: 'VIE',
    icao: 'LOWW',
    name_it: 'Aeroporto Internazionale di Vienna (Schwechat)',
    name_en: 'Vienna International Airport',
    city_it: 'Vienna',
    city_en: 'Vienna',
    country_it: 'Austria',
    country_en: 'Austria',
    countryCode: 'AT',
    officialWebsite: 'https://www.viennaairport.com',
    coordinates: { lat: 48.1103, lng: 16.5697 },
    difficultyRating: 2,
    difficultyLabel_it: 'Efficiente & Connessione CAT da 16 minuti',
    difficultyLabel_en: 'Efficient & 16-Minute CAT Express Train',
    averageSecurityWaitMin: 8,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Base di Austrian Airlines. Il City Airport Train (CAT) porta direttamente alla stazione di Wien Mitte in soli 16 minuti.',
    navigationAdvice_en: 'Austrian Airlines hub. City Airport Train (CAT) reaches Wien Mitte in 16 minutes.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Scanner tomografici 3D installati nelle corsie del Terminal 3.',
      scannersNote_en: '3D CT scanners operational in Terminal 3.',
      liquidsAllowance_it: 'Nelle corsie con scanner 3D è possibile lasciare i liquidi nel bagaglio.',
      liquidsAllowance_en: 'Liquids can stay in bag on 3D CT lanes.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e tablet rimangono nel bagaglio nelle corsie 3D.',
      electronicsNote_en: 'Laptops and tablets stay inside luggage on 3D lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni in cabina con batterie protette.',
      dronePolicy_en: 'Drones in cabin with battery contacts taped.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh nel bagaglio a mano.',
      powerbankPolicy_en: 'Max 100Wh in carry-on.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.viennaairport.com/passagiere/flughafen/sicherheitskontrolle',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'vie-t3', name: 'Terminal 3', transferInfo_it: 'Austrian Airlines & Star Alliance hub.', transferInfo_en: 'Austrian Airlines & Star Alliance hub.' }
    ],
    airlines: [
      { airlineName: 'Austrian Airlines', iataCode: 'OS', terminal: 'Terminal 3', checkInZone: 'Hall T3' }
    ],
    amenities: [
      { id: 'vie-wifi', category: 'wifi', title_it: 'Flughafen Wien Freies WLAN', title_en: 'Vienna Airport Free WLAN', location_it: 'Tutto l\'aeroporto', location_en: 'Airport-wide', details_it: 'Wi-Fi gratuito illimitato.', details_en: 'Unlimited free Wi-Fi.' }
    ],
    venues: [
      { id: 'vie-v1', name: 'Café Sacher Wien', category: 'cafe', terminal: 'Terminal 3', location: 'Partenze Gates F', hours: '06:00 - 21:00' }
    ],
    transports: [
      { id: 'vie-tr-1', type: 'train', name_it: 'City Airport Train (CAT - Non-stop)', name_en: 'City Airport Train (CAT - Non-stop)', duration: '16 min', frequency: 'Ogni 30 minuti', estimatedCost: '€14.90', pickupLocation_it: 'Stazione sotterranea', pickupLocation_en: 'Underground station', details_it: 'Treno espresso no-stop direttamente per Wien Mitte.', details_en: 'Non-stop express to Wien Mitte.' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'cph',
    iata: 'CPH',
    icao: 'EKCH',
    name_it: 'Aeroporto di Copenaghen-Kastrup',
    name_en: 'Copenhagen Airport (Kastrup)',
    city_it: 'Copenaghen',
    city_en: 'Copenhagen',
    country_it: 'Danimarca',
    country_en: 'Denmark',
    countryCode: 'DK',
    officialWebsite: 'https://www.cph.dk',
    coordinates: { lat: 55.6180, lng: 12.6508 },
    difficultyRating: 1,
    difficultyLabel_it: 'Massima Efficienza Scandinava (Metro 13 min)',
    difficultyLabel_en: 'Peak Scandinavian Efficiency (Metro 13 min)',
    averageSecurityWaitMin: 6,
    recommendedArrivalHours: { domestic: 1.5, international: 2.5 },
    navigationAdvice_it: 'La metropolitana M2 parte dall\'interno del Terminal 3 e arriva a Nørreport nel centro in soli 13 minuti.',
    navigationAdvice_en: 'Metro M2 departs from inside Terminal 3 directly to central Nørreport in 13 minutes.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Presenza di scanner 3D CT nelle corsie di sicurezza centrali.',
      scannersNote_en: '3D CT scanners operating in central checkpoints.',
      liquidsAllowance_it: 'Nelle corsie con tecnologia 3D i liquidi possono rimanere nel bagaglio a mano.',
      liquidsAllowance_en: 'Liquids can stay inside carry-on luggage on 3D lanes.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e tablet restano nella borsa nelle corsie CT.',
      electronicsNote_en: 'Laptops and tablets stay inside bag on CT lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni in cabina con batterie protette.',
      dronePolicy_en: 'Drones in cabin with battery contacts taped.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh consentiti solo a bordo.',
      powerbankPolicy_en: 'Max 100Wh in cabin only.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.cph.dk/en/practical/security',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'cph-main', name: 'Terminal 2 & 3', transferInfo_it: 'Complesso pedonale continuo.', transferInfo_en: 'Seamless walkable passenger hall.' }
    ],
    airlines: [
      { airlineName: 'SAS Scandinavian Airlines', iataCode: 'SK', terminal: 'Terminal 3', checkInZone: 'Hall T3' }
    ],
    amenities: [
      { id: 'cph-wifi', category: 'wifi', title_it: 'CPH Free Wi-Fi', title_en: 'CPH Free Wi-Fi', location_it: 'In tutto l\'aeroporto', location_en: 'Airport-wide', details_it: 'Wi-Fi gratuito illimitato.', details_en: 'Unlimited free Wi-Fi.' }
    ],
    venues: [
      { id: 'cph-v1', name: 'Joe & The Juice', category: 'cafe', terminal: 'Terminal 3', location: 'Partenze', hours: '05:00 - 22:00' }
    ],
    transports: [
      { id: 'cph-tr-1', type: 'metro', name_it: 'Metropolitana M2 (diretta per Nørreport)', name_en: 'Metro Line M2 (direct to Nørreport)', duration: '13 min', frequency: 'Ogni 4-6 minuti (h24)', estimatedCost: 'DKK 36 (~€4.80)', pickupLocation_it: 'Stazione interna Terminal 3', pickupLocation_en: 'Indoor station at Terminal 3', details_it: 'Metropolitana automatica 24/7 per il centro.', details_en: '24/7 automated metro straight downtown.' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'arn',
    iata: 'ARN',
    icao: 'ESSA',
    name_it: 'Aeroporto di Stoccolma-Arlanda',
    name_en: 'Stockholm Arlanda Airport',
    city_it: 'Stoccolma',
    city_en: 'Stockholm',
    country_it: 'Svezia',
    country_en: 'Sweden',
    countryCode: 'SE',
    officialWebsite: 'https://www.swedavia.com/arlanda',
    coordinates: { lat: 59.6498, lng: 17.9238 },
    difficultyRating: 2,
    difficultyLabel_it: 'Nuovo Varco di Sicurezza 3D (Arlanda Express 18 min)',
    difficultyLabel_en: 'New 3D Security Checkpoint (Arlanda Express 18 min)',
    averageSecurityWaitMin: 9,
    recommendedArrivalHours: { domestic: 1.5, international: 2.5 },
    navigationAdvice_it: 'Nuova area di sicurezza centralizzata al Terminal 5 con scanner 3D all\'avanguardia. Treno Arlanda Express a 200 km/h per Stoccolma Centrale in 18 minuti.',
    navigationAdvice_en: 'Central security area in T5 with 3D scanners. Arlanda Express connects to Stockholm Central in 18 min.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Terminal 5 dotato di scanner 3D CT di ultima generazione.',
      scannersNote_en: 'Terminal 5 features modern 3D CT scanners.',
      liquidsAllowance_it: 'Al nuovo varco del Terminal 5 i liquidi possono rimanere all\'interno del bagaglio a mano.',
      liquidsAllowance_en: 'Liquids stay inside carry-on luggage at new T5 checkpoint.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Computer e dispositivi elettronici restano nella borsa.',
      electronicsNote_en: 'Laptops and electronics stay inside your bag.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni in cabina con batterie protette.',
      dronePolicy_en: 'Drones in cabin with protected battery terminals.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh consentiti a bordo.',
      powerbankPolicy_en: 'Max 100Wh allowed on board.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.swedavia.com/arlanda/security-control/',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'arn-t5', name: 'Terminal 5', transferInfo_it: 'Hub principale internazionale e SAS.', transferInfo_en: 'Main international hub.' }
    ],
    airlines: [
      { airlineName: 'SAS Scandinavian Airlines', iataCode: 'SK', terminal: 'Terminal 5', checkInZone: 'Hall T5' }
    ],
    amenities: [
      { id: 'arn-wifi', category: 'wifi', title_it: 'Airport-Guest Wi-Fi', title_en: 'Airport-Guest Wi-Fi', location_it: 'Tutto il terminal', location_en: 'Terminal-wide', details_it: 'Wi-Fi gratuito per 3 ore.', details_en: 'Free Wi-Fi for 3 hours.' }
    ],
    venues: [
      { id: 'arn-v1', name: 'Nordic Light Bakery', category: 'cafe', terminal: 'Terminal 5', location: 'Partenze', hours: '05:00 - 22:00' }
    ],
    transports: [
      { id: 'arn-tr-1', type: 'train', name_it: 'Arlanda Express (Treno Alta Velocità)', name_en: 'Arlanda Express (High-Speed Rail)', duration: '18 min', frequency: 'Ogni 10-15 minuti', estimatedCost: 'SEK 320 (~€28.00)', pickupLocation_it: 'Stazioni sotterranee Arlanda Södra e Norra', pickupLocation_en: 'Underground stations Arlanda South & North', details_it: 'Treno veloce a 200 km/h no-stop per Stoccolma Centrale.', details_en: 'Fast 200 km/h non-stop train to Stockholm Central.' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'hel',
    iata: 'HEL',
    icao: 'EFHK',
    name_it: 'Aeroporto di Helsinki-Vantaa',
    name_en: 'Helsinki Airport (Vantaa)',
    city_it: 'Helsinki',
    city_en: 'Helsinki',
    country_it: 'Finlandia',
    country_en: 'Finland',
    countryCode: 'FI',
    officialWebsite: 'https://www.finavia.fi/en/airports/helsinki-airport',
    coordinates: { lat: 60.3172, lng: 24.9633 },
    difficultyRating: 1,
    difficultyLabel_it: '100% Scanner 3D & Design Nordico (Punteggio 1/5)',
    difficultyLabel_en: '100% 3D Scanners & Nordic Design (Score 1/5)',
    averageSecurityWaitMin: 5,
    recommendedArrivalHours: { domestic: 1.5, international: 2 },
    navigationAdvice_it: 'Terminal unico con il 100% di scanner 3D di ultima generazione.',
    navigationAdvice_en: 'Single unified terminal with 100% 3D scanners.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Tutte le corsie a Helsinki sono dotate di scanner 3D CT.',
      scannersNote_en: 'All screening lanes feature 3D CT scanners.',
      liquidsAllowance_it: 'I liquidi possono rimanere all\'interno del bagaglio a mano senza estrarli.',
      liquidsAllowance_en: 'Liquids can stay inside carry-on luggage.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Computer e dispositivi elettronici restano nella borsa.',
      electronicsNote_en: 'Laptops and electronics stay inside your bag.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi nel bagaglio a mano.',
      dronePolicy_en: 'Drones permitted in cabin luggage.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh consentiti solo in cabina.',
      powerbankPolicy_en: 'Max 100Wh allowed in cabin only.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.finavia.fi/en/airports/helsinki-airport/before-flight/security-control',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'hel-main', name: 'Terminal Unificato Helsinki', transferInfo_it: 'Tutti i voli operano dall\'unico terminal.', transferInfo_en: 'All flights operate from unified terminal.' }
    ],
    airlines: [
      { airlineName: 'Finnair', iataCode: 'AY', terminal: 'Terminal Unificato', checkInZone: 'Hall principale' }
    ],
    amenities: [
      { id: 'hel-wifi', category: 'wifi', title_it: 'Helsinki Airport Free Wi-Fi 100Mbps', title_en: 'Helsinki Airport Free Wi-Fi 100Mbps', location_it: 'Tutto il terminal', location_en: 'Airport-wide', details_it: 'Wi-Fi gratuito a 100Mbps.', details_en: 'Free 100Mbps Wi-Fi.' }
    ],
    venues: [
      { id: 'hel-v1', name: 'Nordic Kitchen', category: 'dining', terminal: 'Terminal Unificato', location: 'Gate 26', hours: '06:00 - 22:00' }
    ],
    transports: [
      { id: 'hel-tr-1', type: 'train', name_it: 'Ring Rail Line (Treni I e P per Helsinki Centrale)', name_en: 'Ring Rail Line (I and P Trains to Central)', duration: '28 min', frequency: 'Ogni 10 minuti', estimatedCost: '€4.10', pickupLocation_it: 'Stazione sotterranea interna', pickupLocation_en: 'Underground station inside', details_it: 'Treno diretto per la stazione centrale.', details_en: 'Direct rail link to central station.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇬🇧 REGNO UNITO, 🇺🇸 STATI UNITI, 🇯🇵 GIAPPONE
  // =========================================================================
  {
    id: 'lhr',
    iata: 'LHR',
    icao: 'EGLL',
    name_it: 'Aeroporto di Londra Heathrow',
    name_en: 'London Heathrow Airport',
    city_it: 'Londra',
    city_en: 'London',
    country_it: 'Regno Unito',
    country_en: 'United Kingdom',
    countryCode: 'GB',
    officialWebsite: 'https://www.heathrow.com',
    coordinates: { lat: 51.4700, lng: -0.4543 },
    difficultyRating: 4,
    difficultyLabel_it: 'Molto Grande & Dispersivo (Prevedere anticipo)',
    difficultyLabel_en: 'Very Large & Sprawling (Allow plenty of time)',
    averageSecurityWaitMin: 22,
    recommendedArrivalHours: { domestic: 2, international: 3.5 },
    navigationAdvice_it: 'Aeroporto vastissimo. Calcolare fino a 20-25 minuti a piedi per raggiungere i gate satellitari del Terminal 5 e Terminal 2.',
    navigationAdvice_en: 'Sprawling mega-hub. Allow up to 20-25 minutes walking to reach satellite gates.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Reintrodotta temporaneamente la regola dei 100ml dal Dipartimento dei Trasporti britannico.',
      scannersNote_en: 'UK Department for Transport temporarily reinstated 100ml limit across UK airports.',
      liquidsAllowance_it: 'I liquidi devono essere in flaconi da massimo 100ml inseriti in un singolo sacchetto trasparente di 20x20 cm.',
      liquidsAllowance_en: 'Liquids max 100ml in one clear resealable bag.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Laptop e grandi tablet devono essere estratti e scansionati separatamente.',
      electronicsNote_en: 'Laptops and large tablets must be taken out.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi solo in cabina.',
      dronePolicy_en: 'Drones in cabin only.',
      droneUnverified: true,
      droneNote_it: 'La sicurezza a T5 effettua controlli individuali sui droni DJI.',
      droneNote_en: 'Security at T5 frequently inspects DJI drones individually.',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh in cabina.',
      powerbankPolicy_en: 'Max 100Wh in cabin.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.heathrow.com/at-the-airport/airport-security',
      lastVerifiedDate: '2026-10-17'
    },
    terminals: [
      { id: 'lhr-t2', name: 'Terminal 2', transferInfo_it: 'Star Alliance Hub.', transferInfo_en: 'Star Alliance Hub.' },
      { id: 'lhr-t5', name: 'Terminal 5', transferInfo_it: 'Hub esclusivo British Airways.', transferInfo_en: 'British Airways hub.' }
    ],
    airlines: [
      { airlineName: 'British Airways', iataCode: 'BA', terminal: 'Terminal 5', checkInZone: 'Zone A-H' }
    ],
    amenities: [
      { id: 'lhr-wifi', category: 'wifi', title_it: 'Heathrow Free Wi-Fi', title_en: 'Heathrow Free Wi-Fi', location_it: 'Tutti i terminal', location_en: 'All terminals', details_it: 'Wi-Fi gratuito illimitato.', details_en: 'Free unlimited Wi-Fi.' }
    ],
    venues: [
      { id: 'lhr-v1', name: 'Gordon Ramsay Plane Food', category: 'dining', terminal: 'Terminal 5', location: 'Airside 1st floor', hours: '05:30 - 21:30' }
    ],
    transports: [
      { id: 'lhr-tr-1', type: 'train', name_it: 'Heathrow Express (per Paddington)', name_en: 'Heathrow Express (to Paddington)', duration: '15 min', frequency: 'Ogni 15 minuti', estimatedCost: '£25.00', pickupLocation_it: 'Heathrow Central e T5', pickupLocation_en: 'Heathrow Central and T5', details_it: 'Il modo più rapido per il centro.', details_en: 'Fastest connection to London.' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'jfk',
    iata: 'JFK',
    icao: 'KJFK',
    name_it: 'Aeroporto Internazionale John F. Kennedy',
    name_en: 'John F. Kennedy International Airport',
    city_it: 'New York',
    city_en: 'New York',
    country_it: 'Stati Uniti',
    country_en: 'United States',
    countryCode: 'US',
    officialWebsite: 'https://www.jfkairport.com',
    coordinates: { lat: 40.6413, lng: -73.7781 },
    difficultyRating: 4,
    difficultyLabel_it: 'Intenso & Lavori in corso (Cantiere New JFK)',
    difficultyLabel_en: 'Congested & Active Construction (New JFK Project)',
    averageSecurityWaitMin: 25,
    recommendedArrivalHours: { domestic: 2.5, international: 3.5 },
    navigationAdvice_it: 'Terminal non comunicanti a piedi: spostamento solo tramite AirTrain JFK.',
    navigationAdvice_en: 'Terminals are not connected on foot: move exclusively via AirTrain.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'TSA applica la rigorosa normativa federale TSA 3-1-1 per tutti i passeggeri standard.',
      scannersNote_en: 'TSA strictly enforces federal TSA 3-1-1 liquids rule for standard travelers.',
      liquidsAllowance_it: 'Regola TSA 3-1-1: contenitori da massimo 3.4 once (100ml) in un sacchetto di plastica trasparente.',
      liquidsAllowance_en: 'TSA 3-1-1 Rule: containers max 3.4 oz (100ml) packed in 1 clear quart-size bag.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Laptop ed elettronica di grandi dimensioni devono essere estratti.',
      electronicsNote_en: 'Laptops and electronics must be placed in a dedicated bin.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'La FAA consente droni solo in cabina con batterie al litio staccate.',
      dronePolicy_en: 'FAA allows drones in cabin only with lithium batteries disconnected.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh per batteria in cabina.',
      powerbankPolicy_en: 'FAA limit: max 100Wh per spare battery in cabin.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.tsa.gov/travel/security-screening',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'jfk-t4', name: 'Terminal 4', transferInfo_it: 'Delta hub ed Emirates.', transferInfo_en: 'Delta hub and Emirates.' }
    ],
    airlines: [
      { airlineName: 'Delta Air Lines', iataCode: 'DL', terminal: 'Terminal 4', checkInZone: 'Hall principale T4' }
    ],
    amenities: [
      { id: 'jfk-wifi', category: 'wifi', title_it: '_Free JFK WiFi', title_en: '_Free JFK WiFi', location_it: 'Tutti i terminal', location_en: 'All terminals', details_it: 'Accesso gratuito illimitato.', details_en: 'Unlimited free access.' }
    ],
    venues: [
      { id: 'jfk-v1', name: 'Shake Shack', category: 'grab_and_go', terminal: 'Terminal 4', location: 'Gate B23 & B37', hours: '06:00 - 23:00' }
    ],
    transports: [
      { id: 'jfk-tr-1', type: 'train', name_it: 'AirTrain JFK + LIRR (per Manhattan)', name_en: 'AirTrain JFK + LIRR (to Manhattan)', duration: '35 min', frequency: 'Ogni 10 minuti', estimatedCost: '$8.50 + $7.00-$10.75', pickupLocation_it: 'Stazioni AirTrain in ogni terminal', pickupLocation_en: 'AirTrain stations at each terminal', details_it: 'Il collegamento più rapido per Manhattan (Penn Station o Grand Central).', details_en: 'The fastest link into Manhattan (Penn Station or Grand Central).' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'hnd',
    iata: 'HND',
    icao: 'RJTT',
    name_it: 'Aeroporto Internazionale di Tokyo Haneda',
    name_en: 'Tokyo Haneda International Airport',
    city_it: 'Tokyo',
    city_en: 'Tokyo',
    country_it: 'Giappone',
    country_en: 'Japan',
    countryCode: 'JP',
    officialWebsite: 'https://tokyo-haneda.com',
    coordinates: { lat: 35.5494, lng: 139.7798 },
    difficultyRating: 1,
    difficultyLabel_it: 'Estremamente Efficiente & Puntuale (Punteggio 1/5)',
    difficultyLabel_en: 'Extremely Efficient & Punctual (Score 1/5)',
    averageSecurityWaitMin: 6,
    recommendedArrivalHours: { domestic: 1.5, international: 2.5 },
    navigationAdvice_it: 'Riconosciuto costantemente come l\'aeroporto più pulito e meglio organizzato al mondo.',
    navigationAdvice_en: 'Consistently voted the cleanest and most efficient airport in the world.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Sistemi di controllo intelligenti avanzati (Smart Security Lanes).',
      scannersNote_en: 'Advanced Smart Security Lanes with automated tray return.',
      liquidsAllowance_it: 'Voli Internazionali (T3/T2): regola standard 100ml. Voli Nazionali: liquidi ammessi con scanner dedicato.',
      liquidsAllowance_en: 'International: standard 100ml. Domestic: bottles allowed via optical analyzer.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e tablet possono rimanere nel bagaglio nelle corsie Smart.',
      electronicsNote_en: 'Laptops can stay in bag on indicated Smart Security lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi nel bagaglio a mano.',
      dronePolicy_en: 'Drones in cabin only.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh (fino a 160Wh per max 2 unità). Vietate in stiva.',
      powerbankPolicy_en: 'Max 100Wh. Strictly forbidden in hold.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://tokyo-haneda.com/en/passenger_guide/security/index.html',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'hnd-t3', name: 'Terminal 3', transferInfo_it: 'Terminal per tutti i vettori internazionali stranieri.', transferInfo_en: 'Main terminal for all foreign international carriers.' }
    ],
    airlines: [
      { airlineName: 'All Nippon Airways (ANA)', iataCode: 'NH', terminal: 'Terminal 2', checkInZone: '2F Partenze' },
      { airlineName: 'Japan Airlines (JAL)', iataCode: 'JL', terminal: 'Terminal 1 & 3', checkInZone: 'Partenze' }
    ],
    amenities: [
      { id: 'hnd-wifi', category: 'wifi', title_it: 'Free WiFi Haneda', title_en: 'Free WiFi Haneda', location_it: 'Tutti i Terminal', location_en: 'All areas', details_it: 'Accesso gratuito illimitato.', details_en: 'Unlimited free access.' }
    ],
    venues: [
      { id: 'hnd-v1', name: 'Edo Ko-ji (Edo Market Street)', category: 'dining', terminal: 'Terminal 3', location: 'Piano 4F prima dei controlli', hours: '07:00 - 23:00' }
    ],
    transports: [
      { id: 'hnd-tr-1', type: 'train', name_it: 'Tokyo Monorail', name_en: 'Tokyo Monorail', duration: '13 min', frequency: 'Ogni 4 minuti', estimatedCost: '¥500 (~€3.10)', pickupLocation_it: 'Stazione Monorail interna in ciascun terminal', pickupLocation_en: 'Monorail station inside each terminal', details_it: 'Collega Haneda con Hamamatsucho e la Yamanote Line.', details_en: 'Connects to Hamamatsucho and the Yamanote loop line.' }
    ],
    lastUpdated: '2026-10-18'
  }
];

export function getAirportById(id: string): Airport | undefined {
  return airportsData.find((a) => a.id.toLowerCase() === id.toLowerCase() || a.iata.toLowerCase() === id.toLowerCase());
}

export function searchAirports(query: string): Airport[] {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase().trim();
  return airportsData.filter((a) => {
    return (
      a.iata.toLowerCase().includes(q) ||
      a.icao.toLowerCase().includes(q) ||
      a.name_it.toLowerCase().includes(q) ||
      a.name_en.toLowerCase().includes(q) ||
      a.city_it.toLowerCase().includes(q) ||
      a.city_en.toLowerCase().includes(q) ||
      a.country_it.toLowerCase().includes(q) ||
      a.country_en.toLowerCase().includes(q)
    );
  });
}
