"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminSignIn } from "@/lib/firebase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const cred = await adminSignIn(email, password);
      const idToken = await cred.user.getIdToken();
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Sign-in failed");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message === "Not authorized" ? "This account isn't authorized for admin access." : "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ink)", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 380, background: "var(--cream)", padding: "36px 32px", borderRadius: 2 }}>
        <div className="sec-eyebrow tag" style={{ marginBottom: 6 }}>Kings Prime Farms</div>
        <h1 style={{ fontSize: 24, marginBottom: 24 }}>Admin sign in</h1>
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
