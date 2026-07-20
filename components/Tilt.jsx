"use client";
import { useRef } from "react";

// Wraps children in a 3D perspective tilt that follows the cursor, with a moving glare.
export default function Tilt({ children, max = 10, className = "", style = {} }) {
  const ref = useRef(null);
  const glare = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max;
    const ry = (px - 0.5) * max;
    el.style.transform = `perspective(700px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
    if (glare.current) {
      glare.current.style.opacity = "1";
      glare.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(201,162,75,0.16), transparent 55%)`;
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
    if (glare.current) glare.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      <span ref={glare} className="tilt-glare" aria-hidden />
    </div>
  );
}
