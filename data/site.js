export const site = {
  name: "King Prime Farms",
  legal: "King Prime Farms Ltd",
  tagline: "From our feedlot to your table — premium beef, dry-aged excellence and trusted livestock production.",
  phone: "+254 7XX XXX XXX",
  whatsapp: "2547XXXXXXXX", // digits only, country code first — used for wa.me links
  email: "info@kingprimefarms.co.ke",
  location: "Nairobi, Kenya",
  socials: { instagram: "#", facebook: "#" },
};

export const products = [
  { id: "ribeye", name: "Ribeye", tag: "Dry-aged 21 days", price: 1850, unit: "per kg", badge: "Dry-aged" },
  { id: "sirloin", name: "Sirloin", tag: "Grain finished", price: 1450, unit: "per kg" },
  { id: "tbone", name: "T-bone", tag: "Bone-in classic", price: 1350, unit: "per kg" },
  { id: "fillet", name: "Fillet", tag: "Whole or steaks", price: 2200, unit: "per kg", badge: "Premium" },
  { id: "brisket", name: "Brisket", tag: "Slow-cook ready", price: 980, unit: "per kg" },
  { id: "mince", name: "Minced beef", tag: "90/10 lean", price: 750, unit: "per kg" },
  { id: "sausages", name: "Beef sausages", tag: "In-house recipe", price: 650, unit: "per kg" },
  { id: "half-carcass", name: "Half carcass", tag: "Wholesale order", price: 620, unit: "per kg", badge: "Wholesale" },
];

export const services = [
  { num: "01", cat: "Feedlot", title: "Feedlot operations", body: "Scientifically managed finishing pens with monitored nutrition and weight gain." },
  { num: "02", cat: "Beef", title: "Premium beef production", body: "Grain-finished cattle raised for marbling and consistent grading." },
  { num: "03", cat: "Age", title: "Dry-aged beef", body: "Climate-controlled aging rooms for deeper flavour and tenderness." },
  { num: "04", cat: "Wholesale", title: "Wholesale supply", body: "Bulk carcass and cut programs for hotels, butcheries and restaurants." },
  { num: "05", cat: "Retail", title: "Retail meat sales", body: "Direct-to-consumer cuts, online orders and farm-gate pickup." },
  { num: "06", cat: "Finishing", title: "Livestock finishing", body: "Contract finishing services for partner ranches and producers." },
];

export const feedlotStages = [
  { num: "01", title: "Selection", body: "Cattle sourced and screened for breed and health." },
  { num: "02", title: "Nutrition plan", body: "Ration formulated per weight and finishing target." },
  { num: "03", title: "Daily feeding", body: "Scheduled feeding under staff supervision." },
  { num: "04", title: "Veterinary care", body: "Routine health checks and preventive treatment." },
  { num: "05", title: "Weight monitoring", body: "Regular weigh-ins tracked against growth curve." },
  { num: "06", title: "Housing & welfare", body: "Modern, shaded pens with welfare audits." },
];

export const whyUs = [
  { icon: "Q", title: "Premium quality", body: "Grain-finished, consistently graded beef." },
  { icon: "H", title: "Hygienic processing", body: "HACCP-aligned butchery standards." },
  { icon: "A", title: "Dry-age specialists", body: "In-house aging rooms, not outsourced." },
  { icon: "T", title: "Farm-to-table trace", body: "Every order traceable to its pen." },
  { icon: "S", title: "Reliable supply", body: "Consistent volumes for wholesale partners." },
  { icon: "P", title: "Competitive pricing", body: "Direct from producer — no middlemen." },
  { icon: "W", title: "Animal welfare", body: "Audited housing, handling and health standards." },
  { icon: "E", title: "Export-ready", body: "Documentation and standards built for regional and international buyers." },
];

export const posts = [
  {
    slug: "benefits-of-dry-aged-beef",
    title: "Why dry-aged beef tastes better",
    excerpt: "What actually happens inside the aging room — and why 21 days changes everything about flavour and tenderness.",
    date: "2026-07-02",
    category: "Dry-aging",
    body: "Dry-aging is controlled patience. For a minimum of 21 days, whole primal cuts rest in our climate-controlled aging room at near-freezing temperatures and carefully managed humidity. Two things happen. First, natural enzymes slowly break down muscle fibres, which is what gives dry-aged beef its signature tenderness. Second, moisture evaporates — the cut loses weight, but everything that remains is concentrated flavour.\n\nThat weight loss is why dry-aged beef costs more per kilo: you're paying for what stayed, not what left. At King Prime Farms we age in-house rather than outsourcing, which means we control the timeline, the conditions, and ultimately the plate.",
  },
  {
    slug: "inside-our-feedlot",
    title: "Inside a professionally managed feedlot",
    excerpt: "From animal selection to weigh-ins — the six-stage process every animal moves through before earning the King Prime grade.",
    date: "2026-06-18",
    category: "Feedlot",
    body: "A feedlot is only as good as its routine. Every animal that enters our pens moves through the same six stages: selection, a formulated nutrition plan, supervised daily feeding, routine veterinary care, regular weight monitoring, and audited housing and welfare standards.\n\nThe discipline pays off in consistency. When a wholesale partner orders from us for the tenth time, they get the same grade and the same marbling as the first time. That's not luck — it's the process.",
  },
  {
    slug: "cooking-the-perfect-steak",
    title: "Cooking the perfect Kenyan steak at home",
    excerpt: "High heat, good salt, and one rule most home cooks break — resting. A simple method for ribeye and sirloin.",
    date: "2026-06-05",
    category: "Cooking",
    body: "Great steak needs less than you think: a screaming-hot pan, coarse salt, and restraint. Salt the steak generously at least 40 minutes ahead. Get your pan properly hot before the meat touches it — you want an immediate sear. Flip once. For a 3cm ribeye, roughly three minutes a side gets you to medium-rare.\n\nThen the rule everyone breaks: rest it. Five full minutes off the heat lets the juices redistribute. Cut too early and everything you paid for ends up on the board.",
  },
];

export const jobs = [
  { title: "Feedlot supervisor", type: "Full-time", loc: "On-farm", body: "Oversee daily feeding schedules, pen conditions and the weigh-in program." },
  { title: "Butchery technician", type: "Full-time", loc: "Processing unit", body: "Skilled meat cutting and preparation under HACCP-aligned hygiene standards." },
  { title: "Delivery driver", type: "Contract", loc: "Nairobi routes", body: "Cold-chain deliveries to wholesale and retail customers across the city." },
];

export const galleryItems = [
  { label: "Feedlot", tall: true },
  { label: "Healthy cattle" },
  { label: "Dry-aging room" },
  { label: "Butchery", tall: true },
  { label: "Meat cutting" },
  { label: "Staff" },
  { label: "Delivery fleet" },
];
