"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminSignIn, adminSignInWithGoogle } from "@/lib/firebase";

async function exchangeForSession(idToken) {
  const res = await fetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Sign-in failed");
  }
}

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleAuthError = (err) => {
    setError(err.message === "Not authorized" ? "This account isn't authorized for admin access." : "Sign-in failed. Please try again.");
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const cred = await adminSignIn(email, password);
      await exchangeForSession(await cred.user.getIdToken());
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message === "Not authorized" ? "This account isn't authorized for admin access." : "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const cred = await adminSignInWithGoogle();
      await exchangeForSession(await cred.user.getIdToken());
      router.push("/admin");
      router.refresh();
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") handleAuthError(err);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ink)", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 380, background: "var(--cream)", padding: "36px 32px", borderRadius: 2 }}>
        <div className="sec-eyebrow tag" style={{ marginBottom: 6 }}>Kings Prime Farms</div>
        <h1 style={{ fontSize: 24, marginBottom: 24 }}>Admin sign in</h1>

        <button
          type="button"
          onClick={googleSignIn}
          disabled={googleLoading}
          className="btn btn-outline-dark"
          style={{ width: "100%", justifyContent: "center", marginBottom: 20, gap: 10 }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62Z" />
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.7H.96v2.33A9 9 0 0 0 9 18Z" />
            <path fill="#FBBC05" d="M3.96 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.28-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3-2.33Z" />
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3 2.33C4.67 5.16 6.66 3.58 9 3.58Z" />
          </svg>
          {googleLoading ? "Signing in…" : "Sign in with Google"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "var(--line-dark)" }} />
          <span style={{ fontSize: 11.5, color: "#8b8a7c" }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "var(--line-dark)" }} />
        </div>

        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@kingprimefarms.co.ke" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {error && <p style={{ color: "var(--beef)", fontSize: 13, marginBottom: 16 }}>{error}</p>}
          <button type="submit" className="btn btn-gold" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
