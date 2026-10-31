import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { MicrosoftClarity } from '@/components/MicrosoftClarity';
import { SiteStructuredData } from '@/components/SiteStructuredData';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' });

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aero-info.eu'),
  title: 'AeroInfo — Info Aeroporti, Scanner 3D, Regole Liquidi e Terminal',
  description: 'Tutte le informazioni sui principali aeroporti: scanner 3D EDS-CB, regole liquidi e bagaglio a mano, tempi di attesa ai controlli e terminal prima del volo.',
  alternates: {
    canonical: 'https://www.aero-info.eu/',
    languages: {
      it: 'https://www.aero-info.eu/',
      en: 'https://www.aero-info.eu/en',
      'x-default': 'https://www.aero-info.eu/',
    },
  },
  openGraph: {
    title: 'AeroInfo — Info Aeroporti, Scanner 3D, Regole Liquidi e Terminal',
    description: 'Tutte le informazioni sui principali aeroporti: scanner 3D EDS-CB, regole liquidi e bagaglio a mano, tempi di attesa ai controlli e terminal prima del volo.',
    url: 'https://www.aero-info.eu/',
    siteName: 'AeroInfo',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AeroInfo — Info Aeroporti, Scanner 3D, Regole Liquidi e Terminal',
    description: 'Tutte le informazioni sui principali aeroporti: scanner 3D EDS-CB, regole liquidi e bagaglio a mano, tempi di attesa ai controlli e terminal prima del volo.',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : {}),
    },
  },
};

export default function ItalianRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <SiteStructuredData />
        {children}
        <Analytics />
        <GoogleAnalytics />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
