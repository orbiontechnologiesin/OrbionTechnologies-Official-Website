import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Better Auth standard session cookie names across HTTP and HTTPS
  const sessionToken =
    request.cookies.get('better-auth.session_token')?.value ||
    request.cookies.get('__Secure-better-auth.session_token')?.value;

  const { pathname } = request.nextUrl;

  // Protect dashboard routes
  if (!sessionToken && pathname.startsWith('/dashboard')) {
    const signInUrl = new URL('/auth/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users away from auth pages to dashboard
  if (
    sessionToken &&
    (pathname === '/auth/sign-in' ||
      pathname === '/auth/sign-up' ||
      pathname === '/login' ||
      pathname === '/register')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - brand (brand assets)
     * - static assets with extensions (.svg, .png, .jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|brand/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
