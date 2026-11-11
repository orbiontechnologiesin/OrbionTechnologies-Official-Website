import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

// Load .env.local
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
const secretKey = process.env.SUPABASE_SECRET_KEY;
const supabase = createClient(url, secretKey);

async function audit() {
  console.log("=== PHASE 3 PRE-IMPLEMENTATION AUDIT ===");
  console.log("Supabase URL:", url);

  // 1. Audit profiles
  const { data: profiles, error: profErr } = await supabase.from("profiles").select("*");
  console.log("\n1. Profiles count:", profiles ? profiles.length : "Error: " + profErr?.message);
  if (profiles && profiles.length > 0) {
    console.log("Existing profiles:", JSON.stringify(profiles, null, 2));
  }

  // 2. Audit auth.users
  const { data: authUsers, error: authErr } = await supabase.auth.admin.listUsers();
  console.log("\n2. Auth Users count:", authUsers ? authUsers.users.length : "Error: " + authErr?.message);
  if (authUsers?.users?.length > 0) {
    console.log("Existing Auth Users:", authUsers.users.map(u => ({ id: u.id, email: u.email, confirmed: u.email_confirmed_at })));
  }

  // 3. Audit contact_leads
  const { count: leadCount, error: leadErr } = await supabase.from("contact_leads").select("*", { count: "exact", head: true });
  console.log("\n3. Contact Leads count:", leadCount, "Error:", leadErr?.message || "none");

  // 4. Audit demo_requests
  const { count: demoCount, error: demoErr } = await supabase.from("demo_requests").select("*", { count: "exact", head: true });
  console.log("\n4. Demo Requests count:", demoCount, "Error:", demoErr?.message || "none");

  // 5. Audit newsletter_subscribers
  const { count: subCount, error: subErr } = await supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true });
  console.log("\n5. Newsletter Subscribers count:", subCount, "Error:", subErr?.message || "none");

  // 6. Audit audit_logs
  const { count: auditCount, error: auditErr } = await supabase.from("audit_logs").select("*", { count: "exact", head: true });
  console.log("\n6. Audit Logs count:", auditCount, "Error:", auditErr?.message || "none");

  // 7. Audit site_settings
  const { data: settings, error: setErr } = await supabase.from("site_settings").select("*");
  console.log("\n7. Site Settings count:", settings ? settings.length : "Error: " + setErr?.message);
}

audit().catch(console.error);

