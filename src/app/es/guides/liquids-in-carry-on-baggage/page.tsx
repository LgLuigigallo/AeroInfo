import type { Metadata } from 'next';
import { ContentGuide } from '@/components/ContentGuide';
import { liquidsGuide } from '@/lib/seo/content-guides';
import { SITE_URL } from '@/lib/seo/airports';

const content = liquidsGuide.es;
const canonical = new URL(content.path, SITE_URL).toString();
const alternateIt = new URL(liquidsGuide.it.path, SITE_URL).toString();
const alternateEn = new URL(liquidsGuide.en.path, SITE_URL).toString();

export const metadata: Metadata = {
  title: `${content.title} | AeroInfo`,
  description: content.description,
  alternates: {
    canonical,
    languages: {
      it: alternateIt,
      en: alternateEn,
      es: canonical,
      'x-default': alternateIt,
    },
  },
  openGraph: {
    title: content.title,
    description: content.description,
    url: canonical,
    siteName: 'AeroInfo',
    locale: 'es_ES',
    type: 'article',
  },
};

export default function LiquidsCarryOnGuideEs() {
  return <ContentGuide content={content} lang="es" />;
}
