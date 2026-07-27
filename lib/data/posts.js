import "server-only";
import { adminDb } from "@/lib/firebase-admin";

export async function getPosts() {
  const snap = await adminDb.collection("posts").where("published", "==", true).orderBy("date", "desc").get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getPostBySlug(slug) {
  const snap = await adminDb.collection("posts").where("slug", "==", slug).where("published", "==", true).limit(1).get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() };
}
