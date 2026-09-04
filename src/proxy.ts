import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("ay_admin_token")?.value;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    // If accessing login page while already authenticated, redirect to /admin dashboard
    if (pathname === "/admin/login") {
      if (token) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next({ request: { headers: requestHeaders } });
    }

    // If accessing any other admin route without token, redirect to /admin/login
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|logo/|uploads/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
