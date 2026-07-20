// Firebase client SDK — initialized from NEXT_PUBLIC_FIREBASE_* env vars (see .env.local).
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
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
export const auth = getAuth(app);
export const db = getFirestore(app);

// Suggested Firestore collections:
//   users      { uid, name, email, phone, role: "customer"|"admin", createdAt }
//   products   { name, tag, price, unit, badge, imageUrl, active, sortOrder }
//   posts      { slug, title, excerpt, body, category, date, published }
//   jobs       { title, type, loc, body, open }
//   orders     { userId, items[], total, customerName, phone, location, status, createdAt, updatedAt }
//   enquiries  { type: "contact"|"wholesale", name, email, phone, message, createdAt }
//   feedlotBatches { batchName, breed, headCount, currentStage, weightLog[], vetLog[], status }

export async function fetchProducts() {
  const snap = await getDocs(query(collection(db, "products"), where("active", "==", true), orderBy("sortOrder")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function submitOrder(order) {
  return addDoc(collection(db, "orders"), {
    ...order,
    status: "new",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function submitEnquiry(enquiry) {
  return addDoc(collection(db, "enquiries"), { ...enquiry, createdAt: serverTimestamp() });
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? { uid, ...snap.data() } : null;
}

export async function createUserProfile(uid, { name, email, phone = "" }) {
  const profile = { uid, name, email, phone, role: "customer", createdAt: serverTimestamp() };
  await setDoc(doc(db, "users", uid), profile);
  return profile;
}
