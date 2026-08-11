"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lightbox, { useLightbox } from "@/components/Lightbox";

const AUTOPLAY_MS = 5000;

export default function Slideshow({ items }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);
  const lightbox = useLightbox(items);

  const go = useCallback((i) => setIndex((i + items.length) % items.length), [items.length]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (paused || lightbox.index !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, items.length, lightbox.index]);

  useEffect(() => {
    if (lightbox.index !== null) return; // Lightbox owns arrow keys while open
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [prev, next, lightbox.index]);

  // Keep the inline stage in sync so it lands on the same photo after closing the lightbox.
  useEffect(() => {
    if (lightbox.index !== null) setIndex(lightbox.index);
  }, [lightbox.index]);

  useEffect(() => {
    const el = trackRef.current?.children[index];
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  const current = items[index];

  return (
    <div className="slideshow" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="slideshow-stage">
        {items.map((g, i) => (
          <div
            key={g.label}
            className={`slideshow-slide ${i === index ? "is-active" : ""}`}
            aria-hidden={i !== index}
            onClick={() => i === index && lightbox.open(i)}
            role="button"
            tabIndex={i === index ? 0 : -1}
            aria-label={`Expand ${g.label}`}
          >
            <Image
              src={g.img}
              alt={g.label}
              fill
              priority={i === 0}
              sizes="(max-width: 920px) 100vw, 1180px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
        <div className="slideshow-veil" />

        <button className="slideshow-arrow prev" aria-label="Previous photo" onClick={prev}>&#8249;</button>
        <button className="slideshow-arrow next" aria-label="Next photo" onClick={next}>&#8250;</button>

        <div className="slideshow-caption">
          <span className="ss-count tag">{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          <span className="ss-label">{current.label}</span>
        </div>

        <button className="slideshow-expand" aria-label="View full size" onClick={() => lightbox.open(index)}>⤢</button>

        <button
          className="slideshow-playtoggle"
          aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? "▶" : "❚❚"}
        </button>
      </div>

      <div className="slideshow-rail" ref={trackRef}>
        {items.map((g, i) => (
          <button
            key={g.label}
            className={`slideshow-thumb ${i === index ? "is-active" : ""}`}
            onClick={() => (i === index ? lightbox.open(i) : (go(i), setPaused(true)))}
            aria-label={i === index ? `Expand ${g.label}` : `Go to ${g.label}`}
          >
            <Image src={g.img} alt="" fill sizes="90px" style={{ objectFit: "cover" }} />
          </button>
        ))}
      </div>

      <Lightbox items={items} index={lightbox.index} onClose={lightbox.close} onPrev={lightbox.prev} onNext={lightbox.next} />
    </div>
  );
}
