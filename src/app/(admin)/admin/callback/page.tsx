'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { getAdminAuthClient } from '@/lib/admin/browser';

export default function AdminCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState('Verifica dell’accesso in corso…');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let active = true;

    const finish = async () => {
      const client = getAdminAuthClient();
      if (!client) {
        setIsError(true);
        setMessage('Accesso non configurato. Contatta chi gestisce il sito.');
        return;
      }

      // Check URL search parameters and hash fragment
      const searchParams = new URLSearchParams(window.location.search);
      const hashRaw = window.location.hash.startsWith('#')
        ? window.location.hash.substring(1)
        : window.location.hash;
      const hashParams = new URLSearchParams(hashRaw);

      const errorDescription =
        searchParams.get('error_description') ||
        hashParams.get('error_description') ||
        searchParams.get('error') ||
        hashParams.get('error');

      if (errorDescription) {
        setIsError(true);
        setMessage(`Errore durante l’accesso: ${errorDescription}`);
        return;
      }

      // 1. Try to get session (auto-detected if detectSessionInUrl: true)
      let { data: sessionData, error: sessionError } = await client.auth.getSession();

      // 2. Fallback: if session not detected yet, check for PKCE code
      if (!sessionData?.session) {
        const code = searchParams.get('code');
        if (code) {
          const { error: exchangeError } = await client.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            setIsError(true);
            setMessage('Non è stato possibile completare l’accesso (codice non valido). Riprova.');
            return;
          }
          const res = await client.auth.getSession();
          sessionData = res.data;
          sessionError = res.error;
        }
      }

      // 3. Fallback: if session still not detected, check for OAuth hash tokens
      if (!sessionData?.session) {
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        if (accessToken && refreshToken) {
          const { error: setSessionError } = await client.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (setSessionError) {
            setIsError(true);
            setMessage('Non è stato possibile completare l’accesso (token non valido). Riprova.');
            return;
          }
          const res = await client.auth.getSession();
          sessionData = res.data;
          sessionError = res.error;
        }
      }

      if (sessionError || !sessionData?.session) {
        setIsError(true);
        setMessage('Sessione non valida o scaduta. Riprova ad accedere.');
        return;
      }

      // 4. Verify admin authorization against /api/admin/session
      const response = await fetch('/api/admin/session', {
        headers: { Authorization: `Bearer ${sessionData.session.access_token}` },
        cache: 'no-store',
      });

      if (!response.ok) {
        await client.auth.signOut();
        setIsError(true);
        setMessage('Questo account Google non è autorizzato ad accedere alla console AeroInfo.');
        return;
      }

      if (active) {
        router.replace('/admin');
      }
    };

    void finish();

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <main className="admin-auth-screen">
      <div className="admin-auth-card">
        <span className="admin-mark">A</span>
        <p className="admin-eyebrow">AREA RISERVATA</p>
        <h1>Console AeroInfo</h1>
        {isError ? (
          <>
            <div className="admin-alert error" style={{ marginTop: '16px', textAlign: 'left' }}>
              {message}
            </div>
            <Link href="/admin" className="admin-primary full" style={{ textDecoration: 'none' }}>
              Riprova ad accedere
            </Link>
            <Link href="/" className="admin-back">
              Torna al sito
            </Link>
          </>
        ) : (
          <>
            <p>{message}</p>
            <LoaderCircle className="admin-spinner" style={{ margin: '20px auto 0' }} />
          </>
        )}
      </div>
    </main>
  );
}
