"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";
import { showToast } from "@/components/Toast";

export default function AddToCartButton({ product, compact = false }) {
  const { addItem } = useCart();
  const step = product.is_divisible ? 0.5 : 1;
  const [qty, setQty] = useState(product.minimum_quantity ? Number(product.minimum_quantity) : step);

  function handleAdd() {
    addItem(product, qty);
    showToast(`Added ${product.name} to cart`);
  }

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flex: 1 }}>
      {!compact && (
        <div className="qty-ctl">
          <button type="button" onClick={() => setQty((q) => Math.max(step, +(q - step).toFixed(2)))} aria-label="Decrease quantity">
            −
          </button>
          <span>{qty}</span>
          <button type="button" onClick={() => setQty((q) => +(q + step).toFixed(2))} aria-label="Increase quantity">
            +
          </button>
        </div>
      )}
      <button type="button" onClick={handleAdd} className="btn btn-beef btn-sm" style={{ flex: 1, justifyContent: "center" }}>
        Add to cart
      </button>
    </div>
  );
}
