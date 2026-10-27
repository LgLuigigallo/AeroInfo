import assert from 'node:assert';
import { readFileSync } from 'node:fs';

console.log('🧪 VERIFYING SEO STRUCTURED DATA & SEMANTIC DOSSIER...');

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
  structuredDataFile.includes("'@graph': [breadcrumbs, airportEntity]"),
  'structured-data.ts must combine BreadcrumbList and Airport in @graph'
);

// 2. Read AirportSeoDossier.tsx to ensure AirportSemanticDossier is embedded
const dossierFile = readFileSync('src/components/AirportSeoDossier.tsx', 'utf8');

assert(
  dossierFile.includes('<AirportSemanticDossier'),
  'AirportSeoDossier must render AirportSemanticDossier for crawler SSR'
);

assert(
  dossierFile.includes('getAirportCombinedStructuredData'),
  'AirportSeoDossier must use getAirportCombinedStructuredData'
);

// 3. Read AirportSemanticDossier.tsx to ensure semantic headings & tables
const semanticFile = readFileSync('src/components/AirportSemanticDossier.tsx', 'utf8');

assert(
  semanticFile.includes('id="sicurezza-liquidi"'),
  'AirportSemanticDossier must contain section id="sicurezza-liquidi"'
);

assert(
  semanticFile.includes('id="terminal-compagnie"'),
  'AirportSemanticDossier must contain section id="terminal-compagnie"'
);

assert(
  semanticFile.includes('id="trasporti-collegamenti"'),
  'AirportSemanticDossier must contain section id="trasporti-collegamenti"'
);

assert(
  semanticFile.includes('<table'),
  'AirportSemanticDossier must render HTML table for airlines and terminals'
);

console.log('✅ ALL SEO STRUCTURED DATA & SEMANTIC DOSSIER TESTS PASSED SUCCESSFULLY!');
