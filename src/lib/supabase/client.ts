import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getPublicEnv, isSupabaseConfigured } from "@/lib/env";
import type { Database } from "@/types/database";

let browserClient: SupabaseClient<Database> | null = null;

/**
 * Creates or retrieves a cached browser-side Supabase client.
 * 
 * Rules:
 * 1. Uses ONLY public variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).
 * 2. Never exposes or references the service role key or secret credentials.
 * 3. Safe to call across any Client Component in Next.js App Router.
 * 4. Caches the instance in memory for client-side lifecycle efficiency.
 */
export function createClient(): SupabaseClient<Database> {
  if (browserClient) {
    return browserClient;
  }

  if (!isSupabaseConfigured()) {
    throw new Error(
      "[Orbion Supabase Error] Supabase credentials are not configured in your environment.\n" +
      "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your .env.local file."
    );
  }

  const { supabaseUrl, supabasePublishableKey } = getPublicEnv();

  browserClient = createBrowserClient<Database>(
    supabaseUrl,
    supabasePublishableKey
  );

  return browserClient;
}

export { createClient as createBrowserClient };

