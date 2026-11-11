import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { getServerEnv } from "@/lib/env";
import { generateReference, hashClientIp } from "@/lib/security/spam-protection";
import { enqueueOutboxEmail } from "@/lib/email/outbox";
import { createAdminNotification } from "@/services/admin-notifications.service";
import type { ContactSubmissionValidated } from "@/lib/validation/contact.schema";

export interface ContactServiceResult {
  success: boolean;
  reference?: string;
  message: string;
  error?: string;
}

/**
 * Handles the complete lifecycle of a customer contact enquiry:
 * 1. Generates unique human-readable tracking reference (e.g. ORB-CNT-2601-A9F3).
 * 2. Persists enquiry durably into PostgreSQL `contact_leads`.
 * 3. Enqueues internal staff notification to `ORBION_CONTACT_EMAIL`.
 * 4. Enqueues customer acknowledgement email to the visitor.
 * 
 * Reliability Guarantee:
 * Database save occurs first. An email provider outage never loses a customer inquiry.
 */
export async function submitContactEnquiry(
  validatedData: ContactSubmissionValidated,
  clientIp: string
): Promise<ContactServiceResult> {
  const supabase = createAdminClient();
  const reference = generateReference("CNT");
  const ipHash = hashClientIp(clientIp);

  // 1. Persist to PostgreSQL database
  const { data: lead, error: insertError } = await supabase
    .from("contact_leads")
    .insert({
      reference,
      full_name: validatedData.canonicalFullName,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      website: validatedData.website,
      subject: validatedData.subject,
      message: validatedData.message,
      source: validatedData.source || "website_contact",
      status: "new",
      ip_hash: ipHash,
    })
    .select("id, reference, created_at")
    .single();

  if (insertError || !lead) {
    console.error("[Orbion Contact Service] Database insert error:", insertError);
    throw new Error("Failed to save enquiry to database.");
  }

  // Administrative In-App Notification (non-blocking)
  try {
    await createAdminNotification({
      category: "lead",
      title: "New Customer Enquiry",
      message: `${validatedData.canonicalFullName} submitted: "${validatedData.subject}"`,
      relatedEntityType: "contact_lead",
      relatedEntityId: lead.id,
      linkUrl: `/admin/leads/${lead.id}`,
    });
  } catch (notifErr) {
    console.warn("[Orbion Contact Service] Notification dispatch warning:", notifErr);
  }

  // 2. Enqueue Outbound Emails (Non-blocking failure pattern)
  try {
    let internalRecipient = "enquiry@orbiontechnologies.in";
    try {
      const env = getServerEnv();
      internalRecipient = env.contactEmail;
    } catch {
      // Use default
    }

    // A. Internal notification to Orbion team
    await enqueueOutboxEmail({
      relatedEntityType: "contact_lead",
      relatedEntityId: lead.id,
      recipient: internalRecipient,
      template: "contact_notification",
      subject: `[New Enquiry] [${reference}] ${validatedData.subject} — ${validatedData.canonicalFullName}`,
      payload: {
        reference,
        fullName: validatedData.canonicalFullName,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        company: validatedData.company,
        phone: validatedData.phone,
        website: validatedData.website,
        createdAt: lead.created_at,
      },
      replyTo: validatedData.email,
    });

    // B. Customer confirmation email
    await enqueueOutboxEmail({
      relatedEntityType: "contact_lead",
      relatedEntityId: lead.id,
      recipient: validatedData.email,
      template: "contact_confirmation",
      subject: "We received your enquiry | Orbion Technologies",
      payload: {
        reference,
        fullName: validatedData.canonicalFullName,
        subject: validatedData.subject,
        message: validatedData.message,
      },
    });
  } catch (emailError) {
    // Log warning, but NEVER fail the customer request because the enquiry is already securely saved
    console.warn("[Orbion Contact Service] Outbox queue warning:", emailError);
  }

  return {
    success: true,
    reference: lead.reference || reference,
    message: "Your enquiry has been submitted successfully.",
  };
}

