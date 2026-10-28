export const INDEXNOW_KEY = 'a7f92026ae70info4892c90e1f3a8b21';
export const INDEXNOW_HOST = 'www.aero-info.eu';
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

export interface IndexNowResponse {
  success: boolean;
  statusCode: number;
  message: string;
  submittedCount: number;
}

/**
 * Submit a list of changed or new URLs directly to the IndexNow protocol.
 * Supported by Microsoft Bing, Copilot, Seznam, Yandex and other search engines.
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

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    // 200: OK
    // 202: Accepted (IndexNow received the URL submission successfully)
    const success = res.status === 200 || res.status === 202;
    const text = await res.text().catch(() => '');

    return {
      success,
      statusCode: res.status,
      message: success 
        ? `Successfully submitted ${cleanUrls.length} URLs to IndexNow.` 
        : `IndexNow returned status ${res.status}: ${text || 'Submission rejected'}`,
      submittedCount: cleanUrls.length,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      statusCode: 500,
      message: `Failed to connect to IndexNow API: ${message}`,
      submittedCount: cleanUrls.length,
    };
  }
}
