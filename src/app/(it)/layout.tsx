import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

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
  title: 'AeroInfo — Informazioni utili sugli aeroporti',
  description: 'Informazioni verificate su sicurezza, liquidi, terminal e servizi negli aeroporti.',
  alternates: { canonical: 'https://www.aero-info.eu/' },
  openGraph: {
    title: 'AeroInfo — Informazioni utili sugli aeroporti',
    description: 'Informazioni verificate su sicurezza, liquidi, terminal e servizi negli aeroporti.',
    url: 'https://www.aero-info.eu/',
    siteName: 'AeroInfo',
    locale: 'it_IT',
    type: 'website',
  },
};

export default function ItalianRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
