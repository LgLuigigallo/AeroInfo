import { ImageResponse } from 'next/og';

export const alt = 'AeroInfo — Guida Ufficiale Aeroporti, Scanner 3D e Regole Liquidi';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          background: 'linear-gradient(135deg, #032b43 0%, #05668D 50%, #0284c7 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              padding: '8px 18px',
              borderRadius: '20px',
              width: 'fit-content',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#4ade80',
                marginRight: '10px',
              }}
            />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              FONTI UFFICIALI • AGGIORNATE OGNI 24H
            </span>
          </div>

          <h1
            style={{
              fontSize: '64px',
              fontWeight: 900,
              letterSpacing: '-1px',
              margin: '0 0 16px 0',
              lineHeight: 1.1,
            }}
          >
            AeroInfo<span style={{ color: '#67e8f9' }}>.eu</span>
          </h1>

          <h2
            style={{
              fontSize: '32px',
              fontWeight: 700,
              margin: '0 0 12px 0',
              color: '#f8fafc',
            }}
          >
            Regole Liquidi, Scanner 3D &amp; Info Aeroporti
          </h2>

          <p
            style={{
              fontSize: '20px',
              color: '#cbd5e1',
              margin: 0,
              maxWidth: '900px',
              lineHeight: 1.5,
            }}
          >
            Disposizioni verificate per bagaglio a mano, controlli di sicurezza e terminal.
            Oltre 40 scali italiani e internazionali costantemente monitorati.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            paddingTop: '24px',
          }}
        >
          <span style={{ fontSize: '18px', color: '#67e8f9', fontWeight: 600 }}>
            https://www.aero-info.eu
          </span>
          <span style={{ fontSize: '15px', color: '#94a3b8' }}>
            Italiano &amp; English
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
