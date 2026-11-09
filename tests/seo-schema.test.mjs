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

assert(
  structuredDataFile.includes('Quali sono le regole sui liquidi e la presenza di scanner 3D') &&
  structuredDataFile.includes('Come vanno trasportate le powerbank e le batterie al litio'),
  'structured-data.ts must include high-intent questions on liquids and lithium powerbanks'
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
  !faqFile.includes('border'),
  'AirportFaqSection container and cards must remain 100% borderless'
);

assert(
  faqFile.includes('Regole Liquidi & Scanner 3D') && faqFile.includes('Powerbank & Batterie'),
  'AirportFaqSection must render structured answers for liquids and powerbanks'
);

// 5. Verify SEO internal links in Footer and cross-linking in AirportBubblesView
assert(
  footerFile.includes('/guide/liquidi-bagaglio-a-mano') && footerFile.includes('/en/guides/liquids-in-carry-on-baggage'),
  'Footer must include crawlable links to the liquids guide in IT and EN'
);

assert(
  footerFile.includes('/scanner-3d-aeroporti') && footerFile.includes('/en/3d-scanners-airports'),
  'Footer must include crawlable links to the 3D scanners hub in IT and EN'
);

assert(
  bubblesFile.includes('otherCityAirports.map') && bubblesFile.includes('<Link') && bubblesFile.includes('airportPath(match, lang)'),
  'AirportBubblesView must use crawlable <Link> tags for metropolitan area cross-linking'
);

// 6. Verify 3D Scanners Super-Hub Component & Structured Data Integrity
const scannersHubFile = readFileSync('src/components/ScannersHubClient.tsx', 'utf8');
assert(
  !scannersHubFile.includes('border'),
  'ScannersHubClient must remain 100% borderless'
);

assert(
  structuredDataFile.includes('getScannersHubStructuredData'),
  'structured-data.ts must export getScannersHubStructuredData'
);

const sitemapFile = readFileSync('src/app/sitemap.xml/route.ts', 'utf8');
assert(
  sitemapFile.includes('/scanner-3d-aeroporti') && sitemapFile.includes('/en/3d-scanners-airports'),
  'Sitemap must include 3D scanners hub in IT and EN'
);

// 7. Verify AI Overview Definitional Summary & High-Intent "Informazioni" Target
assert(
  bubblesFile.includes('Informazioni') && bubblesFile.includes('Riepilogo Info') && bubblesFile.includes('Attesa Varchi'),
  'AirportBubblesView must render high-density AI Overview executive summary and key metrics'
);

assert(
  welcomeFile.includes('Informazioni e regole sui principali aeroporti') && welcomeFile.includes('featuredAirports.map'),
  'WelcomeView must render crawlable airport directory cards for broad keywords (info aeroporti)'
);

// 8. Verify SERP Meta Descriptions explicitly cite official sources and 24h updates
const layoutItFile = readFileSync('src/app/(it)/layout.tsx', 'utf8');
const layoutEnFile = readFileSync('src/app/en/layout.tsx', 'utf8');
const layoutEsFile = readFileSync('src/app/es/layout.tsx', 'utf8');
const airportPageItFile = readFileSync('src/app/(it)/aeroporti/[slug]/page.tsx', 'utf8');
const airportPageEnFile = readFileSync('src/app/en/airports/[slug]/page.tsx', 'utf8');
const airportPageEsFile = readFileSync('src/app/es/airports/[slug]/page.tsx', 'utf8');

assert(
  layoutItFile.includes('fonti ufficiali ogni 24h') && 
  layoutEnFile.includes('official airport sources and updated every 24h') &&
  layoutEsFile.includes('fuentes oficiales de aeropuertos cada 24h'),
  'Home layouts must explicitly state official sources and 24h updates in meta descriptions (IT, EN, ES)'
);

assert(
  airportPageItFile.includes('fonti ufficiali aggiornati ogni 24h') && 
  airportPageEnFile.includes('official sources, updated every 24h') &&
  airportPageEsFile.includes('fuentes oficiales actualizados cada 24h'),
  'Airport detail pages must explicitly state official sources and 24h updates in meta descriptions'
);

// 9. Verify Trilingual Support (IT, EN, ES) & Sibling Interlinking
assert(
  sitemapFile.includes('hreflang="es"'),
  'Sitemap must include Spanish alternate hreflang tags'
);

assert(
  headerFile.includes('SpainFlagIcon') && headerFile.includes('ES'),
  'Header must render Spanish language selector with flag icon'
);

assert(
  bubblesFile.includes('connectedAirports') && bubblesFile.includes('rel.iata'),
  'AirportBubblesView must render connected internal airport links for deep SEO crawlability'
);

console.log('✅ ALL SEO STRUCTURED DATA & MINIMALIST UI TESTS PASSED SUCCESSFULLY!');
