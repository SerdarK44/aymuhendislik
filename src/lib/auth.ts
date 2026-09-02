import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "aymuhendislik-super-secret-key-2025-token-signature";
const COOKIE_NAME = "ay_admin_token";

export interface TokenPayload {
  id: string;
  username: string;
  name: string;
}

export function signAdminToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (e) {
    return null;
  }
}

export async function getSessionAdmin(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;
