import "server-only";
import { campdavidFetch, toImageUrl } from "./client";

// Product records come back with hardcoded stock (Product.php always
// appends stock: 1000 — the backend's inventory logic is stubbed) so we
// pass it through untouched and never build "in stock"/"out of stock" UI
// on it. hasOffer/offerPrice are used as-is for display and pricing.
function normalizeProduct(p) {
  return { ...p, imageUrl: toImageUrl(p.photo) };
}

function normalizeProducts(list) {
  return Array.isArray(list) ? list.map(normalizeProduct) : [];
}

export async function getCategories() {
  const { ok, data } = await campdavidFetch("/categories", {
    body: { filer: "all" },
    revalidate: 60,
  });
  return ok && Array.isArray(data) ? data : [];
}

export async function getCategoryProducts(categoryId = "all") {
  const { ok, data } = await campdavidFetch("/category-products", {
    body: { category_id: categoryId },
    revalidate: 60,
  });
  return ok ? normalizeProducts(data) : [];
}

export async function searchProducts(query) {
  const { ok, data } = await campdavidFetch("/search-products", {
    body: { query },
  });
  return ok ? normalizeProducts(data) : [];
}

export async function getProductDetails(productId) {
  const { ok, data } = await campdavidFetch("/getProductDetails", {
    body: { product_id: productId },
  });
  if (!ok || data?.success !== "1" || !data?.product) return null;
  return normalizeProduct(data.product);
}

export async function getUnits() {
  const { ok, data } = await campdavidFetch("/units", { method: "GET", revalidate: 60 });
  return ok && Array.isArray(data) ? data : [];
}

export async function getOutlets() {
  const { ok, data } = await campdavidFetch("/outlets", { method: "GET", revalidate: 60 });
  return ok && Array.isArray(data) ? data : [];
}

export async function getPromotions() {
  const { ok, data } = await campdavidFetch("/getPromotionsList", { method: "GET", revalidate: 60 });
  return ok && Array.isArray(data) ? data : [];
}
