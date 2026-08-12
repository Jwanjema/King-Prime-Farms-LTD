export const site = {
  name: "Kings Prime Farms",
  legal: "Kings Prime Farms Ltd",
  slogan: "Quality from farm to table",
  tagline: "From our feedlot to your table — premium beef, dry-aged excellence and trusted livestock production.",
  phone: "0795 675 866",
  whatsapp: "254795675866", // digits only, country code first — used for wa.me links
  email: "info@kingsprimefarmsltd.co.ke",
  location: "Matũgũta Shopping Center, Githunguri, Kenya",
  map: {
    label: "Kings Prime Farm",
    plusCode: "WPCV+8H",
    area: "Githunguri",
    building: "Matũgũta Shopping Center",
    lat: -1.0788384,
    lng: 36.7439716,
    googleMapsUrl: "https://maps.app.goo.gl/UcBXWtAGemshBm878",
  },
  hours: [
    { day: "Monday", time: "9 am–5 pm" },
    { day: "Tuesday", time: "9 am–5 pm" },
    { day: "Wednesday", time: "9 am–5 pm" },
    { day: "Thursday", time: "9 am–5 pm" },
    { day: "Friday", time: "9 am–5 pm" },
    { day: "Saturday", time: "9 am–5 pm" },
    { day: "Sunday", time: "Closed" },
  ],
  socials: { instagram: "#", facebook: "#" },
};

// Retail checkout happens directly on this site now (lib/campdavid/*),
// backed by the same company's Camp David Ventures API. The Play Store link
// remains as an alternate channel — also the fallback we point returning
// CampDavid app customers to at checkout (see lib/checkout/actions.js).
export const RETAIL_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.campdavid.campdavid";
export const SYSTEM_PLAY_STORE_URL = "https://play.google.com/store/search?q=posnext&c=apps&hl=en";

// SEED SOURCE ONLY, and now STALE for products specifically: posts/jobs
// still read live from Firestore (see lib/data/*.js, edit via /admin), but
// products no longer do — the public pages now fetch the live CampDavid
// catalog instead (see lib/campdavid/catalog.js). The /admin/products
// Firestore CRUD UI still writes here but no longer affects what customers
// see; it needs a decision (remove or relabel) as a follow-up, it's just
// not touched by this change. This array is otherwise only consumed once,
// by scripts/seed-firestore.mjs, to populate Firestore on first setup.
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
  { num: "01", cat: "Feedlot", title: "Feedlot operations", body: "Scientifically managed finishing pens with monitored nutrition and weight gain.", slug: "inside-our-feedlot", img: "/images/gallery/pen-3-dusk.jpg" },
  { num: "02", cat: "Beef", title: "Premium beef production", body: "Grain-finished cattle raised for marbling and consistent grading.", slug: "premium-beef-production", img: "/images/gallery/multi-breed.jpg" },
  { num: "03", cat: "Age", title: "Dry-aged beef", body: "Climate-controlled aging rooms for deeper flavour and tenderness.", slug: "benefits-of-dry-aged-beef", img: "/images/blog-dry-aging.jpg" },
  { num: "04", cat: "Wholesale", title: "Wholesale supply", body: "Bulk carcass and cut programs for hotels, butcheries and restaurants.", slug: "wholesale-supply", img: "/images/gallery/pen-2-dusk.jpg" },
  { num: "05", cat: "Retail", title: "Retail meat sales", body: "Direct-to-consumer cuts, online orders and farm-gate pickup.", slug: "retail-meat-sales", img: "/images/blog-cooking.jpg" },
  { num: "06", cat: "Finishing", title: "Livestock finishing", body: "Contract finishing services for partner ranches and producers.", slug: "livestock-finishing", img: "/images/gallery/resting-herd.jpg" },
  { num: "07", cat: "Training", title: "Feedlot training", body: "Hands-on and on-site training for feedlot owners and staff, built from how we run our own pens.", slug: "feedlot-training", img: "/images/gallery/feeding-k105.jpg" },
  { num: "08", cat: "Support", title: "Feedlot support", body: "Ongoing advisory support for nutrition, health protocols and operations once your feedlot is running.", slug: "feedlot-support", img: "/images/system/dashboard-menu.jpg" },
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
  {
    slug: "premium-beef-production",
    title: "What \"grain-finished\" actually means for your plate",
    excerpt: "Marbling isn't an accident. It's the last stage of a feeding program built specifically to get there.",
    date: "2026-07-10",
    category: "Beef",
    body: "Grading and marbling are decided long before an animal reaches the butchery. In the final finishing phase, cattle move onto a grain-based ration formulated for fat deposition within the muscle — the marbling that carries flavour and keeps a cut tender under heat.\n\nWe track this phase the same way we track everything else: average daily gain, feed conversion ratio, and body condition score, animal by animal, pen by pen. The result is a grade you can rely on order after order, not a lucky batch.",
  },
  {
    slug: "wholesale-supply",
    title: "What a reliable wholesale beef program looks like",
    excerpt: "For hotels, butcheries and restaurants: consistent cuts, consistent volumes, and a supply chain you can plan a menu around.",
    date: "2026-07-16",
    category: "Wholesale",
    body: "The single biggest complaint we hear from hotels and butcheries switching suppliers is inconsistency — different grades, different volumes, different lead times, week to week. A wholesale program only works if it removes that uncertainty.\n\nOur wholesale supply runs on standing orders and forecast volumes, drawn from a feedlot we control end to end, so a carcass or cut program can be sized to your kitchen and held steady. Bulk carcass, primal or portioned-cut programs are all available, with delivery scheduled around your service hours rather than ours.",
  },
  {
    slug: "retail-meat-sales",
    title: "From feedlot to your door: how retail orders work",
    excerpt: "Every retail cut sold traces back to a specific animal and pen. Here's what that means for freshness and how ordering works.",
    date: "2026-07-20",
    category: "Retail",
    body: "Retail is the last step of the same chain that starts in our feedlot — there's no separate supplier in between. That's what lets us guarantee freshness and consistent grading on individual cuts, not just bulk orders.\n\nOrders placed online are prepared to order and delivered, with farm-gate pickup available for customers near the feedlot. Every cut is traceable back to its pen and feeding record, the same traceability wholesale partners rely on, just sized for a household order.",
  },
  {
    slug: "livestock-finishing",
    title: "Contract finishing: bring us your cattle, we finish them right",
    excerpt: "For ranches and producers who raise cattle but don't run a feedlot — a finishing program that hands animals back market-ready.",
    date: "2026-07-24",
    category: "Finishing",
    body: "Not every producer wants to run a feedlot, and that's exactly what contract finishing is for. You bring cattle to us at the weight and age you have them, and we take them through a formulated finishing ration, routine veterinary care and regular weigh-ins until they hit target market weight and grade.\n\nYou get the same monitored nutrition and welfare standards our own herd gets, with full weight and health records handed back with the animal. It's a way to access professional feedlot finishing without the fixed cost of running your own pens.",
  },
  {
    slug: "feedlot-training",
    title: "Feedlot training: what we teach, and why it's hands-on",
    excerpt: "Classroom theory doesn't run a feedlot. Our training is built from the daily routine that runs ours — nutrition, health, records and pen management.",
    date: "2026-07-28",
    category: "Training",
    body: "Most feedlot failures aren't caused by bad cattle — they're caused by gaps in routine: inconsistent feeding times, missed vaccination windows, no weight records to catch a problem early. Our training program is built directly from the routine that runs Kings Prime Farms, not a generic curriculum.\n\nSessions cover nutrition and ration formulation, daily feeding and pen management, veterinary and health protocols, and the record-keeping that turns a feedlot from guesswork into a measurable business. Training can run on-site at your own feedlot or hosted at ours, for owners, managers or feedlot staff.",
  },
  {
    slug: "feedlot-support",
    title: "Feedlot support: help after the training ends",
    excerpt: "An ongoing advisory line for nutrition questions, health issues and operational decisions once your feedlot is up and running.",
    date: "2026-08-01",
    category: "Support",
    body: "Training gets a feedlot started; support is what keeps it running well once real conditions — a slow-gaining pen, a feed cost spike, an unexpected health issue — show up. Our feedlot support service is ongoing advisory access to the same standards we run our own operation on.\n\nThat includes ration adjustments as feed prices or animal condition change, guidance on veterinary and health protocols, and help reading your own performance numbers — ADG, FCR, feed cost per kg gain — to catch problems while they're still cheap to fix. It pairs naturally with our livestock management system, which gives you the numbers support is built to act on.",
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

export const systemScreens = [
  { label: "Farm dashboard & modules", img: "/images/system/dashboard-menu.jpg" },
  { label: "Per-animal tag detail", img: "/images/system/animal-detail.jpg" },
  { label: "Weight & ADG tracking", img: "/images/system/weight-tracking.jpg" },
  { label: "Feed cost tracking", img: "/images/system/feeds-tracking.jpg" },
  { label: "Branded PDF reports", img: "/images/system/report-history.jpg" },
];

export const galleryItems = [
  { label: "Pen 3, dusk", img: "/images/gallery/pen-3-dusk.jpg", w: 1280, h: 960 },
  { label: "Pen 2, dusk", img: "/images/gallery/pen-2-dusk.jpg", w: 1280, h: 960 },
  { label: "Pen 5 signage", img: "/images/gallery/pen-5-signage.jpg", w: 960, h: 1280 },
  { label: "Pen 6, daylight", img: "/images/gallery/pen-6-daylight.jpg", w: 960, h: 1280 },
  { label: "K188", img: "/images/gallery/portrait-k188.jpg", w: 960, h: 1280 },
  { label: "Calf", img: "/images/gallery/portrait-calf.jpg", w: 960, h: 1280 },
  { label: "Multi-breed stock", img: "/images/gallery/multi-breed.jpg", w: 1280, h: 960 },
  { label: "Boran, Sahiwal & crossbred", img: "/images/gallery/multi-breed-2.jpg", w: 960, h: 1280 },
  { label: "Bull portrait", img: "/images/gallery/bull-portrait.jpg", w: 1280, h: 960 },
  { label: "Feeding time", img: "/images/gallery/bull-candid.jpg", w: 1280, h: 960 },
  { label: "K105 at the trough", img: "/images/gallery/feeding-k105.jpg", w: 1280, h: 960 },
  { label: "Trough close", img: "/images/gallery/feeding-trough.jpg", w: 960, h: 1280 },
  { label: "Evening feed", img: "/images/gallery/feeding-evening.jpg", w: 1280, h: 960 },
  { label: "Resting herd", img: "/images/gallery/resting-herd.jpg", w: 1280, h: 960 },
  { label: "Under the trees", img: "/images/gallery/white-bulls.jpg", w: 1280, h: 960 },
  { label: "Pen 6, wide", img: "/images/gallery/wide-pen6.jpg", w: 960, h: 1280 },
  { label: "Golden hour", img: "/images/gallery/golden-hour.jpg", w: 1280, h: 960 },
  { label: "Storm light", img: "/images/gallery/stormy-sky.jpg", w: 960, h: 1280 },
];
