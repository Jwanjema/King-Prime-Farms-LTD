"use client";
import { useEffect, useState } from "react";

let listeners = [];
let idCounter = 0;

export function showToast(message) {
  listeners.forEach((fn) => fn(message));
}

export default function Toast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handler = (message) => {
      const id = ++idCounter;
      setToast({ id, message });
      setTimeout(() => {
        setToast((current) => (current?.id === id ? null : current));
      }, 2200);
    };
    listeners.push(handler);
    return () => {
      listeners = listeners.filter((fn) => fn !== handler);
    };
  }, []);

  if (!toast) return null;
  return <div className="toast">{toast.message}</div>;
}
