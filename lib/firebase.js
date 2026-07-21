// Firebase client SDK — initialized from NEXT_PUBLIC_FIREBASE_* env vars (see .env.local).
// No user auth on this site (ordering/accounts live in the King Prime app) — this is
// foundation for a future CMS (blog posts, jobs, product content) via Firestore.
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(config);
export const db = getFirestore(app);

// Suggested Firestore collections (CMS, not yet enabled):
//   products   { name, tag, price, unit, badge, imageUrl, active, sortOrder }
//   posts      { slug, title, excerpt, body, category, date, published }
//   jobs       { title, type, loc, body, open }
//   enquiries  { type: "contact"|"wholesale", name, email, phone, message, createdAt }
//   feedlotBatches { batchName, breed, headCount, currentStage, weightLog[], vetLog[], status }

export async function fetchProducts() {
  const snap = await getDocs(query(collection(db, "products"), where("active", "==", true), orderBy("sortOrder")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function submitEnquiry(enquiry) {
  return addDoc(collection(db, "enquiries"), { ...enquiry, createdAt: serverTimestamp() });
}
