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
    officialMapUrl: 'https://www.prg.aero/en/interactive-map',
    coordinates: { lat: 50.1008, lng: 14.2600 },
    difficultyRating: 2,
    difficultyLabel_it: 'Fluido & Ben Organizzato (Filobus 59 e AE Express)',
    difficultyLabel_en: 'Smooth & Well Organized (Trolleybus 59 & AE Express)',
    averageSecurityWaitMin: 10,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Attenzione alla distinzione fondamentale dei terminal: il Terminal 2 è dedicato a tutti i voli all\'interno dell\'area Schengen (controllo di sicurezza centralizzato all\'ingresso dell\'area imbarchi). Il Terminal 1 è dedicato ai voli extra-Schengen (Regno Unito, USA, ecc.) dove i controlli di sicurezza si effettuano direttamente al singolo gate d\'imbarco prima di salire a bordo.',
    navigationAdvice_en: 'Crucial terminal distinction: Terminal 2 handles all Schengen flights (centralized security checkpoint before airside). Terminal 1 handles non-Schengen flights (UK, USA, etc.) where security screening is carried out directly at each individual departure gate.',
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Al Terminal 2 (voli Schengen verso l\'UE/Italia) sono pienamente operativi i nuovi scanner tomografici 3D CT di ultima generazione. Liquidi, bottiglie e computer possono rimanere nel bagaglio.',
      scannersNote_en: 'Terminal 2 (Schengen flights to EU/Italy) operates next-gen 3D CT scanners. Liquids, drink bottles, and laptops can stay inside your bag.',
      terminalRules: [
        {
          terminalName: 'Terminal 2 (Voli Schengen / UE / Italia)',
          has3DScanners: true,
          liquidsAllowedInBag: true,
          bottleAllowance_it: 'Bottiglie e liquidi nel bagaglio fino a 1L per contenitore senza estrarli',
          bottleAllowance_en: 'Beverage bottles & liquids in bag up to 1L per container without removal',
          electronicsInBag: true,
          notes_it: 'Varchi centralizzati al piano partenze con tomografia computerizzata 3D. Non è richiesta l\'estrazione di beauty-case né di bottiglie.',
          notes_en: 'Centralized departure screening with 3D CT scanners. No need to unpack liquids, bottles up to 1L, or laptops.'
        },
        {
          terminalName: 'Terminal 1 (Voli Extra-Schengen - UK, USA, ecc.)',
          has3DScanners: false,
          liquidsAllowedInBag: false,
          bottleAllowance_it: 'Limite 100ml in bustina trasparente da 1L da estrarre obbligatoriamente',
          bottleAllowance_en: 'Standard 100ml limit in 1L resealable clear bag to be removed',
          electronicsInBag: false,
          notes_it: 'I controlli di sicurezza si svolgono direttamente al singolo gate d\'imbarco. Scanner tradizionali: estrarre portatili e liquidi.',
          notes_en: 'Security checks take place directly at individual departure gates. Standard scanners: remove laptops and 100ml liquid pouch.'
        }
      ],
      liquidsAllowance_it: 'Terminal 2 (Schengen): I liquidi possono rimanere dentro il bagaglio a mano! È consentito portare bottiglie di liquidi/bevande oltre i 100ml (fino a 1 litro per contenitore). Al Terminal 1 (voli non-Schengen) vige invece la regola dei 100ml con controllo al singolo gate.',
      liquidsAllowance_en: 'Terminal 2 (Schengen): Liquids stay inside carry-on luggage! Bottles over 100ml (up to 1 litre container) are allowed without unpacking. Terminal 1 (non-Schengen) retains 100ml rule at gate checks.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Al Terminal 2 computer portatili, iPad e dispositivi elettronici restano all\'interno del bagaglio a mano durante il passaggio ai raggi X.',
      electronicsNote_en: 'At Terminal 2 laptops, iPads, and electronics stay inside your carry-on luggage during screening.',
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
      lastVerifiedDate: '2026-10-20'
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
      { 
        id: 'prg-pwr', 
        category: 'power_charging', 
        title_it: 'Tavoli di lavoro alti con prese Schuko e USB', 
        title_en: 'High Work Benches with Schuko AC & USB', 
        terminal: 'Terminal 2 & 1', 
        location_it: 'Tavoli alti da lavoro tra i Gate C2-C5 e D1-D3 (T2); colonne perimetrali Gate A-B (T1)', 
        location_en: 'High work benches between Gates C2-C5 and D1-D3 (T2); perimeter pillars at Gates A-B (T1)', 
        availability: 'scarce',
        scarcityNote_it: 'ATTENZIONE: Le normali poltroncine d\'attesa blu ai gate NON hanno prese elettriche. Le prese Schuko 230V e USB si trovano ESCLUSIVAMENTE sui tavoli alti in legno tra i Gate C2-C5 (T2) e D1-D3 (T2), e vicino ad alcune colonne contrassegnate. La disponibilità è limitata nelle ore di punta.',
        scarcityNote_en: 'WARNING: Standard blue gate seating does NOT have power outlets. 230V AC and USB sockets are ONLY available at high wooden worktables between Gates C2-C5 (T2) and D1-D3 (T2), and select marked pillars. Availability is scarce during peak rush.',
        details_it: 'Banconi alti in legno dotati di prese universali europee 230V e doppie porte USB per la ricarica rapida.', 
        details_en: 'High wooden counters with European Schuko sockets and dual USB charging ports.' 
      },
      { 
        id: 'prg-wifi', 
        category: 'wifi', 
        title_it: 'Prague Airport Wi-Fi Free', 
        title_en: 'Prague Airport Wi-Fi Free', 
        terminal: 'Tutti i Terminal', 
        location_it: 'Disponibile in tutti i terminal', 
        location_en: 'Available across entire airport', 
        availability: 'abundant',
        details_it: 'Rete: "prg.aero-free". Wi-Fi gratuito e illimitato senza richiesta di carta o registrazione.', 
        details_en: 'Network: "prg.aero-free". Free unlimited Wi-Fi with no card or payment.' 
      },
      { 
        id: 'prg-water', 
        category: 'water_refill', 
        title_it: 'Fontanelle di acqua potabile gratuita', 
        title_en: 'Free Drinking Water Fountains', 
        terminal: 'Terminal 1 & 2', 
        location_it: 'Presso i blocchi servizi igienici vicino ai Gate C02, D01 e A04', 
        location_en: 'Next to restrooms near Gates C02, D01 and A04', 
        availability: 'moderate',
        scarcityNote_it: 'Fontanelle con erogatore rapido verticale per riempire agevolmente le borracce dopo i controlli di sicurezza.',
        scarcityNote_en: 'Fountains with vertical quick spout for easy bottle refills after security checkpoints.',
        details_it: 'Distributori con beccuccio verticale per riempire agevolmente le borracce dopo i controlli.', 
        details_en: 'Vertical spout fountains designed for water bottle refills.' 
      },
      { 
        id: 'prg-relax', 
        category: 'quiet_area', 
        title_it: 'Area Relax & Poltrone Chaise-Longue', 
        title_en: 'Relaxation Area & Chaise-Longues', 
        terminal: 'Terminal 2', 
        location_it: 'Al secondo piano sopra l\'area commerciale', 
        location_en: 'Second floor above commercial plaza', 
        availability: 'scarce',
        details_it: 'Poltrone ergonomiche in zona tranquilla con vista sulla pista.', 
        details_en: 'Ergonomic lounge recliners in quiet zone overlooking apron.', 
        isUnverified: true, 
        details_it_unverified: 'I viaggiatori consigliano di arrivare prima delle 10:00 per trovare poltrone libere.', 
        details_en_unverified: 'Travelers recommend arriving before 10:00 to secure open recliners.' 
      }
    ],
    venues: [
{
    "id": "prg-v-1",
    "name": "Pilsner Urquell Original Restaurant",
    "category": "dining",
    "terminal": "Terminal 1 & 2",
    "location": "T1 Transito & T2 Imbarchi Schengen",
    "hours": "06:00 - 22:00"
  },
  {
    "id": "prg-v-2",
    "name": "Runway Restaurant (Cucina Ceca & Buffet)",
    "category": "dining",
    "terminal": "Terminal 1",
    "location": "1° Piano area pubblica (ottima vista pista)",
    "hours": "06:00 - 21:00"
  },
  {
    "id": "prg-v-3",
    "name": "Marché Mövenpick",
    "category": "dining",
    "terminal": "Terminal 1",
    "location": "Area Imbarchi Non-Schengen",
    "hours": "06:00 - 22:00"
  },
  {
    "id": "prg-v-4",
    "name": "Paul French Bakery",
    "category": "cafe",
    "terminal": "Terminal 2",
    "location": "Imbarchi Schengen fronte Gate C",
    "hours": "05:30 - 22:00"
  },
  {
    "id": "prg-v-5",
    "name": "Costa Coffee",
    "category": "cafe",
    "terminal": "Terminal 1 & 2",
    "location": "T1 Partenze & T2 Gate D",
    "hours": "05:00 - 22:30"
  },
  {
    "id": "prg-v-6",
    "name": "Starbucks Coffee Prague",
    "category": "cafe",
    "terminal": "Terminal 1 & 2",
    "location": "T1 Arrivi & T2 Imbarchi secondo piano",
    "hours": "06:00 - 22:00"
  },
  {
    "id": "prg-v-7",
    "name": "Subway",
    "category": "dining",
    "terminal": "Terminal 2",
    "location": "Area Imbarchi Gate C2",
    "hours": "06:00 - 22:00"
  },
  {
    "id": "prg-v-8",
    "name": "Aelia Duty Free Prague",
    "category": "duty_free",
    "terminal": "Terminal 1 & 2",
    "location": "Passaggio obbligato dopo controlli sicurezza",
    "hours": "05:00 - 23:00"
  },
  {
    "id": "prg-v-9",
    "name": "Manufaktura (Cosmetica Tradizionale Ceca)",
    "category": "shopping",
    "terminal": "Terminal 2",
    "location": "Piazza Commerciale T2",
    "hours": "06:30 - 21:30"
  },
  {
    "id": "prg-v-10",
    "name": "Hamleys Toy Store",
    "category": "shopping",
    "terminal": "Terminal 2",
    "location": "Area Imbarchi T2",
    "hours": "07:00 - 21:00"
  },
  {
    "id": "prg-v-11",
    "name": "Relay Bookshop & News",
    "category": "shopping",
    "terminal": "Terminal 1 & 2",
    "location": "T1 & T2 molteplici postazioni",
    "hours": "05:00 - 22:30"
  },
  {
    "id": "prg-v-12",
    "name": "Lékárna Václava Havla (Farmacia)",
    "category": "pharmacy",
    "terminal": "Terminal 2",
    "location": "Vestibolo T2 Piano Terra",
    "hours": "06:00 - 21:00"
  }
    ],
    transports: [
      { id: 'prg-tr-1', type: 'bus', name_it: 'Filobus Elettrico 59 (per Metro A Nádraží Veleslavín)', name_en: 'Trolleybus 59 (to Metro A Nádraží Veleslavín)', duration: '17 min', frequency: 'Ogni 3-6 minuti', estimatedCost: '40 CZK (~€1.60)', pickupLocation_it: 'Pensiline bus fronte Terminal 1 e Terminal 2', pickupLocation_en: 'Bus bays outside Terminal 1 and Terminal 2', details_it: 'Nuovissimo filobus elettrico articolato ad altissima frequenza. A Nádraží Veleslavín si sale sulla metro verde A che porta a Malostranská o Můstek (Piazza San Venceslao) in 10 minuti.', details_en: 'Modern high-capacity articulated electric trolleybus. Connects with Green Metro Line A directly to Old Town.' },
      { id: 'prg-tr-2', type: 'bus', name_it: 'Airport Express (AE - Diretto per Stazione Centrale Hlavní Nádraží)', name_en: 'Airport Express (AE - Direct to Main Railway Station)', duration: '30-40 min', frequency: 'Ogni 20-30 minuti', estimatedCost: '100 CZK (~€4.00)', pickupLocation_it: 'Fermata AE fronte Terminal 1', pickupLocation_en: 'AE bus stop outside Terminal 1', details_it: 'Bus espresso no-stop direttamente per la stazione ferroviaria principale di Praga.', details_en: 'Non-stop express coach direct to Prague Main Train Station.' },
      { id: 'prg-tr-3', type: 'taxi', name_it: 'Uber Airport Ufficiale / Taxi Praha', name_en: 'Official Uber Airport / Taxi Praha', duration: '25-35 min', frequency: 'Continuo', estimatedCost: '550-750 CZK (~€22.00-€30.00)', pickupLocation_it: 'Chioschi ufficiali nell\'area arrivi di T1 e T2', pickupLocation_en: 'Official booking kiosks in arrivals halls T1 and T2', details_it: 'Tariffa garantita prenotabile ai totem interattivi o tramite app Uber.', details_en: 'Guaranteed upfront pricing at airport interactive kiosks or Uber app.' }
    ],
    terminalMaps: [
      {
        terminalId: 'prg-t2',
        terminalName_it: 'Terminal 2 (Voli Schengen / Italia / UE)',
        terminalName_en: 'Terminal 2 (Schengen / EU Flights)',
        officialInteractiveMapUrl: 'https://www.prg.aero/en/interactive-map',
        concourseShape: 'pier_t',
        pois: [
          {
            id: 'prg-map-t2-sec',
            category: 'security',
            name_it: 'Varchi Centralizzati Scanner 3D CT',
            name_en: 'Centralized 3D CT Security Checkpoint',
            location_it: 'Piano 2F prima della piazza commerciale',
            location_en: 'Level 2F before central commercial plaza',
            terminal: 'Terminal 2',
            zone: 'Checkpoint Partenze',
            x: 23,
            y: 50,
            availability: 'abundant',
            details_it: 'Scanner tomografici 3D CT operativi: liquidi, bevande fino a 1L e portatili restano nel bagaglio a mano senza estrarli.',
            details_en: '3D CT scanners active: liquids, beverage bottles up to 1L and laptops stay inside cabin bag without unpacking.',
            isVerified: true
          },
          {
            id: 'prg-map-t2-pwr-c',
            category: 'power',
            name_it: 'Tavoli alti da lavoro con prese Schuko e USB (Gate C2-C5)',
            name_en: 'High Work Benches with 230V Schuko & USB (Gates C2-C5)',
            location_it: 'Lungo il corridoio tra i Gate C2 e C5',
            location_en: 'Along concourse between Gates C2 and C5',
            terminal: 'Terminal 2',
            zone: 'Molo C',
            x: 75,
            y: 28,
            availability: 'scarce',
            details_it: 'ATTENZIONE: Le normali poltroncine blu ai gate NON hanno prese. Le prese Schuko 230V e USB si trovano ESCLUSIVAMENTE su questi banconi alti in legno da lavoro.',
            details_en: 'WARNING: Standard blue gate seating does NOT have power outlets. 230V AC and USB sockets are ONLY located on these tall wooden workbenches.',
            isVerified: true
          },
          {
            id: 'prg-map-t2-pwr-d',
            category: 'power',
            name_it: 'Tavoli alti da lavoro con prese Schuko e USB (Gate D1-D3)',
            name_en: 'High Work Benches with 230V Schuko & USB (Gates D1-D3)',
            location_it: 'Lungo il corridoio tra i Gate D1 e D3',
            location_en: 'Along concourse between Gates D1 and D3',
            terminal: 'Terminal 2',
            zone: 'Molo D',
            x: 75,
            y: 72,
            availability: 'scarce',
            details_it: 'Seconda postazione con tavoli alti e prese elettriche. Pochi posti disponibili nelle ore di punta.',
            details_en: 'Second bank of high desks with power outlets. Fills quickly during rush hours.',
            isVerified: true
          },
          {
            id: 'prg-map-t2-water-c',
            category: 'water',
            name_it: 'Fontanella Acqua Potabile Gratuita (Gate C02)',
            name_en: 'Free Drinking Water Fountain (Gate C02)',
            location_it: 'Presso i servizi igienici di fronte al Gate C02',
            location_en: 'Next to restrooms opposite Gate C02',
            terminal: 'Terminal 2',
            zone: 'Molo C',
            x: 67,
            y: 32,
            availability: 'moderate',
            details_it: 'Distributore con erogatore a getto verticale progettato per riempire rapidamente borracce e bottiglie vuote post-sicurezza.',
            details_en: 'Vertical jet dispenser designed for rapid refill of empty water bottles post-security.',
            isVerified: true
          },
          {
            id: 'prg-map-t2-water-d',
            category: 'water',
            name_it: 'Fontanella Acqua Potabile Gratuita (Gate D01)',
            name_en: 'Free Drinking Water Fountain (Gate D01)',
            location_it: 'Presso i servizi igienici vicino al Gate D01',
            location_en: 'Next to restrooms near Gate D01',
            terminal: 'Terminal 2',
            zone: 'Molo D',
            x: 67,
            y: 68,
            availability: 'moderate',
            details_it: 'Erogatore gratuito di acqua potabile fresca per borracce.',
            details_en: 'Free chilled drinking water dispenser for refillable bottles.',
            isVerified: true
          },
          {
            id: 'prg-map-t2-pilsner',
            category: 'dining',
            name_it: 'Pilsner Urquell Original Restaurant',
            name_en: 'Pilsner Urquell Original Restaurant',
            location_it: 'Piazza commerciale centrale T2',
            location_en: 'Central T2 commercial plaza',
            terminal: 'Terminal 2',
            zone: 'Piazza Commerciale',
            x: 42,
            y: 38,
            availability: 'abundant',
            details_it: 'Cucina tipica ceca e birra alla spina appena spillata. Orari: 06:00 - 22:00.',
            details_en: 'Traditional Czech food and freshly poured draft beer. Hours: 06:00 - 22:00.',
            isVerified: true
          },
          {
            id: 'prg-map-t2-dutyfree',
            category: 'shop',
            name_it: 'Aelia Duty Free Prague',
            name_en: 'Aelia Duty Free Prague',
            location_it: 'Subito dopo i filtri di sicurezza',
            location_en: 'Immediately after security screening',
            terminal: 'Terminal 2',
            zone: 'Airside Centrale',
            x: 35,
            y: 55,
            availability: 'abundant',
            details_it: 'Profumi, cosmetici, liquori (Becherovka), cioccolato e souvenir.',
            details_en: 'Perfumes, cosmetics, spirits (Becherovka), chocolate, and souvenirs.',
            isVerified: true
          },
          {
            id: 'prg-map-t2-relax',
            category: 'lounge',
            name_it: 'Area Relax & Chaise-Longue Panoramica',
            name_en: 'Relaxation Area & Runway-View Chaise-Longues',
            location_it: 'Secondo piano soppalco sopra l\'area commerciale',
            location_en: 'Second floor mezzanine above commercial plaza',
            terminal: 'Terminal 2',
            zone: 'Soppalco Relax',
            x: 48,
            y: 22,
            availability: 'scarce',
            details_it: 'Poltrone anatomiche reclinabili in zona silenziosa con vista panoramica sulla pista di atterraggio.',
            details_en: 'Ergonomic lounge recliners in quiet area overlooking apron.',
            isVerified: true
          }
        ]
      },
      {
        terminalId: 'prg-t1',
        terminalName_it: 'Terminal 1 (Voli Extra-Schengen - UK, USA)',
        terminalName_en: 'Terminal 1 (Non-Schengen - UK, USA)',
        officialInteractiveMapUrl: 'https://www.prg.aero/en/interactive-map',
        concourseShape: 'linear',
        pois: [
          {
            id: 'prg-map-t1-sec',
            category: 'security',
            name_it: 'Controlli di Sicurezza ai Singoli Gate A & B',
            name_en: 'Security Screening at Individual Gates A & B',
            location_it: 'Direttamente davanti a ciascun gate d\'imbarco prima di salire',
            location_en: 'Directly at each individual boarding gate prior to boarding',
            terminal: 'Terminal 1',
            zone: 'Gates A & B',
            x: 65,
            y: 50,
            availability: 'moderate',
            details_it: 'ATTENZIONE: Al Terminal 1 i controlli si svolgono al singolo gate d\'imbarco. Scanner convenzionali: estrarre liquidi (max 100ml) e computer portatili.',
            details_en: 'WARNING: Terminal 1 conducts security checks at individual gates. Standard scanners: unpack liquids (max 100ml) and laptops.',
            isVerified: true
          },
          {
            id: 'prg-map-t1-pwr',
            category: 'power',
            name_it: 'Prese a muro su colonne perimetrali Gate A',
            name_en: 'Wall Outlets on Perimeter Pillars Gate A',
            location_it: 'Lungo le vetrate dei Gate A2-A4',
            location_en: 'Near windows by Gates A2-A4',
            terminal: 'Terminal 1',
            zone: 'Molo A',
            x: 75,
            y: 35,
            availability: 'scarce',
            details_it: 'Poche prese Schuko disponibili nel corridoio centrale prima dell\'accesso al singolo gate d\'imbarco.',
            details_en: 'Limited Schuko outlets in central corridor before entering gated boarding areas.',
            isVerified: true
          },
          {
            id: 'prg-map-t1-water',
            category: 'water',
            name_it: 'Fontanella Acqua Potabile (Gate A04)',
            name_en: 'Free Drinking Water Fountain (Gate A04)',
            location_it: 'Presso i servizi igienici vicino al Gate A04',
            location_en: 'Next to restrooms near Gate A04',
            terminal: 'Terminal 1',
            zone: 'Molo A',
            x: 55,
            y: 40,
            availability: 'moderate',
            details_it: 'Erogatore gratuito per borracce disponibile nel corridoio principale del T1.',
            details_en: 'Free bottle refilling station located along main T1 concourse.',
            isVerified: true
          }
        ]
      }
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
    officialMapUrl: 'https://www.adr.it/web/aeroporti-di-roma-it-/mappa-aeroporto',
    coordinates: { lat: 41.8003, lng: 12.2389 },
    difficultyRating: 2,
    difficultyLabel_it: 'Molto Organizzato & Veloce (Skytrax 5-Star)',
    difficultyLabel_en: 'Highly Organized & Smooth (Skytrax 5-Star)',
    averageSecurityWaitMin: 8,
    recommendedArrivalHours: { domestic: 2, international: 3 },
    navigationAdvice_it: 'Aeroporto modernizzato e molto intuitivo. Il Terminal 1 e il Terminal 3 sono connessi internamente. I varchi di sicurezza con scanner 3D sono tra i più rapidi d\'Europa.',
    navigationAdvice_en: 'Modern and very intuitive airport. Terminal 1 and Terminal 3 are internally connected. Security lanes equipped with 3D scanners are among the fastest in Europe.',
    otherCityAirports: [
      { iata: 'CIA', name_it: 'Roma Ciampino (G.B. Pastine)', name_en: 'Rome Ciampino', distanceInfo: '15 km da Roma Centro' }
    ],
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Terminal 1 e Terminal 3 dotati di scanner tomografici Smiths Detection EDS-CB C3 di ultima generazione.',
      scannersNote_en: 'Terminal 1 and Terminal 3 equipped with state-of-the-art Smiths Detection EDS-CB C3 tomographic scanners.',
      terminalRules: [
        {
          terminalName: 'Terminal 1 (Voli Schengen / ITA Airways, Vueling, EasyJet)',
          has3DScanners: true,
          liquidsAllowedInBag: true,
          bottleAllowance_it: 'Bottiglie e liquidi consentiti nel bagaglio a mano senza limiti di 100ml',
          bottleAllowance_en: 'Liquids & bottles allowed inside bag with no 100ml restriction',
          electronicsInBag: true,
          notes_it: 'Tutti i varchi equipaggiati con scanner 3D Smiths Detection EDS-CB C3. Nulla va estratto dalla borsa.',
          notes_en: 'All lanes equipped with 3D Smiths Detection EDS-CB C3 scanners. No liquids or devices need to be taken out.'
        },
        {
          terminalName: 'Terminal 3 (Voli Extra-Schengen, Lungo Raggio, Ryanair, Wizz Air)',
          has3DScanners: true,
          liquidsAllowedInBag: true,
          bottleAllowance_it: 'Liquidi e laptop restano nel bagaglio sulle corsie 3D C3 attive',
          bottleAllowance_en: 'Liquids and laptops stay inside bag on active 3D C3 lanes',
          electronicsInBag: true,
          notes_it: 'Varchi principali dotati di scanner 3D C3. Nelle ore di congestione seguire le indicazioni del personale di corsia.',
          notes_en: 'Main checkpoint equipped with 3D C3 scanners. During peak rushes follow lane staff directions.'
        }
      ],
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
      { 
        id: 'fco-pwr-1', 
        category: 'power_charging', 
        title_it: 'Poltrone con ricarica USB e prese AC 230V', 
        title_en: 'Armchairs with USB charging & AC 230V sockets', 
        terminal: 'Terminal 1 & Terminal 3', 
        location_it: 'Gates A01-A80 e Nuova Area Imbarchi E (tutte le sedute fronte gate)', 
        location_en: 'Gates A01-A80 and New Boarding Area E (integrated in gate seating)', 
        availability: 'abundant',
        scarcityNote_it: 'Disponibilità eccellente: prese universali Schuko e doppie porte USB integrate sotto ogni fila di poltrone dei nuovi moli A ed E.',
        scarcityNote_en: 'Excellent availability: universal Schuko and dual USB sockets integrated under every seating row in piers A & E.',
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
        availability: 'abundant',
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
        availability: 'abundant',
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
        availability: 'moderate',
        details_it: 'Zona silenziosa con chaise-longue anatomiche e luce soffusa per riposo.', 
        details_en: 'Quiet lounge area with ergonomic chaise-longues and dimmed lighting.', 
        isUnverified: true, 
        details_it_unverified: 'I viaggiatori segnalano che l\'area è molto richiesta durante le prime ore del mattino.', 
        details_en_unverified: 'Travelers report high occupancy during early morning hours.' 
      }
    ],
    venues: [
{
            "id": "fco-v-1",
            "name": "12oz",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack",
            "highlightNote_it": "Specialità caffè americano, iced latte e dolci americani al volo.",
            "highlightNote_en": "Iced coffee, americano, and quick grab-and-go sweet snacks."
      },
      {
            "id": "fco-v-2",
            "name": "180 Grammi",
            "category": "dining",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 1",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "table_service"
      },
      {
            "id": "fco-v-3",
            "name": "Accessorize",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-4",
            "name": "Adidas",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-5",
            "name": "Aelia Duty Free",
            "category": "duty_free",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "05:30 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "duty_free"
      },
      {
            "id": "fco-v-6",
            "name": "Ajisen Ramen",
            "category": "dining",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi (dopo i controlli)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "table_service"
      },
      {
            "id": "fco-v-7",
            "name": "Alemagna",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-8",
            "name": "Alice Pizza",
            "category": "dining",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi (dopo i controlli)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "quick_bite",
            "highlightNote_it": "Tranci di pizza romana croccante serviti al momento, ideale per pasti veloci.",
            "highlightNote_en": "Crispy Roman pizza slices served fresh by the cut, perfect for quick gate bites."
      },
      {
            "id": "fco-v-9",
            "name": "All'Antico Vinaio",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Gate A21-27",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "quick_bite",
            "highlightNote_it": "Famose schiacciate toscane espresse farcite al momento. Molto gettonato per pasti da portare a bordo.",
            "highlightNote_en": "Famous Tuscan stuffed focaccia made fresh. Top pick for meals on board."
      },
      {
            "id": "fco-v-10",
            "name": "Amore",
            "category": "dining",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "table_service"
      },
      {
            "id": "fco-v-11",
            "name": "Amorino",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 3",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-12",
            "name": "A|X Armani Exchange",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-13",
            "name": "Beercode",
            "category": "dining",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "quick_bite",
            "highlightNote_it": "Birreria artigianale con burger gourmet e servizio al tavolo per soste lunghe.",
            "highlightNote_en": "Craft beer pub with gourmet burgers and sit-down table service."
      },
      {
            "id": "fco-v-14",
            "name": "Berlucchi",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-15",
            "name": "Best and Fast Change",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi (dopo i controlli)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-16",
            "name": "Bistrot",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 3",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack",
            "highlightNote_it": "Pasticceria artigianale, caffetteria e piatti caldi self-service veloci.",
            "highlightNote_en": "Bakery, espresso bar, and quick warm meals."
      },
      {
            "id": "fco-v-17",
            "name": "Boggi",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-18",
            "name": "Bonci",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 3",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack",
            "highlightNote_it": "Pizza al taglio d'autore di Gabriele Bonci con impasto a lunga lievitazione.",
            "highlightNote_en": "Artisanal Roman pizza al taglio by master baker Gabriele Bonci."
      },
      {
            "id": "fco-v-19",
            "name": "Bongustare",
            "category": "dining",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "quick_bite"
      },
      {
            "id": "fco-v-20",
            "name": "Borsalino",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-21",
            "name": "Bottega Veneta",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-22",
            "name": "Bric's - Tumi",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-23",
            "name": "Brunello Cucinelli",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-24",
            "name": "Bufala di Fattorie Garofalo",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-25",
            "name": "Bulgari",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-26",
            "name": "Burberry",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-27",
            "name": "Caffè Kimbo",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-28",
            "name": "Caffè Napoli",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-29",
            "name": "Caffè Vergnano",
            "category": "cafe",
            "terminal": "Terminal 3",
            "location": "Gate E11-24",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-30",
            "name": "Caffè Vergnano - Women in coffe",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 3",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-31",
            "name": "Caffè Vergnano 1882",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 1",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-32",
            "name": "Caio Antica Pizza Romana",
            "category": "dining",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi (dopo i controlli)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "quick_bite",
            "highlightNote_it": "Tranci di pizza romana croccante serviti al momento, ideale per pasti veloci.",
            "highlightNote_en": "Crispy Roman pizza slices served fresh by the cut, perfect for quick gate bites."
      },
      {
            "id": "fco-v-33",
            "name": "Camicissima",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-34",
            "name": "Card Station",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Gate A31-52",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-35",
            "name": "Carpisa",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-36",
            "name": "Cartier",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-37",
            "name": "Chef Market",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi (dopo i controlli)",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-38",
            "name": "Cielo",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "table_service"
      },
      {
            "id": "fco-v-39",
            "name": "Cioccolati italiani",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 1",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-40",
            "name": "Città del Sole",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-41",
            "name": "Coccinelle",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-42",
            "name": "Costa Caffè",
            "category": "cafe",
            "terminal": "Terminal 3",
            "location": "Gate E31-44",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-43",
            "name": "Costa Coffee",
            "category": "cafe",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-44",
            "name": "Culto Caffè",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Gate A31-52",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-45",
            "name": "Damiani",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-46",
            "name": "Deli&Cia",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Gate A61-83",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-47",
            "name": "Diesel",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-48",
            "name": "Dior",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-49",
            "name": "Dolce&Gabbana",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-50",
            "name": "Doppio Malto",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "table_service"
      },
      {
            "id": "fco-v-51",
            "name": "Eataly - La Terrazza",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack",
            "highlightNote_it": "Piazza del Gusto: pasta fresca, pizza a pala e selezione enogastronomica con sedute.",
            "highlightNote_en": "Italian gastronomy plaza: fresh pasta, pizza, and regional specialties with sit-down seating."
      },
      {
            "id": "fco-v-52",
            "name": "Eataly Wine Bar",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack",
            "highlightNote_it": "Piazza del Gusto: pasta fresca, pizza a pala e selezione enogastronomica con sedute.",
            "highlightNote_en": "Italian gastronomy plaza: fresh pasta, pizza, and regional specialties with sit-down seating."
      },
      {
            "id": "fco-v-53",
            "name": "EXKI",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-54",
            "name": "Fabriano Boutique",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-55",
            "name": "Farinella",
            "category": "dining",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "table_service"
      },
      {
            "id": "fco-v-56",
            "name": "Farmacia - Farmacie Italiane",
            "category": "pharmacy",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "pharmacy",
            "highlightNote_it": "Presidio farmaceutico e sanitario autorizzato post-controlli di sicurezza.",
            "highlightNote_en": "Authorized pharmacy and healthcare dispensary post-security."
      },
      {
            "id": "fco-v-57",
            "name": "Feltrinelli",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-58",
            "name": "Fendi",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-59",
            "name": "Ferragamo",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-60",
            "name": "Ferrari",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-61",
            "name": "Ferrari Spazio Bollicine",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi (dopo i controlli)",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack",
            "highlightNote_it": "Wine bar d'eccellenza con etichette Ferrari e cucina gourmet per attese rilassate.",
            "highlightNote_en": "Premium wine bar with Ferrari sparkling wines and gourmet dining."
      },
      {
            "id": "fco-v-62",
            "name": "Furla",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-63",
            "name": "Gallo",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-64",
            "name": "Genuino",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 1",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-65",
            "name": "Giorgio Armani",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Gate A21-27",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-66",
            "name": "Global Blue - Tax Free Refunds",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal • Imbarco",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-67",
            "name": "Golden Goose",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-68",
            "name": "Gucci",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-69",
            "name": "Heinemann",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Gate A21-27",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-70",
            "name": "Hermes",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-71",
            "name": "Hour Passion",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-72",
            "name": "Hudson",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-73",
            "name": "Illy",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-74",
            "name": "InMotion",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza • T3",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-75",
            "name": "John Richmond",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Gate E11-24",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-76",
            "name": "Juicebar",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 1",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-77",
            "name": "Just Design",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-78",
            "name": "Just Poke",
            "category": "dining",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi (dopo i controlli)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "quick_bite"
      },
      {
            "id": "fco-v-79",
            "name": "KFC",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "quick_bite"
      },
      {
            "id": "fco-v-80",
            "name": "Kikki - Illy",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 1",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-81",
            "name": "La Fucina",
            "category": "cafe",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-82",
            "name": "Lavazza",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi (dopo i controlli)",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-83",
            "name": "Lievito",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "quick_bite"
      },
      {
            "id": "fco-v-84",
            "name": "Liu-Jo",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-85",
            "name": "Louis Vuitton",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-86",
            "name": "Max Mara",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-87",
            "name": "Max Mara Weekend",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Gate A21-27",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-88",
            "name": "Mc Donald's",
            "category": "dining",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi (dopo i controlli)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "quick_bite"
      },
      {
            "id": "fco-v-89",
            "name": "MC2 Saint Barth",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-90",
            "name": "Mignon",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 3",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-91",
            "name": "Molo Kidswear",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-92",
            "name": "Moncler",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-93",
            "name": "Montblanc",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Gate A21-27",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-94",
            "name": "Motta",
            "category": "cafe",
            "terminal": "Terminal 3",
            "location": "Gate E31-44",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-95",
            "name": "My Family",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-96",
            "name": "Natoo",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi (dopo i controlli)",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-97",
            "name": "Omega",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-98",
            "name": "Ottica Vasari",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-99",
            "name": "Pandora",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-100",
            "name": "Panella",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi post-sicurezza • A/A21-27",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-101",
            "name": "Parafarmacia",
            "category": "pharmacy",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "pharmacy",
            "highlightNote_it": "Presidio farmaceutico e sanitario autorizzato post-controlli di sicurezza.",
            "highlightNote_en": "Authorized pharmacy and healthcare dispensary post-security."
      },
      {
            "id": "fco-v-102",
            "name": "Parapharmacy2go",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi (dopo i controlli)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-103",
            "name": "Parapharmacy2Go in Aelia Duty Free",
            "category": "duty_free",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "05:30 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "duty_free"
      },
      {
            "id": "fco-v-104",
            "name": "Passaggio Roma",
            "category": "cafe",
            "terminal": "Terminal 3",
            "location": "Gate E31-44",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-105",
            "name": "Personal Shopper Desk",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-106",
            "name": "Piadina di Casa Maioli",
            "category": "dining",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi (dopo i controlli)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "quick_bite"
      },
      {
            "id": "fco-v-107",
            "name": "Pick",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi (dopo i controlli)",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-108",
            "name": "Pickup on Return Locker",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 1",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-109",
            "name": "Pinko",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Gate A21-27",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-110",
            "name": "Piquadro",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-111",
            "name": "Planet",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal • Imbarco",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-112",
            "name": "Pomellato",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-113",
            "name": "Pop up K-Way",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-114",
            "name": "Prada",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-115",
            "name": "Pret a Manger",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 3",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-116",
            "name": "Punto nel Mondo",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi (dopo i controlli)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-117",
            "name": "Ralph Lauren",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Gate A21-27",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-118",
            "name": "Relay",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-119",
            "name": "Rinaldini",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Gate A31-52",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-120",
            "name": "Rolex",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-121",
            "name": "Rossopomodoro",
            "category": "dining",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 1",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "table_service",
            "highlightNote_it": "Vera pizza napoletana con forno e ampia sala con servizio al tavolo.",
            "highlightNote_en": "Authentic Neapolitan pizza with traditional oven and sit-down table service."
      },
      {
            "id": "fco-v-122",
            "name": "Saint Laurent",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-123",
            "name": "Semplicemente Roma",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 3",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      },
      {
            "id": "fco-v-124",
            "name": "Sophia Loren",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "quick_bite"
      },
      {
            "id": "fco-v-125",
            "name": "Spizzico",
            "category": "dining",
            "terminal": "Terminal 3",
            "location": "Gate E31-44",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "quick_bite"
      },
      {
            "id": "fco-v-126",
            "name": "Suncatcher",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-127",
            "name": "Swarovski in Aelia Duty Free",
            "category": "duty_free",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "05:30 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "duty_free"
      },
      {
            "id": "fco-v-128",
            "name": "Swatch",
            "category": "shopping",
            "terminal": "Terminal 3",
            "location": "Area Imbarchi E (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-129",
            "name": "Tax Refund",
            "category": "shopping",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 3",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "retail"
      },
      {
            "id": "fco-v-130",
            "name": "Temakinho",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi A (Partenze)",
            "hours": "06:00 - 22:30",
            "is24Hours": false,
            "isEarlyMorning": false,
            "serviceType": "quick_bite"
      },
      {
            "id": "fco-v-131",
            "name": "Tentazioni Cafè",
            "category": "cafe",
            "terminal": "Terminal 1 & 3",
            "location": "Terminal 3",
            "hours": "05:00 - 23:00",
            "is24Hours": false,
            "isEarlyMorning": true,
            "serviceType": "coffee_snack"
      }
    ],
    transports: [
      { id: 'fco-tr-1', type: 'train', name_it: 'Leonardo Express (Non-stop per Roma Termini)', name_en: 'Leonardo Express (Non-stop to Rome Termini)', duration: '32 min', frequency: 'Ogni 15 minuti', estimatedCost: '€14.00', pickupLocation_it: 'Stazione ferroviaria interna dell\'aeroporto (fronte T3)', pickupLocation_en: 'Internal airport train station (in front of T3)', details_it: 'Collegamento ferroviario diretto senza fermate fino a Roma Termini.', details_en: 'Direct non-stop train link straight to Rome Termini central station.' },
      { id: 'fco-tr-4', type: 'taxi', name_it: 'Taxi Ufficiale di Roma Capitale', name_en: 'Official Rome City Taxi', duration: '35-50 min', frequency: 'Disponibilità continua', estimatedCost: '€55.00 (Tariffa fissa)', pickupLocation_it: 'Uscita arrivi Terminal 1 e Terminal 3', pickupLocation_en: 'Arrivals exits Terminal 1 and Terminal 3', details_it: 'Tariffa fissa regolamentata per destinazioni all\'interno delle Mura Aureliane.', details_en: 'Regulated fixed flat fare for all destinations inside Aurelian Walls.' }
    ],
    lastUpdated: '2026-10-19'
  },

  // -------------------------------------------------------------------------
  // ROMA CIAMPINO (CIA)
  // -------------------------------------------------------------------------
  {
    id: 'cia',
    iata: 'CIA',
    icao: 'LIRA',
    name_it: 'Aeroporto di Roma Ciampino (G.B. Pastine)',
    name_en: 'Rome Ciampino Airport (G.B. Pastine)',
    city_it: 'Roma',
    city_en: 'Rome',
    country_it: 'Italia',
    country_en: 'Italy',
    countryCode: 'IT',
    officialWebsite: 'https://www.adr.it/ciampino',
    officialMapUrl: 'https://www.adr.it/web/aeroporti-di-roma-it-/mappa-aeroporto',
    coordinates: { lat: 41.7994, lng: 12.5949 },
    difficultyRating: 2,
    difficultyLabel_it: 'Compatto & Diretto (Poche sedute nei picchi Ryanair)',
    difficultyLabel_en: 'Compact & Direct (Limited seating at Ryanair peaks)',
    averageSecurityWaitMin: 15,
    recommendedArrivalHours: { domestic: 2, international: 2 },
    navigationAdvice_it: 'Aeroporto secondario di Roma a terminal singolo, hub principale low-cost per Ryanair e Wizz Air. Gli spazi oltre i controlli sono contenuti: nei momenti di picco le sedute e le prese scarseggiano.',
    navigationAdvice_en: 'Rome secondary single-terminal airport, focused on Ryanair and Wizz Air low-cost flights. Airside spaces are compact: seating and power outlets fill up quickly during peak hours.',
    otherCityAirports: [
      { iata: 'FCO', name_it: 'Roma Fiumicino (Leonardo da Vinci)', name_en: 'Rome Fiumicino', distanceInfo: '32 km da Roma Centro' }
    ],
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'A Ciampino sono operativi varchi di sicurezza con scanner X-ray convenzionali. Non sono presenti scanner tomografici 3D per i liquidi liberi.',
      scannersNote_en: 'Ciampino operates conventional X-ray screening lanes. Next-gen 3D CT scanners for unrestricted liquids are not installed here.',
      terminalRules: [
        {
          terminalName: 'Terminal Passeggeri Unico',
          has3DScanners: false,
          liquidsAllowedInBag: false,
          bottleAllowance_it: 'Max 100ml per flacone in busta trasparente 1L (estrarre obbligatoriamente)',
          bottleAllowance_en: 'Max 100ml per container in 1L clear pouch (must be unpacked)',
          electronicsInBag: false,
          notes_it: 'Regola tradizionale standard: estrarre tutti i liquidi e i computer portatili o tablet nelle vaschette separate.',
          notes_en: 'Standard screening rules: unpack all liquids and laptops/tablets into separate bins.'
        }
      ],
      liquidsAllowance_it: 'Tutti i liquidi devono essere contenuti in recipienti di capienza massima non superiore a 100ml ciascuno, inseriti in un sacchetto di plastica trasparente e richiudibile di capacità non superiore a 1 litro (circa 20x20 cm), da estrarre obbligatoriamente dal bagaglio.',
      liquidsAllowance_en: 'All liquids must be in containers of max 100ml each, placed in one transparent resealable 1-litre plastic bag, and taken out of your luggage.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Computer portatili, tablet ed e-reader vanno obbligatoriamente estratti dal bagaglio a mano e posizionati nelle vaschette per il controllo separato.',
      electronicsNote_en: 'Laptops, tablets, and e-readers must be removed from hand luggage and scanned in separate trays.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi esclusivamente nel bagaglio a mano con batterie rimosse e poli protetti da cortocircuito. Vietato il volo sopra l\'Appia Antica e l\'area urbana di Roma.',
      dronePolicy_en: 'Drones permitted in cabin luggage only with batteries isolated. Drone flight strictly prohibited in Roman urban airspace.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Powerbank ammessi solo nel bagaglio a mano fino a 100Wh. Vietati rigorosamente nella stiva.',
      powerbankPolicy_en: 'Powerbanks up to 100Wh permitted in cabin only. Strictly forbidden in cargo hold.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.adr.it/cia-norme-di-sicurezza',
      lastVerifiedDate: '2026-10-20'
    },
    terminals: [
      { id: 'cia-main', name: 'Terminal Unico Partenze', transferInfo_it: 'Terminal passeggeri unico per tutte le partenze e gli arrivi nazionali e internazionali.', transferInfo_en: 'Single passenger terminal serving all domestic and international flights.' }
    ],
    airlines: [
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal Unico', checkInZone: 'Banchi Check-in 01-16' },
      { airlineName: 'Wizz Air', iataCode: 'W4', terminal: 'Terminal Unico', checkInZone: 'Banchi Check-in 17-24' }
    ],
    amenities: [
      {
        id: 'cia-pwr',
        category: 'power_charging',
        title_it: 'Prese elettriche a muro e colonnine',
        title_en: 'Wall Outlets & Charging Stations',
        terminal: 'Terminal Unico',
        location_it: 'Lungo le pareti perimetrali vicino ai Gate 1-4 e Gate 12',
        location_en: 'Along perimeter walls near Gates 1-4 and Gate 12',
        availability: 'scarce',
        scarcityNote_it: 'ATTENZIONE: Le normali sedute d\'attesa NON dispongono di prese USB o elettriche. Gli unici punti presa sono poche spine Schuko lungo il muro vicino ai Gate 1-4, quasi sempre occupate nei momenti di picco. Si consiglia vivamente un powerbank.',
        scarcityNote_en: 'WARNING: Standard gate chairs do NOT feature USB or electrical outlets. Sockets are scarce, only found on perimeter walls near Gates 1-4. Bringing a powerbank is highly advised.',
        details_it: 'Poche prese Schuko lungo le pareti vicino ai primi banchi d\'imbarco.',
        details_en: 'Limited Schuko sockets along walls near early boarding gates.'
      },
      {
        id: 'cia-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi gratuito illimitato ADR',
        title_en: 'ADR Free Unlimited Wi-Fi',
        terminal: 'Terminal Unico',
        location_it: 'Disponibile in tutta l\'aerostazione',
        location_en: 'Available across terminal',
        availability: 'abundant',
        details_it: 'Rete: "Airport-Free-WiFi". Navigazione gratuita senza limiti di tempo.',
        details_en: 'Network: "Airport-Free-WiFi". Free access with no time limits.'
      },
      {
        id: 'cia-water',
        category: 'water_refill',
        title_it: 'Fontanella erogatore acqua potabile',
        title_en: 'Free Drinking Water Dispenser',
        terminal: 'Terminal Unico',
        location_it: 'Accanto ai servizi igienici centrali di fronte al Gate 5',
        location_en: 'Next to central restrooms opposite Gate 5',
        availability: 'moderate',
        scarcityNote_it: 'Una sola fontanella potabile presente nell\'area imbarchi dopo i controlli, utile per riempire borracce vuote prima del volo.',
        scarcityNote_en: 'Single drinking fountain located post-security opposite Gate 5, convenient for refilling empty bottles.',
        details_it: 'Erogatore con getto per borracce posizionato nell\'area servizi.',
        details_en: 'Drinking water dispenser with bottle refill spout.'
      }
    ],
    venues: [
{
            "id": "cia-v-1",
            "name": "Alice Pizza",
            "category": "dining",
            "terminal": "Terminal Unico",
            "location": "Area Imbarchi post-controlli",
            "hours": "06:00 - 22:00"
      },
      {
            "id": "cia-v-2",
            "name": "Caio Antica Pizza Romana",
            "category": "dining",
            "terminal": "Terminal Unico",
            "location": "Area Imbarchi Gate 1-5",
            "hours": "06:00 - 22:30"
      },
      {
            "id": "cia-v-3",
            "name": "Lavazza Caffè",
            "category": "cafe",
            "terminal": "Terminal Unico",
            "location": "Area Partenze centrale",
            "hours": "05:00 - 23:00"
      },
      {
            "id": "cia-v-4",
            "name": "Mc Donald's",
            "category": "dining",
            "terminal": "Terminal Unico",
            "location": "Area Imbarchi vicino Gate 6",
            "hours": "06:00 - 22:30"
      },
      {
            "id": "cia-v-5",
            "name": "Panella Bakery & Coffee",
            "category": "cafe",
            "terminal": "Terminal Unico",
            "location": "Partenze post-sicurezza",
            "hours": "05:30 - 22:30"
      },
      {
            "id": "cia-v-6",
            "name": "Juicebar",
            "category": "cafe",
            "terminal": "Terminal Unico",
            "location": "Piano Arrivi",
            "hours": "07:00 - 23:00"
      },
      {
            "id": "cia-v-7",
            "name": "Just Poke",
            "category": "dining",
            "terminal": "Terminal Unico",
            "location": "Area Imbarchi post-controlli",
            "hours": "08:00 - 21:30"
      },
      {
            "id": "cia-v-8",
            "name": "Piadina di Casa Maioli",
            "category": "dining",
            "terminal": "Terminal Unico",
            "location": "Area Imbarchi",
            "hours": "07:00 - 22:00"
      },
      {
            "id": "cia-v-9",
            "name": "Aelia Duty Free Ciampino",
            "category": "duty_free",
            "terminal": "Terminal Unico",
            "location": "Area Imbarchi subito dopo i controlli",
            "hours": "05:30 - 22:30"
      },
      {
            "id": "cia-v-10",
            "name": "Parapharmacy2go",
            "category": "pharmacy",
            "terminal": "Terminal Unico",
            "location": "Area Imbarchi fronte Gate 3",
            "hours": "06:00 - 21:00"
      },
      {
            "id": "cia-v-11",
            "name": "Relay Edicola & Bookshop",
            "category": "shopping",
            "terminal": "Terminal Unico",
            "location": "Area Imbarchi",
            "hours": "05:30 - 22:30"
      },
      {
            "id": "cia-v-12",
            "name": "Pick & Sweet",
            "category": "shopping",
            "terminal": "Terminal Unico",
            "location": "Area Imbarchi",
            "hours": "06:00 - 22:00"
      },
      {
            "id": "cia-v-13",
            "name": "Best and Fast Change",
            "category": "shopping",
            "terminal": "Terminal Unico",
            "location": "Partenze & Arrivi",
            "hours": "06:00 - 22:00"
      },
      {
            "id": "cia-v-14",
            "name": "Punto nel Mondo",
            "category": "shopping",
            "terminal": "Terminal Unico",
            "location": "Piano Arrivi",
            "hours": "07:00 - 22:30"
      }
    ],
    transports: [
      { id: 'cia-tr-1', type: 'bus', name_it: 'Bus Atral (per Metro A Anagnina)', name_en: 'Atral Bus (to Metro Line A Anagnina)', duration: '15-20 min', frequency: 'Ogni 20-30 minuti', estimatedCost: '€1.20', pickupLocation_it: 'Pensilina bus fronte uscite arrivi', pickupLocation_en: 'Bus bays outside arrivals hall', details_it: 'Opzione più economica: porta al capolinea Anagnina della Metro A per raggiungere Termini in 25 minuti.', details_en: 'Cheapest transit option: connects to Anagnina Metro A terminal into downtown.' },
      { id: 'cia-tr-2', type: 'bus', name_it: 'Shuttle Bus Terravision / SitBus (Diretto Termini)', name_en: 'Terravision / SitBus Shuttle (Direct to Termini)', duration: '35-45 min', frequency: 'Ogni 30 minuti', estimatedCost: '€6.00', pickupLocation_it: 'Fermata bus navetta piazzale arrivi', pickupLocation_en: 'Shuttle bus stops outside arrivals', details_it: 'Autobus diretto senza fermate intermedie fino alla Stazione Roma Termini.', details_en: 'Non-stop coach direct to Rome Termini central railway station.' },
      { id: 'cia-tr-3', type: 'taxi', name_it: 'Taxi Ufficiale Roma Capitale (Tariffa Fissa)', name_en: 'Official Rome Taxi (Fixed Fare)', duration: '25-35 min', frequency: 'Continuo', estimatedCost: '€40.00 (Tariffa fissa Mura Aureliane)', pickupLocation_it: 'Banchina taxi ufficiale all\'uscita del terminal', pickupLocation_en: 'Official taxi stand outside terminal', details_it: 'Tariffa fissa garantita di legge per qualsiasi indirizzo entro le Mura Aureliane (inclusi bagagli).', details_en: 'Regulated fixed flat fare to anywhere inside Aurelian Walls (luggage included).' }
    ],
    lastUpdated: '2026-10-20'
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
    officialMapUrl: 'https://www.milanomalpensa-airport.com/it/guida-per-il-passeggero/mappa-aeroporto',
    coordinates: { lat: 45.6301, lng: 8.7255 },
    difficultyRating: 3,
    difficultyLabel_it: 'Organizzato ma esteso (Distanze medie & 2 Terminal separati)',
    difficultyLabel_en: 'Well-managed but sprawling (Moderate walks & 2 separate terminals)',
    averageSecurityWaitMin: 14,
    recommendedArrivalHours: { domestic: 2, international: 3 },
    navigationAdvice_it: 'Attenzione al terminal di partenza: il T1 ospita tutte le compagnie tradizionali e intercontinentali (dotato di scanner 3D C3), mentre il T2 è interamente riservato a EasyJet (scanner tradizionali, estrarre liquidi e PC). I due terminal distano circa 10 minuti di navetta gratuita continua.',
    navigationAdvice_en: 'Verify your departure terminal: T1 handles major international airlines (equipped with 3D C3 scanners), while T2 is exclusive to EasyJet (traditional scanners, remove liquids and laptops). Free terminal shuttle takes 10 mins.',
    otherCityAirports: [
      { iata: 'LIN', name_it: 'Milano Linate', name_en: 'Milan Linate', distanceInfo: '7 km a est da Milano' },
      { iata: 'BGY', name_it: 'Milano Bergamo Orio al Serio', name_en: 'Milan Bergamo Orio al Serio', distanceInfo: '50 km a nord-est da Milano' }
    ],
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Terminal 1 dotato di scanner EDS-CB C3 con corsie intelligenti. Al Terminal 2 sono presenti scanner tradizionali con limite 100ml.',
      scannersNote_en: 'Terminal 1 features EDS-CB C3 smart scanners. Terminal 2 operates traditional scanners with 100ml limit.',
      terminalRules: [
        {
          terminalName: 'Terminal 1 (Voli di Linea, Schengen, Intercontinentali)',
          has3DScanners: true,
          liquidsAllowedInBag: true,
          bottleAllowance_it: 'Liquidi e bottiglie consentiti nel bagaglio senza limiti di 100ml',
          bottleAllowance_en: 'Liquids and bottles permitted inside bag with no 100ml cap',
          electronicsInBag: true,
          notes_it: 'Corsie con scanner tomografici 3D EDS-CB C3. Portatili e bottiglie rimangono all\'interno della valigia.',
          notes_en: 'Lanes equipped with 3D EDS-CB C3 tomographic scanners. Laptops and bottles stay inside carry-on luggage.'
        },
        {
          terminalName: 'Terminal 2 (Dedicato esclusivamente ad EasyJet)',
          has3DScanners: false,
          liquidsAllowedInBag: false,
          bottleAllowance_it: 'Limite rigoroso 100ml per flacone in sacchetto trasparente da 1L (estrarre obbligatoriamente)',
          bottleAllowance_en: 'Strict 100ml per container in 1L clear plastic bag (must be unpacked)',
          electronicsInBag: false,
          notes_it: 'Scanner convenzionali: obbligo assoluto di estrarre liquidi e computer portatili e disporli nelle vaschette.',
          notes_en: 'Traditional screening: liquids and laptops must be removed and placed into separate trays.'
        }
      ],
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
      { 
        id: 'mxp-pwr', 
        category: 'power_charging', 
        title_it: 'Postazioni di ricarica rapida e tavoli business', 
        title_en: 'Rapid Charging Workstations & Business Desks', 
        terminal: 'Terminal 1 & Terminal 2', 
        location_it: 'T1: Imbarchi A e B lungo il corridoio centrale; T2: area imbarchi Gate C1-C8', 
        location_en: 'T1: Gates A and B along central corridor; T2: boarding gates C1-C8', 
        availability: 'moderate',
        scarcityNote_it: 'Disponibilità moderata: al T1 ci sono tavoli alti da lavoro con prese Schuko e USB presso i Gate A e B. Al T2 le prese sulle poltrone ordinarie sono rare, presenti solo vicino a poche colonne contrassegnate.',
        scarcityNote_en: 'Moderate availability: T1 offers high work tables with Schuko & USB at Gates A/B. At T2 outlets on standard seats are rare, only found near marked pillars.',
        details_it: 'Tavoli alti da lavoro con prese USB e AC 230V.', 
        details_en: 'High work tables equipped with USB & 230V outlets.' 
      },
      { 
        id: 'mxp-wifi', 
        category: 'wifi', 
        title_it: 'Malpensa Free Wi-Fi Illimitato', 
        title_en: 'Malpensa Free Unlimited Wi-Fi', 
        terminal: 'Terminal 1 & 2', 
        location_it: 'Tutte le aree dei terminal', 
        location_en: 'All terminal areas', 
        availability: 'abundant',
        details_it: 'Rete: "MALPENSA FREE WI-FI". Navigazione senza registrazione obbligatoria.', 
        details_en: 'Network: "MALPENSA FREE WI-FI". Free browsing with no mandatory sign-up.' 
      },
      {
        id: 'mxp-water',
        category: 'water_refill',
        title_it: 'Fontanelle acqua potabile per borracce',
        title_en: 'Free Drinking Water Refill Fountains',
        terminal: 'Terminal 1 & 2',
        location_it: 'Presso i blocchi servizi igienici di T1 (Gate A14, B20) e T2 (Gate C04)',
        location_en: 'Next to restrooms at T1 (Gates A14, B20) and T2 (Gate C04)',
        availability: 'moderate',
        scarcityNote_it: 'Distributori d\'acqua potabile gratuiti per riempire borracce situati vicino ai bagni principali.',
        scarcityNote_en: 'Free drinking water fountains for bottle refills located near main restroom clusters.',
        details_it: 'Erogatori gratuiti con acqua potabile fresca.',
        details_en: 'Free dispensers with fresh drinking water.'
      }
    ],
    venues: [
{
            "id": "mxp-v-1",
            "name": "Ferrari Spazio Bollicine",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Piazza del Gusto (Imbarchi A)",
            "hours": "06:00 - 22:00"
      },
      {
            "id": "mxp-v-2",
            "name": "Motta Milano 1928",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Area Partenze Check-in & Imbarchi",
            "hours": "05:00 - 22:30"
      },
      {
            "id": "mxp-v-3",
            "name": "Rossopomodoro",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Piazza del Gusto 1° Piano",
            "hours": "07:00 - 22:30"
      },
      {
            "id": "mxp-v-4",
            "name": "Obicà Mozzarella Bar Pizza e Cucina",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Imbarchi Imbarco B (Extra-Schengen)",
            "hours": "06:30 - 22:00"
      },
      {
            "id": "mxp-v-5",
            "name": "Wagamama Asian Food",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Imbarchi B post-controlli",
            "hours": "08:00 - 22:00"
      },
      {
            "id": "mxp-v-6",
            "name": "Panino Giusto",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi Gate A20-A25",
            "hours": "06:00 - 22:00"
      },
      {
            "id": "mxp-v-7",
            "name": "Caio Antica Pizza Romana",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Imbarchi A",
            "hours": "06:00 - 22:30"
      },
      {
            "id": "mxp-v-8",
            "name": "McDonald's",
            "category": "dining",
            "terminal": "Terminal 1 & 2",
            "location": "T1 Piano Arrivi & T2 Imbarchi EasyJet",
            "hours": "06:00 - 23:00"
      },
      {
            "id": "mxp-v-9",
            "name": "Burger King",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Area Partenze secondo piano",
            "hours": "08:00 - 22:00"
      },
      {
            "id": "mxp-v-10",
            "name": "Starbucks Coffee",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Piano Arrivi Uscita 4",
            "hours": "06:30 - 21:30"
      },
      {
            "id": "mxp-v-11",
            "name": "Illy Caffè",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Imbarchi A e Check-in Area 10",
            "hours": "05:00 - 22:00"
      },
      {
            "id": "mxp-v-12",
            "name": "Venchi Cioccolato e Gelato",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Piazza del Gusto e Gate B",
            "hours": "06:00 - 22:30"
      },
      {
            "id": "mxp-v-13",
            "name": "JuiceBar",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Imbarchi A vicino Gate A14",
            "hours": "06:00 - 21:00"
      },
      {
            "id": "mxp-v-14",
            "name": "Dufry Duty Free Malpensa",
            "category": "duty_free",
            "terminal": "Terminal 1 & 2",
            "location": "Subito dopo i controlli di sicurezza",
            "hours": "05:00 - 23:00"
      },
      {
            "id": "mxp-v-15",
            "name": "Boggi Milano",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Piazza del Lusso",
            "hours": "06:00 - 21:30"
      },
      {
            "id": "mxp-v-16",
            "name": "Armani Jeans & Emporio Armani",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Piazza del Lusso Gate A",
            "hours": "06:00 - 21:30"
      },
      {
            "id": "mxp-v-17",
            "name": "Victoria's Secret",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Imbarchi A",
            "hours": "06:30 - 21:30"
      },
      {
            "id": "mxp-v-18",
            "name": "K-Way",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Imbarchi A",
            "hours": "06:30 - 21:00"
      },
      {
            "id": "mxp-v-19",
            "name": "Relay Edicola & Libreria",
            "category": "shopping",
            "terminal": "Terminal 1 & 2",
            "location": "Check-in e Imbarchi (molteplici punti)",
            "hours": "05:00 - 22:30"
      },
      {
            "id": "mxp-v-20",
            "name": "Farmacia della Brughiera",
            "category": "pharmacy",
            "terminal": "Terminal 1",
            "location": "Piano Partenze Check-in Area 1",
            "hours": "06:00 - 21:00"
      }
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
    officialMapUrl: 'https://www.milanolinate-airport.com/it/guida-per-il-passeggero/mappa-aeroporto',
    coordinates: { lat: 45.4451, lng: 9.2767 },
    difficultyRating: 1,
    difficultyLabel_it: 'City Airport Estremamente Rapido (Punteggio 1/5)',
    difficultyLabel_en: 'Extremely Fast City Airport (Score 1/5)',
    averageSecurityWaitMin: 5,
    recommendedArrivalHours: { domestic: 1.5, international: 2 },
    navigationAdvice_it: 'City airport a soli 7km dal centro di Milano. Il 100% delle corsie è dotato di scanner 3D di ultima generazione e la metropolitana M4 porta direttamente in piazza San Babila in 12 minuti.',
    navigationAdvice_en: 'City airport just 7km from central Milan. 100% of security lanes feature next-gen 3D scanners, and Metro M4 line reaches San Babila square in 12 minutes.',
    otherCityAirports: [
      { iata: 'MXP', name_it: 'Milano Malpensa', name_en: 'Milan Malpensa', distanceInfo: '48 km a nord-ovest da Milano' },
      { iata: 'BGY', name_it: 'Milano Bergamo Orio al Serio', name_en: 'Milan Bergamo Orio al Serio', distanceInfo: '50 km a nord-est da Milano' }
    ],
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Il 100% dei varchi di sicurezza a Linate è equipaggiato con tecnologia TAC 3D EDS-CB.',
      scannersNote_en: '100% of security screening lanes at Linate are equipped with 3D CT EDS-CB technology.',
      terminalRules: [
        {
          terminalName: 'Terminal Principale Unico',
          has3DScanners: true,
          liquidsAllowedInBag: true,
          bottleAllowance_it: 'Nessun limite di volume: bottiglie e cosmetici restano nel bagaglio',
          bottleAllowance_en: 'No volume limit: beverage bottles & cosmetics stay in bag',
          electronicsInBag: true,
          notes_it: 'Tutti i varchi operano con tomografia computerizzata 3D. Non occorre separare nulla.',
          notes_en: 'All lanes operate with 3D computed tomography. No unpacking required.'
        }
      ],
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
      { 
        id: 'lin-pwr', 
        category: 'power_charging', 
        title_it: 'Prese Schuko, USB-C e wireless su tutte le sedute', 
        title_en: 'Schuko, USB-C & Wireless Pads on All Seats', 
        location_it: 'Tutti i gate imbarchi A01-A24', 
        location_en: 'All boarding gates A01-A24', 
        availability: 'abundant',
        scarcityNote_it: 'Disponibilità eccellente: quasi ogni poltroncina e postazione di lavoro nell\'area imbarchi dispone di presa elettrica 230V, USB Type-A/Type-C e ricarica a induzione.',
        scarcityNote_en: 'Exceptional availability: virtually every gate armchair features 230V Schuko, USB-A/C ports, and Qi induction charging.',
        details_it: 'Poltrone con porte USB Type-C e spine universali integrate.', 
        details_en: 'Seating with USB-C and universal power sockets.' 
      },
      {
        id: 'lin-wifi',
        category: 'wifi',
        title_it: 'Linate Free Wi-Fi Illimitato',
        title_en: 'Linate Free Unlimited Wi-Fi',
        terminal: 'Terminal Principale',
        location_it: 'Tutte le aree',
        location_en: 'All areas',
        availability: 'abundant',
        details_it: 'Wi-Fi gratuito ad alta velocità senza registrazione complessa.',
        details_en: 'High-speed free Wi-Fi with no complex registration.'
      },
      {
        id: 'lin-water',
        category: 'water_refill',
        title_it: 'Fontanelle acqua potabile per borracce',
        title_en: 'Free Drinking Water Refill Fountains',
        terminal: 'Terminal Principale',
        location_it: 'Presso i servizi igienici dell\'area partenze A08 e A17',
        location_en: 'Next to restrooms near Gates A08 and A17',
        availability: 'abundant',
        scarcityNote_it: 'Erogatori potabili gratuiti con flusso rapido per borracce.',
        scarcityNote_en: 'Free fast-spout drinking water dispensers for bottle refills.',
        details_it: 'Erogatori gratuiti con acqua fresca potabile.',
        details_en: 'Free dispensers with chilled drinking water.'
      }
    ],
    venues: [
{
            "id": "lin-v-1",
            "name": "Michelangelo Restaurant",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Secondo Piano sopra i banchi check-in",
            "hours": "12:00 - 15:00 e 19:00 - 22:00"
      },
      {
            "id": "lin-v-2",
            "name": "Panino Giusto",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Piazza del Gusto Imbarchi 1° Piano",
            "hours": "06:00 - 21:30"
      },
      {
            "id": "lin-v-3",
            "name": "Temakinho Linate",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "11:00 - 21:30"
      },
      {
            "id": "lin-v-4",
            "name": "Caio Antica Pizza Romana",
            "category": "dining",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi Gate A17",
            "hours": "06:00 - 22:00"
      },
      {
            "id": "lin-v-5",
            "name": "Illy Caffè",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Area Partenze Check-in e Imbarchi",
            "hours": "05:00 - 22:00"
      },
      {
            "id": "lin-v-6",
            "name": "Motta Caffè Bar",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Piano Terra Arrivi",
            "hours": "06:00 - 22:30"
      },
      {
            "id": "lin-v-7",
            "name": "Venchi Cioccolato e Gelato",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Imbarchi 1° Piano",
            "hours": "06:30 - 21:30"
      },
      {
            "id": "lin-v-8",
            "name": "Caffè Vergnano 1882",
            "category": "cafe",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi Gate A1-A8",
            "hours": "05:30 - 21:30"
      },
      {
            "id": "lin-v-9",
            "name": "Aelia Duty Free Linate",
            "category": "duty_free",
            "terminal": "Terminal 1",
            "location": "Subito dopo i controlli di sicurezza",
            "hours": "05:30 - 22:30"
      },
      {
            "id": "lin-v-10",
            "name": "Boggi Milano",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Piazza del Lusso 1° Piano",
            "hours": "06:00 - 21:30"
      },
      {
            "id": "lin-v-11",
            "name": "Piquadro",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Area Imbarchi",
            "hours": "06:30 - 21:00"
      },
      {
            "id": "lin-v-12",
            "name": "Relay Bookshop",
            "category": "shopping",
            "terminal": "Terminal 1",
            "location": "Imbarchi e Check-in",
            "hours": "05:30 - 22:00"
      },
      {
            "id": "lin-v-13",
            "name": "Farmacia di Linate",
            "category": "pharmacy",
            "terminal": "Terminal 1",
            "location": "Piano Partenze fronte banchi 1-10",
            "hours": "06:00 - 21:00"
      }
    ],
    transports: [
      { id: 'lin-tr-1', type: 'metro', name_it: 'Metropolitana M4 (Linea Blu per San Babila)', name_en: 'Metro Line M4 (Blue Line to San Babila)', duration: '12 min', frequency: 'Ogni 3-4 minuti', estimatedCost: '€2.20', pickupLocation_it: 'Stazione M4 piano -1 direttamente collegata al terminal', pickupLocation_en: 'Level -1 station connected directly to arrivals', details_it: 'Il collegamento metropolitano più comodo d\'Europa con il pieno centro di Milano.', details_en: 'Direct underground metro straight into central Milan (San Babila).' }
    ],
    lastUpdated: '2026-10-18'
  },

  // -------------------------------------------------------------------------
  // MILANO BERGAMO ORIO AL SERIO (BGY)
  // -------------------------------------------------------------------------
  {
    id: 'bgy',
    iata: 'BGY',
    icao: 'LIME',
    name_it: 'Aeroporto di Milano Bergamo Orio al Serio (Il Caravaggio)',
    name_en: 'Milan Bergamo Airport (Orio al Serio / Il Caravaggio)',
    city_it: 'Milano / Bergamo',
    city_en: 'Milan / Bergamo',
    country_it: 'Italia',
    country_en: 'Italy',
    countryCode: 'IT',
    officialWebsite: 'https://www.milanbergamoairport.it',
    officialMapUrl: 'https://www.milanbergamoairport.it/it/mappa-aeroporto/',
    coordinates: { lat: 45.6739, lng: 9.7042 },
    difficultyRating: 3,
    difficultyLabel_it: 'Intenso & Molto Frequentato (Hub Ryanair n.1 in Italia)',
    difficultyLabel_en: 'High-frequency & Bustling (Main Italian Ryanair Hub)',
    averageSecurityWaitMin: 12,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'Hub primario per Ryanair in Italia, con altissima frequenza di voli. Corsie di sicurezza potenziate con scanner 3D C3 sulle linee centrali. Attenzione nei momenti di picco (mattina presto e tardo pomeriggio): consultare i display per la corsia designata.',
    navigationAdvice_en: 'Primary Ryanair hub in Italy with dense flight schedules. Enhanced security with 3D C3 scanners on central lanes. Follow digital overhead lane signage during morning and evening rush banks.',
    otherCityAirports: [
      { iata: 'MXP', name_it: 'Milano Malpensa', name_en: 'Milan Malpensa', distanceInfo: '50 km a nord-ovest da Milano' },
      { iata: 'LIN', name_it: 'Milano Linate', name_en: 'Milan Linate', distanceInfo: '50 km a sud-ovest da Bergamo' }
    ],
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Nuovi scanner EDS-CB C3 tomografici installati sulle corsie di sicurezza principali: sulle corsie abilitate è possibile lasciare liquidi e computer nella borsa.',
      scannersNote_en: 'Next-gen EDS-CB C3 computed tomography scanners installed on main security lanes: liquids and laptops stay inside luggage on equipped lanes.',
      terminalRules: [
        {
          terminalName: 'Corsie Sicurezza 3D C3 (Varchi Centrali)',
          has3DScanners: true,
          liquidsAllowedInBag: true,
          bottleAllowance_it: 'Liquidi e bevande restano nel bagaglio a mano senza estrarli',
          bottleAllowance_en: 'Liquids and beverages stay inside bag without unpacking',
          electronicsInBag: true,
          notes_it: 'Corsie ad alta tecnologia: non occorre estrarre portatili, tablet o flaconi.',
          notes_en: 'High-tech lanes: no need to unpack laptops, tablets, or liquid containers.'
        },
        {
          terminalName: 'Corsie Tradizionali Ausiliarie (Varchi Laterali)',
          has3DScanners: false,
          liquidsAllowedInBag: false,
          bottleAllowance_it: 'Limite 100ml in busta trasparente 1L (estrarre obbligatoriamente)',
          bottleAllowance_en: 'Standard 100ml limit in 1L clear pouch (unpack into separate tray)',
          electronicsInBag: false,
          notes_it: 'Attivate nei picchi di traffico: estrarre computer e sacchetto liquidi.',
          notes_en: 'Activated during peak queues: unpack electronics and liquid pouch.'
        }
      ],
      liquidsAllowance_it: 'Sui varchi abilitati C3 non occorre estrarre liquidi né bottiglie. Se indirizzati dal personale sulle corsie convenzionali, vige la regola dei 100ml in busta trasparente.',
      liquidsAllowance_en: 'On C3-enabled lanes liquids and bottles stay inside carry-on. If directed to conventional lanes, standard 100ml clear pouch applies.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Sulle corsie 3D C3 i computer e tablet possono rimanere all\'interno dello zaino.',
      electronicsNote_en: 'On 3D C3 lanes laptops and tablets can remain inside your backpack.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi esclusivamente come bagaglio a mano. Batterie rimosse e protette.',
      dronePolicy_en: 'Drones permitted in cabin luggage only with batteries isolated.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Powerbank fino a 100Wh consentiti solo in cabina.',
      powerbankPolicy_en: 'Powerbanks up to 100Wh permitted in cabin only.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.milanbergamoairport.it/it/controlli-di-sicurezza/',
      lastVerifiedDate: '2026-10-20'
    },
    terminals: [
      { id: 'bgy-main', name: 'Terminal Passeggeri Unico', transferInfo_it: 'Aerostazione a due livelli con area partenze Schengen (piano terra) ed extra-Schengen (primo piano).', transferInfo_en: 'Two-level terminal with Schengen departures on ground floor and non-Schengen upstairs.' }
    ],
    airlines: [
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal Unico', checkInZone: 'Banchi Check-in 01-34' },
      { airlineName: 'Wizz Air', iataCode: 'W4', terminal: 'Terminal Unico', checkInZone: 'Banchi Check-in 35-42' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal Unico', checkInZone: 'Banchi Check-in 43-46' },
      { airlineName: 'AeroItalia', iataCode: 'XZ', terminal: 'Terminal Unico', checkInZone: 'Banchi Check-in 47-50' }
    ],
    amenities: [
      {
        id: 'bgy-pwr',
        category: 'power_charging',
        title_it: 'Tavoli di lavoro alti con prese e colonnine',
        title_en: 'High Work Benches & Charging Columns',
        terminal: 'Terminal Unico',
        location_it: 'Tavoli alti fronte Gate A1-A5 e nella food court al 1° piano',
        location_en: 'High work benches near Gates A1-A5 and 1st floor food court',
        availability: 'moderate',
        scarcityNote_it: 'Disponibilità moderata: le prese elettriche Schuko e USB si trovano sui banconi di lavoro alti ai Gate A1-A5 e vicino ad alcune colonnine di ricarica. Le file di sedute ordinarie ai gate ne sono prive.',
        scarcityNote_en: 'Moderate availability: Schuko & USB sockets are placed on tall work counters near Gates A1-A5 and dedicated charging pillars. Standard gate rows have no outlets.',
        details_it: 'Banconi di lavoro con prese universali e porte USB per la ricarica dei dispositivi.',
        details_en: 'Work counters equipped with universal sockets and USB ports for device charging.'
      },
      {
        id: 'bgy-wifi',
        category: 'wifi',
        title_it: 'Free Wi-Fi Bergamo Airport',
        title_en: 'Free Wi-Fi Bergamo Airport',
        terminal: 'Terminal Unico',
        location_it: 'Disponibile in tutto il terminal',
        location_en: 'Available across terminal',
        availability: 'abundant',
        details_it: 'Rete: "Free Wi-Fi Bergamo Airport". Accesso gratuito illimitato.',
        details_en: 'Network: "Free Wi-Fi Bergamo Airport". Free unlimited internet.'
      },
      {
        id: 'bgy-water',
        category: 'water_refill',
        title_it: 'Fontanelle erogatore acqua potabile gratuita',
        title_en: 'Free Drinking Water Refill Fountains',
        terminal: 'Terminal Unico',
        location_it: 'Presso i servizi igienici vicino ai Gate A e ai Gate B',
        location_en: 'Next to restrooms near Gates A and Gates B',
        availability: 'abundant',
        scarcityNote_it: 'Erogatori gratuiti con beccuccio rapido per riempire borracce vuote dopo i controlli.',
        scarcityNote_en: 'Free quick-spout fountains for refilling bottles post-security.',
        details_it: 'Erogatori gratuiti per riempimento borracce.',
        details_en: 'Free water dispensers for refilling bottles.'
      }
    ],
    venues: [
{
            "id": "bgy-v-1",
            "name": "Vicook Bistrot (Fratelli Cerea 3-Stelle)",
            "category": "dining",
            "terminal": "Terminal Unico",
            "location": "Area Imbarchi Gate A1-A6 (1° Piano)",
            "hours": "06:00 - 22:00"
      },
      {
            "id": "bgy-v-2",
            "name": "Rossopomodoro",
            "category": "dining",
            "terminal": "Terminal Unico",
            "location": "Area Imbarchi post-sicurezza",
            "hours": "07:00 - 22:30"
      },
      {
            "id": "bgy-v-3",
            "name": "Panino Giusto",
            "category": "dining",
            "terminal": "Terminal Unico",
            "location": "Area Imbarchi Gate A",
            "hours": "06:00 - 22:00"
      },
      {
            "id": "bgy-v-4",
            "name": "Caio Pizza Romana",
            "category": "dining",
            "terminal": "Terminal Unico",
            "location": "Imbarchi centrale",
            "hours": "06:00 - 22:30"
      },
      {
            "id": "bgy-v-5",
            "name": "McDonald's",
            "category": "dining",
            "terminal": "Terminal Unico",
            "location": "Piano Terra Partenze e Imbarchi Gate B",
            "hours": "05:30 - 23:00"
      },
      {
            "id": "bgy-v-6",
            "name": "Motta Caffè Bar",
            "category": "cafe",
            "terminal": "Terminal Unico",
            "location": "Piano Arrivi",
            "hours": "06:00 - 23:00"
      },
      {
            "id": "bgy-v-7",
            "name": "Espressamente Illy",
            "category": "cafe",
            "terminal": "Terminal Unico",
            "location": "Area Partenze Check-in",
            "hours": "05:00 - 22:00"
      },
      {
            "id": "bgy-v-8",
            "name": "Briciole Bar & Bakery",
            "category": "cafe",
            "terminal": "Terminal Unico",
            "location": "Imbarchi Gate B01-B10",
            "hours": "05:00 - 22:30"
      },
      {
            "id": "bgy-v-9",
            "name": "JuiceBar",
            "category": "cafe",
            "terminal": "Terminal Unico",
            "location": "Imbarchi fronte Gate A",
            "hours": "06:00 - 21:30"
      },
      {
            "id": "bgy-v-10",
            "name": "Dufry Duty Free Bergamo",
            "category": "duty_free",
            "terminal": "Terminal Unico",
            "location": "Subito dopo i filtri di sicurezza",
            "hours": "05:00 - 23:00"
      },
      {
            "id": "bgy-v-11",
            "name": "Kiko Milano",
            "category": "shopping",
            "terminal": "Terminal Unico",
            "location": "Galleria Commerciale Imbarchi",
            "hours": "06:30 - 21:30"
      },
      {
            "id": "bgy-v-12",
            "name": "Boggi Milano",
            "category": "shopping",
            "terminal": "Terminal Unico",
            "location": "Galleria Commerciale Imbarchi",
            "hours": "06:30 - 21:30"
      },
      {
            "id": "bgy-v-13",
            "name": "Relay / Hudson News",
            "category": "shopping",
            "terminal": "Terminal Unico",
            "location": "Area Imbarchi Gate A e B",
            "hours": "05:00 - 22:30"
      },
      {
            "id": "bgy-v-14",
            "name": "Farmacia Orio al Serio",
            "category": "pharmacy",
            "terminal": "Terminal Unico",
            "location": "Piano Terra Partenze landside",
            "hours": "06:00 - 21:00"
      }
    ],
    transports: [
      { id: 'bgy-tr-1', type: 'bus', name_it: 'Orio Shuttle / Autostradale / Terravision (per Milano Centrale)', name_en: 'Orio Shuttle / Autostradale Coach (to Milan Central)', duration: '50-60 min', frequency: 'Ogni 15-20 minuti', estimatedCost: '€10.00-€12.00', pickupLocation_it: 'Corsie bus 2, 3 e 4 piazzale arrivi', pickupLocation_en: 'Bus bays 2, 3 & 4 outside arrivals', details_it: 'Autobus gran turismo frequenti e diretti per la Stazione di Milano Centrale (fermata piazza Luigi di Savoia).', details_en: 'Frequent direct express motorcoaches straight to Milan Central Station.' },
      { id: 'bgy-tr-2', type: 'bus', name_it: 'ATB Linea 1 Airport Bus (per Bergamo Stazione e Città Alta)', name_en: 'ATB Line 1 Airport Bus (to Bergamo Station & Città Alta)', duration: '15-25 min', frequency: 'Ogni 20 minuti', estimatedCost: '€2.80', pickupLocation_it: 'Pensilina ATB corsia 1 piazzale arrivi', pickupLocation_en: 'ATB bus stop bay 1 outside arrivals', details_it: 'Bus pubblico urbano per la stazione ferroviaria di Bergamo (15 min) e la splendida Città Alta (25 min).', details_en: 'City bus connecting to Bergamo railway station (15 min) and historic Upper City (25 min).' }
    ],
    lastUpdated: '2026-10-20'
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
    officialWebsite: 'https://airportchopin.com',
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
      officialSourceUrl: 'https://airportchopin.com/en/info/security',
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
      officialSourceUrl: 'https://www.bud.hu/en/flight-and-travel-information/travel/security-screening',
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
      liquidsAllowance_it: 'In linea con gli standard europei, i singoli flaconi non devono superare i 100ml. Nelle corsie con scanner 3D CT i liquidi e i dispositivi elettronici possono rimanere all\'interno del bagaglio a mano.',
      liquidsAllowance_en: 'In line with European standards, individual containers must not exceed 100ml. On 3D CT scanner lanes, liquids and laptops can stay inside carry-on baggage.',
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
      officialSourceUrl: 'https://www.flughafen-zuerich.ch/en/passengers/fly/all-about-the-flight/what-is-allowed-in-your-baggage',
      lastVerifiedDate: '2026-10-28'
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
    lastUpdated: '2026-10-28'
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
      liquidsAllowance_it: 'Limite provvisorio UE di 100ml a flacone. Nelle corsie dotate di nuovi scanner tomografici CT 3D i liquidi e i dispositivi elettronici rimangono all\'interno del bagaglio a mano senza estrarli.',
      liquidsAllowance_en: 'Temporary EU 100ml container cap applies. On lanes equipped with new CT 3D scanners, liquids and laptops remain inside your carry-on luggage.',
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
      lastVerifiedDate: '2026-10-28'
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
    lastUpdated: '2026-10-28'
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
      liquidsAllowance_it: 'Limite provvisorio UE di max 100ml per flacone. Sulle corsie con scanner tomografici CT (Terminal 2 e nuove corsie T1) liquidi e apparecchi elettronici rimangono all\'interno del bagaglio a mano.',
      liquidsAllowance_en: 'Temporary EU 100ml container cap applies. On lanes with modern CT scanners (Terminal 2 and new T1 lanes), liquids and electronic devices remain inside carry-on luggage.',
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
      lastVerifiedDate: '2026-10-28'
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
    lastUpdated: '2026-10-28'
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
      liquidsAllowance_it: 'Limite provvisorio UE di 100ml per flacone. Nelle corsie con nuovi scanner 3D CT i liquidi e i dispositivi elettronici possono rimanere all\'interno del bagaglio a mano senza estrarli.',
      liquidsAllowance_en: 'Temporary EU 100ml container cap in place. On lanes with new 3D CT scanners, liquids and electronic devices can stay inside carry-on luggage without being unpacked.',
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
      lastVerifiedDate: '2026-10-28'
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
    lastUpdated: '2026-10-28'
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
      liquidsAllowance_it: 'Limite provvisorio UE di 100ml per flacone. Nelle corsie con nuovi scanner 3D CT i liquidi e i dispositivi elettronici possono rimanere all\'interno del bagaglio a mano senza estrarli.',
      liquidsAllowance_en: 'Temporary EU 100ml container cap in place. On lanes with new 3D CT scanners, liquids and electronic devices can stay inside carry-on luggage without being unpacked.',
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
      lastVerifiedDate: '2026-10-28'
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
    lastUpdated: '2026-10-28'
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
      liquidsAllowance_it: 'In ottemperanza alla normativa provvisoria UE, ciascun flacone non deve superare i 100ml. Grazie agli scanner CT 3D presenti su tutti i varchi, i liquidi e i computer possono rimanere all\'interno del bagaglio a mano senza estrarli.',
      liquidsAllowance_en: 'Under temporary EU regulations, individual liquid containers must not exceed 100ml each. Thanks to 100% 3D CT scanners, liquids and electronics stay packed inside your cabin bag without unpacking.',
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
      officialSourceUrl: 'https://www.schiphol.nl/en/page/liquids-in-hand-baggage/',
      lastVerifiedDate: '2026-10-28'
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
    officialMapUrl: 'https://www.parisaeroport.fr/passagers/acces/paris-charles-de-gaulle/plans-des-terminaux',
    coordinates: { lat: 49.0097, lng: 2.5479 },
    difficultyRating: 4,
    difficultyLabel_it: 'Complesso e suddiviso (Navetta CDGVAL richiesta)',
    difficultyLabel_en: 'Complex & Fragmented (CDGVAL shuttle required)',
    averageSecurityWaitMin: 20,
    recommendedArrivalHours: { domestic: 2, international: 3.5 },
    navigationAdvice_it: 'Il Terminal 2 è diviso in 7 sub-terminal (2A fino a 2G). Utilizzare il treno automatico gratuito CDGVAL per muoversi tra T1, T2 e T3.',
    navigationAdvice_en: 'Terminal 2 is split into 7 sub-terminals (2A through 2G). Use the free automated train CDGVAL to travel between T1, T2, and T3.',
    otherCityAirports: [
      { iata: 'ORY', name_it: 'Parigi Orly', name_en: 'Paris Orly', distanceInfo: '14 km a sud di Parigi' }
    ],
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
      lastVerifiedDate: '2026-10-28'
    },
    terminals: [
      { id: 'cdg-t1', name: 'Terminal 1', transferInfo_it: 'Design circolare. Star Alliance e compagnie internazionali.', transferInfo_en: 'Circular design. Star Alliance and international carriers.' },
      { id: 'cdg-t2', name: 'Terminal 2', transferInfo_it: 'Hub globale Air France & SkyTeam.', transferInfo_en: 'Air France & SkyTeam main hub.' }
    ],
    airlines: [
      { airlineName: 'Air France', iataCode: 'AF', terminal: 'Terminal 2E / 2F / 2G', checkInZone: 'Hall partenze 2E/2F' }
    ],
    amenities: [
      { 
        id: 'cdg-pwr', 
        category: 'power_charging', 
        title_it: 'Aree di lavoro e ricarica con prese Schuko e USB', 
        title_en: 'Work & Charging Stations with Schuko & USB', 
        terminal: 'Terminal 1 & 2', 
        location_it: 'Presso le lounge di transito e gate T2E, T2F e T1', 
        location_en: 'Near transit lounges and boarding gates at T2E, T2F, and T1', 
        availability: 'moderate',
        scarcityNote_it: 'Disponibilità moderata: i tavoli alti da lavoro e le aree business dispongono di prese elettriche. Le sedute standard dei gate più periferici ne sono sprovviste.',
        scarcityNote_en: 'Moderate availability: tall workbenches and business corners feature outlets. Standard waiting rows at distant gates have none.',
        details_it: 'Prese universali Schuko e doppie porte USB nei tavoli di lavoro.', 
        details_en: 'Universal Schuko sockets and dual USB ports on work stations.' 
      },
      { id: 'cdg-wifi', category: 'wifi', title_it: 'WIFI-AIRPORT Gratuito Illimitato', title_en: 'WIFI-AIRPORT Free Unlimited', location_it: 'Tutto il terminal', location_en: 'Terminal-wide', availability: 'abundant', details_it: 'Accesso gratuito senza limitazioni.', details_en: 'Free unlimited access.' },
      { id: 'cdg-water', category: 'water_refill', title_it: 'Fontanelle acqua potabile per viaggiatori', title_en: 'Free Drinking Water Dispensers', terminal: 'Tutti i Terminal', location_it: 'Presso i servizi igienici post-sicurezza', location_en: 'Near restrooms post-security', availability: 'moderate', details_it: 'Erogatori gratuiti con acqua fresca potabile.', details_en: 'Free dispensers with chilled water.' }
    ],
    venues: [
      { id: 'cdg-v1', name: 'Ladurée Paris', category: 'cafe', terminal: 'Terminal 1 & 2', location: 'Partenze', hours: '06:00 - 22:00' }
    ],
    transports: [
      { id: 'cdg-tr-1', type: 'train', name_it: 'RER B (Treno Suburbano per Parigi)', name_en: 'RER B (Suburban Train to Paris)', duration: '35 min', frequency: 'Ogni 10-15 minuti', estimatedCost: '€11.80', pickupLocation_it: 'Stazione Aeroporto CDG 1 (T3) e CDG 2 (T2)', pickupLocation_en: 'Stations CDG 1 (T3) and CDG 2 (T2)', details_it: 'Arriva a Gare du Nord e Châtelet-Les Halles.', details_en: 'Reaches Gare du Nord and Châtelet-Les Halles.' }
    ],
    lastUpdated: '2026-10-28'
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
    officialMapUrl: 'https://www.parisaeroport.fr/passagers/acces/paris-orly/plans-des-terminaux',
    coordinates: { lat: 48.7262, lng: 2.3652 },
    difficultyRating: 2,
    difficultyLabel_it: 'Connessione Metro 14 Rapida (25 min dal centro)',
    difficultyLabel_en: 'Fast Metro 14 Connection (25 min from downtown)',
    averageSecurityWaitMin: 14,
    recommendedArrivalHours: { domestic: 2, international: 2.5 },
    navigationAdvice_it: 'La nuova estensione della linea metropolitana M14 collega Orly direttamente a Châtelet nel cuore di Parigi in soli 25 minuti.',
    navigationAdvice_en: 'Line 14 automated metro extension reaches Châtelet in central Paris in just 25 minutes.',
    otherCityAirports: [
      { iata: 'CDG', name_it: 'Parigi Charles de Gaulle', name_en: 'Paris Charles de Gaulle', distanceInfo: '25 km a nord-est di Parigi' }
    ],
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
      lastVerifiedDate: '2026-10-28'
    },
    terminals: [
      { id: 'ory-main', name: 'Orly 1, 2, 3, 4', transferInfo_it: 'Settori interconnessi.', transferInfo_en: 'Connected concourses.' }
    ],
    airlines: [
      { airlineName: 'Transavia', iataCode: 'TO', terminal: 'Orly 3 & 4', checkInZone: 'Hall Orly 3' }
    ],
    amenities: [
      { 
        id: 'ory-pwr', 
        category: 'power_charging', 
        title_it: 'Tavoli di ricarica con porte USB e prese', 
        title_en: 'Charging Benches with USB & Power Outlets', 
        terminal: 'Orly 1-4', 
        location_it: 'Area imbarchi fronte Gate B e Gate D', 
        location_en: 'Boarding lounges near Gates B and D', 
        availability: 'moderate',
        scarcityNote_it: 'Disponibilità moderata: prese concentrate su banconi dedicati, assenti sulla maggioranza delle poltroncine di attesa singole.',
        scarcityNote_en: 'Moderate availability: outlets concentrated on dedicated benches, absent from majority of individual waiting chairs.',
        details_it: 'Tavoli di ricarica dedicati per tablet e smartphone.', 
        details_en: 'Dedicated charging desks for mobile devices.' 
      },
      { id: 'ory-wifi', category: 'wifi', title_it: 'WIFI-AIRPORT Gratuito', title_en: 'WIFI-AIRPORT Free', location_it: 'Tutto il terminal', location_en: 'Terminal-wide', availability: 'abundant', details_it: 'Connessione illimitata.', details_en: 'Free connection.' }
    ],
    venues: [
      { id: 'ory-v1', name: 'Paul Boulangerie', category: 'cafe', terminal: 'Orly 1-4', location: 'Partenze', hours: '05:30 - 21:30' }
    ],
    transports: [
      { id: 'ory-tr-1', type: 'metro', name_it: 'Metropolitana Linea 14 (per Châtelet)', name_en: 'Metro Line 14 (to Châtelet)', duration: '25 min', frequency: 'Ogni 3-5 minuti', estimatedCost: '€10.30', pickupLocation_it: 'Stazione sotterranea fronte Orly 3', pickupLocation_en: 'Underground station facing Orly 3', details_it: 'Il collegamento più rapido per il centro.', details_en: 'Fastest link to center.' }
    ],
    lastUpdated: '2026-10-28'
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
      scannersNote_it: 'Tutti i varchi dei Terminal 1 e 2 sono dotati di scanner tomografici C3. Tuttavia, in recepimento della direttiva provvisoria UE, vige il limite di 100ml per flacone.',
      scannersNote_en: 'All screening lanes in T1 and T2 feature C3 scanners. However, under temporary EU rules, the 100ml container cap remains in effect.',
      liquidsAllowance_it: 'Flaconi fino a 100ml ciascuno. Grazie ai nuovi scanner C3 presenti in entrambi i terminal, i liquidi e i dispositivi elettronici possono rimanere all\'interno del bagaglio a mano senza estrarli.',
      liquidsAllowance_en: 'Containers up to 100ml each. Thanks to C3 scanners across all lanes, liquids and laptops can stay packed inside your cabin bag.',
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
      officialSourceUrl: 'https://www.dublinairport.com/at-the-airport/security/security-faqs',
      lastVerifiedDate: '2026-10-28'
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
      officialSourceUrl: 'https://www.ana.pt/en/lis/passenger-guide/what-you-need-to-know/security-control',
      lastVerifiedDate: '2026-10-28'
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
      liquidsAllowance_it: 'Limite provvisorio UE di 100ml per singolo flacone. Nelle corsie con scanner 3D tomografici del Terminal 3, i liquidi e i dispositivi elettronici possono rimanere all\'interno del bagaglio a mano senza estrarli.',
      liquidsAllowance_en: 'Temporary EU 100ml container cap applies. On 3D CT lanes in Terminal 3, liquids and laptops can stay inside carry-on baggage without unpacking.',
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
      lastVerifiedDate: '2026-10-28'
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
    lastUpdated: '2026-10-28'
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
      liquidsAllowance_it: 'Limite provvisorio UE di max 100ml a contenitore. Nelle corsie dotate di tecnologia 3D CT i liquidi e i computer portatili possono rimanere all\'interno del bagaglio a mano.',
      liquidsAllowance_en: 'Temporary EU 100ml container cap applies. On lanes equipped with 3D CT technology, liquids and laptops can stay inside your cabin bag.',
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
      lastVerifiedDate: '2026-10-28'
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
    lastUpdated: '2026-10-28'
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
      terminalRules: [
        {
          terminalName: 'Terminal 5 (Scanner 3D CT)',
          has3DScanners: true,
          liquidsAllowedInBag: true,
          bottleAllowance_it: 'Max 100ml per flacone (direttiva UE). Possono rimanere nella valigia senza estrarli.',
          bottleAllowance_en: 'Max 100ml per container (EU rule). Can remain inside bag without unpacking.',
          electronicsInBag: true,
          notes_it: 'Varco centralizzato 3D: laptop e sacchetto liquidi restano nella valigia.',
          notes_en: 'Central 3D checkpoint: laptops and liquids stay inside carry-on luggage.'
        },
        {
          terminalName: 'Terminal 2 & 4 (Corsie standard)',
          has3DScanners: false,
          liquidsAllowedInBag: false,
          bottleAllowance_it: 'Limite 100ml in busta trasparente da 1 litro da estrarre',
          bottleAllowance_en: '100ml limit in 1-litre clear plastic bag to be removed',
          electronicsInBag: false,
          notes_it: 'Controlli convenzionali: estrarre sacchetto liquidi e dispositivi elettronici.',
          notes_en: 'Standard screening: remove liquids bag and electronic devices.'
        }
      ],
      liquidsAllowance_it: 'Al nuovo varco del Terminal 5 i liquidi (max 100ml a flacone) possono rimanere all\'interno del bagaglio a mano; al Terminal 2 vanno estratti nella busta trasparente.',
      liquidsAllowance_en: 'At Terminal 5 3D checkpoint liquids (max 100ml per container) stay inside carry-on luggage; at Terminal 2 they must be removed in a clear bag.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Computer e dispositivi elettronici restano nella borsa al Terminal 5; da estrarre al T2.',
      electronicsNote_en: 'Laptops and electronics stay inside your bag at T5; unpacked at T2.',
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
      lastVerifiedDate: '2026-10-28'
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
      liquidsAllowance_it: 'In conformità alla direttiva UE provvisoria, ciascun flacone deve avere capienza max 100ml. Grazie al 100% di scanner 3D CT su tutte le corsie, i liquidi e i dispositivi elettronici rimangono all\'interno del bagaglio a mano senza estrarli.',
      liquidsAllowance_en: 'Under temporary EU rules, individual containers must not exceed 100ml. Thanks to 100% 3D CT scanners across all lanes, liquids and electronics stay packed inside your cabin bag without unpacking.',
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
      lastVerifiedDate: '2026-10-28'
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
    lastUpdated: '2026-10-28'
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
    officialMapUrl: 'https://www.heathrow.com/at-the-airport/airport-maps',
    coordinates: { lat: 51.4700, lng: -0.4543 },
    difficultyRating: 4,
    difficultyLabel_it: 'Molto Grande & Dispersivo (Prevedere anticipo)',
    difficultyLabel_en: 'Very Large & Sprawling (Allow plenty of time)',
    averageSecurityWaitMin: 22,
    recommendedArrivalHours: { domestic: 2, international: 3.5 },
    navigationAdvice_it: 'Aeroporto vastissimo. Calcolare fino a 20-25 minuti a piedi per raggiungere i gate satellitari del Terminal 5 e Terminal 2.',
    navigationAdvice_en: 'Sprawling mega-hub. Allow up to 20-25 minutes walking to reach satellite gates.',
    otherCityAirports: [
      { iata: 'LGW', name_it: 'Londra Gatwick', name_en: 'London Gatwick', distanceInfo: '47 km a sud di Londra' }
    ],
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'Reintrodotta temporaneamente la regola dei 100ml dal Dipartimento dei Trasporti britannico (DfT) durante l\'estensione dei nuovi scanner 3D C3.',
      scannersNote_en: 'UK Department for Transport temporarily reinstated 100ml limit across UK airports while 3D C3 scanners are being deployed.',
      terminalRules: [
        {
          terminalName: 'Terminal 2 & Terminal 5',
          has3DScanners: true,
          liquidsAllowedInBag: false,
          bottleAllowance_it: 'Max 100ml per flacone (direttiva UK DfT provvisoria). I liquidi possono restare nella valigia sulle linee 3D attive.',
          bottleAllowance_en: 'Max 100ml per container (temporary UK DfT rule). Liquids may stay inside bags on active 3D lanes.',
          electronicsInBag: true,
          notes_it: 'Scanner 3D CTiX installati in progressiva attivazione su varie corsie. Seguire rigorosamente il personale di sicurezza.',
          notes_en: '3D CTiX scanners progressively operating. Follow ground security agents instructions.'
        },
        {
          terminalName: 'Terminal 3 & Terminal 4',
          has3DScanners: false,
          liquidsAllowedInBag: false,
          bottleAllowance_it: 'Limite tassativo 100ml in busta trasparente 20x20cm da estrarre',
          bottleAllowance_en: 'Strict 100ml limit in 20x20cm clear bag to be unpacked',
          electronicsInBag: false,
          notes_it: 'Linee tradizionali: estrarre computer e sacchetto liquidi.',
          notes_en: 'Standard screening lines: remove laptops and liquid bag.'
        }
      ],
      liquidsAllowance_it: 'I liquidi devono essere in flaconi da massimo 100ml inseriti in un singolo sacchetto trasparente di 20x20 cm.',
      liquidsAllowance_en: 'Liquids max 100ml in one clear resealable bag.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Laptop e grandi tablet devono essere estratti e scansionati separatamente sulle corsie convenzionali.',
      electronicsNote_en: 'Laptops and large tablets must be taken out on standard lanes.',
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
      lastVerifiedDate: '2026-10-28'
    },
    terminals: [
      { id: 'lhr-t2', name: 'Terminal 2', transferInfo_it: 'Star Alliance Hub.', transferInfo_en: 'Star Alliance Hub.' },
      { id: 'lhr-t5', name: 'Terminal 5', transferInfo_it: 'Hub esclusivo British Airways.', transferInfo_en: 'British Airways hub.' }
    ],
    airlines: [
      { airlineName: 'British Airways', iataCode: 'BA', terminal: 'Terminal 5', checkInZone: 'Zone A-H' }
    ],
    amenities: [
      { 
        id: 'lhr-pwr', 
        category: 'power_charging', 
        title_it: 'Prese BS1363 UK, prese Schuko e porte USB', 
        title_en: 'BS1363 UK, Schuko & USB Power Outlets', 
        terminal: 'Terminal 2, 3, 4, 5', 
        location_it: 'Tavoli di lavoro dedicati e file di sedute ai Gate T2 e T5', 
        location_en: 'Dedicated work tables and gate seating at T2 and T5', 
        availability: 'abundant',
        scarcityNote_it: 'Disponibilità molto buona: la maggior parte dei banchi e delle sedute al Terminal 2 e al Terminal 5 dispone di prese USB e prese UK.',
        scarcityNote_en: 'Very good availability: most gate seats and work counters in T2 and T5 feature USB and UK plugs.',
        details_it: 'Prese integrate per ricarica laptop e smartphone.', 
        details_en: 'Integrated charging outlets for laptops and phones.' 
      },
      { id: 'lhr-wifi', category: 'wifi', title_it: 'Heathrow Free Wi-Fi', title_en: 'Heathrow Free Wi-Fi', location_it: 'Tutti i terminal', location_en: 'All terminals', availability: 'abundant', details_it: 'Wi-Fi gratuito illimitato.', details_en: 'Free unlimited Wi-Fi.' },
      { id: 'lhr-water', category: 'water_refill', title_it: 'Fontanelle acqua potabile per passeggeri', title_en: 'Free Drinking Water Refill Stations', terminal: 'Tutti i Terminal', location_it: 'Accanto a ciascun blocco di servizi igienici airside', location_en: 'Next to every airside restroom block', availability: 'abundant', details_it: 'Erogatori gratuiti con acqua fresca potabile.', details_en: 'Free chilled water refill stations.' }
    ],
    venues: [
      { id: 'lhr-v1', name: 'Gordon Ramsay Plane Food', category: 'dining', terminal: 'Terminal 5', location: 'Airside 1st floor', hours: '05:30 - 21:30' }
    ],
    transports: [
      { id: 'lhr-tr-1', type: 'train', name_it: 'Heathrow Express (per Paddington)', name_en: 'Heathrow Express (to Paddington)', duration: '15 min', frequency: 'Ogni 15 minuti', estimatedCost: '£25.00', pickupLocation_it: 'Heathrow Central e T5', pickupLocation_en: 'Heathrow Central and T5', details_it: 'Il modo più rapido per il centro.', details_en: 'Fastest connection to London.' }
    ],
    lastUpdated: '2026-10-18'
  },

  // -------------------------------------------------------------------------
  // LONDRA GATWICK (LGW)
  // -------------------------------------------------------------------------
  {
    id: 'lgw',
    iata: 'LGW',
    icao: 'EGKK',
    name_it: 'Aeroporto di Londra Gatwick',
    name_en: 'London Gatwick Airport',
    city_it: 'Londra',
    city_en: 'London',
    country_it: 'Regno Unito',
    country_en: 'United Kingdom',
    countryCode: 'GB',
    officialWebsite: 'https://www.gatwickairport.com',
    officialMapUrl: 'https://www.gatwickairport.com/passenger-guide/flight-information/terminal-maps.html',
    coordinates: { lat: 51.1537, lng: -0.1821 },
    difficultyRating: 3,
    difficultyLabel_it: 'Hub a due Terminal (North & South) con monorotaia rapida',
    difficultyLabel_en: 'Dual-Terminal Hub (North & South) with rapid shuttle',
    averageSecurityWaitMin: 12,
    recommendedArrivalHours: { domestic: 2, international: 3 },
    navigationAdvice_it: 'I due terminal (North Terminal e South Terminal) sono collegati da una navetta monorotaia gratuita h24 (durata 2 minuti). La stazione ferroviaria con treni diretti per Londra Victoria e London Bridge è situata nel South Terminal.',
    navigationAdvice_en: 'North Terminal and South Terminal are linked by a free 24/7 automated monorail shuttle (2-min ride). The rail station with express trains to London Victoria and London Bridge is located at South Terminal.',
    otherCityAirports: [
      { iata: 'LHR', name_it: 'Londra Heathrow', name_en: 'London Heathrow', distanceInfo: '23 km a ovest di Londra' }
    ],
    securityPolicy: {
      has3DScanners: true,
      scannersNote_it: 'Gatwick ha completato l\'installazione degli scanner 3D C3. Tuttavia, in ottemperanza alla norma temporanea del Governo UK, vige ancora il limite dei 100ml per contenitore.',
      scannersNote_en: 'Gatwick completed 3D C3 scanner rollout. However, under temporary UK Government rules, the 100ml container cap remains in place.',
      terminalRules: [
        {
          terminalName: 'North Terminal & South Terminal (Scanner 3D C3)',
          has3DScanners: true,
          liquidsAllowedInBag: true,
          bottleAllowance_it: 'Max 100ml per flacone (direttiva UK). Possono rimanere nella valigia senza estrarli.',
          bottleAllowance_en: 'Max 100ml per container (UK DfT rule). Can stay inside bag without unpacking.',
          electronicsInBag: true,
          notes_it: 'Scanner 3D C3 di nuova generazione: laptop, tablet e sacchetto liquidi restano nella valigia.',
          notes_en: 'Next-gen 3D C3 scanners: laptops, tablets, and liquids stay inside luggage.'
        }
      ],
      liquidsAllowance_it: 'Tutti i liquidi devono essere contenuti in recipienti di capienza massima 100ml. Grazie agli scanner 3D possono rimanere nel bagaglio a mano senza essere estratti.',
      liquidsAllowance_en: 'All liquids must be in containers of max 100ml each. Thanks to 3D scanners, they can remain inside carry-on luggage without being taken out.',
      liquidsMustBeRemoved: false,
      liquidsUnverified: false,
      electronicsInBag: true,
      electronicsNote_it: 'Computer portatili e dispositivi elettronici restano all\'interno del bagaglio a mano.',
      electronicsNote_en: 'Laptops and electronic devices stay inside your hand luggage during screening.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi esclusivamente nel bagaglio a mano con batterie protette. Severamente vietato il volo nei pressi dell\'aeroporto.',
      dronePolicy_en: 'Drones permitted in cabin luggage only with battery terminals isolated.',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Powerbank fino a 100Wh consentiti solo in cabina.',
      powerbankPolicy_en: 'Powerbanks up to 100Wh allowed in cabin only.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.gatwickairport.com/passenger-guide/security.html',
      lastVerifiedDate: '2026-10-28'
    },
    terminals: [
      { id: 'lgw-north', name: 'North Terminal', transferInfo_it: 'Dedicato a easyJet, Emirates, Qatar Airways e voli transatlantici.', transferInfo_en: 'Handles easyJet, Emirates, Qatar Airways and transatlantic routes.' },
      { id: 'lgw-south', name: 'South Terminal', transferInfo_it: 'Dedicato a British Airways, Ryanair, Wizz Air, Vueling e stazione ferroviaria.', transferInfo_en: 'Handles British Airways, Ryanair, Wizz Air, Vueling, and main rail station.' }
    ],
    airlines: [
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'North Terminal & South Terminal', checkInZone: 'Zone A-D' },
      { airlineName: 'British Airways', iataCode: 'BA', terminal: 'South Terminal', checkInZone: 'Zone A-C' },
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'South Terminal', checkInZone: 'Zone K' },
      { airlineName: 'Wizz Air', iataCode: 'W4', terminal: 'South Terminal', checkInZone: 'Zone H' }
    ],
    amenities: [
      {
        id: 'lgw-pwr',
        category: 'power_charging',
        title_it: 'Postazioni di ricarica con prese UK BS1363 e porte USB',
        title_en: 'Charging Points with UK BS1363 & USB Ports',
        terminal: 'North & South Terminal',
        location_it: 'Tavoli di lavoro dedicati e lounge di entrambi i terminal',
        location_en: 'Dedicated work desks and lounges across both terminals',
        availability: 'abundant',
        scarcityNote_it: 'Disponibilità abbondante: stazioni di ricarica con porte USB ad alta potenza e prese UK distribuite in tutti i moli d\'imbarco.',
        scarcityNote_en: 'Abundant availability: high-output USB stations and UK plug desks throughout all departure concourses.',
        details_it: 'Prese universali e porte USB disponibili sui banconi alti da lavoro.',
        details_en: 'Universal sockets and USB ports available on tall workbenches.'
      },
      {
        id: 'lgw-wifi',
        category: 'wifi',
        title_it: 'Gatwick Free Wi-Fi Illimitato',
        title_en: 'Gatwick Free Unlimited Wi-Fi',
        terminal: 'Tutti i Terminal',
        location_it: 'Copertura totale North & South Terminal',
        location_en: 'Full coverage North & South',
        availability: 'abundant',
        details_it: 'Wi-Fi gratuito ad alta velocità con velocità fino a 50Mbps.',
        details_en: 'High-speed free Wi-Fi up to 50Mbps.'
      },
      {
        id: 'lgw-water',
        category: 'water_refill',
        title_it: 'Fontanelle di acqua potabile per borracce',
        title_en: 'Free Water Refill Stations',
        terminal: 'North & South Terminal',
        location_it: 'Vicino a ogni blocco di servizi igienici airside',
        location_en: 'Next to all airside restroom blocks',
        availability: 'abundant',
        scarcityNote_it: 'Distributori d\'acqua potabile gratuiti con erogatore per borracce posizionati vicino ai bagni.',
        scarcityNote_en: 'Free drinking water dispensers with bottle refiller spouts located by all restrooms.',
        details_it: 'Erogatori gratuiti con acqua fresca.',
        details_en: 'Free chilled water dispensers.'
      }
    ],
    venues: [
      { id: 'lgw-v1', name: 'Wagamama', category: 'dining', terminal: 'North & South', location: 'Partenze dopo controlli', hours: '05:00 - 22:00' },
      { id: 'lgw-v2', name: 'World Duty Free Gatwick', category: 'duty_free', terminal: 'North & South', location: 'Airside centrale', hours: '04:30 - 22:30' }
    ],
    transports: [
      { id: 'lgw-tr-1', type: 'train', name_it: 'Gatwick Express (Non-stop per London Victoria)', name_en: 'Gatwick Express (Non-stop to London Victoria)', duration: '30 min', frequency: 'Ogni 15 minuti', estimatedCost: '£21.80', pickupLocation_it: 'Stazione ferroviaria Gatwick South Terminal', pickupLocation_en: 'Gatwick South Terminal railway station', details_it: 'Treno espresso no-stop ogni 15 minuti direttamente per London Victoria.', details_en: 'Non-stop express train every 15 minutes straight to London Victoria.' },
      { id: 'lgw-tr-2', type: 'train', name_it: 'Treni Thameslink / Southern (per London Bridge e St Pancras)', name_en: 'Thameslink / Southern Trains (to London Bridge & St Pancras)', duration: '32-45 min', frequency: 'Ogni 10 minuti', estimatedCost: '£13.50-£18.00', pickupLocation_it: 'Stazione ferroviaria Gatwick South Terminal', pickupLocation_en: 'Gatwick South Terminal railway station', details_it: 'Collegamenti ferroviari frequenti per London Bridge, Blackfriars e St Pancras International.', details_en: 'Frequent direct commuter trains to London Bridge, Blackfriars, and St Pancras International.' }
    ],
    lastUpdated: '2026-10-28'
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
  },
  // =========================================================================
  // 🇪🇸 ISOLE CANARIE / SPAGNA - FUERTEVENTURA (FUE)
  // =========================================================================
  {
    id: 'fue',
    iata: 'FUE',
    icao: 'GCFV',
    name_it: 'Aeroporto di Fuerteventura (El Matorral)',
    name_en: 'Fuerteventura Airport (El Matorral)',
    city_it: 'Puerto del Rosario, Fuerteventura (Isole Canarie)',
    city_en: 'Puerto del Rosario, Fuerteventura (Canary Islands)',
    country_it: 'Spagna',
    country_en: 'Spain',
    countryCode: 'ES',
    officialWebsite: 'https://www.aena.es/es/fuerteventura.html',
    officialMapUrl: 'https://www.aena.es/es/fuerteventura/servicios-del-aeropuerto/mapas.html',
    coordinates: { lat: 28.4527, lng: -13.8638 },
    difficultyRating: 1,
    difficultyLabel_it: 'Molto Agevole & Veloce (Terminal Unico Compatto)',
    difficultyLabel_en: 'Very Smooth & Fast (Compact Single Terminal)',
    averageSecurityWaitMin: 8,
    recommendedArrivalHours: { domestic: 1.5, international: 2.0 },
    navigationAdvice_it: 'Aeroporto sviluppato su un unico terminal passeggeri a due piani. Il piano terra (Piano 0) ospita gli arrivi e il ritiro bagagli, mentre il primo piano (Piano 1) ospita l\'area partenze, i banchi check-in e il varco di sicurezza unico che dà accesso ai 24 gate d\'imbarco. L\'orientamento è immediato e le distanze a piedi sono inferiori a 5 minuti.',
    navigationAdvice_en: 'Single terminal building on two floors. Ground floor (Floor 0) handles arrivals and baggage claim, while Floor 1 handles departures, check-in desks, and single centralized security screening leading to all 24 boarding gates. Navigation is effortless with walking times under 5 minutes.',
    securityPolicy: {
      has3DScanners: false,
      scannersNote_it: 'A Fuerteventura sono operativi varchi radiogeni standard (raggi X convenzionali). È obbligatorio estrarre dal bagaglio a mano i dispositivi elettronici (laptop, tablet) e riporre i liquidi nella bustina trasparente richiudibile.',
      scannersNote_en: 'Fuerteventura operates conventional X-ray screening checkpoints. Passengers must extract large electronics (laptops, tablets) and place liquids into the clear resealable pouch.',
      terminalRules: [
        {
          terminalName: 'Terminal 1 (Piano 1 Partenze)',
          has3DScanners: false,
          liquidsAllowedInBag: false,
          bottleAllowance_it: 'Contenitori max 100ml in busta trasparente da 1 litro; da estrarre obbligatoriamente dal bagaglio',
          bottleAllowance_en: 'Max 100ml containers in 1L resealable transparent bag; must be removed from bag',
          electronicsInBag: false,
          notes_it: 'I dispositivi elettronici (laptop, tablet) e la bustina dei liquidi devono essere estratti e collocati nelle vaschette separate.',
          notes_en: 'Electronics (laptops, tablets) and liquids pouch must be removed and placed in separate plastic trays.'
        }
      ],
      liquidsAllowance_it: 'Regola standard 100ml: tutti i liquidi, aerosol e gel devono essere in contenitori di capienza non superiore a 100 ml, inseriti in un\'unica busta trasparente richiudibile di capacità massima 1 litro (20x20 cm), da estrarre e mostrare al controllo.',
      liquidsAllowance_en: 'Standard 100ml rule: all liquids, aerosols, and gels must be in containers of maximum 100 ml each, enclosed in a single 1-litre transparent resealable bag (20x20 cm), presented outside your carry-on luggage.',
      liquidsMustBeRemoved: true,
      liquidsUnverified: false,
      electronicsInBag: false,
      electronicsNote_it: 'Computer portatili, tablet, fotocamere e caricabatterie ingombranti vanno estratti dal bagaglio e posizionati nella vaschetta dei raggi X.',
      electronicsNote_en: 'Laptops, tablets, cameras, and large chargers must be removed from hand luggage and screened in separate trays.',
      electronicsUnverified: false,
      droneAllowedInCabin: true,
      droneAllowedInHold: false,
      dronePolicy_it: 'Droni ammessi solo in cabina con batterie Lipo rimosse, riposte in sacchetti antincendio e poli isolati. Divieto assoluto di volo nei pressi delle zone costiere aeroportuali e parchi naturali (Dunas de Corralejo).',
      dronePolicy_en: 'Drones permitted in cabin only with Lipo batteries removed and terminals taped. Strictly prohibited near coastal flight paths and nature reserves (Dunas de Corralejo).',
      droneUnverified: false,
      maxPowerbankWh: 100,
      powerbankPolicy_it: 'Powerbank ammessi esclusivamente nel bagaglio a mano fino a 100Wh (fino a 160Wh con permesso della compagnia). Vietati categoricamente nella stiva.',
      powerbankPolicy_en: 'Powerbanks strictly permitted in cabin baggage only up to 100Wh (up to 160Wh with airline approval). Forbidden in hold baggage.',
      powerbankUnverified: false,
      officialSourceUrl: 'https://www.aena.es/es/pasajeros/equipajes-controles/equipaje-mano.html',
      lastVerifiedDate: '2026-10-20'
    },
    terminals: [
      {
        id: 'fue-t1',
        name: 'Terminal 1 (El Matorral)',
        transferInfo_it: 'Terminal passeggeri unico. Piano 0 Arrivi, Piano 1 Partenze e Imbarchi (Gate 1-24).',
        transferInfo_en: 'Single passenger terminal. Floor 0 Arrivals, Floor 1 Departures and Boarding Gates (Gates 1-24).'
      }
    ],
    airlines: [
      { airlineName: 'Ryanair', iataCode: 'FR', terminal: 'Terminal 1', checkInZone: 'Banchi 1-12' },
      { airlineName: 'EasyJet', iataCode: 'U2', terminal: 'Terminal 1', checkInZone: 'Banchi 13-20' },
      { airlineName: 'Binter Canarias', iataCode: 'NT', terminal: 'Terminal 1', checkInZone: 'Banchi Inter-isole 21-26' },
      { airlineName: 'Vueling / Iberia', iataCode: 'VY/IB', terminal: 'Terminal 1', checkInZone: 'Banchi 27-34' },
      { airlineName: 'TUI fly / Condor', iataCode: 'X3/DE', terminal: 'Terminal 1', checkInZone: 'Banchi 35-48' },
      { airlineName: 'Jet2.com', iataCode: 'LS', terminal: 'Terminal 1', checkInZone: 'Banchi 49-60' },
      { airlineName: 'Neos Air', iataCode: 'NO', terminal: 'Terminal 1', checkInZone: 'Banchi Voli Charter Italia' }
    ],
    amenities: [
      {
        id: 'fue-pwr-gate',
        category: 'power_charging',
        title_it: 'Torrette di ricarica verticali con prese 230V e USB',
        title_en: 'Vertical Power Totems with 230V AC & USB',
        terminal: 'Terminal 1',
        location_it: 'Area imbarchi centrale tra i Gate 8-12 e vicino al Gate 18',
        location_en: 'Central boarding area between Gates 8-12 and near Gate 18',
        availability: 'moderate',
        scarcityNote_it: 'Le normali poltroncine metalliche d\'attesa ai gate NON dispongono di prese elettriche integrate. La ricarica è disponibile solo presso le colonnine verticali dedicate AENA posizionate lungo il corridoio principale.',
        scarcityNote_en: 'Standard metal waiting chairs at gates lack built-in sockets. Charging is provided only at dedicated vertical AENA charging columns along the central concourse.',
        details_it: 'Colonnine multi-presa AENA con porte USB e prese Schuko standard europee per la ricarica gratuita di smartphone e portatili.',
        details_en: 'AENA multi-socket stations featuring USB and standard European Schuko sockets for free device charging.'
      },
      {
        id: 'fue-water',
        category: 'water_refill',
        title_it: 'Fontanelle d\'acqua potabile gratuita post-controlli',
        title_en: 'Free Drinking Water Refill Stations',
        terminal: 'Terminal 1',
        location_it: 'Presso i blocchi servizi igienici vicino al Gate 5 e al Gate 17',
        location_en: 'Near restroom clusters close to Gate 5 and Gate 17',
        availability: 'abundant',
        details_it: 'Erogatori di acqua fresca microfiltrata per riempire gratuitamente borracce e bottiglie una volta superati i varchi di sicurezza.',
        details_en: 'Fresh microfiltered water fountains to refill reusable bottles free of charge after passing security.'
      },
      {
        id: 'fue-wifi',
        category: 'wifi',
        title_it: 'Wi-Fi gratuito illimitato "Airport Free Wifi Aena"',
        title_en: 'Free Unlimited "Airport Free Wifi Aena"',
        terminal: 'Terminal 1',
        location_it: 'Copertura ad alta velocità in tutto il terminal',
        location_en: 'High-speed coverage throughout the terminal',
        availability: 'abundant',
        details_it: 'Rete Wi-Fi ufficiale gratuita fornita da AENA, senza limiti di tempo.',
        details_en: 'Official high-speed wireless network provided by AENA, unlimited browsing.'
      }
    ],
    venues: [
      { id: 'fue-v1', name: 'Aena Duty Free Fuerteventura', category: 'duty_free', terminal: 'Terminal 1', location: 'Piano 1 Airside subito dopo i controlli', hours: '06:00 - 22:30' },
      { id: 'fue-v2', name: 'Caffè di Fiore', category: 'cafe', terminal: 'Terminal 1', location: 'Piano 1 Airside vicino al Gate 6', hours: '06:30 - Ultimo volo' },
      { id: 'fue-v3', name: 'Burger King', category: 'dining', terminal: 'Terminal 1', location: 'Piano 1 Airside centrale', hours: '10:00 - 22:00' },
      { id: 'fue-v4', name: 'Pans & Company', category: 'grab_and_go', terminal: 'Terminal 1', location: 'Piano 1 Gate 12', hours: '07:00 - 21:30' },
      { id: 'fue-v5', name: 'Farmacia Aeroporto Fuerteventura', category: 'pharmacy', terminal: 'Terminal 1', location: 'Piano 1 Landside prima dei controlli', hours: '08:00 - 20:00' }
    ],
    transports: [
      { id: 'fue-tr-1', type: 'bus', name_it: 'Tiadhe Autobus Linea 3', name_en: 'Tiadhe Bus Route 3', duration: '15 min', frequency: 'Ogni 30 min', estimatedCost: '€1.45', pickupLocation_it: 'Fermata bus all\'uscita Arrivi (Piano 0)', pickupLocation_en: 'Bus stop outside Arrivals (Floor 0)', details_it: 'Collega l\'aeroporto con Puerto del Rosario e la località turistica di Caleta de Fuste.', details_en: 'Connects airport with Puerto del Rosario and Caleta de Fuste resort.' },
      { id: 'fue-tr-2', type: 'bus', name_it: 'Tiadhe Autobus Linea 10', name_en: 'Tiadhe Bus Route 10', duration: '75 min', frequency: 'Corse giornaliere regolari', estimatedCost: '€9.70', pickupLocation_it: 'Fermata bus Piano 0', pickupLocation_en: 'Bus stop Floor 0', details_it: 'Linea diretta verso il sud dell\'isola: Costa Calma e Morro Jable.', details_en: 'Direct route to southern island resorts: Costa Calma and Morro Jable.' },
      { id: 'fue-tr-3', type: 'taxi', name_it: 'Radiotaxi Fuerteventura', name_en: 'Radiotaxi Fuerteventura', duration: '10 min', frequency: 'Disponibile 24/7', estimatedCost: '€15 - €20', pickupLocation_it: 'Corsia taxi all\'uscita Piano 0 Arrivi', pickupLocation_en: 'Taxi rank outside Floor 0 Arrivals', details_it: 'Tariffa a tassametro verso Puerto del Rosario (~€16) o Corralejo al nord (~€45).', details_en: 'Metered fares to Puerto del Rosario (~€16) or Corralejo to the north (~€45).' }
    ],
    lastUpdated: '2026-10-20'
  }
,
{
  "id": "pmo",
  "iata": "PMO",
  "icao": "LICJ",
  "name_it": "Aeroporto di Palermo Falcone e Borsellino",
  "name_en": "Palermo Falcone Borsellino Airport",
  "city_it": "Palermo",
  "city_en": "Palermo",
  "country_it": "Italia",
  "country_en": "Italy",
  "countryCode": "IT",
  "officialWebsite": "https://www.aeroportodipalermo.it",
  "officialMapUrl": "https://www.aeroportodipalermo.it",
  "coordinates": {
    "lat": 38.1759,
    "lng": 13.091
  },
  "difficultyRating": 2,
  "difficultyLabel_it": "Moderatamente Agevole",
  "difficultyLabel_en": "Moderately Easy",
  "averageSecurityWaitMin": 12,
  "recommendedArrivalHours": {
    "domestic": 2,
    "international": 2.5
  },
  "navigationAdvice_it": "Terminal passeggeri recentemente riqualificato con una nuova terrazza lounge panoramica vista mare al terzo piano. I varchi di sicurezza sono posizionati al primo piano.",
  "navigationAdvice_en": "Passenger terminal recently renovated with a third-floor sea-view panoramic lounge. Security checkpoints are on the 1st floor.",
  "securityPolicy": {
    "has3DScanners": false,
    "scannersNote_it": "Scanner convenzionali a raggi X. È richiesto estrarre liquidi (max 100ml) e computer portatili.",
    "scannersNote_en": "Standard X-ray scanners. Laptops and 100ml liquids must be removed for screening.",
    "terminalRules": [
      {
        "terminalName": "Terminal Passeggeri",
        "has3DScanners": false,
        "notes_it": "Varchi al 1° piano. Regola dei 100ml attiva per tutti i voli.",
        "notes_en": "1st floor checkpoint. Standard 100ml liquid rule applies."
      }
    ],
    "liquidsAllowance_it": "Massimo 100ml per flacone in busta trasparente da 1 litro. Dolci tipici siciliani ammessi se compatti o acquistati post-sicurezza.",
    "liquidsAllowance_en": "Max 100ml per container in 1-litre transparent bag. Pastries allowed if solid, or bought past security.",
    "liquidsMustBeRemoved": true,
    "liquidsUnverified": false,
    "electronicsInBag": false,
    "electronicsNote_it": "Dispositivi elettronici grandi devono essere estratti e riposti nelle vaschette separate.",
    "electronicsNote_en": "Laptops and tablets must be placed into separate screening trays.",
    "electronicsUnverified": false,
    "droneAllowedInCabin": true,
    "droneAllowedInHold": false,
    "dronePolicy_it": "Droni ammessi nel bagaglio a mano con batterie protette. Vietato il volo nel raggio di 6 km dallo scalo.",
    "dronePolicy_en": "Drones permitted in cabin luggage with batteries protected. Strictly prohibited within 6 km of airport.",
    "droneUnverified": false,
    "maxPowerbankWh": 100,
    "powerbankPolicy_it": "Powerbank fino a 100Wh consentiti solo in cabina. Vietati nella stiva.",
    "powerbankPolicy_en": "Powerbanks up to 100Wh allowed in cabin only. Forbidden in checked baggage.",
    "powerbankUnverified": false,
    "officialSourceUrl": "https://www.aeroportodipalermo.it",
    "lastVerifiedDate": "2026-10-21"
  },
  "terminals": [
    {
      "id": "pmo-t1",
      "name": "Terminal Passeggeri",
      "transferInfo_it": "Unico terminal passeggeri disposto su tre livelli. Stazione FS sotterranea al piano -1.",
      "transferInfo_en": "Single passenger terminal across three floors with railway station on underground level -1."
    }
  ],
  "airlines": [
    {
      "airlineName": "Ryanair",
      "iataCode": "FR",
      "terminal": "Terminal Passeggeri",
      "checkInZone": "Banchi Check-in 1-15"
    },
    {
      "airlineName": "ITA Airways",
      "iataCode": "AZ",
      "terminal": "Terminal Passeggeri",
      "checkInZone": "Banchi Check-in 16-22"
    },
    {
      "airlineName": "EasyJet",
      "iataCode": "U2",
      "terminal": "Terminal Passeggeri",
      "checkInZone": "Banchi Check-in 23-28"
    },
    {
      "airlineName": "Volotea",
      "iataCode": "V7",
      "terminal": "Terminal Passeggeri",
      "checkInZone": "Banchi Check-in 29-34"
    },
    {
      "airlineName": "Wizz Air",
      "iataCode": "W4",
      "terminal": "Terminal Passeggeri",
      "checkInZone": "Banchi Check-in 35-40"
    }
  ],
  "amenities": [
    {
      "id": "pmo-pwr",
      "category": "power_charging",
      "title_it": "Postazioni di ricarica con prese Schuko e USB",
      "title_en": "Device Charging Stations with USB & AC",
      "terminal": "Terminal Passeggeri",
      "location_it": "Presso i tavoli di lavoro dell'Area Imbarchi (Piano 2 e 3 fronte Gate A3-A6)",
      "location_en": "High work benches in the departure gate concourse (Level 2 & 3 near Gates A3-A6)",
      "availability": "moderate",
      "details_it": "Nuovi banconi da lavoro in legno con prese elettriche 220V e porte USB-A / USB-C per la ricarica rapida.",
      "details_en": "Work counters equipped with 220V AC and USB fast charging outlets."
    },
    {
      "id": "pmo-water",
      "category": "water_refill",
      "title_it": "Fontanelle di acqua potabile gratuita",
      "title_en": "Free Drinking Water Refill Stations",
      "terminal": "Terminal Passeggeri",
      "location_it": "Presso i blocchi bagni vicino al Gate A02 e al Gate B04",
      "location_en": "Next to restrooms near Gate A02 and Gate B04",
      "availability": "abundant",
      "details_it": "Erogatori d'acqua potabile microfiltrata per riempire gratuitamente borracce dopo i varchi di sicurezza.",
      "details_en": "Water refill fountains for bottles after passing security."
    },
    {
      "id": "pmo-wifi",
      "category": "wifi",
      "title_it": "Wi-Fi gratuito \"Palermo Airport Free WiFi\"",
      "title_en": "Free Wi-Fi \"Palermo Airport Free WiFi\"",
      "terminal": "Terminal Passeggeri",
      "location_it": "Copertura in tutto il terminal",
      "location_en": "Available across all terminal areas",
      "availability": "abundant",
      "details_it": "Connessione Wi-Fi gratuita e illimitata.",
      "details_en": "Unlimited free high-speed wireless connection."
    }
  ],
  "venues": [
    {
      "id": "pmo-v-1",
      "name": "Spinnato Pasticceria & Caffe",
      "category": "cafe",
      "terminal": "Terminal Passeggeri",
      "location": "Piano 2 Area Imbarchi",
      "hours": "05:00 - 22:30",
      "isEarlyMorning": true,
      "serviceType": "coffee_snack",
      "highlightNote_it": "Iconica pasticceria palermitana con cannoli riempiti al momento, iris e caffe espresso.",
      "highlightNote_en": "Iconic bakery with cannoli filled fresh on the spot and espresso."
    },
    {
      "id": "pmo-v-2",
      "name": "Aelia Duty Free Palermo",
      "category": "duty_free",
      "terminal": "Terminal Passeggeri",
      "location": "Piano 2 subito dopo la sicurezza",
      "hours": "05:30 - 22:30",
      "isEarlyMorning": true,
      "serviceType": "duty_free"
    },
    {
      "id": "pmo-v-3",
      "name": "I Banchi Terrazza Ristorante",
      "category": "dining",
      "terminal": "Terminal Passeggeri",
      "location": "Piano 3 Nuova Area Terrazza",
      "hours": "11:00 - 22:00",
      "serviceType": "table_service",
      "highlightNote_it": "Ristorante con servizio al tavolo e cucina tipica siciliana vista mare.",
      "highlightNote_en": "Sit-down restaurant with traditional Sicilian cuisine and sea view."
    },
    {
      "id": "pmo-v-4",
      "name": "Ke Palle Arancine d'Autore",
      "category": "grab_and_go",
      "terminal": "Terminal Passeggeri",
      "location": "Piano 2 Gate A1-A4",
      "hours": "06:00 - 22:00",
      "serviceType": "quick_bite",
      "highlightNote_it": "Arancine espresse calde pronte al volo per il gate.",
      "highlightNote_en": "Warm gourmet fried arancine ready to grab and take to gate."
    },
    {
      "id": "pmo-v-5",
      "name": "Farmacia Falcone e Borsellino",
      "category": "pharmacy",
      "terminal": "Terminal Passeggeri",
      "location": "Piano Terra Landside Arrivi",
      "hours": "07:00 - 21:30",
      "serviceType": "pharmacy"
    }
  ],
  "transports": [
    {
      "id": "pmo-tr-1",
      "type": "train",
      "name_it": "Treno Trinacria Express / Genio Express (Trenitalia)",
      "name_en": "Trinacria Express Train",
      "duration": "45 - 55 min",
      "frequency": "Ogni 30 min",
      "estimatedCost": "€6.50",
      "pickupLocation_it": "Stazione Ferroviaria sotterranea Punta Raisi (Piano -1)",
      "pickupLocation_en": "Punta Raisi Underground Railway Station (Level -1)",
      "details_it": "Collega direttamente l'aeroporto con Palermo Notarbartolo e Palermo Centrale.",
      "details_en": "Direct rail link to Palermo Notarbartolo and Central Station."
    },
    {
      "id": "pmo-tr-2",
      "type": "bus",
      "name_it": "Autobus Prestia e Comande",
      "name_en": "Prestia e Comande Airport Bus",
      "duration": "50 min",
      "frequency": "Ogni 30 min",
      "estimatedCost": "€6.00",
      "pickupLocation_it": "Fermata bus all'uscita del Piano Terra Arrivi",
      "pickupLocation_en": "Bus terminal outside Ground Floor Arrivals",
      "details_it": "Arriva in centro citta con fermate a Piazza Politeama e Stazione Centrale.",
      "details_en": "Stops at central Piazza Politeama and Palermo Central Station."
    },
    {
      "id": "pmo-tr-3",
      "type": "taxi",
      "name_it": "Taxi Autorizzati Palermo",
      "name_en": "Authorized Palermo Taxis",
      "duration": "35 min",
      "frequency": "Disponibili 24/7",
      "estimatedCost": "€35 - €45",
      "pickupLocation_it": "Corsia taxi ufficiale all'uscita Arrivi",
      "pickupLocation_en": "Official taxi rank outside Arrivals",
      "details_it": "Tariffa fissa predeterminata per il centro di Palermo e taxi condiviso a €8/persona.",
      "details_en": "Fixed rate to Palermo city centre or shared taxi at €8/person."
    }
  ],
  "lastUpdated": "2026-10-21"
},
{
  "id": "cta",
  "iata": "CTA",
  "icao": "LICC",
  "name_it": "Aeroporto di Catania-Fontanarossa Vincenzo Bellini",
  "name_en": "Catania-Fontanarossa Vincenzo Bellini Airport",
  "city_it": "Catania",
  "city_en": "Catania",
  "country_it": "Italia",
  "country_en": "Italy",
  "countryCode": "IT",
  "officialWebsite": "https://www.aeroporto.catania.it",
  "officialMapUrl": "https://www.aeroporto.catania.it",
  "coordinates": {
    "lat": 37.4668,
    "lng": 15.0664
  },
  "difficultyRating": 3,
  "difficultyLabel_it": "Trafficato nelle Ore di Punta",
  "difficultyLabel_en": "Busy during Peak Hours",
  "averageSecurityWaitMin": 18,
  "recommendedArrivalHours": {
    "domestic": 2,
    "international": 2.5
  },
  "navigationAdvice_it": "Principale scalo siciliano per volume passeggeri. Il Terminal A gestisce la quasi totalita dei voli, mentre il Terminal C e dedicato a EasyJet.",
  "navigationAdvice_en": "Main Sicilian airport by passenger volume. Terminal A handles most flights, while Terminal C is dedicated to EasyJet.",
  "securityPolicy": {
    "has3DScanners": false,
    "scannersNote_it": "Scanner convenzionali: estrarre obbligatoriamente liquidi (max 100ml) e portatili.",
    "scannersNote_en": "Standard X-ray scanners: liquids (max 100ml) and laptops must be placed in trays.",
    "terminalRules": [
      {
        "terminalName": "Terminal A",
        "has3DScanners": false,
        "notes_it": "Varchi al 1° piano. Flaconi max 100ml in busta trasparente.",
        "notes_en": "1st floor screening. Standard 100ml rules."
      },
      {
        "terminalName": "Terminal C",
        "has3DScanners": false,
        "notes_it": "Controlli dedicati ai passeggeri EasyJet.",
        "notes_en": "Dedicated checkpoint for EasyJet passengers."
      }
    ],
    "liquidsAllowance_it": "Regola standard da 100ml per contenitore. Cannoli e dolci siciliani ammessi se solidi o acquistati dopo la sicurezza.",
    "liquidsAllowance_en": "Standard 100ml liquid rule applies. Pastries allowed if solid, or bought airside.",
    "liquidsMustBeRemoved": true,
    "liquidsUnverified": false,
    "electronicsInBag": false,
    "electronicsNote_it": "Portatili e tablet devono essere estratti e mostrati separatamente ai controlli.",
    "electronicsNote_en": "Laptops and tablets must be placed separately in trays.",
    "electronicsUnverified": false,
    "droneAllowedInCabin": true,
    "droneAllowedInHold": false,
    "dronePolicy_it": "Droni consentiti nel bagaglio a mano con batterie protette. Vietato il volo vicino allo scalo e alle rotte di avvicinamento dell'Etna.",
    "dronePolicy_en": "Drones permitted in cabin with protected batteries. Forbidden in airport airspace.",
    "droneUnverified": false,
    "maxPowerbankWh": 100,
    "powerbankPolicy_it": "Powerbank max 100Wh consentiti solo in cabina.",
    "powerbankPolicy_en": "Powerbanks up to 100Wh permitted in cabin only.",
    "powerbankUnverified": false,
    "officialSourceUrl": "https://www.aeroporto.catania.it",
    "lastVerifiedDate": "2026-10-21"
  },
  "terminals": [
    {
      "id": "cta-ta",
      "name": "Terminal A",
      "transferInfo_it": "Terminal principale a 2 livelli per ITA, Ryanair, Wizz Air, Lufthansa.",
      "transferInfo_en": "Main terminal for ITA, Ryanair, Wizz Air, Lufthansa."
    },
    {
      "id": "cta-tc",
      "name": "Terminal C",
      "transferInfo_it": "Terminal dedicato esclusivamente ai voli EasyJet.",
      "transferInfo_en": "Dedicated terminal exclusively for EasyJet flights."
    }
  ],
  "airlines": [
    {
      "airlineName": "Ryanair",
      "iataCode": "FR",
      "terminal": "Terminal A",
      "checkInZone": "Banchi Check-in 1-18"
    },
    {
      "airlineName": "EasyJet",
      "iataCode": "U2",
      "terminal": "Terminal C",
      "checkInZone": "Terminal C dedicato"
    },
    {
      "airlineName": "ITA Airways",
      "iataCode": "AZ",
      "terminal": "Terminal A",
      "checkInZone": "Banchi Check-in 19-25"
    },
    {
      "airlineName": "Wizz Air",
      "iataCode": "W4",
      "terminal": "Terminal A",
      "checkInZone": "Banchi Check-in 26-32"
    },
    {
      "airlineName": "Lufthansa / Swiss",
      "iataCode": "LH/LX",
      "terminal": "Terminal A",
      "checkInZone": "Banchi Check-in 33-38"
    }
  ],
  "amenities": [
    {
      "id": "cta-pwr",
      "category": "power_charging",
      "title_it": "Prese elettriche e porte USB ai gate d'imbarco",
      "title_en": "Gate Charging Outlets and USB Ports",
      "terminal": "Terminal A",
      "location_it": "Colonne di ricarica vicino ai Gate 5-10",
      "location_en": "Charging poles near Gates 5-10",
      "availability": "moderate",
      "details_it": "Colonnine con prese Schuko e porte USB per la ricarica rapida prima del volo.",
      "details_en": "Power stations with AC and USB ports."
    },
    {
      "id": "cta-water",
      "category": "water_refill",
      "title_it": "Fontanelle di acqua potabile gratuita",
      "title_en": "Free Drinking Water Refill",
      "terminal": "Terminal A & C",
      "location_it": "Presso i blocchi servizi igienici airside",
      "location_en": "Near airside restrooms",
      "availability": "abundant",
      "details_it": "Erogatori verticali gratuiti per riempire borracce.",
      "details_en": "Free vertical fountains for bottle refill."
    },
    {
      "id": "cta-wifi",
      "category": "wifi",
      "title_it": "Wi-Fi gratuito \"Catania Airport Free\"",
      "title_en": "Free Wi-Fi \"Catania Airport Free\"",
      "terminal": "Tutti i Terminal",
      "location_it": "Disponibile in tutti i terminal",
      "location_en": "Available across all terminals",
      "availability": "abundant",
      "details_it": "Rete ad alta velocita gratuita senza registrazione a pagamento.",
      "details_en": "High-speed wireless connection free of charge."
    }
  ],
  "venues": [
    {
      "id": "cta-v-1",
      "name": "Bacco Pasticceria & Caffe",
      "category": "cafe",
      "terminal": "Terminal A",
      "location": "Piano 1 Partenze",
      "hours": "05:00 - 22:30",
      "isEarlyMorning": true,
      "serviceType": "coffee_snack",
      "highlightNote_it": "Caffe espresso e granite con brioche, cannoli espressi.",
      "highlightNote_en": "Espresso coffee, granita with brioche, and freshly filled cannoli."
    },
    {
      "id": "cta-v-2",
      "name": "Heinemann Duty Free Catania",
      "category": "duty_free",
      "terminal": "Terminal A",
      "location": "Piano 1 dopo la sicurezza",
      "hours": "05:30 - 22:30",
      "isEarlyMorning": true,
      "serviceType": "duty_free"
    },
    {
      "id": "cta-v-3",
      "name": "Caffe Vergnano 1882",
      "category": "cafe",
      "terminal": "Terminal A",
      "location": "Piano 1 Gate 7",
      "hours": "05:00 - 23:00",
      "isEarlyMorning": true,
      "serviceType": "coffee_snack"
    },
    {
      "id": "cta-v-4",
      "name": "Rosso Sapore Pizza & Focaccia",
      "category": "grab_and_go",
      "terminal": "Terminal A",
      "location": "Piano 1 Gate 4",
      "hours": "06:00 - 22:00",
      "serviceType": "quick_bite",
      "highlightNote_it": "Pizze e focacce calde espresse da asporto per il gate.",
      "highlightNote_en": "Warm pizza and focaccia ready for gate takeaway."
    },
    {
      "id": "cta-v-5",
      "name": "Farmacia Fontanarossa",
      "category": "pharmacy",
      "terminal": "Terminal A",
      "location": "Piano Terra Landside",
      "hours": "07:30 - 21:00",
      "serviceType": "pharmacy"
    }
  ],
  "transports": [
    {
      "id": "cta-tr-1",
      "type": "bus",
      "name_it": "AMTS Alibus Catania",
      "name_en": "AMTS Alibus Catania",
      "duration": "20 min",
      "frequency": "Ogni 25 min",
      "estimatedCost": "€4.00",
      "pickupLocation_it": "Fermata bus corsia esterna Piano Terra Arrivi",
      "pickupLocation_en": "Bus rank outside Ground Floor Arrivals",
      "details_it": "Collega direttamente l'aeroporto con il centro storico (Piazza Stesicoro, Piazza Duomo) e la Stazione Centrale.",
      "details_en": "Direct link to city centre and Catania Central Railway Station."
    },
    {
      "id": "cta-tr-2",
      "type": "train",
      "name_it": "Treno FS Stazione Catania Aeroporto Fontanarossa",
      "name_en": "FS Train Catania Airport Station",
      "duration": "8 min",
      "frequency": "Ogni 20 - 30 min",
      "estimatedCost": "€2.20",
      "pickupLocation_it": "Stazione ferroviaria a 800m collegata con navetta gratuita",
      "pickupLocation_en": "Train station 800m away via free shuttle",
      "details_it": "Treni regionali veloci verso Catania Centrale, Messina, Siracusa e Palermo.",
      "details_en": "Regional trains to Catania Central, Messina, Syracuse and Palermo."
    },
    {
      "id": "cta-tr-3",
      "type": "taxi",
      "name_it": "Taxi Autorizzati Catania",
      "name_en": "Authorized Catania Taxis",
      "duration": "15 min",
      "frequency": "Disponibili 24/7",
      "estimatedCost": "€25 - €30",
      "pickupLocation_it": "Corsia taxi all'uscita Arrivi",
      "pickupLocation_en": "Taxi rank outside Arrivals",
      "details_it": "Tariffa fissa per il centro urbano di Catania.",
      "details_en": "Fixed standard fare to central Catania."
    }
  ],
  "lastUpdated": "2026-10-21"
},
{
  "id": "lpa",
  "iata": "LPA",
  "icao": "GCLP",
  "name_it": "Aeroporto di Gran Canaria",
  "name_en": "Gran Canaria Airport",
  "city_it": "Gran Canaria",
  "city_en": "Gran Canaria",
  "country_it": "Spagna",
  "country_en": "Spain",
  "countryCode": "ES",
  "officialWebsite": "https://www.aena.es/es/gran-canaria.html",
  "officialMapUrl": "https://www.aena.es/es/gran-canaria.html",
  "coordinates": {
    "lat": 27.9319,
    "lng": -15.3866
  },
  "difficultyRating": 2,
  "difficultyLabel_it": "Fluido & Ben Organizzato",
  "difficultyLabel_en": "Smooth & Well Organized",
  "averageSecurityWaitMin": 12,
  "recommendedArrivalHours": {
    "domestic": 2,
    "international": 2.5
  },
  "navigationAdvice_it": "Aeroporto strutturato in 3 zone d'imbarco (A per Schengen/Spagna, B per Non-Schengen/UK, C per voli interinsulari Canarie). Controlli veloci e ben segnalati.",
  "navigationAdvice_en": "Terminal split into 3 zones (A for Schengen/Spain, B for Non-Schengen, C for Canary inter-island flights). Efficient security screening.",
  "securityPolicy": {
    "has3DScanners": false,
    "scannersNote_it": "Scanner convenzionali Aena: liquidi max 100ml ed elettronica estratti.",
    "scannersNote_en": "Standard Aena X-ray: 100ml liquids and laptops must be removed.",
    "terminalRules": [
      {
        "terminalName": "Terminal Passeggeri",
        "has3DScanners": false,
        "notes_it": "Varchi al 1° piano. Regola 100ml.",
        "notes_en": "1st floor security. 100ml rule."
      }
    ],
    "liquidsAllowance_it": "Flaconi max 100ml in busta trasparente da 1 litro.",
    "liquidsAllowance_en": "Max 100ml per container in 1-litre transparent pouch.",
    "liquidsMustBeRemoved": true,
    "liquidsUnverified": false,
    "electronicsInBag": false,
    "electronicsNote_it": "Laptop e tablet nelle vaschette separate.",
    "electronicsNote_en": "Laptops and electronics must be placed in trays.",
    "electronicsUnverified": false,
    "droneAllowedInCabin": true,
    "droneAllowedInHold": false,
    "dronePolicy_it": "Droni ammessi nel bagaglio a mano con batterie protette.",
    "dronePolicy_en": "Drones permitted in cabin luggage with batteries protected.",
    "droneUnverified": false,
    "maxPowerbankWh": 100,
    "powerbankPolicy_it": "Max 100Wh consentiti solo in cabina.",
    "powerbankPolicy_en": "Up to 100Wh allowed in cabin only.",
    "powerbankUnverified": false,
    "officialSourceUrl": "https://www.aena.es/es/gran-canaria.html",
    "lastVerifiedDate": "2026-10-21"
  },
  "terminals": [
    {
      "id": "lpa-t1",
      "name": "Terminal Passeggeri",
      "transferInfo_it": "Zona A (Schengen/Continentale), Zona B (Regno Unito/Internazionale), Zona C (Interinsulari Binter/Canaryfly).",
      "transferInfo_en": "Zone A (Schengen), Zone B (UK/Intl), Zone C (Inter-island Canary flights)."
    }
  ],
  "airlines": [
    {
      "airlineName": "Binter Canarias",
      "iataCode": "NT",
      "terminal": "Terminal Passeggeri (Zona C)",
      "checkInZone": "Banchi dedicati Binter"
    },
    {
      "airlineName": "Ryanair",
      "iataCode": "FR",
      "terminal": "Terminal Passeggeri (Zona A/B)",
      "checkInZone": "Banchi 1-16"
    },
    {
      "airlineName": "Iberia / Vueling",
      "iataCode": "IB/VY",
      "terminal": "Terminal Passeggeri (Zona A)",
      "checkInZone": "Banchi 20-30"
    },
    {
      "airlineName": "TUI Airways / fly",
      "iataCode": "BY/TB",
      "terminal": "Terminal Passeggeri (Zona B)",
      "checkInZone": "Banchi 35-50"
    },
    {
      "airlineName": "EasyJet",
      "iataCode": "U2",
      "terminal": "Terminal Passeggeri",
      "checkInZone": "Banchi 51-60"
    }
  ],
  "amenities": [
    {
      "id": "lpa-pwr",
      "category": "power_charging",
      "title_it": "Prese Schuko e USB integrate nelle sedute",
      "title_en": "Integrated Gate Seat Power Sockets",
      "terminal": "Terminal Passeggeri",
      "location_it": "Lungo i moli d'imbarco Zona A e B",
      "location_en": "Concourses Zone A and B",
      "availability": "abundant",
      "details_it": "Sedute dotate di prese europee e porte USB.",
      "details_en": "Gate benches equipped with power outlets."
    },
    {
      "id": "lpa-water",
      "category": "water_refill",
      "title_it": "Fontanelle di acqua potabile gratuita Aena",
      "title_en": "Aena Free Water Refill Fountains",
      "terminal": "Terminal Passeggeri",
      "location_it": "Vicino ai bagni in Zona A, B e C",
      "location_en": "Near restrooms in Zones A, B, C",
      "availability": "abundant",
      "details_it": "Erogatori gratuiti per riempire bottiglie e borracce.",
      "details_en": "Free fountains for bottle refill past security."
    },
    {
      "id": "lpa-wifi",
      "category": "wifi",
      "title_it": "Wi-Fi gratuito \"Airport Free Wifi Aena\"",
      "title_en": "Free Wi-Fi \"Airport Free Wifi Aena\"",
      "terminal": "Terminal Passeggeri",
      "location_it": "Copertura in tutto lo scalo",
      "location_en": "High-speed coverage across terminal",
      "availability": "abundant",
      "details_it": "Connessione wireless ufficiale gratuita illimitata.",
      "details_en": "Unlimited free wireless provided by Aena."
    }
  ],
  "venues": [
    {
      "id": "lpa-v-1",
      "name": "Aena Duty Free Gran Canaria",
      "category": "duty_free",
      "terminal": "Terminal Passeggeri",
      "location": "Piano 1 Airside",
      "hours": "06:00 - 22:30",
      "isEarlyMorning": true,
      "serviceType": "duty_free"
    },
    {
      "id": "lpa-v-2",
      "name": "Cafe & Tapas",
      "category": "cafe",
      "terminal": "Terminal Passeggeri",
      "location": "Piano 1 Zona A",
      "hours": "05:30 - 22:00",
      "isEarlyMorning": true,
      "serviceType": "coffee_snack",
      "highlightNote_it": "Caffe, bocadillos con jamon serrano e tapas calde.",
      "highlightNote_en": "Coffee, Spanish bocadillos, and warm tapas."
    },
    {
      "id": "lpa-v-3",
      "name": "Burger King",
      "category": "dining",
      "terminal": "Terminal Passeggeri",
      "location": "Piano 1 Food Court",
      "hours": "10:00 - 22:00",
      "serviceType": "quick_bite"
    },
    {
      "id": "lpa-v-4",
      "name": "Starbucks",
      "category": "cafe",
      "terminal": "Terminal Passeggeri",
      "location": "Piano 1 Zona B",
      "hours": "05:30 - 22:00",
      "isEarlyMorning": true,
      "serviceType": "coffee_snack"
    },
    {
      "id": "lpa-v-5",
      "name": "Farmacia Aeroporto Gran Canaria",
      "category": "pharmacy",
      "terminal": "Terminal Passeggeri",
      "location": "Piano 1 Landside Partenze",
      "hours": "07:00 - 21:00",
      "serviceType": "pharmacy"
    }
  ],
  "transports": [
    {
      "id": "lpa-tr-1",
      "type": "bus",
      "name_it": "Global Autobus Linea 60",
      "name_en": "Global Bus Line 60",
      "duration": "25 min",
      "frequency": "Ogni 30 min",
      "estimatedCost": "€2.30 - €2.95",
      "pickupLocation_it": "Fermata bus corsia esterna Arrivi Piano 0",
      "pickupLocation_en": "Bus terminal outside Floor 0 Arrivals",
      "details_it": "Linea diretta per Las Palmas de Gran Canaria (Stazione San Telmo e Santa Catalina).",
      "details_en": "Direct express bus to Las Palmas city centre."
    },
    {
      "id": "lpa-tr-2",
      "type": "bus",
      "name_it": "Global Autobus Linea 66 / 90",
      "name_en": "Global Bus Line 66 / 90",
      "duration": "35 min",
      "frequency": "Ogni 30 - 60 min",
      "estimatedCost": "€3.50 - €4.05",
      "pickupLocation_it": "Fermata bus Piano 0",
      "pickupLocation_en": "Bus stop Floor 0",
      "details_it": "Collega l'aeroporto con le spiagge del sud: Maspalomas, Playa del Ingles e Meloneras.",
      "details_en": "Connects airport with southern beaches (Maspalomas, Playa del Ingles)."
    },
    {
      "id": "lpa-tr-3",
      "type": "taxi",
      "name_it": "Taxi Ufficiali Gran Canaria",
      "name_en": "Official Gran Canaria Taxis",
      "duration": "20 min",
      "frequency": "Disponibili 24/7",
      "estimatedCost": "€30 - €40",
      "pickupLocation_it": "Corsia taxi all'uscita Arrivi",
      "pickupLocation_en": "Taxi rank outside Arrivals",
      "details_it": "Tariffa a tassametro verso Las Palmas centro (~€30) o Maspalomas (~€40).",
      "details_en": "Metered fares to Las Palmas (~€30) or Maspalomas (~€40)."
    }
  ],
  "lastUpdated": "2026-10-21"
},
{
  "id": "tfs",
  "iata": "TFS",
  "icao": "GCTS",
  "name_it": "Aeroporto di Tenerife Sud / Sur Reina Sofia",
  "name_en": "Tenerife South Airport Reina Sofia (Tenerife Sur)",
  "city_it": "Tenerife (Tenerife Sur)",
  "city_en": "Tenerife (Tenerife South)",
  "country_it": "Spagna",
  "country_en": "Spain",
  "countryCode": "ES",
  "officialWebsite": "https://www.aena.es/es/tenerife-sur.html",
  "officialMapUrl": "https://www.aena.es/es/tenerife-sur.html",
  "coordinates": {
    "lat": 28.0445,
    "lng": -16.5725
  },
  "difficultyRating": 3,
  "difficultyLabel_it": "Affollato nei Giorni Charter",
  "difficultyLabel_en": "Busy on Charter Days",
  "averageSecurityWaitMin": 16,
  "recommendedArrivalHours": {
    "domestic": 2,
    "international": 2.5
  },
  "navigationAdvice_it": "Principale scalo turistico dell'isola di Tenerife. Molto trafficato nei giorni di martedi e venerdi per i cambi turno dei voli charter europei.",
  "navigationAdvice_en": "Main tourist gateway to Tenerife. High traffic on Tuesdays and Fridays during charter rotation days.",
  "securityPolicy": {
    "has3DScanners": false,
    "scannersNote_it": "Scanner convenzionali Aena: liquidi max 100ml e portatili da estrarre.",
    "scannersNote_en": "Standard X-ray scanners: liquids max 100ml and laptops removed.",
    "terminalRules": [
      {
        "terminalName": "Terminal 1",
        "has3DScanners": false,
        "notes_it": "Controlli al Piano 1. Regola 100ml.",
        "notes_en": "Floor 1 security. 100ml rule."
      }
    ],
    "liquidsAllowance_it": "Flaconi max 100ml in sacchetto trasparente richiudibile.",
    "liquidsAllowance_en": "Max 100ml in transparent 1-litre bag.",
    "liquidsMustBeRemoved": true,
    "liquidsUnverified": false,
    "electronicsInBag": false,
    "electronicsNote_it": "Laptop e tablet nelle vaschette separate.",
    "electronicsNote_en": "Laptops and electronics must be screened separately.",
    "electronicsUnverified": false,
    "droneAllowedInCabin": true,
    "droneAllowedInHold": false,
    "dronePolicy_it": "Droni ammessi nel bagaglio a mano con batterie protette.",
    "dronePolicy_en": "Drones permitted in cabin luggage with batteries protected.",
    "droneUnverified": false,
    "maxPowerbankWh": 100,
    "powerbankPolicy_it": "Powerbank max 100Wh consentiti solo in cabina.",
    "powerbankPolicy_en": "Powerbanks up to 100Wh allowed in cabin only.",
    "powerbankUnverified": false,
    "officialSourceUrl": "https://www.aena.es/es/tenerife-sur.html",
    "lastVerifiedDate": "2026-10-21"
  },
  "terminals": [
    {
      "id": "tfs-t1",
      "name": "Terminal 1",
      "transferInfo_it": "Terminal principale strutturato su tre livelli: Piano 0 Arrivi, Piano 1 Partenze e Imbarchi (Gates 1-34), Piano 2 Uffici e Lounge VIP.",
      "transferInfo_en": "Main terminal across three floors: Floor 0 Arrivals, Floor 1 Departures/Gates 1-34, Floor 2 VIP lounge."
    }
  ],
  "airlines": [
    {
      "airlineName": "Ryanair",
      "iataCode": "FR",
      "terminal": "Terminal 1",
      "checkInZone": "Banchi 1-20"
    },
    {
      "airlineName": "EasyJet",
      "iataCode": "U2",
      "terminal": "Terminal 1",
      "checkInZone": "Banchi 21-32"
    },
    {
      "airlineName": "Jet2.com",
      "iataCode": "LS",
      "terminal": "Terminal 1",
      "checkInZone": "Banchi 33-50"
    },
    {
      "airlineName": "TUI Airways",
      "iataCode": "BY",
      "terminal": "Terminal 1",
      "checkInZone": "Banchi 51-65"
    },
    {
      "airlineName": "Iberia / Vueling",
      "iataCode": "IB/VY",
      "terminal": "Terminal 1",
      "checkInZone": "Banchi 66-75"
    }
  ],
  "amenities": [
    {
      "id": "tfs-pwr",
      "category": "power_charging",
      "title_it": "Prese elettriche e USB nelle aree d'attesa",
      "title_en": "Waiting Area Power Sockets & USB",
      "terminal": "Terminal 1",
      "location_it": "Piano 1 Airside vicino ai Gate 12-24",
      "location_en": "Floor 1 Airside near Gates 12-24",
      "availability": "moderate",
      "details_it": "Postazioni di ricarica rapida e prese Schuko.",
      "details_en": "Fast charging stations and AC sockets."
    },
    {
      "id": "tfs-water",
      "category": "water_refill",
      "title_it": "Fontanelle di acqua potabile gratuita",
      "title_en": "Free Drinking Water Refill Fountains",
      "terminal": "Terminal 1",
      "location_it": "Presso i blocchi bagni airside",
      "location_en": "Near airside restrooms",
      "availability": "abundant",
      "details_it": "Erogatori gratuiti per riempire le borracce dopo la sicurezza.",
      "details_en": "Free refill fountains after security check."
    },
    {
      "id": "tfs-wifi",
      "category": "wifi",
      "title_it": "Wi-Fi gratuito \"Airport Free Wifi Aena\"",
      "title_en": "Free Wi-Fi \"Airport Free Wifi Aena\"",
      "terminal": "Terminal 1",
      "location_it": "Copertura in tutto il terminal",
      "location_en": "Available across terminal",
      "availability": "abundant",
      "details_it": "Wi-Fi gratuito fornito da Aena.",
      "details_en": "Free wireless connection by Aena."
    }
  ],
  "venues": [
    {
      "id": "tfs-v-1",
      "name": "Canariensis Duty Free Tenerife",
      "category": "duty_free",
      "terminal": "Terminal 1",
      "location": "Piano 1 dopo i controlli",
      "hours": "06:00 - 22:30",
      "isEarlyMorning": true,
      "serviceType": "duty_free"
    },
    {
      "id": "tfs-v-2",
      "name": "Ritazza Caffe & Bakery",
      "category": "cafe",
      "terminal": "Terminal 1",
      "location": "Piano 1 Gate 14",
      "hours": "05:00 - 22:00",
      "isEarlyMorning": true,
      "serviceType": "coffee_snack",
      "highlightNote_it": "Colazioni all'alba, cornetti caldi e caffe espresso.",
      "highlightNote_en": "Dawn breakfasts, warm pastries and espresso."
    },
    {
      "id": "tfs-v-3",
      "name": "Gambrinus Cerveceria & Tapas",
      "category": "dining",
      "terminal": "Terminal 1",
      "location": "Piano 1 Centrale",
      "hours": "10:00 - 22:00",
      "serviceType": "table_service",
      "highlightNote_it": "Tapas tipiche spagnole, birre e piatti caldi con sedute.",
      "highlightNote_en": "Traditional tapas, beer and sit-down dining."
    },
    {
      "id": "tfs-v-4",
      "name": "Upper Crust Sandwiches",
      "category": "grab_and_go",
      "terminal": "Terminal 1",
      "location": "Piano 1 Gate 8",
      "hours": "06:00 - 22:00",
      "serviceType": "quick_bite",
      "highlightNote_it": "Baguette calde e panini espressi da asporto.",
      "highlightNote_en": "Warm baguettes and quick sandwiches."
    },
    {
      "id": "tfs-v-5",
      "name": "Farmacia Tenerife Sur",
      "category": "pharmacy",
      "terminal": "Terminal 1",
      "location": "Piano 0 Landside Arrivi",
      "hours": "07:30 - 21:30",
      "serviceType": "pharmacy"
    }
  ],
  "transports": [
    {
      "id": "tfs-tr-1",
      "type": "bus",
      "name_it": "TITSA Autobus Linea 111 / 711",
      "name_en": "TITSA Bus Line 111 / 711",
      "duration": "25 min / 55 min",
      "frequency": "Ogni 30 min",
      "estimatedCost": "€3.70 - €9.35",
      "pickupLocation_it": "Fermata bus all'uscita Piano 0 Arrivi",
      "pickupLocation_en": "Bus rank outside Floor 0 Arrivals",
      "details_it": "Collega l'aeroporto verso sud con Los Cristianos / Costa Adeje (€3.70) e verso nord con Santa Cruz de Tenerife (€9.35).",
      "details_en": "Express bus to Los Cristianos/Costa Adeje or Santa Cruz."
    },
    {
      "id": "tfs-tr-2",
      "type": "bus",
      "name_it": "TITSA Autobus Linea 40",
      "name_en": "TITSA Bus Line 40",
      "duration": "25 min",
      "frequency": "Ogni 30 min",
      "estimatedCost": "€3.70",
      "pickupLocation_it": "Fermata bus Piano 0 Arrivi",
      "pickupLocation_en": "Bus rank Floor 0 Arrivals",
      "details_it": "Linea rapida dedicata per i principali resort turistici di Los Cristianos e Las Americas.",
      "details_en": "Dedicated express route to Los Cristianos and Las Americas resorts."
    },
    {
      "id": "tfs-tr-3",
      "type": "taxi",
      "name_it": "Taxi Ufficiali Tenerife Sud",
      "name_en": "Official Tenerife South Taxis",
      "duration": "15 min",
      "frequency": "Disponibili 24/7",
      "estimatedCost": "€20 - €30",
      "pickupLocation_it": "Corsia taxi all'uscita Arrivi Piano 0",
      "pickupLocation_en": "Taxi rank outside Arrivals Floor 0",
      "details_it": "Tariffa a tassametro verso Los Cristianos (~€20), Playa de las Americas (~€25) o Costa Adeje (~€30).",
      "details_en": "Metered fares to Los Cristianos (~€20), Las Americas (~€25), Costa Adeje (~€30)."
    }
  ],
  "lastUpdated": "2026-10-21"
},
{
  "id": "vce",
  "iata": "VCE",
  "icao": "LIPZ",
  "name_it": "Aeroporto di Venezia Marco Polo",
  "name_en": "Venice Marco Polo Airport",
  "city_it": "Venezia",
  "city_en": "Venice",
  "country_it": "Italia",
  "country_en": "Italy",
  "countryCode": "IT",
  "officialWebsite": "https://www.veneziaairport.it",
  "officialMapUrl": "https://www.veneziaairport.it/in-aeroporto/mappa-dell-aeroporto.html",
  "coordinates": { "lat": 45.5053, "lng": 12.3519 },
  "difficultyRating": 2,
  "difficultyLabel_it": "Agevole & Ben Collegato (Accesso diretto a Bus e Motoscafi)",
  "difficultyLabel_en": "Smooth & Well Connected (Direct access to Bus & Water Taxis)",
  "averageSecurityWaitMin": 12,
  "recommendedArrivalHours": { "domestic": 2, "international": 3 },
  "navigationAdvice_it": "Terminal unico su tre livelli: arrivi al piano terra, controlli di sicurezza e partenze al primo piano. Corsie EDS-CB C3 attive sui varchi centrali. Un percorso coperto con tappeti mobili (Moving Walkway) collega il primo piano direttamente alla Darsena per i vaporetti Alilaguna e water taxi.",
  "navigationAdvice_en": "Single three-level terminal: arrivals on ground floor, security and departures on first floor. EDS-CB C3 lanes operational at central checkpoints. An elevated covered walkway with moving belts links directly to the water docks for Alilaguna boats and water taxis.",
  "securityPolicy": {
    "has3DScanners": true,
    "scannersNote_it": "Varchi dotati di nuovi scanner EDS-CB C3 sulle corsie centrali: liquidi e dispositivi elettronici possono rimanere nel bagaglio a mano sulle corsie abilitate.",
    "scannersNote_en": "Checkpoints equipped with next-gen EDS-CB C3 scanners on central lanes: liquids and electronics can remain inside carry-on baggage on designated lanes.",
    "terminalRules": [
      {
        "terminalName": "Corsie Centrali 3D C3",
        "has3DScanners": true,
        "liquidsAllowedInBag": true,
        "bottleAllowance_it": "Liquidi e flaconi fino a 100ml possono rimanere all'interno del bagaglio a mano",
        "bottleAllowance_en": "Liquids and bottles up to 100ml can remain inside carry-on luggage",
        "electronicsInBag": true,
        "notes_it": "Non occorre estrarre portatili, tablet o cosmetici sulle corsie abilitate.",
        "notes_en": "No need to remove laptops, tablets or cosmetics on designated lanes."
      },
      {
        "terminalName": "Corsie Tradizionali Ausiliarie",
        "has3DScanners": false,
        "liquidsAllowedInBag": false,
        "bottleAllowance_it": "Massimo 100ml in busta trasparente richiudibile da 1 litro",
        "bottleAllowance_en": "Max 100ml in transparent resealable 1-litre bag",
        "electronicsInBag": false,
        "notes_it": "Estrarre separatamente liquidi e dispositivi elettronici.",
        "notes_en": "Remove liquids and electronics into trays."
      }
    ],
    "liquidsAllowance_it": "Contenitori fino a 100ml in busta trasparente da 1 litro; sulle corsie dotate di nuovi scanner C3 i liquidi e i dispositivi restano all'interno del bagaglio a mano.",
    "liquidsAllowance_en": "Containers up to 100ml in a 1-litre transparent bag; on lanes equipped with next-gen C3 scanners, liquids and electronics remain inside carry-on luggage.",
    "liquidsMustBeRemoved": false,
    "liquidsUnverified": false,
    "electronicsInBag": true,
    "electronicsNote_it": "Sui varchi C3 portatili e tablet restano nella borsa; sui varchi convenzionali vanno estratti.",
    "electronicsNote_en": "On C3 lanes laptops and tablets remain in bag; unpack on conventional lanes.",
    "electronicsUnverified": false,
    "droneAllowedInCabin": true,
    "droneAllowedInHold": false,
    "dronePolicy_it": "Ammesso nel bagaglio a mano con batterie LiPo isolate (max 100Wh). Divieto di sorvolo sulla laguna e centro storico di Venezia.",
    "dronePolicy_en": "Allowed in cabin with isolated LiPo batteries (max 100Wh). Strict no-fly zone across Venice lagoon and historical center.",
    "droneUnverified": false,
    "maxPowerbankWh": 100,
    "powerbankPolicy_it": "Consentiti esclusivamente nel bagaglio a mano fino a 100Wh.",
    "powerbankPolicy_en": "Allowed in carry-on baggage only up to 100Wh.",
    "powerbankUnverified": false,
    "officialSourceUrl": "https://www.veneziaairport.it/in-aeroporto/controlli-di-sicurezza.html",
    "lastVerifiedDate": "2026-10-29"
  },
  "terminals": [
    {
      "id": "vce-main",
      "name": "Terminal Passeggeri Unico",
      "transferInfo_it": "Terminal unico su tre livelli. Controlli di sicurezza al primo piano. Percorso pedonale coperto Moving Walkway verso la Darsena motoscafi.",
      "transferInfo_en": "Single three-level terminal. Security screening on first floor. Covered elevated Moving Walkway connects to water docks.",
      "isUnverified": false
    }
  ],
  "airlines": [
    { "airlineName": "ITA Airways", "iataCode": "AZ", "terminal": "Terminal Passeggeri", "checkInZone": "Banchi 10-22", "isUnverified": false },
    { "airlineName": "easyJet", "iataCode": "U2", "terminal": "Terminal Passeggeri", "checkInZone": "Banchi 30-45", "isUnverified": false },
    { "airlineName": "Ryanair", "iataCode": "FR", "terminal": "Terminal Passeggeri", "checkInZone": "Banchi 50-65", "isUnverified": false },
    { "airlineName": "Air France", "iataCode": "AF", "terminal": "Terminal Passeggeri", "checkInZone": "Banchi 23-29", "isUnverified": false }
  ],
  "amenities": [
    {
      "id": "vce-wifi",
      "category": "wifi",
      "title_it": "Venice Airport Free Wi-Fi",
      "title_en": "Venice Airport Free Wi-Fi",
      "location_it": "In tutta l'aerostazione",
      "location_en": "Terminal-wide",
      "details_it": "Accesso internet Wi-Fi gratuito e illimitato su tutta l'area del terminal.",
      "details_en": "Free unlimited high-speed Wi-Fi internet access across all terminal areas.",
      "isUnverified": false
    },
    {
      "id": "vce-power",
      "category": "power_charging",
      "title_it": "Colonnine di ricarica dispositivi",
      "title_en": "Device Charging Stations",
      "location_it": "Area imbarchi e gate",
      "location_en": "Boarding gate areas",
      "details_it": "Prese elettriche 230V e porte USB disponibili nelle sale d'attesa partenze.",
      "details_en": "230V power sockets and USB outlets available in departure waiting lounges.",
      "isUnverified": false
    }
  ],
  "venues": [
    {
      "id": "vce-ven-1",
      "name": "Bricco Café",
      "category": "dining",
      "terminal": "Piano Partenze",
      "location": "Prima dei controlli",
      "hours": "05:00 - 21:00",
      "is24Hours": false,
      "isUnverified": false
    }
  ],
  "transports": [
    {
      "id": "vce-tr-1",
      "type": "bus",
      "name_it": "ATVO Venezia Express (per Piazzale Roma)",
      "name_en": "ATVO Venice Express (to Piazzale Roma)",
      "duration": "20 min",
      "frequency": "Ogni 20-30 minuti",
      "estimatedCost": "€10.00 (€18.00 A/R)",
      "pickupLocation_it": "Corsia bus fronte uscita Arrivi (fermata 2)",
      "pickupLocation_en": "Bus bay outside Arrivals exit (stop 2)",
      "details_it": "Bus no-stop con aria condizionata e vano bagagli per Piazzale Roma (Venezia Centro).",
      "details_en": "Non-stop express bus with luggage hold directly to Piazzale Roma (Venice Centre).",
      "isUnverified": false
    },
    {
      "id": "vce-tr-2",
      "type": "bus",
      "name_it": "Motoscafo Alilaguna (Linee Blu / Arancio / Rossa)",
      "name_en": "Alilaguna Water Bus (Blue / Orange / Red Lines)",
      "duration": "45-70 min",
      "frequency": "Ogni 30-60 minuti",
      "estimatedCost": "€15.00 (€27.00 A/R)",
      "pickupLocation_it": "Darsena aeroporto (raggiungibile con Moving Walkway dal 1° piano)",
      "pickupLocation_en": "Airport boat dock (via covered Moving Walkway from 1st floor)",
      "details_it": "Navigazione diretta attraverso la laguna verso San Marco, Rialto, Fondamente Nove e Lido.",
      "details_en": "Scenic water transfer across the lagoon to St. Mark's Square, Rialto, and Lido.",
      "isUnverified": false
    },
    {
      "id": "vce-tr-3",
      "type": "bus",
      "name_it": "ATVO Mestre Express (per Stazione FS Mestre)",
      "name_en": "ATVO Mestre Express (to Mestre Train Station)",
      "duration": "17 min",
      "frequency": "Ogni 20-30 minuti",
      "estimatedCost": "€10.00",
      "pickupLocation_it": "Corsia bus fronte uscita Arrivi (fermata 3)",
      "pickupLocation_en": "Bus bay outside Arrivals exit (stop 3)",
      "details_it": "Collegamento rapido per la stazione ferroviaria di Venezia Mestre per treni Alta Velocità Frecciarossa e Italo.",
      "details_en": "Fast connection to Venice Mestre Railway Station for high-speed Frecciarossa and Italo trains.",
      "isUnverified": false
    }
  ],
  "lastUpdated": "2026-10-29"
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
