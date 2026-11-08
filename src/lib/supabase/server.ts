import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getPublicEnv, isSupabaseConfigured } from "@/lib/env";
import type { Database } from "@/types/database";

/**
 * Creates a server-side Supabase client for Server Components, Route Handlers,
 * and Server Actions.
 * 
 * Rules:
 * 1. Handles Next.js 15+ asynchronous `cookies()` store safely.
 * 2. Uses only public project URL and publishable key (requests act with caller permissions).
 * 3. Safely catches cookie modification errors when invoked inside read-only Server Components.
 * 4. Strictly respects Row Level Security policies active on the database.
 */
export async function createClient(): Promise<SupabaseClient<Database>> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "[Orbion Supabase Error] Supabase credentials are not configured in your environment.\n" +
      "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your .env.local file."
    );
  }

  const { supabaseUrl, supabasePublishableKey } = getPublicEnv();
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  });
}

