import { NextResponse } from "next/server";
import { newsletterUnsubscribeSchema } from "@/lib/validation/newsletter.schema";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { unsubscribeFromNewsletter } from "@/lib/services/newsletter.service";

export const dynamic = "force-dynamic";

/**
 * Direct link unsubscribe handler (GET from email clients).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return new Response(renderUnsubscribeHtml("Invalid Request", "No unsubscribe token was provided.", false), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const result = await unsubscribeFromNewsletter(token);

  return new Response(
    renderUnsubscribeHtml(
      result.success ? "Unsubscribed Successfully" : "Unsubscribe Failed",
      result.message,
      result.success
    ),
    {
      status: result.success ? 200 : 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}

/**
 * Programmatic JSON unsubscribe handler (POST).
 */
export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  const rateLimitResult = await checkRateLimit(`unsub:${clientIp}`, {
    limit: 10,
    windowSeconds: 60,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON format." },
      { status: 400 }
    );
  }

  const validationResult = newsletterUnsubscribeSchema.safeParse(body);
  if (!validationResult.success) {
    return NextResponse.json(
      { success: false, message: "Invalid unsubscribe parameters." },
      { status: 400 }
    );
  }

  const result = await unsubscribeFromNewsletter(validationResult.data.token);
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}

function renderUnsubscribeHtml(title: string, message: string, success: boolean): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Orbion Technologies</title>
  <style>
    body { margin: 0; padding: 0; background-color: #F6F4EF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1A1F20; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .card { background-color: #FFFFFF; border-radius: 20px; border: 1px solid #E8E5DF; padding: 48px 40px; max-width: 460px; width: 90%; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
    .status-icon { width: 56px; height: 56px; border-radius: 50%; margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center; font-size: 24px; }
    .icon-success { background-color: #EBF8F2; color: #1E8E5A; }
    .icon-error { background-color: #FDECEC; color: #D93025; }
    h1 { font-size: 22px; font-weight: 700; color: #1A1F20; margin: 0 0 12px 0; }
    p { font-size: 14px; color: #6E757A; line-height: 1.6; margin: 0 0 28px 0; }
    .btn { display: inline-block; background-color: #173B3F; color: #FFFFFF; text-decoration: none; font-size: 13px; font-weight: 600; padding: 12px 24px; border-radius: 8px; transition: background-color 0.2s; }
    .btn:hover { background-color: #0E2528; }
    .brand-foot { margin-top: 24px; font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #A4ACB0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="status-icon ${success ? "icon-success" : "icon-error"}">
      ${success ? "&#10003;" : "&#10007;"}
    </div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="/" class="btn">Return to Homepage &rarr;</a>
    <div class="brand-foot">Orbion Technologies &bull; Engineering What's Next</div>
  </div>
</body>
</html>`;
}

