import type { Metadata } from 'next';
import { ContentGuide } from '@/components/ContentGuide';
import { liquidsGuide } from '@/lib/seo/content-guides';
import { SITE_URL } from '@/lib/seo/airports';

const content = liquidsGuide.it;
const canonical = new URL(content.path, SITE_URL).toString();
const alternate = new URL(liquidsGuide.en.path, SITE_URL).toString();

export const metadata: Metadata = {
  title: `${content.title} | AeroInfo`,
  description: content.description,
  alternates: { canonical, languages: { it: canonical, en: alternate, 'x-default': canonical } },
  openGraph: { title: content.title, description: content.description, url: canonical, siteName: 'AeroInfo', locale: 'it_IT', type: 'article' },
};

export default function LiquidsCarryOnGuideIt() {
  return <ContentGuide content={content} lang="it" />;
}
