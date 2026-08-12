"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCustomerAccount, loginCustomer } from "@/lib/account/actions";

export default function AccountAuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name")?.toString().trim(),
      phone: formData.get("phone")?.toString().trim(),
      password: formData.get("password")?.toString(),
    };

    const result = mode === "login" ? await loginCustomer(payload) : await createCustomerAccount(payload);
    setPending(false);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    router.refresh();
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 28, alignItems: "start" }} className="account-auth-grid">
      <div>
        <h2>{mode === "login" ? "Sign in to track orders" : "Create your order account"}</h2>
        <p style={{ color: "#5B5B50", marginTop: 8, marginBottom: 22 }}>
          Use the phone number from checkout. If the website created your account during checkout, CampDavid sends the password by SMS.
        </p>

        <form onSubmit={handleSubmit} style={{ maxWidth: 460 }}>
          {mode === "create" && (
            <div className="field">
              <label htmlFor="account-name">Full name</label>
              <input id="account-name" name="name" required placeholder="Jane Wanjiru" />
            </div>
          )}
          <div className="field">
            <label htmlFor="account-phone">Phone number</label>
            <input id="account-phone" name="phone" required placeholder="07XX XXX XXX" />
          </div>
          <div className="field">
            <label htmlFor="account-password">Password</label>
            <input id="account-password" name="password" type="password" required minLength={4} />
          </div>

          {message && <p style={{ color: "var(--beef)", marginBottom: 16 }}>{message}</p>}

          <button type="submit" className="btn btn-gold" disabled={pending} style={{ width: "100%", justifyContent: "center" }}>
            {pending ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>

      <div style={{ border: "1px solid var(--line-dark)", padding: 24, background: "var(--cream-dim)" }}>
        <h3 style={{ marginBottom: 10 }}>New here?</h3>
        <p style={{ color: "#5B5B50", marginBottom: 18 }}>
          Creating an account keeps your retail orders, payment state, cancellations and delivery progress tied to your phone number.
        </p>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => {
            setMessage(null);
            setMode(mode === "login" ? "create" : "login");
          }}
        >
          {mode === "login" ? "Create account" : "I already have an account"}
        </button>
      </div>
    </div>
  );
}
