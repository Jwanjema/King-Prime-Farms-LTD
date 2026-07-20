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
};

export default function CutArt({ id, className = "" }) {
  return (
    <svg viewBox="0 0 120 104" role="img" aria-label={`${id} illustration`} className={className} style={{ width: "78%", height: "auto", display: "block" }}>
      {arts[id] || arts.ribeye}
    </svg>
  );
}
