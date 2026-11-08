import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getServerEnv, isSupabaseAdminConfigured } from "@/lib/env";
import type { Database } from "@/types/database";

let adminClientInstance: SupabaseClient<Database> | null = null;

/**
 * Creates a privileged administrative Supabase client using the Secret Key.
 * 
 * CRITICAL SECURITY CONSTRAINTS:
 * 1. Protected with `import "server-only"`; Next.js will refuse to compile if imported into a Client Component.
 * 2. Uses `SUPABASE_SECRET_KEY` which BYPASSES Row Level Security (RLS).
 * 3. Never use this client for operations that should be scoped to authenticated end-users.
 * 4. Never return this client, its credentials, or its un-sanitized internal states to the browser.
 * 5. Disables session persistence and token auto-refresh since this is a server daemon/worker identity.
 */
export function createAdminClient(): SupabaseClient<Database> {
  if (typeof window !== "undefined") {
    throw new Error(
      "[Orbion Security Violation] createAdminClient() was called in a client context. " +
      "Administrative credentials must never enter browser runtimes."
    );
  }

  if (adminClientInstance) {
    return adminClientInstance;
  }

  if (!isSupabaseAdminConfigured()) {
    throw new Error(
      "[Orbion Supabase Error] Supabase administrative secret key is not configured.\n" +
      "Please set SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY) in your server environment."
    );
  }

  const { supabaseUrl, supabaseSecretKey } = getServerEnv();

  adminClientInstance = createSupabaseClient<Database>(
    supabaseUrl,
    supabaseSecretKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );

  return adminClientInstance;
}

