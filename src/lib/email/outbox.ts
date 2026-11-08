import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { isEmailConfigured } from "@/lib/env";
import { sendEmail } from "./send";
import { renderContactNotificationEmail, type ContactNotificationData } from "./templates/contact-notification";
import { renderContactConfirmationEmail, type ContactConfirmationData } from "./templates/contact-confirmation";
import { renderDemoNotificationEmail, type DemoNotificationData } from "./templates/demo-notification";
import { renderDemoConfirmationEmail, type DemoConfirmationData } from "./templates/demo-confirmation";
import { renderNewsletterConfirmationEmail, type NewsletterConfirmationData } from "./templates/newsletter-confirmation";
import type { Database } from "@/types/database";

type EmailOutboxRow = Database["public"]["Tables"]["email_outbox"]["Row"];

export interface EnqueueEmailParams {
  relatedEntityType: "contact_lead" | "demo_request" | "newsletter" | "system";
  relatedEntityId?: string | null;
  recipient: string;
  template: "contact_notification" | "contact_confirmation" | "demo_notification" | "demo_confirmation" | "newsletter_confirmation";
  subject: string;
  payload: Record<string, unknown>;
  replyTo?: string;
}

/**
 * Enqueues an email into the database outbox and attempts immediate dispatch.
 * If delivery fails or email credentials are not yet configured, the record remains
 * safely queued in the outbox for subsequent retry.
 */
export async function enqueueOutboxEmail(params: EnqueueEmailParams): Promise<{
  outboxId: string;
  dispatchedImmediately: boolean;
}> {
  const supabase = createAdminClient();

  // 1. Persist to outbox table
  const { data: outboxEntry, error: insertError } = await supabase
    .from("email_outbox")
    .insert({
      related_entity_type: params.relatedEntityType,
      related_entity_id: params.relatedEntityId || null,
      recipient: params.recipient,
      template: params.template,
      subject: params.subject,
      payload: params.payload as Database["public"]["Tables"]["email_outbox"]["Insert"]["payload"],
      status: "pending",
      attempts: 0,
      max_attempts: 5,
      next_retry_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (insertError || !outboxEntry) {
    console.error("[Orbion Outbox Error] Failed to persist outbox record:", insertError);
    throw new Error("Unable to create email outbox job.");
  }

  const outboxId = outboxEntry.id;

  // 2. If email provider is configured, attempt immediate delivery
  if (isEmailConfigured()) {
    try {
      const rendered = renderEmailContent(params.template, params.payload);
      if (rendered) {
        const sendResult = await sendEmail({
          to: params.recipient,
          subject: rendered.subject,
          html: rendered.html,
          text: rendered.text,
          replyTo: params.replyTo,
        });

        if (sendResult.success && sendResult.messageId) {
          await supabase
            .from("email_outbox")
            .update({
              status: "sent",
              provider_message_id: sendResult.messageId,
              sent_at: new Date().toISOString(),
              attempts: 1,
            })
            .eq("id", outboxId);

          return { outboxId, dispatchedImmediately: true };
        } else {
          // Record failure with exponential backoff
          const nextRetry = new Date(Date.now() + 60 * 1000).toISOString();
          await supabase
            .from("email_outbox")
            .update({
              status: "failed",
              attempts: 1,
              last_error: sendResult.error || "Delivery failed",
              next_retry_at: nextRetry,
            })
            .eq("id", outboxId);
        }
      }
    } catch (err) {
      console.warn("[Orbion Outbox] Immediate dispatch failed, will retry later:", err);
    }
  }

  return { outboxId, dispatchedImmediately: false };
}

/**
 * Renders HTML and text content from registered email templates.
 */
function renderEmailContent(
  template: string,
  payload: Record<string, unknown>
): { subject: string; html: string; text: string } | null {
  switch (template) {
    case "contact_notification":
      return renderContactNotificationEmail(payload as unknown as ContactNotificationData);
    case "contact_confirmation":
      return renderContactConfirmationEmail(payload as unknown as ContactConfirmationData);
    case "demo_notification":
      return renderDemoNotificationEmail(payload as unknown as DemoNotificationData);
    case "demo_confirmation":
      return renderDemoConfirmationEmail(payload as unknown as DemoConfirmationData);
    case "newsletter_confirmation":
      return renderNewsletterConfirmationEmail(payload as unknown as NewsletterConfirmationData);
    default:
      console.error(`[Orbion Outbox] Unknown email template: ${template}`);
      return null;
  }
}

/**
 * Worker function: processes queued emails with exponential backoff.
 * Can be triggered via cron or secure endpoint (/api/jobs/process-email-outbox).
 */
export async function processPendingOutbox(batchSize: number = 20): Promise<{
  processed: number;
  succeeded: number;
  failed: number;
}> {
  if (!isEmailConfigured()) {
    return { processed: 0, succeeded: 0, failed: 0 };
  }

  const supabase = createAdminClient();
  const nowIso = new Date().toISOString();

  // Query pending or failed jobs due for retry
  const { data: jobs, error } = await supabase
    .from("email_outbox")
    .select("*")
    .in("status", ["pending", "failed"])
    .lte("next_retry_at", nowIso)
    .lt("attempts", 5)
    .order("created_at", { ascending: true })
    .limit(batchSize);

  if (error || !jobs || jobs.length === 0) {
    return { processed: 0, succeeded: 0, failed: 0 };
  }

  let succeeded = 0;
  let failed = 0;

  for (const job of jobs as EmailOutboxRow[]) {
    const nextAttempt = job.attempts + 1;
    const isLastAttempt = nextAttempt >= job.max_attempts;

    const rendered = renderEmailContent(
      job.template,
      (job.payload as Record<string, unknown>) || {}
    );

    if (!rendered) {
      await supabase
        .from("email_outbox")
        .update({
          status: "failed",
          attempts: nextAttempt,
          last_error: "Template rendering failed.",
        })
        .eq("id", job.id);
      failed++;
      continue;
    }

    const result = await sendEmail({
      to: job.recipient,
      subject: job.subject || rendered.subject,
      html: rendered.html,
      text: rendered.text,
    });

    if (result.success && result.messageId) {
      await supabase
        .from("email_outbox")
        .update({
          status: "sent",
          provider_message_id: result.messageId,
          sent_at: new Date().toISOString(),
          attempts: nextAttempt,
          last_error: null,
        })
        .eq("id", job.id);
      succeeded++;
    } else {
      // Exponential backoff: 2^attempt minutes (e.g. 2m, 4m, 8m, 16m)
      const backoffMinutes = Math.pow(2, nextAttempt);
      const nextRetryAt = new Date(Date.now() + backoffMinutes * 60 * 1000).toISOString();

      await supabase
        .from("email_outbox")
        .update({
          status: isLastAttempt ? "failed" : "pending",
          attempts: nextAttempt,
          last_error: result.error || "Retry delivery failed.",
          next_retry_at: nextRetryAt,
        })
        .eq("id", job.id);
      failed++;
    }
  }

  return { processed: jobs.length, succeeded, failed };
}

