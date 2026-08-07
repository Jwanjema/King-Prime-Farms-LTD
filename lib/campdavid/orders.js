import "server-only";
import { campdavidFetch } from "./client";

export async function createOrder(token, payload) {
  return campdavidFetch("/create-new-order", { body: payload, token });
}

export async function getOrders(token) {
  const { ok, data } = await campdavidFetch("/orders", { method: "GET", token });
  return ok && Array.isArray(data) ? data : [];
}

// create-new-order only returns order_number (a 6-char code), not the
// numeric Order.id that initiate_mpesa needs — resolve it by re-fetching
// the customer's order list and matching. Sorted newest-first as a
// defensive tie-breaker in case order_number ever collides/repeats.
export async function findOrderByNumber(token, orderNumber) {
  const orders = await getOrders(token);
  const sorted = [...orders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return sorted.find((o) => o.order_number === orderNumber) || null;
}

export async function initiateMpesa({ order_id, phone }) {
  return campdavidFetch("/initiate_mpesa", { body: { order_id, phone } });
}
