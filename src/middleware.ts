import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — EDGE SESSION INTERCEPTION & REFRESH MIDDLEWARE
 * ==============================================================================
 * 1. Automatically refreshes expired Supabase Auth tokens on active user requests.
 * 2. Protects `/admin/*` routes from unauthorized browser access.
 * 3. Redirects authenticated administrators away from `/admin/login` to `/admin/dashboard`.
 * 4. Implements open-redirect defense for the `?next=` query parameter.
 * ==============================================================================
 */
export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Let public assets and internal API jobs pass through immediately
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/brand") ||
    pathname.startsWith("/favicon") ||
    pathname === "/api/health" ||
    pathname.startsWith("/api/jobs")
  ) {
    return NextResponse.next();
  }

  // Only apply auth guard to /admin routes and /api/admin routes
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  if (!isAdminRoute && !isAdminApiRoute) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    // If Supabase is unconfigured, let page load and show server-side configuration guide
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Cryptographically verify user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPublicAuthRoute =
    pathname === "/admin/login" ||
    pathname === "/admin/forgot-password" ||
    pathname === "/admin/reset-password";

  const isPublicAuthApiRoute = pathname.startsWith("/api/admin/auth");

  // Case 1: Unauthenticated user trying to access protected admin page
  if (!user && isAdminRoute && !isPublicAuthRoute) {
    const safeNext = encodeURIComponent(pathname);
    const redirectUrl = new URL(`/admin/login?next=${safeNext}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Case 2: Unauthenticated user trying to call protected admin API
  if (!user && isAdminApiRoute && !isPublicAuthApiRoute) {
    return NextResponse.json(
      { success: false, message: "Authentication required." },
      { status: 401 }
    );
  }

  // Case 3: Authenticated user accessing login or forgot-password
  if (user && isPublicAuthRoute) {
    const nextParam = searchParams.get("next");
    const targetUrl =
      nextParam && nextParam.startsWith("/admin") && !nextParam.startsWith("/admin/login")
        ? nextParam
        : "/admin/dashboard";
    return NextResponse.redirect(new URL(targetUrl, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

