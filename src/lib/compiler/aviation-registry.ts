import { Airport } from '@/types/airport';

/**
 * Curated aviation registry of frequently requested European and Mediterranean airports.
 * Each entry provides certified information on terminals, security scanners, baggage, food, and transport.
 */
export const AVIATION_REGISTRY: Record<string, Airport> = {
  // 🇮🇹 NAPOLI (NAP) - Aeroporto Internazionale di Napoli-Capodichino
  NAP: {
    id: 'nap',
    iata: 'NAP',
    icao: 'LIRN',
    name_it: 'Aeroporto Internazionale di Napoli-Capodichino',
    name_en: 'Naples International Airport',
    city_it: 'Napoli',
    city_en: 'Naples',
    country_it: 'Italia',
    country_en: 'Italy',
    countryCode: 'IT',
    officialWebsite: 'https://www.aeroportodinapoli.it',
    coordinates: { lat: 40.886, lng: 14.2908 },
    difficultyRating: 2,
    difficultyLabel_it: 'Compatto con picchi stagionali',
    difficultyLabel_en: 'Compact with seasonal peaks',
    averageSecurityWaitMin: 18,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Terminal unico disposto su due livelli. I controlli di sicurezza si trovano al primo piano. La sala imbarchi è concentrata e facile da percorrere a piedi in 5-10 minuti.',
    navigationAdvice_en: 'Single terminal on two floors. Security checkpoints are on the first floor. Departure gates are easily walkable within 5-10 minutes.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner radiogeni convenzionali. Obbligatorio estrarre liquidi ed elettronica.',
      scannersNote_en: 'Standard X-ray scanners. Liquids and electronics must be placed in separate trays.',
      liquidsAllowance_it: 'Massimo 100ml per contenitore in sacchetto trasparente da 1 litro',
      liquidsAllowance_en: 'Max 100ml per container in a 1-litre clear resealable plastic bag',
      liquidsMustBeRemoved: true,
      liquidsNote_it: 'I contenitori superiori a 100ml non sono ammessi salvo alimenti per neonati o farmaci.',
      liquidsNote_en: 'Containers larger than 100ml not permitted except baby food and medications.',
      electronicsInBag: false,
      electronicsNote_it: 'Laptop e tablet devono essere estratti e posti in vaschetta separata.',
      electronicsNote_en: 'Laptops and tablets must be placed in separate trays.',
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Ammesso in cabina se le batterie LiPo non superano i 100Wh.',
      dronePolicy_en: 'Allowed in cabin luggage if LiPo batteries are within 100Wh.',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Ammessi solo nel bagaglio a mano fino a 100Wh (max 2 pezzi per passeggero).',
      powerbankPolicy_en: 'Permitted in cabin luggage only, up to 100Wh (max 2 per person).',
      officialSourceUrl: 'https://www.aeroportodinapoli.it/it/controlli-di-sicurezza',
      lastVerifiedDate: '2026-10-21'
    },
    terminals: [
      {
        id: 't1',
        name: 'Terminal 1',
        transferInfo_it: 'Terminal principale passeggeri per tutte le partenze e gli arrivi.',
        transferInfo_en: 'Main passenger terminal handling all commercial flights.'
      }
    ],
    airlines: [
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 1', checkInZone: 'Area Partenze' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 1', checkInZone: 'Area Partenze' },
      { airlineName: 'ITA Airways', iataCode: 'AZ', terminal: 'Terminal 1', checkInZone: 'Area Partenze' },
      { airlineName: 'Wizz Air', iataCode: 'W4', terminal: 'Terminal 1', checkInZone: 'Area Partenze' }
    ],
    amenities: [
      {
        id: 'nap-power',
        category: 'power_charging',
        title_it: 'Colonnine di ricarica USB e prese 230V',
        title_en: 'USB and 230V Charging Stations',
        terminal: 'Terminal 1',
        location_it: 'Area Gate C e D e presso le sedute imbarchi',
        location_en: 'Near Gates C & D and boarding lounge seating',
        details_it: 'Prese Schuko e porte USB integrate nelle sedute passeggeri.',
        details_en: 'Schuko outlets and USB ports integrated into waiting seats.',
        availability: 'moderate'
      },
      {
        id: 'nap-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi Gratuito "Naples Airport Free Wi-Fi"',
        title_en: 'Free Wi-Fi "Naples Airport Free Wi-Fi"',
        terminal: 'Terminal 1',
        location_it: 'Intero terminal',
        location_en: 'Entire terminal',
        details_it: 'Accesso illimitato ad alta velocità senza registrazione obbligatoria.',
        details_en: 'Unlimited high-speed internet without mandatory registration.'
      },
      {
        id: 'nap-water',
        category: 'water_refill',
        title_it: 'Erogatori acqua potabile gratuita',
        title_en: 'Free Drinking Water Refill Stations',
        terminal: 'Terminal 1',
        location_it: 'Dopo i controlli di sicurezza, adiacente ai blocchi servizi igienici',
        location_en: 'Airside past security checks, next to primary restroom blocks',
        details_it: 'Fontanelle per riempire borracce e bottiglie vuote dopo i controlli.',
        details_en: 'Fountains to refill empty water bottles past security.'
      }
    ],
    venues: [
      {
        id: 'nap-v1',
        name: 'Moccia Caffetteria Napoletana',
        category: 'cafe',
        terminal: 'Terminal 1',
        location: 'Airside - Area imbarchi centrale',
        hours: '05:00 - 22:30',
        isEarlyMorning: true,
        serviceType: 'coffee_snack',
        highlightNote_it: 'Sfogliatelle calde, babà tradizionali ed espresso napoletano.',
        highlightNote_en: 'Authentic Neapolitan warm pastries, babà and espresso.'
      },
      {
        id: 'nap-v2',
        name: 'Fratelli La Bufala Restaurant',
        category: 'dining',
        terminal: 'Terminal 1',
        location: 'Piano 1 - Area partenze post-sicurezza',
        hours: '11:00 - 22:00',
        serviceType: 'table_service',
        highlightNote_it: 'Pizza napoletana verace e piatti caldi con servizio al tavolo.',
        highlightNote_en: 'Traditional Neapolitan pizza and hot meals with table service.'
      },
      {
        id: 'nap-v3',
        name: 'Autogrill Ciao & Bar',
        category: 'grab_and_go',
        terminal: 'Terminal 1',
        location: 'Area Partenze - Terrazza ristoro',
        hours: '04:30 - Ultimo volo',
        isEarlyMorning: true,
        serviceType: 'quick_bite',
        highlightNote_it: 'Panini, focacce e bibite veloci prima dell\'imbarco.',
        highlightNote_en: 'Quick sandwiches, focaccia, and cold beverages.'
      }
    ],
    transports: [
      {
        id: 'nap-alibus',
        type: 'bus',
        name_it: 'Navetta Alibus (ANM)',
        name_en: 'Alibus Airport Shuttle (ANM)',
        duration: '15-20 min',
        frequency: 'Ogni 15-20 minuti',
        estimatedCost: '5,00 €',
        pickupLocation_it: 'Uscita Arrivi, corsia dedicata bus',
        pickupLocation_en: 'Outside Arrivals, dedicated bus lane',
        details_it: 'Collega direttamente l\'aeroporto con Napoli Centrale (Piazza Garibaldi) e il Porto (Molo Beverello). Biglietto acquistabile anche contactless a bordo.',
        details_en: 'Direct express service to Naples Central Station and Port (Molo Beverello). Contactless payment accepted on board.'
      },
      {
        id: 'nap-taxi',
        type: 'taxi',
        name_it: 'Taxi Ufficiale Tariffa Preordinata',
        name_en: 'Official Fixed-Fare Taxi',
        duration: '15 min',
        frequency: 'Disponibile h24 all\'uscita arrivi',
        estimatedCost: '18,00 - 21,00 €',
        pickupLocation_it: 'Piazzale antistante Arrivi',
        pickupLocation_en: 'Taxi rank outside Arrivals hall',
        details_it: 'Tariffa fissa comunale predeterminata per Stazione Centrale (18€) e Centro Storico/Molo Beverello (21€). Richiedere la tariffa predeterminata prima della partenza.',
        details_en: 'Official municipal fixed tariffs to Central Station (18€) and City Center/Port (21€). Request fixed fare before departing.'
      }
    ],
    lastUpdated: '2026-10-21'
  },

  // 🇮🇹 BARI (BRI) - Aeroporto di Bari-Karol Wojtyła
  BRI: {
    id: 'bri',
    iata: 'BRI',
    icao: 'LIBD',
    name_it: 'Aeroporto di Bari-Karol Wojtyła',
    name_en: 'Bari Karol Wojtyła Airport',
    city_it: 'Bari',
    city_en: 'Bari',
    country_it: 'Italia',
    country_en: 'Italy',
    countryCode: 'IT',
    officialWebsite: 'https://www.aeroportidipuglia.it',
    coordinates: { lat: 41.1389, lng: 16.7606 },
    difficultyRating: 2,
    difficultyLabel_it: 'Moderno ed efficiente',
    difficultyLabel_en: 'Modern and efficient',
    averageSecurityWaitMin: 15,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Terminal passeggeri moderno su più livelli, collegato direttamente alla stazione ferroviaria sotterranea. Tempi di camminamento molto rapidi (5 minuti per raggiungere tutti i gate).',
    navigationAdvice_en: 'Modern passenger terminal directly connected to the underground railway station. Very fast walking times (under 5 minutes to all gates).',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner radiogeni tradizionali. Separare liquidi ed elettronica nelle vaschette.',
      scannersNote_en: 'Standard X-ray scanners. Liquids and electronics must be placed in separate bins.',
      liquidsAllowance_it: '100ml max per contenitore in sacchetto richiudibile trasparente (max 1L)',
      liquidsAllowance_en: 'Max 100ml per container in 1-litre clear resealable bag',
      liquidsMustBeRemoved: true,
      liquidsNote_it: 'Nessun flacone superiore a 100ml è ammesso oltre i controlli.',
      liquidsNote_en: 'No bottles larger than 100ml allowed through security.',
      electronicsInBag: false,
      electronicsNote_it: 'PC portatili, tablet e fotocamere vanno estratti dalla borsa.',
      electronicsNote_en: 'Laptops, tablets, and cameras must be removed from bags.',
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Ammesso nel bagaglio a mano con batterie staccate (max 100Wh).',
      dronePolicy_en: 'Cabin luggage only with batteries disconnected (max 100Wh).',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Consentiti nel bagaglio a mano fino a 100Wh. Vietati in stiva.',
      powerbankPolicy_en: 'Allowed in hand luggage up to 100Wh. Strictly prohibited in checked luggage.',
      officialSourceUrl: 'https://www.aeroportidipuglia.it/norme-di-sicurezza',
      lastVerifiedDate: '2026-10-21'
    },
    terminals: [
      {
        id: 't-main',
        name: 'Terminal Passeggeri',
        transferInfo_it: 'Terminal unico passeggeri collegato internamente alla stazione FS e Ferrotramviaria.',
        transferInfo_en: 'Single passenger terminal with indoor corridor to the train station.'
      }
    ],
    airlines: [
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal Passeggeri', checkInZone: 'Banchi 1-18' },
      { airlineName: 'ITA Airways', iataCode: 'AZ', terminal: 'Terminal Passeggeri', checkInZone: 'Banchi 19-24' },
      { airlineName: 'Wizz Air', iataCode: 'W4', terminal: 'Terminal Passeggeri', checkInZone: 'Banchi 25-32' }
    ],
    amenities: [
      {
        id: 'bri-power',
        category: 'power_charging',
        title_it: 'Punti di ricarica dispositivi',
        title_en: 'Charging points',
        terminal: 'Terminal Passeggeri',
        location_it: 'Lungo i corridoi gate e sala partenze',
        location_en: 'Along gate walkways and departure seating',
        details_it: 'Colonnine con prese elettriche Schuko e prese USB standard.',
        details_en: 'Power poles with Schuko electrical outlets and standard USB sockets.'
      },
      {
        id: 'bri-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi "AdP Free Wi-Fi"',
        title_en: 'Free Wi-Fi "AdP Free Wi-Fi"',
        terminal: 'Terminal Passeggeri',
        location_it: 'Copertura totale terminal',
        location_en: 'Full terminal coverage',
        details_it: 'Connessione Wi-Fi gratuita e senza limiti di tempo.',
        details_en: 'Free unlimited internet connection.'
      }
    ],
    venues: [
      {
        id: 'bri-v1',
        name: 'Bari Caffè Pugliese',
        category: 'cafe',
        terminal: 'Terminal Passeggeri',
        location: 'Airside - Piano Partenze',
        hours: '05:00 - 22:30',
        isEarlyMorning: true,
        serviceType: 'coffee_snack',
        highlightNote_it: 'Focaccia barese calda, pasticciotti leccesi e caffè espresso.',
        highlightNote_en: 'Warm traditional Apulian focaccia, pasticciotto pastries, and espresso.'
      },
      {
        id: 'bri-v2',
        name: 'Bottega dei Sapori Pugliesi',
        category: 'grab_and_go',
        terminal: 'Terminal Passeggeri',
        location: 'Partenze - Gate A1-A8',
        hours: '06:00 - 22:00',
        serviceType: 'quick_bite',
        highlightNote_it: 'Panini con capocollo di Martina Franca, taralli e bevande.',
        highlightNote_en: 'Gourmet sandwiches with local cold cuts, taralli, and drinks.'
      }
    ],
    transports: [
      {
        id: 'bri-train',
        type: 'train',
        name_it: 'Treno Metropolitano Ferrotramviaria (FM2)',
        name_en: 'Ferrotramviaria Airport Metro Train (FM2)',
        duration: '14 min',
        frequency: 'Ogni 30-40 minuti',
        estimatedCost: '5,30 €',
        pickupLocation_it: 'Stazione Ferroviaria Aeroporto (collegata via tunnel pedonale)',
        pickupLocation_en: 'Airport Train Station (accessible via indoor walkway tunnel)',
        details_it: 'Il modo più rapido e comodo per raggiungere Bari Centrale senza traffico. Biglietti acquistabili alle emettitrici automatiche in stazione.',
        details_en: 'The fastest connection to Bari Central Station avoiding city traffic. Tickets available at station machines.'
      },
      {
        id: 'bri-bus',
        type: 'bus',
        name_it: 'Autobus AMTAB Linea 16',
        name_en: 'AMTAB City Bus Line 16',
        duration: '35-45 min',
        frequency: 'Ogni 40-50 minuti',
        estimatedCost: '1,00 - 1,50 €',
        pickupLocation_it: 'Fermata bus fronte Arrivi',
        pickupLocation_en: 'Bus stop outside Arrivals',
        details_it: 'Opzione economica per raggiungere Bari Centro (Piazza Moro).',
        details_en: 'Budget city bus option connecting to Bari Central Square.'
      }
    ],
    lastUpdated: '2026-10-21'
  },

  // 🇮🇹 BOLOGNA (BLQ) - Aeroporto di Bologna-Guglielmo Marconi
  BLQ: {
    id: 'blq',
    iata: 'BLQ',
    icao: 'LIPE',
    name_it: 'Aeroporto di Bologna-Guglielmo Marconi',
    name_en: 'Bologna Guglielmo Marconi Airport',
    city_it: 'Bologna',
    city_en: 'Bologna',
    country_it: 'Italia',
    country_en: 'Italy',
    countryCode: 'IT',
    officialWebsite: 'https://www.bologna-airport.it',
    coordinates: { lat: 44.5354, lng: 11.2887 },
    difficultyRating: 3,
    difficultyLabel_it: 'Alta densità nelle ore di punta',
    difficultyLabel_en: 'High congestion during peak waves',
    averageSecurityWaitMin: 22,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Terminal unico su due livelli. I varchi di sicurezza al primo piano possono registrare code importanti la mattina presto (05:30-08:00). Il monorotaia Marconi Express collega direttamente alla stazione.',
    navigationAdvice_en: 'Single terminal on two floors. First-floor security gates can experience heavy queues in the early morning. Marconi Express monorail offers instant train connection.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner convenzionali a raggi X. Liquidi ed elettronica devono essere separati.',
      scannersNote_en: 'Standard X-ray security. Liquids and laptops must be removed into bins.',
      liquidsAllowance_it: 'Flaconi fino a 100ml in busta trasparente richiudibile da 1 litro',
      liquidsAllowance_en: 'Max 100ml containers in a transparent resealable 1L plastic bag',
      liquidsMustBeRemoved: true,
      liquidsNote_it: 'Attenzione: bottiglie e borracce piene non superano il varco.',
      liquidsNote_en: 'Attention: full bottles will not pass security.',
      electronicsInBag: false,
      electronicsNote_it: 'Computer e tablet fuori dai bagagli.',
      electronicsNote_en: 'Laptops and tablets must be placed in separate boxes.',
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Solo in cabina se le batterie non superano i 100Wh.',
      dronePolicy_en: 'Cabin luggage only with batteries within 100Wh.',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Consentiti solo nel bagaglio a mano (massimo 100Wh).',
      powerbankPolicy_en: 'Hand luggage only (maximum 100Wh per unit).',
      officialSourceUrl: 'https://www.bologna-airport.it/guida-al-viaggio/sicurezza-e-controlli/',
      lastVerifiedDate: '2026-10-21'
    },
    terminals: [
      {
        id: 't-main',
        name: 'Terminal Principale',
        transferInfo_it: 'Terminal unico passeggeri con stazione Marconi Express al primo piano.',
        transferInfo_en: 'Single passenger terminal with Marconi Express monorail on first floor.'
      }
    ],
    airlines: [
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal Principale', checkInZone: 'Banchi Partenze' },
      { airlineName: 'Wizz Air', iataCode: 'W4', terminal: 'Terminal Principale', checkInZone: 'Banchi Partenze' },
      { airlineName: 'Air France', iataCode: 'AF', terminal: 'Terminal Principale', checkInZone: 'Banchi Partenze' },
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal Principale', checkInZone: 'Banchi Partenze' }
    ],
    amenities: [
      {
        id: 'blq-power',
        category: 'power_charging',
        title_it: 'Prese e ricarica USB',
        title_en: 'USB and Power Outlets',
        terminal: 'Terminal Principale',
        location_it: 'Area Gate imbarchi',
        location_en: 'Boarding gate area',
        details_it: 'Prese disponibili lungo le vetrate e nelle aree ristoro.',
        details_en: 'Outlets along window seats and dining areas.'
      },
      {
        id: 'blq-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi Bologna Airport',
        title_en: 'Bologna Airport Wi-Fi',
        terminal: 'Terminal Principale',
        location_it: 'In tutto il terminal',
        location_en: 'Terminal-wide',
        details_it: 'Wi-Fi gratuito illimitato per tutti i passeggeri.',
        details_en: 'Free unlimited Wi-Fi for all passengers.'
      }
    ],
    venues: [
      {
        id: 'blq-v1',
        name: 'Vecchia Malga Cibo & Bottega',
        category: 'dining',
        terminal: 'Terminal Principale',
        location: 'Airside - Primo Piano',
        hours: '06:00 - 21:30',
        isEarlyMorning: true,
        serviceType: 'table_service',
        highlightNote_it: 'Taglieri di Culatello, Parmigiano Reggiano, tortellini caldi e piadine.',
        highlightNote_en: 'Traditional Emilian charcuterie, Parmigiano, warm tortellini, and piadina.'
      },
      {
        id: 'blq-v2',
        name: 'Bricco Café & Bar',
        category: 'cafe',
        terminal: 'Terminal Principale',
        location: 'Area Partenze - Gate 1-12',
        hours: '05:00 - 22:30',
        isEarlyMorning: true,
        serviceType: 'coffee_snack',
        highlightNote_it: 'Brioche fresche, caffè espresso e tranci di pizza.',
        highlightNote_en: 'Fresh croissants, espresso, and pizza slices.'
      }
    ],
    transports: [
      {
        id: 'blq-monorail',
        type: 'train',
        name_it: 'Marconi Express (Monorotaia)',
        name_en: 'Marconi Express Monorail',
        duration: '7 min',
        frequency: 'Ogni 7-15 minuti',
        estimatedCost: '12,80 €',
        pickupLocation_it: 'Stazione Marconi Express - Piano 1 Partenze',
        pickupLocation_en: 'Marconi Express Station - First Floor Departures',
        details_it: 'Navetta monorotaia sopraelevata diretta tra l\'aeroporto e Bologna Centrale. Accessibile con carta contactless direttamente ai tornelli (Pay&Go).',
        details_en: 'Elevated electric monorail connecting directly to Bologna Central Station. Tap & go contactless payment at turnstiles.'
      },
      {
        id: 'blq-taxi',
        type: 'taxi',
        name_it: 'Taxi Ufficiale Cotabo / Cat',
        name_en: 'Official Taxi Rank',
        duration: '15-20 min',
        frequency: 'Disponibile h24',
        estimatedCost: '20,00 - 25,00 €',
        pickupLocation_it: 'Corsia taxi all\'esterno degli Arrivi',
        pickupLocation_en: 'Taxi line right outside Arrivals',
        details_it: 'Servizio con tassametro verso centro città e fiera.',
        details_en: 'Metered service towards city center and exhibition center.'
      }
    ],
    lastUpdated: '2026-10-21'
  },

  // 🇮🇹 PISA (PSA) - Aeroporto Internazionale di Pisa-San Giusto (Galileo Galilei)
  PSA: {
    id: 'psa',
    iata: 'PSA',
    icao: 'LIRP',
    name_it: 'Aeroporto di Pisa Galileo Galilei',
    name_en: 'Pisa Galileo Galilei Airport',
    city_it: 'Pisa',
    city_en: 'Pisa',
    country_it: 'Italia',
    country_en: 'Italy',
    countryCode: 'IT',
    officialWebsite: 'https://www.pisa-airport.com',
    coordinates: { lat: 43.6839, lng: 10.3927 },
    difficultyRating: 2,
    difficultyLabel_it: 'Molto compatto e rapido',
    difficultyLabel_en: 'Very compact and fast',
    averageSecurityWaitMin: 12,
    recommendedArrivalHours: { domestic: 2, international: 2 },
    navigationAdvice_it: 'Aeroporto molto vicino al centro città (1 km). Collegato alla stazione di Pisa Centrale tramite la cabinovia automatica Pisa Mover (5 minuti).',
    navigationAdvice_en: 'Very close to the city center (1 km). Connected to Pisa Central Railway Station via the automated Pisa Mover shuttle (5 minutes).',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner convenzionali. Estrarre liquidi ed elettronica nelle apposite vaschette.',
      scannersNote_en: 'Standard X-ray scanners. Liquids and electronic devices must be removed.',
      liquidsAllowance_it: 'Massimo 100ml per flacone in sacchetto trasparente da 1 litro',
      liquidsAllowance_en: '100ml maximum per bottle in 1L transparent bag',
      liquidsMustBeRemoved: true,
      electronicsInBag: false,
      electronicsNote_it: 'Dispositivi elettronici separati nelle vaschette.',
      electronicsNote_en: 'Separate electronic devices in security trays.',
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Solo in cabina se le batterie rispettano i limiti IATA di 100Wh.',
      dronePolicy_en: 'Cabin baggage only if batteries follow 100Wh limit.',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Ammessi solo nel bagaglio a mano fino a 100Wh.',
      powerbankPolicy_en: 'Hand luggage only up to 100Wh.',
      officialSourceUrl: 'https://www.pisa-airport.com/it/passeggeri/in-aeroporto/sicurezza.html',
      lastVerifiedDate: '2026-10-21'
    },
    terminals: [
      {
        id: 't-main',
        name: 'Terminal Passeggeri',
        transferInfo_it: 'Terminal unico passeggeri su due piani.',
        transferInfo_en: 'Single two-level passenger terminal.'
      }
    ],
    airlines: [
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal Passeggeri' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal Passeggeri' },
      { airlineName: 'British Airways', iataCode: 'BA', terminal: 'Terminal Passeggeri' }
    ],
    amenities: [
      {
        id: 'psa-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi Gratuito Toscana Aeroporti',
        title_en: 'Toscana Aeroporti Free Wi-Fi',
        terminal: 'Terminal Passeggeri',
        location_it: 'Tutto il terminal',
        location_en: 'All areas',
        details_it: 'Navigazione internet gratuita senza limiti di tempo.',
        details_en: 'Free unlimited internet access.'
      }
    ],
    venues: [
      {
        id: 'psa-v1',
        name: 'Baccanale Bar & Cantina Toscana',
        category: 'cafe',
        terminal: 'Terminal Passeggeri',
        location: 'Piano Terra Partenze',
        hours: '05:00 - 22:00',
        isEarlyMorning: true,
        serviceType: 'coffee_snack',
        highlightNote_it: 'Panini con salumi toscani, cantuccini e caffè.',
        highlightNote_en: 'Tuscan cold cut sandwiches, cantucci biscuits and espresso.'
      }
    ],
    transports: [
      {
        id: 'psa-mover',
        type: 'train',
        name_it: 'Pisa Mover (People Mover)',
        name_en: 'Pisa Mover Automated Shuttle',
        duration: '5 min',
        frequency: 'Ogni 5-8 minuti',
        estimatedCost: '5,00 €',
        pickupLocation_it: 'Stazione Pisa Mover a 50m dal terminal',
        pickupLocation_en: 'Pisa Mover Station 50m from terminal entrance',
        details_it: 'Navetta elettrica su rotaia diretta alla Stazione di Pisa Centrale. Da lì coincidenze treno veloci per Firenze Santa Maria Novella (50 min).',
        details_en: 'Automated electric train connecting directly to Pisa Central Station, with fast railway connections to Florence (50 min).'
      }
    ],
    lastUpdated: '2026-10-21'
  },

  // 🇪🇸 PALMA DI MAIORCA (PMI) - Aeroporto di Palma di Maiorca (Son Sant Joan)
  PMI: {
    id: 'pmi',
    iata: 'PMI',
    icao: 'LEPA',
    name_it: 'Aeroporto di Palma di Maiorca',
    name_en: 'Palma de Mallorca Airport',
    city_it: 'Palma di Maiorca',
    city_en: 'Palma de Mallorca',
    country_it: 'Spagna',
    country_en: 'Spain',
    countryCode: 'ES',
    officialWebsite: 'https://www.aena.es/es/palma-de-mallorca.html',
    coordinates: { lat: 39.5517, lng: 2.7388 },
    difficultyRating: 4,
    difficultyLabel_it: 'Enorme terminal, camminate lunghe',
    difficultyLabel_en: 'Massive terminal, long walking distances',
    averageSecurityWaitMin: 25,
    recommendedArrivalHours: { domestic: 2, international: 3 },
    navigationAdvice_it: 'Uno dei più grandi aeroporti d\'Europa per traffico estivo. Il terminal centrale si dirama in 4 moduli (A, B, C, D). Raggiungere i gate più lontani (Modulo C e D) può richiedere fino a 20-25 minuti di camminata dopo i controlli di sicurezza.',
    navigationAdvice_en: 'Massive airport with 4 distinct boarding modules (A, B, C, D). Walking from security to the furthest gates in Module C or D can take up to 20-25 minutes. Plan sufficient buffer time.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Regole standard Aena AENA. Liquidi ed elettronica separati nelle vaschette.',
      scannersNote_en: 'Standard AENA security checks. Liquids and electronics separated in trays.',
      liquidsAllowance_it: '100ml max per flacone in sacchetto trasparente da 1 litro',
      liquidsAllowance_en: 'Max 100ml per container in 1-litre resealable plastic bag',
      liquidsMustBeRemoved: true,
      electronicsInBag: false,
      electronicsNote_it: 'Laptop e tablet fuori dai bagagli.',
      electronicsNote_en: 'Electronics removed into bins.',
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Ammessi solo in cabina con batterie entro 100Wh.',
      dronePolicy_en: 'Permitted in cabin baggage only, batteries up to 100Wh.',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Solo bagaglio a mano fino a 100Wh (max 2 pezzi per persona).',
      powerbankPolicy_en: 'Carry-on luggage only up to 100Wh (max 2 units).',
      officialSourceUrl: 'https://www.aena.es/es/pasajeros/equipajes-controles/equipaje-mano.html',
      lastVerifiedDate: '2026-10-21'
    },
    terminals: [
      {
        id: 't-main',
        name: 'Terminal Principale (Moduli A, B, C, D)',
        transferInfo_it: 'Unico grande terminal con 4 moduli d\'imbarco collegati.',
        transferInfo_en: 'Single large central terminal branching into Modules A, B, C, and D.'
      }
    ],
    airlines: [
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Modulo C / D' },
      { airlineName: 'Eurowings', iataCode: 'EW', terminal: 'Modulo C' },
      { airlineName: 'Vueling', iataCode: 'VY', terminal: 'Modulo C' },
      { airlineName: 'Iberia', iataCode: 'IB', terminal: 'Modulo B / C' }
    ],
    amenities: [
      {
        id: 'pmi-power',
        category: 'power_charging',
        title_it: 'Aree di ricarica dispositivi',
        title_en: 'Device Charging Poles',
        terminal: 'Moduli A, B, C, D',
        location_it: 'In tutti i moduli lungo le file di sedute',
        location_en: 'In all modules near seating rows',
        details_it: 'Prese elettriche europee e porte USB.',
        details_en: 'EU power plugs and USB ports.',
        availability: 'abundant'
      },
      {
        id: 'pmi-water',
        category: 'water_refill',
        title_it: 'Fontanelle acqua gratuita',
        title_en: 'Free Water Refill Fountains',
        terminal: 'Terminal Principale',
        location_it: 'Presso i blocchi toilette dei moduli B, C e D',
        location_en: 'Near restroom blocks in Modules B, C, and D',
        details_it: 'Erogatori di acqua fresca potabile post-sicurezza.',
        details_en: 'Fresh drinking water fountains post-security.'
      }
    ],
    venues: [
      {
        id: 'pmi-v1',
        name: 'Café & Té Mallorca',
        category: 'cafe',
        terminal: 'Modulo C',
        location: 'Airside - Ingresso Modulo C',
        hours: '04:30 - 23:00',
        isEarlyMorning: true,
        serviceType: 'coffee_snack',
        highlightNote_it: 'Ensaimadas tradizionali maiorchine fresche di giornata e caffè.',
        highlightNote_en: 'Fresh traditional Majorcan ensaimadas and hot coffee.'
      },
      {
        id: 'pmi-v2',
        name: 'Burger King & Food Court',
        category: 'grab_and_go',
        terminal: 'Modulo C e D',
        location: 'Centro commerciale post-sicurezza',
        hours: '05:00 - 00:00',
        isEarlyMorning: true,
        serviceType: 'quick_bite',
        highlightNote_it: 'Menu veloci e opzioni per famiglie prima dell\'imbarco.',
        highlightNote_en: 'Fast food and family meal options before departure.'
      }
    ],
    transports: [
      {
        id: 'pmi-a1',
        type: 'bus',
        name_it: 'Bus Diretto A1 (EMT Palma)',
        name_en: 'EMT Express Bus A1',
        duration: '20 min',
        frequency: 'Ogni 12-15 minuti',
        estimatedCost: '5,00 €',
        pickupLocation_it: 'Piano terra Arrivi, banchina 1',
        pickupLocation_en: 'Ground floor Arrivals, bay 1',
        details_it: 'Collega direttamente l\'aeroporto con Plaça d\'Espanya nel centro di Palma di Maiorca. Pagamento con carta contactless a bordo.',
        details_en: 'Direct route from airport to Plaça d\'Espanya in central Palma. Contactless payment available on board.'
      },
      {
        id: 'pmi-a2',
        type: 'bus',
        name_it: 'Bus A2 (S\'Arenal)',
        name_en: 'EMT Bus A2 to S\'Arenal',
        duration: '25 min',
        frequency: 'Ogni 30 minuti',
        estimatedCost: '5,00 €',
        pickupLocation_it: 'Uscita Arrivi, banchina 2',
        pickupLocation_en: 'Arrivals exit, bay 2',
        details_it: 'Collega l\'aeroporto con le località balneari di Can Pastilla e S\'Arenal.',
        details_en: 'Direct connection to the beach resorts of Can Pastilla and S\'Arenal.'
      }
    ],
    lastUpdated: '2026-10-21'
  },

  // 🇪🇸 IBIZA (IBZ) - Aeroporto di Ibiza (Es Codolar)
  IBZ: {
    id: 'ibz',
    iata: 'IBZ',
    icao: 'LEIB',
    name_it: 'Aeroporto di Ibiza',
    name_en: 'Ibiza Airport',
    city_it: 'Ibiza',
    city_en: 'Ibiza',
    country_it: 'Spagna',
    country_en: 'Spain',
    countryCode: 'ES',
    officialWebsite: 'https://www.aena.es/es/ibiza.html',
    coordinates: { lat: 38.8729, lng: 1.3731 },
    difficultyRating: 3,
    difficultyLabel_it: 'Picchi intensi in estate',
    difficultyLabel_en: 'Intense summer peak congestion',
    averageSecurityWaitMin: 20,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Terminal unico passeggeri. Nei mesi estivi (giugno-settembre) i flussi di passeggeri sono molto intensi e i controlli di sicurezza possono richiedere fino a 30 minuti di attesa.',
    navigationAdvice_en: 'Single passenger terminal. Extremely busy during the summer season (June-September), when security lines can take up to 30 minutes.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner convenzionali Aena. Estrarre liquidi ed elettronica.',
      scannersNote_en: 'Standard AENA X-ray scanners. Remove liquids and laptops.',
      liquidsAllowance_it: '100ml max in busta trasparente da 1 litro',
      liquidsAllowance_en: '100ml max per container in 1L transparent bag',
      liquidsMustBeRemoved: true,
      electronicsInBag: false,
      electronicsNote_it: 'Laptop e tablet nelle vaschette separate.',
      electronicsNote_en: 'Separate electronic devices in bins.',
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Consentito nel bagaglio a mano (massimo 100Wh).',
      dronePolicy_en: 'Cabin baggage only up to 100Wh.',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Solo bagaglio a mano fino a 100Wh.',
      powerbankPolicy_en: 'Cabin luggage only up to 100Wh.',
      officialSourceUrl: 'https://www.aena.es/es/ibiza/equipajes-controles.html',
      lastVerifiedDate: '2026-10-21'
    },
    terminals: [
      {
        id: 't-main',
        name: 'Terminal Passeggeri',
        transferInfo_it: 'Terminal unico su due livelli con 17 porte d\'imbarco.',
        transferInfo_en: 'Single passenger terminal on two levels with 17 boarding gates.'
      }
    ],
    airlines: [
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal Passeggeri' },
      { airlineName: 'Vueling', iataCode: 'VY', terminal: 'Terminal Passeggeri' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal Passeggeri' }
    ],
    amenities: [
      {
        id: 'ibz-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi "Airport Free Wi-Fi Aena"',
        title_en: 'Aena Airport Free Wi-Fi',
        terminal: 'Terminal Passeggeri',
        location_it: 'Intero aeroporto',
        location_en: 'Entire terminal',
        details_it: 'Accesso internet gratuito illimitato con registrazione rapida.',
        details_en: 'Free unlimited internet access via quick registration.'
      }
    ],
    venues: [
      {
        id: 'ibz-v1',
        name: 'StrEat Food Market',
        category: 'dining',
        terminal: 'Terminal Passeggeri',
        location: 'Piano 1 - Area Imbarchi',
        hours: '05:00 - 23:30',
        isEarlyMorning: true,
        serviceType: 'quick_bite',
        highlightNote_it: 'Tapas, panini gourmet, insalate e bevande rinfrescanti.',
        highlightNote_en: 'Tapas, gourmet sandwiches, fresh salads and chilled beverages.'
      }
    ],
    transports: [
      {
        id: 'ibz-bus10',
        type: 'bus',
        name_it: 'Bus Linea 10 (Ibiza Città / Porto)',
        name_en: 'Line 10 Bus (Ibiza Town / Port)',
        duration: '20-25 min',
        frequency: 'Ogni 15-20 minuti (estate), ogni 30 min (inverno)',
        estimatedCost: '3,60 €',
        pickupLocation_it: 'Fermata bus fronte Arrivi',
        pickupLocation_en: 'Bus stop in front of Arrivals',
        details_it: 'Collega l\'aeroporto con la stazione degli autobus di Ibiza Città e il porto per i traghetti verso Formentera.',
        details_en: 'Connects to Ibiza Town central bus terminal and port for Formentera ferries.'
      }
    ],
    lastUpdated: '2026-10-21'
  },

  // 🇦🇪 DUBAI (DXB) - Aeroporto Internazionale di Dubai
  DXB: {
    id: 'dxb',
    iata: 'DXB',
    icao: 'OMDB',
    name_it: 'Aeroporto Internazionale di Dubai',
    name_en: 'Dubai International Airport',
    city_it: 'Dubai',
    city_en: 'Dubai',
    country_it: 'Emirati Arabi Uniti',
    country_en: 'United Arab Emirates',
    countryCode: 'AE',
    officialWebsite: 'https://www.dubaiairports.ae',
    coordinates: { lat: 25.2532, lng: 55.3657 },
    difficultyRating: 4,
    difficultyLabel_it: 'Hub globale enorme, trenini interni',
    difficultyLabel_en: 'Massive global hub, internal trains',
    averageSecurityWaitMin: 20,
    recommendedArrivalHours: { domestic: 3, international: 3.5 },
    navigationAdvice_it: 'Uno degli aeroporti più trafficati al mondo. Il Terminal 3 (hub Emirates) è immenso e si divide nei Concourse A, B e C, collegati da un trenino automatico sotterraneo. Pianificare almeno 20-30 minuti per raggiungere il gate.',
    navigationAdvice_en: 'One of the world\'s busiest hubs. Terminal 3 (Emirates) comprises Concourses A, B, and C connected by an automated people mover. Allow at least 20-30 minutes to walk to your gate.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Scanner di sicurezza avanzati e Smart Gates per il controllo passaporti biometrico.',
      scannersNote_en: 'Advanced security scanners and biometric Smart Gates for immigration.',
      liquidsAllowance_it: 'Massimo 100ml per contenitore in sacchetto trasparente richiudibile da 1 litro',
      liquidsAllowance_en: 'Max 100ml per container in 1-litre transparent resealable bag',
      liquidsMustBeRemoved: true,
      liquidsNote_it: 'Attenzione: medicinali con codeina o sostanze controllate richiedono prescrizione medica preventiva.',
      liquidsNote_en: 'Note: medications containing codeine or controlled substances require official prior medical approval.',
      electronicsInBag: true,
      electronicsNote_it: 'Grazie agli scanner CT avanzati al Terminal 3, i laptop possono spesso rimanere all\'interno della borsa.',
      electronicsNote_en: 'With advanced CT scanners in Terminal 3, laptops can often remain inside bags.',
      droneAllowedInCabin: false,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni severamente vietati negli EAU senza previa registrazione ed esplicito permesso GCAA. Non trasportare.',
      dronePolicy_en: 'Drones strictly prohibited in UAE without prior GCAA registration and permit. Do not carry.',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Solo nel bagaglio a mano fino a 100Wh (fino a 160Wh con autorizzazione compagnia). Mai in stiva.',
      powerbankPolicy_en: 'Cabin baggage only up to 100Wh (up to 160Wh with airline approval). Strictly forbidden in checked baggage.',
      officialSourceUrl: 'https://www.dubaiairports.ae/before-you-fly/security-customs',
      lastVerifiedDate: '2026-10-21'
    },
    terminals: [
      {
        id: 't3',
        name: 'Terminal 3 (Emirates & Flydubai)',
        transferInfo_it: 'Dedicato a tutti i voli Emirates e parte di Flydubai. Concourse A, B, C collegati con People Mover.',
        transferInfo_en: 'Dedicated to Emirates and select Flydubai flights. Automated train connects Concourses A, B, and C.'
      },
      {
        id: 't1',
        name: 'Terminal 1 (Compagnie Internazionali)',
        transferInfo_it: 'Terminal per tutte le altre compagnie aeree internazionali, collegato al Concourse D.',
        transferInfo_en: 'Used by all other international carriers, connected to Concourse D via train.'
      },
      {
        id: 't2',
        name: 'Terminal 2 (Low Cost / Regionali)',
        transferInfo_it: 'Situato sul lato opposto delle piste, usato per voli charter e parte di Flydubai.',
        transferInfo_en: 'Located on the opposite side of the runway, serves regional and charter flights.'
      }
    ],
    airlines: [
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Terminal 3', checkInZone: 'Tutti i banchi T3' },
      { airlineName: 'Flydubai', iataCode: 'FZ', terminal: 'Terminal 2 / 3', checkInZone: 'Vedi biglietto' },
      { airlineName: 'British Airways', iataCode: 'BA', terminal: 'Terminal 1', checkInZone: 'Concourse D' },
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal 1', checkInZone: 'Concourse D' }
    ],
    amenities: [
      {
        id: 'dxb-power',
        category: 'power_charging',
        title_it: 'Aree di ricarica universali e USB',
        title_en: 'Universal Power & USB Charging Stations',
        terminal: 'Terminal 1, 2, 3',
        location_it: 'Presso tutte le porte d\'imbarco e aree d\'attesa',
        location_en: 'At all boarding gates and seating zones',
        details_it: 'Prese multipresa compatibili con spine UK (Tipo G), Europee (Tipo C) e porte USB veloci.',
        details_en: 'Universal outlets compatible with UK (Type G) and EU (Type C) plugs, plus fast USB ports.',
        availability: 'abundant'
      },
      {
        id: 'dxb-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi "DXB Free WiFi"',
        title_en: 'DXB Free High-Speed WiFi',
        terminal: 'Tutti i Terminal',
        location_it: 'Intero scalo aeroportuale',
        location_en: 'Airport-wide',
        details_it: 'Connessione Wi-Fi ultra-veloce illimitata con un solo clic.',
        details_en: 'Unlimited high-speed internet access with a single tap.'
      },
      {
        id: 'dxb-water',
        category: 'water_refill',
        title_it: 'Fontanelle acqua fresca potabile',
        title_en: 'Drinking Water Fountains',
        terminal: 'Tutti i Terminal',
        location_it: 'Adiacenti a tutte le aree servizi igienici airside',
        location_en: 'Next to all airside restroom facilities',
        details_it: 'Erogatori gratuiti per riempire borracce termiche dopo i controlli.',
        details_en: 'Free refill stations for water bottles past security.'
      }
    ],
    venues: [
      {
        id: 'dxb-v1',
        name: 'Costa Coffee & Starbucks (H24)',
        category: 'cafe',
        terminal: 'Terminal 3 (Concourse A, B, C)',
        location: 'Airside - Molteplici punti',
        hours: 'Aperto 24 ore su 24',
        is24Hours: true,
        serviceType: 'coffee_snack',
        highlightNote_it: 'Caffè specialty, bevande fredde e snack aperti giorno e notte.',
        highlightNote_en: 'Specialty coffee, pastries, and cold beverages open 24/7.'
      },
      {
        id: 'dxb-v2',
        name: 'The Daily DXB / Food Court H24',
        category: 'dining',
        terminal: 'Terminal 3 - Concourse B',
        location: 'Piano Mezzanino partenze',
        hours: 'Aperto 24 ore su 24',
        is24Hours: true,
        serviceType: 'table_service',
        highlightNote_it: 'Cucina internazionale, mediorientale, asiatica e fast food operativi h24.',
        highlightNote_en: 'International, Middle Eastern, and Asian cuisines open 24/7.'
      }
    ],
    transports: [
      {
        id: 'dxb-metro',
        type: 'metro',
        name_it: 'Metro di Dubai (Linea Rossa)',
        name_en: 'Dubai Metro (Red Line)',
        duration: '20-25 min',
        frequency: 'Ogni 4-7 minuti (dalle 05:00 a mezzanotte / 01:00 nei weekend)',
        estimatedCost: '5,00 - 7,50 AED (circa 1,30 - 2,00 €)',
        pickupLocation_it: 'Stazioni Metro dedicate all\'interno del Terminal 1 e Terminal 3',
        pickupLocation_en: 'Dedicated Metro stations inside Terminal 1 and Terminal 3',
        details_it: 'Il mezzo più veloce ed economico per raggiungere Downtown Dubai (Burj Khalifa/Dubai Mall), DIFC e Dubai Marina. Necessaria tessera Nol Card acquistabile in stazione.',
        details_en: 'Fastest direct transit to Downtown Dubai (Burj Khalifa/Dubai Mall) and Dubai Marina. Requires a Nol Card available at stations.'
      },
      {
        id: 'dxb-taxi',
        type: 'taxi',
        name_it: 'Dubai Taxi Corporation (DTC) Ufficiale',
        name_en: 'Official Dubai Airport Taxi (DTC)',
        duration: '15-20 min',
        frequency: 'Disponibile h24 all\'uscita di ogni terminal',
        estimatedCost: '60 - 100 AED (circa 15 - 25 € per Downtown)',
        pickupLocation_it: 'Corsie taxi ufficiali all\'esterno di T1, T2 e T3',
        pickupLocation_en: 'Official taxi ranks outside Arrivals at T1, T2, and T3',
        details_it: 'I taxi dell\'aeroporto applicano una quota di partenza fissa di 25 AED più tassametro. Pagamento con carta di credito contactless accettato su tutti i veicoli.',
        details_en: 'Airport taxis have a 25 AED flag fall plus meter. Contactless credit cards accepted in all cabs.'
      }
    ],
    lastUpdated: '2026-10-21'
  },

  // 🇭🇰 HONG KONG (HKG) - Aeroporto Internazionale di Hong Kong (Chek Lap Kok)
  HKG: {
    id: 'hkg',
    iata: 'HKG',
    icao: 'VHHH',
    name_it: 'Aeroporto Internazionale di Hong Kong',
    name_en: 'Hong Kong International Airport',
    city_it: 'Hong Kong',
    city_en: 'Hong Kong',
    country_it: 'Hong Kong (Cina)',
    country_en: 'Hong Kong (China)',
    countryCode: 'HK',
    officialWebsite: 'https://www.hongkongairport.com',
    coordinates: { lat: 22.308, lng: 113.9185 },
    difficultyRating: 3,
    difficultyLabel_it: 'Grande hub all\'avanguardia e scorrevole',
    difficultyLabel_en: 'State-of-the-art streamlined mega-hub',
    averageSecurityWaitMin: 12,
    recommendedArrivalHours: { domestic: 2.5, international: 3 },
    navigationAdvice_it: 'Hub modernissimo e celebre per la sua efficienza. Dotato del treno interno Automated People Mover (APM) che collega le varie sezioni del Terminal 1. Il treno Airport Express porta direttamente a Central in soli 24 minuti.',
    navigationAdvice_en: 'Renowned for world-class efficiency. Automated People Mover (APM) connects T1 concourses. Airport Express train reaches Central in 24 minutes.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Nuovi canali smart con tecnologia CT 3D. Computer e liquidi conformi possono rimanere nel bagaglio.',
      scannersNote_en: 'Smart security channels with 3D CT scanners. Compliant liquids and laptops stay in bags.',
      liquidsAllowance_it: 'Flaconi max 100ml in busta trasparente da 1 litro',
      liquidsAllowance_en: 'Max 100ml containers in 1-litre transparent bag',
      liquidsMustBeRemoved: false,
      liquidsNote_it: 'Sui nuovi canali con scanner CT non è necessario estrarre i liquidi.',
      liquidsNote_en: 'On newly upgraded CT lanes, removing liquids is no longer required.',
      electronicsInBag: true,
      electronicsNote_it: 'I laptop e tablet possono rimanere all\'interno delle borse.',
      electronicsNote_en: 'Laptops and tablets remain inside luggage during scan.',
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Consentito solo in cabina con batterie entro 100Wh.',
      dronePolicy_en: 'Cabin baggage only with batteries under 100Wh.',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Severamente vietati nel bagaglio da stiva! Consentiti solo in cabina fino a 100Wh (max 2 pezzi fino a 160Wh).',
      powerbankPolicy_en: 'Strictly prohibited in checked luggage! Permitted in cabin luggage only up to 100Wh.',
      officialSourceUrl: 'https://www.hongkongairport.com/en/passenger-guide/airport-security/',
      lastVerifiedDate: '2026-10-21'
    },
    terminals: [
      {
        id: 't1',
        name: 'Terminal 1',
        transferInfo_it: 'Terminal passeggeri principale con concourse centrale e satellite collegati da treno APM.',
        transferInfo_en: 'Main passenger terminal with Midfield and North Satellite Concourses connected by APM train.'
      }
    ],
    airlines: [
      { airlineName: 'Cathay Pacific', iataCode: 'CX', terminal: 'Terminal 1', checkInZone: 'Corsie A-C' },
      { airlineName: 'Hong Kong Airlines', iataCode: 'HX', terminal: 'Terminal 1', checkInZone: 'Corsia K' },
      { airlineName: 'Singapore Airlines', iataCode: 'SQ', terminal: 'Terminal 1', checkInZone: 'Corsia F' },
      { airlineName: 'Emirates', iataCode: 'EK', terminal: 'Terminal 1', checkInZone: 'Corsia J' }
    ],
    amenities: [
      {
        id: 'hkg-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi Gratuito "#HKAirport Free WiFi"',
        title_en: '#HKAirport Free WiFi',
        terminal: 'Terminal 1',
        location_it: 'Tutte le aree dell\'aeroporto',
        location_en: 'Throughout the airport',
        details_it: 'Wi-Fi gratuito ad altissima velocità senza limiti.',
        details_en: 'Free ultra high-speed internet without time limit.'
      },
      {
        id: 'hkg-water',
        category: 'water_refill',
        title_it: 'Distributori di acqua potabile calda e fredda',
        title_en: 'Hot & Cold Drinking Water Dispensers',
        terminal: 'Terminal 1',
        location_it: 'Presso ogni gate d\'imbarco',
        location_en: 'Near every departure gate',
        details_it: 'Erogatori sia di acqua fresca che calda (per tè o noodles) gratuiti.',
        details_en: 'Free hot and cold water dispensers throughout departure concourses.'
      }
    ],
    venues: [
      {
        id: 'hkg-v1',
        name: 'Duddell\'s & Tai Cheong Bakery',
        category: 'dining',
        terminal: 'Terminal 1',
        location: 'Food Court Partenze - Livello 7',
        hours: '06:00 - 23:00',
        isEarlyMorning: true,
        serviceType: 'quick_bite',
        highlightNote_it: 'Famose egg tarts calde di Hong Kong e dim sum cantonesi.',
        highlightNote_en: 'Famous Hong Kong warm egg tarts and traditional Cantonese dim sum.'
      }
    ],
    transports: [
      {
        id: 'hkg-express',
        type: 'train',
        name_it: 'Airport Express (MTR)',
        name_en: 'Airport Express Train (MTR)',
        duration: '24 min',
        frequency: 'Ogni 10 minuti',
        estimatedCost: '115 HKD (circa 13,50 € per Hong Kong Station/Central)',
        pickupLocation_it: 'Banchina treni direttamente all\'interno della hall Arrivi',
        pickupLocation_en: 'Train platform located directly inside the Arrivals Hall',
        details_it: 'Il collegamento ferroviario più rapido e comodo del mondo per raggiungere Kowloon e Central/Isola di Hong Kong. Nessun tornello alla partenza, si paga all\'arrivo con Octopus o carta contactless.',
        details_en: 'Direct high-speed railway to Kowloon and Hong Kong Station (Central). Tap & go with Octopus or contactless credit cards.'
      },
      {
        id: 'hkg-bus',
        type: 'bus',
        name_it: 'Cityflyer Express Bus (Linee A11, A21)',
        name_en: 'Cityflyer Airport Bus (A11 to Central, A21 to TST)',
        duration: '45-60 min',
        frequency: 'Ogni 10-15 minuti',
        estimatedCost: '35 - 45 HKD (circa 4 - 5 €)',
        pickupLocation_it: 'Ground Transportation Centre (uscita Arrivi a destra)',
        pickupLocation_en: 'Ground Transportation Centre outside Arrivals',
        details_it: 'Autobus panoramici a due piani per raggiungere direttamente gli hotel di Kowloon (A21) e Hong Kong Island (A11).',
        details_en: 'Scenic double-decker express buses serving Kowloon (A21) and Hong Kong Island (A11).'
      }
    ],
    lastUpdated: '2026-10-21'
  }
};

/**
 * Common city name aliases mapped strictly to official 3-letter IATA codes.
 */
export const CITY_TO_IATA: Record<string, string> = {
  // Middle East & Asia
  DUBAI: 'DXB',
  'HONG KONG': 'HKG',
  HONGKONG: 'HKG',
  SINGAPORE: 'SIN',
  BANGKOK: 'BKK',
  DOHA: 'DOH',
  'ABU DHABI': 'AUH',
  ABUDHABI: 'AUH',
  TOKYO: 'HND',

  // Americas
  'NEW YORK': 'JFK',
  NEWYORK: 'JFK',
  MIAMI: 'MIA',
  CHICAGO: 'ORD',
  'LOS ANGELES': 'LAX',

  // Italy
  ROMA: 'FCO',
  ROME: 'FCO',
  MILANO: 'MXP',
  MILAN: 'MXP',
  NAPOLI: 'NAP',
  NAPLES: 'NAP',
  BARI: 'BRI',
  BOLOGNA: 'BLQ',
  PISA: 'PSA',
  FIRENZE: 'FLR',
  FLORENCE: 'FLR',
  TORINO: 'TRN',
  TURIN: 'TRN',
  PALERMO: 'PMO',
  CATANIA: 'CTA',
  CAGLIARI: 'CAG',
  OLBIA: 'OLB',
  VERONA: 'VRN',
  VENEZIA: 'VCE',
  VENICE: 'VCE',
  TREVISO: 'TSF',
  BRINDISI: 'BDS',
  LAMEZIA: 'SUF',
  TRIESTE: 'TRS',
  ALGHERO: 'AHO',

  // Spain & Islands
  MADRID: 'MAD',
  BARCELLONA: 'BCN',
  BARCELONA: 'BCN',
  IBIZA: 'IBZ',
  PALMA: 'PMI',
  MALLORCA: 'PMI',
  'PALMA DI MAIORCA': 'PMI',
  TENERIFE: 'TFS',
  'TENERIFE SUR': 'TFS',
  'GRAN CANARIA': 'LPA',
  GRANCANARIA: 'LPA',
  'LAS PALMAS': 'LPA',
  LANZAROTE: 'ACE',
  FUERTEVENTURA: 'FUE',
  MALAGA: 'AGP',
  SIVIGLIA: 'SVQ',
  SEVILLA: 'SVQ',
  VALENCIA: 'VLC',
  ALICANTE: 'ALC',

  // Europe Hubs
  LONDRA: 'LHR',
  LONDON: 'LHR',
  PARIGI: 'CDG',
  PARIS: 'CDG',
  BERLINO: 'BER',
  BERLIN: 'BER',
  MONACO: 'MUC',
  MUNICH: 'MUC',
  FRANCOFORTE: 'FRA',
  FRANKFURT: 'FRA',
  AMSTERDAM: 'AMS',
  VIENNA: 'VIE',
  DUBLINO: 'DUB',
  DUBLIN: 'DUB',
  LISBONA: 'LIS',
  LISBON: 'LIS',
  PORTO: 'OPO',
  FARO: 'FAO',
  BRUXELLES: 'BRU',
  BRUSSELS: 'BRU',
  CHARLEROI: 'CRL',
  PRAGA: 'PRG',
  PRAGUE: 'PRG',
  VARSAVIA: 'WAW',
  WARSAW: 'WAW',
  CRACOVIA: 'KRK',
  KRAKOW: 'KRK',
  BUDAPEST: 'BUD',
  ZURIGO: 'ZRH',
  ZURICH: 'ZRH',
  GINEVRA: 'GVA',
  GENEVA: 'GVA',
  COPENAGHEN: 'CPH',
  COPENHAGEN: 'CPH',
  STOCCOLMA: 'ARN',
  STOCKHOLM: 'ARN',
  HELSINKI: 'HEL',
  OSLO: 'OSL',

  // Greece & Mediterranean
  ATENE: 'ATH',
  ATHENS: 'ATH',
  CRETA: 'HER',
  HERAKLION: 'HER',
  RODI: 'RHO',
  RHODES: 'RHO',
  CORFU: 'CFU',
  CORFÙ: 'CFU',
  SANTORINI: 'JTR',
  MYKONOS: 'JMK',
  ISTANBUL: 'IST',
  TIRANA: 'TIA'
};
