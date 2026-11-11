import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { processPendingOutbox } from "@/lib/email/outbox";
import { getServerEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

/**
 * Constant-time comparison using sha256 digests to prevent timing attacks.
 */
function timingSafeEqualStrings(a: string, b: string): boolean {
  if (!a || !b) return false;
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Protected background worker endpoint to process queued email outbox dispatches.
 * Can be invoked by external cron schedulers (e.g. Vercel Cron, GitHub Actions, or Supabase pg_cron).
 * 
 * Security Requirements:
 * 1. Requires EMAIL_JOB_SECRET (or CRON_SECRET) in server environment.
 * 2. If secret is missing or blank, returns HTTP 500 (Fail-Closed).
 * 3. Requires valid Bearer token or ?secret= parameter.
 * 4. Compares tokens using constant-time evaluation.
 * 5. If authorization fails or is missing, returns HTTP 401.
 * 6. Never reveals expected secret values in error messages or logs.
 */
export async function POST(request: Request) {
  let expectedSecret: string | undefined;

  try {
    const env = getServerEnv();
    expectedSecret = env.emailJobSecret;
  } catch {
    expectedSecret = process.env.EMAIL_JOB_SECRET || process.env.CRON_SECRET;
  }

  // Fallback to process.env if env.emailJobSecret was unset
  if (!expectedSecret) {
    expectedSecret = process.env.EMAIL_JOB_SECRET || process.env.CRON_SECRET;
  }

  // Requirement: If secret is missing or blank, fail closed with HTTP 500
  if (!expectedSecret || expectedSecret.trim().length === 0) {
    console.error("[Orbion Security Alert] EMAIL_JOB_SECRET is missing or unconfigured in server environment.");
    return NextResponse.json(
      {
        success: false,
        message: "Server configuration error: Worker authorization secret is not configured.",
      },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  const { searchParams } = new URL(request.url);
  const querySecret = searchParams.get("secret");

  const providedToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : querySecret?.trim();

  // Requirement: If token is missing or invalid, return HTTP 401 (constant-time verification)
  if (!providedToken || !timingSafeEqualStrings(providedToken, expectedSecret.trim())) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized: Invalid or missing worker credentials.",
      },
      { status: 401 }
    );
  }

  // Legitimate authorized execution
  try {
    const result = await processPendingOutbox(25);
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (err) {
    console.error("[Orbion Email Job Error] Outbox batch processing failure:", err);
    return NextResponse.json(
      { success: false, message: "Outbox processing failed." },
      { status: 500 }
    );
  }
}


