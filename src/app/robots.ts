import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

  return {
    rules: isProd
      ? [
          { userAgent: '*', allow: '/', disallow: ['/api/'] },
          { userAgent: 'Googlebot', allow: '/', disallow: ['/api/'] },
          { userAgent: 'Bingbot', allow: '/', disallow: ['/api/'] },
          { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/api/'] },
          { userAgent: 'GPTBot', allow: '/', disallow: ['/api/'] },
          { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/api/'] },
          { userAgent: 'PerplexityBot', allow: '/', disallow: ['/api/'] },
          { userAgent: 'Google-Extended', allow: '/', disallow: ['/api/'] },
          { userAgent: 'ClaudeBot', allow: '/', disallow: ['/api/'] },
          { userAgent: 'Applebot-Extended', allow: '/', disallow: ['/api/'] },
        ]
      : { userAgent: '*', allow: [], disallow: '/' },
    sitemap: 'https://www.aero-info.eu/sitemap.xml',
  };
}
