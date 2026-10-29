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
  title: 'AeroInfo — Scanner 3D, Regole Liquidi e Controlli Aeroporto',
  description: 'Tutto ciò che devi sapere prima di volare: presenza di scanner 3D EDS-CB, regole liquidi nel bagaglio a mano, tempi di attesa e servizi nei principali aeroporti.',
  alternates: {
    canonical: 'https://www.aero-info.eu/',
    languages: {
      it: 'https://www.aero-info.eu/',
      en: 'https://www.aero-info.eu/en',
      'x-default': 'https://www.aero-info.eu/',
    },
  },
  openGraph: {
    title: 'AeroInfo — Scanner 3D, Regole Liquidi e Controlli Aeroporto',
    description: 'Tutto ciò che devi sapere prima di volare: presenza di scanner 3D EDS-CB, regole liquidi nel bagaglio a mano, tempi di attesa e servizi nei principali aeroporti.',
    url: 'https://www.aero-info.eu/',
    siteName: 'AeroInfo',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AeroInfo — Scanner 3D, Regole Liquidi e Controlli Aeroporto',
    description: 'Tutto ciò che devi sapere prima di volare: presenza di scanner 3D EDS-CB, regole liquidi nel bagaglio a mano, tempi di attesa e servizi nei principali aeroporti.',
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
