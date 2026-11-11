import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { getServerEnv } from "@/lib/env";
import { generateUnsubscribeToken, verifyUnsubscribeToken } from "@/lib/security/tokens";
import { enqueueOutboxEmail } from "@/lib/email/outbox";
import { createAdminNotification } from "@/services/admin-notifications.service";
import type { NewsletterSubscriptionValidated } from "@/lib/validation/newsletter.schema";

export interface NewsletterServiceResult {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Subscribes an email to Orbion updates with explicit opt-in consent.
 * Uses an upsert pattern to handle re-subscriptions without leaking whether
 * an email already exists in the database.
 */
export async function subscribeToNewsletter(
  validatedData: NewsletterSubscriptionValidated
): Promise<NewsletterServiceResult> {
  const supabase = createAdminClient();
  const normalizedEmail = validatedData.email;
  const token = generateUnsubscribeToken(normalizedEmail);

  // Check if subscriber already exists
  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("id, status")
    .eq("email", normalizedEmail)
    .single();

  let siteUrl = "https://orbiontechnologies.in";
  try {
    const env = getServerEnv();
    siteUrl = env.siteUrl;
  } catch {
    // fallback
  }

  const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;

  if (existing) {
    if (existing.status === "subscribed") {
      // Return neutral success message (prevents email enumeration attacks)
      return {
        success: true,
        message: "Thank you for subscribing to Orbion Technologies updates.",
      };
    }

    // Reactivate previously unsubscribed contact
    await supabase
      .from("newsletter_subscribers")
      .update({
        status: "subscribed",
        consent: true,
        consent_timestamp: new Date().toISOString(),
        unsubscribe_token: token,
        unsubscribed_at: null,
      })
      .eq("id", existing.id);
  } else {
    // New subscriber insert
    const { data: newSub, error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email: normalizedEmail,
        status: "subscribed",
        consent: true,
        consent_timestamp: new Date().toISOString(),
        unsubscribe_token: token,
        source: validatedData.source || "website_footer",
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("[Orbion Newsletter] Insert error:", insertError);
      throw new Error("Unable to complete subscription at this time.");
    }

    // In-app administrative notification (non-blocking)
    try {
      await createAdminNotification({
        category: "newsletter",
        title: "New Newsletter Subscriber",
        message: `${normalizedEmail} opted in via ${validatedData.source || "website"}`,
        relatedEntityType: "newsletter",
        relatedEntityId: newSub?.id,
        linkUrl: "/admin/newsletter",
      });
    } catch (notifErr) {
      console.warn("[Orbion Newsletter] Notification warning:", notifErr);
    }

    // Enqueue welcome/confirmation email
    try {
      await enqueueOutboxEmail({
        relatedEntityType: "newsletter",
        relatedEntityId: newSub?.id,
        recipient: normalizedEmail,
        template: "newsletter_confirmation",
        subject: "Subscription Confirmed | Orbion Technologies",
        payload: {
          email: normalizedEmail,
          unsubscribeUrl,
        },
      });
    } catch (err) {
      console.warn("[Orbion Newsletter] Confirmation email enqueue warning:", err);
    }
  }

  return {
    success: true,
    message: "Thank you for subscribing to Orbion Technologies updates.",
  };
}

/**
 * Securely unsubscribes an email address using a cryptographically signed token.
 */
export async function unsubscribeFromNewsletter(token: string): Promise<NewsletterServiceResult> {
  const verification = verifyUnsubscribeToken(token);

  if (!verification.valid || !verification.email) {
    return {
      success: false,
      message: "The unsubscribe link is invalid or has expired.",
    };
  }

  const supabase = createAdminClient();
  const normalizedEmail = verification.email;

  const { data: subscriber, error: findError } = await supabase
    .from("newsletter_subscribers")
    .select("id, status")
    .eq("email", normalizedEmail)
    .single();

  if (findError || !subscriber) {
    return {
      success: true,
      message: "Your email address has been unsubscribed from Orbion Technologies updates.",
    };
  }

  await supabase
    .from("newsletter_subscribers")
    .update({
      status: "unsubscribed",
      unsubscribed_at: new Date().toISOString(),
    })
    .eq("id", subscriber.id);

  return {
    success: true,
    message: "You have been successfully unsubscribed from Orbion Technologies updates.",
  };
}

