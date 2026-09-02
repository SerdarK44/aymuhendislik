import { NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/db";
import { signAdminToken, AUTH_COOKIE_NAME } from "@/lib/auth";

// Brute-force protection for login
const LOGIN_RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_LOGIN_ATTEMPTS = 5;
const loginAttempts = new Map<string, { count: number; timestamp: number }>();

function isLoginRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record) {
    return false;
  }

  if (now - record.timestamp > LOGIN_RATE_LIMIT_WINDOW) {
    loginAttempts.delete(ip);
    return false;
  }

  return record.count >= MAX_LOGIN_ATTEMPTS;
}

function recordFailedLogin(ip: string) {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record || now - record.timestamp > LOGIN_RATE_LIMIT_WINDOW) {
    loginAttempts.set(ip, { count: 1, timestamp: now });
  } else {
    record.count += 1;
  }
}

function resetLoginAttempts(ip: string) {
  loginAttempts.delete(ip);
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";

    if (isLoginRateLimited(ip)) {
      return NextResponse.json(
        { error: "Çok fazla hatalı giriş denemesi yaptınız. Lütfen 10 dakika sonra tekrar deneyin." },
        { status: 429 }
      );
    }

    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Kullanıcı adı ve şifre gereklidir." }, { status: 400 });
    }

    const admin = verifyAdminCredentials(String(username).trim(), String(password));
    if (!admin) {
      recordFailedLogin(ip);
      return NextResponse.json({ error: "Geçersiz kullanıcı adı veya şifre!" }, { status: 401 });
    }

    resetLoginAttempts(ip);

    const token = signAdminToken({ id: admin.id, username: admin.username, name: admin.name });
    
    const response = NextResponse.json({ success: true, user: { username: admin.username, name: admin.name } });
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Giriş işlemi sırasında hata oluştu." }, { status: 500 });
  }
}
