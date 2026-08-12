"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sendVerification, setPassword, signin, signup, verifyPhone } from "@/lib/campdavid/auth";
import { cancelOrder, getUserOrdersForDate } from "@/lib/campdavid/orders";
import { ACCOUNT_COOKIE, accountCookieOptions, sealAccountSession, unsealAccountSession } from "@/lib/account/session";

function splitName(name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  return {
    first_name: parts[0] || "Customer",
    last_name: parts.slice(1).join(" ") || "Web",
  };
}

async function saveAccountSession(authResult) {
  const token = authResult.data?.token;
  if (!token) return;
  const sealed = await sealAccountSession({ token, user: authResult.data?.user || null });
  cookies().set(ACCOUNT_COOKIE, sealed, accountCookieOptions);
}

export async function getAccountSession() {
  return unsealAccountSession(cookies().get(ACCOUNT_COOKIE)?.value);
}

export async function loginCustomer({ phone, password }) {
  if (!phone || !password) {
    return { ok: false, message: "Enter your phone number and password." };
  }

  const result = await signin({ phone, password });
  if (result.data?.success !== "1") {
    return { ok: false, message: result.data?.message || "Login failed. Please check your phone and password." };
  }

  await saveAccountSession(result);
  return { ok: true };
}

export async function createCustomerAccount({ name, phone, password }) {
  if (!phone || !password) {
    return { ok: false, message: "Enter your phone number and a password." };
  }

  const result = await signup({ phone, password, ...splitName(name), isCheckout: false });
  if (result.data?.success !== "1") {
    return { ok: false, message: result.data?.message || "We could not create that account." };
  }

  await saveAccountSession(result);
  return { ok: true };
}

export async function sendPasswordResetCode({ phone }) {
  if (!phone) {
    return { ok: false, message: "Enter your phone number." };
  }

  const result = await sendVerification({ phone });
  return {
    ok: result.data?.success === "1",
    message: result.data?.message || "We could not send the reset code.",
  };
}

export async function verifyPasswordResetCode({ code }) {
  if (!code) {
    return { ok: false, message: "Enter the SMS code." };
  }

  const result = await verifyPhone({ code });
  return {
    ok: result.data?.success === "1",
    message: result.data?.message || "We could not verify that code.",
  };
}

export async function resetCustomerPassword({ phone, password }) {
  if (!phone || !password) {
    return { ok: false, message: "Enter your phone number and new password." };
  }

  const result = await setPassword({ phone, password });
  if (result.data?.success !== "1") {
    return { ok: false, message: result.data?.message || "We could not reset that password." };
  }

  return loginCustomer({ phone, password });
}

export async function logoutCustomer() {
  cookies().delete(ACCOUNT_COOKIE);
  redirect("/account");
}

export async function cancelCustomerOrder(formData) {
  const session = await getAccountSession();
  if (!session?.token) {
    redirect("/account");
  }

  const orderId = formData.get("orderId")?.toString();
  const date = formData.get("date")?.toString();
  const reason = formData.get("reason")?.toString().trim();

  if (!orderId || !date || !reason) {
    redirect(`/account?date=${date || ""}&status=all&message=cancel-missing`);
  }

  const customerOrders = await getUserOrdersForDate(session.token, date);
  const order = customerOrders.find((item) => String(item.id) === orderId);

  if (!order || order.cancelled || order.isCancel || order.status === "Delivered") {
    redirect(`/account?date=${date}&status=all&message=cancel-unavailable`);
  }

  const result = await cancelOrder(session.token, { orderId, reason });
  const message = result.data?.success === "1" ? "cancelled" : "cancel-failed";
  redirect(`/account?date=${date}&status=cancelled&message=${message}`);
}
