import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  if (error) {
    console.error('[Supabase Auth Callback Error]:', error, errorDescription);
    const redirectUrl = new URL('/auth/sign-in', origin);
    redirectUrl.searchParams.set('error', errorDescription || error);
    return NextResponse.redirect(redirectUrl);
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (!exchangeError) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    } else {
      console.error('[Supabase Auth Exchange Error]:', exchangeError.message);
      const redirectUrl = new URL('/auth/sign-in', origin);
      redirectUrl.searchParams.set('error', exchangeError.message);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // No code provided, redirect back to sign-in
  return NextResponse.redirect(`${origin}/auth/sign-in`);
}
