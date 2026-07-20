"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function SignIn() {
  return (
    <>
      <div className="page-hero tex-pine">
        <div className="wrap">
          <div className="eyebrow tag">Welcome back</div>
          <h1>Sign in</h1>
          <p className="lead">Sign in to manage your orders or your King Prime Farms dashboard.</p>
        </div>
      </div>

      <section>
        <div className="wrap" style={{ maxWidth: 460, margin: "0 auto" }}>
          <Suspense fallback={null}>
            <SignInForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { signIn } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { profile } = await signIn(form.email, form.password);
      const from = params.get("from");
      if (from) router.push(from);
      else if (profile?.role === "admin") router.push("/admin");
      else router.push("/account");
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <GoogleSignInButton from={params.get("from")} />
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com" />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" required value={form.password} onChange={set("password")} placeholder="Your password" />
      </div>
      {error && <p style={{ color: "var(--beef)", fontSize: 13.5, marginBottom: 16 }}>{error}</p>}
      <button type="submit" disabled={busy} className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
      <p style={{ fontSize: 13.5, color: "#4A4A40", marginTop: 16, textAlign: "center" }}>
        Don't have an account? <Link href="/sign-up">Sign up</Link>
      </p>
    </form>
  );
}

function friendlyError(err) {
  const code = err?.code || "";
  if (code.includes("user-not-found") || code.includes("wrong-password") || code.includes("invalid-credential")) {
    return "Incorrect email or password.";
  }
  if (code.includes("invalid-email")) return "That email address doesn't look right.";
  if (code.includes("too-many-requests")) return "Too many attempts. Please wait a moment and try again.";
  return "Something went wrong signing you in. Please try again.";
}
