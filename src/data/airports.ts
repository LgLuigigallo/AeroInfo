import { Airport } from '@/types/airport';

export const airportsData: Airport[] = [
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
      {
        id: 'fco-t1',
        name: 'Terminal 1',
        transferInfo_it: 'Dedicato a voli ITA Airways, partner SkyTeam, Vueling, EasyJet e voli Schengen. Connesso a piedi con il Terminal 3 (5 minuti).',
        transferInfo_en: 'Dedicated to ITA Airways, SkyTeam partners, Vueling, EasyJet, and Schengen flights. 5-min walk to Terminal 3.'
      },
      {
        id: 'fco-t3',
        name: 'Terminal 3',
        transferInfo_it: 'Dedicato a tutti i voli intercontinentali (USA, Medio Oriente, Asia), Ryanair, Wizz Air e vettori non-Schengen. Collegamento con l\'area imbarchi E tramite SkyBridge People Mover.',
        transferInfo_en: 'Dedicated to all long-haul intercontinental flights, Ryanair, Wizz Air, and non-Schengen carriers. Connected to Boarding Area E via SkyBridge People Mover.'
      }
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
      {
        id: 'fco-pwr-1',
        category: 'power_charging',
        title_it: 'Poltrone con ricarica USB e prese AC 230V',
        title_en: 'Armchairs with USB charging & AC 230V sockets',
        terminal: 'Terminal 1 & Terminal 3',
        location_it: 'Gates A01-A80 e Nuova Area Imbarchi E (tutte le sedute fronte gate)',
        location_en: 'Gates A01-A80 and New Boarding Area E (integrated in gate seating)',
        details_it: 'Prese universali Schuko e prese USB integrate sotto ogni fila di poltrone.',
        details_en: 'Universal Schuko power sockets and USB ports integrated under seating rows.'
      },
      {
        id: 'fco-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi gratuito illimitato ad alta velocità',
        title_en: 'Free Unlimited High-Speed Wi-Fi',
        terminal: 'Tutti i Terminal',
        location_it: 'Copertura totale in tutte le aree',
        location_en: 'Full coverage across all areas',
        details_it: 'Rete: "Airport-Free-WiFi". Nessuna registrazione o limite di tempo, velocità fino a 100Mbps.',
        details_en: 'Network: "Airport-Free-WiFi". No registration or time limits, speeds up to 100Mbps.'
      },
      {
        id: 'fco-water',
        category: 'water_refill',
        title_it: 'Fontanelle acqua potabile per borracce',
        title_en: 'Free Drinking Water Refill Fountains',
        terminal: 'Terminal 1 & 3',
        location_it: 'Presso i servizi igienici vicino ai Gate A27, A61, E18 ed E34',
        location_en: 'Next to restrooms near Gates A27, A61, E18, and E34',
        details_it: 'Erogatori gratuiti con acqua refrigerata e indicatore di temperatura.',
        details_en: 'Free dispensers with chilled drinking water.'
      },
      {
        id: 'fco-quiet',
        category: 'quiet_area',
        title_it: 'Area Relax & Poltrone Reclinabili',
        title_en: 'Relax Zone & Reclining Chairs',
        terminal: 'Terminal 3',
        location_it: 'Area Imbarchi E, soppalco superiore (sopra Piazza di Spagna)',
        location_en: 'Boarding Area E, upper mezzanine (above Piazza di Spagna)',
        details_it: 'Zona silenziosa con chaise-longue anatomiche e luce soffusa per riposo.',
        details_en: 'Quiet lounge area with ergonomic chaise-longues and dimmed lighting.',
        isUnverified: true,
        details_it_unverified: 'I viaggiatori segnalano che l\'area è molto richiesta durante le prime ore del mattino.',
        details_en_unverified: 'Travelers report high occupancy during early morning hours.'
      }
    ],
    venues: [
      { id: 'fco-v1', name: 'Eataly', category: 'dining', terminal: 'Terminal 1', location: 'Piazza del Gusto (dopo controlli)', hours: '06:00 - 22:30' },
      { id: 'fco-v2', name: 'Ferrari Spazio Bollicine', category: 'dining', terminal: 'Terminal 3', location: 'Area Imbarchi E', hours: '07:00 - 22:00' },
      { id: 'fco-v3', name: 'Venchi Cioccolato e Gelato', category: 'cafe', terminal: 'Terminal 1 & 3', location: 'Gate A31 ed Area E', hours: '06:00 - 23:00' },
      { id: 'fco-v4', name: 'Aelia Duty Free', category: 'duty_free', terminal: 'Terminal 1 & 3', location: 'Subito dopo i filtri di sicurezza', hours: '05:30 - 23:00' },
      { id: 'fco-v5', name: 'Farmacia San Raffaele', category: 'pharmacy', terminal: 'Terminal 1', location: 'Partenze T1 prima dei controlli', hours: '06:30 - 21:30' }
    ],
    transports: [
      {
        id: 'fco-tr-1',
        type: 'train',
        name_it: 'Leonardo Express (Non-stop)',
        name_en: 'Leonardo Express (Non-stop)',
        duration: '32 min',
        frequency: 'Ogni 15 minuti',
        estimatedCost: '€14.00',
        pickupLocation_it: 'Stazione ferroviaria interna dell\'aeroporto (fronte T3)',
        pickupLocation_en: 'Internal airport train station (in front of T3)',
        details_it: 'Collegamento ferroviario diretto senza fermate fino a Roma Termini.',
        details_en: 'Direct non-stop train link straight to Rome Termini central station.'
      },
      {
        id: 'fco-tr-2',
        type: 'train',
        name_it: 'Treno Regionale FL1',
        name_en: 'Regional Train FL1',
        duration: '45-50 min',
        frequency: 'Ogni 15-30 minuti',
        estimatedCost: '€8.00',
        pickupLocation_it: 'Stazione ferroviaria interna',
        pickupLocation_en: 'Internal train station',
        details_it: 'Fermate intermedie: Roma Trastevere, Roma Ostiense, Roma Tiburtina.',
        details_en: 'Intermediate stops: Roma Trastevere, Roma Ostiense, Roma Tiburtina.'
      },
      {
        id: 'fco-tr-3',
        type: 'bus',
        name_it: 'Shuttle Bus (Terravision / SIT Bus Shuttle)',
        name_en: 'Shuttle Bus (Terravision / SIT Bus Shuttle)',
        duration: '50-60 min',
        frequency: 'Ogni 30 minuti',
        estimatedCost: '€7.00',
        pickupLocation_it: 'Terminal 3, Hub Bus corsia 12-14',
        pickupLocation_en: 'Terminal 3, Bus Hub bay 12-14',
        details_it: 'Arrivo a Roma Termini e fermata Vaticano (SIT Bus).',
        details_en: 'Arrival at Rome Termini and Vatican stop (SIT Bus).'
      },
      {
        id: 'fco-tr-4',
        type: 'taxi',
        name_it: 'Taxi Ufficiale di Roma Capitale',
        name_en: 'Official Rome City Taxi',
        duration: '35-50 min',
        frequency: 'Disponibilità continua',
        estimatedCost: '€55.00 (Tariffa fissa)',
        pickupLocation_it: 'Uscita arrivi Terminal 1 e Terminal 3',
        pickupLocation_en: 'Arrivals exits Terminal 1 and Terminal 3',
        details_it: 'Tariffa fissa regolamentata per destinazioni all\'interno delle Mura Aureliane.',
        details_en: 'Regulated fixed flat fare for all destinations inside Aurelian Walls.'
      }
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
    navigationAdvice_it: 'Attenzione al terminal di partenza: il T1 ospita la maggior parte delle compagnie internazionali e tradizionali, mentre il T2 è interamente riservato a EasyJet. I due terminal distano circa 10 minuti di navetta.',
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
      lastVerifiedDate: '2026-10-16'
    },
    terminals: [
      {
        id: 'mxp-t1',
        name: 'Terminal 1',
        transferInfo_it: 'Terminal principale per voli di linea nazionali, europei e intercontinentali. Navetta h24 gratuita ogni 7 minuti per il T2.',
        transferInfo_en: 'Main terminal for domestic, EU and intercontinental airlines. 24/7 free shuttle every 7 mins to T2.'
      },
      {
        id: 'mxp-t2',
        name: 'Terminal 2',
        transferInfo_it: 'Terminal interamente dedicato alle operazioni di EasyJet.',
        transferInfo_en: 'Terminal dedicated exclusively to EasyJet flights.'
      }
    ],
    airlines: [
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 2', checkInZone: 'Tutti i banchi T2' },
      { airlineName: 'ITA Airways', iataCode: 'AZ', terminal: 'Terminal 1', checkInZone: 'Area Check-in 10' },
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal 1', checkInZone: 'Area Check-in 09' },
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Terminal 1', checkInZone: 'Area Check-in 13' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 1', checkInZone: 'Area Check-in 04' },
      { airlineName: 'Singapore Airlines', iataCode: 'SQ', terminal: 'Terminal 1', checkInZone: 'Area Check-in 14' }
    ],
    amenities: [
      {
        id: 'mxp-pwr',
        category: 'power_charging',
        title_it: 'Postazioni di ricarica rapida',
        title_en: 'Rapid Charging Workstations',
        terminal: 'Terminal 1',
        location_it: 'Imbarchi A e B lungo il corridoio centrale',
        location_en: 'Gates A and B along central corridor',
        details_it: 'Tavoli alti da lavoro con prese USB e AC 230V.',
        details_en: 'High work tables equipped with USB & 230V outlets.'
      },
      {
        id: 'mxp-wifi',
        category: 'wifi',
        title_it: 'Malpensa Free Wi-Fi',
        title_en: 'Malpensa Free Wi-Fi',
        terminal: 'Terminal 1 & 2',
        location_it: 'Tutte le aree',
        location_en: 'All areas',
        details_it: 'Navigazione gratuita fino a 512Kbps (senza login) oppure ad alta velocità con registrazione gratuita.',
        details_en: 'Free browsing up to 512Kbps (no login) or high speed upon free sign-up.'
      }
    ],
    venues: [
      { id: 'mxp-v1', name: 'Ferrari Spazio Bollicine', category: 'dining', terminal: 'Terminal 1', location: 'Piazza del Lusso', hours: '06:00 - 22:00' },
      { id: 'mxp-v2', name: 'Davide Oldani Pan\'e Dolcetti', category: 'cafe', terminal: 'Terminal 1', location: 'Imbarchi A', hours: '06:00 - 21:30' },
      { id: 'mxp-v3', name: 'Dufry Duty Free', category: 'duty_free', terminal: 'Terminal 1 & 2', location: 'Dopo i controlli', hours: '05:30 - 22:30' }
    ],
    transports: [
      {
        id: 'mxp-tr-1',
        type: 'train',
        name_it: 'Malpensa Express (per Cadorna / Centrale)',
        name_en: 'Malpensa Express (to Cadorna / Centrale)',
        duration: '37-52 min',
        frequency: 'Ogni 15-30 minuti',
        estimatedCost: '€13.00',
        pickupLocation_it: 'Stazione sotterranea T1 e T2',
        pickupLocation_en: 'Underground railway station T1 and T2',
        details_it: 'Corse dirette sia per Milano Cadorna (37 min) che per Milano Centrale (52 min).',
        details_en: 'Direct services to Milan Cadorna (37 min) and Milan Central (52 min).'
      },
      {
        id: 'mxp-tr-2',
        type: 'taxi',
        name_it: 'Taxi Ufficiale',
        name_en: 'Official Taxi',
        duration: '45-60 min',
        frequency: 'Continuo',
        estimatedCost: '€110.00 (Tariffa fissa)',
        pickupLocation_it: 'Porta 6 (T1) e Porta 1 (T2)',
        pickupLocation_en: 'Gate 6 (T1) and Gate 1 (T2)',
        details_it: 'Tariffa fissa per qualsiasi destinazione a Milano città.',
        details_en: 'Fixed rate to anywhere in Milan city.'
      }
    ],
    lastUpdated: '2026-10-18'
  },
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
      { id: 'lhr-t5', name: 'Terminal 5', transferInfo_it: 'Hub esclusivo British Airways (ed Iberia). Composto da T5A, T5B e T5C uniti da treno sotterraneo.', transferInfo_en: 'Exclusive British Airways hub. Concourses 5A, 5B, 5C linked by underground transit.' }
    ],
    airlines: [
      { airlineName: 'British Airways', iataCode: 'BA', terminal: 'Terminal 5 (e T3)', checkInZone: 'Zone A-H (T5)' },
      { airlineName: 'Virgin Atlantic', iataCode: 'VS', terminal: 'Terminal 3', checkInZone: 'Zone A' },
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Terminal 3', checkInZone: 'Zone C' },
      { airlineName: 'United Airlines', iataCode: 'UA', terminal: 'Terminal 2', checkInZone: 'Zone D' },
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal 2', checkInZone: 'Zone B' },
      { airlineName: 'Qatar Airways', iataCode: 'QR', terminal: 'Terminal 4', checkInZone: 'Zone A' }
    ],
    amenities: [
      {
        id: 'lhr-pwr',
        category: 'power_charging',
        title_it: 'Stazioni di ricarica gratuite',
        title_en: 'Free Power Pole Charging Stations',
        terminal: 'Tutti i Terminal',
        location_it: 'In tutte le aree d\'attesa gate',
        location_en: 'Throughout all gate waiting lounges',
        details_it: 'Prese UK a tre poli, prese europee Schuko e porte USB.',
        details_en: 'UK 3-pin plugs, European Schuko, and USB ports.'
      },
      {
        id: 'lhr-water',
        category: 'water_refill',
        title_it: 'Punti di rifornimento acqua potabile',
        title_en: 'Water Refill Stations',
        terminal: 'Tutti i Terminal',
        location_it: 'Oltre 100 fontanelle situate vicino a tutti i blocchi bagni',
        location_en: 'Over 100 free refill stations next to restroom clusters',
        details_it: 'Erogazione rapida per borracce.',
        details_en: 'High-speed flow for reusable bottles.'
      }
    ],
    venues: [
      { id: 'lhr-v1', name: 'Gordon Ramsay Plane Food', category: 'dining', terminal: 'Terminal 5', location: 'Airside, 1st floor', hours: '05:30 - 21:30' },
      { id: 'lhr-v2', name: 'Caviar House & Prunier', category: 'dining', terminal: 'Terminal 2 & 3', location: 'Departure Lounge', hours: '06:00 - 21:00' },
      { id: 'lhr-v3', name: 'World Duty Free', category: 'duty_free', terminal: 'Tutti i Terminal', location: 'Zona centrale partenze', hours: '05:00 - 22:00' }
    ],
    transports: [
      {
        id: 'lhr-tr-1',
        type: 'train',
        name_it: 'Heathrow Express (Non-stop per Paddington)',
        name_en: 'Heathrow Express (Non-stop to Paddington)',
        duration: '15 min',
        frequency: 'Ogni 15 minuti',
        estimatedCost: '£25.00 (da £5.50 se prenotato in anticipo)',
        pickupLocation_it: 'Heathrow Central (T2/T3) e T5 Station',
        pickupLocation_en: 'Heathrow Central (T2/T3) and T5 Station',
        details_it: 'Il modo più rapido per il centro di Londra.',
        details_en: 'The fastest connection into central London.'
      },
      {
        id: 'lhr-tr-2',
        type: 'metro',
        name_it: 'Elizabeth Line',
        name_en: 'Elizabeth Line',
        duration: '35-45 min',
        frequency: 'Ogni 10-15 minuti',
        estimatedCost: '£12.80 (Contactless / Oyster)',
        pickupLocation_it: 'Stazioni T2/T3, T4 e T5',
        pickupLocation_en: 'T2/T3, T4, and T5 Stations',
        details_it: 'Collega direttamente con Paddington, Tottenham Court Road, Liverpool Street e Canary Wharf.',
        details_en: 'Direct link to Paddington, Tottenham Court Road, Liverpool St, and Canary Wharf.'
      },
      {
        id: 'lhr-tr-3',
        type: 'metro',
        name_it: 'London Underground (Piccadilly Line)',
        name_en: 'London Underground (Piccadilly Line)',
        duration: '50-60 min',
        frequency: 'Ogni 5 minuti',
        estimatedCost: '£5.60',
        pickupLocation_it: 'Stazioni metro in ciascun terminal',
        pickupLocation_en: 'Tube stations at each terminal',
        details_it: 'L\'opzione più economica per il centro.',
        details_en: 'The most economical option into the city center.'
      }
    ],
    lastUpdated: '2026-10-18'
  },
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
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 2B', checkInZone: 'Hall 2B' },
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Terminal 1', checkInZone: 'Hall 1' }
    ],
    amenities: [
      {
        id: 'cdg-pwr',
        category: 'power_charging',
        title_it: 'Espace Business & Postazioni Ricarica',
        title_en: 'Business Workstations & Charging',
        terminal: 'Terminal 2E e 2F',
        location_it: 'Presso tutte le sale d\'imbarco Hall K, L e M',
        location_en: 'At all boarding halls K, L, and M',
        details_it: 'Sedute di design con prese europee e ricarica a induzione wireless Qi.',
        details_en: 'Designer seats with European plugs and Qi wireless charging pads.'
      },
      {
        id: 'cdg-wifi',
        category: 'wifi',
        title_it: 'WIFI-AIRPORT Gratuito Illimitato',
        title_en: 'WIFI-AIRPORT Free Unlimited',
        terminal: 'Tutti i Terminal',
        location_it: 'Copertura in tutto l\'aeroporto',
        location_en: 'Airport-wide coverage',
        details_it: 'Accesso gratuito senza limitazioni di durata.',
        details_en: 'Free unlimited access with simple sign-in.'
      }
    ],
    venues: [
      { id: 'cdg-v1', name: 'Ladurée Paris', category: 'cafe', terminal: 'Terminal 1 & 2', location: 'Partenze internazionali', hours: '06:00 - 22:00' },
      { id: 'cdg-v2', name: 'I Love Paris by Guy Martin', category: 'dining', terminal: 'Terminal 2E', location: 'Hall L', hours: '06:30 - 22:00' },
      { id: 'cdg-v3', name: 'Buy Paris Duty Free', category: 'duty_free', terminal: 'Tutti i Terminal', location: 'Dopo i controlli', hours: '05:30 - 22:30' }
    ],
    transports: [
      {
        id: 'cdg-tr-1',
        type: 'train',
        name_it: 'RER B (Treno Suburbano per Parigi)',
        name_en: 'RER B (Suburban Train to Paris)',
        duration: '35 min',
        frequency: 'Ogni 10-15 minuti',
        estimatedCost: '€11.80',
        pickupLocation_it: 'Stazione Aeroporto CDG 1 (T3) e CDG 2 (T2)',
        pickupLocation_en: 'Stations CDG 1 (T3) and CDG 2 (T2)',
        details_it: 'Arriva a Gare du Nord, Châtelet-Les Halles e Saint-Michel Notre-Dame.',
        details_en: 'Reaches Gare du Nord, Châtelet-Les Halles, and St-Michel.'
      },
      {
        id: 'cdg-tr-2',
        type: 'bus',
        name_it: 'RoissyBus (diretto per Opéra)',
        name_en: 'RoissyBus (direct to Opéra)',
        duration: '60 min',
        frequency: 'Ogni 15-20 minuti',
        estimatedCost: '€16.60',
        pickupLocation_it: 'Fermate autobus T1, T2A-2F e T3',
        pickupLocation_en: 'Bus stops at T1, T2A-2F, and T3',
        details_it: 'Arrivo diretto in centro a Place de l\'Opéra.',
        details_en: 'Direct arrival in central Paris at Place de l\'Opéra.'
      },
      {
        id: 'cdg-tr-3',
        type: 'taxi',
        name_it: 'Taxi Ufficiale Parigino',
        name_en: 'Official Parisian Taxi',
        duration: '45-60 min',
        frequency: 'Continuo',
        estimatedCost: '€56.00 (Rive Droite) / €65.00 (Rive Gauche)',
        pickupLocation_it: 'Uscite bagagli designate con indicatore luminoso giallo',
        pickupLocation_en: 'Designated taxi ranks with yellow glowing light',
        details_it: 'Tariffa forfettaria regolata per legge a seconda della sponda della Senna.',
        details_en: 'Flat rates regulated by law depending on Right/Left Bank of the Seine.'
      }
    ],
    lastUpdated: '2026-10-17'
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
    navigationAdvice_it: 'Nota fondamentale: JFK è interessato da una massiccia riqualificazione multimiliardaria. I collegamenti AirTrain possono subire deviazioni. Terminal non comunicanti a piedi: spostamento solo tramite AirTrain JFK.',
    navigationAdvice_en: 'Crucial advisory: JFK is undergoing multi-billion dollar redevelopment. AirTrain routes may experience rerouting. Terminals are not connected on foot: move exclusively via AirTrain.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'TSA utilizza scanner TC nei varchi principali, ma applica la rigorosa normativa federale TSA 3-1-1 per tutti i passeggeri standard.',
      scannersNote_en: 'TSA utilizes CT scanners on select lanes, but strictly enforces federal TSA 3-1-1 liquids rule for standard travelers.',
      liquidsAllowance_it: 'Regola TSA 3-1-1: contenitori da massimo 3.4 once (100ml) in un sacchetto di plastica trasparente da un quarto di gallone (1L), massimo 1 sacchetto per passeggero.',
      liquidsAllowance_en: 'TSA 3-1-1 Rule: containers max 3.4 oz (100ml) packed in 1 clear quart-size bag, 1 bag per traveler.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Laptop ed elettronica di grandi dimensioni devono essere estratti e posti da soli nella vaschetta (esclusi titolari TSA PreCheck).',
      electronicsNote_en: 'Laptops and electronics must be placed in a dedicated bin (unless TSA PreCheck enrolled).',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'La Federal Aviation Administration (FAA) consente droni solo in cabina con batterie al litio staccate. Severamente vietato il volo nello spazio aereo di NYC.',
      dronePolicy_en: 'FAA allows drones in cabin only with lithium batteries disconnected. Strict no-fly zone across NYC metro airspace.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Regolamento FAA: massimo 100Wh per batteria in cabina. Vietati categoricamente nel bagaglio in stiva.',
      powerbankPolicy_en: 'FAA limit: max 100Wh per spare battery in cabin. Categorically prohibited in checked luggage.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.tsa.gov/travel/security-screening',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'jfk-t1', name: 'Terminal 1', transferInfo_it: 'Compagnie internazionali long-haul (Air France, Lufthansa, Korean Air, ITA Airways).', transferInfo_en: 'Major international long-haul carriers (Air France, Lufthansa, Korean Air, ITA).' },
      { id: 'jfk-t4', name: 'Terminal 4', transferInfo_it: 'Hub principale Delta Air Lines, Emirates, Singapore Airlines, Virgin Atlantic.', transferInfo_en: 'Primary Delta hub, Emirates, Singapore Airlines, Virgin Atlantic.' },
      { id: 'jfk-t5', name: 'Terminal 5', transferInfo_it: 'Hub JetBlue Airways e connessione al TWA Hotel storico.', transferInfo_en: 'JetBlue Airways home terminal and link to landmark TWA Hotel.' },
      { id: 'jfk-t7', name: 'Terminal 7', transferInfo_it: 'Aer Lingus, ANA, LOT Polish, Scandinavian Airlines.', transferInfo_en: 'Aer Lingus, ANA, LOT Polish, SAS.' },
      { id: 'jfk-t8', name: 'Terminal 8', transferInfo_it: 'Hub American Airlines e alleanza oneworld (British Airways, Iberia, Qatar).', transferInfo_en: 'American Airlines and oneworld alliance hub (British Airways, Iberia, Qatar).' }
    ],
    airlines: [
      { airlineName: 'Delta Air Lines', iataCode: 'DL', terminal: 'Terminal 4', checkInZone: 'Hall principale T4' },
      { airlineName: 'American Airlines', iataCode: 'AA', terminal: 'Terminal 8', checkInZone: 'Main Hall T8' },
      { airlineName: 'British Airways', iataCode: 'BA', terminal: 'Terminal 8', checkInZone: 'Zone Premium / Standard T8' },
      { airlineName: 'ITA Airways', iataCode: 'AZ', terminal: 'Terminal 1', checkInZone: 'Banchi 1-12' },
      { airlineName: 'JetBlue', iataCode: 'B6', terminal: 'Terminal 5', checkInZone: 'Tutti i banchi T5' },
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Terminal 4', checkInZone: 'Banchi Isola 3' }
    ],
    amenities: [
      {
        id: 'jfk-pwr',
        category: 'power_charging',
        title_it: 'Stazioni di ricarica USB e prese americane US 120V',
        title_en: 'Power Poles & US 120V Outlets',
        terminal: 'Terminal 4, 5 e 8',
        location_it: 'Lungo i gate e nelle aree ristorazione',
        location_en: 'Along gate concourses and food halls',
        details_it: 'Nota per viaggiatori europei: necessaria spina con adattatore US a due lamelle.',
        details_en: 'European travelers need US 2-prong power adapters.'
      },
      {
        id: 'jfk-wifi',
        category: 'wifi',
        title_it: '_Free JFK WiFi (Boingo)',
        title_en: '_Free JFK WiFi (Boingo)',
        terminal: 'Tutti i Terminal',
        location_it: 'Disponibile in tutti i terminal',
        location_en: 'Available across all terminals',
        details_it: 'Accesso gratuito illimitato sponsorizzato.',
        details_en: 'Unlimited free access with sponsor ad prompt.'
      }
    ],
    venues: [
      { id: 'jfk-v1', name: 'Shake Shack', category: 'grab_and_go', terminal: 'Terminal 4', location: 'Gate B23 & B37', hours: '06:00 - 23:00' },
      { id: 'jfk-v2', name: 'Bobby Van\'s Steakhouse', category: 'dining', terminal: 'Terminal 8', location: 'Dopo i controlli', hours: '06:30 - 22:00' },
      { id: 'jfk-v3', name: 'Duty Free Americas', category: 'duty_free', terminal: 'Terminal 1, 4, 7, 8', location: 'Airside centrale', hours: 'Aperto in corrispondenza dei voli' }
    ],
    transports: [
      {
        id: 'jfk-tr-1',
        type: 'train',
        name_it: 'AirTrain JFK + LIRR (Long Island Rail Road)',
        name_en: 'AirTrain JFK + LIRR (Long Island Rail Road)',
        duration: '35 min',
        frequency: 'Ogni 10 minuti',
        estimatedCost: '$8.50 (AirTrain) + $7.00-$10.75 (LIRR)',
        pickupLocation_it: 'Stazioni AirTrain in ogni terminal verso Jamaica Station',
        pickupLocation_en: 'AirTrain stations at each terminal to Jamaica Station',
        details_it: 'Il collegamento più rapido per Manhattan (Penn Station o Grand Central Madison).',
        details_en: 'The fastest link into Manhattan (Penn Station or Grand Central Madison).'
      },
      {
        id: 'jfk-tr-2',
        type: 'metro',
        name_it: 'AirTrain JFK + NYC Subway (Linea A o E)',
        name_en: 'AirTrain JFK + NYC Subway (Line A or E)',
        duration: '60-75 min',
        frequency: 'Ogni 5-10 minuti',
        estimatedCost: '$8.50 (AirTrain) + $2.90 (Metropolitana)',
        pickupLocation_it: 'AirTrain verso Howard Beach (Linea A) o Jamaica (Linea E)',
        pickupLocation_en: 'AirTrain to Howard Beach (Line A) or Jamaica (Line E)',
        details_it: 'L\'opzione più economica attiva 24 ore su 24.',
        details_en: 'Most economical option, runs 24/7.'
      },
      {
        id: 'jfk-tr-3',
        type: 'taxi',
        name_it: 'NYC Yellow Cab (Taxi Ufficiale)',
        name_en: 'NYC Yellow Cab (Official Taxi)',
        duration: '50-80 min (secondo traffico)',
        frequency: 'Continuo',
        estimatedCost: '$70.00 (Tariffa fissa per Manhattan) + pedaggi e mance',
        pickupLocation_it: 'File taxi ufficiali all\'esterno di ogni terminal (Welcome Center)',
        pickupLocation_en: 'Official taxi dispatch stands outside each terminal (Welcome Center)',
        details_it: 'Diffidare da abusivi all\'interno degli arrivi. Utilizzare solo la corsia ufficiale.',
        details_en: 'Ignore solicitations inside arrivals hall. Only use official outside line.'
      }
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
    navigationAdvice_it: 'Riconosciuto costantemente come l\'aeroporto più pulito e meglio organizzato al mondo. Terminal 1 e 2 per voli interni, Terminal 3 e parte del Terminal 2 per voli internazionali. Connessioni rapidissime con la città.',
    navigationAdvice_en: 'Consistently voted the cleanest and most efficient airport in the world. Terminals 1 & 2 for domestic, Terminal 3 & part of T2 for international. Superb fast city access.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Sistemi di controllo intelligenti avanzati (Smart Security Lanes) con restituzione automatizzata vaschette.',
      scannersNote_en: 'Advanced Smart Security Lanes with automated tray return.',
      liquidsAllowance_it: 'Voli Internazionali (T3/T2): regola standard 100ml in sacchetto da 1L. Voli Nazionali (T1/T2): bevande e liquidi ammessi con scanner dedicato.',
      liquidsAllowance_en: 'International (T3/T2): standard 100ml in 1L bag. Domestic (T1/T2): drinks & bottles allowed via optical liquid analyzer.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Nelle corsie Smart Security internazionali, laptop e tablet possono rimanere nel bagaglio se indicato dai monitor luminosi.',
      electronicsNote_en: 'On international Smart Security lanes, laptops can stay in bag where indicated by overhead screens.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi nel bagaglio a mano. In Giappone vige una legislazione severissima: divieto assoluto di volo nei centri urbani e vicino ad aeroporti senza permesso ministeriale MLIT.',
      dronePolicy_en: 'Drones in cabin only. Japan enforces strict drone regulations: total ban in urban zones and near airports without MLIT ministry permit.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Batterie al litio max 100Wh (fino a 160Wh con max 2 unità). Tassativamente vietate nel bagaglio registrato in stiva.',
      powerbankPolicy_en: 'Lithium batteries max 100Wh (up to 160Wh for max 2 units). Strictly forbidden in checked baggage.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://tokyo-haneda.com/en/passenger_guide/security/index.html',
      lastVerifiedDate: '2026-10-18'
    },
    terminals: [
      { id: 'hnd-t1', name: 'Terminal 1', transferInfo_it: 'Hub voli nazionali Japan Airlines (JAL).', transferInfo_en: 'Japan Airlines (JAL) domestic hub.' },
      { id: 'hnd-t2', name: 'Terminal 2', transferInfo_it: 'Hub All Nippon Airways (ANA) per voli nazionali ed internazionali.', transferInfo_en: 'All Nippon Airways (ANA) domestic and international hub.' },
      { id: 'hnd-t3', name: 'Terminal 3', transferInfo_it: 'Terminal principale per tutti i vettori internazionali (ITA, Air France, British, Delta, ecc.).', transferInfo_en: 'Main terminal for all foreign international carriers.' }
    ],
    airlines: [
      { airlineName: 'All Nippon Airways (ANA)', iataCode: 'NH', terminal: 'Terminal 2', checkInZone: '2F Partenze' },
      { airlineName: 'Japan Airlines (JAL)', iataCode: 'JL', terminal: 'Terminal 1 (e T3)', checkInZone: '2F Partenze T1 / 3F T3' },
      { airlineName: 'ITA Airways', iataCode: 'AZ', terminal: 'Terminal 3', checkInZone: 'Isola banchi E' },
      { airlineName: 'Delta Air Lines', iataCode: 'DL', terminal: 'Terminal 3', checkInZone: 'Isola banchi I' },
      { airlineName: 'Air France', iataCode: 'AF', terminal: 'Terminal 3', checkInZone: 'Isola banchi F' }
    ],
    amenities: [
      {
        id: 'hnd-pwr',
        category: 'power_charging',
        title_it: 'Prese di ricarica universali e scrivanie lavoro',
        title_en: 'Universal Charging Outlets & Work Desks',
        terminal: 'Tutti i Terminal',
        location_it: 'Quasi ogni poltrona dell\'area imbarchi dispone di prese dedicate',
        location_en: 'Nearly every seat in the gate concourse features dedicated outlets',
        details_it: 'Prese US/Giappone 100V e porte USB Type-A/Type-C.',
        details_en: 'US/Japan 100V plugs and USB Type-A/Type-C ports.'
      },
      {
        id: 'hnd-luggage',
        category: 'luggage_storage',
        title_it: 'Deposito Bagagli & Spedizione Takkyubin',
        title_en: 'Baggage Storage & Takkyubin Delivery',
        terminal: 'Terminal 3',
        location_it: 'Piano 2F Arrivi e 3F Partenze',
        location_en: '2F Arrivals and 3F Departures',
        details_it: 'Servizio di consegna bagagli direttamente in qualsiasi hotel del Giappone con Yamato Transport.',
        details_en: 'Same-day luggage delivery straight to any hotel in Japan via Yamato Transport.'
      }
    ],
    venues: [
      { id: 'hnd-v1', name: 'Edo Ko-ji (Edo Market Street)', category: 'dining', terminal: 'Terminal 3', location: 'Piano 4F prima dei controlli', hours: '07:00 - 23:00' },
      { id: 'hnd-v2', name: 'Ramen Setagaya', category: 'dining', terminal: 'Terminal 3', location: 'Edo Ko-ji 4F', hours: '06:00 - 24:00' },
      { id: 'hnd-v3', name: 'TIAT Duty Free', category: 'duty_free', terminal: 'Terminal 3', location: 'Subito dopo immigrazione', hours: '24 ore' }
    ],
    transports: [
      {
        id: 'hnd-tr-1',
        type: 'train',
        name_it: 'Tokyo Monorail',
        name_en: 'Tokyo Monorail',
        duration: '13 min',
        frequency: 'Ogni 4 minuti',
        estimatedCost: '¥500 (circa €3.10)',
        pickupLocation_it: 'Stazione Monorail interna in ciascun terminal',
        pickupLocation_en: 'Monorail station inside each terminal',
        details_it: 'Collega Haneda con la stazione di Hamamatsucho (interscambio con JR Yamanote Line per Shibuya, Shinjuku, Tokyo Station).',
        details_en: 'Connects to Hamamatsucho Station (direct transfer to JR Yamanote loop line).'
      },
      {
        id: 'hnd-tr-2',
        type: 'train',
        name_it: 'Keikyu Airport Line',
        name_en: 'Keikyu Airport Line',
        duration: '11 min per Shinagawa',
        frequency: 'Ogni 5-10 minuti',
        estimatedCost: '¥330 (circa €2.00)',
        pickupLocation_it: 'Stazione sotterranea Keikyu in ogni terminal',
        pickupLocation_en: 'Keikyu underground station at each terminal',
        details_it: 'Treni rapidi per Shinagawa e con prosecuzione diretta sulla linea metropolitana Asakusa.',
        details_en: 'Fast services to Shinagawa with through-service to Toei Asakusa subway line.'
      }
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
