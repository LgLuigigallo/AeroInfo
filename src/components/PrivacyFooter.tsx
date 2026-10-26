'use client';

import { Footer } from '@/components/Footer';
import { LanguageProvider } from '@/lib/i18n';

export function PrivacyFooter() {
  return (
    <LanguageProvider>
      <Footer />
    </LanguageProvider>
  );
}
