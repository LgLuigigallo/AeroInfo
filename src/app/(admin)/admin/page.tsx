'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Activity, AlertTriangle, ArrowUpRight, ChevronDown, ClipboardList, FileText, Gauge, LoaderCircle, LogOut, MapPin, MessageSquare, Plane, RefreshCw, Search, ShieldCheck, SlidersHorizontal, X } from 'lucide-react';
import { getAdminAuthClient } from '@/lib/admin/browser';
import type { Airport as AirportRecord } from '@/types/airport';
import './admin.css';

type Section = 'overview' | 'requests' | 'suggestions' | 'feedback' | 'airports' | 'seo' | 'syncs' | 'audit';
type Row = Record<string, unknown>;
type PageData = { items: Row[]; count?: number; page?: number; pageSize?: number };

const sections: { id: Section; label: string; icon: typeof Gauge }[] = [
  { id: 'overview', label: 'Panoramica', icon: Gauge },
  { id: 'requests', label: 'Richieste aeroporti', icon: Plane },
  { id: 'suggestions', label: 'Segnalazioni', icon: AlertTriangle },
  { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  { id: 'airports', label: 'Catalogo aeroporti', icon: MapPin },
  { id: 'seo', label: 'Qualità SEO', icon: ShieldCheck },
  { id: 'syncs', label: 'Sincronizzazioni', icon: RefreshCw },
  { id: 'audit', label: 'Registro attività', icon: ClipboardList },
];

const labelStatus: Record<string, string> = {
  queued: 'In coda', pending: 'In attesa', queued_weekly: 'Pianificata', scraping: 'In elaborazione', published: 'Pubblicata', cancelled: 'Annullata',
  approved: 'Approvata',
  pending_verification: 'Da verificare', verified: 'Verificata', unconfirmed: 'Non confermata', new: 'Nuovo', reviewed: 'Esaminato', resolved: 'Risolto',
  pending_quality: 'In revisione', indexable: 'Indicizzabile', blocked: 'Bloccato', SUCCESS: 'Completata', FAILED: 'Con errori',
};

function dateLabel(value: unknown) {
  if (typeof value !== 'string') return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString('it-IT', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [authError, setAuthError] = useState('');
  const [section, setSection] = useState<Section>('overview');
  const [data, setData] = useState<PageData>({ items: [] });
  const [overview, setOverview] = useState<Row | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [working, setWorking] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<Row | null>(null);
  const [editingAirport, setEditingAirport] = useState<AirportRecord | null>(null);
  const [syncIata, setSyncIata] = useState('');
  const client = getAdminAuthClient();

  const api = useCallback(async (path: string, init: RequestInit = {}) => {
    const authClient = getAdminAuthClient();
    const { data: sessionData } = authClient ? await authClient.auth.getSession() : { data: { session: null } };
    if (!sessionData.session) throw new Error('Sessione scaduta. Accedi di nuovo.');
    const response = await fetch(path, {
      ...init,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionData.session.access_token}`, ...(init.headers || {}) },
      cache: 'no-store',
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Operazione non riuscita.');
    return result;
  }, []);

  useEffect(() => {
    let active = true;
    const verify = async () => {
      const config = await fetch('/api/admin/status', { cache: 'no-store' }).then((response) => response.json()).catch(() => ({ ready: false }));
      if (!client || !config.ready) {
        setAuthError('Accesso non configurato. Verifica la configurazione Google e Supabase.');
        setLoading(false);
        return;
      }
      const { data: sessionData } = await client.auth.getSession();
      if (!sessionData.session) { setLoading(false); return; }
      const response = await fetch('/api/admin/session', { headers: { Authorization: `Bearer ${sessionData.session.access_token}` }, cache: 'no-store' });
      if (!response.ok) {
        await client.auth.signOut();
        if (active) { setAuthError('Questo account Google non è autorizzato ad accedere alla console.'); setLoading(false); }
        return;
      }
      const identity = await response.json();
      if (active) { setEmail(identity.email); setLoading(false); }
      void fetch('/api/admin/session', { method: 'POST', headers: { Authorization: `Bearer ${sessionData.session.access_token}` } });
    };
    void verify();
    return () => { active = false; };
  }, [client]);

  const loadSection = useCallback(async () => {
    setError('');
    try {
      if (section === 'overview') { setOverview(await api('/api/admin/overview')); return; }
      const params = new URLSearchParams();
      params.set('page', String(page));
      if (search.trim()) params.set('q', search.trim());
      if (statusFilter) params.set(section === 'airports' || section === 'seo' ? 'seoStatus' : 'status', statusFilter);
      if (categoryFilter) params.set('category', categoryFilter);
      if (dateFrom) params.set('from', dateFrom);
      if (dateTo) params.set('to', dateTo);
      if (section === 'suggestions' || section === 'feedback') params.set('kind', section);
      const endpoint = section === 'requests' ? '/api/admin/requests'
        : section === 'suggestions' || section === 'feedback' ? '/api/admin/moderation'
        : section === 'airports' || section === 'seo' ? '/api/admin/airports'
        : section === 'syncs' ? '/api/admin/syncs' : '/api/admin/audit';
      const result = await api(`${endpoint}${params.size ? `?${params}` : ''}`);
      setData(result);
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Impossibile caricare i dati.'); }
  }, [api, section, search, statusFilter, categoryFilter, dateFrom, dateTo, page]);

  useEffect(() => {
    if (!loading && email) {
      // This effect performs a remote read whenever the selected admin section changes.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void loadSection();
    }
  }, [loading, email, loadSection]);

  const login = async () => {
    if (!client) { setAuthError('Accesso non configurato. Verifica la configurazione Google e Supabase.'); return; }
    setWorking(true); setAuthError('');
    const { error: loginError } = await client.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/admin/callback` } });
    if (loginError) { setAuthError('Non è stato possibile avviare l’accesso Google.'); setWorking(false); }
  };

  const logout = async () => { if (client) await client.auth.signOut(); setEmail(''); router.replace('/admin'); };

  const runAction = async (path: string, method: string, body: unknown, success: string | ((result: Row) => string)) => {
    setWorking(true); setError(''); setNotice('');
    try { const result = await api(path, { method, body: JSON.stringify(body) }); setNotice(typeof success === 'function' ? success(result) : success); setDetail(null); await loadSection(); }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'Operazione non riuscita.'); }
    finally { setWorking(false); }
  };

  const openDetail = async (kind: string, row: Row) => {
    if (!row.id) return;
    try {
      const item = await api(`/api/admin/${kind}/${row.id}`);
      setDetail(item.item);
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Dettaglio non disponibile.'); }
  };

  const openModeration = async (row: Row) => {
    try { setDetail((await api(`/api/admin/moderation/${section}/${row.id}`)).item); }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'Dettaglio non disponibile.'); }
  };

  const airportItems = useMemo(() => data.items as unknown as (AirportRecord & { seoReasons?: string[] })[], [data.items]);

  if (loading) return <main className="admin-auth-screen"><LoaderCircle className="admin-spinner" /></main>;
  if (!email) return <main className="admin-auth-screen"><div className="admin-auth-card"><span className="admin-mark">A</span><p className="admin-eyebrow">AREA RISERVATA</p><h1>Console AeroInfo</h1><p>Accedi con l’account Google autorizzato per gestire il sito.</p>{authError && <div className="admin-alert error">{authError}</div>}<button className="admin-primary full" onClick={login} disabled={working || authError.includes('non configurato')}>{working ? 'Apertura Google…' : 'Continua con Google'}</button><Link href="/" className="admin-back">Torna al sito</Link></div></main>;

  const title = sections.find((item) => item.id === section)?.label || 'Panoramica';
  return <div className="admin-layout">
    <aside className="admin-sidebar">
      <a href="/admin" className="admin-brand"><span className="admin-mark small">A</span><span>AeroInfo <small>CONTROL ROOM</small></span></a>
      <div className="admin-nav-label">GESTIONE</div>
      <nav>{sections.map((item) => { const Icon = item.icon; return <button key={item.id} title={item.label} aria-label={item.label} className={`admin-nav-item ${section === item.id ? 'active' : ''}`} onClick={() => { setSection(item.id); setDetail(null); setSearch(''); setStatusFilter(''); setCategoryFilter(''); setDateFrom(''); setDateTo(''); setPage(1); }}><Icon size={17} /><span>{item.label}</span>{item.id === 'requests' && overview && Number((overview.counts as Row)?.requests) > 0 && <b>{String((overview.counts as Row).requests)}</b>}</button>; })}</nav>
      <div className="admin-sidebar-bottom"><div className="admin-user"><span className="admin-avatar">{email.slice(0, 1).toUpperCase()}</span><span><strong>Amministratore</strong><small>{email}</small></span></div><button className="admin-signout" onClick={logout}><LogOut size={16} /> Esci</button></div>
    </aside>

    <main className="admin-main">
      <header className="admin-topbar"><div><p className="admin-eyebrow">AEROINFO / AMMINISTRAZIONE</p><h1>{title}</h1></div><button className="admin-icon-button" title="Aggiorna" onClick={() => void loadSection()}><RefreshCw size={17} /></button></header>
      {(notice || error) && <div className={`admin-alert ${error ? 'error' : 'success'}`}><span>{error || notice}</span><button onClick={() => { setError(''); setNotice(''); }}><X size={15} /></button></div>}

      {section === 'overview' && <Overview overview={overview} onOpen={setSection} />}
        {section !== 'overview' && <>
        {section !== 'audit' && <div className="admin-filters"><label className="admin-search"><Search size={16} /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder={section === 'requests' ? 'Cerca nome, città o IATA…' : section === 'syncs' ? 'Cerca codice IATA…' : 'Cerca…'} /></label>
          <label className="admin-select"><SlidersHorizontal size={15} /><select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }}><option value="">Tutti gli stati</option>{(section === 'requests' ? ['queued', 'pending', 'queued_weekly', 'scraping', 'published', 'cancelled'] : section === 'suggestions' ? ['pending_verification', 'verified', 'unconfirmed'] : section === 'feedback' ? ['new', 'reviewed', 'resolved'] : section === 'syncs' ? ['SUCCESS', 'FAILED'] : ['pending_quality', 'indexable', 'blocked']).map((value) => <option key={value} value={value}>{labelStatus[value] || value}</option>)}</select><ChevronDown size={14} /></label>
          {(section === 'suggestions' || section === 'feedback') && <label className="admin-select"><SlidersHorizontal size={15} /><select value={categoryFilter} onChange={(event) => { setCategoryFilter(event.target.value); setPage(1); }}><option value="">Tutte le categorie</option>{(section === 'suggestions' ? ['3d_scanners', 'liquids', 'drones', 'power_outlets', 'terminals', 'dining', 'other'] : ['suggestion', 'bug_report', 'inquiry', 'general']).map((value) => <option key={value} value={value}>{value.replaceAll('_', ' ')}</option>)}</select><ChevronDown size={14} /></label>}
          {(section === 'requests' || section === 'suggestions' || section === 'feedback' || section === 'syncs') && <div className="admin-date-filters"><label>Da<input type="date" value={dateFrom} onChange={(event) => { setDateFrom(event.target.value); setPage(1); }} /></label><label>A<input type="date" value={dateTo} onChange={(event) => { setDateTo(event.target.value); setPage(1); }} /></label></div>}
        </div>}
        {section === 'requests' && <Requests
          rows={data.items}
          total={data.count || 0}
          onDetail={(row) => void openDetail('requests', row)}
          onApprove={(id) => void runAction('/api/admin/requests', 'POST', { id, action: 'approve' }, 'Richiesta approvata; resta nel ciclo automatico.')}
          onRun={(row) => {
            const currentIata = String(row.iata_code || row.resolved_iata || '');
            let targetIata = currentIata && currentIata !== '—' ? currentIata : '';
            if (!targetIata) {
              const input = window.prompt(`Codice IATA non rilevato per "${row.query}". Inserisci il codice a 3 lettere (es. NAS):`);
              if (!input) return;
              if (!/^[A-Za-z]{3}$/.test(input.trim())) {
                alert('Il codice IATA deve contenere esattamente 3 lettere.');
                return;
              }
              targetIata = input.trim().toUpperCase();
            }
            void runAction('/api/admin/requests', 'POST', { id: String(row.id), action: 'run', iata_code: targetIata || undefined }, (result) => `${result.linkedExistingAirport ? 'Richiesta collegata alla scheda esistente.' : 'Elaborazione completata.'} Email inviate: ${result.notificationsSent}. ${Array.isArray(result.notificationErrors) && result.notificationErrors.length ? 'Alcune notifiche o aggiornamenti hanno avuto errori.' : ''}`);
          }}
          onAssignIata={(row) => {
            const current = String(row.iata_code || row.resolved_iata || '');
            const input = window.prompt(`Assegna o modifica codice IATA per "${row.query}" (es. NAS):`, current && current !== '—' ? current : '');
            if (!input) return;
            if (!/^[A-Za-z]{3}$/.test(input.trim())) {
              alert('Il codice IATA deve contenere esattamente 3 lettere.');
              return;
            }
            void runAction('/api/admin/requests', 'POST', { id: String(row.id), action: 'assign_iata', iata_code: input.trim().toUpperCase() }, 'Codice IATA assegnato.');
          }}
          onCancel={(id) => { if (window.confirm('Annullare questa richiesta?')) void runAction('/api/admin/requests', 'POST', { id, action: 'cancel' }, 'Richiesta annullata.'); }}
          busy={working}
        />}
        {(section === 'suggestions' || section === 'feedback') && <Moderation rows={data.items} kind={section} onDetail={(row) => void openModeration(row)} onStatus={(id, status) => void runAction('/api/admin/moderation', 'PATCH', { kind: section, id, status }, 'Stato aggiornato.')} busy={working} />}
        {(section === 'airports' || section === 'seo') && <Airports rows={airportItems} mode={section} onEdit={setEditingAirport} onEvaluate={(iata) => void runAction('/api/admin/seo', 'POST', { iata }, 'Valutazione SEO aggiornata.')} busy={working} />}
        {section === 'syncs' && <Syncs rows={data.items} iata={syncIata} setIata={setSyncIata} onRun={() => void runAction('/api/admin/syncs', 'POST', { iata: syncIata }, `Sincronizzazione ${syncIata.toUpperCase()} completata.`)} onDetail={setDetail} busy={working} />}
        {section === 'audit' && <Audit rows={data.items} />}
        <Pagination page={data.page || page} pageSize={data.pageSize || 20} count={data.count || 0} onPage={setPage} />
      </>}
    </main>

    {detail && <div className="admin-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setDetail(null); }}><section className="admin-detail"><header><div><p className="admin-eyebrow">DETTAGLIO</p><h2>{String(detail.subject || detail.query || detail.airport_iata || detail.iata_code || detail.action || 'Elemento')}</h2></div><button className="admin-icon-button" onClick={() => setDetail(null)}><X size={17} /></button></header><div className="admin-detail-content">{Object.entries(detail).filter(([key]) => !['id', 'scraped_data'].includes(key)).map(([key, value]) => <div key={key} className="admin-detail-row"><span>{key.replaceAll('_', ' ')}</span><strong>{typeof value === 'object' ? <pre>{JSON.stringify(value, null, 2)}</pre> : String(value ?? '—')}</strong></div>)}{Boolean(detail.scraped_data) && <div className="admin-detail-row"><span>Dati elaborati</span><pre>{JSON.stringify(detail.scraped_data, null, 2)}</pre></div>}</div></section></div>}
    {editingAirport && <AirportEditor key={editingAirport.iata} airport={editingAirport} busy={working} onClose={() => setEditingAirport(null)} onSave={(airport) => void runAction('/api/admin/airports', 'PUT', airport, `Scheda ${editingAirport.iata} salvata.`).then(() => setEditingAirport(null))} />}
  </div>;
}

function Overview({ overview, onOpen }: { overview: Row | null; onOpen: (section: Section) => void }) {
  const counts = (overview?.counts || {}) as Row;
  const cards = [
    ['Richieste aperte', counts.requests, 'requests', Plane], ['Segnalazioni da verificare', counts.suggestions, 'suggestions', AlertTriangle], ['Feedback da esaminare', counts.feedback, 'feedback', MessageSquare], ['Aeroporti in revisione SEO', counts.seo, 'seo', ShieldCheck],
  ] as const;
  const syncs = (overview?.recentSyncs || []) as Row[];
  return <div className="admin-overview"><div className="admin-welcome"><div><span className="admin-welcome-icon"><Activity size={21} /></span><div><h2>Panoramica del sito</h2><p>Stato delle richieste, della qualità dei contenuti e delle operazioni recenti.</p></div></div><button className="admin-secondary" onClick={() => onOpen('requests')}>Apri richieste <ArrowUpRight size={15} /></button></div><div className="admin-stat-grid">{cards.map(([label, value, target, Icon]) => <button className="admin-stat-card" key={target} onClick={() => onOpen(target)}><span className="admin-stat-icon"><Icon size={18} /></span><span className="admin-stat-value">{String(value ?? '—')}</span><span className="admin-stat-label">{label}</span><ArrowUpRight className="admin-stat-arrow" size={15} /></button>)}</div><section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">ATTIVITÀ OPERATIVA</p><h2>Ultime sincronizzazioni</h2></div><button className="admin-text-button" onClick={() => onOpen('syncs')}>Vedi tutte <ArrowUpRight size={14} /></button></div>{syncs.length ? <div className="admin-table-wrap"><table><thead><tr><th>Aeroporto</th><th>Esito</th><th>Modifiche</th><th>Data</th></tr></thead><tbody>{syncs.map((row) => <tr key={String(row.id)}><td><strong>{String(row.airport_iata)}</strong></td><td><Status value={String(row.status)} /></td><td>{row.changes_detected ? 'Rilevate' : 'Nessuna'}</td><td>{dateLabel(row.executed_at)}</td></tr>)}</tbody></table></div> : <Empty text="Nessuna sincronizzazione registrata." />}</section></div>;
}

function Requests({ rows, total, onDetail, onRun, onAssignIata, onApprove, onCancel, busy }: { rows: Row[]; total: number; onDetail: (row: Row) => void; onRun: (row: Row) => void; onAssignIata: (row: Row) => void; onApprove: (id: string) => void; onCancel: (id: string) => void; busy: boolean }) {
  if (!rows.length) return <Empty text="Nessuna richiesta corrisponde ai filtri." />;
  return <section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">CODA AUTOMATICA</p><h2>{total} richieste</h2></div></div><div className="admin-table-wrap"><table><thead><tr><th>Ricerca</th><th>IATA</th><th>Stato</th><th>Revisione admin</th><th>Ricevuta</th><th>Programmata</th><th>Contatto</th><th>Azioni</th></tr></thead><tbody>{rows.map((row) => {
    const pending = ['queued', 'pending', 'queued_weekly'].includes(String(row.status));
    const displayIata = row.iata_code ? String(row.iata_code) : row.resolved_iata ? `${String(row.resolved_iata)} (auto)` : null;
    return <tr key={String(row.id)}>
      <td><button className="admin-row-link" onClick={() => onDetail(row)}>{String(row.query)}</button></td>
      <td>
        {displayIata ? (
          <button className="admin-text-button" title="Clicca per modificare IATA" onClick={() => onAssignIata(row)}><strong>{displayIata}</strong></button>
        ) : (
          <button className="admin-text-button" title="Assegna codice IATA" onClick={() => onAssignIata(row)}>+ Assegna IATA</button>
        )}
        {Boolean(row.existingAirportIata) && <span className="admin-cell-sub">Già presente nel catalogo</span>}
      </td>
      <td><Status value={String(row.status)} /></td>
      <td>{row.admin_reviewed_at ? <span className="admin-status green"><i />Approvata</span> : <span className="admin-private">Da valutare</span>}</td>
      <td>{dateLabel(row.created_at)}</td>
      <td>{dateLabel(row.scheduled_for)}</td>
      <td><span className="admin-private">{row.hasRequesterEmail ? 'Email presente' : '—'}</span></td>
      <td><div className="admin-actions">{pending && <><button className="admin-small-action" disabled={busy || Boolean(row.admin_reviewed_at)} onClick={() => onApprove(String(row.id))}>Approva</button><button className="admin-small-action" disabled={busy} onClick={() => onRun(row)}>{row.existingAirportIata ? 'Collega' : 'Avvia ora'}</button><button className="admin-small-icon danger" title="Annulla" disabled={busy} onClick={() => onCancel(String(row.id))}><X size={15} /></button></>}<button className="admin-small-icon" title="Dettagli" onClick={() => onDetail(row)}><ArrowUpRight size={15} /></button></div></td>
    </tr>;
  })}</tbody></table></div></section>;
}

function Moderation({ rows, kind, onDetail, onStatus, busy }: { rows: Row[]; kind: 'suggestions' | 'feedback'; onDetail: (row: Row) => void; onStatus: (id: string, status: string) => void; busy: boolean }) {
  if (!rows.length) return <Empty text="Nessun elemento corrisponde ai filtri." />;
  return <section className="admin-panel"><div className="admin-table-wrap"><table><thead><tr><th>{kind === 'suggestions' ? 'Aeroporto' : 'Oggetto'}</th><th>Categoria</th><th>Stato</th><th>Ricevuto</th><th>Contatto</th><th>Gestione</th></tr></thead><tbody>{rows.map((row) => <tr key={String(row.id)}><td><button className="admin-row-link" onClick={() => onDetail(row)}>{String(row.airport_iata || row.subject)}</button></td><td>{String(row.category || '—')}</td><td><Status value={String(row.status)} /></td><td>{dateLabel(row.created_at)}</td><td><span className="admin-private">Apri dettaglio</span></td><td><div className="admin-actions"><button className="admin-small-action" disabled={busy} onClick={() => onDetail(row)}>Dettaglio</button><select className="admin-inline-select" aria-label="Cambia stato" value={String(row.status)} disabled={busy} onChange={(event) => onStatus(String(row.id), event.target.value)}>{(kind === 'suggestions' ? ['pending_verification', 'verified', 'unconfirmed'] : ['new', 'reviewed', 'resolved']).map((status) => <option key={status} value={status}>{labelStatus[status]}</option>)}</select></div></td></tr>)}</tbody></table></div></section>;
}

function Airports({ rows, mode, onEdit, onEvaluate, busy }: { rows: (AirportRecord & { seoReasons?: string[] })[]; mode: 'airports' | 'seo'; onEdit: (airport: AirportRecord) => void; onEvaluate: (iata: string) => void; busy: boolean }) {
  if (!rows.length) return <Empty text="Nessun aeroporto corrisponde ai filtri." />;
  return <section className="admin-panel"><div className="admin-table-wrap"><table><thead><tr><th>Aeroporto</th><th>Città e paese</th><th>Stato SEO</th><th>Verifica fonte</th><th>Motivi/azioni</th></tr></thead><tbody>{rows.map((airport) => <tr key={airport.iata}><td><strong>{airport.iata}</strong><span className="admin-cell-sub">{airport.name_it}</span></td><td>{airport.city_it}, {airport.country_it}</td><td><Status value={String(airport.seoStatus || 'pending_quality')} /></td><td>{airport.securityPolicy.lastVerifiedDate || 'Non verificata'}</td><td><div className="admin-actions">{airport.seoReasons?.length ? <span className="admin-reason-count">{airport.seoReasons.length} requisiti</span> : <span className="admin-reason-count good">Qualità OK</span>}<button className="admin-small-action" disabled={busy} onClick={() => onEvaluate(airport.iata)}>Rivaluta SEO</button>{mode === 'airports' && <button className="admin-small-action" onClick={() => onEdit(airport)}>Modifica</button>}</div></td></tr>)}</tbody></table></div></section>;
}

function AirportEditor({ airport, busy, onClose, onSave }: { airport: AirportRecord; busy: boolean; onClose: () => void; onSave: (airport: AirportRecord) => void }) {
  const [draft, setDraft] = useState<AirportRecord>(airport);
  const [jsonErrors, setJsonErrors] = useState<Record<string, string>>({});
  const setText = (key: keyof AirportRecord, value: string) => setDraft((current) => ({ ...current, [key]: value }));
  const setNumber = (key: keyof AirportRecord, value: string) => setDraft((current) => ({ ...current, [key]: Number(value) }));
  const setSecurityText = (key: keyof AirportRecord['securityPolicy'], value: string) => setDraft((current) => ({ ...current, securityPolicy: { ...current.securityPolicy, [key]: value } }));
  const setSecurityNumber = (key: 'maxPowerbankWh', value: string) => setDraft((current) => ({ ...current, securityPolicy: { ...current.securityPolicy, [key]: Number(value) } }));
  const setSecurityBool = (key: keyof AirportRecord['securityPolicy'], value: boolean) => setDraft((current) => ({ ...current, securityPolicy: { ...current.securityPolicy, [key]: value } }));
  const setCoordinate = (key: 'lat' | 'lng', value: string) => setDraft((current) => ({ ...current, coordinates: { ...current.coordinates, [key]: Number(value) } }));
  const collections = [
    ['Terminals', 'terminals'], ['Compagnie aeree', 'airlines'], ['Servizi', 'amenities'], ['Negozi e ristorazione', 'venues'], ['Trasporti', 'transports'],
  ] as const;
  const setCollection = (key: typeof collections[number][1], text: string) => {
    try {
      const value = JSON.parse(text);
      if (!Array.isArray(value)) throw new Error('Inserisci un array JSON.');
      const persistedKeys: Record<typeof key, string[]> = {
        terminals: ['name', 'transferInfo_it', 'transferInfo_en', 'isUnverified'],
        airlines: ['airlineName', 'iataCode', 'terminal', 'checkInZone', 'isUnverified'],
        amenities: ['category', 'title_it', 'title_en', 'terminal', 'location_it', 'location_en', 'details_it', 'details_en', 'details_it_unverified', 'details_en_unverified', 'isUnverified'],
        venues: ['name', 'category', 'terminal', 'location', 'hours', 'is24Hours', 'isUnverified'],
        transports: ['type', 'name_it', 'name_en', 'duration', 'frequency', 'estimatedCost', 'pickupLocation_it', 'pickupLocation_en', 'details_it', 'details_en', 'isUnverified'],
      };
      const oldItems = draft[key] as unknown as Record<string, unknown>[];
      const normalized = value.map((entry: unknown, index: number) => {
        if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw new Error('Ogni elemento deve essere un oggetto.');
        const item = entry as Record<string, unknown>;
        const oldItem = typeof item.id === 'string' ? oldItems.find((old) => old.id === item.id) : undefined;
        const merged = { ...(oldItem || oldItems[index] || {}) };
        for (const field of persistedKeys[key]) if (Object.prototype.hasOwnProperty.call(item, field)) merged[field] = item[field];
        return merged;
      });
      setDraft((current) => ({ ...current, [key]: normalized }));
      setJsonErrors((current) => ({ ...current, [key]: '' }));
    } catch (error) {
      setJsonErrors((current) => ({ ...current, [key]: error instanceof Error ? error.message : 'JSON non valido.' }));
    }
  };

  return <div className="admin-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="admin-editor admin-airport-editor"><header><div><p className="admin-eyebrow">SCHEDA CATALOGO · {draft.iata}</p><h2>Modifica aeroporto</h2></div><button className="admin-icon-button" onClick={onClose}><X size={17} /></button></header><p className="admin-editor-hint">Le modifiche si salvano nel catalogo Supabase e vengono protette dai successivi seed statici. La data di verifica automatica non si aggiorna con una modifica manuale.</p>
    <div className="admin-editor-sections">
      <details open><summary>Anagrafica e sito ufficiale</summary><div className="admin-form-grid"><Pair label="Nome aeroporto" itValue={draft.name_it} enValue={draft.name_en} onIt={(value) => setText('name_it', value)} onEn={(value) => setText('name_en', value)} /><Pair label="Città" itValue={draft.city_it} enValue={draft.city_en} onIt={(value) => setText('city_it', value)} onEn={(value) => setText('city_en', value)} /><Pair label="Paese" itValue={draft.country_it} enValue={draft.country_en} onIt={(value) => setText('country_it', value)} onEn={(value) => setText('country_en', value)} /><Field label="Codice paese" value={draft.countryCode} onChange={(value) => setText('countryCode', value.toUpperCase())} /><Field label="Codice ICAO" value={draft.icao} onChange={(value) => setText('icao', value.toUpperCase())} /><Field label="Sito ufficiale HTTPS" value={draft.officialWebsite} onChange={(value) => setText('officialWebsite', value)} /></div><div className="admin-form-grid coordinates"><Field label="Latitudine" type="number" value={String(draft.coordinates.lat)} onChange={(value) => setCoordinate('lat', value)} /><Field label="Longitudine" type="number" value={String(draft.coordinates.lng)} onChange={(value) => setCoordinate('lng', value)} /></div></details>
      <details><summary>Consigli e tempi</summary><div className="admin-form-grid"><Pair label="Consiglio di navigazione" itValue={draft.navigationAdvice_it} enValue={draft.navigationAdvice_en} onIt={(value) => setText('navigationAdvice_it', value)} onEn={(value) => setText('navigationAdvice_en', value)} /><Pair label="Etichetta difficoltà" itValue={draft.difficultyLabel_it} enValue={draft.difficultyLabel_en} onIt={(value) => setText('difficultyLabel_it', value)} onEn={(value) => setText('difficultyLabel_en', value)} /><Field label="Difficoltà (1–5)" type="number" value={String(draft.difficultyRating)} onChange={(value) => setNumber('difficultyRating', value)} /><Field label="Attesa sicurezza (minuti)" type="number" value={String(draft.averageSecurityWaitMin)} onChange={(value) => setNumber('averageSecurityWaitMin', value)} /><Field label="Arrivo: voli nazionali (ore)" type="number" value={String(draft.recommendedArrivalHours.domestic)} onChange={(value) => setDraft((current) => ({ ...current, recommendedArrivalHours: { ...current.recommendedArrivalHours, domestic: Number(value) } }))} /><Field label="Arrivo: voli internazionali (ore)" type="number" value={String(draft.recommendedArrivalHours.international)} onChange={(value) => setDraft((current) => ({ ...current, recommendedArrivalHours: { ...current.recommendedArrivalHours, international: Number(value) } }))} /></div></details>
      <details><summary>Regole di sicurezza e fonte</summary><div className="admin-form-grid"><Field label="Fonte ufficiale HTTPS" value={draft.securityPolicy.officialSourceUrl} onChange={(value) => setSecurityText('officialSourceUrl', value)} /><Field label="Data verifica automatica (sola lettura)" value={draft.securityPolicy.lastVerifiedDate} disabled onChange={() => undefined} /><Pair label="Regole liquidi" itValue={draft.securityPolicy.liquidsAllowance_it} enValue={draft.securityPolicy.liquidsAllowance_en} onIt={(value) => setSecurityText('liquidsAllowance_it', value)} onEn={(value) => setSecurityText('liquidsAllowance_en', value)} /><Pair label="Nota scanner 3D" itValue={draft.securityPolicy.scannersNote_it || ''} enValue={draft.securityPolicy.scannersNote_en || ''} onIt={(value) => setSecurityText('scannersNote_it', value)} onEn={(value) => setSecurityText('scannersNote_en', value)} /><Pair label="Nota liquidi" itValue={draft.securityPolicy.liquidsNote_it || ''} enValue={draft.securityPolicy.liquidsNote_en || ''} onIt={(value) => setSecurityText('liquidsNote_it', value)} onEn={(value) => setSecurityText('liquidsNote_en', value)} /><Pair label="Nota dispositivi elettronici" itValue={draft.securityPolicy.electronicsNote_it || ''} enValue={draft.securityPolicy.electronicsNote_en || ''} onIt={(value) => setSecurityText('electronicsNote_it', value)} onEn={(value) => setSecurityText('electronicsNote_en', value)} /><Pair label="Politica droni" itValue={draft.securityPolicy.dronePolicy_it || ''} enValue={draft.securityPolicy.dronePolicy_en || ''} onIt={(value) => setSecurityText('dronePolicy_it', value)} onEn={(value) => setSecurityText('dronePolicy_en', value)} /><Pair label="Powerbank" itValue={draft.securityPolicy.powerbankPolicy_it || ''} enValue={draft.securityPolicy.powerbankPolicy_en || ''} onIt={(value) => setSecurityText('powerbankPolicy_it', value)} onEn={(value) => setSecurityText('powerbankPolicy_en', value)} /><Field label="Limite powerbank (Wh)" type="number" value={String(draft.securityPolicy.maxPowerbankWh)} onChange={(value) => setSecurityNumber('maxPowerbankWh', value)} /></div><div className="admin-checkbox-grid"><CheckField label="Scanner 3D presenti" value={draft.securityPolicy.has3DScanners} onChange={(value) => setSecurityBool('has3DScanners', value)} /><CheckField label="Liquidi da estrarre" value={draft.securityPolicy.liquidsMustBeRemoved} onChange={(value) => setSecurityBool('liquidsMustBeRemoved', value)} /><CheckField label="Dispositivi elettronici in borsa" value={draft.securityPolicy.electronicsInBag} onChange={(value) => setSecurityBool('electronicsInBag', value)} /><CheckField label="Drone ammesso in cabina" value={draft.securityPolicy.droneAllowedInCabin} onChange={(value) => setSecurityBool('droneAllowedInCabin', value)} /><CheckField label="Drone ammesso in stiva" value={draft.securityPolicy.droneAllowedInHold} onChange={(value) => setSecurityBool('droneAllowedInHold', value)} /><CheckField label="Regola liquidi non verificata" value={Boolean(draft.securityPolicy.liquidsUnverified)} onChange={(value) => setSecurityBool('liquidsUnverified', value)} /><CheckField label="Regola elettronica non verificata" value={Boolean(draft.securityPolicy.electronicsUnverified)} onChange={(value) => setSecurityBool('electronicsUnverified', value)} /><CheckField label="Regola droni non verificata" value={Boolean(draft.securityPolicy.droneUnverified)} onChange={(value) => setSecurityBool('droneUnverified', value)} /></div></details>
      {collections.map(([label, key]) => <details key={key}><summary>{label} <span>{draft[key].length} elementi</span></summary><div className="admin-collection-editor"><p>Elenco in formato JSON. Sono applicati i campi salvati dal catalogo; i campi non persistiti restano invariati. Mantieni i marcatori “isUnverified”.</p><textarea spellCheck={false} defaultValue={JSON.stringify(draft[key], null, 2)} onChange={(event) => setCollection(key, event.target.value)} /><small>{jsonErrors[key] || 'Gli elementi vengono salvati insieme alla scheda.'}</small></div></details>)}
    </div><footer><button className="admin-secondary" onClick={onClose}>Annulla</button><button className="admin-primary" disabled={busy || Object.values(jsonErrors).some(Boolean)} onClick={() => onSave(draft)}>{busy ? 'Salvataggio…' : 'Salva scheda'}</button></footer></section></div>;
}

function Field({ label, value, onChange, type = 'text', disabled = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; disabled?: boolean }) {
  return <label className="admin-field"><span>{label}</span><input type={type} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} /></label>;
}

function Pair({ label, itValue, enValue, onIt, onEn }: { label: string; itValue: string; enValue: string; onIt: (value: string) => void; onEn: (value: string) => void }) {
  return <div className="admin-pair"><span>{label}</span><div><label>Italiano<input value={itValue} onChange={(event) => onIt(event.target.value)} /></label><label>English<input value={enValue} onChange={(event) => onEn(event.target.value)} /></label></div></div>;
}

function CheckField({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return <label className="admin-check"><input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} /><span>{label}</span></label>;
}

function Syncs({ rows, iata, setIata, onRun, onDetail, busy }: { rows: Row[]; iata: string; setIata: (value: string) => void; onRun: () => void; onDetail: (row: Row) => void; busy: boolean }) {
  return <div className="admin-stack"><section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">ESECUZIONE MIRATA</p><h2>Sincronizza un aeroporto</h2><p className="admin-muted">Legge le fonti ufficiali e registra l’esito. L’operazione non avvia il cron completo.</p></div></div><div className="admin-run-form"><label>Codice IATA<input maxLength={3} value={iata} onChange={(event) => setIata(event.target.value.toUpperCase())} placeholder="es. FCO" /></label><button className="admin-primary" disabled={busy || !/^[A-Z0-9]{3}$/.test(iata)} onClick={onRun}>{busy ? 'Sincronizzazione…' : <><RefreshCw size={15} /> Avvia sincronizzazione</>}</button></div></section><section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">STORICO</p><h2>Ultime sincronizzazioni</h2></div></div>{rows.length ? <div className="admin-table-wrap"><table><thead><tr><th>IATA</th><th>Esito</th><th>Variazioni</th><th>Data</th><th></th></tr></thead><tbody>{rows.map((row) => <tr key={String(row.id)}><td><strong>{String(row.airport_iata)}</strong></td><td><Status value={String(row.status)} /></td><td>{row.changes_detected ? 'Rilevate' : 'Nessuna'}</td><td>{dateLabel(row.executed_at)}</td><td><button className="admin-text-button" onClick={() => onDetail(row)}>Dettagli</button></td></tr>)}</tbody></table></div> : <Empty text="Nessuna sincronizzazione registrata." />}</section></div>;
}

function Audit({ rows }: { rows: Row[] }) {
  if (!rows.length) return <Empty text="Il registro attività è vuoto." />;
  return <section className="admin-panel"><div className="admin-table-wrap"><table><thead><tr><th>Data</th><th>Amministratore</th><th>Azione</th><th>Oggetto</th><th>Esito</th><th>Dettagli</th></tr></thead><tbody>{rows.map((row) => <tr key={String(row.id)}><td>{dateLabel(row.created_at)}</td><td>{String(row.actor_email)}</td><td>{String(row.action)}</td><td>{String(row.entity_type)} {String(row.entity_id || '')}</td><td><Status value={String(row.outcome)} /></td><td><code>{JSON.stringify(row.details || {})}</code></td></tr>)}</tbody></table></div></section>;
}

function Pagination({ page, pageSize, count, onPage }: { page: number; pageSize: number; count: number; onPage: (page: number) => void }) {
  const pages = Math.max(1, Math.ceil(count / pageSize));
  return <div className="admin-pagination"><span>{count ? `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, count)} di ${count}` : '0 elementi'}</span><div><button className="admin-secondary" disabled={page <= 1} onClick={() => onPage(page - 1)}>Precedente</button><span>Pagina {page} di {pages}</span><button className="admin-secondary" disabled={page >= pages} onClick={() => onPage(page + 1)}>Successiva</button></div></div>;
}

function Status({ value }: { value: string }) { return <span className={`admin-status ${['published', 'verified', 'indexable', 'SUCCESS', 'success'].includes(value) ? 'green' : ['blocked', 'cancelled', 'unconfirmed', 'FAILED'].includes(value) ? 'red' : 'amber'}`}><i />{labelStatus[value] || value}</span>; }
function Empty({ text }: { text: string }) { return <section className="admin-empty"><span><FileText size={20} /></span><p>{text}</p></section>; }
