"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { submitOrder } from "@/lib/checkout/actions";

export default function CheckoutForm({ outlets, customer }) {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCart();
  const [delivery, setDelivery] = useState("delivery"); // "delivery" | "pickup"
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const cartItems = items.map((i) => ({ productId: i.productId, quantity: i.quantity }));
    const formFields = {
      selectedDeliveryOption: delivery === "pickup" ? "1" : "0",
      name: formData.get("name")?.toString().trim(),
      phone: formData.get("phone")?.toString().trim(),
      delivery_location: formData.get("delivery_location")?.toString().trim() || "",
      landmark: formData.get("landmark")?.toString().trim() || "",
      pickup: formData.get("pickup")?.toString() || "",
      desc: formData.get("desc")?.toString().trim() || "",
    };

    const result = await submitOrder(cartItems, formFields);
    setPending(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    clearCart();
    router.push(`/checkout/${result.orderNumber}/pay?phone=${encodeURIComponent(formFields.phone)}`);
  }

  const subtotal = getSubtotal();
  const customerName = customer?.name || [customer?.first_name, customer?.last_name].filter(Boolean).join(" ");
  const customerPhone = customer?.phone || "";

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 560 }}>
      {customer ? (
        <div style={{ border: "1px solid var(--line-dark)", background: "var(--cream-dim)", padding: 14, marginBottom: 18 }}>
          <strong>Checking out as {customerName || "your account"}</strong>
          <p style={{ color: "#5B5B50", fontSize: 13, marginTop: 4 }}>
            This order will be saved under your CampDavid account. <Link href="/account" style={{ color: "var(--gold-deep)" }}>Manage account</Link>
          </p>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--line-dark)", background: "var(--cream-dim)", padding: 14, marginBottom: 18 }}>
          <strong>Guest checkout creates your order account</strong>
          <p style={{ color: "#5B5B50", fontSize: 13, marginTop: 4 }}>
            If you already have a CampDavid account, <Link href="/account" style={{ color: "var(--gold-deep)" }}>sign in first</Link> so this order appears in My Orders.
          </p>
        </div>
      )}

      <div className="field">
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" required placeholder="Jane Wanjiru" defaultValue={customerName} />
      </div>
      <div className="field">
        <label htmlFor="phone">Phone number</label>
        <input id="phone" name="phone" required placeholder="07XX XXX XXX" defaultValue={customerPhone} readOnly={!!customerPhone} />
      </div>

      <div className="field">
        <label>Delivery option</label>
        <div style={{ display: "flex", gap: 16 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input type="radio" name="deliveryOption" checked={delivery === "delivery"} onChange={() => setDelivery("delivery")} style={{ width: "auto" }} />
            Delivery
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input type="radio" name="deliveryOption" checked={delivery === "pickup"} onChange={() => setDelivery("pickup")} style={{ width: "auto" }} />
            Pickup
          </label>
        </div>
      </div>

      {delivery === "delivery" ? (
        <>
          <div className="field">
            <label htmlFor="delivery_location">Delivery address</label>
            <input id="delivery_location" name="delivery_location" required placeholder="Street, estate, building" />
          </div>
          <div className="field">
            <label htmlFor="landmark">Landmark</label>
            <input id="landmark" name="landmark" placeholder="Nearest landmark" />
          </div>
        </>
      ) : (
        <div className="field">
          <label htmlFor="pickup">Pickup location</label>
          <select id="pickup" name="pickup" required>
            <option value="">Select an outlet</option>
            {outlets.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name || `${o.first_name} ${o.last_name}`} — {o.location}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="field">
        <label htmlFor="desc">Order notes (optional)</label>
        <textarea id="desc" name="desc" rows={3} placeholder="Any special instructions" />
      </div>

      <div className="drawer-total" style={{ marginBottom: 18 }}>
        <span>Subtotal</span>
        <span>KES {subtotal.toLocaleString()}</span>
      </div>

      {error && (
        <p style={{ color: "var(--beef)", marginBottom: 16 }}>{error}</p>
      )}

      <button type="submit" className="btn btn-gold" disabled={pending || items.length === 0} style={{ width: "100%", justifyContent: "center" }}>
        {pending ? "Placing order…" : "Place order & pay with M-Pesa"}
      </button>
    </form>
  );
}
