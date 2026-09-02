import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("ay_admin_token")?.value;

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    // If accessing login page while already authenticated, redirect to /admin dashboard
    if (pathname === "/admin/login") {
      if (token) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    // If accessing any other admin route without token, redirect to /admin/login
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
