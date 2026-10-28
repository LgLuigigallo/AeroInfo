import Link from 'next/link';
import type { GuideContent, GuideLanguage } from '@/lib/seo/content-guides';
import { getGuideStructuredData } from '@/lib/seo/structured-data';

type Props = { content: GuideContent; lang: GuideLanguage };

export function ContentGuide({ content, lang }: Props) {
  const italian = lang === 'it';
  const reviewedDate = new Intl.DateTimeFormat(italian ? 'it-IT' : 'en-GB', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${content.reviewedAt}T00:00:00Z`));

  const structuredData = getGuideStructuredData(
    content.title,
    content.description,
    content.path,
    content.reviewedAt,
    lang
  );

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <article className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
        <nav aria-label={italian ? 'Percorso di navigazione' : 'Breadcrumb'} className="text-sm text-zinc-500">
          <ol className="flex flex-wrap gap-2">
            <li><Link className="underline" href="/">AeroInfo</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{italian ? 'Guide' : 'Guides'}</li>
          </ol>
        </nav>

        <header className="space-y-4 border-b border-zinc-200 pb-7 dark:border-zinc-800">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {italian ? 'Guida di viaggio' : 'Travel guide'}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{content.title}</h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">{content.introduction}</p>
          <p className="text-sm text-zinc-500">
            {italian ? 'Fonti controllate il' : 'Sources checked on'}{' '}
            <time dateTime={content.reviewedAt}>{reviewedDate}</time>.
          </p>
        </header>

        {content.sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-2xl font-semibold">{section.heading}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={`${section.heading}-${index}`} className="leading-7 text-zinc-700 dark:text-zinc-300">
                {paragraph.text}{' '}
                {paragraph.sourceIndex !== undefined && (
                  <a className="font-medium underline underline-offset-4" href={content.sources[paragraph.sourceIndex].href} target="_blank" rel="noreferrer">
                    {italian ? 'Fonte ufficiale' : 'Official source'}
                  </a>
                )}
              </p>
            ))}
          </section>
        ))}

        <section className="space-y-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <h2 className="text-xl font-semibold">{italian ? 'Fonti ufficiali' : 'Official sources'}</h2>
          <ul className="list-disc space-y-2 pl-6 text-sm leading-6">
            {content.sources.map((source) => (
              <li key={source.href}><a className="underline underline-offset-4" href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>
            ))}
          </ul>
        </section>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
    </main>
  );
}
