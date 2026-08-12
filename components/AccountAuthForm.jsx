"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCustomerAccount, loginCustomer, resetCustomerPassword, sendPasswordResetCode, verifyPasswordResetCode } from "@/lib/account/actions";

export default function AccountAuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [resetStep, setResetStep] = useState("phone");
  const [resetPhone, setResetPhone] = useState("");
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

    let result;
    if (mode === "reset") {
      if (resetStep === "phone") {
        result = await sendPasswordResetCode({ phone: payload.phone });
        if (result.ok) {
          setResetPhone(payload.phone);
          setResetStep("code");
        }
      } else if (resetStep === "code") {
        result = await verifyPasswordResetCode({ code: formData.get("code")?.toString().trim() });
        if (result.ok) setResetStep("password");
      } else {
        result = await resetCustomerPassword({ phone: resetPhone, password: payload.password });
      }
    } else {
      result = mode === "login" ? await loginCustomer(payload) : await createCustomerAccount(payload);
    }
    setPending(false);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    if (mode === "reset" && resetStep !== "password") {
      setMessage(result.message);
      return;
    }

    router.refresh();
  }

  function switchMode(nextMode) {
    setMessage(null);
    setMode(nextMode);
    setResetStep("phone");
    setResetPhone("");
  }

  const title = mode === "login" ? "Sign in to track orders" : mode === "create" ? "Create your order account" : "Reset your password";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 28, alignItems: "start" }} className="account-auth-grid">
      <div>
        <h2>{title}</h2>
        <p style={{ color: "#5B5B50", marginTop: 8, marginBottom: 22 }}>
          {mode === "reset"
            ? "Enter your phone number, verify the SMS code, then choose a new password."
            : "Use the phone number from checkout. If the website created your account during checkout, CampDavid sends the password by SMS."}
        </p>

        <form onSubmit={handleSubmit} style={{ maxWidth: 460 }}>
          {mode === "create" && (
            <div className="field">
              <label htmlFor="account-name">Full name</label>
              <input id="account-name" name="name" required placeholder="Jane Wanjiru" />
            </div>
          )}
          {(mode !== "reset" || resetStep === "phone") && (
            <div className="field">
              <label htmlFor="account-phone">Phone number</label>
              <input id="account-phone" name="phone" required placeholder="07XX XXX XXX" defaultValue={resetPhone} />
            </div>
          )}
          {mode === "reset" && resetStep === "code" && (
            <div className="field">
              <label htmlFor="reset-code">SMS code</label>
              <input id="reset-code" name="code" required placeholder="6 digit code" />
            </div>
          )}
          {(mode !== "reset" || resetStep === "password") && (
            <div className="field">
              <label htmlFor="account-password">{mode === "reset" ? "New password" : "Password"}</label>
              <input id="account-password" name="password" type="password" required minLength={4} />
            </div>
          )}

          {message && <p style={{ color: "var(--beef)", marginBottom: 16 }}>{message}</p>}

          <button type="submit" className="btn btn-gold" disabled={pending} style={{ width: "100%", justifyContent: "center" }}>
            {pending ? "Please wait..." : mode === "login" ? "Sign in" : mode === "create" ? "Create account" : resetStep === "phone" ? "Send SMS code" : resetStep === "code" ? "Verify code" : "Reset password"}
          </button>

          {mode === "login" && (
            <button type="button" onClick={() => switchMode("reset")} style={{ marginTop: 14, background: "none", border: "none", color: "var(--gold-deep)", padding: 0 }}>
              Forgot password?
            </button>
          )}
          {mode === "reset" && (
            <button type="button" onClick={() => switchMode("login")} style={{ marginTop: 14, background: "none", border: "none", color: "var(--gold-deep)", padding: 0 }}>
              Back to sign in
            </button>
          )}
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
            switchMode(mode === "login" ? "create" : "login");
          }}
        >
          {mode === "login" ? "Create account" : "I already have an account"}
        </button>
      </div>
    </div>
  );
}
