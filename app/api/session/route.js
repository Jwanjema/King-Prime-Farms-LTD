import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";

const SESSION_COOKIE = "__session";
const EXPIRES_IN = 5 * 24 * 60 * 60 * 1000; // 5 days — Firebase's max for session cookies

export async function POST(request) {
  const { idToken } = await request.json();
  if (!idToken) {
    return Response.json({ error: "Missing idToken" }, { status: 400 });
  }

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail || decoded.email?.toLowerCase() !== adminEmail.toLowerCase()) {
      return Response.json({ error: "Not authorized" }, { status: 403 });
    }

    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: EXPIRES_IN });
    cookies().set(SESSION_COOKIE, sessionCookie, {
      maxAge: EXPIRES_IN / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }
}

export async function DELETE() {
  cookies().delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}
