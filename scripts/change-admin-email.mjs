/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — ADMIN EMAIL UPDATE UTILITY
 * ==============================================================================
 * Secure administrative script to change the email address of an admin or super_admin.
 * 
 * Synchronizes:
 * 1. Supabase Auth (`auth.users`) credentials & auto-confirms the new email.
 * 2. Public profile table (`public.profiles.email`).
 * 3. Immutable audit ledger (`audit_logs`).
 * 
 * Usage:
 *   node scripts/change-admin-email.mjs --current <old_email> --new <new_email>
 *   node scripts/change-admin-email.mjs --new <new_email>
 *   node scripts/change-admin-email.mjs (interactive prompts)
 * ==============================================================================
 */

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

// 1. Load environment variables from .env.local
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !secretKey) {
  console.error("\n[ERROR] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY.");
  console.error("Please configure your .env.local file before running this utility.\n");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, secretKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

function parseArgs() {
  const args = process.argv.slice(2);
  const params = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].slice(2);
      const val = args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : true;
      params[key] = val;
    }
  }
  return params;
}

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

async function main() {
  console.log("================================================================================");
  console.log("ORBION TECHNOLOGIES — ADMIN EMAIL UPDATE UTILITY");
  console.log("================================================================================");
  console.log(`Connected to: ${supabaseUrl}\n`);

  const args = parseArgs();
  let currentEmail = args.current;
  let newEmail = args.new;

  // Retrieve existing users to assist
  const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error("[ERROR] Failed to query auth users:", listError.message);
    process.exit(1);
  }

  const users = listData.users || [];

  if (!currentEmail) {
    if (users.length === 1) {
      currentEmail = users[0].email;
      console.log(`Detected single existing administrator: ${currentEmail}`);
    } else {
      currentEmail = await prompt("Enter Current Admin Email (e.g. exobhavinss@outlook.com): ");
    }
  }

  const targetUser = users.find(
    (u) => u.email?.toLowerCase() === currentEmail?.toLowerCase()
  );

  if (!targetUser) {
    console.error(`\n[ERROR] No account found in Supabase Auth matching: ${currentEmail}`);
    if (users.length > 0) {
      console.log("Available accounts:");
      users.forEach((u) => console.log(` - ${u.email} (ID: ${u.id})`));
    }
    process.exit(1);
  }

  if (!newEmail) {
    newEmail = await prompt("Enter New Admin Email Address: ");
  }

  newEmail = newEmail.trim().toLowerCase();

  if (!EMAIL_REGEX.test(newEmail)) {
    console.error("\n[ERROR] Invalid email format. Please provide a valid email address.");
    process.exit(1);
  }

  if (newEmail === targetUser.email.toLowerCase()) {
    console.log("\n[INFO] The new email is identical to the current email. No changes made.");
    process.exit(0);
  }

  // Check if new email is already in use
  const existingNewUser = users.find(
    (u) => u.email?.toLowerCase() === newEmail && u.id !== targetUser.id
  );
  if (existingNewUser) {
    console.error(`\n[ERROR] Email ${newEmail} is already registered by another account (ID: ${existingNewUser.id}).`);
    process.exit(1);
  }

  console.log(`\nUpdating administrator email:`);
  console.log(`  Current: ${targetUser.email}`);
  console.log(`  New:     ${newEmail}`);
  console.log(`  User ID: ${targetUser.id}`);

  // 1. Update auth.users
  console.log("\n1. Updating Supabase Auth credentials...");
  const { error: authUpdateError } = await supabase.auth.admin.updateUserById(
    targetUser.id,
    {
      email: newEmail,
      email_confirm: true,
    }
  );

  if (authUpdateError) {
    console.error("[ERROR] Failed to update email in Supabase Auth:", authUpdateError.message);
    process.exit(1);
  }
  console.log("   ✓ Supabase Auth updated & email marked as confirmed.");

  // 2. Update public.profiles
  console.log("2. Updating public.profiles table...");
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      email: newEmail,
      updated_at: new Date().toISOString(),
    })
    .eq("id", targetUser.id);

  if (profileError) {
    console.error("[ERROR] Failed to update email in profiles table:", profileError.message);
    console.error("Rollback recommendation: Revert auth.users email manually or re-run with original email.");
    process.exit(1);
  }
  console.log("   ✓ Profiles table record updated.");

  // 3. Insert audit log
  console.log("3. Writing audit trail entry...");
  await supabase.from("audit_logs").insert({
    actor_id: targetUser.id,
    action: "admin_email_updated",
    entity_type: "profile",
    entity_id: targetUser.id,
    metadata: {
      old_email: targetUser.email,
      new_email: newEmail,
      timestamp: new Date().toISOString(),
    },
  });
  console.log("   ✓ Immutable audit log saved.");

  console.log("\n================================================================================");
  console.log("[SUCCESS] Administrator email successfully updated!");
  console.log(`New Login Email: ${newEmail}`);
  console.log(`User ID:         ${targetUser.id}`);
  console.log("================================================================================\n");
  console.log("You can now sign in with your new email at: /admin/login\n");
}

main().catch((err) => {
  console.error("[FATAL ERROR]", err);
  process.exit(1);
});

