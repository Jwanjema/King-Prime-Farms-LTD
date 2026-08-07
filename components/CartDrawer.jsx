"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";

export default function CartDrawer() {
  const { items, isOpen, closeDrawer, updateQuantity, removeItem, getSubtotal } = useCart();

  if (!isOpen) return null;

  const subtotal = getSubtotal();

  return (
    <>
      <div className="drawer-overlay" onClick={closeDrawer} />
      <div className="drawer" role="dialog" aria-label="Shopping cart">
        <div className="drawer-head">
          <h3 style={{ margin: 0 }}>Your cart</h3>
          <button type="button" onClick={closeDrawer} aria-label="Close cart" className="btn btn-sm btn-outline">
            Close
          </button>
        </div>
        <div className="drawer-body">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div className="drawer-item" key={item.productId}>
                <div>
                  <h5>{item.name}</h5>
                  <div className="di-sub">
                    KES {item.unitPrice.toLocaleString()} per {item.unit_short || "unit"}
                  </div>
                  <div className="qty-ctl" style={{ marginTop: 8 }}>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, +(item.quantity - (item.is_divisible ? 0.5 : 1)).toFixed(2))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, +(item.quantity + (item.is_divisible ? 0.5 : 1)).toFixed(2))}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div>KES {(item.unitPrice * item.quantity).toLocaleString()}</div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="btn btn-sm btn-outline-dark"
                    style={{ marginTop: 8 }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="drawer-foot">
          <div className="drawer-total">
            <span>Subtotal</span>
            <span>KES {subtotal.toLocaleString()}</span>
          </div>
          <Link
            href="/checkout"
            onClick={closeDrawer}
            className="btn btn-gold"
            style={{ width: "100%", justifyContent: "center", pointerEvents: items.length === 0 ? "none" : "auto", opacity: items.length === 0 ? 0.5 : 1 }}
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
}
