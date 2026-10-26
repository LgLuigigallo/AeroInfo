'use client';

import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { LanguageProvider } from '@/lib/i18n';

export function PrivacyFooter() {
  return (
    <LanguageProvider>
      <Footer />
      <CookieConsent />
    </LanguageProvider>
  );
}
