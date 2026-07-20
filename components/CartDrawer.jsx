"use client";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const { items, total, setQty, clear, open, setOpen, toast, whatsappUrl } = useCart();

  return (
    <>
      {open && (
        <>
          <div className="drawer-overlay" onClick={() => setOpen(false)} />
          <aside className="drawer" role="dialog" aria-label="Your order">
            <div className="drawer-head">
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Your order</strong>
              <button className="btn btn-outline btn-sm" onClick={() => setOpen(false)}>Close</button>
            </div>
            <div className="drawer-body">
              {items.length === 0 && (
                <p style={{ color: "#8b8a7c", fontSize: 14, marginTop: 10 }}>
                  Your order is empty — add cuts from the shop.
                </p>
              )}
              {items.map(({ product, qty }) => (
                <div className="drawer-item" key={product.id}>
                  <div>
                    <h5>{product.name}</h5>
                    <div className="di-sub">
                      KES {product.price.toLocaleString()} {product.unit}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="qty-ctl">
                      <button onClick={() => setQty(product.id, qty - 1)} aria-label={`Reduce ${product.name}`}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => setQty(product.id, qty + 1)} aria-label={`Increase ${product.name}`}>+</button>
                    </div>
                    <strong style={{ fontSize: 13, minWidth: 70, textAlign: "right" }}>
                      {(qty * product.price).toLocaleString()}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
            <div className="drawer-foot">
              <div className="drawer-total">
                <span>Estimated total</span>
                <span>KES {total.toLocaleString()}</span>
              </div>
              <p style={{ fontSize: 11.5, color: "#6b6b60", marginBottom: 14 }}>
                Final weight and price confirmed at packing. Checkout completes on WhatsApp — we reply with delivery options and payment details.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <a
                  className="btn btn-gold"
                  style={{ flex: 1, justifyContent: "center", opacity: items.length ? 1 : 0.5, pointerEvents: items.length ? "auto" : "none" }}
                  href={whatsappUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Checkout on WhatsApp
                </a>
                {items.length > 0 && (
                  <button className="btn btn-outline-dark" onClick={clear}>Clear</button>
                )}
              </div>
            </div>
          </aside>
        </>
      )}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
