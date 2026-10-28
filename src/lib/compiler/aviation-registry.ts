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
  },

  // 🇩🇪 BERLINO (BER) - Aeroporto di Berlino-Brandeburgo Willy Brandt
  BER: {
    id: 'ber',
    iata: 'BER',
    icao: 'EDDB',
    name_it: 'Aeroporto di Berlino-Brandeburgo Willy Brandt',
    name_en: 'Berlin Brandenburg Airport Willy Brandt',
    city_it: 'Berlino',
    city_en: 'Berlin',
    country_it: 'Germania',
    country_en: 'Germany',
    countryCode: 'DE',
    officialWebsite: 'https://ber.berlin-airport.de',
    coordinates: { lat: 52.3667, lng: 13.5033 },
    difficultyRating: 3,
    difficultyLabel_it: 'Grande hub passeggeri',
    difficultyLabel_en: 'Major passenger hub',
    averageSecurityWaitMin: 18,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Hub principale articolato sui Terminal 1 e 2. Il T1 ospita il salone check-in centrale su più livelli con collegamenti sotterranei diretti alla stazione ferroviaria.',
    navigationAdvice_en: 'Main hub spanning Terminal 1 and 2. T1 features a central multi-level departures hall with direct basement access to the train station.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Presenza di moderni scanner computarizzati CT 3D su diverse corsie del Terminal 1. Nei varchi CT i liquidi e i dispositivi elettronici possono rimanere all\'interno del bagaglio a mano.',
      scannersNote_en: 'Advanced CT 3D computer tomography scanners deployed across multiple lanes in T1. In CT lanes liquids and electronic devices remain inside hand luggage.',
      liquidsAllowance_it: 'Limite provvisorio UE di 100ml a flacone. Nelle corsie con scanner CT 3D del Terminal 1 i liquidi e i dispositivi elettronici possono rimanere all\'interno del bagaglio a mano senza estrarli; nelle corsie convenzionali si applica la regola classica del sacchetto trasparente.',
      liquidsAllowance_en: 'Temporary EU 100ml container cap applies. In Terminal 1 CT 3D lanes, liquids and electronics stay packed inside your bag; in standard lanes, traditional plastic bag extraction is required.',
      liquidsMustBeRemoved: false,
      liquidsNote_it: 'Regola differenziata in base alla corsia assegnata: seguire le istruzioni del personale di sicurezza al varco.',
      liquidsNote_en: 'Lane-dependent rule: follow directions from security agents at your assigned lane.',
      electronicsInBag: true,
      electronicsNote_it: 'Nelle corsie CT 3D laptop e tablet restano nella borsa; vanno estratti solo se indirizzati a corsia standard.',
      electronicsNote_en: 'Laptops and tablets stay inside luggage in CT 3D lanes; only remove if directed to standard lane.',
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Ammesso in cabina con batterie protette contro i cortocircuiti (max 100Wh).',
      dronePolicy_en: 'Permitted in cabin luggage only with terminals insulated (max 100Wh).',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Ammessi solo in cabina fino a 100Wh (max 2 unità a persona). Vietati in stiva.',
      powerbankPolicy_en: 'Carry-on only up to 100Wh (max 2 per traveler). Strictly prohibited in checked baggage.',
      terminalRules: [
        {
          terminalName: 'Terminal 1',
          has3DScanners: true,
          liquidsAllowedInBag: true,
          electronicsInBag: true,
          bottleAllowance_it: 'Max 100ml per flacone (direttiva UE); restano nella valigia',
          bottleAllowance_en: 'Max 100ml per container (EU cap); stay inside bag',
          notes_it: 'Corsie con scanner CT 3D attive per la maggioranza dei voli internazionali.',
          notes_en: 'CT 3D scanner lanes active for most international departures.'
        },
        {
          terminalName: 'Terminal 2',
          has3DScanners: false,
          liquidsAllowedInBag: false,
          electronicsInBag: false,
          bottleAllowance_it: 'Limite 100ml in sacchetto trasparente',
          bottleAllowance_en: '100ml limit in transparent bag',
          notes_it: 'Corsie convenzionali per vettori low-cost: estrarre liquidi ed elettronica.',
          notes_en: 'Standard lanes for low-cost carriers: remove liquids and electronics.'
        }
      ],
      officialSourceUrl: 'https://ber.berlin-airport.de/en/flying/security-controls.html',
      lastVerifiedDate: '2026-10-28'
    },
    terminals: [
      {
        id: 't1',
        name: 'Terminal 1',
        transferInfo_it: 'Terminal principale collegato alla stazione ferroviaria sotterranea.',
        transferInfo_en: 'Main terminal directly connected to the underground train station.'
      },
      {
        id: 't2',
        name: 'Terminal 2',
        transferInfo_it: 'Terminal dedicato prevalentemente a compagnie point-to-point (Ryanair, Wizz Air).',
        transferInfo_en: 'Terminal dedicated mainly to low-cost point-to-point carriers.'
      }
    ],
    airlines: [
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal 1' },
      { airlineName: 'Eurowings', iataCode: 'EW', terminal: 'Terminal 1' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 1' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 2' }
    ],
    amenities: [
      {
        id: 'ber-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi gratuito ad alta velocità "_BER Free Wi-Fi"',
        title_en: 'High-Speed Free Wi-Fi "_BER Free Wi-Fi"',
        terminal: 'Terminal 1 & 2',
        location_it: 'Copertura in tutto l\'aeroporto',
        location_en: 'Airport-wide coverage',
        details_it: 'Connessione gratuita illimitata e veloce 24/7.',
        details_en: 'Unlimited high-speed 24/7 internet without time restrictions.'
      },
      {
        id: 'ber-water',
        category: 'water_refill',
        title_it: 'Fontanelle acqua potabile gratuita',
        title_en: 'Free Drinking Water Fountains',
        terminal: 'Terminal 1 & 2',
        location_it: 'Area imbarchi vicino ai gruppi di servizi igienici',
        location_en: 'Airside near main restroom facilities',
        details_it: 'Erogatori gratuiti per riempire borracce e bottiglie vuote dopo i controlli.',
        details_en: 'Free refill stations for empty reusable bottles past security.'
      },
      {
        id: 'ber-power',
        category: 'power_charging',
        title_it: 'Postazioni di ricarica dispositivi USB e prese 230V',
        title_en: 'Device Charging Outlets & USB Ports',
        terminal: 'Terminal 1 & 2',
        location_it: 'Integrate nei banchi di lavoro e nelle sedute gate',
        location_en: 'Integrated into gate seating and work benches',
        details_it: 'Prese universali e porte USB disponibili per passeggeri.',
        details_en: 'Power sockets and USB charging points available for passengers.'
      }
    ],
    venues: [
      {
        id: 'ber-v1',
        name: 'Curry 36 BER',
        category: 'grab_and_go',
        terminal: 'Terminal 1',
        location: 'Airside - Market Place Gate A',
        hours: '05:00 - 22:00',
        isEarlyMorning: true,
        serviceType: 'quick_bite',
        highlightNote_it: 'Celebre Currywurst berlinese tradizionale con patatine calde.',
        highlightNote_en: 'Iconic Berlin traditional currywurst with warm fries.'
      },
      {
        id: 'ber-v2',
        name: 'Käfer Berlin Restaurant',
        category: 'dining',
        terminal: 'Terminal 1',
        location: 'Piano partenze T1',
        hours: '06:00 - 21:00',
        isEarlyMorning: true,
        serviceType: 'table_service',
        highlightNote_it: 'Cucina tedesca e internazionale con vista panoramica pista.',
        highlightNote_en: 'German and international cuisine with airfield view.'
      }
    ],
    transports: [
      {
        id: 'ber-train',
        type: 'train',
        name_it: 'Treno Veloce Airport Express (FEX)',
        name_en: 'Airport Express Train (FEX)',
        duration: '30 min',
        frequency: 'Ogni 30 minuti',
        estimatedCost: '4,40 € (tariffa ABC)',
        pickupLocation_it: 'Stazione sotterranea T1/T2 (binari 1-2)',
        pickupLocation_en: 'Underground rail station T1/T2 (tracks 1-2)',
        details_it: 'Collegamento ferroviario veloce non-stop tra l\'aeroporto e Berlino Hauptbahnhof (Stazione Centrale) e Ostkreuz.',
        details_en: 'Fast express train directly connecting the airport with Berlin Central Station and Ostkreuz.'
      },
      {
        id: 'ber-sbahn',
        type: 'metro',
        name_it: 'Linee S-Bahn S9 e S45',
        name_en: 'S-Bahn Commuter Rail Lines S9 & S45',
        duration: '45-50 min',
        frequency: 'Ogni 10-20 minuti',
        estimatedCost: '4,40 € (tariffa ABC)',
        pickupLocation_it: 'Stazione sotterranea BER',
        pickupLocation_en: 'Underground railway station',
        details_it: 'Collega comodamente tutti i principali quartieri di Berlino (Alexanderplatz, Zoologischer Garten).',
        details_en: 'Connects directly with major Berlin central hubs including Alexanderplatz.'
      }
    ],
    lastUpdated: '2026-10-22'
  },

  // 🇬🇷 CRETA / HERAKLION (HER) - Aeroporto di Candia Nikos Kazantzakis
  HER: {
    id: 'her',
    iata: 'HER',
    icao: 'LGIR',
    name_it: 'Aeroporto Internazionale di Candia Nikos Kazantzakis',
    name_en: 'Heraklion International Airport Nikos Kazantzakis',
    city_it: 'Heraklion (Creta)',
    city_en: 'Heraklion (Crete)',
    country_it: 'Grecia',
    country_en: 'Greece',
    countryCode: 'GR',
    officialWebsite: 'https://www.heraklion-airport.info',
    coordinates: { lat: 35.3397, lng: 25.1803 },
    difficultyRating: 3,
    difficultyLabel_it: 'Compatto con forte affollamento estivo',
    difficultyLabel_en: 'Compact with heavy summer traffic',
    averageSecurityWaitMin: 22,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Terminal unico molto frequentato in alta stagione. Consigliato presentarsi con dovuto anticipo e completare subito i controlli.',
    navigationAdvice_en: 'Single terminal experiencing heavy traffic in peak season. Arrive well in advance and proceed promptly to security.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner radiogeni convenzionali. È obbligatorio separare liquidi ed elettronica nelle vaschette prima del controllo.',
      scannersNote_en: 'Standard X-ray scanners. Liquids and electronics must be separated into trays before screening.',
      liquidsAllowance_it: 'Massimo 100ml per contenitore in sacchetto trasparente richiudibile da 1 litro',
      liquidsAllowance_en: 'Max 100ml per container in 1-litre clear resealable plastic bag',
      liquidsMustBeRemoved: true,
      liquidsNote_it: 'Tutti i liquidi oltre 100ml devono essere stivati.',
      liquidsNote_en: 'All containers exceeding 100ml must be in checked baggage.',
      electronicsInBag: false,
      electronicsNote_it: 'Laptop, fotocamere e tablet vanno estratti e disposti sul nastro.',
      electronicsNote_en: 'Laptops, cameras, and tablets must be placed in separate trays.',
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Ammesso in cabina con batterie isolate (max 100Wh).',
      dronePolicy_en: 'Permitted in cabin baggage only (max 100Wh).',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Ammessi solo nel bagaglio a mano fino a 100Wh.',
      powerbankPolicy_en: 'Allowed in carry-on only, up to 100Wh.',
      officialSourceUrl: 'https://www.ypa.gr',
      lastVerifiedDate: '2026-10-22'
    },
    terminals: [
      {
        id: 't1',
        name: 'Terminal Principale',
        transferInfo_it: 'Terminal unico per tutti i voli nazionali e charter internazionali.',
        transferInfo_en: 'Main passenger terminal handling all domestic and charter flights.'
      }
    ],
    airlines: [
      { airlineName: 'Aegean Airlines', iataCode: 'A3', terminal: 'Terminal Principale' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal Principale' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal Principale' },
      { airlineName: 'Volotea', iataCode: 'V7', terminal: 'Terminal Principale' }
    ],
    amenities: [
      {
        id: 'her-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi gratuito passeggeri',
        title_en: 'Free Passenger Wi-Fi',
        terminal: 'Terminal Principale',
        location_it: 'In tutte le sale d\'attesa',
        location_en: 'Terminal-wide waiting lounges',
        details_it: 'Connessione Wi-Fi gratuita disponibile all\'interno del terminal.',
        details_en: 'Free internet access provided across terminal areas.'
      },
      {
        id: 'her-water',
        category: 'water_refill',
        title_it: 'Punti acqua potabile',
        title_en: 'Drinking Water Points',
        terminal: 'Terminal Principale',
        location_it: 'Area imbarchi vicino ai servizi igienici',
        location_en: 'Departures area near restrooms',
        details_it: 'Fontanelle per riempire bottiglie d\'acqua dopo la sicurezza.',
        details_en: 'Fountains to refill empty bottles past security.'
      }
    ],
    venues: [
      {
        id: 'her-v1',
        name: 'Everest Cafe & Bakery',
        category: 'cafe',
        terminal: 'Terminal Principale',
        location: 'Area Partenze airside',
        hours: '04:30 - Ultimo volo',
        isEarlyMorning: true,
        serviceType: 'coffee_snack',
        highlightNote_it: 'Caffè greco e freddo espresso, spanakopita e panini caldi.',
        highlightNote_en: 'Greek freddo espresso, authentic spanakopita and warm pies.'
      }
    ],
    transports: [
      {
        id: 'her-bus',
        type: 'bus',
        name_it: 'Autobus Urbano KTEL Linea 1',
        name_en: 'KTEL Local Bus Line 1',
        duration: '15-20 min',
        frequency: 'Ogni 10-15 minuti',
        estimatedCost: '1,50 - 2,00 €',
        pickupLocation_it: 'Fermata bus piazzale antistante Arrivi',
        pickupLocation_en: 'Bus stop in front of Arrivals exit',
        details_it: 'Collega rapidamente l\'aeroporto con il centro di Heraklion e il porto dei traghetti.',
        details_en: 'Fast and cheap direct connection to central Heraklion and the ferry port.'
      },
      {
        id: 'her-taxi',
        type: 'taxi',
        name_it: 'Servizio Taxi Ufficiale Heraklion',
        name_en: 'Official Airport Taxi Rank',
        duration: '10-15 min',
        frequency: 'Disponibile 24/7 all\'uscita',
        estimatedCost: '15,00 - 20,00 €',
        pickupLocation_it: 'Corsia taxi fronte terminal Arrivi',
        pickupLocation_en: 'Taxi rank directly outside Arrivals',
        details_it: 'Tariffa fissa verso il centro città o tassametro per le località balneari di Creta.',
        details_en: 'Standard rates for city center and metered service for Crete resorts.'
      }
    ],
    lastUpdated: '2026-10-22'
  },

  // 🇩🇪 STOCCARDA (STR) - Aeroporto di Stoccarda Manfred Rommel
  STR: {
    id: 'str',
    iata: 'STR',
    icao: 'EDDS',
    name_it: 'Aeroporto di Stoccarda Manfred Rommel',
    name_en: 'Stuttgart Airport Manfred Rommel',
    city_it: 'Stoccarda',
    city_en: 'Stuttgart',
    country_it: 'Germania',
    country_en: 'Germany',
    countryCode: 'DE',
    officialWebsite: 'https://www.stuttgart-airport.com',
    coordinates: { lat: 48.6899, lng: 9.2219 },
    difficultyRating: 2,
    difficultyLabel_it: 'Aeroporto moderno ed efficiente',
    difficultyLabel_en: 'Modern and efficient airport',
    averageSecurityWaitMin: 14,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: '4 terminal passeggeri interconnessi a piedi sotto lo stesso tetto. La stazione della S-Bahn è situata direttamente al piano interrato del T1.',
    navigationAdvice_en: '4 interconnected passenger terminals under one roof. S-Bahn station is located directly beneath T1.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner radiogeni standard. Disporre liquidi (max 100ml) e dispositivi elettronici in vaschette separate.',
      scannersNote_en: 'Standard X-ray security. Place liquids (max 100ml) and electronic devices in separate bins.',
      liquidsAllowance_it: 'Massimo 100ml per flacone in sacchetto trasparente da 1 litro',
      liquidsAllowance_en: 'Max 100ml per container in 1-litre transparent bag',
      liquidsMustBeRemoved: true,
      liquidsNote_it: 'Tutti i flaconi superiori a 100ml devono essere stivati.',
      liquidsNote_en: 'Containers over 100ml must be in checked luggage.',
      electronicsInBag: false,
      electronicsNote_it: 'Estrarre laptop e tablet per il controllo a raggi X.',
      electronicsNote_en: 'Remove laptops and tablets for separate X-ray screening.',
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Ammesso nel bagaglio a mano con batterie protette (max 100Wh).',
      dronePolicy_en: 'Permitted in cabin luggage only (max 100Wh).',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Solo in cabina fino a 100Wh (vietato in stiva).',
      powerbankPolicy_en: 'Carry-on only up to 100Wh (prohibited in hold).',
      officialSourceUrl: 'https://www.stuttgart-airport.com/security-checks',
      lastVerifiedDate: '2026-10-22'
    },
    terminals: [
      {
        id: 't1',
        name: 'Terminal 1 & 2',
        transferInfo_it: 'Terminal principale collegato alla ferrovia per voli Star Alliance e network.',
        transferInfo_en: 'Main terminal connected to railway serving network airlines.'
      },
      {
        id: 't3',
        name: 'Terminal 3 & 4',
        transferInfo_it: 'Terminal per partenze europee e voli charter e low-cost.',
        transferInfo_en: 'Terminal for European departures, charter and low-cost flights.'
      }
    ],
    airlines: [
      { airlineName: 'Lufthansa', iataCode: 'LH', terminal: 'Terminal 1' },
      { airlineName: 'Eurowings', iataCode: 'EW', terminal: 'Terminal 1 & 2' },
      { airlineName: 'Condor', iataCode: 'DE', terminal: 'Terminal 3' }
    ],
    amenities: [
      {
        id: 'str-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi gratuito illimitato',
        title_en: 'Unlimited Free Wi-Fi',
        terminal: 'Terminal 1-4',
        location_it: 'Tutti i terminal',
        location_en: 'All terminals',
        details_it: 'Connessione internet gratuita 24h su tutta l\'area.',
        details_en: 'Free 24/7 high speed internet across all terminals.'
      },
      {
        id: 'str-water',
        category: 'water_refill',
        title_it: 'Fontanelle per borracce',
        title_en: 'Water Bottle Refill Fountains',
        terminal: 'Terminal 1 & 3',
        location_it: 'Presso i varchi imbarchi',
        location_en: 'Near departure gate restrooms',
        details_it: 'Erogatori gratuiti di acqua potabile dopo la sicurezza.',
        details_en: 'Free drinking water points past security check.'
      }
    ],
    venues: [
      {
        id: 'str-v1',
        name: 'Bäcker Bachmeier & Brezel Bar',
        category: 'cafe',
        terminal: 'Terminal 1',
        location: 'Airside - Area imbarchi T1',
        hours: '05:00 - 21:30',
        isEarlyMorning: true,
        serviceType: 'coffee_snack',
        highlightNote_it: 'Pretzel freschi svevi tradizionali, panini e caffè.',
        highlightNote_en: 'Fresh traditional Swabian pretzels, snacks and coffee.'
      }
    ],
    transports: [
      {
        id: 'str-sbahn',
        type: 'metro',
        name_it: 'S-Bahn Linee S2 e S3',
        name_en: 'S-Bahn Commuter Rail S2 & S3',
        duration: '27 min',
        frequency: 'Ogni 10-15 minuti',
        estimatedCost: '4,00 €',
        pickupLocation_it: 'Stazione sotterranea Terminal 1 (Livello -1)',
        pickupLocation_en: 'Underground rail station Terminal 1 (Level -1)',
        details_it: 'Collegamento diretto tra l\'aeroporto e Stoccarda Hauptbahnhof (Stazione Centrale).',
        details_en: 'Direct rapid rail to Stuttgart Central Station without transfers.'
      }
    ],
    lastUpdated: '2026-10-22'
  },

  // 🇲🇦 MARRAKECH (RAK) - Aeroporto di Marrakech-Menara
  RAK: {
    id: 'rak',
    iata: 'RAK',
    icao: 'GMMX',
    name_it: 'Aeroporto di Marrakech-Menara',
    name_en: 'Marrakesh Menara Airport',
    city_it: 'Marrakech',
    city_en: 'Marrakech',
    country_it: 'Marocco',
    country_en: 'Morocco',
    countryCode: 'MA',
    officialWebsite: 'https://www.onda.ma',
    coordinates: { lat: 31.6069, lng: -8.0363 },
    difficultyRating: 3,
    difficultyLabel_it: 'Controlli di polizia scrupolosi',
    difficultyLabel_en: 'Strict police & passport checks',
    averageSecurityWaitMin: 25,
    recommendedArrivalHours: { domestic: 2.5, international: 3 },
    navigationAdvice_it: 'Importante: le autorità marocchine richiedono quasi sempre la carta d\'imbarco cartacea stampata. Presentarsi al banco check-in per il timbro di visto prima dei controlli.',
    navigationAdvice_en: 'Important: Moroccan authorities almost always require a printed physical boarding pass. Stop at check-in for passport stamp before security.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner radiogeni convenzionali. Estrarre tutti i liquidi ed i dispositivi elettronici per il passaggio ai raggi X.',
      scannersNote_en: 'Standard X-ray scanners. Remove all liquids and electronics into trays.',
      liquidsAllowance_it: 'Massimo 100ml per contenitore in sacchetto trasparente da 1 litro',
      liquidsAllowance_en: 'Max 100ml per container in 1-litre transparent bag',
      liquidsMustBeRemoved: true,
      liquidsNote_it: 'Bottiglie e contenitori oltre 100ml devono essere stivati.',
      liquidsNote_en: 'Liquids over 100ml must be packed in checked luggage.',
      electronicsInBag: false,
      electronicsNote_it: 'Estrarre laptop, tablet e fotocamere.',
      electronicsNote_en: 'Remove laptops, tablets and cameras into trays.',
      droneAllowedInCabin: false,
      droneAllowedInHold: false,
      dronePolicy_it: 'Vietato severamente in Marocco senza previa autorizzazione ministeriale speciale.',
      dronePolicy_en: 'Strictly prohibited in Morocco without official ministerial clearance.',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Ammessi solo nel bagaglio a mano fino a 100Wh.',
      powerbankPolicy_en: 'Permitted in cabin baggage only up to 100Wh.',
      officialSourceUrl: 'https://www.onda.ma',
      lastVerifiedDate: '2026-10-22'
    },
    terminals: [
      {
        id: 't1',
        name: 'Terminal 1 & 2',
        transferInfo_it: 'Terminal modernizzati collegati tra loro a piedi per tutti i voli internazionali.',
        transferInfo_en: 'Modern connected terminals handling all international flights.'
      }
    ],
    airlines: [
      { airlineName: 'Royal Air Maroc', iataCode: 'AT', terminal: 'Terminal 1' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 1' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 1' }
    ],
    amenities: [
      {
        id: 'rak-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi gratuito aeroporto',
        title_en: 'Free Airport Wi-Fi',
        terminal: 'Terminal 1 & 2',
        location_it: 'In tutto il terminal',
        location_en: 'Throughout the terminal',
        details_it: 'Connessione Wi-Fi gratuita disponibile con registrazione base.',
        details_en: 'Free Wi-Fi available throughout departure areas.'
      }
    ],
    venues: [
      {
        id: 'rak-v1',
        name: 'Cafe Menara & Mint Tea Lounge',
        category: 'cafe',
        terminal: 'Terminal 1',
        location: 'Area Partenze post-sicurezza',
        hours: '05:00 - 23:00',
        isEarlyMorning: true,
        serviceType: 'coffee_snack',
        highlightNote_it: 'Tè alla menta tradizionale marocchino, pasticceria tipica e caffè.',
        highlightNote_en: 'Traditional Moroccan fresh mint tea, pastries and espresso.'
      }
    ],
    transports: [
      {
        id: 'rak-bus',
        type: 'bus',
        name_it: 'Autobus Espresso ALSA Linea 19',
        name_en: 'ALSA Airport Express Bus Line 19',
        duration: '20-25 min',
        frequency: 'Ogni 20-30 minuti',
        estimatedCost: '30 MAD (circa 2,80 € a/r)',
        pickupLocation_it: 'Uscita pedonale Terminal 1 a sinistra',
        pickupLocation_en: 'Terminal 1 exit on the left',
        details_it: 'Collega direttamente l\'aeroporto con Piazza Jemaa el-Fna, Bab Doukkala e la stazione ferroviaria.',
        details_en: 'Direct express bus to Jemaa el-Fna square and Marrakech Railway Station.'
      },
      {
        id: 'rak-taxi',
        type: 'taxi',
        name_it: 'Taxi Ufficiali Marrakech',
        name_en: 'Official Marrakech Airport Taxis',
        duration: '15 min',
        frequency: 'Disponibili 24/7',
        estimatedCost: '70 - 100 MAD (circa 7 - 10 €)',
        pickupLocation_it: 'Corsia taxi all\'esterno degli Arrivi',
        pickupLocation_en: 'Taxi ranks outside Arrivals',
        details_it: 'Tariffa fissa stabilita dal comune di Marrakech visibile sui cartelli informativi.',
        details_en: 'Fixed rate to Marrakech medina and Gueliz posted on official signboards.'
      }
    ],
    lastUpdated: '2026-10-22'
  },

  // 🇮🇹 ROMA URBE (QUR) - Aeroporto di Roma-Urbe (Aviazione Generale & Voli Privati)
  QUR: {
    id: 'qur',
    iata: 'QUR',
    icao: 'LIRU',
    name_it: 'Aeroporto di Roma-Urbe',
    name_en: 'Rome Urbe Airport',
    city_it: 'Roma',
    city_en: 'Rome',
    country_it: 'Italia',
    country_en: 'Italy',
    countryCode: 'IT',
    officialWebsite: 'https://www.enac.gov.it',
    classification: 'general_aviation',
    isGeneralAviation: true,
    classificationLabel_it: 'Aviazione Generale & Voli Privati',
    classificationLabel_en: 'General Aviation & Private Flights',
    classificationNotice_it: 'Questo scalo è dedicato esclusivamente ad aviazione generale, voli privati, aerotaxi, elisoccorso e scuola di volo. Non operano voli commerciali di linea passeggeri (per i voli di linea fare riferimento a Roma Fiumicino FCO o Roma Ciampino CIA).',
    classificationNotice_en: 'This facility is dedicated exclusively to general aviation, private executive flights, aerotaxis, emergency medical services and pilot training. No scheduled commercial airline flights operate from this airport (for commercial flights, refer to Rome Fiumicino FCO or Ciampino CIA).',
    coordinates: { lat: 41.9519, lng: 12.5028 },
    difficultyRating: 1,
    difficultyLabel_it: 'Scalo privato rapido',
    difficultyLabel_en: 'Fast private facility',
    averageSecurityWaitMin: 5,
    recommendedArrivalHours: { domestic: 0.75, international: 1 },
    navigationAdvice_it: 'Situato in Via Salaria 825. Accesso diretto dedicato per equipaggi, piloti e passeggeri di aerotaxi e voli privati. Presenza della sede dell\'Aero Club di Roma.',
    navigationAdvice_en: 'Located on Via Salaria 825 in northern Rome. Dedicated private handling facility for executive passengers, aerotaxis, and Aero Club members.',
    otherCityAirports: [
      { iata: 'FCO', name_it: 'Roma Fiumicino (Leonardo da Vinci)', name_en: 'Rome Fiumicino', distanceInfo: '32 km - Hub principale voli di linea' },
      { iata: 'CIA', name_it: 'Roma Ciampino (G.B. Pastine)', name_en: 'Rome Ciampino', distanceInfo: '15 km - Voli low-cost e linea' }
    ],
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Controlli di sicurezza dedicati all\'aviazione generale e controlli doganali/passaporti per voli executive.',
      scannersNote_en: 'Dedicated general aviation screening and private customs/immigration for executive flights.',
      liquidsAllowance_it: 'Normativa aviazione generale ENAC: controlli personalizzati per voli privati',
      liquidsAllowance_en: 'ENAC general aviation regulations: personalized executive screening',
      liquidsMustBeRemoved: true,
      electronicsInBag: false,
      electronicsNote_it: 'Dispositivi controllati al varco dedicato partenze private.',
      electronicsNote_en: 'Inspected at private executive departures checkpoint.',
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Ammesso a bordo per piloti e passeggeri privati secondo le disposizioni ENAC.',
      dronePolicy_en: 'Permitted on board under ENAC general aviation rules.',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Ammessi a bordo in cabina fino a 100Wh.',
      powerbankPolicy_en: 'Permitted in cabin up to 100Wh.',
      officialSourceUrl: 'https://www.enac.gov.it',
      lastVerifiedDate: '2026-10-22'
    },
    terminals: [
      {
        id: 't-urbe',
        name: 'Terminal Aviazione Generale & Executive Lounge',
        transferInfo_it: 'Palazzina passeggeri dedicata ai voli privati, aerotaxi e scuola di volo.',
        transferInfo_en: 'Executive passenger terminal for private flights, aerotaxis, and flying school.'
      }
    ],
    airlines: [
      { airlineName: 'Compagnie Aerotaxi & Voli Privati', iataCode: 'PVT', terminal: 'Terminal Aviazione Generale' }
    ],
    amenities: [
      {
        id: 'qur-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi gratuito Club House',
        title_en: 'Free Wi-Fi Club House',
        terminal: 'Terminal Aviazione Generale',
        location_it: 'Club house e lounge passeggeri',
        location_en: 'Club house and executive lounge',
        details_it: 'Connessione Wi-Fi per piloti e passeggeri executive.',
        details_en: 'Wi-Fi connectivity for pilots and private passengers.'
      }
    ],
    venues: [
      {
        id: 'qur-v1',
        name: 'Ristorante & Bar Club House Urbe',
        category: 'dining',
        terminal: 'Terminal Aviazione Generale',
        location: 'Palazzina principale fronte pista',
        hours: '08:00 - 20:00',
        isEarlyMorning: false,
        serviceType: 'table_service',
        highlightNote_it: 'Caffetteria e ristorante con vista diretta sulla pista di decollo.',
        highlightNote_en: 'Cafe and restaurant overlooking the private runway.'
      }
    ],
    transports: [
      {
        id: 'qur-taxi',
        type: 'taxi',
        name_it: 'Servizio Taxi & NCC Roma',
        name_en: 'Rome Taxi & Private Chauffeur (NCC)',
        duration: '15-20 min dal centro',
        frequency: 'Su prenotazione o chiamata taxi',
        estimatedCost: '15,00 - 25,00 € per il centro città',
        pickupLocation_it: 'Ingresso Via Salaria 825',
        pickupLocation_en: 'Main entrance Via Salaria 825',
        details_it: 'Collegamento rapido con il centro di Roma (Piazza di Spagna, Parioli, Stazione Termini).',
        details_en: 'Fast connection to central Rome and Termini Station via Via Salaria.'
      },
      {
        id: 'qur-bus',
        type: 'bus',
        name_it: 'Autobus Urbano ATAC (Linee 135, 235)',
        name_en: 'ATAC City Bus (Lines 135, 235)',
        duration: '25 min',
        frequency: 'Ogni 15-20 minuti',
        estimatedCost: '1,50 €',
        pickupLocation_it: 'Fermata Salaria / Aeroporto dell\'Urbe',
        pickupLocation_en: 'Bus stop outside Via Salaria main gate',
        details_it: 'Collega l\'aeroporto con la stazione ferroviaria FL1 Nuovo Salario e Piazza Vescovio.',
        details_en: 'Connects to FL1 commuter rail station and central Rome public transport.'
      }
    ],
    lastUpdated: '2026-10-22'
  },

  // 🇩🇿 DJANET (DJG) - Aeroporto di Djanet-Inedbirene
  DJG: {
    id: 'djg',
    iata: 'DJG',
    icao: 'DAAJ',
    name_it: 'Aeroporto di Djanet-Inedbirene',
    name_en: 'Djanet Inedbirene Airport',
    city_it: 'Djanet',
    city_en: 'Djanet',
    country_it: 'Algeria',
    country_en: 'Algeria',
    countryCode: 'DZ',
    officialWebsite: 'https://www.egsa-alger.dz',
    classification: 'commercial_scheduled',
    isGeneralAviation: false,
    coordinates: { lat: 24.2928, lng: 9.4522 },
    difficultyRating: 2,
    difficultyLabel_it: 'Scalo desertico compatto',
    difficultyLabel_en: 'Compact desert regional airport',
    averageSecurityWaitMin: 15,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Scalo principale per l\'accesso al parco nazionale del Tassili n\'Ajjer. Terminal compatto disposto su un unico livello.',
    navigationAdvice_en: 'Main gateway to the Tassili n\'Ajjer National Park. Compact single-level passenger terminal.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner radiogeni convenzionali. Obbligatorio separare liquidi ed elettronica.',
      scannersNote_en: 'Standard X-ray security screening. Liquids and electronics must be separated.',
      liquidsAllowance_it: 'Massimo 100ml per contenitore in sacchetto trasparente da 1 litro',
      liquidsAllowance_en: 'Max 100ml per container in 1L transparent bag',
      liquidsMustBeRemoved: true,
      electronicsInBag: false,
      electronicsNote_it: 'Laptop e tablet vanno estratti e posti in vaschetta.',
      electronicsNote_en: 'Laptops and tablets must be placed in separate bins.',
      droneAllowedInCabin: false,
      droneAllowedInHold: false,
      dronePolicy_it: 'Vietato severamente in Algeria senza autorizzazione ministeriale speciale.',
      dronePolicy_en: 'Strictly prohibited in Algeria without official defense clearance.',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Ammessi solo nel bagaglio a mano fino a 100Wh.',
      powerbankPolicy_en: 'Permitted in cabin luggage only, up to 100Wh.',
      officialSourceUrl: 'https://www.egsa-alger.dz',
      lastVerifiedDate: '2026-10-22'
    },
    terminals: [
      {
        id: 't1',
        name: 'Terminal Passeggeri',
        transferInfo_it: 'Terminal unico per arrivi e partenze nazionali e charter turistici.',
        transferInfo_en: 'Single passenger terminal for domestic flights and seasonal charters.'
      }
    ],
    airlines: [
      { airlineName: 'Air Algérie', iataCode: 'AH', terminal: 'Terminal Passeggeri' },
      { airlineName: 'Tassili Airlines', iataCode: 'SF', terminal: 'Terminal Passeggeri' }
    ],
    amenities: [
      {
        id: 'djg-cafe',
        category: 'wifi',
        title_it: 'Sala d\'attesa passeggeri',
        title_en: 'Passenger Waiting Hall',
        terminal: 'Terminal Passeggeri',
        location_it: 'Salone partenze',
        location_en: 'Departures hall',
        details_it: 'Area d\'attesa climatizzata con servizi igienici.',
        details_en: 'Air-conditioned waiting area with restrooms.'
      }
    ],
    venues: [
      {
        id: 'djg-v1',
        name: 'Buvette de l\'Aéroport Djanet',
        category: 'cafe',
        terminal: 'Terminal Passeggeri',
        location: 'Area Partenze',
        hours: 'Durante gli orari dei voli',
        isEarlyMorning: true,
        serviceType: 'coffee_snack',
        highlightNote_it: 'Tè caldo, caffè, bibite fresche e biscotti.',
        highlightNote_en: 'Tea, coffee, cold refreshments and snacks.'
      }
    ],
    transports: [
      {
        id: 'djg-trans',
        type: 'taxi',
        name_it: 'Navette 4x4 e Taxi Djanet',
        name_en: '4x4 Tour Shuttles & Local Taxis',
        duration: '25-30 min',
        frequency: 'In coincidenza con i voli di linea',
        estimatedCost: '1000 - 1500 DZD (circa 7 - 10 €)',
        pickupLocation_it: 'Piazzale esterno aeroporto',
        pickupLocation_en: 'Outside terminal exit',
        details_it: 'I trasferimenti verso gli hotel di Djanet o le guide sahariane sono solitamente organizzati con fuoristrada 4x4.',
        details_en: 'Transfers to Djanet hotels and desert expeditions typically operate with 4x4 vehicles.'
      }
    ],
    lastUpdated: '2026-10-22'
  },

  // 🇧🇸 BAHAMAS / NASSAU (NAS) - Aeroporto Internazionale Lynden Pindling
  NAS: {
    id: 'nas',
    iata: 'NAS',
    icao: 'MYNN',
    name_it: 'Aeroporto Internazionale Lynden Pindling',
    name_en: 'Lynden Pindling International Airport',
    city_it: 'Nassau',
    city_en: 'Nassau',
    country_it: 'Bahamas',
    country_en: 'Bahamas',
    countryCode: 'BS',
    officialWebsite: 'https://nassaulpia.com',
    coordinates: { lat: 25.039, lng: -77.466 },
    difficultyRating: 2,
    difficultyLabel_it: 'Snodo moderno con US Preclearance',
    difficultyLabel_en: 'Modern hub with US Preclearance',
    averageSecurityWaitMin: 25,
    recommendedArrivalHours: { domestic: 2, international: 3 },
    navigationAdvice_it: 'L\'aeroporto comprende tre terminal interconnessi: Terminal A (partenze USA con pre-controlli doganali CBP prima dell\'imbarco), Terminal B (arrivi internazionali) e Terminal C (partenze nazionali e voli internazionali non-USA). Per i voli verso gli Stati Uniti è fondamentale presentarsi con almeno 3 ore di anticipo.',
    navigationAdvice_en: 'Three connected terminals: Terminal A (US Departures with full US CBP Preclearance before boarding), Terminal B (International Arrivals), and Terminal C (Domestic and non-US Departures). Arrive at least 3 hours prior to US-bound flights to clear US border controls.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Scanner radiogeni convenzionali conformi agli standard TSA e ICAO. Liquidi, computer e tablet devono essere estratti e controllati separatamente.',
      scannersNote_en: 'Standard TSA and ICAO X-ray scanners. Liquids, laptops, and tablets must be placed in separate security bins.',
      liquidsAllowance_it: 'Massimo 100ml per flacone in sacchetto trasparente richiudibile da 1 litro',
      liquidsAllowance_en: 'Max 100ml per container in a 1-litre clear resealable plastic bag',
      liquidsMustBeRemoved: true,
      liquidsNote_it: 'Liquidi oltre 100ml ammessi solo se acquistati al duty-free dopo i controlli o imbarcati nel bagaglio in stiva.',
      liquidsNote_en: 'Liquids over 100ml must be placed in checked hold luggage or bought duty-free airside.',
      electronicsInBag: false,
      electronicsNote_it: 'Laptop, tablet e grandi dispositivi elettronici devono essere rimossi dal bagaglio a mano.',
      electronicsNote_en: 'Laptops, tablets, and large electronics must be removed from carry-on bags.',
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Ammesso solo nel bagaglio a mano con batterie LiPo protette (max 100Wh). Per l\'utilizzo sull\'arcipelago è richiesta la registrazione preventiva alla CAA Bahamas.',
      dronePolicy_en: 'Permitted in cabin luggage only with LiPo terminals isolated (max 100Wh). Operating drones in the Bahamas requires CAA Bahamas registration.',
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Ammessi esclusivamente nel bagaglio a mano fino a 100Wh (max 2 pezzi per passeggero). Severamente vietati in stiva.',
      powerbankPolicy_en: 'Allowed in carry-on baggage only up to 100Wh (max 2 per traveler). Strictly prohibited in checked luggage.',
      officialSourceUrl: 'https://nassaulpia.com',
      lastVerifiedDate: '2026-10-27'
    },
    terminals: [
      {
        id: 't-usa',
        name: 'Terminal A - U.S. Departures',
        transferInfo_it: 'Terminal dedicato a tutte le partenze verso gli Stati Uniti con dogana e controlli CBP.',
        transferInfo_en: 'Dedicated to US-bound flights with full US Customs and Border Protection Preclearance.'
      },
      {
        id: 't-int-arr',
        name: 'Terminal B - International Arrivals',
        transferInfo_it: 'Terminal arrivi internazionali, immigrazione Bahamas, ritiro bagagli e dogana.',
        transferInfo_en: 'Terminal for international arrivals, Bahamas immigration, baggage claim, and customs.'
      },
      {
        id: 't-dom-int',
        name: 'Terminal C - Domestic & International Non-U.S.',
        transferInfo_it: 'Partenze per le altre isole delle Bahamas (Out Islands) e voli internazionali non verso gli USA (Regno Unito, Canada, Caraibi).',
        transferInfo_en: 'Departures for Out Islands domestic flights and non-US international routes (UK, Canada, Caribbean).'
      }
    ],
    airlines: [
      { airlineName: 'Bahamasair', iataCode: 'UP', terminal: 'Terminal C' },
      { airlineName: 'British Airways', iataCode: 'BA', terminal: 'Terminal C' },
      { airlineName: 'American Airlines', iataCode: 'AA', terminal: 'Terminal A' },
      { airlineName: 'Delta Air Lines', iataCode: 'DL', terminal: 'Terminal A' },
      { airlineName: 'United Airlines', iataCode: 'UA', terminal: 'Terminal A' },
      { airlineName: 'JetBlue', iataCode: 'B6', terminal: 'Terminal A' },
      { airlineName: 'Air Canada', iataCode: 'AC', terminal: 'Terminal C' }
    ],
    amenities: [
      {
        id: 'nas-wifi',
        category: 'wifi',
        title_it: 'Rete Wi-Fi ad Alta Velocità',
        title_en: 'High-Speed Wi-Fi Network',
        terminal: 'Tutti i Terminal',
        location_it: 'Disponibile gratuitamente in tutte le sale passeggeri',
        location_en: 'Available free across all passenger areas',
        details_it: 'Connessione gratuita illimitata "LPIA Free Wi-Fi".',
        details_en: 'Complimentary unlimited "LPIA Free Wi-Fi" network.'
      },
      {
        id: 'nas-power',
        category: 'power_charging',
        title_it: 'Torrette di ricarica USB e prese USA',
        title_en: 'USB & US Power Charging Stations',
        terminal: 'Terminal A & C',
        location_it: 'Presso le poltrone dell\'area imbarchi',
        location_en: 'Integrated into boarding gate seating',
        details_it: 'Prese americane di tipo A/B a 120V e porte USB-A.',
        details_en: 'Standard US 120V Type A/B sockets and USB-A outlets.'
      },
      {
        id: 'nas-water',
        category: 'water_refill',
        title_it: 'Fontanelle d\'acqua potabile',
        title_en: 'Drinking Water Refill Stations',
        terminal: 'Tutti i Terminal',
        location_it: 'Dopo i controlli di sicurezza vicino ai servizi igienici',
        location_en: 'Airside near main restroom concourses',
        details_it: 'Erogatori gratuiti per riempire borracce vuote prima del volo.',
        details_en: 'Free refill stations for empty reusable bottles before boarding.'
      }
    ],
    venues: [
      {
        id: 'nas-v1',
        name: 'Dunkin\' Donuts LPIA',
        category: 'cafe',
        terminal: 'Terminal A & C',
        location: 'Area Partenze airside',
        hours: '05:00 - Ultimo volo',
        isEarlyMorning: true,
        serviceType: 'coffee_snack',
        highlightNote_it: 'Caffè espresso, ciambelle e colazioni calde prima dell\'imbarco.',
        highlightNote_en: 'Coffee, baked donuts and hot breakfast before flights.'
      },
      {
        id: 'nas-v2',
        name: 'Graycliff Divans Lounge & Restaurant',
        category: 'dining',
        terminal: 'Terminal A',
        location: 'Airside di fronte al Gate B22',
        hours: '07:00 - 19:00',
        isEarlyMorning: false,
        serviceType: 'table_service',
        highlightNote_it: 'Cucina bahamense gourmet, cioccolato artigianale e lounge relax.',
        highlightNote_en: 'Gourmet Bahamian cuisine, artisan chocolates and premium lounge.'
      }
    ],
    transports: [
      {
        id: 'nas-trans-taxi',
        type: 'taxi',
        name_it: 'Taxi Ufficiali Bahamas Metered/Fixed Rate',
        name_en: 'Official Bahamas Airport Taxis',
        duration: '25-35 min',
        frequency: 'Disponibili h24 all\'uscita Arrivi',
        estimatedCost: '35,00 - 45,00 $ (circa 32 - 42 €)',
        pickupLocation_it: 'Corsia taxi autorizzata all\'esterno del Terminal Arrivi',
        pickupLocation_en: 'Authorized taxi rank directly outside Arrivals exit',
        details_it: 'Tariffe regolamentate verso Downtown Nassau, Cable Beach e Paradise Island. Accettati dollari USA e Bahamian Dollars.',
        details_en: 'Regulated rates to Downtown Nassau, Cable Beach, and Paradise Island. US and Bahamian Dollars accepted 1:1.'
      },
      {
        id: 'nas-trans-car',
        type: 'bus',
        name_it: 'Autonoleggi e Navette Resort',
        name_en: 'Rental Cars & Resort Shuttles',
        duration: 'Variabile',
        frequency: 'In base alla prenotazione',
        estimatedCost: 'Incluso nel soggiorno o da 50 $/giorno',
        pickupLocation_it: 'Hall noleggi al Terminal Arrivi',
        pickupLocation_en: 'Car rental desks at Arrivals hall',
        details_it: 'Desk per Avis, Budget, Hertz e pick-up point per i bus navetta dei resort di Nassau e Paradise Island.',
        details_en: 'On-site desks for major car rentals and designated pickup for resort shuttle coaches.'
      }
    ],
    lastUpdated: '2026-10-27'
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

  // Americas & Caribbean
  'NEW YORK': 'JFK',
  NEWYORK: 'JFK',
  MIAMI: 'MIA',
  CHICAGO: 'ORD',
  'LOS ANGELES': 'LAX',
  BAHAMAS: 'NAS',
  NASSAU: 'NAS',
  'THE BAHAMAS': 'NAS',
  MALDIVE: 'MLE',
  MALDIVES: 'MLE',
  MALE: 'MLE',
  SEYCHELLES: 'SEZ',
  MAURITIUS: 'MRU',
  ZANZIBAR: 'ZNZ',
  BARBADOS: 'BGI',
  CUBA: 'HAV',
  HAVANA: 'HAV',
  AVANA: 'HAV',
  JAMAICA: 'KIN',
  KINGSTON: 'KIN',
  CAPOVERDE: 'RAI',
  'CAPO VERDE': 'RAI',
  ISLANDA: 'KEF',
  ICELAND: 'KEF',
  REYKJAVIK: 'KEF',
  MALTA: 'MLA',
  CIPRO: 'LCA',
  CYPRUS: 'LCA',

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
  TIRANA: 'TIA',

  // Germany additional hubs
  STOCCARDA: 'STR',
  STUTTGART: 'STR',

  // North Africa & Morocco
  MARRACASH: 'RAK',
  MARRAKECH: 'RAK',
  DJANET: 'DJG',

  // Regional & General Aviation
  'ROMA URBE': 'QUR',
  URBE: 'QUR'
};
