"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signUp(form);
      router.push("/account");
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="page-hero tex-pine">
        <div className="wrap">
          <div className="eyebrow tag">Create account</div>
          <h1>Sign up</h1>
          <p className="lead">Create an account to place orders and track them from your dashboard.</p>
        </div>
      </div>

      <section>
        <div className="wrap" style={{ maxWidth: 460, margin: "0 auto" }}>
          <form onSubmit={submit}>
            <GoogleSignInButton />
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" required value={form.name} onChange={set("name")} placeholder="Jane Wanjiku" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com" />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" value={form.phone} onChange={set("phone")} placeholder="+254 7XX XXX XXX" />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" required minLength={6} value={form.password} onChange={set("password")} placeholder="At least 6 characters" />
            </div>
            {error && <p style={{ color: "var(--beef)", fontSize: 13.5, marginBottom: 16 }}>{error}</p>}
            <button type="submit" disabled={busy} className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
              {busy ? "Creating account…" : "Create account"}
            </button>
            <p style={{ fontSize: 13.5, color: "#4A4A40", marginTop: 16, textAlign: "center" }}>
              Already have an account? <Link href="/sign-in">Sign in</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

function friendlyError(err) {
  const code = err?.code || "";
  if (code.includes("email-already-in-use")) return "An account with this email already exists.";
  if (code.includes("invalid-email")) return "That email address doesn't look right.";
  if (code.includes("weak-password")) return "Please choose a stronger password (6+ characters).";
  return "Something went wrong creating your account. Please try again.";
}
