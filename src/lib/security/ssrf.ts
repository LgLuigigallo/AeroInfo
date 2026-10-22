/**
 * SSRF (Server-Side Request Forgery) and URL Validation Utilities
 */

const BLOCKED_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '169.254.169.254', // AWS/GCP/Azure link-local metadata service
  'metadata.google.internal',
  'instance-data',
  '::1',
  '[::1]'
]);

/**
 * Checks if a hostname or IP address is within private, loopback, or metadata ranges.
 */
export function isPrivateOrReservedHost(hostname: string): boolean {
  const clean = hostname.toLowerCase().trim().replace(/^\[|\]$/g, '');

  if (BLOCKED_HOSTS.has(clean)) return true;
  if (clean.endsWith('.localhost') || clean.endsWith('.local') || clean.endsWith('.internal')) {
    return true;
  }

  // IPv4 Private & Loopback Checks
  const ipv4Match = clean.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const [_, o1, o2] = ipv4Match.map(Number);
    if (o1 === 10) return true; // 10.0.0.0/8
    if (o1 === 127) return true; // 127.0.0.0/8
    if (o1 === 169 && o2 === 254) return true; // 169.254.0.0/16
    if (o1 === 172 && o2 >= 16 && o2 <= 31) return true; // 172.16.0.0/12
    if (o1 === 192 && o2 === 168) return true; // 192.168.0.0/16
    if (o1 === 0) return true; // 0.0.0.0/8
  }

  return false;
}

/**
 * Validates that a target URL is strictly HTTPS and targets a public, safe domain.
 */
export function isSafeOutboundUrl(urlString: string): boolean {
  if (!urlString || typeof urlString !== 'string') return false;

  try {
    const parsed = new URL(urlString);

    // Strictly enforce HTTPS
    if (parsed.protocol !== 'https:') {
      return false;
    }

    // Reject usernames or passwords in URLs (e.g. https://user:pass@evil.com)
    if (parsed.username || parsed.password) {
      return false;
    }

    // Verify host is not loopback, private, or metadata endpoint
    if (isPrivateOrReservedHost(parsed.hostname)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
