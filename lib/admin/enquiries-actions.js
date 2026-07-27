"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { adminDb } from "@/lib/firebase-admin";

export async function markHandled(id, handled) {
  await requireAdmin();
  await adminDb.collection("enquiries").doc(id).update({ handled });
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}
