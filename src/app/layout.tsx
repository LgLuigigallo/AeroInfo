import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AeroInfo — Airport Intelligence & Traveler Guide",
  description: "Aggregatore essenziale di informazioni aeroportuali: liquidi 100ml e scanner 3D, regole droni, terminal e compagnie, prese di ricarica e trasporti.",
  keywords: ["aeroporti", "liquidi bagaglio a mano", "scanner 3D aeroporto", "droni aereo", "terminal", "airport guide", "carry-on liquids"],
  openGraph: {
    title: "AeroInfo — Airport Intelligence & Traveler Guide",
    description: "Tutto ciò che devi sapere prima di volare: liquidi, scanner 3D, droni, prese e terminal dai siti ufficiali.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
