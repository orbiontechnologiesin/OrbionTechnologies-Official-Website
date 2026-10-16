import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'placeholder-anon-key';

  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Only attempt auth check if Supabase is properly configured
  let user = null;
  if (isConfigured) {
    try {
      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch {
      user = null;
    }
  }

  // Route protection for dashboard
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboardRoute) {
    if (!user) {
      const signInUrl = new URL('/auth/sign-in', request.url);
      signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Enforce email verification requirement
    if (!user.email_confirmed_at && user.app_metadata?.provider === 'email') {
      const verifyUrl = new URL('/auth/verify', request.url);
      verifyUrl.searchParams.set('email', user.email || '');
      return NextResponse.redirect(verifyUrl);
    }
  }

  return supabaseResponse;
}
