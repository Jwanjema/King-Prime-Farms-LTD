import { cookies } from "next/headers";
import { getOrderStatusByNumber } from "@/lib/campdavid/orders";
import { unsealCheckoutSession, CHECKOUT_COOKIE } from "@/lib/checkout/session";

export async function GET(request, { params }) {
  const session = await unsealCheckoutSession(cookies().get(CHECKOUT_COOKIE)?.value);
  if (!session || session.orderNumber !== params.orderNumber) {
    return Response.json({ error: "session_expired" }, { status: 401 });
  }

  // Deliberately not using GET /api/orders here — see getOrderStatusByNumber
  // in lib/campdavid/orders.js for why (a backend bug in OrderItems'
  // appended attributes 500s that endpoint for any order with a bad
  // product/package/tag reference, anywhere in the system).
  const status = await getOrderStatusByNumber(params.orderNumber);
  if (!status) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }

  if (status.isPaid) {
    cookies().delete(CHECKOUT_COOKIE);
  }

  return Response.json(status);
}
