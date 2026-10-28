export const INDEXNOW_KEY = 'a7f92026ae70info4892c90e1f3a8b21';
export const INDEXNOW_HOST = 'www.aero-info.eu';
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
export const INDEXNOW_FALLBACK_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://yandex.com/indexnow',
  'https://www.bing.com/indexnow',
];

export interface IndexNowResponse {
  success: boolean;
  statusCode: number;
  message: string;
  submittedCount: number;
  endpointUsed?: string;
}

/**
 * Submit a list of changed or new URLs directly to the IndexNow protocol.
 * Supported by Microsoft Bing, Copilot, Seznam, Yandex and other search engines.
 * Utilizes multi-endpoint failover across the IndexNow network for maximum resilience.
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResponse> {
  if (!urls || urls.length === 0) {
    return {
      success: false,
      statusCode: 400,
      message: 'No URLs provided for IndexNow submission.',
      submittedCount: 0,
    };
  }

  // Deduplicate and filter URLs for current host
  const cleanUrls = Array.from(
    new Set(
      urls.map((u) => u.trim()).filter((u) => u.startsWith(`https://${INDEXNOW_HOST}`) || u.startsWith('https://aero-info.eu'))
    )
  );

  if (cleanUrls.length === 0) {
    return {
      success: false,
      statusCode: 400,
      message: 'No matching URLs for aero-info.eu domain.',
      submittedCount: 0,
    };
  }

  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: cleanUrls,
  };

  let lastStatus = 500;
  let lastMessage = '';

  for (const endpoint of INDEXNOW_FALLBACK_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      // 200: OK, 202: Accepted (IndexNow received the URL submission successfully)
      if (res.status === 200 || res.status === 202) {
        return {
          success: true,
          statusCode: res.status,
          message: `Successfully submitted ${cleanUrls.length} URLs to IndexNow via ${new URL(endpoint).hostname}.`,
          submittedCount: cleanUrls.length,
          endpointUsed: endpoint,
        };
      }

      lastStatus = res.status;
      const text = await res.text().catch(() => '');
      lastMessage = `${new URL(endpoint).hostname} returned ${res.status}: ${text || 'Rejected'}`;
    } catch (err) {
      lastStatus = 500;
      lastMessage = `${new URL(endpoint).hostname} connection error: ${err instanceof Error ? err.message : String(err)}`;
    }
  }

  return {
    success: false,
    statusCode: lastStatus,
    message: lastMessage || 'All IndexNow endpoints rejected the submission.',
    submittedCount: cleanUrls.length,
  };
}
