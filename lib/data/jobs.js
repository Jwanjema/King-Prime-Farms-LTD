import "server-only";
import { adminDb } from "@/lib/firebase-admin";

export async function getJobs() {
  const snap = await adminDb.collection("jobs").where("open", "==", true).get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
