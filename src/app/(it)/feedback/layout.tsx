import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contatti e feedback | AeroInfo',
  description: 'Invia una segnalazione o un suggerimento al team AeroInfo.',
  alternates: { canonical: 'https://www.aero-info.eu/feedback' },
  robots: { index: false, follow: false },
};

export default function FeedbackLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
