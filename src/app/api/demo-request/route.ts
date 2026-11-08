import { NextResponse } from "next/server";
import { demoRequestSchema } from "@/lib/validation/demo-request.schema";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { isHoneypotTriggered, verifyTurnstileToken } from "@/lib/security/spam-protection";
import { submitDemoRequest } from "@/lib/services/demo-request.service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  // 1. Rate Limiting (5 requests per 60 seconds per IP)
  const rateLimitResult = await checkRateLimit(`demo:${clientIp}`, {
    limit: 5,
    windowSeconds: 60,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many demo requests. Please wait a moment before trying again.",
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

  // 3. Honeypot Check
  if (isHoneypotTriggered(rawRecord)) {
    return NextResponse.json({
      success: true,
      message: "Your demo evaluation request has been submitted successfully.",
      data: { reference: "ORB-DEM-OK" },
    });
  }

  // 4. Bot Verification (Turnstile)
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

  // 5. Zod Validation
  const validationResult = demoRequestSchema.safeParse(rawRecord);

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
    const result = await submitDemoRequest(validationResult.data);

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
    console.error("[Orbion Demo API] Submission processing error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while saving your demo request. Please try again or email enquiry@orbiontechnologies.in directly.",
      },
      { status: 500 }
    );
  }
}

