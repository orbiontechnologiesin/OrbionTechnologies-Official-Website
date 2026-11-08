import { NextResponse } from "next/server";
import { processPendingOutbox } from "@/lib/email/outbox";
import { getServerEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

/**
 * Protected background worker endpoint to process queued email outbox dispatches.
 * Can be invoked by external cron schedulers (e.g. Vercel Cron, GitHub Actions, or Supabase pg_cron).
 * 
 * Authentication:
 * Authorization: Bearer <EMAIL_JOB_SECRET>
 * Or: ?secret=<EMAIL_JOB_SECRET>
 */
export async function POST(request: Request) {
  let expectedSecret: string | undefined;

  try {
    const env = getServerEnv();
    expectedSecret = env.emailJobSecret;
  } catch {
    expectedSecret = process.env.EMAIL_JOB_SECRET;
  }

  // If EMAIL_JOB_SECRET is configured, enforce strict authorization
  if (expectedSecret && expectedSecret.trim().length > 0) {
    const authHeader = request.headers.get("authorization");
    const { searchParams } = new URL(request.url);
    const querySecret = searchParams.get("secret");

    const providedToken = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : querySecret;

    if (!providedToken || providedToken !== expectedSecret) {
      return NextResponse.json(
        { success: false, message: "Unauthorized job execution." },
        { status: 401 }
      );
    }
  }

  try {
    const result = await processPendingOutbox(25);
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (err) {
    console.error("[Orbion Email Job Error]", err);
    return NextResponse.json(
      { success: false, message: "Outbox processing failed." },
      { status: 500 }
    );
  }
}

