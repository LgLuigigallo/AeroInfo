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

assert(
  !welcomeFile.includes('border-[#B3E5E0]') && !welcomeFile.includes('border-[#F4D35E]'),
  'WelcomeView step cards must remain 100% borderless'
);

// 4. Verify borderless guarantee on AirportBubblesView, AirportFaqSection, Header, and Footer
const bubblesFile = readFileSync('src/components/AirportBubblesView.tsx', 'utf8');
assert(
  !bubblesFile.includes('border'),
  'AirportBubblesView must remain 100% borderless'
);

const headerFile = readFileSync('src/components/Header.tsx', 'utf8');
assert(
  !headerFile.includes('border'),
  'Header action tags, header bar, and language switcher must remain 100% borderless'
);

const footerFile = readFileSync('src/components/Footer.tsx', 'utf8');
assert(
  !footerFile.includes('border-t') && !footerFile.includes('border-b'),
  'Footer must remain 100% borderless'
);

const faqFile = readFileSync('src/components/AirportFaqSection.tsx', 'utf8');
assert(
  !faqFile.includes('border border-zinc') && !faqFile.includes('border-t border-zinc'),
  'AirportFaqSection container and cards must remain 100% borderless'
);

// 5. Verify SEO internal links in Footer and cross-linking in AirportBubblesView
assert(
  footerFile.includes('/guide/liquidi-bagaglio-a-mano') && footerFile.includes('/en/guides/liquids-in-carry-on-baggage'),
  'Footer must include crawlable links to the liquids guide in IT and EN'
);

assert(
  bubblesFile.includes('otherCityAirports.map') && bubblesFile.includes('<Link') && bubblesFile.includes('airportPath(match, lang)'),
  'AirportBubblesView must use crawlable <Link> tags for metropolitan area cross-linking'
);

console.log('✅ ALL SEO STRUCTURED DATA & MINIMALIST UI TESTS PASSED SUCCESSFULLY!');
