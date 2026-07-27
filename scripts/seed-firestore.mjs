// One-time seed: writes data/site.js's products/posts/jobs arrays into Firestore.
// Run manually: node scripts/seed-firestore.mjs
// Requires FIREBASE_ADMIN_* and the six NEXT_PUBLIC_FIREBASE_* vars to be set in .env.local.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { products, posts, jobs } from "../data/site.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const required = ["FIREBASE_ADMIN_PROJECT_ID", "FIREBASE_ADMIN_CLIENT_EMAIL", "FIREBASE_ADMIN_PRIVATE_KEY"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing env vars: ${missing.join(", ")}. Populate .env.local first (see the plan's manual steps).`);
  process.exit(1);
}

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});
const db = getFirestore();

async function seedCollection(name, items, mapFn) {
  const snap = await db.collection(name).limit(1).get();
  if (!snap.empty) {
    console.log(`Skipping "${name}" — collection already has documents.`);
    return;
  }
  const batch = db.batch();
  items.forEach((item, i) => {
    const ref = db.collection(name).doc();
    batch.set(ref, mapFn(item, i));
  });
  await batch.commit();
  console.log(`Seeded ${items.length} documents into "${name}".`);
}

async function main() {
  await seedCollection("products", products, (p, i) => ({
    name: p.name,
    tag: p.tag,
    price: p.price,
    unit: p.unit,
    badge: p.badge || null,
    cat: p.cat || "Beef",
    // Stable key into CutArt.jsx's hand-drawn illustration map — independent
    // of Firestore's auto-generated doc id, which changes per write.
    cutId: p.id,
    imageUrl: null,
    active: true,
    sortOrder: i,
  }));

  await seedCollection("posts", posts, (p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    body: p.body,
    category: p.category,
    date: p.date,
    published: true,
  }));

  await seedCollection("jobs", jobs, (j) => ({
    title: j.title,
    type: j.type,
    loc: j.loc,
    body: j.body,
    open: true,
  }));

  console.log("Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
