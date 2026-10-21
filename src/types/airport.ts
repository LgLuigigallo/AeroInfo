export type Language = 'it' | 'en';

export type AmenityCategory = 
  | 'power_charging' 
  | 'wifi' 
  | 'water_refill' 
  | 'quiet_area' 
  | 'luggage_storage' 
  | 'smoking_area';

export type VenueCategory = 
  | 'dining' 
  | 'cafe' 
  | 'grab_and_go' 
  | 'duty_free' 
  | 'shopping' 
  | 'pharmacy';

export type TransportType = 
  | 'train' 
  | 'metro' 
  | 'bus' 
  | 'taxi' 
  | 'rideshare';

export interface VerifiedField<T = string> {
  value: T;
  isUnverified?: boolean;
  unverifiedNote_it?: string;
  unverifiedNote_en?: string;
}

export interface TerminalSecurityRule {
  terminalName: string;
  has3DScanners: boolean;
  liquidsAllowedInBag: boolean;
  bottleAllowance_it: string;
  bottleAllowance_en: string;
  electronicsInBag: boolean;
  notes_it: string;
  notes_en: string;
}

export interface SecurityPolicy {
  // Scanner type
  has3DScanners: boolean; // True if EDS-CB C3 scanners installed
  scannersNote_it: string;
  scannersNote_en: string;
  
  // Specific per-terminal rules when airport terminals differ
  terminalRules?: TerminalSecurityRule[];
  
  // Liquids
  liquidsAllowance_it: string;
  liquidsAllowance_en: string;
  liquidsMustBeRemoved: boolean; // false if 3D scanners allow leaving in bag
  liquidsUnverified?: boolean;
  liquidsNote_it?: string;
  liquidsNote_en?: string;

  // Electronics (Laptops, Tablets)
  electronicsInBag: boolean; // true if can stay inside
  electronicsNote_it: string;
  electronicsNote_en: string;
  electronicsUnverified?: boolean;

  // Drones
  droneAllowedInCabin: boolean;
  droneAllowedInHold: boolean;
  dronePolicy_it: string;
  dronePolicy_en: string;
  droneUnverified?: boolean;
  droneNote_it?: string;
  droneNote_en?: string;

  // Powerbanks & Batteries
  maxPowerbankWh: number; // typically 100Wh or 160Wh with approval
  powerbankPolicy_it: string;
  powerbankPolicy_en: string;
  powerbankUnverified?: boolean;
  powerbankNote_it?: string;
  powerbankNote_en?: string;

  // Official source
  officialSourceUrl: string;
  lastVerifiedDate: string;
}

export interface AirlineTerminalMapping {
  airlineName: string;
  iataCode: string;
  terminal: string;
  checkInZone?: string;
  isUnverified?: boolean;
}

export interface TerminalDetail {
  id: string;
  name: string;
  transferInfo_it: string;
  transferInfo_en: string;
  isUnverified?: boolean;
}

export interface AmenityItem {
  id: string;
  category: AmenityCategory;
  title_it: string;
  title_en: string;
  terminal?: string;
  location_it: string;
  location_en: string;
  details_it: string;
  details_en: string;
  availability?: 'abundant' | 'moderate' | 'scarce'; // Socket or water availability density
  scarcityNote_it?: string;
  scarcityNote_en?: string;
  isUnverified?: boolean;
  details_it_unverified?: string;
  details_en_unverified?: string;
}

export interface VenueItem {
  id: string;
  name: string;
  category: VenueCategory;
  terminal: string;
  location: string;
  hours: string;
  is24Hours?: boolean;
  isEarlyMorning?: boolean; // opens 05:00 or earlier for dawn departures
  serviceType?: 'table_service' | 'quick_bite' | 'coffee_snack' | 'duty_free' | 'pharmacy' | 'retail';
  highlightNote_it?: string;
  highlightNote_en?: string;
  isUnverified?: boolean;
}

export interface GroundTransportItem {
  id: string;
  type: TransportType;
  name_it: string;
  name_en: string;
  duration: string;
  frequency: string;
  estimatedCost: string;
  pickupLocation_it: string;
  pickupLocation_en: string;
  details_it: string;
  details_en: string;
  isUnverified?: boolean;
  details_it_unverified?: string;
  details_en_unverified?: string;
}

export type MapPoiCategory = 
  | 'power' 
  | 'water' 
  | 'security' 
  | 'gate' 
  | 'dining' 
  | 'shop' 
  | 'restroom' 
  | 'lounge' 
  | 'info';

export interface TerminalMapPOI {
  id: string;
  category: MapPoiCategory;
  name_it: string;
  name_en: string;
  location_it: string;
  location_en: string;
  terminal: string; // e.g. "Terminal 2"
  zone?: string;     // e.g. "Gate C02-C05"
  level?: string;    // e.g. "Piano Partenze / Level 2"
  x: number; // percentage 5-95 on SVG width
  y: number; // percentage 10-90 on SVG height
  availability?: 'abundant' | 'moderate' | 'scarce';
  count?: number; // for clustered hubs (e.g. 48 restaurants, 71 shops)
  details_it: string;
  details_en: string;
  isVerified?: boolean;
}

export interface TerminalMapData {
  terminalId: string;
  terminalName_it: string;
  terminalName_en: string;
  officialInteractiveMapUrl?: string;
  concourseShape?: 'linear' | 'pier_t' | 'satellite' | 'u_shaped' | 'circular';
  gates?: Array<{ id: string; label: string; x: number; y: number }>;
  pois: TerminalMapPOI[];
}

export interface Airport {
  id: string;
  iata: string;
  icao: string;
  name_it: string;
  name_en: string;
  city_it: string;
  city_en: string;
  country_it: string;
  country_en: string;
  countryCode: string;
  officialWebsite: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  // Difficulty & Friction
  difficultyRating: 1 | 2 | 3 | 4 | 5; // 1: Very easy, 5: High congestion/difficult
  difficultyLabel_it: string;
  difficultyLabel_en: string;
  averageSecurityWaitMin: number; // minutes
  recommendedArrivalHours: {
    domestic: number;
    international: number;
  };
  navigationAdvice_it: string;
  navigationAdvice_en: string;
  
  // Alternative/Sibling Airports for the same city (e.g. FCO <-> CIA, MXP <-> LIN <-> BGY, CDG <-> ORY)
  otherCityAirports?: Array<{
    iata: string;
    name_it: string;
    name_en: string;
    distanceInfo?: string;
  }>;

  // Sections
  securityPolicy: SecurityPolicy;
  terminals: TerminalDetail[];
  airlines: AirlineTerminalMapping[];
  amenities: AmenityItem[];
  venues: VenueItem[];
  transports: GroundTransportItem[];
  
  // Interactive Terminal Map
  officialMapUrl?: string;
  terminalMaps?: TerminalMapData[];

  lastUpdated: string;
}
