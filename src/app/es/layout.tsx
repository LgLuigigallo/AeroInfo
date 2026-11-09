import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { MicrosoftClarity } from '@/components/MicrosoftClarity';
import { SiteStructuredData } from '@/components/SiteStructuredData';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aero-info.eu'),
  title: 'AeroInfo — Información Aeropuertos, Escáneres 3D, Reglas Líquidos y Terminales',
  description: 'Reglas de líquidos, equipajes y escáneres 3D antes de volar. Información verificada exclusivamente de fuentes oficiales de aeropuertos cada 24h.',
  alternates: {
    canonical: 'https://www.aero-info.eu/es',
    languages: {
      it: 'https://www.aero-info.eu/',
      en: 'https://www.aero-info.eu/en',
      es: 'https://www.aero-info.eu/es',
      'x-default': 'https://www.aero-info.eu/',
    },
  },
  openGraph: {
    title: 'AeroInfo — Información Aeropuertos, Escáneres 3D, Reglas Líquidos y Terminales',
    description: 'Reglas de líquidos, equipajes y escáneres 3D antes de volar. Información verificada exclusivamente de fuentes oficiales de aeropuertos cada 24h.',
    url: 'https://www.aero-info.eu/es',
    siteName: 'AeroInfo',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AeroInfo — Información Aeropuertos, Escáneres 3D, Reglas Líquidos y Terminales',
    description: 'Reglas de líquidos, equipajes y escáneres 3D antes de volar. Información verificada exclusivamente de fuentes oficiales de aeropuertos cada 24h.',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : {}),
    },
  },
};

export default function SpanishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}>
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
