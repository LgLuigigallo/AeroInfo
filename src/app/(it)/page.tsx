import { connection } from 'next/server';
import { permanentRedirect } from 'next/navigation';
import HomeClient from './HomeClient';
import { getAirportByIata } from '@/lib/seo/airports';
import { airportPath } from '@/lib/airport-slug';
import { IndexableAirportLinks } from '@/components/IndexableAirportLinks';

type HomeProps = { searchParams: Promise<{ airport?: string | string[] }> };

export default async function HomePage({ searchParams }: HomeProps) {
  // The legacy query redirect must be resolved before streaming so it can
  // return a real permanent HTTP redirect instead of a client-side meta tag.
  await connection();
  const { airport } = await searchParams;
  if (typeof airport === 'string' && airport.trim()) {
    const record = await getAirportByIata(airport.trim());
    if (record) permanentRedirect(airportPath(record, 'it'));
  }
  return <><HomeClient /><IndexableAirportLinks /></>;
}
