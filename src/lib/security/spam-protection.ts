import crypto from "crypto";
import { getServerEnv } from "@/lib/env";

/**
 * Checks whether an automated bot populated the hidden honeypot field.
 */
export function isHoneypotTriggered(data: Record<string, unknown>): boolean {
  const hpValue = data._orb_hp;
  if (typeof hpValue === "string" && hpValue.trim().length > 0) {
    return true;
  }
  return false;
}

/**
 * Generates an irreversible SHA-256 hash of an IP address for rate limiting
 * and security metrics without storing raw visitor PII.
 */
export function hashClientIp(ip: string): string {
  const salt = process.env.SUPABASE_SECRET_KEY || "orbion_default_ip_salt";
  return crypto.createHmac("sha256", salt).update(ip).digest("hex").slice(0, 32);
}

/**
 * Generates a human-friendly unique reference code.
 * Example: ORB-CNT-2601-A4B7 or ORB-DEM-2601-9F2C
 */
export function generateReference(prefix: "CNT" | "DEM" | "SUB" = "CNT"): string {
  const now = new Date();
  const year = String(now.getUTCFullYear()).slice(2);
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const randomChars = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `ORB-${prefix}-${year}${month}-${randomChars}`;
}

/**
 * Validates Cloudflare Turnstile bot verification token if configured.
 * If keys are NOT configured in the environment, returns valid (fails open safely).
 */
export async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp?: string
): Promise<{ success: boolean; error?: string }> {
  let secretKey: string | undefined;

  try {
    const env = getServerEnv();
    secretKey = env.turnstileSecretKey;
  } catch {
    // If server env not yet loaded, treat as not configured
    secretKey = process.env.TURNSTILE_SECRET_KEY;
  }

  // If Turnstile is not configured, do not block genuine visitors
  if (!secretKey || secretKey.trim().length === 0) {
    return { success: true };
  }

  if (!token) {
    return { success: false, error: "Bot verification token missing." };
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: remoteIp,
      }),
    });

    const outcome = await response.json();
    if (outcome.success) {
      return { success: true };
    }

    return { success: false, error: "Bot verification failed. Please try again." };
  } catch (err) {
    console.warn("[Orbion Security] Turnstile verification network error:", err);
    // On Cloudflare API outage, allow the request rather than blocking legitimate visitors
    return { success: true };
  }
}

