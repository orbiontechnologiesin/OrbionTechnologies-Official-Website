import { generateUnsubscribeToken } from "../src/lib/security/tokens.ts";

const BASE_URL = "http://localhost:3001";
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

async function run() {
  console.log("================================================================================");
  console.log("ORBION TECHNOLOGIES — HTTP API INTEGRATION TESTS");
  console.log("================================================================================");

  // --- 1. CONTACT API ---
  console.log("\n1. Testing POST /api/contact...");

  // 1a. Valid contact enquiry
  const validRes = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Bhavin Test Visitor",
      email: "bhavin.test@orbiontechnologies.in",
      subject: "Custom Software Development",
      message: "Testing full end-to-end contact ingestion with PostgreSQL persistence.",
      company: "Orbion QA",
      phone: "+91 98765 43210",
      website: "https://orbiontechnologies.in",
    }),
  });
  const validJson = await validRes.json();
  assert(
    validRes.status === 200 && validJson.success && validJson.data?.reference?.startsWith("ORB-CNT-"),
    `Valid contact returns 200 with reference: ${validJson.data?.reference}`
  );

  // 1b. Missing required fields
  const missingRes = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "invalid-email",
    }),
  });
  const missingJson = await missingRes.json();
  assert(
    missingRes.status === 400 && !missingJson.success && missingJson.errors?.email,
    "Missing fields returns 400 with structured validation errors"
  );

  // 1c. Honeypot bot submission
  const botRes = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Spam Bot 3000",
      email: "spambot@example.com",
      subject: "General Enquiry",
      message: "Buy cheap backlinks now!",
      _orb_hp: "I am a malicious bot filling hidden fields",
    }),
  });
  const botJson = await botRes.json();
  assert(
    botRes.status === 200 && botJson.data?.reference === "ORB-CNT-OK",
    "Honeypot returns silent 200 fake success to trap bots"
  );

  // --- 2. DEMO REQUEST API ---
  console.log("\n2. Testing POST /api/demo-request...");

  // 2a. Valid demo request
  const demoRes = await fetch(`${BASE_URL}/api/demo-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      full_name: "Apurv Product Lead",
      email: "apurv.demo@orbiontechnologies.in",
      product_id: "orbion-crm",
      company: "Orbion Technologies",
      phone: "+91 98765 00000",
      preferred_date: "2026-12-15",
      message: "Exploring early architecture demo.",
    }),
  });
  const demoJson = await demoRes.json();
  assert(
    demoRes.status === 200 && demoJson.success && demoJson.data?.reference?.startsWith("ORB-DEM-"),
    `Valid demo request returns 200 with reference: ${demoJson.data?.reference}`
  );

  // 2b. Invalid product ID
  const invalidDemoRes = await fetch(`${BASE_URL}/api/demo-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      full_name: "Test Tester",
      email: "tester@example.com",
      product_id: "fake-product-suite",
    }),
  });
  const invalidDemoJson = await invalidDemoRes.json();
  assert(
    invalidDemoRes.status === 400 && !invalidDemoJson.success,
    "Invalid product ID rejected by schema validation"
  );

  // --- 3. NEWSLETTER API ---
  console.log("\n3. Testing POST /api/newsletter...");

  // 3a. Valid newsletter subscription
  const subEmail = `subscriber.${Date.now()}@orbiontechnologies.in`;
  const subRes = await fetch(`${BASE_URL}/api/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: subEmail,
      consent: true,
      source: "website_footer_test",
    }),
  });
  const subJson = await subRes.json();
  assert(
    subRes.status === 200 && subJson.success,
    "Valid newsletter subscription returns 200"
  );

  // 3b. Missing consent
  const noConsentRes = await fetch(`${BASE_URL}/api/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "noconsent@example.com",
      consent: false,
    }),
  });
  assert(
    noConsentRes.status === 400,
    "Subscription without explicit consent returns 400"
  );

  // --- 4. NEWSLETTER UNSUBSCRIBE API ---
  console.log("\n4. Testing /api/newsletter/unsubscribe...");

  // 4a. Valid unsubscribe via GET
  const validToken = generateUnsubscribeToken(subEmail);
  const unsubGetRes = await fetch(`${BASE_URL}/api/newsletter/unsubscribe?token=${encodeURIComponent(validToken)}`);
  const unsubGetHtml = await unsubGetRes.text();
  assert(
    unsubGetRes.status === 200 && unsubGetHtml.includes("Unsubscribed Successfully"),
    "Valid unsubscribe token GET returns 200 branded confirmation HTML"
  );

  // 4b. Invalid unsubscribe token
  const invalidUnsubRes = await fetch(`${BASE_URL}/api/newsletter/unsubscribe?token=malformed.tampered.token`);
  assert(
    invalidUnsubRes.status === 400,
    "Tampered unsubscribe token returns 400"
  );

  // --- 5. OUTBOX PROCESSOR JOB ---
  console.log("\n5. Testing POST /api/jobs/process-email-outbox...");
  const outboxRes = await fetch(`${BASE_URL}/api/jobs/process-email-outbox`, {
    method: "POST",
  });
  const outboxJson = await outboxRes.json();
  assert(
    outboxRes.status === 200 && outboxJson.success,
    `Outbox processor executed successfully (processed: ${outboxJson.processed})`
  );

  console.log("\n================================================================================");
  console.log(`HTTP API TEST SUMMARY: ${passed} Passed, ${failed} Failed.`);
  console.log("================================================================================");

  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
