import "server-only";
import { EncryptJWT, jwtDecrypt } from "jose";
import { createHash } from "crypto";

export const ACCOUNT_COOKIE = "kpf_account";
const MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

function getKey() {
  return createHash("sha256").update(process.env.CHECKOUT_TOKEN_SECRET).digest();
}

export async function sealAccountSession({ token, user }) {
  return new EncryptJWT({ token, user })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .encrypt(getKey());
}

export async function unsealAccountSession(jwe) {
  if (!jwe) return null;
  try {
    const { payload } = await jwtDecrypt(jwe, getKey());
    return { token: payload.token, user: payload.user || null };
  } catch {
    return null;
  }
}

export const accountCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
