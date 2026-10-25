import type { Metadata } from 'next';
import { ContentGuide } from '@/components/ContentGuide';
import { liquidsGuide } from '@/lib/seo/content-guides';
import { SITE_URL } from '@/lib/seo/airports';

const content = liquidsGuide.en;
const canonical = new URL(content.path, SITE_URL).toString();
const alternate = new URL(liquidsGuide.it.path, SITE_URL).toString();

export const metadata: Metadata = {
  title: `${content.title} | AeroInfo`,
  description: content.description,
  alternates: { canonical, languages: { it: alternate, en: canonical, 'x-default': alternate } },
  openGraph: { title: content.title, description: content.description, url: canonical, siteName: 'AeroInfo', locale: 'en_GB', type: 'article' },
};

export default function LiquidsCarryOnGuideEn() {
  return <ContentGuide content={content} lang="en" />;
}
