import { cookies } from "next/headers";
import { getOrders } from "@/lib/campdavid/orders";
import { unsealCheckoutSession, CHECKOUT_COOKIE } from "@/lib/checkout/session";

export async function GET(request, { params }) {
  const session = await unsealCheckoutSession(cookies().get(CHECKOUT_COOKIE)?.value);
  if (!session || session.orderNumber !== params.orderNumber) {
    return Response.json({ error: "session_expired" }, { status: 401 });
  }

  const orders = await getOrders(session.token);
  const order = orders.find((o) => o.order_number === params.orderNumber);
  if (!order) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }

  if (order.isPaid) {
    cookies().delete(CHECKOUT_COOKIE);
  }

  return Response.json({ isPaid: !!order.isPaid, status: order.status });
}
