#!/usr/bin/env node

/**
 * Direct IndexNow submission script for AeroInfo.
 * Submits all public indexable URLs to Microsoft Bing, Copilot, Seznam, and Yandex.
 * Includes multi-endpoint fallback across the IndexNow network.
 */

const INDEXNOW_KEY = 'a7f92026ae70info4892c90e1f3a8b21';
const INDEXNOW_HOST = 'www.aero-info.eu';
const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://yandex.com/indexnow',
  'https://www.bing.com/indexnow'
];

async function fetchSitemapUrls() {
  try {
    const res = await fetch(`https://${INDEXNOW_HOST}/sitemap.xml`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    return matches;
  } catch (err) {
    console.warn(`Could not fetch live sitemap (${err.message}). Using fallback list.`);
    return [
      `https://${INDEXNOW_HOST}/`,
      `https://${INDEXNOW_HOST}/en`,
      `https://${INDEXNOW_HOST}/guide/liquidi-bagaglio-a-mano`,
      `https://${INDEXNOW_HOST}/en/guides/liquids-in-carry-on-baggage`
    ];
  }
}

async function run() {
  console.log('📡 Fetching sitemap URLs for IndexNow submission...');
  const urls = await fetchSitemapUrls();
  console.log(`Found ${urls.length} URLs to submit.`);

  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: urls,
  };

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    const hostName = new URL(endpoint).hostname;
    console.log(`Submitting to ${endpoint}...`);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      console.log(`Response HTTP Status from ${hostName}: ${res.status} (${res.statusText})`);

      if (res.status === 200 || res.status === 202) {
        console.log(`🎉 SUCCESS: ${urls.length} URLs accepted by IndexNow via ${hostName}!`);
        return;
      } else {
        const text = await res.text().catch(() => '');
        console.warn(`⚠️ Endpoint ${hostName} responded with: ${text}`);
      }
    } catch (err) {
      console.warn(`⚠️ Network issue with ${hostName}: ${err.message}`);
    }
  }

  console.error('❌ All IndexNow endpoints failed.');
  process.exit(1);
}

run();
