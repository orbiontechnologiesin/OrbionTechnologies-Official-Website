import crypto from "crypto";

function getSigningKey(): string {
  return (
    process.env.UNSUBSCRIBE_SIGNING_SECRET ||
    process.env.SUPABASE_SECRET_KEY ||
    "orbion_fallback_signing_secret_do_not_use_in_prod"
  );
}

/**
 * Generates a signed, verifiable unsubscribe token for a subscriber's email.
 * Format: [emailBase64].[timestamp].[signatureHex]
 */
export function generateUnsubscribeToken(email: string): string {
  const normalizedEmail = email.trim().toLowerCase();
  const timestamp = Date.now().toString(36);
  const data = `${normalizedEmail}:${timestamp}`;

  const hmac = crypto
    .createHmac("sha256", getSigningKey())
    .update(data)
    .digest("hex")
    .slice(0, 32);

  const encodedEmail = Buffer.from(normalizedEmail).toString("base64url");
  return `${encodedEmail}.${timestamp}.${hmac}`;
}

/**
 * Verifies that an unsubscribe token is structurally valid, untampered, and extracts the email.
 */
export function verifyUnsubscribeToken(token: string): { valid: boolean; email?: string } {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return { valid: false };
    }

    const [encodedEmail, timestamp, signature] = parts;
    const email = Buffer.from(encodedEmail, "base64url").toString("utf-8");

    const expectedData = `${email}:${timestamp}`;
    const expectedSig = crypto
      .createHmac("sha256", getSigningKey())
      .update(expectedData)
      .digest("hex")
      .slice(0, 32);

    const isMatch = crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSig, "hex")
    );

    if (!isMatch) {
      return { valid: false };
    }

    return { valid: true, email };
  } catch {
    return { valid: false };
  }
}

