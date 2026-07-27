"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { adminDb } from "@/lib/firebase-admin";

function readProductFields(formData) {
  return {
    name: formData.get("name")?.toString().trim() || "",
    tag: formData.get("tag")?.toString().trim() || "",
    price: Number(formData.get("price")) || 0,
    unit: formData.get("unit")?.toString().trim() || "per kg",
    badge: formData.get("badge")?.toString().trim() || null,
    cat: formData.get("cat")?.toString().trim() || "Beef",
    cutId: formData.get("cutId")?.toString().trim() || null,
    imageUrl: formData.get("imageUrl")?.toString().trim() || null,
    active: formData.get("active") === "on",
    sortOrder: Number(formData.get("sortOrder")) || 0,
  };
}

function revalidatePublicProductPages() {
  revalidatePath("/");
  revalidatePath("/products");
}

export async function createProduct(formData) {
  await requireAdmin();
  await adminDb.collection("products").add(readProductFields(formData));
  revalidatePublicProductPages();
  revalidatePath("/admin/products");
}

export async function updateProduct(id, formData) {
  await requireAdmin();
  await adminDb.collection("products").doc(id).set(readProductFields(formData));
  revalidatePublicProductPages();
  revalidatePath("/admin/products");
}

export async function deleteProduct(id) {
  await requireAdmin();
  await adminDb.collection("products").doc(id).delete();
  revalidatePublicProductPages();
  revalidatePath("/admin/products");
}
