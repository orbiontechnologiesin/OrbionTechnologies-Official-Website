import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { getServerEnv } from "@/lib/env";
import { generateReference } from "@/lib/security/spam-protection";
import { enqueueOutboxEmail } from "@/lib/email/outbox";
import { PRODUCTS } from "@/lib/products-data";
import type { DemoRequestValidated } from "@/lib/validation/demo-request.schema";

export interface DemoServiceResult {
  success: boolean;
  reference?: string;
  message: string;
  error?: string;
}

/**
 * Handles the complete lifecycle of a software product demo evaluation request:
 * 1. Validates product identity against the 7 planned Orbion products.
 * 2. Generates unique human-readable tracking reference (e.g. ORB-DEM-2601-F3A1).
 * 3. Persists request durably into PostgreSQL `demo_requests`.
 * 4. Enqueues internal staff notification.
 * 5. Enqueues customer receipt without falsely claiming demo availability.
 */
export async function submitDemoRequest(
  validatedData: DemoRequestValidated
): Promise<DemoServiceResult> {
  const supabase = createAdminClient();
  const reference = generateReference("DEM");

  const matchedProduct = PRODUCTS.find((p) => p.id === validatedData.product_id);
  const productName = matchedProduct ? matchedProduct.name : validatedData.product_id;

  // 1. Persist to PostgreSQL database
  const { data: requestRecord, error: insertError } = await supabase
    .from("demo_requests")
    .insert({
      reference,
      full_name: validatedData.canonicalFullName,
      email: validatedData.email,
      company: validatedData.company,
      phone: validatedData.phone,
      product_id: validatedData.product_id,
      preferred_date: validatedData.preferred_date,
      message: validatedData.message,
      source: validatedData.source || "website_demo_request",
      status: "pending",
    })
    .select("id, reference, created_at")
    .single();

  if (insertError || !requestRecord) {
    console.error("[Orbion Demo Service] Database insert error:", insertError);
    throw new Error("Failed to save demo request to database.");
  }

  // 2. Enqueue Outbound Emails
  try {
    let internalRecipient = "enquiry@orbiontechnologies.in";
    try {
      const env = getServerEnv();
      internalRecipient = env.contactEmail;
    } catch {
      // Use default
    }

    // A. Internal notification to product team
    await enqueueOutboxEmail({
      relatedEntityType: "demo_request",
      relatedEntityId: requestRecord.id,
      recipient: internalRecipient,
      template: "demo_notification",
      subject: `[Demo Evaluation] [${reference}] ${productName} — ${validatedData.canonicalFullName}`,
      payload: {
        reference,
        fullName: validatedData.canonicalFullName,
        email: validatedData.email,
        productId: validatedData.product_id,
        productName,
        company: validatedData.company,
        phone: validatedData.phone,
        preferredDate: validatedData.preferred_date,
        message: validatedData.message,
        createdAt: requestRecord.created_at,
      },
      replyTo: validatedData.email,
    });

    // B. Customer confirmation email
    await enqueueOutboxEmail({
      relatedEntityType: "demo_request",
      relatedEntityId: requestRecord.id,
      recipient: validatedData.email,
      template: "demo_confirmation",
      subject: `Demo Request Received: ${productName} | Orbion Technologies`,
      payload: {
        reference,
        fullName: validatedData.canonicalFullName,
        productId: validatedData.product_id,
        productName,
      },
    });
  } catch (emailError) {
    console.warn("[Orbion Demo Service] Outbox queue warning:", emailError);
  }

  return {
    success: true,
    reference,
    message: `Your demo evaluation request for ${productName} has been received. Our team will review your operational requirements and get in touch.`,
  };
}

