"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { adminDb } from "@/lib/firebase-admin";

function readJobFields(formData) {
  return {
    title: formData.get("title")?.toString().trim() || "",
    type: formData.get("type")?.toString().trim() || "Full-time",
    loc: formData.get("loc")?.toString().trim() || "",
    body: formData.get("body")?.toString() || "",
    open: formData.get("open") === "on",
  };
}

export async function createJob(formData) {
  await requireAdmin();
  await adminDb.collection("jobs").add(readJobFields(formData));
  revalidatePath("/careers");
  revalidatePath("/admin/jobs");
}

export async function updateJob(id, formData) {
  await requireAdmin();
  await adminDb.collection("jobs").doc(id).set(readJobFields(formData));
  revalidatePath("/careers");
  revalidatePath("/admin/jobs");
}

export async function deleteJob(id) {
  await requireAdmin();
  await adminDb.collection("jobs").doc(id).delete();
  revalidatePath("/careers");
  revalidatePath("/admin/jobs");
}
