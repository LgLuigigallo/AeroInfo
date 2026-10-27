import type { Metadata } from 'next';
import '../globals.css';
import './admin/admin.css';

export const metadata: Metadata = {
  title: 'Console admin | AeroInfo',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
