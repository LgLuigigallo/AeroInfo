'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const COOKIE_STORAGE_KEY = 'aeroinfo_cookie_consent_v1';

/**
 * Detects whether the visitor arrived from an AI Search / Generative Engine
 * (ChatGPT Search, Perplexity AI, Claude, Microsoft Copilot, Google Gemini)
 * or via specific GEO campaigns.
 */
function trackAiAndSearchReferrals() {
  if (typeof window === 'undefined') return;
  const ref = document.referrer.toLowerCase();
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = (urlParams.get('utm_source') || '').toLowerCase();
  const utmMedium = (urlParams.get('utm_medium') || '').toLowerCase();

  let aiEngine: string | null = null;
  if (ref.includes('chatgpt.com') || ref.includes('openai.com') || utmSource.includes('chatgpt')) {
    aiEngine = 'chatgpt';
  } else if (ref.includes('perplexity.ai') || utmSource.includes('perplexity')) {
    aiEngine = 'perplexity';
  } else if (ref.includes('claude.ai') || utmSource.includes('claude')) {
    aiEngine = 'claude';
  } else if (ref.includes('copilot.microsoft.com') || utmSource.includes('copilot')) {
    aiEngine = 'copilot';
  } else if (ref.includes('gemini.google.com') || utmSource.includes('gemini')) {
    aiEngine = 'gemini';
  }

  if (aiEngine) {
    // Send custom GA4 event for Generative Engine Tracking
    if ((window as any).gtag) {
      (window as any).gtag('event', 'ai_search_referral', {
        ai_engine: aiEngine,
        landing_page: window.location.pathname,
        referrer_domain: document.referrer || 'utm_parameter',
        utm_source: utmSource,
        utm_medium: utmMedium,
      });
    }

    // Set Microsoft Clarity custom session tag for filtering recordings
    if ((window as any).clarity) {
      try {
        (window as any).clarity('set', 'ai_engine', aiEngine);
        (window as any).clarity('set', 'ai_landing_path', window.location.pathname);
      } catch {
        // Ignore Clarity tag errors
      }
    }
  }
}

export function GoogleAnalytics({ gaId }: { gaId?: string }) {
  const measurementId = gaId || process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    // Check initial consent state from localStorage
    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.analytics && typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('consent', 'update', {
            analytics_storage: 'granted',
          });
          trackAiAndSearchReferrals();
        }
      }
    } catch {
      // Ignore storage errors
    }

    // Listen for real-time consent grant event
    const handleConsent = () => {
      trackAiAndSearchReferrals();
    };
    window.addEventListener('cookie-consent-updated', handleConsent);
    return () => window.removeEventListener('cookie-consent-updated', handleConsent);
  }, []);

  if (!measurementId) {
    return null;
  }

  return (
    <>
      {/* Google Consent Mode v2 Default Settings (GDPR compliant: denied until user accepts) */}
      <Script
        id="google-consent-mode"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
          `,
        }}
      />
      {/* Google Analytics 4 Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              anonymize_ip: true
            });
          `,
        }}
      />
    </>
  );
}
