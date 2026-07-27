import "server-only";
import { adminDb } from "@/lib/firebase-admin";

export async function getProducts() {
  const snap = await adminDb.collection("products").where("active", "==", true).orderBy("sortOrder").get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
