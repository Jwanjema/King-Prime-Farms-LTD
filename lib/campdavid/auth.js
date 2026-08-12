import "server-only";
import { campdavidFetch } from "./client";

export async function signup({ phone, password, first_name, last_name, isCheckout = true }) {
  return campdavidFetch("/user-signup", {
    body: { phone, password, first_name, last_name, ...(isCheckout ? { is_checkout: "yes" } : {}) },
  });
}

// Unused by the v1 checkout flow (which only ever signs up fresh, never
// signs in — see lib/checkout/actions.js). Kept for a future "returning
// customer" flow. Note: signing in with an unknown phone throws a raw 500
// on the backend (User::where(...)->first() dereferenced without a null
// check), not clean JSON — callers must handle campdavidFetch returning
// { ok: false, data: null } for that case, not just data.success === "0".
export async function signin({ phone, password }) {
  return campdavidFetch("/user-signin", {
    body: { phone, password },
  });
}

export async function sendVerification({ phone }) {
  return campdavidFetch("/sendVerification", { body: { phone } });
}

export async function verifyPhone({ code }) {
  return campdavidFetch("/verifyPhone", { body: { code } });
}

export async function setPassword({ phone, password }) {
  return campdavidFetch("/setPassword", { body: { phone, password } });
}
