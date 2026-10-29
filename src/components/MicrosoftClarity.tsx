'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const COOKIE_STORAGE_KEY = 'aeroinfo_cookie_consent_v1';

export function MicrosoftClarity({ projectId }: { projectId?: string }) {
  const clarityId = projectId || process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'z5db8kalka';

  useEffect(() => {
    if (!clarityId) return;

    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof window !== 'undefined' && (window as any).clarity) {
          (window as any).clarity('consent', Boolean(parsed.analytics));
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [clarityId]);

  if (!clarityId) {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  );
}
