export const site = {
  name: "Kings Prime Farms",
  legal: "Kings Prime Farms Ltd",
  slogan: "Quality from farm to table",
  tagline: "From our feedlot to your table — premium beef, dry-aged excellence and trusted livestock production.",
  phone: "+254 7XX XXX XXX",
  whatsapp: "2547XXXXXXXX", // digits only, country code first — used for wa.me links
  email: "info@kingprimefarms.co.ke",
  location: "Nairobi, Kenya",
  socials: { instagram: "#", facebook: "#" },
};

// Retail ordering happens on Camp David Ventures (same company, retail arm) —
// individual/small orders. This site (Kings Prime Farms) handles wholesale
// enquiries via the Contact page instead. Referenced by ProductCard, the
// homepage hero, Nav, and Footer as the destination for all retail "shop" /
// "add to order" actions.
export const RETAIL_SITE_URL = "https://www.campdavidventuresltd.co.ke/";
export const RETAIL_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.campdavid.campdavid";

// SEED SOURCE ONLY — not read by the site after the Firestore migration.
// The public pages now read products/posts/jobs live from Firestore (see
// lib/data/*.js); edit content going forward via /admin, not this file.
// This array is only consumed once, by scripts/seed-firestore.mjs, to
// populate Firestore on first setup. Prices originally tracked Camp
// David's retail catalogue (see RETAIL_SITE_URL) as a starting point.
export const products = [
  // Homepage teaser mix — kept first so page.jsx's products.slice(0, 4) shows
  // one of each family (dry-aged, classic steak, premium, goat).
  { id: "ribeye", name: "Ribeye", tag: "Dry-aged 21 days", price: 1850, unit: "per kg", badge: "Dry-aged", cat: "Aged" },
  { id: "sirloin", name: "Sirloin steak", tag: "Grain finished", price: 850, unit: "per kg", cat: "Beef" },
  { id: "fillet", name: "Fillet", tag: "Whole or steaks", price: 2200, unit: "per kg", badge: "Premium", cat: "Beef" },
  { id: "goat-leg", name: "Goat leg", tag: "Whole leg cut", price: 900, unit: "per kg", cat: "Goat & Lamb" },

  // Dry-aged
  { id: "dry-aged-14", name: "Dry-aged beef, 14 days", tag: "Aged beef", price: 1600, unit: "per kg", badge: "Dry-aged", cat: "Aged" },
  { id: "dry-aged-28", name: "Dry-aged beef, 28 days", tag: "Extra aged", price: 1800, unit: "per kg", badge: "Dry-aged", cat: "Aged" },

  // Beef steaks & classic cuts
  { id: "tbone", name: "T-bone steak", tag: "Bone-in classic", price: 800, unit: "per kg", cat: "Beef" },
  { id: "topside", name: "Topside steak", tag: "Lean & tender", price: 850, unit: "per kg", cat: "Beef" },
  { id: "silverside", name: "Silverside steak", tag: "Lean roasting cut", price: 850, unit: "per kg", cat: "Beef" },
  { id: "chuck", name: "Chuck cuts", tag: "Slow-cook ready", price: 800, unit: "per kg", cat: "Beef" },
  { id: "brisket", name: "Brisket", tag: "Slow-cook ready", price: 700, unit: "per kg", cat: "Beef" },
  { id: "cubes", name: "Beef cubes / steak", tag: "Stew & fry ready", price: 850, unit: "per kg", cat: "Beef" },
  { id: "on-bone", name: "Beef meat on bone", tag: "Family favourite", price: 700, unit: "per kg", cat: "Beef" },
  { id: "ribs", name: "Beef short ribs", tag: "Braise or grill", price: 700, unit: "per kg", cat: "Beef" },
  { id: "shank", name: "Shank cuts", tag: "Osso buco ready", price: 700, unit: "per kg", cat: "Beef" },
  { id: "oxtail", name: "Oxtail", tag: "Slow-braise classic", price: 700, unit: "per kg", cat: "Beef" },
  { id: "mince", name: "Minced beef", tag: "90/10 lean", price: 880, unit: "per kg", cat: "Beef" },
  { id: "bone-soup", name: "Beef bones for soup", tag: "Rich stock base", price: 200, unit: "per kg", cat: "Beef" },
  { id: "liver", name: "Beef liver", tag: "Stripped, ready to cook", price: 750, unit: "per kg", cat: "Offal" },
  { id: "half-carcass", name: "Half carcass", tag: "Wholesale order", price: 620, unit: "per kg", badge: "Wholesale", cat: "Wholesale" },

  // Goat & lamb
  { id: "goat-shoulder", name: "Goat shoulder", tag: "Roast or braise", price: 950, unit: "per kg", cat: "Goat & Lamb" },
  { id: "goat-ribs", name: "Goat ribs", tag: "Grill ready", price: 900, unit: "per kg", cat: "Goat & Lamb" },
  { id: "lamb-chops", name: "Lamb leg chops", tag: "Pan or grill", price: 900, unit: "per kg", cat: "Goat & Lamb" },

  // Ready-to-grill / choma
  { id: "sausages", name: "Beef sausages", tag: "In-house recipe", price: 650, unit: "per kg", cat: "Choma" },
  { id: "beef-choma", name: "Beef choma, 1kg", tag: "Marinated, grill ready", price: 1000, unit: "per kg", cat: "Choma" },
  { id: "burger-patties", name: "Burger patties, 5pc", tag: "In-house recipe", price: 550, unit: "per pack", cat: "Choma" },
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

// SEED SOURCE ONLY — see the note above products. Edit posts via /admin.
export const posts = [
  {
    slug: "benefits-of-dry-aged-beef",
    title: "Why dry-aged beef tastes better",
    excerpt: "What actually happens inside the aging room — and why 21 days changes everything about flavour and tenderness.",
    date: "2026-07-02",
    category: "Dry-aging",
    body: "Dry-aging is controlled patience. For a minimum of 21 days, whole primal cuts rest in our climate-controlled aging room at near-freezing temperatures and carefully managed humidity. Two things happen. First, natural enzymes slowly break down muscle fibres, which is what gives dry-aged beef its signature tenderness. Second, moisture evaporates — the cut loses weight, but everything that remains is concentrated flavour.\n\nThat weight loss is why dry-aged beef costs more per kilo: you're paying for what stayed, not what left. At Kings Prime Farms we age in-house rather than outsourcing, which means we control the timeline, the conditions, and ultimately the plate.",
  },
  {
    slug: "inside-our-feedlot",
    title: "Inside a professionally managed feedlot",
    excerpt: "From animal selection to weigh-ins — the six-stage process every animal moves through before earning the Kings Prime grade.",
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

// SEED SOURCE ONLY — see the note above products. Edit jobs via /admin.
export const jobs = [
  { title: "Feedlot supervisor", type: "Full-time", loc: "On-farm", body: "Oversee daily feeding schedules, pen conditions and the weigh-in program." },
  { title: "Butchery technician", type: "Full-time", loc: "Processing unit", body: "Skilled meat cutting and preparation under HACCP-aligned hygiene standards." },
  { title: "Delivery driver", type: "Contract", loc: "Nairobi routes", body: "Cold-chain deliveries to wholesale and retail customers across the city." },
];

// Livestock & Feedlot Management System — the software product we license/sell
// to other feedlot and butchery operators, built from our own in-house system.
export const systemPitch = {
  eyebrow: "Software, built for this industry",
  title: "The system running our own feedlot — now available to yours",
  lead: "Full traceability from animal purchase to retail cut, plus the costing and reporting tools that turn a feedlot into a decision-driven business. We built it to run Kings Prime Farms. Now we license it to other feedlot and butchery operators.",
};

// The signature "trace a kg of beef back to the animal" chain — the system's
// core value prop made visible. Six checkpoints, in the order an animal
// actually moves through the business.
export const traceChain = [
  { step: "Purchase", title: "Animal registered", body: "ID, breed, source and purchase price logged on intake." },
  { step: "Feedlot", title: "Feeding & health", body: "Rations, weigh-ins and vet care tracked per pen." },
  { step: "Weigh-in", title: "Performance", body: "ADG and FCR measured against target market weight." },
  { step: "Slaughter", title: "Carcass graded", body: "Hot weight, dressing % and meat grade recorded." },
  { step: "Retail cut", title: "Yield valued", body: "Every cut priced back to its carcass and animal." },
  { step: "Sale", title: "Margin known", body: "True profit per animal, from purchase to payment." },
];

export const systemStats = [
  { value: 9, suffix: "", label: "Core modules, one system" },
  { value: 20, suffix: "+", label: "Built-in reports & dashboards" },
  { value: 6, suffix: "", label: "Stages tracked, purchase to sale" },
  { value: 100, suffix: "%", label: "Animal-to-cut traceability" },
];

export const systemModuleGroups = [
  {
    tag: "Animal & health",
    title: "The animal record",
    modules: [
      {
        title: "Livestock register & profiles",
        body: "RFID/ear-tag ID, breed, source, purchase price, pen allocation, body score and target weight — one record per animal from day one.",
      },
      {
        title: "Health & clinical management",
        body: "Vaccination and deworming schedules, treatment history, mortality records, medicine inventory and withdrawal periods, with automatic alerts.",
      },
      {
        title: "Weight & performance tracking",
        body: "Weekly weigh-ins, ADG and FCR, weight-gain charts, and pen-level performance comparisons — exportable to PDF and Excel.",
      },
    ],
  },
  {
    tag: "Feed & pens",
    title: "Day-to-day operations",
    modules: [
      {
        title: "Feed formulation & inventory",
        body: "TMR recipes, daily rations per pen, feed cost per animal and per kg gain, plus live silage, hay and grain stock levels.",
      },
      {
        title: "Pen & inventory management",
        body: "Pen capacity and occupancy, movement history, cleaning schedules, and stock alerts for drugs, minerals, fuel and spares.",
      },
    ],
  },
  {
    tag: "Money & traceability",
    title: "From cost to carcass",
    modules: [
      {
        title: "Finance & costing",
        body: "True cost and margin per animal — purchase, feed, labour and vet costs rolled up into cash flow, expense and profitability reports.",
      },
      {
        title: "Slaughter & carcass traceability",
        body: "Hot carcass weight, dressing percentage, meat grade and yield — traced back to the original animal, through to retail cuts sold.",
      },
    ],
  },
  {
    tag: "Sales & oversight",
    title: "Selling and staying on top of it",
    modules: [
      {
        title: "Sales, POS & customer orders",
        body: "Live animal sales, carcass transfers, point-of-sale integration, customer orders, deliveries and payment tracking in one flow.",
      },
      {
        title: "Reports, dashboard & alerts",
        body: "A daily dashboard of ADG, FCR, feed cost and projected profit, plus automated alerts for vaccinations, low stock and animals ready for market.",
      },
    ],
  },
];

export const systemExtras = [
  { title: "Human resources", body: "Staff records, attendance, task assignment and payroll integration for feedlot and butchery teams." },
  { title: "Mobile app, offline-first", body: "Scan RFID tags, record field weights and capture photos with no signal — syncs the moment you're back online." },
  { title: "ERP-ready", body: "Integrates with finance, procurement and operations systems for businesses that need it to plug into a wider stack." },
];

export const galleryItems = [
  { label: "Feedlot", tall: true, img: "/images/gallery/feedlot.jpg" },
  { label: "Healthy cattle", img: "/images/gallery/cattle.jpg" },
  { label: "Dry-aging room", img: "/images/gallery/aging-room.jpg" },
  { label: "Butchery", tall: true, img: "/images/gallery/butchery.jpg" },
  { label: "Meat cutting", img: "/images/gallery/meat-cutting.jpg" },
  { label: "Staff", img: "/images/gallery/staff.jpg" },
  { label: "Delivery fleet", img: "/images/gallery/delivery-fleet.jpg" },
];
