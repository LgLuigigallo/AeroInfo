import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

  return {
    rules: {
      userAgent: '*',
      allow: isProd ? '/' : [],
      disallow: isProd ? ['/api/'] : '/',
    },
    sitemap: 'https://aero-info.vercel.app/sitemap.xml',
  };
}
