"use client";
import { useState } from "react";

// Interactive butcher's chart: hover/tap a primal region to highlight it and
// see which Kings Prime cuts come from it.
const REGIONS = [
  { id: "chuck", label: "Chuck", cuts: "Stewing beef · Mince", d: "M78 62 C92 50 112 44 132 46 L138 96 C120 100 100 102 86 108 C80 92 78 76 78 62 Z" },
  { id: "rib", label: "Rib", cuts: "Ribeye · Dry-aged rib", d: "M138 96 L132 46 C152 44 172 46 190 50 L192 98 C174 96 156 96 138 96 Z" },
  { id: "loin", label: "Loin", cuts: "Sirloin · T-bone · Fillet", d: "M192 98 L190 50 C212 48 234 50 252 56 L250 100 C232 98 212 98 192 98 Z" },
  { id: "rump", label: "Rump & round", cuts: "Roasting joints · Steaks", d: "M250 100 L252 56 C272 60 288 70 294 86 C298 98 296 112 290 124 C278 116 264 106 250 100 Z" },
  { id: "flank", label: "Flank", cuts: "Flank steak · Mince", d: "M192 98 C212 98 232 98 250 100 C252 112 250 124 244 134 C226 130 208 128 194 128 C192 118 192 108 192 98 Z" },
  { id: "brisket", label: "Brisket & shank", cuts: "Brisket · Osso buco", d: "M86 108 C100 102 120 100 138 96 C140 108 140 120 138 130 C122 132 106 130 94 134 C90 126 87 116 86 108 Z" },
];

export default function CowChart() {
  const [active, setActive] = useState(null);
  const current = REGIONS.find((r) => r.id === active);

  return (
    <div className="cowchart-wrap">
      <svg viewBox="0 24 340 168" role="img" aria-label="Butcher's cut chart of a cow" className="cowchart">
        {/* legs */}
        <g stroke="#14180F" strokeWidth="2.5" fill="#F5F0E3">
          <path d="M104 128 L100 176 L110 176 L116 132 Z" />
          <path d="M128 130 L126 176 L136 176 L140 132 Z" />
          <path d="M236 132 L234 178 L244 178 L248 134 Z" />
          <path d="M262 126 L264 176 L274 176 L274 124 Z" />
        </g>
        {/* tail */}
        <path d="M294 86 C306 84 312 92 310 104 L306 130" fill="none" stroke="#14180F" strokeWidth="2.5" strokeLinecap="round" />
        {/* head */}
        <g stroke="#14180F" strokeWidth="2.5" fill="#F5F0E3">
          <path d="M78 62 C64 58 52 62 46 74 C40 84 42 96 50 102 C58 108 70 108 78 102 C80 88 79 74 78 62 Z" />
          <path d="M50 102 C48 110 52 118 60 120 C68 122 74 116 74 108" />
          <path d="M60 56 C54 48 44 46 38 52 C46 52 52 56 56 62 Z" fill="#C9A24B" stroke="#14180F" />
        </g>
        <circle cx="58" cy="80" r="2.6" fill="#14180F" />
        {/* body outline under regions */}
        <path d="M78 62 C92 44 132 40 190 46 C240 50 288 62 294 86 C300 100 296 116 288 126 C260 140 200 136 138 132 C110 130 88 124 84 108 C79 92 77 76 78 62 Z" fill="#F5F0E3" stroke="#14180F" strokeWidth="2.5" />
        {/* primal regions */}
        {REGIONS.map((r) => (
          <path
            key={r.id}
            d={r.d}
            className={`region ${active === r.id ? "active" : ""}`}
            onPointerEnter={() => setActive(r.id)}
            onPointerLeave={() => setActive(null)}
            onClick={() => setActive(active === r.id ? null : r.id)}
            tabIndex={0}
            onFocus={() => setActive(r.id)}
            onBlur={() => setActive(null)}
            role="button"
            aria-label={`${r.label}: ${r.cuts}`}
          />
        ))}
        {/* region seams */}
        <g stroke="#14180F" strokeWidth="1.4" opacity="0.55" fill="none" strokeDasharray="4 4">
          <path d="M132 46 L138 96 L138 130" />
          <path d="M190 50 L192 98 L194 128" />
          <path d="M252 56 L250 100 L244 134" />
          <path d="M86 108 C110 102 160 98 250 100" />
        </g>
      </svg>
      <div className="cow-legend" aria-live="polite">
        {current ? (
          <>
            <strong className="cow-l1">{current.label}</strong>
            <span className="cow-l2">{current.cuts}</span>
          </>
        ) : (
          <span className="cow-hint">Hover or tap a section of the animal to see its cuts</span>
        )}
      </div>
    </div>
  );
}
