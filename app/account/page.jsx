import Link from "next/link";
import AccountAuthForm from "@/components/AccountAuthForm";
import { cancelCustomerOrder, getAccountSession, logoutCustomer } from "@/lib/account/actions";
import { getUserOrdersForDate } from "@/lib/campdavid/orders";
import { site } from "@/data/site";

export const metadata = { title: "My Orders" };
export const dynamic = "force-dynamic";

function today() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function money(value) {
  const amount = Number(value || 0);
  return `KES ${amount.toLocaleString("en-KE")}`;
}

function orderTotal(order) {
  return Number(order.order_amount ?? order.total ?? 0);
}

function statusBucket(order) {
  if (order.cancelled || order.isCancel) return "cancelled";
  if (order.status === "Delivered") return "delivered";
  if (order.status === "Shipping" || order.status === "Order Confirmed") return "active";
  return "pending";
}

function statusLabel(key) {
  return {
    all: "All",
    pending: "Pending",
    active: "Active",
    delivered: "Delivered",
    cancelled: "Cancelled",
  }[key];
}

function lineName(item) {
  return item.product?.name || item.item || item.custom_name || `Product #${item.product_id}`;
}

function canCancel(order) {
  return !order.cancelled && !order.isCancel && order.status !== "Delivered";
}

function flashMessage(message) {
  return {
    cancelled: "Order cancellation has been submitted. CampDavid will confirm and follow up.",
    "cancel-failed": "We could not cancel that order right now. Please try again or contact support.",
    "cancel-missing": "Please add a cancellation reason before submitting.",
    "cancel-unavailable": "That order is no longer available for cancellation.",
  }[message];
}

export default async function AccountPage({ searchParams }) {
  const session = await getAccountSession();
  const selectedDate = searchParams.date || today();
  const selectedStatus = searchParams.status || "all";
  const message = flashMessage(searchParams.message);

  if (!session?.token) {
    return (
      <>
        <section className="page-hero">
          <div className="wrap">
            <div className="tag sec-eyebrow">Retail account</div>
            <h1>My Orders</h1>
            <p className="lead">Sign in to see pending, active, delivered and cancelled orders from CampDavid checkout.</p>
          </div>
        </section>
        <section>
          <div className="wrap">
            <AccountAuthForm />
          </div>
        </section>
      </>
    );
  }

  const orders = await getUserOrdersForDate(session.token, selectedDate);
  const counts = orders.reduce(
    (acc, order) => {
      acc.all += 1;
      acc[statusBucket(order)] += 1;
      return acc;
    },
    { all: 0, pending: 0, active: 0, delivered: 0, cancelled: 0 }
  );
  const visibleOrders = selectedStatus === "all" ? orders : orders.filter((order) => statusBucket(order) === selectedStatus);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="tag sec-eyebrow">Retail account</div>
          <h1>My Orders</h1>
          <p className="lead">Track your CampDavid orders by date, payment state and fulfilment status.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="admin-list-head">
            <div>
              <h2 style={{ fontSize: 30 }}>Order tracking</h2>
              <p style={{ color: "#5B5B50", marginTop: 6 }}>Signed in as {session.user?.phone || "customer account"}</p>
            </div>
            <form action={logoutCustomer}>
              <button type="submit" className="btn btn-outline-dark">Sign out</button>
            </form>
          </div>

          <form method="GET" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "end", marginBottom: 22 }}>
            <div className="field" style={{ marginBottom: 0, minWidth: 220 }}>
              <label htmlFor="date">Order date</label>
              <input id="date" type="date" name="date" defaultValue={selectedDate} />
            </div>
            <input type="hidden" name="status" value={selectedStatus} />
            <button type="submit" className="btn btn-gold">Check date</button>
          </form>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 26 }}>
            {["all", "pending", "active", "delivered", "cancelled"].map((key) => (
              <Link
                key={key}
                href={`/account?date=${selectedDate}&status=${key}`}
                className={`btn btn-sm ${selectedStatus === key ? "btn-beef" : "btn-outline-dark"}`}
              >
                {statusLabel(key)} ({counts[key]})
              </Link>
            ))}
          </div>

          {message && (
            <div style={{ border: "1px solid var(--line-dark)", padding: 14, background: "var(--cream-dim)", marginBottom: 20 }}>
              {message}
            </div>
          )}

          {visibleOrders.length === 0 ? (
            <div style={{ border: "1px solid var(--line-dark)", padding: 28, background: "var(--cream-dim)" }}>
              <h3>No orders found</h3>
              <p style={{ color: "#5B5B50", marginTop: 8 }}>
                No {selectedStatus === "all" ? "" : `${statusLabel(selectedStatus).toLowerCase()} `}orders were found for {selectedDate}. Try another date or contact us at {site.phone}.
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 16 }}>
              {visibleOrders.map((order) => (
                <article key={order.id} style={{ border: "1px solid var(--line-dark)", background: "var(--cream)", padding: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 18, flexWrap: "wrap", marginBottom: 14 }}>
                    <div>
                      <div className="tag" style={{ color: "var(--gold-deep)", fontSize: 11 }}>Order #{order.order_number}</div>
                      <h3 style={{ marginTop: 4 }}>{order.status || "Order Placed"}</h3>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--beef)" }}>{money(orderTotal(order))}</div>
                      <div style={{ fontSize: 12, color: "#6b6b60" }}>{order.isPaid ? "Paid" : "Payment pending"}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12, marginBottom: 16 }} className="account-order-meta">
                    <div><span className="tag" style={{ color: "#8b8a7c", fontSize: 10 }}>Delivery</span><br />{order.isPickup ? "Pickup" : order.delivery_location || "Delivery"}</div>
                    <div><span className="tag" style={{ color: "#8b8a7c", fontSize: 10 }}>Status</span><br />{order.cancelled ? "Cancelled" : order.status || "Pending"}</div>
                    <div><span className="tag" style={{ color: "#8b8a7c", fontSize: 10 }}>Placed</span><br />{new Date(order.created_at).toLocaleString("en-KE")}</div>
                  </div>

                  {Array.isArray(order.order_items) && order.order_items.length > 0 && (
                    <div style={{ borderTop: "1px solid var(--line-dark)", paddingTop: 14 }}>
                      {order.order_items.map((item) => (
                        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "6px 0", fontSize: 14 }}>
                          <span>{lineName(item)} x {Number(item.quantity || 0)}</span>
                          <span>{money(Number(item.sell_price || 0) * Number(item.quantity || 0))}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {canCancel(order) && (
                    <form action={cancelCustomerOrder} style={{ borderTop: "1px solid var(--line-dark)", marginTop: 14, paddingTop: 14 }}>
                      <input type="hidden" name="orderId" value={order.id} />
                      <input type="hidden" name="date" value={selectedDate} />
                      <div className="field" style={{ marginBottom: 12 }}>
                        <label htmlFor={`cancel-reason-${order.id}`}>Cancel reason</label>
                        <textarea id={`cancel-reason-${order.id}`} name="reason" rows={2} required placeholder="Tell us why you want to cancel this order" />
                      </div>
                      <button type="submit" className="btn btn-outline-dark btn-sm">Cancel order</button>
                    </form>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
