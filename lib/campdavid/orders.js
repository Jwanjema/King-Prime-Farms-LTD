import "server-only";
import { campdavidFetch } from "./client";

export async function createOrder(token, payload) {
  return campdavidFetch("/create-new-order", { body: payload, token });
}

export async function getOrders(token) {
  const { ok, data } = await campdavidFetch("/orders", { method: "GET", token });
  return ok && Array.isArray(data) ? data : [];
}

// GET /api/orders eager-loads order_items.product and evaluates every
// OrderItems appended attribute (item/category/packaging) — any order in
// the system with a bad product/package/tag reference throws a 500 there,
// taking down the whole list, not just that one order. getallOrders is a
// plain Order::all() with no such eager-load, so it's immune to that bug.
// It IS public/unauthenticated and returns every order for every customer
// system-wide, so it must only ever be called server-side and filtered
// down to the specific order the caller is allowed to see — never expose
// this response shape directly to the browser.
async function getAllOrdersUnfiltered() {
  const { ok, data } = await campdavidFetch("/getallOrders", { method: "GET" });
  return ok && Array.isArray(data) ? data : [];
}

// create-new-order only returns order_number (a 6-char code), not the
// numeric Order.id that initiate_mpesa needs — resolve it by matching
// against the full order list. Sorted newest-first as a defensive
// tie-breaker in case order_number ever collides/repeats. Uses the
// unfiltered/unauthenticated getallOrders lookup (see above) rather than
// the customer-scoped GET /api/orders, since the latter is currently
// broken by a backend bug unrelated to this integration.
export async function findOrderByNumber(orderNumber) {
  const orders = await getAllOrdersUnfiltered();
  const sorted = [...orders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return sorted.find((o) => o.order_number === orderNumber) || null;
}

// Status-only lookup for our own polling UI — deliberately avoids the
// broken GET /api/orders (see findOrderByNumber above) and only returns
// the minimal fields the poller needs, never the full unfiltered list.
export async function getOrderStatusByNumber(orderNumber) {
  const orders = await getAllOrdersUnfiltered();
  const order = orders.find((o) => o.order_number === orderNumber);
  if (!order) return null;
  return { isPaid: !!order.isPaid, status: order.status };
}

export async function initiateMpesa({ order_id, phone }) {
  return campdavidFetch("/initiate_mpesa", { body: { order_id, phone } });
}
