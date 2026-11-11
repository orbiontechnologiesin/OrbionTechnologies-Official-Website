/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — SUPER ADMIN PROVISIONING UTILITY
 * ==============================================================================
 * Secure, server-side provisioning script to create or promote the initial
 * Super Administrator in Supabase Auth and the `profiles` table.
 *
 * SECURITY GUARANTEES:
 * 1. CLI / Server-only execution via SUPABASE_SECRET_KEY.
 * 2. Never exposed to browser runtimes or public HTTP endpoints.
 * 3. Does not hardcode credentials.
 * 4. Records the provisioning event in the immutable `audit_logs` table.
 *
 * Usage:
 *   node scripts/provision-super-admin.mjs --email admin@orbiontechnologies.in --password "YourStrongPassword123!" --name "Orbion Super Admin"
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

// Parse command line arguments
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

async function main() {
  console.log("================================================================================");
  console.log("ORBION TECHNOLOGIES — INITIAL SUPER ADMIN PROVISIONING");
  console.log("================================================================================");
  console.log(`Connected to: ${supabaseUrl}\n`);

  const args = parseArgs();

  let email = args.email;
  let password = args.password;
  let name = args.name;

  if (!email) {
    email = await prompt("Enter Super Admin Email: ");
  }
  if (!email || !email.includes("@")) {
    console.error("[ERROR] A valid email address is required.");
    process.exit(1);
  }

  if (!password) {
    password = await prompt("Enter Super Admin Password (min 8 chars): ");
  }
  if (!password || password.length < 8) {
    console.error("[ERROR] Password must be at least 8 characters.");
    process.exit(1);
  }

  if (!name) {
    name = (await prompt("Enter Full Name (e.g. Lead Architect): ")) || "Orbion Super Administrator";
  }

  console.log(`\nProvisioning Super Admin account for: ${email}`);

  // 1. Check if user already exists in auth.users
  const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error("[ERROR] Failed to query auth users:", listError.message);
    process.exit(1);
  }

  let user = listData.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  if (user) {
    console.log(`Found existing Auth user [${user.id}]. Updating credentials...`);
    const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        password,
        email_confirm: true,
        user_metadata: { full_name: name },
      }
    );
    if (updateError) {
      console.error("[ERROR] Failed to update user credentials:", updateError.message);
      process.exit(1);
    }
    user = updateData.user;
  } else {
    console.log("Creating new user in Supabase Auth...");
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: name },
    });
    if (createError) {
      console.error("[ERROR] Failed to create auth user:", createError.message);
      process.exit(1);
    }
    user = createData.user;
  }

  // 2. Upsert profile with 'super_admin' role
  console.log("Upserting profile record with 'super_admin' role...");
  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: email.toLowerCase(),
      full_name: name,
      role: "super_admin",
      is_active: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (profileError) {
    console.error("[ERROR] Failed to upsert profile record:", profileError.message);
    process.exit(1);
  }

  // 3. Record in audit_logs
  console.log("Writing immutable audit log entry...");
  await supabase.from("audit_logs").insert({
    actor_id: user.id,
    action: "provision_super_admin",
    entity_type: "profile",
    entity_id: user.id,
    metadata: {
      email: email.toLowerCase(),
      role: "super_admin",
      method: "cli_provisioning",
      timestamp: new Date().toISOString(),
    },
  });

  console.log("\n================================================================================");
  console.log("[SUCCESS] Super Admin account provisioned successfully!");
  console.log(`User ID:   ${user.id}`);
  console.log(`Email:     ${email}`);
  console.log(`Role:      super_admin`);
  console.log(`Status:    Active`);
  console.log("================================================================================\n");
  console.log("You can now sign in at: https://orbiontechnologies.in/admin/login");
}

main().catch((err) => {
  console.error("[FATAL ERROR]", err);
  process.exit(1);
});

