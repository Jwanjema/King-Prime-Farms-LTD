"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

export function useLightbox(items) {
  const [index, setIndex] = useState(null);
  const open = useCallback((i) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  return { index, open, close, prev, next };
}

export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  if (index === null) return null;
  const item = items[index];
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" aria-label="Close" onClick={onClose}>&times;</button>
      {items.length > 1 && (
        <button
          className="lightbox-nav prev"
          aria-label="Previous"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          &#8249;
        </button>
      )}
      <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
        <Image src={item.img} alt={item.label || ""} fill sizes="90vw" />
        {item.label && <div className="lightbox-caption">{item.label}</div>}
      </div>
      {items.length > 1 && (
        <button
          className="lightbox-nav next"
          aria-label="Next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          &#8250;
        </button>
      )}
    </div>
  );
}
