import assert from 'node:assert';
import { readFileSync } from 'node:fs';

console.log('🧪 VERIFYING SEO STRUCTURED DATA & MINIMALIST UI INTEGRITY...');

// 1. Read structured-data.ts directly to ensure syntax and schema keys
const structuredDataFile = readFileSync('src/lib/seo/structured-data.ts', 'utf8');

assert(
  structuredDataFile.includes("'@type': 'Airport'"),
  'structured-data.ts must define @type: Airport'
);

assert(
  structuredDataFile.includes("'@type': 'BreadcrumbList'"),
  'structured-data.ts must define @type: BreadcrumbList'
);

assert(
  structuredDataFile.includes('getAirportCombinedStructuredData'),
  'structured-data.ts must export getAirportCombinedStructuredData'
);

assert(
  structuredDataFile.includes("'@graph': [breadcrumbs, airportEntity, faqEntity]"),
  'structured-data.ts must combine BreadcrumbList, Airport, and FAQPage in @graph'
);

// 2. Read AirportSeoDossier.tsx to ensure AirportDossierInteractiveWrapper is rendered cleanly
const dossierFile = readFileSync('src/components/AirportSeoDossier.tsx', 'utf8');

assert(
  dossierFile.includes('<AirportDossierInteractiveWrapper'),
  'AirportSeoDossier must render AirportDossierInteractiveWrapper'
);

assert(
  dossierFile.includes('getAirportCombinedStructuredData'),
  'AirportSeoDossier must embed JSON-LD getAirportCombinedStructuredData'
);

// 3. Read WelcomeView.tsx to ensure minimalist UI integrity
const welcomeFile = readFileSync('src/components/WelcomeView.tsx', 'utf8');

assert(
  !welcomeFile.includes('Scali più cercati'),
  'WelcomeView must remain clean and minimalist without tag clouds'
);

console.log('✅ ALL SEO STRUCTURED DATA & MINIMALIST UI TESTS PASSED SUCCESSFULLY!');
