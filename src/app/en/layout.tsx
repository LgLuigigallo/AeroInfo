import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { SiteStructuredData } from '@/components/SiteStructuredData';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aero-info.eu'),
  title: 'AeroInfo — 3D Scanners, Liquid Rules & Airport Security Guide',
  description: 'Everything you need to know before flying: 3D scanner availability, carry-on liquid limits, security wait times, and terminal guides for major airports.',
  alternates: {
    canonical: 'https://www.aero-info.eu/en',
    languages: {
      it: 'https://www.aero-info.eu/',
      en: 'https://www.aero-info.eu/en',
      'x-default': 'https://www.aero-info.eu/',
    },
  },
  openGraph: {
    title: 'AeroInfo — 3D Scanners, Liquid Rules & Airport Security Guide',
    description: 'Everything you need to know before flying: 3D scanner availability, carry-on liquid limits, security wait times, and terminal guides for major airports.',
    url: 'https://www.aero-info.eu/en',
    siteName: 'AeroInfo',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AeroInfo — 3D Scanners, Liquid Rules & Airport Security Guide',
    description: 'Everything you need to know before flying: 3D scanner availability, carry-on liquid limits, security wait times, and terminal guides for major airports.',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : {}),
    },
  },
};

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <SiteStructuredData />
        {children}
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
