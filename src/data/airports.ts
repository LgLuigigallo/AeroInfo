import { Airport } from '@/types/airport';

export const airportsData: Airport[] = [
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
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Terminal 3', checkInZone: 'Banchi 430-450' },
      { airlineName: 'Qatar Airways', iataCode: 'QR', terminal: 'Terminal 3', checkInZone: 'Banchi 460-480' }
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
      { id: 'fco-v4', name: 'Aelia Duty Free', category: 'duty_free', terminal: 'Terminal 1 & 3', location: 'Subito dopo i filtri di sicurezza', hours: '05:30 - 23:00' },
      { id: 'fco-v5', name: 'Farmacia San Raffaele', category: 'pharmacy', terminal: 'Terminal 1', location: 'Partenze T1 prima dei controlli', hours: '06:30 - 21:30' }
    ],
    transports: [
      { id: 'fco-tr-1', type: 'train', name_it: 'Leonardo Express (Non-stop)', name_en: 'Leonardo Express (Non-stop)', duration: '32 min', frequency: 'Ogni 15 minuti', estimatedCost: '€14.00', pickupLocation_it: 'Stazione ferroviaria interna dell\'aeroporto (fronte T3)', pickupLocation_en: 'Internal airport train station (in front of T3)', details_it: 'Collegamento ferroviario diretto senza fermate fino a Roma Termini.', details_en: 'Direct non-stop train link straight to Rome Termini central station.' },
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
      { id: 'mxp-wifi', category: 'wifi', title_it: 'Malpensa Free Wi-Fi', title_en: 'Malpensa Free Wi-Fi', terminal: 'Terminal 1 & 2', location_it: 'Tutte le aree', location_en: 'All areas', details_it: 'Navigazione gratuita fino a 512Kbps (senza login) oppure ad alta velocità con registrazione gratuita.', details_en: 'Free browsing up to 512Kbps (no login) or high speed upon free sign-up.' }
    ],
    venues: [
      { id: 'mxp-v1', name: 'Ferrari Spazio Bollicine', category: 'dining', terminal: 'Terminal 1', location: 'Piazza del Lusso', hours: '06:00 - 22:00' },
      { id: 'mxp-v3', name: 'Dufry Duty Free', category: 'duty_free', terminal: 'Terminal 1 & 2', location: 'Dopo i controlli', hours: '05:30 - 22:30' }
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
      dronePolicy_en: 'Drones in cabin only with battery terminals taped. Strict no-fly zone around Idroscalo and Milan.',
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
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal Principale', checkInZone: 'Banchi 20-25' },
      { airlineName: 'Air France / KLM', iataCode: 'AF/KL', terminal: 'Terminal Principale', checkInZone: 'Banchi 26-30' },
      { airlineName: 'British Airways', iataCode: 'BA', terminal: 'Terminal Principale', checkInZone: 'Banchi 32-35' }
    ],
    amenities: [
      { id: 'lin-pwr', category: 'power_charging', title_it: 'Prese e stazioni wireless in ogni seduta', title_en: 'Power outlets & wireless pads on all seats', location_it: 'Tutti i gate imbarchi A01-A24', location_en: 'All boarding gates A01-A24', details_it: 'Poltrone con porte USB Type-C e spine universali integrate.', details_en: 'Seating with USB-C and universal power sockets.' },
      { id: 'lin-wifi', category: 'wifi', title_it: 'Linate Free Wi-Fi HD', title_en: 'Linate Free Wi-Fi HD', location_it: 'Tutto il terminal', location_en: 'Entire terminal', details_it: 'Connessione ad alta velocità gratuita senza limiti di tempo.', details_en: 'High-speed free unlimited Wi-Fi.' }
    ],
    venues: [
      { id: 'lin-v1', name: 'Michelangelo Restaurant', category: 'dining', terminal: 'Terminal Principale', location: 'Piano 2F prima dei controlli', hours: '12:00 - 21:30' },
      { id: 'lin-v2', name: 'Aelia Duty Free', category: 'duty_free', terminal: 'Terminal Principale', location: 'Dopo i controlli', hours: '05:30 - 21:30' }
    ],
    transports: [
      { id: 'lin-tr-1', type: 'metro', name_it: 'Metropolitana M4 (Linea Blu)', name_en: 'Metro Line M4 (Blue Line)', duration: '12 min per San Babila', frequency: 'Ogni 3-4 minuti', estimatedCost: '€2.20', pickupLocation_it: 'Stazione M4 piano -1 direttamente collegata al terminal', pickupLocation_en: 'Level -1 station connected directly to arrivals', details_it: 'Il collegamento metropolitano più comodo d\'Europa con il pieno centro di Milano.', details_en: 'Direct underground metro straight into central Milan (San Babila).' },
      { id: 'lin-tr-2', type: 'taxi', name_it: 'Taxi Urbano', name_en: 'City Taxi', duration: '15-25 min', frequency: 'Continuo', estimatedCost: '€20-30 (a tassametro)', pickupLocation_it: 'Uscita arrivi piano terra', pickupLocation_en: 'Ground floor arrivals exit', details_it: 'Tariffa a tassametro per la città.', details_en: 'Standard metered fare to city center.' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'bgy',
    iata: 'BGY',
    icao: 'LIME',
    name_it: 'Aeroporto di Milano Bergamo (Orio al Serio)',
    name_en: 'Milan Bergamo Airport (Orio al Serio)',
    city_it: 'Bergamo / Milano',
    city_en: 'Bergamo / Milan',
    country_it: 'Italia',
    country_en: 'Italy',
    countryCode: 'IT',
    officialWebsite: 'https://www.milanbergamoairport.it',
    coordinates: { lat: 45.6739, lng: 9.7042 },
    difficultyRating: 3,
    difficultyLabel_it: 'Intenso Low-Cost Hub (Affluenza elevata)',
    difficultyLabel_en: 'Busy Low-Cost Hub (High passenger volume)',
    averageSecurityWaitMin: 15,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Terzo aeroporto italiano per traffico e principale base continentale Ryanair. Molto affollato nelle prime ore del mattino. Terminal unico sviluppato su un unico livello.',
    navigationAdvice_en: 'Third busiest airport in Italy and major continental base for Ryanair. Highly crowded in early mornings. Single terminal on ground level.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Corsie di sicurezza aggiornate con nuovi scanner tomografici ad alta capacità.',
      scannersNote_en: 'Security lanes upgraded with high-throughput tomographic scanners.',
      liquidsAllowance_it: 'Nelle corsie con scanner 3D è possibile lasciare i liquidi nel bagaglio. Seguire le istruzioni del personale sul posto.',
      liquidsAllowance_en: 'On 3D scanner lanes liquids can stay inside bag. Follow lane marshal directions.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'I tablet e laptop possono rimanere nel bagaglio nelle nuove corsie abilitate.',
      electronicsNote_en: 'Tablets and laptops can remain inside bags on enabled lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi nel bagaglio a mano con batterie protette.',
      dronePolicy_en: 'Drones in cabin luggage only with battery terminals isolated.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh per passeggero nel bagaglio a mano.',
      powerbankPolicy_en: 'Max 100Wh per passenger in cabin bag.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.milanbergamoairport.it/it/controlli-di-sicurezza/',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'bgy-main', name: 'Terminal Unico', transferInfo_it: 'Tutti i voli Schengen e non-Schengen partono dall\'unico edificio principale.', transferInfo_en: 'All flights operate from the single main terminal building.' }
    ],
    airlines: [
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal Unico', checkInZone: 'Banchi 01-40' },
      { airlineName: 'Wizz Air', iataCode: 'W4', terminal: 'Terminal Unico', checkInZone: 'Banchi 41-48' },
      { airlineName: 'Aeroitalia', iataCode: 'XZ', terminal: 'Terminal Unico', checkInZone: 'Banchi 49-55' }
    ],
    amenities: [
      { id: 'bgy-wifi', category: 'wifi', title_it: 'Free Wi-Fi Bergamo Airport', title_en: 'Free Wi-Fi Bergamo Airport', location_it: 'In tutto il terminal', location_en: 'Terminal-wide', details_it: 'Rete gratuita illimitata "@Free Wi-Fi Bergamo Airport".', details_en: 'Unlimited free network "@Free Wi-Fi Bergamo Airport".' }
    ],
    venues: [
      { id: 'bgy-v1', name: 'Bricco Café', category: 'cafe', terminal: 'Terminal Unico', location: 'Partenze', hours: '05:00 - 23:00' },
      { id: 'bgy-v2', name: 'Dufry Shopping', category: 'duty_free', terminal: 'Terminal Unico', location: 'Dopo i controlli', hours: '05:00 - 22:30' }
    ],
    transports: [
      { id: 'bgy-tr-1', type: 'bus', name_it: 'Orio Shuttle / Terravision (per Milano Centrale)', name_en: 'Orio Shuttle / Terravision (to Milan Central)', duration: '50-60 min', frequency: 'Ogni 20 minuti', estimatedCost: '€10.00-12.00', pickupLocation_it: 'Pensiline bus fronte arrivi', pickupLocation_en: 'Bus bays outside arrivals', details_it: 'Bus navetta diretto senza fermate per la Stazione Centrale di Milano.', details_en: 'Direct shuttle bus straight to Milan Central railway station.' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'vce',
    iata: 'VCE',
    icao: 'LIPZ',
    name_it: 'Aeroporto di Venezia Marco Polo',
    name_en: 'Venice Marco Polo Airport',
    city_it: 'Venezia',
    city_en: 'Venice',
    country_it: 'Italia',
    country_en: 'Italy',
    countryCode: 'IT',
    officialWebsite: 'https://www.veneziaairport.it',
    coordinates: { lat: 45.5053, lng: 12.3519 },
    difficultyRating: 2,
    difficultyLabel_it: 'Elegante e Intuitivo (Accesso lagunare unico)',
    difficultyLabel_en: 'Elegant & Intuitive (Unique water access)',
    averageSecurityWaitMin: 10,
    recommendedArrivalHours: { domestic: 2, international: 3 },
    navigationAdvice_it: 'Aeroporto con splendida darsena coperta collegata al terminal tramite tapis roulant (moving walkway). È possibile raggiungere Venezia centro sia via terra che in battello.',
    navigationAdvice_en: 'Features an indoor moving walkway to the airport water dock. Travelers can reach historic Venice either by road bus or scenic water bus.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Scanner 3D EDS-CB operativi nei varchi principali.',
      scannersNote_en: '3D EDS-CB scanners active on main screening lanes.',
      liquidsAllowance_it: 'I liquidi possono rimanere all\'interno del bagaglio a mano nelle corsie con scanner di nuova generazione.',
      liquidsAllowance_en: 'Liquids can stay inside carry-on baggage on next-gen lanes.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Computer e tablet non richiedono estrazione nelle corsie 3D.',
      electronicsNote_en: 'Laptops and tablets do not require removal on 3D lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi nel bagaglio a mano. Severamente vietato il volo sulla città storica di Venezia e sulla laguna senza permessi ENAC/Prefettura.',
      dronePolicy_en: 'Drones in cabin only. Total drone ban across historic Venice and lagoon without strict ENAC/Prefecture permits.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh nel bagaglio a mano.',
      powerbankPolicy_en: 'Max 100Wh in cabin bag.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.veneziaairport.it/in-aeroporto/sicurezza-e-controlli.html',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'vce-main', name: 'Terminal Passeggeri Marco Polo', transferInfo_it: 'Edificio a 3 piani con darsena nautica coperta collegata al primo piano.', transferInfo_en: '3-level terminal with covered walkway to water dock on 1st floor.' }
    ],
    airlines: [
      { airlineName: 'ITA Airways', iataCode: 'AZ', terminal: 'Terminal Passeggeri', checkInZone: 'Banchi 10-18' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal Passeggeri', checkInZone: 'Banchi 20-30' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal Passeggeri', checkInZone: 'Banchi 40-52' },
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Terminal Passeggeri', checkInZone: 'Banchi 60-66' }
    ],
    amenities: [
      { id: 'vce-pwr', category: 'power_charging', title_it: 'Postazioni ricarica fronte laguna', title_en: 'Lagoon-view charging desks', location_it: 'Gates 10-16 primo piano', location_en: 'Gates 10-16 first floor', details_it: 'Banchi di lavoro con vista sulla pista e laguna dotati di prese AC e USB.', details_en: 'Work desks with runway and lagoon views with power outlets.' },
      { id: 'vce-wifi', category: 'wifi', title_it: 'Venice Airport Free Wi-Fi', title_en: 'Venice Airport Free Wi-Fi', location_it: 'Copertura totale', location_en: 'Full coverage', details_it: 'Accesso gratuito illimitato ad alta velocità.', details_en: 'Unlimited free high-speed Wi-Fi.' }
    ],
    venues: [
      { id: 'vce-v1', name: 'Emporio del Grano', category: 'dining', terminal: 'Terminal Passeggeri', location: 'Partenze piano 1', hours: '06:00 - 22:00' },
      { id: 'vce-v2', name: 'Aelia Duty Free', category: 'duty_free', terminal: 'Terminal Passeggeri', location: 'Dopo i controlli', hours: '05:30 - 21:30' }
    ],
    transports: [
      { id: 'vce-tr-1', type: 'bus', name_it: 'Alilaguna Vaporetto d\'Acqua (Linea Blu / Rossa)', name_en: 'Alilaguna Water Bus (Blue / Red Line)', duration: '45-60 min', frequency: 'Ogni 30 minuti', estimatedCost: '€15.00', pickupLocation_it: 'Darsena aeroportuale (7 min a piedi via tunnel mobile)', pickupLocation_en: 'Airport water dock (7 min walk via moving tunnel)', details_it: 'Suggestivo trasferimento in barca direttamente a San Marco, Murano o Lido.', details_en: 'Scenic boat transfer straight to St. Mark\'s Square, Murano, or Lido.' },
      { id: 'vce-tr-2', type: 'bus', name_it: 'ATVO Venice Airport Bus Express (per Piazzale Roma)', name_en: 'ATVO Venice Airport Bus Express (to Piazzale Roma)', duration: '20 min', frequency: 'Ogni 15-20 minuti', estimatedCost: '€10.00', pickupLocation_it: 'Corsia bus fronte arrivi', pickupLocation_en: 'Bus bay outside arrivals', details_it: 'Bus no-stop con aria condizionata e bagagliaio fino al terminal automobilistico di Venezia.', details_en: 'Non-stop express bus straight to Piazzale Roma car terminal.' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'nap',
    iata: 'NAP',
    icao: 'LIRN',
    name_it: 'Aeroporto Internazionale di Napoli Capodichino',
    name_en: 'Naples Capodichino International Airport',
    city_it: 'Napoli',
    city_en: 'Naples',
    country_it: 'Italia',
    country_en: 'Italy',
    countryCode: 'IT',
    officialWebsite: 'https://www.aeroportodinapoli.it',
    coordinates: { lat: 40.8860, lng: 14.2908 },
    difficultyRating: 3,
    difficultyLabel_it: 'Compatto ma ad alta densità (Coda varchi)',
    difficultyLabel_en: 'Compact with high passenger density (Security queues)',
    averageSecurityWaitMin: 16,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Aeroporto cittadino a soli 4 km dalla Stazione Centrale. In attesa del completamento della stazione metropolitana Linea 1, il bus Alibus è il mezzo più rapido.',
    navigationAdvice_en: 'City airport only 4 km from Central Station. While awaiting completion of Metro Line 1 station, the Alibus shuttle is the fastest link.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner convenzionali a raggi X attivi con verifica manuale.',
      scannersNote_en: 'Conventional X-ray scanners in operation with manual verification.',
      liquidsAllowance_it: 'Limite obbligatorio di 100ml a contenitore all\'interno di un singolo sacchetto trasparente di 1 litro.',
      liquidsAllowance_en: 'Strict 100ml container limit inside a single 1-litre transparent bag.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Computer portatili e tablet devono essere estratti e collocati nella vaschetta.',
      electronicsNote_en: 'Laptops and tablets must be removed and placed in separate bins.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni in cabina con batterie protette.',
      dronePolicy_en: 'Drones in cabin with battery terminals insulated.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh consentiti solo a bordo.',
      powerbankPolicy_en: 'Max 100Wh allowed on board only.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.aeroportodinapoli.it/it/controlli-di-sicurezza',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'nap-t1', name: 'Terminal 1', transferInfo_it: 'Terminal passeggeri principale.', transferInfo_en: 'Main passenger terminal.' }
    ],
    airlines: [
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 1', checkInZone: 'Area A' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 1', checkInZone: 'Area B' },
      { airlineName: 'ITA Airways', iataCode: 'AZ', terminal: 'Terminal 1', checkInZone: 'Area C' }
    ],
    amenities: [
      { id: 'nap-wifi', category: 'wifi', title_it: 'Naples Airport Wi-Fi', title_en: 'Naples Airport Wi-Fi', location_it: 'In tutta l\'aerostazione', location_en: 'Entire terminal', details_it: 'Connessione gratuita per tutti i passeggeri.', details_en: 'Free Wi-Fi for all passengers.' }
    ],
    venues: [
      { id: 'nap-v1', name: 'Moccia Pasticceria Napoletana', category: 'cafe', terminal: 'Terminal 1', location: 'Partenze prima e dopo controlli', hours: '05:30 - 21:30' },
      { id: 'nap-v2', name: 'Fratelli La Bufala', category: 'dining', terminal: 'Terminal 1', location: 'Airside primo piano', hours: '06:00 - 22:00' }
    ],
    transports: [
      { id: 'nap-tr-1', type: 'bus', name_it: 'Alibus (per Stazione Centrale / Porto Beverello)', name_en: 'Alibus (to Central Station / Beverello Port)', duration: '15-30 min', frequency: 'Ogni 15 minuti', estimatedCost: '€5.00', pickupLocation_it: 'Uscita arrivi piazzale esterno', pickupLocation_en: 'Outside arrivals forecourt', details_it: 'Collega direttamente la stazione AV e il porto di Napoli per i traghetti verso Capri e Ischia.', details_en: 'Direct link to high-speed rail station and port for ferries to Capri and Ischia.' }
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
      dronePolicy_it: 'Droni ammessi solo nel bagaglio a mano con batterie rimosse e protette. Divieto assoluto di volo nel raggio aeroportuale secondo le severe norme LuftVO.',
      dronePolicy_en: 'Drones in cabin only with batteries removed. Strict no-fly zone under German LuftVO aviation rules.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh consentiti a bordo nel bagaglio a mano.',
      powerbankPolicy_en: 'Maximum 100Wh allowed in cabin luggage.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.frankfurt-airport.com/en/flights-and-transfer/security-customs.html',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'fra-t1', name: 'Terminal 1', transferInfo_it: 'Hub Lufthansa, Star Alliance e stazioni ferroviarie (Fernbahnhof per ICE e Regionalbahnhof per S-Bahn).', transferInfo_en: 'Lufthansa, Star Alliance hub and railway stations (Fernbahnhof ICE and Regionalbahnhof).' },
      { id: 'fra-t2', name: 'Terminal 2', transferInfo_it: 'Oneworld e SkyTeam. Connesso al T1 dal treno automatico gratuito SkyLine e shuttle bus.', transferInfo_en: 'Oneworld and SkyTeam. Linked to T1 via free automated SkyLine train.' }
    ],
    airlines: [
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal 1', checkInZone: 'Hall A, B, C' },
      { airlineName: 'United Airlines', iataCode: 'UA', terminal: 'Terminal 1', checkInZone: 'Hall B' },
      { airlineName: 'Air Canada', iataCode: 'AC', terminal: 'Terminal 1', checkInZone: 'Hall B' },
      { airlineName: 'British Airways', iataCode: 'BA', terminal: 'Terminal 2', checkInZone: 'Hall E' },
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Terminal 2', checkInZone: 'Hall E' }
    ],
    amenities: [
      { id: 'fra-pwr', category: 'power_charging', title_it: 'Power Station e sedie ergonomiche', title_en: 'Power Stations & Ergonomic Seating', terminal: 'Terminal 1 e 2', location_it: 'Lungo tutti i moli A, B, C, D, E', location_en: 'Throughout concourses A, B, C, D, E', details_it: 'Oltre 5.000 punti di ricarica con prese Schuko 230V e porte USB.', details_en: 'Over 5,000 power points with 230V Schuko and USB ports.' },
      { id: 'fra-wifi', category: 'wifi', title_it: 'Fraport Free Wi-Fi 24h', title_en: 'Fraport Free Wi-Fi 24h', terminal: 'Tutti i Terminal', location_it: 'Tutte le aree', location_en: 'All areas', details_it: 'Wi-Fi gratuito illimitato ad alta velocità 24 ore su 24.', details_en: 'High-speed free unlimited Wi-Fi 24/7.' }
    ],
    venues: [
      { id: 'fra-v1', name: 'Käfer\'s Bistro', category: 'dining', terminal: 'Terminal 1', location: 'Hall B Partenze', hours: '06:00 - 22:00' },
      { id: 'fra-v2', name: 'Heinemann Duty Free', category: 'duty_free', terminal: 'Tutti i Terminal', location: 'Dopo i controlli', hours: '05:00 - 22:00' }
    ],
    transports: [
      { id: 'fra-tr-1', type: 'train', name_it: 'S-Bahn (S8 / S9 per Frankfurt Hbf)', name_en: 'S-Bahn (S8 / S9 to Frankfurt Hbf)', duration: '11-14 min', frequency: 'Ogni 15 minuti', estimatedCost: '€5.80', pickupLocation_it: 'Regionalbahnhof (sotterraneo Terminal 1)', pickupLocation_en: 'Regionalbahnhof (underground Terminal 1)', details_it: 'Treno suburbano rapido e frequente direttamente alla stazione centrale.', details_en: 'Frequent commuter train directly into Frankfurt Central Station.' },
      { id: 'fra-tr-2', type: 'train', name_it: 'Treni ICE ad Alta Velocità (Fernbahnhof)', name_en: 'ICE High-Speed Rail (Fernbahnhof)', duration: 'Varia per destinazione', frequency: 'Continuo', estimatedCost: 'Da €19.90', pickupLocation_it: 'Frankfurt Flughafen Fernbahnhof (sopraelevata T1)', pickupLocation_en: 'Frankfurt Airport Long-Distance Station (T1)', details_it: 'Connessioni dirette ICE per Colonia, Stoccarda, Monaco, Amsterdam e Bruxelles.', details_en: 'Direct ICE services to Cologne, Stuttgart, Munich, Amsterdam, and Brussels.' }
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
    navigationAdvice_it: 'Considerato tra i migliori aeroporti d\'Europa. Il Terminal 2 e il suo satellite (Lufthansa) sono collegati da un treno sotterraneo velocissimo. Tra i due terminal si trova il Munich Airport Center (MAC) con piazza coperta e birreria bavarese con birrificio interno.',
    navigationAdvice_en: 'Ranked among Europe\'s top airports. Terminal 2 and its satellite (Lufthansa) are connected by an ultra-fast underground train. Between terminals lies the Munich Airport Center (MAC) with a Bavarian brewery.',
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
      { id: 'muc-t2', name: 'Terminal 2 & Satellite', transferInfo_it: 'Hub esclusivo Lufthansa e Star Alliance con navetta sotterranea automatizzata per il satellite.', transferInfo_en: 'Exclusive Lufthansa & Star Alliance hub with automated underground shuttle to satellite.' }
    ],
    airlines: [
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal 2', checkInZone: 'Livello 04' },
      { airlineName: 'Air Dolomiti', iataCode: 'EN', terminal: 'Terminal 2', checkInZone: 'Livello 04' },
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Terminal 1', checkInZone: 'Area C' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 1', checkInZone: 'Area Z' }
    ],
    amenities: [
      { id: 'muc-nap', category: 'quiet_area', title_it: 'Napcabs (Cabine private per il riposo)', title_en: 'Napcabs (Private Rest Cabins)', terminal: 'Terminal 2', location_it: 'Gate G06, H32 e Satellite', location_en: 'Near Gate G06, H32 and Satellite', details_it: 'Cabine insonorizzate con letto, scrivania, schermo multimediale e ricarica a pagamento orario.', details_en: 'Soundproof cabins with bed, desk, and multimedia screen rentable by the hour.' },
      { id: 'muc-wifi', category: 'wifi', title_it: 'Telekom Free Wi-Fi', title_en: 'Telekom Free Wi-Fi', terminal: 'Tutti i Terminal', location_it: 'Tutte le aree', location_en: 'All areas', details_it: 'Connessione Wi-Fi gratuita illimitata ad alta velocità.', details_en: 'Unlimited free high-speed Wi-Fi.' }
    ],
    venues: [
      { id: 'muc-v1', name: 'Airbräu Brauhaus', category: 'dining', terminal: 'Munich Airport Center (MAC)', location: 'Tra T1 e T2', hours: '08:00 - 01:00' }
    ],
    transports: [
      { id: 'muc-tr-1', type: 'train', name_it: 'S-Bahn (Linee S1 e S8 per München Hbf)', name_en: 'S-Bahn (Lines S1 and S8 to Munich Hbf)', duration: '40 min', frequency: 'Ogni 10 minuti', estimatedCost: '€13.70', pickupLocation_it: 'Stazione S-Bahn centrale MAC piano sotterraneo', pickupLocation_en: 'Central MAC S-Bahn underground station', details_it: 'Due linee alternate per raggiungere la stazione centrale e Marienplatz.', details_en: 'Two alternating lines reaching central station and Marienplatz.' },
      { id: 'muc-tr-2', type: 'bus', name_it: 'Lufthansa Express Bus', name_en: 'Lufthansa Express Bus', duration: '45 min', frequency: 'Ogni 20 minuti', estimatedCost: '€11.50', pickupLocation_it: 'Fermate bus T1, T2 e MAC', pickupLocation_en: 'Bus stops outside T1, T2 and MAC', details_it: 'Bus diretto aperto a passeggeri di tutte le compagnie aeree per Monaco Centrale e Schwabing.', details_en: 'Direct shuttle for passengers of all airlines to Munich Central Station.' }
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'ber',
    iata: 'BER',
    icao: 'EDDB',
    name_it: 'Aeroporto di Berlino-Brandeburgo (Willy Brandt)',
    name_en: 'Berlin Brandenburg Airport (Willy Brandt)',
    city_it: 'Berlino',
    city_en: 'Berlin',
    country_it: 'Germania',
    country_en: 'Germany',
    countryCode: 'DE',
    officialWebsite: 'https://ber.berlin-airport.de',
    coordinates: { lat: 52.3667, lng: 13.5033 },
    difficultyRating: 3,
    difficultyLabel_it: 'Moderno ma code variabili ai varchi',
    difficultyLabel_en: 'Modern with variable security queues',
    averageSecurityWaitMin: 18,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Aeroporto inaugurato di recente per unificare tutti i voli di Berlino. Servizio "BER Runway" disponibile: prenotazione gratuita dello slot orario per i controlli di sicurezza senza fare fila.',
    navigationAdvice_en: 'Recently opened airport unifying all Berlin flights. Offers "BER Runway": free reservation of security timeslot to bypass general queues.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Scanner 3D CT presenti nelle corsie centrali del Terminal 1.',
      scannersNote_en: '3D CT scanners operating on central lanes of Terminal 1.',
      liquidsAllowance_it: 'Nelle corsie con scanner CT è possibile lasciare i liquidi nel bagaglio. Al T2 si applica la regola 100ml.',
      liquidsAllowance_en: 'Liquids can remain in bag on CT lanes. T2 follows standard 100ml rule.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e tablet restano nella borsa sulle corsie CT.',
      electronicsNote_en: 'Laptops and tablets stay inside bag on CT lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni in cabina con batterie protette.',
      dronePolicy_en: 'Drones in cabin with battery contacts taped.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh nel bagaglio a mano.',
      powerbankPolicy_en: 'Max 100Wh in cabin luggage.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://ber.berlin-airport.de/en/flying/security-controls.html',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'ber-t1', name: 'Terminal 1', transferInfo_it: 'Terminal principale a ferro di cavallo su sei livelli.', transferInfo_en: 'Main U-shaped terminal building on six levels.' },
      { id: 'ber-t2', name: 'Terminal 2', transferInfo_it: 'Terminal dedicato prevalentemente alle operazioni low-cost (Ryanair, Wizz Air).', transferInfo_en: 'Dedicated low-cost terminal primarily for Ryanair and Wizz Air.' }
    ],
    airlines: [
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal 1', checkInZone: 'Banchi 1-2' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 1', checkInZone: 'Banchi 3-4' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 2', checkInZone: 'Tutti i banchi T2' }
    ],
    amenities: [
      { id: 'ber-wifi', category: 'wifi', title_it: '_BER Free Wi-Fi', title_en: '_BER Free Wi-Fi', location_it: 'In tutto l\'aeroporto', location_en: 'Airport-wide', details_it: 'Accesso illimitato gratuito.', details_en: 'Unlimited free access.' }
    ],
    venues: [
      { id: 'ber-v1', name: 'Currywurst Express', category: 'grab_and_go', terminal: 'Terminal 1', location: 'Partenze Gate A03', hours: '05:00 - 22:00' }
    ],
    transports: [
      { id: 'ber-tr-1', type: 'train', name_it: 'Flughafen-Express (FEX per Berlin Hbf)', name_en: 'Airport Express (FEX to Berlin Hbf)', duration: '30 min', frequency: 'Ogni 30 minuti', estimatedCost: '€4.40 (Biglietto VBB ABC)', pickupLocation_it: 'Stazione sotterranea piano U2 sotto T1', pickupLocation_en: 'Underground station level U2 below T1', details_it: 'Treno espresso no-stop veloce direttamente per Berlino Centrale, Ostkreuz e Gesundbrunnen.', details_en: 'Fast express train directly to Berlin Central, Ostkreuz, and Gesundbrunnen.' }
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
    navigationAdvice_it: 'Principale ponte tra Europa e America Latina. Notare che T1, T2 e T3 formano un complesso unito, mentre il magnifico T4 e il suo satellite T4S (Iberia e oneworld) sono distanti e collegati da bus navetta gratuito e treno automatico sotterraneo.',
    navigationAdvice_en: 'Main gateway between Europe and Latin America. T1-T2-T3 form one cluster, while the architecturally acclaimed T4 and its satellite T4S (Iberia / oneworld) are connected by free shuttle bus and automated underground train.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Aena sta implementando progressivamente gli scanner EDSCB con tecnologia 3D nei varchi di T4 e T1.',
      scannersNote_en: 'Aena is progressively deploying 3D EDSCB scanners across T4 and T1 screening lanes.',
      liquidsAllowance_it: 'Nelle corsie con nuovi scanner 3D è consentito portare liquidi e bottiglie senza estrazione. Nelle altre corsie vige il limite 100ml.',
      liquidsAllowance_en: 'On lanes with new 3D scanners liquids can stay in bag. Other lanes require 100ml clear bag.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Nelle corsie 3D i dispositivi elettronici restano all\'interno del bagaglio.',
      electronicsNote_en: 'Electronics stay inside bag on 3D lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi nel bagaglio a mano con batterie protette secondo le normative AESA.',
      dronePolicy_en: 'Drones in cabin luggage with protected battery terminals under Spanish AESA rules.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh per passeggero in cabina.',
      powerbankPolicy_en: 'Max 100Wh per passenger in cabin.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.aena.es/es/pasajeros/equipajes-controles/seguridad.html',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'mad-t123', name: 'Terminal 1, 2, 3', transferInfo_it: 'SkyTeam, Air Europa, Ryanair e vettori internazionali.', transferInfo_en: 'SkyTeam, Air Europa, Ryanair, and international carriers.' },
      { id: 'mad-t4', name: 'Terminal 4 & T4S Satellite', transferInfo_it: 'Hub globale Iberia e oneworld (British Airways, American). T4 e T4S uniti da treno automatico sotterraneo (4 min).', transferInfo_en: 'Global Iberia & oneworld hub. T4 and T4S connected by automatic underground train (4 min).' }
    ],
    airlines: [
      { airlineName: 'Iberia', iataCode: 'IB', terminal: 'Terminal 4 & T4S', checkInZone: 'Banchi T4 centrale' },
      { airlineName: 'Air Europa', iataCode: 'UX', terminal: 'Terminal 1 & 2', checkInZone: 'Banchi T1/T2' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 1', checkInZone: 'Banchi T1' }
    ],
    amenities: [
      { id: 'mad-pwr', category: 'power_charging', title_it: 'Torrette di ricarica Aena', title_en: 'Aena Power Hubs', terminal: 'Tutti i Terminal', location_it: 'In tutte le aree d\'imbarco T4 e T1-3', location_en: 'Across all boarding gates in T4 and T1-3', details_it: 'Prese europee Schuko e porte USB integrate nelle sedute.', details_en: 'European Schuko and USB ports integrated in seating.' },
      { id: 'mad-wifi', category: 'wifi', title_it: 'AIRPORT FREE WIFI AENA', title_en: 'AIRPORT FREE WIFI AENA', terminal: 'Tutti i Terminal', location_it: 'Copertura totale', location_en: 'Full coverage', details_it: 'Wi-Fi gratuito illimitato offerto da Aena.', details_en: 'Unlimited free Wi-Fi provided by Aena.' }
    ],
    venues: [
      { id: 'mad-v1', name: 'Jamón & Tapas (Enrique Tomás)', category: 'dining', terminal: 'Terminal 4', location: 'Dopo i controlli', hours: '06:00 - 23:00' },
      { id: 'mad-v2', name: 'Madrid Duty Free', category: 'duty_free', terminal: 'Terminal 1, 2, 4', location: 'Airside', hours: '05:30 - 22:30' }
    ],
    transports: [
      { id: 'mad-tr-1', type: 'metro', name_it: 'Metro Linea 8 (per Nuevos Ministerios)', name_en: 'Metro Line 8 (to Nuevos Ministerios)', duration: '12-15 min', frequency: 'Ogni 5 minuti', estimatedCost: '€4.50-5.00 (incluso supplemento aeroporto €3)', pickupLocation_it: 'Stazioni metro T1-T2-T3 e T4', pickupLocation_en: 'Metro stations at T1-T2-T3 and T4', details_it: 'Metropolitana rapida direttamente al centro finanziario di Madrid.', details_en: 'Fast subway directly into central business district.' },
      { id: 'mad-tr-2', type: 'taxi', name_it: 'Taxi Ufficiale', name_en: 'Official City Taxi', duration: '20-30 min', frequency: 'Continuo', estimatedCost: '€33.00 (Tariffa fissa per Calle 30)', pickupLocation_it: 'Fermate taxi esterne a tutti i terminal', pickupLocation_en: 'Taxi ranks outside each terminal', details_it: 'Tariffa fissa per qualsiasi destinazione all\'interno della tangenziale M-30 di Madrid.', details_en: 'Flat fare to anywhere within Madrid M-30 inner ring road.' }
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
    navigationAdvice_it: 'Il moderno Terminal 1 gestisce la maggior parte dei voli internazionali, tradizionali e Vueling. Il Terminal 2 (2A, 2B, 2C) è dedicato a EasyJet e Ryanair. I due terminal distano 4km e sono collegati da una navetta bus gratuita h24 ogni 5-10 minuti.',
    navigationAdvice_en: 'Modern Terminal 1 handles legacy airlines, international flights, and Vueling hub. Terminal 2 handles low-cost carriers (Ryanair, EasyJet). Connected by free 24/7 shuttle bus (10 min ride).',
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
      { id: 'bcn-t1', name: 'Terminal 1', transferInfo_it: 'Vueling (hub principale), Iberia, Star Alliance, SkyTeam, Emirates e Oneworld.', transferInfo_en: 'Vueling main hub, Iberia, Star Alliance, SkyTeam, Emirates, Oneworld.' },
      { id: 'bcn-t2', name: 'Terminal 2 (2A, 2B, 2C)', transferInfo_it: 'Ryanair, EasyJet, Wizz Air. Treno Rodalies R2 Nord disponibile solo al T2.', transferInfo_en: 'Ryanair, EasyJet, Wizz Air. Rodalies train R2 Nord station located at T2.' }
    ],
    airlines: [
      { airlineName: 'Vueling', iataCode: 'VY', terminal: 'Terminal 1', checkInZone: 'Hall centrale T1' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 2B', checkInZone: 'Hall T2B' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 2C', checkInZone: 'Hall T2C' }
    ],
    amenities: [
      { id: 'bcn-pwr', category: 'power_charging', title_it: 'Punti di ricarica Aena', title_en: 'Aena Power Points', terminal: 'Terminal 1 e 2', location_it: 'Lungo tutti i gate', location_en: 'Along all boarding gates', details_it: 'Prese 230V e USB.', details_en: '230V and USB outlets.' },
      { id: 'bcn-wifi', category: 'wifi', title_it: 'AIRPORT FREE WIFI AENA', title_en: 'AIRPORT FREE WIFI AENA', terminal: 'Terminal 1 e 2', location_it: 'Tutte le aree', location_en: 'All areas', details_it: 'Wi-Fi gratuito illimitato.', details_en: 'Unlimited free Wi-Fi.' }
    ],
    venues: [
      { id: 'bcn-v1', name: 'Tapas & Beer by Enrique Tomás', category: 'dining', terminal: 'Terminal 1', location: 'Sky Center T1', hours: '06:00 - 22:30' },
      { id: 'bcn-v2', name: 'Barcelona Duty Free', category: 'duty_free', terminal: 'Terminal 1 & 2', location: 'Dopo i controlli', hours: '05:30 - 22:30' }
    ],
    transports: [
      { id: 'bcn-tr-1', type: 'bus', name_it: 'Aerobús (A1 per T1 / A2 per T2)', name_en: 'Aerobús (A1 for T1 / A2 for T2)', duration: '25-35 min', frequency: 'Ogni 5-10 minuti', estimatedCost: '€7.25', pickupLocation_it: 'Piazzale bus fronte arrivi T1 e T2', pickupLocation_en: 'Bus terminal outside arrivals T1 and T2', details_it: 'Navetta espresso con Wi-Fi per Plaça de Catalunya, Sepúlveda-Urgell e Plaça d\'Espanya.', details_en: 'Express shuttle bus to Plaça de Catalunya and Plaça d\'Espanya.' },
      { id: 'bcn-tr-2', type: 'metro', name_it: 'Metro L9 Sud', name_en: 'Metro Line L9 Sud', duration: '30 min', frequency: 'Ogni 7 minuti', estimatedCost: '€5.50 (Biglietto aeroporto)', pickupLocation_it: 'Stazioni metro sotterranee T1 e T2', pickupLocation_en: 'Underground metro stations at T1 and T2', details_it: 'Collega con Fira de Barcelona e interscambio con le linee L1, L3 e L5.', details_en: 'Connects to Fira Barcelona and interchanges with Lines L1, L3, L5.' }
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
    navigationAdvice_it: 'Uno dei migliori aeroporti al mondo per organizzazione: tutti i moli (Piers B fino a M) sono sotto un unico tetto. La stazione ferroviaria sotterranea Schiphol Plaza offre treni diretti per Amsterdam Centraal ogni 5 minuti (14 minuti di percorrenza).',
    navigationAdvice_en: 'Exceptional single-roof terminal concept: all concourses (Piers B to M) connect inside. Directly beneath Schiphol Plaza lies the railway station with direct trains to Amsterdam Central every 5 minutes (14 min ride).',
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
      { id: 'ams-main', name: 'Schiphol Single Terminal (Hall 1, 2, 3)', transferInfo_it: 'Unico immenso edificio diviso in Departure Halls 1 (Schengen / KLM), 2 (SkyTeam) e 3 (Low Cost ed Extra-Schengen).', transferInfo_en: 'Single mega-terminal divided into Departure Halls 1 (Schengen/KLM), 2 (SkyTeam), and 3 (Non-Schengen/Low Cost).' }
    ],
    airlines: [
      { airlineName: 'KLM Royal Dutch Airlines', iataCode: 'KL', terminal: 'Departure Hall 1 & 2', checkInZone: 'Banchi Hall 1/2' },
      { airlineName: 'Air France / Delta', iataCode: 'AF/DL', terminal: 'Departure Hall 2', checkInZone: 'Banchi Hall 2' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Departure Hall 3', checkInZone: 'Banchi Hall 3' }
    ],
    amenities: [
      { id: 'ams-rijks', category: 'quiet_area', title_it: 'Rijksmuseum Schiphol (Museo gratuito)', title_en: 'Rijksmuseum Schiphol (Free Museum)', terminal: 'Holland Boulevard', location_it: 'Tra i Pier E e F', location_en: 'Between Piers E and F', details_it: 'Esposizione d\'arte con dipinti originali dei Maestri Olandesi del Secolo d\'Oro ad accesso libero.', details_en: 'Free art annex showcasing original Golden Age Dutch master paintings.' },
      { id: 'ams-pwr', category: 'power_charging', title_it: 'Prese e work station lungo i Pier', title_en: 'Power outlets & workstations on Piers', terminal: 'Tutti i Pier', location_it: 'In tutte le aree imbarchi', location_en: 'Across all boarding concourses', details_it: 'Prese europee Schuko e USB integrate nei tavoli di lavoro.', details_en: 'European Schuko and USB ports integrated in work tables.' },
      { id: 'ams-wifi', category: 'wifi', title_it: 'Schiphol Airport Free WiFi', title_en: 'Schiphol Airport Free WiFi', terminal: 'Tutto il terminal', location_it: 'Copertura totale', location_en: 'Total coverage', details_it: 'Wi-Fi gratuito illimitato a 4 ore rinnovabile.', details_en: 'Unlimited free 4-hour renewable sessions.' }
    ],
    venues: [
      { id: 'ams-v1', name: 'Grand Café Het Paleis', category: 'dining', terminal: 'Lounge 1', location: 'Partenze Schengen', hours: '06:00 - 22:00' },
      { id: 'ams-v2', name: 'See Buy Fly Duty Free', category: 'duty_free', terminal: 'Tutte le Lounge', location: 'Dopo i controlli', hours: '05:00 - 22:00' }
    ],
    transports: [
      { id: 'ams-tr-1', type: 'train', name_it: 'Treno NS Diretto per Amsterdam Centraal', name_en: 'Direct NS Train to Amsterdam Centraal', duration: '14 min', frequency: 'Ogni 4-8 minuti (h24)', estimatedCost: '€4.90 (Biglietto Contactless OV-chipkaart)', pickupLocation_it: 'Stazione ferroviaria Schiphol Plaza (piano sotterraneo)', pickupLocation_en: 'Schiphol Plaza underground station', details_it: 'Servizio ferroviario continuo giorno e notte direttamente per la stazione centrale.', details_en: '24/7 direct railway link to Amsterdam Central Station.' }
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
      { id: 'cdg-t2', name: 'Terminal 2 (2A, 2B, 2C, 2D, 2E, 2F, 2G)', transferInfo_it: 'Hub globale Air France & SkyTeam. Sub-terminal 2E dedicato ai voli extra-Schengen.', transferInfo_en: 'Air France & SkyTeam main hub. 2E serves long-haul non-Schengen.' },
      { id: 'cdg-t3', name: 'Terminal 3', transferInfo_it: 'Terminal low-cost e voli charter.', transferInfo_en: 'Low-cost and charter flights terminal.' }
    ],
    airlines: [
      { airlineName: 'Air France', iataCode: 'AF', terminal: 'Terminal 2E / 2F / 2G', checkInZone: 'Hall partenze 2E/2F' },
      { airlineName: 'Delta Air Lines', iataCode: 'DL', terminal: 'Terminal 2E', checkInZone: 'Hall K/L/M' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 2B', checkInZone: 'Hall 2B' }
    ],
    amenities: [
      { id: 'cdg-pwr', category: 'power_charging', title_it: 'Espace Business & Postazioni Ricarica', title_en: 'Business Workstations & Charging', terminal: 'Terminal 2E e 2F', location_it: 'Presso tutte le sale d\'imbarco Hall K, L e M', location_en: 'At all boarding halls K, L, and M', details_it: 'Sedute con prese europee e ricarica a induzione wireless Qi.', details_en: 'Designer seats with European plugs and Qi wireless charging pads.' },
      { id: 'cdg-wifi', category: 'wifi', title_it: 'WIFI-AIRPORT Gratuito Illimitato', title_en: 'WIFI-AIRPORT Free Unlimited', terminal: 'Tutti i Terminal', location_it: 'Copertura in tutto l\'aeroporto', location_en: 'Airport-wide coverage', details_it: 'Accesso gratuito senza limitazioni di durata.', details_en: 'Free unlimited access with simple sign-in.' }
    ],
    venues: [
      { id: 'cdg-v1', name: 'Ladurée Paris', category: 'cafe', terminal: 'Terminal 1 & 2', location: 'Partenze internazionali', hours: '06:00 - 22:00' },
      { id: 'cdg-v3', name: 'Buy Paris Duty Free', category: 'duty_free', terminal: 'Tutti i Terminal', location: 'Dopo i controlli', hours: '05:30 - 22:30' }
    ],
    transports: [
      { id: 'cdg-tr-1', type: 'train', name_it: 'RER B (Treno Suburbano per Parigi)', name_en: 'RER B (Suburban Train to Paris)', duration: '35 min', frequency: 'Ogni 10-15 minuti', estimatedCost: '€11.80', pickupLocation_it: 'Stazione Aeroporto CDG 1 (T3) e CDG 2 (T2)', pickupLocation_en: 'Stations CDG 1 (T3) and CDG 2 (T2)', details_it: 'Arriva a Gare du Nord, Châtelet-Les Halles e Saint-Michel Notre-Dame.', details_en: 'Reaches Gare du Nord, Châtelet-Les Halles, and St-Michel.' },
      { id: 'cdg-tr-3', type: 'taxi', name_it: 'Taxi Ufficiale Parigino', name_en: 'Official Parisian Taxi', duration: '45-60 min', frequency: 'Continuo', estimatedCost: '€56.00 (Rive Droite) / €65.00 (Rive Gauche)', pickupLocation_it: 'Uscite bagagli designate con indicatore luminoso giallo', pickupLocation_en: 'Designated taxi ranks with yellow glowing light', details_it: 'Tariffa forfettaria regolata per legge.', details_en: 'Flat rates regulated by law.' }
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
    navigationAdvice_it: 'Aeroporto compatto situato a sud di Parigi con 4 settori unificati (Orly 1, 2, 3, 4). La nuova estensione della linea metropolitana M14 collega Orly direttamente a Châtelet nel cuore di Parigi in soli 25 minuti.',
    navigationAdvice_en: 'Compact airport south of Paris divided into sectors Orly 1, 2, 3, 4. The new Line 14 automated metro extension reaches Châtelet in central Paris in just 25 minutes.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner tradizionali attivi in quasi tutte le corsie.',
      scannersNote_en: 'Traditional screening equipment on majority of lanes.',
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
      dronePolicy_it: 'Droni ammessi nel bagaglio a mano con batterie protette.',
      dronePolicy_en: 'Drones in cabin with battery contacts taped.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh per passeggero.',
      powerbankPolicy_en: 'Max 100Wh per passenger.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.parisaeroport.fr/passagers/passagers-preparer-vol/bagages-surete',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'ory-main', name: 'Orly 1, 2, 3, 4', transferInfo_it: 'Settori interconnessi a piedi e con People Mover Orlyval.', transferInfo_en: 'Connected concourses walkable and served by Orlyval shuttle.' }
    ],
    airlines: [
      { airlineName: 'Transavia', iataCode: 'TO', terminal: 'Orly 3 & 4', checkInZone: 'Hall Orly 3' },
      { airlineName: 'Air France', iataCode: 'AF', terminal: 'Orly 1 & 2', checkInZone: 'Hall Orly 1' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Orly 1', checkInZone: 'Hall Orly 1' },
      { airlineName: 'Vueling', iataCode: 'VY', terminal: 'Orly 1', checkInZone: 'Hall Orly 1' }
    ],
    amenities: [
      { id: 'ory-wifi', category: 'wifi', title_it: 'WIFI-AIRPORT Gratuito', title_en: 'WIFI-AIRPORT Free', location_it: 'In tutto l\'aeroporto', location_en: 'Airport-wide', details_it: 'Connessione illimitata gratuita.', details_en: 'Free unlimited connection.' }
    ],
    venues: [
      { id: 'ory-v1', name: 'Paul Boulangerie', category: 'cafe', terminal: 'Orly 1, 2, 3, 4', location: 'Partenze', hours: '05:30 - 21:30' }
    ],
    transports: [
      { id: 'ory-tr-1', type: 'metro', name_it: 'Metropolitana Linea 14 (Automatica per Châtelet)', name_en: 'Metro Line 14 (Automated to Châtelet)', duration: '25 min', frequency: 'Ogni 3-5 minuti', estimatedCost: '€10.30 (Ticket Métro Aéroport)', pickupLocation_it: 'Stazione sotterranea fronte Orly 3', pickupLocation_en: 'Underground station facing Orly 3', details_it: 'Il collegamento metropolitano più veloce con il cuore di Parigi e Gare de Lyon.', details_en: 'Fastest underground metro connection into central Paris and Gare de Lyon.' },
      { id: 'ory-tr-2', type: 'taxi', name_it: 'Taxi Ufficiale', name_en: 'Official Taxi', duration: '30-45 min', frequency: 'Continuo', estimatedCost: '€36.00 (Rive Gauche) / €44.00 (Rive Droite)', pickupLocation_it: 'Fermate taxi esterne', pickupLocation_en: 'Outside taxi stands', details_it: 'Tariffa forfettaria stabilita per legge per Parigi centro.', details_en: 'Flat rate regulated by law to central Paris.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇮🇪 IRLANDA (IRELAND)
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
    navigationAdvice_it: 'Dispone dell\'esclusiva struttura "US Preclearance" al Terminal 2: i passeggeri diretti negli Stati Uniti completano i controlli doganali e d\'immigrazione americani prima del decollo, atterrando negli USA come voli nazionali.',
    navigationAdvice_en: 'Features unique "US Preclearance" facility in Terminal 2: travelers flying to the United States clear US customs and passport control in Dublin, arriving in the US as domestic passengers.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Nuovi scanner C3 installati in diverse corsie con progressivo rollout.',
      scannersNote_en: 'New C3 scanners installed across several screening lanes with ongoing rollout.',
      liquidsAllowance_it: 'Sulle corsie con scanner C3 i liquidi possono rimanere nel bagaglio. Seguire le indicazioni del personale al varco.',
      liquidsAllowance_en: 'On C3 scanner lanes liquids can stay inside bag. Follow lane marshal instructions.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e tablet restano nella borsa sulle corsie abilitate C3.',
      electronicsNote_en: 'Laptops and tablets stay inside bag on C3 enabled lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni in cabina con batterie al litio protette.',
      dronePolicy_en: 'Drones in cabin with lithium batteries protected.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh consentiti solo a bordo.',
      powerbankPolicy_en: 'Max 100Wh allowed on board only.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.dublinairport.com/at-the-airport/security',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'dub-t1', name: 'Terminal 1', transferInfo_it: 'Hub Ryanair e compagnie internazionali (Lufthansa, British Airways, KLM).', transferInfo_en: 'Ryanair hub and international airlines (Lufthansa, BA, KLM).' },
      { id: 'dub-t2', name: 'Terminal 2', transferInfo_it: 'Hub esclusivo Aer Lingus, voli transatlantici verso gli Stati Uniti e US Preclearance.', transferInfo_en: 'Aer Lingus hub, transatlantic flights to USA, and US Preclearance.' }
    ],
    airlines: [
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 1', checkInZone: 'Area Check-in 1-3' },
      { airlineName: 'Aer Lingus', iataCode: 'EI', terminal: 'Terminal 2', checkInZone: 'Area Check-in T2' }
    ],
    amenities: [
      { id: 'dub-wifi', category: 'wifi', title_it: 'Dublin Airport Free Wi-Fi', title_en: 'Dublin Airport Free Wi-Fi', terminal: 'Terminal 1 & 2', location_it: 'In tutte le aree', location_en: 'All areas', details_it: 'Wi-Fi gratuito ad alta velocità illimitato.', details_en: 'Unlimited free high-speed Wi-Fi.' }
    ],
    venues: [
      { id: 'dub-v1', name: 'Marqette Food Hall', category: 'dining', terminal: 'Terminal 1', location: 'Dopo i controlli', hours: '04:30 - 22:00' },
      { id: 'dub-v2', name: 'The Loop Duty Free', category: 'duty_free', terminal: 'Terminal 1 & 2', location: 'Partenze', hours: '04:00 - 22:30' }
    ],
    transports: [
      { id: 'dub-tr-1', type: 'bus', name_it: 'Dublin Express (Bus 782 / 784 per centro città)', name_en: 'Dublin Express (Route 782 / 784 to City Centre)', duration: '20-30 min', frequency: 'Ogni 10-15 minuti', estimatedCost: '€8.00-10.00', pickupLocation_it: 'Pensiline bus fronte Terminal 1 e Terminal 2', pickupLocation_en: 'Bus stops outside T1 and T2', details_it: 'Transita attraverso il Dublin Port Tunnel evitando il traffico cittadino.', details_en: 'Uses Dublin Port Tunnel to bypass surface city traffic.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇵🇹 PORTOGALLO (PORTUGAL)
  // =========================================================================
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
    navigationAdvice_it: 'Attenzione: il Terminal 1 gestisce tutti gli arrivi e le partenze delle compagnie di bandiera (TAP Air Portugal). Il Terminal 2 è un edificio secondario dedicato solo alle partenze dei vettori low-cost (EasyJet, Ryanair, Wizz Air) ed è raggiungibile con navetta gratuita da T1 in 3 minuti.',
    navigationAdvice_en: 'Note: Terminal 1 handles all arrivals and legacy departures (TAP Air Portugal). Terminal 2 is departures-only for low-cost airlines (EasyJet, Ryanair), accessible via free 3-minute shuttle from T1.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner convenzionali a raggi X. Rispettare rigorosamente le norme standard.',
      scannersNote_en: 'Standard X-ray scanners. Strictly adhere to standard rules.',
      liquidsAllowance_it: 'Limite di 100ml a contenitore in sacchetto trasparente richiudibile di 1 litro.',
      liquidsAllowance_en: '100ml container limit in 1-litre transparent bag.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Portatili e tablet devono essere estratti dal bagaglio.',
      electronicsNote_en: 'Laptops and tablets must be taken out.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni consentiti solo in cabina con batterie staccate conformemente ad ANAC.',
      dronePolicy_en: 'Drones in cabin only with detached batteries under ANAC rules.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh nel bagaglio a mano.',
      powerbankPolicy_en: 'Max 100Wh in cabin luggage.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.ana.pt/en/passenger-guide/what-can-i-carry',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'lis-t1', name: 'Terminal 1', transferInfo_it: 'Tutti gli arrivi e partenze TAP Air Portugal, Star Alliance, SkyTeam.', transferInfo_en: 'All arrivals and departures for TAP Air Portugal and legacy carriers.' },
      { id: 'lis-t2', name: 'Terminal 2 (Solo Partenze Low-Cost)', transferInfo_it: 'Ryanair, EasyJet, Wizz Air, Transavia. Navetta gratuita ogni 10 min da T1.', transferInfo_en: 'Ryanair, EasyJet, Wizz Air departures only. Free shuttle from T1 every 10 mins.' }
    ],
    airlines: [
      { airlineName: 'TAP Air Portugal', iataCode: 'TP', terminal: 'Terminal 1', checkInZone: 'Hall centrale T1' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 2 (Partenze)', checkInZone: 'Banchi T2' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 2 (Partenze)', checkInZone: 'Banchi T2' }
    ],
    amenities: [
      { id: 'lis-wifi', category: 'wifi', title_it: 'VINCI Airports WiFi', title_en: 'VINCI Airports WiFi', terminal: 'Terminal 1 & 2', location_it: 'Tutte le aree', location_en: 'All areas', details_it: 'Wi-Fi gratuito illimitato ad alta velocità.', details_en: 'Unlimited free high-speed Wi-Fi.' }
    ],
    venues: [
      { id: 'lis-v1', name: 'Pastéis de Nata Confeitaria', category: 'cafe', terminal: 'Terminal 1', location: 'Partenze', hours: '05:00 - 23:00' }
    ],
    transports: [
      { id: 'lis-tr-1', type: 'metro', name_it: 'Metropolitano de Lisboa (Linha Vermelha / Rossa)', name_en: 'Lisbon Metro (Red Line)', duration: '20 min per Saldanha', frequency: 'Ogni 6-9 minuti', estimatedCost: '€1.80 (Biglietto ricaricabile Viva Viagem)', pickupLocation_it: 'Stazione Aeroporto sotterranea T1', pickupLocation_en: 'Airport metro station underground T1', details_it: 'Connessione comoda ed economica direttamente alla rete metropolitana cittadina.', details_en: 'Convenient and cheap subway directly into Lisbon transit network.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇦🇹 AUSTRIA
  // =========================================================================
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
    navigationAdvice_it: 'Aeroporto moderno, pulito e ben strutturato. Base di Austrian Airlines. Il City Airport Train (CAT) porta direttamente alla stazione di Wien Mitte in soli 16 minuti.',
    navigationAdvice_en: 'Modern, clean, and well-structured hub for Austrian Airlines. City Airport Train (CAT) reaches Wien Mitte station non-stop in only 16 minutes.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Scanner tomografici 3D installati nelle corsie del Terminal 3.',
      scannersNote_en: '3D CT scanners operational in Terminal 3 screening lanes.',
      liquidsAllowance_it: 'Nelle corsie dotate di scanner 3D è possibile lasciare i liquidi nel bagaglio.',
      liquidsAllowance_en: 'Liquids can stay in bag on 3D CT lanes.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e tablet rimangono nel bagaglio nelle corsie 3D.',
      electronicsNote_en: 'Laptops and tablets stay inside luggage on 3D lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni in cabina con batterie staccate secondo le norme Austro Control.',
      dronePolicy_en: 'Drones in cabin with battery contacts taped under Austro Control rules.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh nel bagaglio a mano.',
      powerbankPolicy_en: 'Max 100Wh in carry-on.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.viennaairport.com/passagiere/flughafen/sicherheitskontrolle',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'vie-t1', name: 'Terminal 1 & 1A', transferInfo_it: 'Oneworld, SkyTeam e vettori low-cost.', transferInfo_en: 'Oneworld, SkyTeam, and low-cost carriers.' },
      { id: 'vie-t3', name: 'Terminal 3 (Austrian Star Alliance Hub)', transferInfo_it: 'Hub principale Austrian Airlines e Star Alliance.', transferInfo_en: 'Main Austrian Airlines and Star Alliance hub.' }
    ],
    airlines: [
      { airlineName: 'Austrian Airlines', iataCode: 'OS', terminal: 'Terminal 3', checkInZone: 'Hall T3' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 1A', checkInZone: 'Hall T1A' }
    ],
    amenities: [
      { id: 'vie-wifi', category: 'wifi', title_it: 'Flughafen Wien Freies WLAN', title_en: 'Vienna Airport Free WLAN', location_it: 'In tutto l\'aeroporto', location_en: 'Airport-wide', details_it: 'Wi-Fi gratuito illimitato.', details_en: 'Unlimited free Wi-Fi.' }
    ],
    venues: [
      { id: 'vie-v1', name: 'Café Sacher Wien', category: 'cafe', terminal: 'Terminal 3', location: 'Partenze Gates F', hours: '06:00 - 21:00' }
    ],
    transports: [
      { id: 'vie-tr-1', type: 'train', name_it: 'City Airport Train (CAT - Non-stop)', name_en: 'City Airport Train (CAT - Non-stop)', duration: '16 min', frequency: 'Ogni 30 minuti', estimatedCost: '€14.90', pickupLocation_it: 'Stazione ferroviaria sotterranea aeroporto', pickupLocation_en: 'Underground airport railway station', details_it: 'Treno espresso no-stop direttamente per Wien Mitte (centro di Vienna).', details_en: 'Non-stop express train directly to Wien Mitte in central Vienna.' },
      { id: 'vie-tr-2', type: 'train', name_it: 'S-Bahn S7 (Treno Regionale)', name_en: 'S-Bahn S7 (Regional Train)', duration: '25 min', frequency: 'Ogni 30 minuti', estimatedCost: '€4.40', pickupLocation_it: 'Stazione sotterranea', pickupLocation_en: 'Underground station', details_it: 'Alternativa economica alla CAT.', details_en: 'Economical alternative to CAT.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇧🇪 BELGIO (BELGIUM)
  // =========================================================================
  {
    id: 'bru',
    iata: 'BRU',
    icao: 'EBBR',
    name_it: 'Aeroporto di Bruxelles-Zaventem',
    name_en: 'Brussels Airport (Zaventem)',
    city_it: 'Bruxelles',
    city_en: 'Brussels',
    country_it: 'Belgio',
    country_en: 'Belgium',
    countryCode: 'BE',
    officialWebsite: 'https://www.brusselsairport.be',
    coordinates: { lat: 50.9014, lng: 4.4844 },
    difficultyRating: 2,
    difficultyLabel_it: 'Compatto con Edificio "Connector" Moderno',
    difficultyLabel_en: 'Compact with Modern "Connector" Building',
    averageSecurityWaitMin: 12,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Hub principale di Brussels Airlines e Star Alliance. L\'edificio centrale "Connector" collega l\'area check-in ai moli A (Schengen) e B (non-Schengen) senza dover cambiare terminal.',
    navigationAdvice_en: 'Main hub for Brussels Airlines and Star Alliance. The central "Connector" building links check-in directly to Pier A (Schengen) and Pier B (non-Schengen).',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Scanner 3D CT installati nella modernissima screening hall del Connector.',
      scannersNote_en: '3D CT scanners installed in the Connector screening hall.',
      liquidsAllowance_it: 'I liquidi possono rimanere nel bagaglio sulle corsie con scanner tomografici.',
      liquidsAllowance_en: 'Liquids can remain in bag on tomographic scanner lanes.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e tablet restano nella borsa nelle corsie CT.',
      electronicsNote_en: 'Laptops and tablets stay inside luggage on CT lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni consentiti solo in cabina con batterie protette.',
      dronePolicy_en: 'Drones in cabin only with battery contacts taped.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh nel bagaglio a mano.',
      powerbankPolicy_en: 'Max 100Wh in cabin bag.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.brusselsairport.be/en/passengers/security-customs/security-screening',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'bru-main', name: 'Terminal Unico (Pier A e Pier B)', transferInfo_it: 'Pier A per voli Schengen, Pier B per voli extra-Schengen collegati dal Connector.', transferInfo_en: 'Pier A for Schengen, Pier B for non-Schengen linked by Connector building.' }
    ],
    airlines: [
      { airlineName: 'Brussels Airlines', iataCode: 'SN', terminal: 'Terminal Unico', checkInZone: 'Banchi 01-10' },
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal Unico', checkInZone: 'Banchi 12-16' }
    ],
    amenities: [
      { id: 'bru-wifi', category: 'wifi', title_it: 'Brussels Airport Free Wi-Fi', title_en: 'Brussels Airport Free Wi-Fi', location_it: 'In tutto l\'aeroporto', location_en: 'Airport-wide', details_it: 'Wi-Fi gratuito illimitato.', details_en: 'Unlimited free Wi-Fi.' }
    ],
    venues: [
      { id: 'bru-v1', name: 'The Belgian Chocolate House', category: 'duty_free', terminal: 'Connector', location: 'Partenze', hours: '06:00 - 21:00' }
    ],
    transports: [
      { id: 'bru-tr-1', type: 'train', name_it: 'Treno NMBS/SNCB per Bruxelles Centrale', name_en: 'NMBS/SNCB Train to Brussels Central', duration: '17 min', frequency: 'Ogni 10-15 minuti', estimatedCost: '€10.80 (include Diabolo fee aeroporto)', pickupLocation_it: 'Stazione ferroviaria livello -1', pickupLocation_en: 'Railway station level -1', details_it: 'Treni frequenti per Bruxelles Nord, Centrale e Midi.', details_en: 'Frequent trains to Brussels North, Central, and Midi.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇩🇰 DANIMARCA (DENMARK)
  // =========================================================================
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
    navigationAdvice_it: 'Uno degli aeroporti più puntuali ed efficienti del mondo. Terminal unificato con pavimenti in parquet e design nordico. La metropolitana M2 parte dall\'interno del Terminal 3 e arriva a Nørreport nel centro di Copenaghen in soli 13 minuti.',
    navigationAdvice_en: 'Consistently ranked among the most punctual airports worldwide. Unified terminal with Scandinavian wooden floors. Metro M2 departs from inside Terminal 3 directly to central Nørreport in 13 minutes.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Presenza di scanner 3D CT nelle corsie di sicurezza centrali.',
      scannersNote_en: '3D CT scanners operating in central security checkpoints.',
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
      { id: 'cph-main', name: 'Terminal 2 & 3 (Interconnessi)', transferInfo_it: 'Terminal 2 e Terminal 3 costituiscono un unico complesso pedonale continuo.', transferInfo_en: 'Terminal 2 and Terminal 3 form one seamless walkable passenger hall.' }
    ],
    airlines: [
      { airlineName: 'SAS Scandinavian Airlines', iataCode: 'SK', terminal: 'Terminal 3', checkInZone: 'Hall T3' },
      { airlineName: 'Norwegian', iataCode: 'DY', terminal: 'Terminal 2', checkInZone: 'Hall T2' }
    ],
    amenities: [
      { id: 'cph-wifi', category: 'wifi', title_it: 'CPH Free Wi-Fi', title_en: 'CPH Free Wi-Fi', location_it: 'In tutto l\'aeroporto', location_en: 'Airport-wide', details_it: 'Wi-Fi gratuito illimitato ad alta velocità.', details_en: 'Unlimited free high-speed Wi-Fi.' }
    ],
    venues: [
      { id: 'cph-v1', name: 'Joe & The Juice', category: 'cafe', terminal: 'Terminal 3', location: 'Partenze', hours: '05:00 - 22:00' },
      { id: 'cph-v2', name: 'Lagkagehuset Bakery', category: 'cafe', terminal: 'Terminal 2 & 3', location: 'Airside', hours: '05:00 - 22:00' }
    ],
    transports: [
      { id: 'cph-tr-1', type: 'metro', name_it: 'Metropolitana M2 (diretta per Nørreport / Kongens Nytorv)', name_en: 'Metro Line M2 (direct to Nørreport)', duration: '13 min', frequency: 'Ogni 4-6 minuti (h24)', estimatedCost: 'DKK 36 (~€4.80)', pickupLocation_it: 'Stazione Metro interna Terminal 3', pickupLocation_en: 'Indoor Metro station at end of Terminal 3', details_it: 'Il collegamento aeroportuale più veloce e affidabile d\'Europa, attivo 24/7.', details_en: 'Fastest 24/7 automated metro link straight to downtown Copenhagen.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇸🇪 SVEZIA (SWEDEN)
  // =========================================================================
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
    navigationAdvice_it: 'L\'aeroporto ha completato la nuova futuristica area di sicurezza centralizzata al Terminal 5 con scanner 3D all\'avanguardia. Il treno Arlanda Express collega l\'aeroporto a Stoccolma Centrale a 200 km/h in soli 18 minuti.',
    navigationAdvice_en: 'Features brand-new central security area in Terminal 5 with modern 3D scanners. Arlanda Express high-speed train connects to Stockholm Central at 200 km/h in just 18 minutes.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Nuova area di sicurezza centralizzata al Terminal 5 dotata di scanner 3D CT di ultima generazione.',
      scannersNote_en: 'New state-of-the-art central security checkpoint in Terminal 5 features 3D CT scanners.',
      liquidsAllowance_it: 'Al nuovo varco del Terminal 5 i liquidi e i cosmetici possono rimanere all\'interno del bagaglio a mano senza estrazione.',
      liquidsAllowance_en: 'At the new Terminal 5 checkpoint, liquids stay inside carry-on luggage without removal.',
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
      { id: 'arn-t5', name: 'Terminal 5 (Nuovo Hub)', transferInfo_it: 'Hub principale per tutti i voli internazionali e SAS.', transferInfo_en: 'Main hub for international flights and SAS.' },
      { id: 'arn-t24', name: 'Terminal 2 & 4', transferInfo_it: 'Voli Schengen e low-cost.', transferInfo_en: 'Schengen and low-cost flights.' }
    ],
    airlines: [
      { airlineName: 'SAS Scandinavian Airlines', iataCode: 'SK', terminal: 'Terminal 5', checkInZone: 'Hall T5' },
      { airlineName: 'Norwegian', iataCode: 'DY', terminal: 'Terminal 5', checkInZone: 'Hall T5' }
    ],
    amenities: [
      { id: 'arn-wifi', category: 'wifi', title_it: 'Airport-Guest Wi-Fi', title_en: 'Airport-Guest Wi-Fi', location_it: 'In tutto l\'aeroporto', location_en: 'Airport-wide', details_it: 'Wi-Fi gratuito ad alta velocità per 3 ore (rinnovabile).', details_en: 'Free high-speed Wi-Fi for 3 hours (renewable).' }
    ],
    venues: [
      { id: 'arn-v1', name: 'Nordic Light Bakery', category: 'cafe', terminal: 'Terminal 5', location: 'Nuovo Marketplace', hours: '05:00 - 22:00' }
    ],
    transports: [
      { id: 'arn-tr-1', type: 'train', name_it: 'Arlanda Express (Treno ad Alta Velocità non-stop)', name_en: 'Arlanda Express (High-Speed Non-Stop Train)', duration: '18 min', frequency: 'Ogni 10-15 minuti', estimatedCost: 'SEK 320 (~€28.00, sconti per gruppi/coppie)', pickupLocation_it: 'Stazioni sotterranee Arlanda Södra (T2-4) e Arlanda Norra (T5)', pickupLocation_en: 'Underground stations Arlanda South and North', details_it: 'Treno veloce a 200 km/h senza fermate per Stoccolma Centrale.', details_en: 'Fast 200 km/h non-stop train straight to Stockholm Central.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇫🇮 FINLANDIA (FINLAND)
  // =========================================================================
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
    navigationAdvice_it: 'Costantemente votato tra i migliori aeroporti al mondo per puntualità e design rilassante in legno. Terminal unico inaugurato di recente con il 100% di scanner 3D e treno Ring Rail Line per il centro.',
    navigationAdvice_en: 'Consistently voted among the best airports worldwide. Single unified terminal with 100% 3D scanners and direct Ring Rail Line train to downtown.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Tutte le corsie dell\'area di sicurezza a Helsinki sono dotate di scanner 3D CT all\'avanguardia.',
      scannersNote_en: 'All screening lanes at Helsinki feature cutting-edge 3D CT scanners.',
      liquidsAllowance_it: 'I liquidi possono rimanere all\'interno del bagaglio a mano senza necessità di estrarli.',
      liquidsAllowance_en: 'Liquids can stay inside carry-on luggage without needing to be removed.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Computer e dispositivi elettronici restano nella borsa durante il passaggio.',
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
      { id: 'hel-main', name: 'Terminal Unificato Helsinki', transferInfo_it: 'Tutti i voli operano dall\'unico terminal unificato.', transferInfo_en: 'All flights operate from the single unified terminal.' }
    ],
    airlines: [
      { airlineName: 'Finnair', iataCode: 'AY', terminal: 'Terminal Unificato', checkInZone: 'Hall principale' },
      { airlineName: 'Norwegian', iataCode: 'DY', terminal: 'Terminal Unificato', checkInZone: 'Hall principale' }
    ],
    amenities: [
      { id: 'hel-wifi', category: 'wifi', title_it: 'Helsinki Airport Free Wi-Fi 100Mbps', title_en: 'Helsinki Airport Free Wi-Fi 100Mbps', location_it: 'In tutto l\'aeroporto', location_en: 'Airport-wide', details_it: 'Wi-Fi gratuito a 100Mbps senza registrazione.', details_en: 'Free 100Mbps Wi-Fi with no login required.' }
    ],
    venues: [
      { id: 'hel-v1', name: 'Nordic Kitchen', category: 'dining', terminal: 'Terminal Unificato', location: 'Gate 26', hours: '06:00 - 22:00' }
    ],
    transports: [
      { id: 'hel-tr-1', type: 'train', name_it: 'Ring Rail Line (Treni I e P per Helsinki Centrale)', name_en: 'Ring Rail Line (I and P Trains to Helsinki Central)', duration: '28 min', frequency: 'Ogni 10 minuti', estimatedCost: '€4.10 (Biglietto HSL zona ABC)', pickupLocation_it: 'Stazione sotterranea interna al terminal', pickupLocation_en: 'Underground station inside terminal', details_it: 'Treno diretto per la stazione centrale di Helsinki.', details_en: 'Direct rail link to Helsinki Central Station.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // =========================================================================
  // 🇬🇧 REGNO UNITO & 🌍 EXTRA-UE HUBS
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
    navigationAdvice_it: 'Aeroporto vastissimo. Calcolare fino a 20-25 minuti a piedi per raggiungere i gate satellitari del Terminal 5 e Terminal 2. Utilizzare i treni gratuiti Elizabeth Line o Heathrow Express per gli spostamenti tra i terminal.',
    navigationAdvice_en: 'Sprawling mega-hub. Allow up to 20-25 minutes walking to reach satellite gates in Terminal 5 and 2. Use free Elizabeth Line or Heathrow Express trains for inter-terminal transfers.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Reintrodotta temporaneamente la regola dei 100ml dal Dipartimento dei Trasporti britannico in tutti gli aeroporti UK in attesa del completamento del rollout.',
      scannersNote_en: 'UK Department for Transport has temporarily reinstated 100ml limit across all UK airports pending complete rollout.',
      liquidsAllowance_it: 'I liquidi devono essere in flaconi da massimo 100ml inseriti in un singolo sacchetto trasparente richiudibile di 20x20 cm.',
      liquidsAllowance_en: 'Liquids must be in containers of max 100ml inside one clear resealable plastic bag (approx 20x20 cm).',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Laptop e grandi tablet devono essere estratti e scansionati separatamente nelle corsie tradizionali.',
      electronicsNote_en: 'Laptops and large tablets must be taken out of bags for separate screening.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi solo in cabina previo scaricamento batterie al di sotto del 30%. Divieto assoluto di volo nei 5km circostanti.',
      dronePolicy_en: 'Drones in cabin only. Batteries must be discharged below 30%. Strict 5km no-fly zone around perimeter.',
      droneUnverified: true,
      droneNote_it: 'Segnalato da viaggiatori: la sicurezza a T5 effettua controlli specifici sul voltaggio dei droni DJI.',
      droneNote_en: 'Reported by travelers: security at T5 frequently inspects DJI drone batteries individually.',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh in cabina (fino a 160Wh con approvazione). Massimo 2 batterie di ricambio.',
      powerbankPolicy_en: 'Max 100Wh in cabin (up to 160Wh with airline consent). Max 2 spare batteries.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.heathrow.com/at-the-airport/airport-security',
      lastVerifiedDate: '2026-10-17'
    },
    terminals: [
      { id: 'lhr-t2', name: 'Terminal 2 (The Queen\'s Terminal)', transferInfo_it: 'Star Alliance Hub (Lufthansa, Singapore Airlines, United). Connesso a piedi al T3.', transferInfo_en: 'Star Alliance Hub. Walking tunnel to T3.' },
      { id: 'lhr-t3', name: 'Terminal 3', transferInfo_it: 'Oneworld long-haul, Virgin Atlantic, Emirates.', transferInfo_en: 'Oneworld long-haul, Virgin Atlantic, Emirates.' },
      { id: 'lhr-t4', name: 'Terminal 4', transferInfo_it: 'SkyTeam e vettori mediorientali/asiatici.', transferInfo_en: 'SkyTeam and Middle Eastern/Asian carriers.' },
      { id: 'lhr-t5', name: 'Terminal 5', transferInfo_it: 'Hub esclusivo British Airways. Composto da T5A, T5B e T5C uniti da treno sotterraneo.', transferInfo_en: 'Exclusive British Airways hub. Concourses 5A, 5B, 5C linked by underground transit.' }
    ],
    airlines: [
      { airlineName: 'British Airways', iataCode: 'BA', terminal: 'Terminal 5 (e T3)', checkInZone: 'Zone A-H (T5)' },
      { airlineName: 'Virgin Atlantic', iataCode: 'VS', terminal: 'Terminal 3', checkInZone: 'Zone A' },
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Terminal 3', checkInZone: 'Zone C' }
    ],
    amenities: [
      { id: 'lhr-pwr', category: 'power_charging', title_it: 'Stazioni di ricarica gratuite', title_en: 'Free Power Pole Charging Stations', terminal: 'Tutti i Terminal', location_it: 'In tutte le aree d\'attesa gate', location_en: 'Throughout all gate waiting lounges', details_it: 'Prese UK a tre poli, prese europee Schuko e porte USB.', details_en: 'UK 3-pin plugs, European Schuko, and USB ports.' },
      { id: 'lhr-wifi', category: 'wifi', title_it: 'Heathrow Free Wi-Fi', title_en: 'Heathrow Free Wi-Fi', terminal: 'Tutti i Terminal', location_it: 'Tutte le aree', location_en: 'All areas', details_it: 'Wi-Fi gratuito illimitato.', details_en: 'Free unlimited Wi-Fi.' }
    ],
    venues: [
      { id: 'lhr-v1', name: 'Gordon Ramsay Plane Food', category: 'dining', terminal: 'Terminal 5', location: 'Airside, 1st floor', hours: '05:30 - 21:30' },
      { id: 'lhr-v3', name: 'World Duty Free', category: 'duty_free', terminal: 'Tutti i Terminal', location: 'Zona centrale partenze', hours: '05:00 - 22:00' }
    ],
    transports: [
      { id: 'lhr-tr-1', type: 'train', name_it: 'Heathrow Express (Non-stop per Paddington)', name_en: 'Heathrow Express (Non-stop to Paddington)', duration: '15 min', frequency: 'Ogni 15 minuti', estimatedCost: '£25.00', pickupLocation_it: 'Heathrow Central (T2/T3) e T5 Station', pickupLocation_en: 'Heathrow Central (T2/T3) and T5 Station', details_it: 'Il modo più rapido per il centro di Londra.', details_en: 'The fastest connection into central London.' },
      { id: 'lhr-tr-2', type: 'metro', name_it: 'Elizabeth Line', name_en: 'Elizabeth Line', duration: '35-45 min', frequency: 'Ogni 10-15 minuti', estimatedCost: '£12.80 (Contactless / Oyster)', pickupLocation_it: 'Stazioni T2/T3, T4 e T5', pickupLocation_en: 'T2/T3, T4, and T5 Stations', details_it: 'Collega direttamente con Paddington, Tottenham Court Road, Liverpool Street e Canary Wharf.', details_en: 'Direct link to Paddington, Tottenham Court Road, Liverpool St, and Canary Wharf.' }
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
    difficultyLabel_it: 'Intenso & Lavori in corso (Cantiere New JFK 2024-2026)',
    difficultyLabel_en: 'Congested & Active Construction (New JFK Project)',
    averageSecurityWaitMin: 25,
    recommendedArrivalHours: { domestic: 2.5, international: 3.5 },
    navigationAdvice_it: 'JFK è interessato da una massiccia riqualificazione. Terminal non comunicanti a piedi: spostamento solo tramite AirTrain JFK.',
    navigationAdvice_en: 'JFK is undergoing multi-billion dollar redevelopment. Terminals are not connected on foot: move exclusively via AirTrain.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'TSA applica la rigorosa normativa federale TSA 3-1-1 per tutti i passeggeri standard.',
      scannersNote_en: 'TSA strictly enforces federal TSA 3-1-1 liquids rule for standard travelers.',
      liquidsAllowance_it: 'Regola TSA 3-1-1: contenitori da massimo 3.4 once (100ml) in un sacchetto di plastica trasparente da un quarto di gallone (1L).',
      liquidsAllowance_en: 'TSA 3-1-1 Rule: containers max 3.4 oz (100ml) packed in 1 clear quart-size bag.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Laptop ed elettronica di grandi dimensioni devono essere estratti e posti da soli nella vaschetta.',
      electronicsNote_en: 'Laptops and electronics must be placed in a dedicated bin.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'La FAA consente droni solo in cabina con batterie al litio staccate.',
      dronePolicy_en: 'FAA allows drones in cabin only with lithium batteries disconnected.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Massimo 100Wh per batteria in cabina. Vietati nel bagaglio in stiva.',
      powerbankPolicy_en: 'FAA limit: max 100Wh per spare battery in cabin.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.tsa.gov/travel/security-screening',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'jfk-t1', name: 'Terminal 1', transferInfo_it: 'Compagnie internazionali long-haul.', transferInfo_en: 'Major international long-haul carriers.' },
      { id: 'jfk-t4', name: 'Terminal 4', transferInfo_it: 'Hub principale Delta Air Lines ed Emirates.', transferInfo_en: 'Primary Delta hub and Emirates.' },
      { id: 'jfk-t5', name: 'Terminal 5', transferInfo_it: 'Hub JetBlue Airways e connessione al TWA Hotel storico.', transferInfo_en: 'JetBlue Airways home terminal and link to TWA Hotel.' },
      { id: 'jfk-t8', name: 'Terminal 8', transferInfo_it: 'Hub American Airlines e alleanza oneworld.', transferInfo_en: 'American Airlines and oneworld alliance hub.' }
    ],
    airlines: [
      { airlineName: 'Delta Air Lines', iataCode: 'DL', terminal: 'Terminal 4', checkInZone: 'Hall principale T4' },
      { airlineName: 'American Airlines', iataCode: 'AA', terminal: 'Terminal 8', checkInZone: 'Main Hall T8' },
      { airlineName: 'ITA Airways', iataCode: 'AZ', terminal: 'Terminal 1', checkInZone: 'Banchi 1-12' }
    ],
    amenities: [
      { id: 'jfk-pwr', category: 'power_charging', title_it: 'Stazioni di ricarica USB e prese US 120V', title_en: 'Power Poles & US 120V Outlets', terminal: 'Terminal 4, 5 e 8', location_it: 'Lungo i gate e nelle aree ristorazione', location_en: 'Along gate concourses and food halls', details_it: 'Prese US a due lamelle.', details_en: 'US 2-prong power adapters required.' },
      { id: 'jfk-wifi', category: 'wifi', title_it: '_Free JFK WiFi', title_en: '_Free JFK WiFi', terminal: 'Tutti i Terminal', location_it: 'Disponibile in tutti i terminal', location_en: 'Available across all terminals', details_it: 'Accesso gratuito illimitato.', details_en: 'Unlimited free access.' }
    ],
    venues: [
      { id: 'jfk-v1', name: 'Shake Shack', category: 'grab_and_go', terminal: 'Terminal 4', location: 'Gate B23 & B37', hours: '06:00 - 23:00' }
    ],
    transports: [
      { id: 'jfk-tr-1', type: 'train', name_it: 'AirTrain JFK + LIRR (Long Island Rail Road)', name_en: 'AirTrain JFK + LIRR (Long Island Rail Road)', duration: '35 min', frequency: 'Ogni 10 minuti', estimatedCost: '$8.50 + $7.00-$10.75', pickupLocation_it: 'Stazioni AirTrain in ogni terminal', pickupLocation_en: 'AirTrain stations at each terminal', details_it: 'Il collegamento più rapido per Manhattan (Penn Station o Grand Central).', details_en: 'The fastest link into Manhattan (Penn Station or Grand Central).' }
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
    navigationAdvice_it: 'Riconosciuto costantemente come l\'aeroporto più pulito e meglio organizzato al mondo. Connessioni rapidissime con la città.',
    navigationAdvice_en: 'Consistently voted the cleanest and most efficient airport in the world. Superb fast city access.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Sistemi di controllo intelligenti avanzati (Smart Security Lanes).',
      scannersNote_en: 'Advanced Smart Security Lanes with automated tray return.',
      liquidsAllowance_it: 'Voli Internazionali (T3/T2): regola standard 100ml in sacchetto da 1L. Voli Nazionali: liquidi ammessi con scanner ottico.',
      liquidsAllowance_en: 'International: standard 100ml. Domestic: bottles allowed via optical liquid analyzer.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Laptop e tablet possono rimanere nel bagaglio nelle corsie Smart indicate dai monitor.',
      electronicsNote_en: 'Laptops can stay in bag on indicated Smart Security lanes.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi nel bagaglio a mano. Divieto assoluto di volo nei centri urbani e vicino ad aeroporti.',
      dronePolicy_en: 'Drones in cabin only. Total ban in urban zones and near airports without ministry permit.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Max 100Wh (fino a 160Wh per max 2 unità). Vietate in stiva.',
      powerbankPolicy_en: 'Max 100Wh (up to 160Wh for max 2 units). Strictly forbidden in hold.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://tokyo-haneda.com/en/passenger_guide/security/index.html',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'hnd-t1', name: 'Terminal 1', transferInfo_it: 'Hub voli nazionali Japan Airlines (JAL).', transferInfo_en: 'Japan Airlines (JAL) domestic hub.' },
      { id: 'hnd-t2', name: 'Terminal 2', transferInfo_it: 'Hub All Nippon Airways (ANA) voli nazionali ed internazionali.', transferInfo_en: 'All Nippon Airways (ANA) domestic and international hub.' },
      { id: 'hnd-t3', name: 'Terminal 3', transferInfo_it: 'Terminal per tutti i vettori internazionali stranieri.', transferInfo_en: 'Main terminal for all foreign international carriers.' }
    ],
    airlines: [
      { airlineName: 'All Nippon Airways (ANA)', iataCode: 'NH', terminal: 'Terminal 2', checkInZone: '2F Partenze' },
      { airlineName: 'Japan Airlines (JAL)', iataCode: 'JL', terminal: 'Terminal 1 (e T3)', checkInZone: '2F Partenze T1 / 3F T3' },
      { airlineName: 'ITA Airways', iataCode: 'AZ', terminal: 'Terminal 3', checkInZone: 'Isola banchi E' }
    ],
    amenities: [
      { id: 'hnd-pwr', category: 'power_charging', title_it: 'Prese di ricarica universali', title_en: 'Universal Charging Outlets', terminal: 'Tutti i Terminal', location_it: 'Quasi ogni poltrona dispone di prese dedicate', location_en: 'Nearly every seat features dedicated outlets', details_it: 'Prese US/JP 100V e porte USB.', details_en: 'US/Japan 100V plugs and USB ports.' },
      { id: 'hnd-wifi', category: 'wifi', title_it: 'Free WiFi Haneda', title_en: 'Free WiFi Haneda', terminal: 'Tutti i Terminal', location_it: 'Tutte le aree', location_en: 'All areas', details_it: 'Accesso gratuito illimitato.', details_en: 'Unlimited free access.' }
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
