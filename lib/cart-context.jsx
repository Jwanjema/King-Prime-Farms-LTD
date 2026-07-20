"use client";
import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { site } from "@/data/site";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState({}); // { [productId]: { product, qty } }
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const add = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const cur = prev[product.id]?.qty || 0;
      return { ...prev, [product.id]: { product, qty: cur + qty } };
    });
    setToast(`${product.name} added to order`);
    setTimeout(() => setToast(null), 2200);
  }, []);

  const setQty = useCallback((id, qty) => {
    setItems((prev) => {
      if (qty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...prev[id], qty } };
    });
  }, []);

  const clear = useCallback(() => setItems({}), []);

  const list = useMemo(() => Object.values(items), [items]);
  const count = useMemo(() => list.reduce((s, i) => s + i.qty, 0), [list]);
  const total = useMemo(
    () => list.reduce((s, i) => s + i.qty * i.product.price, 0),
    [list]
  );

  const whatsappUrl = useMemo(() => {
    if (!list.length) return null;
    const lines = list.map(
      (i) => `• ${i.product.name} — ${i.qty} kg @ KES ${i.product.price.toLocaleString()}`
    );
    const msg = [
      `Hello ${site.name}, I'd like to place an order:`,
      "",
      ...lines,
      "",
      `Estimated total: KES ${total.toLocaleString()}`,
      "",
      "Name:",
      "Delivery location:",
    ].join("\n");
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, [list, total]);

  const value = { items: list, count, total, add, setQty, clear, open, setOpen, toast, whatsappUrl };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
