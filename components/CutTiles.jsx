"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";

// Tappable cut-family tiles: each pulls its real products live from the
// shop catalogue via search, so "Know your cuts" always reflects stock.
const IMG_BASE = "https://www.campdavidventuresltd.co.ke/storage/products/";
const GROUPS = [
  { id: "chuck", label: "Chuck", sub: "Stewing beef · Mince", queries: ["chuck", "mince"], image: IMG_BASE + "sNbIMWuyHQ0jvyHkYqPhceeHkjG7cKAJ0msl21mw.jpg" },
  { id: "rib", label: "Rib", sub: "Ribeye · Short ribs", queries: ["rib eye", "short rib", "barbecue"], image: IMG_BASE + "rShk0iyz9oTvFfSgYSJH700AmDhdLgnVhVrjeJXW.png" },
  { id: "loin", label: "Loin", sub: "Sirloin · T-bone", queries: ["sirloin", "t-bone"], image: IMG_BASE + "NRmaEyO5goKczldDiM9kLmNkt8Z2Lb1oPPbPZ8b7.png" },
  { id: "rump", label: "Rump & round", sub: "Topside · Silverside", queries: ["topside", "silverside"], image: IMG_BASE + "PWCzh60RI9rFWgJmRZ9Jko18YTi18YkMyOIEPucC.jpg" },
  { id: "flank", label: "Flank", sub: "Flank steak", queries: ["flank"], image: IMG_BASE + "K5bKNe6zSl4ydi7eG5cuDJQSkEEw2tBtWhESOcWz.jpg" },
  { id: "brisket", label: "Brisket & shank", sub: "Shank · Ossobuco · Oxtail", queries: ["shank", "osso", "oxtail"], image: IMG_BASE + "l4qemdevVvMIXgJzXoiniqHdtlSCb2pxeQXOZP0a.png" },
];

export default function CutTiles() {
  const [active, setActive] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const requestId = useRef(0);
  const activeGroup = GROUPS.find((g) => g.id === active);

  useEffect(() => {
    if (!active) {
      setProducts([]);
      return;
    }
    const group = GROUPS.find((g) => g.id === active);
    const id = ++requestId.current;
    setLoading(true);
    Promise.all(group.queries.map((q) => fetch(`/api/catalog/search?q=${encodeURIComponent(q)}`).then((r) => r.json())))
      .then((results) => {
        if (id !== requestId.current) return;
        const seen = new Map();
        results.flat().forEach((p) => seen.set(p.id, p));
        setProducts([...seen.values()]);
      })
      .finally(() => {
        if (id === requestId.current) setLoading(false);
      });
  }, [active]);

  return (
    <div className="cuts-wrap">
      <div className="cuts-grid">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            className={`cut-tile ${active === g.id ? "active" : ""}`}
            onClick={() => setActive(active === g.id ? null : g.id)}
            aria-pressed={active === g.id}
            aria-label={`${g.label}: ${g.sub} — show products`}
          >
            <Image src={g.image} alt="" fill sizes="(max-width: 640px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            <span className="cut-tile-veil" />
            <span className="cut-tile-text">
              <strong>{g.label}</strong>
              <span>{g.sub}</span>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div className="cow-results">
          <div className="cuts-result-head">
            <strong className="cow-l1">{activeGroup.label}</strong>
            <span className="cow-l2">{activeGroup.sub}</span>
          </div>
          {loading ? (
            <p className="cow-results-status">Finding cuts…</p>
          ) : products.length ? (
            <div className="grid-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="cow-results-status">
              No {activeGroup.label.toLowerCase()} cuts in stock right now — check the full catalogue below.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
