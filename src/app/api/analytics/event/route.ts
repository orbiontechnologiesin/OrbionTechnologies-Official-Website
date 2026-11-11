import { NextResponse } from "next/server";
import { analyticsEventSchema } from "@/lib/validation/analytics.schema";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { recordAnalyticsEvent } from "@/services/analytics.service";

export const dynamic = "force-dynamic";

/**
 * Public ingestion endpoint for first-party, privacy-conscious analytics events.
 * Protected by rate limiting and strict Zod validation.
 */
export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  // Rate Limiting: max 60 events per minute per IP
  const rateLimitResult = await checkRateLimit(`analytics:${clientIp}`, {
    limit: 60,
    windowSeconds: 60,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { success: false, message: "Rate limit exceeded." },
      { status: 429, headers: { "Retry-After": String(rateLimitResult.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 16 * 1024) {
      return NextResponse.json({ success: false, message: "Payload too large." }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON format." }, { status: 400 });
  }

  const validation = analyticsEventSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid event data.",
        errors: validation.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const result = await recordAnalyticsEvent(validation.data);
  if (!result.success) {
    return NextResponse.json(
      { success: false, message: "Failed to record event." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

