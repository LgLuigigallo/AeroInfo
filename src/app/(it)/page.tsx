import { connection } from 'next/server';
import { permanentRedirect } from 'next/navigation';
import HomeClient from './HomeClient';
import { getAirportByIata } from '@/lib/seo/airports';
import { airportPath } from '@/lib/airport-slug';
import { IndexableAirportLinks } from '@/components/IndexableAirportLinks';

type HomeProps = { searchParams: Promise<{ airport?: string | string[] }> };

export default async function HomePage({ searchParams }: HomeProps) {
  const { airport } = await searchParams;
  if (typeof airport === 'string' && airport.trim()) {
    await connection();
    const record = await getAirportByIata(airport.trim());
    if (record) permanentRedirect(airportPath(record, 'it'));
  }
  return <><HomeClient /><IndexableAirportLinks /></>;
}
