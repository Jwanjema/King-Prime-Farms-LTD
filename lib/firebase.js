// Firebase client SDK — initialized from NEXT_PUBLIC_FIREBASE_* env vars (see .env.local).
// Used by: the admin login page (adminSignIn/adminSignOut) and the public
// contact form (submitEnquiry, a rules-gated public "create" write). Public
// pages read products/posts/jobs server-side via lib/firebase-admin.js and
// lib/data/*.js instead — fetchProducts() below is kept for any future
// client-side use but isn't called by the site today.
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
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
export const auth = getAuth(app);

// Used by app/admin/login/page.jsx — signs in, then the page exchanges the
// resulting ID token for a server session cookie via POST /api/session.
export function adminSignIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

const googleProvider = new GoogleAuthProvider();

export function adminSignInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function adminSignOut() {
  return signOut(auth);
}

// Firestore collections (see firestore.rules for read/write access):
//   products   { name, tag, price, unit, badge, cat, cutId, imageUrl, active, sortOrder }
//   posts      { slug, title, excerpt, body, category, date, published }
//   jobs       { title, type, loc, body, open }
//   enquiries  { type: "contact"|"wholesale", name, email, phone, company, message, createdAt, handled }

export async function fetchProducts() {
  const snap = await getDocs(query(collection(db, "products"), where("active", "==", true), orderBy("sortOrder")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function submitEnquiry(enquiry) {
  return addDoc(collection(db, "enquiries"), { ...enquiry, createdAt: serverTimestamp() });
}
