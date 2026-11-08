import { NextResponse } from "next/server";
import { newsletterSubscriptionSchema } from "@/lib/validation/newsletter.schema";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { isHoneypotTriggered } from "@/lib/security/spam-protection";
import { subscribeToNewsletter } from "@/lib/services/newsletter.service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  // 1. Rate Limiting (5 requests per 60 seconds per IP)
  const rateLimitResult = await checkRateLimit(`newsletter:${clientIp}`, {
    limit: 5,
    windowSeconds: 60,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please wait a moment before trying again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfter),
        },
      }
    );
  }

  // 2. Parse Request Payload
  let body: unknown;
  try {
    const rawText = await request.text();
    if (rawText.length > 16 * 1024) {
      return NextResponse.json(
        { success: false, message: "Payload size exceeds threshold." },
        { status: 413 }
      );
    }
    body = JSON.parse(rawText);
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON request format." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { success: false, message: "Request body must be a valid JSON object." },
      { status: 400 }
    );
  }

  const rawRecord = body as Record<string, unknown>;

  // 3. Honeypot Bot Trap
  if (isHoneypotTriggered(rawRecord)) {
    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to Orbion Technologies updates.",
    });
  }

  // 4. Zod Validation
  const validationResult = newsletterSubscriptionSchema.safeParse(rawRecord);

  if (!validationResult.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of validationResult.error.issues) {
      const field = issue.path[0] ? String(issue.path[0]) : "general";
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Please check your subscription information.",
        errors: fieldErrors,
      },
      { status: 400 }
    );
  }

  // 5. Subscription Persistence
  try {
    const result = await subscribeToNewsletter(validationResult.data);

    return NextResponse.json(
      {
        success: true,
        message: result.message,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Orbion Newsletter API] Processing error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your subscription. Please try again later.",
      },
      { status: 500 }
    );
  }
}

