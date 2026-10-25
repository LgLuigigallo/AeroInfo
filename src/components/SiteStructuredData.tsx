import { getSiteStructuredData } from '@/lib/seo/structured-data';

export function SiteStructuredData() {
  const data = getSiteStructuredData();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.organization).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.website).replace(/</g, '\\u003c') }} />
    </>
  );
}
