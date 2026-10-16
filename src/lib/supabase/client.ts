import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Return a client initialized with fallback values during build/typecheck if envs are missing
    return createBrowserClient(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseKey || 'placeholder-anon-key'
    );
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
