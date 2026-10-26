'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminAuthClient } from '@/lib/admin/browser';
import '../admin.css';

export default function AdminCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState('Verifica dell’accesso in corso…');

  useEffect(() => {
    let active = true;
    const finish = async () => {
      const client = getAdminAuthClient();
      if (!client) {
        setMessage('Accesso non configurato. Contatta chi gestisce il sito.');
        return;
      }
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (params.has('error')) {
        setMessage('Google non ha completato l’accesso. Riprova.');
        return;
      }
      if (code) {
        const { error } = await client.auth.exchangeCodeForSession(code);
        if (error) {
          const errorCode = (error.code || error.name || 'unknown').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 48);
          const errorStatus = typeof error.status === 'number' ? `, HTTP ${error.status}` : '';
          const errorDetail = error.message
            .replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, '[email omessa]')
            .replace(/https?:\/\/\S+/g, '[indirizzo omesso]')
            .replace(/[A-Fa-f0-9_-]{28,}/g, '[identificativo omesso]')
            .replace(/[\r\n]+/g, ' ')
            .slice(0, 100);
          setMessage(error.name === 'AuthPKCECodeVerifierMissingError'
            ? 'La sessione temporanea di accesso non è stata conservata. Torna alla console e riprova.'
            : `Non è stato possibile completare l’accesso (${errorCode}${errorStatus}: ${errorDetail}). Torna alla console e riprova.`);
          return;
        }
      }
      const { data } = await client.auth.getSession();
      if (!data.session) {
        setMessage('Sessione non valida. Riprova ad accedere.');
        return;
      }
      const response = await fetch('/api/admin/session', {
        headers: { Authorization: `Bearer ${data.session.access_token}` },
        cache: 'no-store',
      });
      if (!response.ok) {
        await client.auth.signOut();
        setMessage('Questo account Google non è autorizzato ad accedere alla console.');
        return;
      }
      if (active) router.replace('/admin');
    };
    void finish();
    return () => { active = false; };
  }, [router]);

  return <main className="admin-auth-screen"><div className="admin-auth-card"><span className="admin-mark">A</span><h1>Console AeroInfo</h1><p aria-live="polite">{message}</p>{message !== 'Verifica dell’accesso in corso…' && <a className="admin-back" href="/admin">Torna alla console</a>}</div></main>;
}
