import Link from 'next/link';

export default function EnglishNotFound() {
  return <main className="mx-auto max-w-xl px-6 py-24 text-center"><p className="text-sm text-zinc-500">404</p><h1 className="mt-3 text-3xl font-bold">Airport page not found</h1><p className="mt-3 text-zinc-600">The airport guide may have moved or its address may be incorrect.</p><Link className="mt-6 inline-block underline" href="/">Browse airports</Link></main>;
}
