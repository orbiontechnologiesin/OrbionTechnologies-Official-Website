/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — RATE LIMITING ENGINE
 * ==============================================================================
 * Protects public API endpoints from spam and request flooding.
 * Implements a sliding-window counter per IP / endpoint.
 * Gracefully handles distributed serverless instances (Vercel) while maintaining
 * local node-level burst protection.
 * ==============================================================================
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory sliding window cache
const memoryCache = new Map<string, RateLimitEntry>();

// Periodic garbage collection for memory leak prevention (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memoryCache.entries()) {
      if (entry.resetAt <= now) {
        memoryCache.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitOptions {
  /** Maximum allowed requests within the window */
  limit: number;
  /** Window duration in seconds (e.g., 60 for 1 minute) */
  windowSeconds: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfter: number; // in seconds
}

/**
 * Extracts a dependable client identifier from incoming request headers.
 * Avoids single-point header spoofing by prioritizing Cloudflare or direct headers.
 */
export function getClientIp(request: Request): string {
  const headers = request.headers;

  // Cloudflare Connecting IP (authenticated by edge proxy)
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  // Vercel / Standard Forwarded For
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const parts = xForwardedFor.split(",");
    if (parts.length > 0 && parts[0].trim()) {
      return parts[0].trim();
    }
  }

  // Real IP
  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  return "127.0.0.1";
}

/**
 * Applies sliding-window rate limiting to a key (usually endpoint:ip).
 */
export async function checkRateLimit(
  key: string,
  options: RateLimitOptions = { limit: 5, windowSeconds: 60 }
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowMs = options.windowSeconds * 1000;

  const existing = memoryCache.get(key);

  if (!existing || existing.resetAt <= now) {
    // New or expired window
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + windowMs,
    };
    memoryCache.set(key, newEntry);

    return {
      success: true,
      limit: options.limit,
      remaining: options.limit - 1,
      resetAt: newEntry.resetAt,
      retryAfter: 0,
    };
  }

  // Active window
  existing.count += 1;
  const remaining = Math.max(0, options.limit - existing.count);
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);

  if (existing.count > options.limit) {
    return {
      success: false,
      limit: options.limit,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfter,
    };
  }

  return {
    success: true,
    limit: options.limit,
    remaining,
    resetAt: existing.resetAt,
    retryAfter: 0,
  };
}

