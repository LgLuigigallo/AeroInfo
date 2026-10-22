import { NextRequest } from 'next/server';

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory sliding window store (scoped to the runtime instance)
const ipStore = new Map<string, RateLimitRecord>();

// Clean up stale IP records every 15 minutes to avoid memory leaks
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipStore.entries()) {
    record.timestamps = record.timestamps.filter((t) => now - t < 3600000);
    if (record.timestamps.length === 0) {
      ipStore.delete(ip);
    }
  }
}, 900000);

if (typeof cleanupTimer.unref === 'function') {
  cleanupTimer.unref();
}

/**
 * Extracts client IP from headers in Vercel / Next.js.
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}

/**
 * Sliding window rate limiter.
 * @param ip Client IP
 * @param limit Maximum number of requests allowed within window
 * @param windowMs Time window in milliseconds (default: 10 minutes = 600,000ms)
 * @returns { allowed: boolean; remaining: number; resetMs: number }
 */
export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 600000
): { allowed: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  const record = ipStore.get(ip) || { timestamps: [] };

  // Filter out timestamps outside the sliding window
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= limit) {
    const oldest = record.timestamps[0];
    const resetMs = Math.max(0, windowMs - (now - oldest));
    return {
      allowed: false,
      remaining: 0,
      resetMs
    };
  }

  // Record current request
  record.timestamps.push(now);
  ipStore.set(ip, record);

  return {
    allowed: true,
    remaining: limit - record.timestamps.length,
    resetMs: windowMs
  };
}
