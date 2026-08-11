// One-off: adds the new service-linked blog posts (premium-beef-production,
// wholesale-supply, retail-meat-sales, livestock-finishing, feedlot-training,
// feedlot-support) to the already-live "posts" collection. Unlike
// seed-firestore.mjs, this does not skip when the collection is non-empty —
// it skips per-post by slug, so it's safe to re-run.
// Run manually: node scripts/add-service-posts.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { posts } from "../data/site.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const NEW_SLUGS = [
  "premium-beef-production",
  "wholesale-supply",
  "retail-meat-sales",
  "livestock-finishing",
  "feedlot-training",
  "feedlot-support",
];

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
  console.error(`Missing env vars: ${missing.join(", ")}. Populate .env.local first.`);
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

async function main() {
  const toAdd = posts.filter((p) => NEW_SLUGS.includes(p.slug));
  if (toAdd.length !== NEW_SLUGS.length) {
    const found = toAdd.map((p) => p.slug);
    console.error("Missing expected posts in data/site.js:", NEW_SLUGS.filter((s) => !found.includes(s)));
    process.exit(1);
  }

  let added = 0;
  let skipped = 0;
  for (const p of toAdd) {
    const existing = await db.collection("posts").where("slug", "==", p.slug).limit(1).get();
    if (!existing.empty) {
      console.log(`Skipping "${p.slug}" — already exists.`);
      skipped++;
      continue;
    }
    await db.collection("posts").add({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      body: p.body,
      category: p.category,
      date: p.date,
      published: true,
    });
    console.log(`Added "${p.slug}".`);
    added++;
  }

  console.log(`Done. Added ${added}, skipped ${skipped}.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
