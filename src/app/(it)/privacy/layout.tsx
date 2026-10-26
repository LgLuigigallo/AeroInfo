import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy e cookie policy | AeroInfo',
  description: 'Informativa sul trattamento dei dati personali e sull’uso dei cookie e degli strumenti di analisi di AeroInfo.',
  alternates: { canonical: 'https://www.aero-info.eu/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
