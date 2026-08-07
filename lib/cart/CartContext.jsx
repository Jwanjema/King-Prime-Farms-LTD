"use client";
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "kpf_cart_v1";

function readStoredCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Quantity steps in whole units unless the product is marked divisible
// (e.g. sold by weight), in which case it steps by 0.5.
function qtyStep(item) {
  return item.is_divisible ? 0.5 : 1;
}

function clampQty(item, qty) {
  const floor = item.minimum_quantity ? Number(item.minimum_quantity) : qtyStep(item);
  return Math.max(floor, qty);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage unavailable (private browsing quota, etc.) — cart just
      // won't persist across reloads, not worth surfacing to the user.
    }
  }, [items, hydrated]);

  const addItem = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      const unitPrice = product.hasOffer && product.offerPrice ? Number(product.offerPrice) : Number(product.selling_price);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: clampQty(i, i.quantity + quantity) } : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          imageUrl: product.imageUrl || null,
          unitPrice,
          unit_short: product.unit_short || "",
          quantity: clampQty({ minimum_quantity: product.minimum_quantity, is_divisible: product.is_divisible }, quantity),
          minimum_quantity: product.minimum_quantity ? Number(product.minimum_quantity) : 1,
          is_divisible: !!product.is_divisible,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity: clampQty(i, quantity) } : i))
    );
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const getSubtotal = useCallback(() => items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0), [items]);

  const value = useMemo(
    () => ({ items, itemCount, isOpen, addItem, updateQuantity, removeItem, clearCart, openDrawer, closeDrawer, getSubtotal }),
    [items, itemCount, isOpen, addItem, updateQuantity, removeItem, clearCart, openDrawer, closeDrawer, getSubtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
