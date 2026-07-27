// Engraved butcher-style SVG illustrations for each cut, in brand colors.
// Pure SVG (server-renderable, zero bytes of JS shipped).

const INK = "#14180F";
const BEEF = "#8E2F2F";
const BEEF_D = "#5E1D1D";
const CREAM = "#F5F0E3";
const FAT = "#EDE3C8";
const GOLD = "#C9A24B";
const BONE = "#E9E1CC";

function Marbling({ d, opacity = 0.85 }) {
  return <path d={d} fill="none" stroke={CREAM} strokeWidth="1.6" strokeLinecap="round" opacity={opacity} />;
}

const arts = {
  ribeye: (
    <g>
      <path d="M22 58 C14 40 26 22 52 20 C82 18 104 30 102 52 C100 74 78 86 52 84 C32 82 28 72 22 58 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <path d="M52 20 C82 18 104 30 102 52 C101 62 96 70 88 76 C96 62 96 44 82 34 C70 26 58 24 48 26 Z" fill={BEEF_D} opacity="0.5" />
      <path d="M22 58 C18 46 22 32 36 25 C30 36 30 50 36 60 C30 62 25 61 22 58 Z" fill={FAT} stroke={INK} strokeWidth="2" />
      <circle cx="63" cy="52" r="9" fill={FAT} stroke={INK} strokeWidth="1.8" />
      <Marbling d="M40 40 q10 6 22 2 M44 62 q12 4 24 -3 M52 34 q8 8 4 16 M74 44 q6 8 0 18" />
    </g>
  ),
  sirloin: (
    <g>
      <path d="M18 62 C16 42 34 26 60 24 C88 22 108 34 104 54 C100 72 80 82 54 82 C34 82 20 76 18 62 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <path d="M18 62 C17 52 21 42 30 34 L36 30 C28 42 27 56 32 68 C26 68 20 66 18 62 Z" fill={FAT} stroke={INK} strokeWidth="2" />
      <Marbling d="M42 42 q14 4 28 0 M46 60 q14 4 28 -2 M60 34 q6 10 2 20" />
    </g>
  ),
  tbone: (
    <g>
      <path d="M16 56 C14 38 30 24 56 22 C86 20 108 32 106 52 C104 72 84 84 56 84 C34 84 18 74 16 56 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <path d="M40 32 L82 32 L82 39 L64 39 L64 76 L57 76 L57 39 L40 39 Z" fill={BONE} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <Marbling d="M28 48 q10 6 22 2 M30 66 q12 4 22 -2 M74 50 q8 4 16 2 M72 68 q10 4 20 -2" />
    </g>
  ),
  fillet: (
    <g>
      <ellipse cx="46" cy="58" rx="26" ry="20" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <ellipse cx="78" cy="44" rx="22" ry="17" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <path d="M78 27 C90 28 100 36 100 44 C100 50 96 56 88 59 C94 50 92 36 80 30 Z" fill={BEEF_D} opacity="0.45" />
      <path d="M20 58 C20 48 28 40 40 38 C32 46 30 58 36 68 C28 68 22 64 20 58 Z" fill={BEEF_D} opacity="0.4" />
      <Marbling d="M36 52 q8 4 16 0 M40 64 q8 2 14 -2 M70 40 q8 4 16 0" opacity="0.6" />
      <path d="M30 78 q30 8 62 -6" fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" />
    </g>
  ),
  brisket: (
    <g transform="rotate(-7 60 56)">
      <rect x="16" y="48" width="88" height="28" rx="13" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <rect x="16" y="38" width="88" height="15" rx="7.5" fill={FAT} stroke={INK} strokeWidth="2.5" />
      <path d="M28 45 q16 -2 32 0 M66 44 q14 0 26 2" stroke={INK} strokeWidth="1.2" fill="none" opacity="0.35" />
      <Marbling d="M28 62 q14 4 30 2 M62 66 q14 2 28 -2 M40 70 q10 2 20 0" opacity="0.8" />
    </g>
  ),
  mince: (
    <g>
      <path d="M20 72 C18 60 30 52 42 54 C44 44 58 40 66 46 C72 38 88 40 92 50 C102 52 106 62 100 70 C104 76 96 82 88 80 C84 86 70 88 62 82 C54 88 40 86 36 80 C26 82 20 78 20 72 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <Marbling d="M34 64 q4 -6 10 -2 q4 -6 10 -1 q4 -6 10 -1 q5 -5 10 0 M40 74 q4 -5 9 -1 q4 -5 9 -1 q5 -5 10 0 M56 56 q4 -5 9 -1" opacity="0.9" />
    </g>
  ),
  sausages: (
    <g>
      <path d="M18 44 C18 34 28 30 38 32 C50 34 56 42 54 52 C52 62 42 66 32 62 C22 58 18 52 18 44 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" transform="rotate(-18 36 47)" />
      <path d="M42 52 C42 42 52 38 62 40 C74 42 80 50 78 60 C76 70 66 74 56 70 C46 66 42 60 42 52 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" transform="rotate(-6 60 55)" />
      <path d="M66 58 C66 48 76 44 86 46 C98 48 104 56 102 66 C100 76 90 80 80 76 C70 72 66 66 66 58 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" transform="rotate(8 84 61)" />
      <path d="M52 44 q3 4 1 8 M76 50 q3 4 1 8" stroke={GOLD} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <Marbling d="M26 44 q6 3 12 1 M52 52 q6 3 12 1 M78 58 q6 3 12 1" opacity="0.55" />
    </g>
  ),
  "half-carcass": (
    <g>
      <path d="M60 12 L60 24" stroke={INK} strokeWidth="2.5" />
      <circle cx="60" cy="12" r="4.5" fill="none" stroke={INK} strokeWidth="2.5" />
      <path d="M52 24 C40 34 38 52 42 66 C45 78 52 88 58 92 C66 88 74 76 76 62 C78 46 74 32 66 24 C62 21 56 21 52 24 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <path d="M52 24 C46 32 44 44 46 56 C48 70 54 82 58 88 C56 76 52 62 52 48 C52 38 54 30 56 24 Z" fill={FAT} opacity="0.85" />
      <path d="M58 34 q8 2 12 8 M60 48 q8 2 12 8 M60 64 q7 2 10 7" stroke={CREAM} strokeWidth="1.5" fill="none" opacity="0.8" />
    </g>
  ),
  topside: (
    <g>
      <path d="M20 60 C18 40 36 24 62 22 C88 20 106 34 102 54 C98 74 78 84 54 82 C34 80 22 76 20 60 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <path d="M20 60 C19 50 23 40 32 32 L38 28 C30 40 29 54 34 66 C28 66 22 64 20 60 Z" fill={FAT} stroke={INK} strokeWidth="2" />
      <Marbling d="M44 40 q14 4 26 0 M48 58 q14 4 26 -2 M62 32 q6 10 2 20" />
    </g>
  ),
  silverside: (
    <g>
      <ellipse cx="60" cy="54" rx="44" ry="30" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <path d="M22 54 C22 42 30 32 42 28 C34 36 32 48 36 60 C28 60 24 58 22 54 Z" fill={FAT} stroke={INK} strokeWidth="2" />
      <Marbling d="M46 40 q14 5 28 1 M44 62 q14 5 30 -2 M64 34 q8 10 4 22" />
    </g>
  ),
  chuck: (
    <g>
      <path d="M22 56 C20 38 38 24 62 24 C86 24 102 40 98 58 C94 76 74 84 52 82 C32 80 24 72 22 56 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <path d="M22 56 C21 46 25 36 34 28 C28 38 27 50 31 60 C25 60 23 58 22 56 Z" fill={FAT} stroke={INK} strokeWidth="2" />
      <circle cx="66" cy="52" r="8" fill={FAT} stroke={INK} strokeWidth="1.6" />
      <Marbling d="M38 40 q10 5 20 1 M42 66 q12 4 22 -3" />
    </g>
  ),
  cubes: (
    <g>
      <rect x="18" y="26" width="30" height="30" rx="4" fill={BEEF} stroke={INK} strokeWidth="2.4" transform="rotate(-8 33 41)" />
      <rect x="50" y="18" width="32" height="32" rx="4" fill={BEEF_D} opacity="0.9" stroke={INK} strokeWidth="2.4" transform="rotate(6 66 34)" />
      <rect x="34" y="52" width="32" height="32" rx="4" fill={BEEF} stroke={INK} strokeWidth="2.4" transform="rotate(-4 50 68)" />
      <rect x="68" y="48" width="30" height="30" rx="4" fill={BEEF_D} opacity="0.9" stroke={INK} strokeWidth="2.4" transform="rotate(10 83 63)" />
      <Marbling d="M24 40 q6 3 12 0 M56 32 q6 3 12 0 M40 66 q6 3 12 0 M74 62 q6 3 12 0" opacity="0.7" />
    </g>
  ),
  "on-bone": (
    <g>
      <path d="M20 58 C18 40 36 24 62 22 C86 20 104 34 100 54 C96 74 76 84 52 82 C32 80 22 74 20 58 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <circle cx="72" cy="48" r="14" fill={BONE} stroke={INK} strokeWidth="2.2" />
      <circle cx="72" cy="48" r="6" fill={FAT} stroke={INK} strokeWidth="1.4" />
      <Marbling d="M32 50 q10 4 20 0 M36 66 q10 4 20 -2" />
    </g>
  ),
  ribs: (
    <g>
      <path d="M18 30 L102 30 L98 82 L22 82 Z" fill={BEEF_D} opacity="0.25" />
      <path d="M24 32 L24 80 M38 30 L38 82 M52 29 L52 83 M66 29 L66 83 M80 30 L80 82 M94 32 L94 80" stroke={BEEF} strokeWidth="9" strokeLinecap="round" />
      <path d="M24 32 L24 80 M38 30 L38 82 M52 29 L52 83 M66 29 L66 83 M80 30 L80 82 M94 32 L94 80" stroke={INK} strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M18 30 C40 24 80 24 102 30" stroke={FAT} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M18 30 C40 24 80 24 102 30" stroke={INK} strokeWidth="2" fill="none" opacity="0.4" />
    </g>
  ),
  shank: (
    <g>
      <rect x="30" y="16" width="20" height="70" rx="9" fill={BONE} stroke={INK} strokeWidth="2.4" />
      <path d="M18 46 C16 34 24 26 40 26 C56 26 64 34 62 46 C60 60 50 68 40 68 C28 68 20 58 18 46 Z" fill={BEEF} stroke={INK} strokeWidth="2.4" />
      <circle cx="40" cy="46" r="9" fill={BONE} stroke={INK} strokeWidth="2" />
      <circle cx="40" cy="46" r="4" fill={FAT} />
      <Marbling d="M22 40 q8 4 14 0 M24 54 q8 4 14 -2" opacity="0.7" />
    </g>
  ),
  oxtail: (
    <g>
      <path d="M92 20 C100 26 100 36 92 42 C100 44 102 54 94 60 C102 64 102 74 92 78 C82 82 70 78 66 68 C60 56 62 40 70 28 C76 20 86 16 92 20 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <circle cx="86" cy="30" r="6" fill={BONE} stroke={INK} strokeWidth="1.6" />
      <circle cx="86" cy="50" r="6.5" fill={BONE} stroke={INK} strokeWidth="1.6" />
      <circle cx="80" cy="68" r="7" fill={BONE} stroke={INK} strokeWidth="1.6" />
      <Marbling d="M70 36 q6 3 12 0 M68 56 q6 3 12 -1" opacity="0.6" />
    </g>
  ),
  liver: (
    <g>
      <path d="M24 50 C22 34 40 22 62 24 C86 26 100 40 96 58 C92 76 70 84 48 80 C30 76 26 66 24 50 Z" fill={BEEF_D} stroke={INK} strokeWidth="2.5" />
      <path d="M32 46 C34 38 44 32 56 34 C50 42 48 52 52 62 C42 60 34 56 32 46 Z" fill={BEEF} opacity="0.6" />
      <path d="M96 58 q6 2 8 8" stroke={INK} strokeWidth="2" fill="none" opacity="0.5" />
    </g>
  ),
  "goat-leg": (
    <g>
      <path d="M46 14 C40 22 38 34 42 46 C46 58 54 66 62 70 C56 56 54 40 58 26 C60 18 54 12 46 14 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <path d="M56 60 C66 62 76 70 80 82 C82 88 78 92 72 90 C64 86 56 76 54 66 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <path d="M50 20 C46 28 45 38 48 48" stroke={FAT} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8" />
      <circle cx="70" cy="86" r="5" fill={BONE} stroke={INK} strokeWidth="1.6" />
      <Marbling d="M48 34 q6 4 12 0 M52 50 q6 3 12 -1" opacity="0.6" />
    </g>
  ),
  "goat-shoulder": (
    <g>
      <path d="M22 54 C20 36 38 22 60 22 C84 22 100 36 96 56 C92 74 72 82 50 80 C30 78 24 70 22 54 Z" fill={BEEF} stroke={INK} strokeWidth="2.5" />
      <path d="M22 54 C21 44 25 34 34 26 C27 36 26 48 30 58 C24 58 23 56 22 54 Z" fill={FAT} stroke={INK} strokeWidth="2" />
      <circle cx="64" cy="50" r="7" fill={FAT} stroke={INK} strokeWidth="1.6" />
      <Marbling d="M38 38 q10 5 20 1 M42 64 q12 4 22 -3" opacity="0.7" />
    </g>
  ),
  "goat-ribs": (
    <g>
      <path d="M18 34 L100 34 L94 78 L24 78 Z" fill={BEEF_D} opacity="0.2" />
      <path d="M26 36 L26 76 M40 34 L40 78 M54 33 L54 79 M68 33 L68 79 M82 34 L82 78 M94 36 L94 76" stroke={BEEF} strokeWidth="8" strokeLinecap="round" />
      <path d="M26 36 L26 76 M40 34 L40 78 M54 33 L54 79 M68 33 L68 79 M82 34 L82 78 M94 36 L94 76" stroke={INK} strokeWidth="1.8" fill="none" opacity="0.5" />
      <path d="M18 34 C42 28 78 28 100 34" stroke={FAT} strokeWidth="7" fill="none" strokeLinecap="round" />
    </g>
  ),
  "lamb-chops": (
    <g>
      <circle cx="38" cy="38" r="18" fill={BEEF} stroke={INK} strokeWidth="2.4" />
      <circle cx="38" cy="38" r="7" fill={BONE} stroke={INK} strokeWidth="1.8" />
      <path d="M56 38 L84 30" stroke={BONE} strokeWidth="7" strokeLinecap="round" />
      <path d="M56 38 L84 30" stroke={INK} strokeWidth="1.6" opacity="0.5" />
      <circle cx="70" cy="66" r="18" fill={BEEF} stroke={INK} strokeWidth="2.4" />
      <circle cx="70" cy="66" r="7" fill={BONE} stroke={INK} strokeWidth="1.8" />
      <path d="M88 66 L104 58" stroke={BONE} strokeWidth="7" strokeLinecap="round" />
      <Marbling d="M30 32 q6 4 12 0 M62 60 q6 4 12 0" opacity="0.6" />
    </g>
  ),
  "beef-choma": (
    <g>
      <rect x="16" y="42" width="88" height="26" rx="6" fill={BEEF_D} stroke={INK} strokeWidth="2.4" transform="rotate(-4 60 55)" />
      <path d="M22 40 L98 40" stroke={INK} strokeWidth="2" opacity="0.5" transform="rotate(-4 60 55)" />
      <path d="M26 46 q10 -6 20 0 M52 48 q10 -6 20 0 M78 50 q10 -6 20 0" stroke={INK} strokeWidth="2" fill="none" opacity="0.55" transform="rotate(-4 60 55)" />
      <path d="M30 66 q8 5 16 0 M56 68 q8 5 16 0" stroke={GOLD} strokeWidth="2" fill="none" strokeLinecap="round" transform="rotate(-4 60 55)" />
    </g>
  ),
  "burger-patties": (
    <g>
      <ellipse cx="60" cy="72" rx="40" ry="12" fill={BEEF_D} opacity="0.7" stroke={INK} strokeWidth="2" />
      <ellipse cx="58" cy="58" rx="40" ry="12" fill={BEEF} stroke={INK} strokeWidth="2.2" />
      <ellipse cx="62" cy="44" rx="40" ry="12" fill={BEEF} stroke={INK} strokeWidth="2.4" />
      <path d="M30 40 q32 -8 64 0" stroke={CREAM} strokeWidth="1.6" fill="none" opacity="0.6" />
    </g>
  ),
};

// Dry-aged products are presented as rib-primal steaks in butcher marketing —
// share the ribeye illustration rather than drawing a near-duplicate.
arts["dry-aged-14"] = arts.ribeye;
arts["dry-aged-28"] = arts.ribeye;

export default function CutArt({ id, className = "" }) {
  return (
    <svg viewBox="0 0 120 104" role="img" aria-label={`${id} illustration`} className={className} style={{ width: "78%", height: "auto", display: "block" }}>
      {arts[id] || arts.ribeye}
    </svg>
  );
}
