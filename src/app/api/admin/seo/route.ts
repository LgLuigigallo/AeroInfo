import { NextRequest, NextResponse } from 'next/server';
import { getLiveAirports } from '@/lib/supabase';
import { adminDb as privilegedDb, isAdminIdentity, requireAdmin, writeAdminAudit } from '@/lib/admin/server';
import { evaluateAirportSeoQuality, saveAirportSeoEvaluation } from '@/lib/seo/airports';

export async function POST(request: NextRequest) {
  const identity = await requireAdmin(request);
  if (!isAdminIdentity(identity)) return identity;
  if (!privilegedDb) return NextResponse.json({ error: 'Archivio admin non configurato.' }, { status: 503 });
  let body: { iata?: string };
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Richiesta non valida.' }, { status: 400 }); }
  const iata = body.iata?.toUpperCase();
  if (!iata || !/^[A-Z0-9]{3}$/.test(iata)) return NextResponse.json({ error: 'Codice IATA non valido.' }, { status: 400 });
  const airport = (await getLiveAirports()).find((item) => item.iata.toUpperCase() === iata);
  if (!airport) return NextResponse.json({ error: 'Aeroporto non trovato.' }, { status: 404 });
  const reasons = evaluateAirportSeoQuality(airport);
  const hasPlaceholder = reasons.some((reason) => reason.includes('segnaposto/generici'));
  const status = hasPlaceholder ? 'blocked' : reasons.length ? 'pending_quality' : 'indexable';
  try { await writeAdminAudit(identity, 'seo.evaluate', 'airport', iata, { status, reasonCount: reasons.length }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Audit non disponibile.' }, { status: 503 }); }
  try {
    await saveAirportSeoEvaluation(airport, status, reasons);
    await writeAdminAudit(identity, 'seo.evaluate.completed', 'airport', iata, { status, reasonCount: reasons.length }, 'success');
    return NextResponse.json({ success: true, status, reasons });
  } catch {
    await writeAdminAudit(identity, 'seo.evaluate.completed', 'airport', iata, { status, reasonCount: reasons.length }, 'failure');
    return NextResponse.json({ error: 'Impossibile salvare la valutazione SEO.' }, { status: 503 });
  }
}
