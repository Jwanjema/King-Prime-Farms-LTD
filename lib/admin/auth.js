import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebase-admin";

const SESSION_COOKIE = "__session";

// Verifies the session cookie + admin allow-list. Returns the decoded claims
// on success, or redirects to /admin/login on failure. Called from
// app/admin/layout.jsx (page-load gate) AND from every Server Action
// (defense in depth — actions are independently invocable).
export async function requireAdmin() {
  const cookie = cookies().get(SESSION_COOKIE)?.value;
  if (!cookie) redirect("/admin/login");

  try {
    const decoded = await adminAuth.verifySessionCookie(cookie, true);
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail || decoded.email?.toLowerCase() !== adminEmail.toLowerCase()) {
      redirect("/admin/login");
    }
    return decoded;
  } catch {
    redirect("/admin/login");
  }
}
