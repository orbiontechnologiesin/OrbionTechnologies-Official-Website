import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

// Load environment variables from .env.local
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY;

console.log("================================================================================");
console.log("ORBION TECHNOLOGIES — PHASE 2 AUTOMATED TEST SUITE");
console.log("================================================================================");

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    testsPassed++;
  } else {
    console.error(`[FAIL] ${message}`);
    testsFailed++;
  }
}

async function runTests() {
  console.log("\n--- TEST GROUP 1: Database Tables & Constraints Verification ---");
  const adminClient = createClient(url, secretKey);

  // 1. Verify contact_leads insertion & columns
  const testRef = `ORB-TEST-${Date.now().toString().slice(-6)}`;
  const { data: leadData, error: leadError } = await adminClient
    .from("contact_leads")
    .insert({
      reference: testRef,
      full_name: "Automated Test Runner",
      email: "test.lead@orbiontechnologies.in",
      subject: "Custom Software Development",
      message: "This is an automated verification lead for Phase 2 test suite.",
      company: "Orbion QA Labs",
      phone: "+91 98765 43210",
      website: "https://orbiontechnologies.in",
      source: "automated_test",
      status: "new",
    })
    .select("id, reference, status")
    .single();

  assert(!leadError && leadData?.reference === testRef, "contact_leads insert with reference succeeded");

  // 2. Verify demo_requests insertion
  const demoRef = `ORB-DEM-${Date.now().toString().slice(-6)}`;
  const { data: demoData, error: demoError } = await adminClient
    .from("demo_requests")
    .insert({
      reference: demoRef,
      full_name: "Automated Demo Tester",
      email: "demo.tester@orbiontechnologies.in",
      product_id: "orbion-crm",
      company: "Orbion QA Labs",
      phone: "+91 98765 43210",
      preferred_date: "2026-12-01",
      message: "Testing demo request intake pipeline.",
      source: "automated_test",
      status: "pending",
    })
    .select("id, reference, product_id")
    .single();

  assert(!demoError && demoData?.product_id === "orbion-crm", "demo_requests insert with valid product_id succeeded");

  // 3. Verify demo_requests invalid product constraint
  const { error: invalidProductError } = await adminClient
    .from("demo_requests")
    .insert({
      reference: `ORB-INV-${Date.now()}`,
      full_name: "Invalid Product Tester",
      email: "invalid@example.com",
      product_id: "non-existent-product",
    });

  assert(Boolean(invalidProductError), "demo_requests rejects invalid product_id at database level");

  // 4. Verify newsletter_subscribers insertion & unsubscribe token
  const subEmail = `subscriber.${Date.now()}@orbiontechnologies.in`;
  const subToken = crypto.randomBytes(16).toString("hex");
  const { data: subData, error: subError } = await adminClient
    .from("newsletter_subscribers")
    .insert({
      email: subEmail,
      status: "subscribed",
      consent: true,
      unsubscribe_token: subToken,
      source: "automated_test",
    })
    .select("id, email, status")
    .single();

  assert(!subError && subData?.email === subEmail, "newsletter_subscribers insert with consent succeeded");

  // 5. Verify email_outbox insertion
  const { data: outboxData, error: outboxError } = await adminClient
    .from("email_outbox")
    .insert({
      related_entity_type: "contact_lead",
      related_entity_id: leadData?.id,
      recipient: "test.lead@orbiontechnologies.in",
      template: "contact_confirmation",
      subject: "Test Confirmation",
      payload: { reference: testRef },
      status: "pending",
      attempts: 0,
      max_attempts: 5,
    })
    .select("id, status, attempts")
    .single();

  assert(!outboxError && outboxData?.status === "pending", "email_outbox queue persistence succeeded");

  console.log("\n--- TEST GROUP 2: Row Level Security (RLS) Isolation ---");
  const anonClient = createClient(url, anonKey);

  // Anon must NOT be able to SELECT from contact_leads
  const { data: anonLeads, error: anonLeadsError } = await anonClient
    .from("contact_leads")
    .select("*");
  assert(Boolean(anonLeadsError) || (anonLeads && anonLeads.length === 0), "RLS: Anonymous users cannot read contact_leads");

  // Anon must NOT be able to SELECT from demo_requests
  const { data: anonDemos, error: anonDemosError } = await anonClient
    .from("demo_requests")
    .select("*");
  assert(Boolean(anonDemosError) || (anonDemos && anonDemos.length === 0), "RLS: Anonymous users cannot read demo_requests");

  // Anon must NOT be able to SELECT from newsletter_subscribers
  const { data: anonSubs, error: anonSubsError } = await anonClient
    .from("newsletter_subscribers")
    .select("*");
  assert(Boolean(anonSubsError) || (anonSubs && anonSubs.length === 0), "RLS: Anonymous users cannot read newsletter_subscribers");

  // Anon must NOT be able to SELECT from email_outbox
  const { data: anonOutbox, error: anonOutboxError } = await anonClient
    .from("email_outbox")
    .select("*");
  assert(Boolean(anonOutboxError) || (anonOutbox && anonOutbox.length === 0), "RLS: Anonymous users cannot read email_outbox");

  // Clean up test rows
  if (leadData?.id) await adminClient.from("contact_leads").delete().eq("id", leadData.id);
  if (demoData?.id) await adminClient.from("demo_requests").delete().eq("id", demoData.id);
  if (subData?.id) await adminClient.from("newsletter_subscribers").delete().eq("id", subData.id);
  if (outboxData?.id) await adminClient.from("email_outbox").delete().eq("id", outboxData.id);

  console.log("\n================================================================================");
  console.log(`TEST SUMMARY: ${testsPassed} Passed, ${testsFailed} Failed.`);
  console.log("================================================================================");

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution unhandled error:", err);
  process.exit(1);
});

