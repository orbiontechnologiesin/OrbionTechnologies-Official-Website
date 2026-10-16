import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim();

  return Boolean(
    url &&
    key &&
    !url.includes('placeholder') &&
    !key.includes('placeholder') &&
    url.startsWith('https://')
  );
}

let browserClient: SupabaseClient | null = null;

export function createClient(): SupabaseClient {
  if (browserClient) return browserClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseKey = (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim();

  if (!isSupabaseConfigured()) {
    // Return a dummy client during build/static evaluation, or an interceptor at runtime
    // NEVER navigate to or contact placeholder.supabase.co
    const dummyClient = createBrowserClient(
      'https://unconfigured-project.supabase.co',
      'unconfigured-dummy-key-do-not-use'
    );

    // Intercept auth methods to provide instant user diagnostics rather than DNS NXDOMAIN errors
    const unconfiguredError = {
      message:
        'Supabase backend is not configured. Please define NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your deployment environment.',
      name: 'SupabaseConfigurationError',
      status: 503,
    };

    dummyClient.auth.signInWithOAuth = async () => ({
      data: { provider: 'google', url: null },
      error: unconfiguredError as any,
    });
    dummyClient.auth.signInWithPassword = async () => ({
      data: { user: null, session: null },
      error: unconfiguredError as any,
    });
    dummyClient.auth.signInWithOtp = async () => ({
      data: { user: null, session: null, messageId: null },
      error: unconfiguredError as any,
    });
    dummyClient.auth.signUp = async () => ({
      data: { user: null, session: null },
      error: unconfiguredError as any,
    });
    dummyClient.auth.resetPasswordForEmail = async () => ({
      data: null,
      error: unconfiguredError as any,
    });

    return dummyClient;
  }

  browserClient = createBrowserClient(supabaseUrl!, supabaseKey!);
  return browserClient;
}
