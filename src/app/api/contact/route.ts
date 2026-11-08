import { NextResponse } from "next/server";
import { contactSubmissionSchema } from "@/lib/validation/contact.schema";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { isHoneypotTriggered, verifyTurnstileToken } from "@/lib/security/spam-protection";
import { submitContactEnquiry } from "@/lib/services/contact.service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  // 1. Enforce Distributed Rate Limiting (5 requests per 60 seconds per IP)
  const rateLimitResult = await checkRateLimit(`contact:${clientIp}`, {
    limit: 5,
    windowSeconds: 60,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many submission attempts. Please wait a moment before trying again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfter),
        },
      }
    );
  }

  // 2. Parse & Check Request Payload
  let body: unknown;
  try {
    const rawText = await request.text();
    // Body size ceiling (max 64KB)
    if (rawText.length > 64 * 1024) {
      return NextResponse.json(
        { success: false, message: "Payload size exceeds allowable threshold." },
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

  // 3. Honeypot Bot Trap (Silent discard)
  if (isHoneypotTriggered(rawRecord)) {
    console.warn(`[Orbion Spam Trap] Honeypot triggered by IP: ${clientIp.slice(0, 8)}...`);
    // Return fake success so bots do not reconfigure their scrapers
    return NextResponse.json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
      data: { reference: "ORB-CNT-OK" },
    });
  }

  // 4. Bot Verification (Turnstile, if enabled)
  const turnstileCheck = await verifyTurnstileToken(
    rawRecord.turnstile_token as string | undefined,
    clientIp
  );
  if (!turnstileCheck.success) {
    return NextResponse.json(
      { success: false, message: turnstileCheck.error || "Bot verification failed." },
      { status: 403 }
    );
  }

  // 5. Server-Side Zod Validation
  const validationResult = contactSubmissionSchema.safeParse(rawRecord);

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
        message: "Please check the information you entered.",
        errors: fieldErrors,
      },
      { status: 400 }
    );
  }

  // 6. Persistence & Outbox Enqueue
  try {
    const result = await submitContactEnquiry(validationResult.data, clientIp);

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        data: {
          reference: result.reference,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Orbion Contact API] Submission processing error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while saving your enquiry. Please try again or email enquiry@orbiontechnologies.in directly.",
      },
      { status: 500 }
    );
  }
}
