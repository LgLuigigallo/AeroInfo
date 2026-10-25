import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestione notifiche email | AeroInfo',
  description: 'Gestisci le preferenze per le notifiche email di AeroInfo.',
  alternates: { canonical: 'https://www.aero-info.eu/unsubscribe' },
  robots: { index: false, follow: false },
};

export default function UnsubscribeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
