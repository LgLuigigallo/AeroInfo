'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminAuthClient } from '@/lib/admin/browser';

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
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        const { error } = await client.auth.exchangeCodeForSession(code);
        if (error) {
          setMessage('Non è stato possibile completare l’accesso. Riprova.');
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

  return <main className="admin-auth-screen"><div className="admin-auth-card"><span className="admin-mark">A</span><h1>Console AeroInfo</h1><p>{message}</p></div></main>;
}
