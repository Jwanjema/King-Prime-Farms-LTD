"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { adminDb } from "@/lib/firebase-admin";

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readPostFields(formData) {
  const title = formData.get("title")?.toString().trim() || "";
  const rawSlug = formData.get("slug")?.toString().trim();
  return {
    title,
    slug: rawSlug ? slugify(rawSlug) : slugify(title),
    excerpt: formData.get("excerpt")?.toString().trim() || "",
    body: formData.get("body")?.toString() || "",
    category: formData.get("category")?.toString().trim() || "",
    date: formData.get("date")?.toString().trim() || new Date().toISOString().slice(0, 10),
    published: formData.get("published") === "on",
  };
}

function revalidatePublicPostPages(slug) {
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}

async function assertUniqueSlug(slug, excludeId) {
  const snap = await adminDb.collection("posts").where("slug", "==", slug).get();
  const clashes = snap.docs.filter((d) => d.id !== excludeId);
  if (clashes.length) throw new Error(`Slug "${slug}" is already in use by another post.`);
}

export async function createPost(formData) {
  await requireAdmin();
  const fields = readPostFields(formData);
  await assertUniqueSlug(fields.slug, null);
  await adminDb.collection("posts").add(fields);
  revalidatePublicPostPages(fields.slug);
  revalidatePath("/admin/posts");
}

export async function updatePost(id, formData) {
  await requireAdmin();
  const fields = readPostFields(formData);
  await assertUniqueSlug(fields.slug, id);
  await adminDb.collection("posts").doc(id).set(fields);
  revalidatePublicPostPages(fields.slug);
  revalidatePath("/admin/posts");
}

export async function deletePost(id, slug) {
  await requireAdmin();
  await adminDb.collection("posts").doc(id).delete();
  revalidatePublicPostPages(slug);
  revalidatePath("/admin/posts");
}
