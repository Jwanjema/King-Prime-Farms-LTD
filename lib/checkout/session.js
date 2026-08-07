import "server-only";
import { EncryptJWT, jwtDecrypt } from "jose";
import { createHash } from "crypto";

export const CHECKOUT_COOKIE = "kpf_checkout";
const MAX_AGE_SECONDS = 15 * 60;

function getKey() {
  return createHash("sha256").update(process.env.CHECKOUT_TOKEN_SECRET).digest();
}

// Bearer token + resolved numeric order id live only in this encrypted,
// short-lived cookie — never in a database or in-memory store, so this is
// safe on serverless deploys where nothing persists across invocations.
export async function sealCheckoutSession({ token, orderId, orderNumber }) {
  return new EncryptJWT({ token, orderId, orderNumber })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .encrypt(getKey());
}

export async function unsealCheckoutSession(jwe) {
  if (!jwe) return null;
  try {
    const { payload } = await jwtDecrypt(jwe, getKey());
    return { token: payload.token, orderId: payload.orderId, orderNumber: payload.orderNumber };
  } catch {
    // Missing, expired, or tampered — callers treat this the same as "no session".
    return null;
  }
}

export const checkoutCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
