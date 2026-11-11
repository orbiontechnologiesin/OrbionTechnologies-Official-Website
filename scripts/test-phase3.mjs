/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — PHASE 3 AUTOMATED TEST SUITE
 * ==============================================================================
 * Comprehensive integration tests covering:
 * 1. Administrator Authentication (Supabase Auth sign-in & password validation)
 * 2. Role-Based Access Control (RBAC) capability matrix
 * 3. Lead Management & Atomic Status Changes with Audit Logs
 * 4. Privilege Escalation & Self-Deactivation Prevention
 * 5. Audit Logging Ledger Verification
 * ==============================================================================
 */

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import { hasPermission } from "../src/lib/auth/permissions.ts";

// 1. Load .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...rest] = trimmed.split("=");
      const val = rest.join("=").replace(/^["']|["']$/g, "").trim();
      process.env[key.trim()] = val;
    }
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey) {
  console.error("[FATAL] Missing Supabase configuration in .env.local");
  process.exit(1);
}

const adminClient = createClient(url, secretKey);
const anonClient = createClient(url, anonKey);

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

async function runTests() {
  console.log("================================================================================");
  console.log("ORBION TECHNOLOGIES — PHASE 3 INTEGRATION TEST SUITE");
  console.log("================================================================================");

  // ----------------------------------------------------------------------------
  // GROUP 1: RBAC Permission Matrix Evaluation
  // ----------------------------------------------------------------------------
  console.log("\n--- TEST GROUP 1: RBAC Capability Matrix ---");

  assert(
    hasPermission("super_admin", "users:create") &&
    hasPermission("super_admin", "leads:delete") &&
    hasPermission("super_admin", "audit_logs:read"),
    "Super Admin possesses all permissions (users, leads, audit logs)"
  );

  assert(
    hasPermission("admin", "leads:update") &&
    hasPermission("admin", "audit_logs:read") &&
    !hasPermission("admin", "users:create"),
    "Admin possesses leads and audit permissions, but cannot create users"
  );

  assert(
    hasPermission("sales", "leads:read") &&
    hasPermission("sales", "leads:update") &&
    !hasPermission("sales", "audit_logs:read") &&
    !hasPermission("sales", "users:read"),
    "Sales possesses lead read/update permissions, but cannot view users or audit logs"
  );

  assert(
    hasPermission("viewer", "dashboard:view") &&
    hasPermission("viewer", "leads:read") &&
    !hasPermission("viewer", "leads:update"),
    "Viewer possesses read-only access and cannot modify leads"
  );

  assert(
    !hasPermission("editor", "leads:read") &&
    !hasPermission("hr", "leads:read"),
    "Editor and HR roles do not have access to customer sales leads"
  );

  // ----------------------------------------------------------------------------
  // GROUP 2: Super Admin Provisioning & Authentication Flow
  // ----------------------------------------------------------------------------
  console.log("\n--- TEST GROUP 2: Super Admin Creation & Auth Verification ---");

  const testSuperEmail = `qa.superadmin.${Date.now()}@orbiontechnologies.in`;
  const testPassword = "OrbionTestPassword@2026!";
  let testUserId = null;

  // Create user via Supabase Auth Admin
  const { data: createData, error: createError } = await adminClient.auth.admin.createUser({
    email: testSuperEmail,
    password: testPassword,
    email_confirm: true,
    user_metadata: { full_name: "QA Super Admin" },
  });

  assert(!createError && createData?.user, `Created test user in Supabase Auth [${testSuperEmail}]`);
  testUserId = createData?.user?.id;

  // Insert profile with super_admin role
  const { error: profError } = await adminClient.from("profiles").insert({
    id: testUserId,
    email: testSuperEmail,
    full_name: "QA Super Admin",
    role: "super_admin",
    is_active: true,
  });
  assert(!profError, "Inserted matching profile with role 'super_admin'");

  // Authenticate with valid credentials
  const { data: signInData, error: signInError } = await anonClient.auth.signInWithPassword({
    email: testSuperEmail,
    password: testPassword,
  });
  if (signInError) {
    console.log("signInError:", signInError);
  }
  assert(!signInError && signInData?.session, "Valid administrator sign-in succeeds and returns session");

  // Attempt sign-in with invalid password
  const { error: badPwError } = await anonClient.auth.signInWithPassword({
    email: testSuperEmail,
    password: "WrongPassword123!",
  });
  assert(Boolean(badPwError), "Sign-in fails securely when an incorrect password is provided");

  // Attempt sign-in with non-existent email
  const { error: unknownEmailError } = await anonClient.auth.signInWithPassword({
    email: "nonexistent.account@orbiontechnologies.in",
    password: "SomePassword123!",
  });
  assert(Boolean(unknownEmailError), "Sign-in fails securely for an unknown email address");

  // ----------------------------------------------------------------------------
  // GROUP 3: Lead Status Atomic Transaction with Audit Logging
  // ----------------------------------------------------------------------------
  console.log("\n--- TEST GROUP 3: Atomic Lead Update & Audit Transaction ---");

  // 1. Create a test lead
  const testRef = `ORB-P3-${Date.now().toString().slice(-6)}`;
  const { data: leadData, error: leadError } = await adminClient
    .from("contact_leads")
    .insert({
      reference: testRef,
      full_name: "Phase 3 Test Prospect",
      email: "prospect.p3@example.com",
      subject: "Enterprise AI Consultation",
      message: "Customer enquiry to verify atomic status transitions and internal staff notes.",
      company: "Acme Industrial Labs",
      status: "new",
    })
    .select("id")
    .single();

  assert(!leadError && leadData?.id, `Created test contact lead [${testRef}]`);
  const leadId = leadData?.id;

  // 2. Perform atomic update using authenticated test user
  const userClient = createClient(url, anonKey);
  await userClient.auth.setSession({
    access_token: signInData.session.access_token,
    refresh_token: signInData.session.refresh_token,
  });

  const { data: rpcData, error: rpcError } = await userClient.rpc("update_lead_status_with_audit", {
    p_lead_id: leadId,
    p_new_status: "qualified",
    p_assigned_to: testUserId,
    p_internal_note: "Prospect verified as enterprise qualification. Ready for initial architecture briefing.",
  });

  assert(!rpcError && rpcData?.success, "update_lead_status_with_audit RPC executed successfully");

  // 3. Verify lead status updated in database
  const { data: updatedLead } = await adminClient
    .from("contact_leads")
    .select("status, assigned_to")
    .eq("id", leadId)
    .single();

  assert(
    updatedLead?.status === "qualified" && updatedLead?.assigned_to === testUserId,
    "Lead status transitioned to 'qualified' and assigned to test admin"
  );

  // 4. Verify internal note recorded in lead_notes
  const { data: notesData } = await adminClient
    .from("lead_notes")
    .select("note, author_id")
    .eq("lead_id", leadId);

  assert(
    notesData?.length === 1 && notesData[0].author_id === testUserId,
    "Internal note recorded separately in lead_notes table without modifying customer message"
  );

  // 5. Verify immutable audit log record created
  const { data: auditData } = await adminClient
    .from("audit_logs")
    .select("action, entity_id, metadata")
    .eq("entity_id", leadId)
    .eq("action", "update_lead_status")
    .single();

  assert(
    Boolean(auditData) && auditData?.metadata?.new_status === "qualified",
    "Audit log recorded atomic transition in audit_logs ledger"
  );

  // ----------------------------------------------------------------------------
  // GROUP 4: Security Protections & Deactivated Account Defense
  // ----------------------------------------------------------------------------
  console.log("\n--- TEST GROUP 4: Account Deactivation & RLS Defense ---");

  // Deactivate the test administrator account
  await adminClient.from("profiles").update({ is_active: false }).eq("id", testUserId);

  // Verify deactivated user cannot perform RPC
  const { error: deactiveRpcError } = await userClient.rpc("update_lead_status_with_audit", {
    p_lead_id: leadId,
    p_new_status: "closed",
  });
  assert(Boolean(deactiveRpcError), "Deactivated administrator is rejected by PostgreSQL security definer (42501)");

  // Anonymous user cannot query contact_leads
  const { data: anonLeads, error: anonError } = await anonClient.from("contact_leads").select("*");
  assert(anonLeads?.length === 0 || Boolean(anonError), "Anonymous visitor cannot read contact_leads (RLS enforced)");

  // Anonymous user cannot query audit_logs
  const { data: anonLogs, error: anonLogErr } = await anonClient.from("audit_logs").select("*");
  assert(anonLogs?.length === 0 || Boolean(anonLogErr), "Anonymous visitor cannot read audit_logs (RLS enforced)");

  // ----------------------------------------------------------------------------
  // CLEANUP
  // ----------------------------------------------------------------------------
  console.log("\n--- Cleaning up temporary test records ---");
  await adminClient.from("contact_leads").delete().eq("id", leadId);
  await adminClient.from("audit_logs").delete().eq("actor_id", testUserId);
  await adminClient.from("profiles").delete().eq("id", testUserId);
  await adminClient.auth.admin.deleteUser(testUserId);
  console.log("[CLEANUP] Test lead, audit records, profile, and auth user purged.");

  console.log("\n================================================================================");
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("================================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("[FATAL ERROR]", err);
  process.exit(1);
});
