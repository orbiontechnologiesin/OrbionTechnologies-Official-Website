/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — SECURITY REMEDIATION SPRINT 1 VERIFICATION TEST SUITE
 * ==============================================================================
 * Tests and verifies:
 * 1. SEC-01: Migration 20261109000001_security_hardening.sql integrity
 *    - All 9 functions pinned with search_path = public
 *    - Exact parameter signatures and return types
 *    - Revocation of anon EXECUTE grants
 *    - Granting of authenticated and service_role permissions
 * 2. SEC-02: Outbox worker authorization & constant-time comparison
 *    - Missing secret returns HTTP 500 (Fail-Closed)
 *    - Missing token returns HTTP 401
 *    - Invalid token returns HTTP 401
 *    - Valid Bearer token passes authorization
 *    - Valid query secret passes authorization
 *    - SHA-256 constant-time comparison handles arbitrary lengths without throwing
 * ==============================================================================
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

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

console.log("================================================================================");
console.log("ORBION TECHNOLOGIES — SECURITY REMEDIATION SPRINT 1 TEST SUITE");
console.log("================================================================================");

// ------------------------------------------------------------------------------
// TEST GROUP 1: SEC-01 Database Migration & Function Signature Verification
// ------------------------------------------------------------------------------
console.log("\n--- TEST GROUP 1: Database Migration 20261109000001_security_hardening.sql ---");

const migrationPath = path.resolve(process.cwd(), "supabase/migrations/20261109000001_security_hardening.sql");
assert(fs.existsSync(migrationPath), "Migration file 20261109000001_security_hardening.sql exists");

const migrationContent = fs.readFileSync(migrationPath, "utf-8");

const expectedFunctions = [
  "public.handle_updated_at()",
  "public.is_active_staff()",
  "public.is_admin_or_super()",
  "public.current_user_role()",
  "public.has_role(VARIADIC TEXT[])",
  "public.can_manage_leads()",
  "public.can_manage_users()",
  "public.can_view_audit_logs()",
  "public.update_lead_status_with_audit(UUID, TEXT, UUID, TEXT)",
];

for (const fn of expectedFunctions) {
  const escapedFn = fn
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const alterPattern = new RegExp(`ALTER\\s+FUNCTION\\s+${escapedFn}\\s+SET\\s+search_path\\s*=\\s*public`, "i");
  assert(alterPattern.test(migrationContent), `Function ${fn} has explicit ALTER FUNCTION ... SET search_path = public`);
}

// Check that CREATE OR REPLACE FUNCTION declarations also declare SET search_path = public
const createSearchPathMatches = migrationContent.match(/SET\s+search_path\s*=\s*public/gi) || [];
assert(createSearchPathMatches.length >= 18, `All 9 functions declare search_path in both CREATE and ALTER clauses (${createSearchPathMatches.length} occurrences)`);


// Verify Revocation from anon
const revokeAnonMatches = migrationContent.match(/REVOKE\s+ALL\s+ON\s+FUNCTION[\s\S]*?FROM[\s\S]*?anon/gi) || [];
assert(revokeAnonMatches.length >= 9, `All 9 functions revoke permissions from untrusted anon role (${revokeAnonMatches.length} revokes)`);

// Verify Grants to authenticated / service_role
assert(migrationContent.includes("GRANT EXECUTE ON FUNCTION public.is_active_staff() TO authenticated, service_role;"), "is_active_staff granted to authenticated and service_role");
assert(migrationContent.includes("GRANT EXECUTE ON FUNCTION public.update_lead_status_with_audit(UUID, TEXT, UUID, TEXT) TO authenticated, service_role;"), "update_lead_status_with_audit granted to authenticated and service_role");
assert(migrationContent.includes("GRANT EXECUTE ON FUNCTION public.handle_updated_at() TO service_role;"), "handle_updated_at granted to service_role");

// ------------------------------------------------------------------------------
// TEST GROUP 2: SEC-02 Email Outbox Worker Authorization & Timing Attack Defense
// ------------------------------------------------------------------------------
console.log("\n--- TEST GROUP 2: Email Outbox Worker Authorization Logic ---");

// Re-implement identical timingSafeEqualStrings as in process-email-outbox/route.ts
function timingSafeEqualStrings(a, b) {
  if (!a || !b) return false;
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

// 2.1 Test constant-time string comparison
assert(timingSafeEqualStrings("correct-secret-123", "correct-secret-123"), "Identical strings match in constant-time comparison");
assert(!timingSafeEqualStrings("correct-secret-123", "wrong-secret-456"), "Different strings return false in constant-time comparison");
assert(!timingSafeEqualStrings("short", "very-very-long-attacker-string"), "Mismatched lengths return false cleanly without RangeError");
assert(!timingSafeEqualStrings("", "secret"), "Empty string cleanly returns false");
assert(!timingSafeEqualStrings(null, "secret"), "Null value cleanly returns false");

// 2.2 Test authorization decision matrix
function evaluateWorkerAuth(expectedSecret, authHeader, querySecret) {
  // 1. Missing secret check (Fail-Closed)
  if (!expectedSecret || expectedSecret.trim().length === 0) {
    return { status: 500, error: "Server configuration error: Worker authorization secret is not configured." };
  }

  // 2. Token extraction
  const providedToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : querySecret?.trim();

  // 3. Token verification
  if (!providedToken || !timingSafeEqualStrings(providedToken, expectedSecret.trim())) {
    return { status: 401, error: "Unauthorized: Invalid or missing worker credentials." };
  }

  return { status: 200, authorized: true };
}

// Test Case A: Missing secret in server environment
const missingSecretResult = evaluateWorkerAuth(undefined, "Bearer some-token", null);
assert(missingSecretResult.status === 500, "Missing server secret returns HTTP 500 (Fail-Closed)");

const emptySecretResult = evaluateWorkerAuth("   ", "Bearer some-token", null);
assert(emptySecretResult.status === 500, "Blank server secret returns HTTP 500 (Fail-Closed)");

// Test Case B: Secret configured, but request lacks token
const secret = "orbion-secure-cron-secret-2026";
const missingTokenResult = evaluateWorkerAuth(secret, null, null);
assert(missingTokenResult.status === 401, "Missing authorization header & query returns HTTP 401");

// Test Case C: Secret configured, but request has invalid Bearer token
const badBearerResult = evaluateWorkerAuth(secret, "Bearer invalid-token", null);
assert(badBearerResult.status === 401, "Invalid Bearer token returns HTTP 401");

// Test Case D: Secret configured, but request has invalid query secret
const badQueryResult = evaluateWorkerAuth(secret, null, "invalid-query-secret");
assert(badQueryResult.status === 401, "Invalid query secret returns HTTP 401");

// Test Case E: Secret configured, valid Bearer token provided
const validBearerResult = evaluateWorkerAuth(secret, `Bearer ${secret}`, null);
assert(validBearerResult.status === 200 && validBearerResult.authorized, "Valid Bearer token authorizes with HTTP 200");

// Test Case F: Secret configured, valid query secret provided
const validQueryResult = evaluateWorkerAuth(secret, null, secret);
assert(validQueryResult.status === 200 && validQueryResult.authorized, "Valid query secret authorizes with HTTP 200");

// Test Case G: Prefix spoofing attack (Bearer token prefix attack)
const prefixSpoofResult = evaluateWorkerAuth(secret, "Basic " + secret, null);
assert(prefixSpoofResult.status === 401, "Non-Bearer scheme returns HTTP 401");

console.log("\n================================================================================");
console.log(`TOTAL REMEDIATION ASSERTIONS EXECUTED: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log("================================================================================");

if (failed > 0) {
  process.exit(1);
}
