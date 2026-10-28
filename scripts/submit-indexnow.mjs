#!/usr/bin/env node

/**
 * Direct IndexNow submission script for AeroInfo.
 * Submits all public indexable URLs to Microsoft Bing, Copilot, Seznam, and Yandex.
 */

const INDEXNOW_KEY = 'a7f92026ae70info4892c90e1f3a8b21';
const INDEXNOW_HOST = 'www.aero-info.eu';
const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

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

  console.log(`Submitting to ${INDEXNOW_ENDPOINT}...`);
  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    console.log(`Response HTTP Status: ${res.status} (${res.statusText})`);
    if (res.status === 200 || res.status === 202) {
      console.log('🎉 IndexNow submission accepted successfully!');
    } else {
      const text = await res.text();
      console.error(`⚠️ IndexNow warning/error: ${text}`);
    }
  } catch (err) {
    console.error('❌ Network error submitting to IndexNow:', err.message);
  }
}

run();
