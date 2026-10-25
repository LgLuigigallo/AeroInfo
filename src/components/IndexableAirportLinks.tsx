import Link from 'next/link';
import { airportPath } from '@/lib/airport-slug';
import { getIndexableAirports } from '@/lib/seo/airports';

export async function IndexableAirportLinks() {
  const airports = await getIndexableAirports();
  return (
    <nav aria-label="Schede aeroporto" className="mx-auto max-w-5xl px-4 sm:px-6 pb-12">
      <h2 className="text-lg font-semibold">Schede aeroporto</h2>
      {airports.length ? (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {airports.map((airport) => <li key={airport.iata}><Link className="text-sm text-blue-700 underline underline-offset-4 dark:text-blue-300" href={airportPath(airport, 'it')}>{airport.name_it} ({airport.iata})</Link></li>)}
        </ul>
      ) : <p className="mt-2 text-sm text-zinc-600">Le schede aeroporto vengono pubblicate dopo la verifica delle fonti e dei dati.</p>}
    </nav>
  );
}
