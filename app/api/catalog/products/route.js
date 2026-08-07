import { getCategoryProducts } from "@/lib/campdavid/catalog";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category_id") || "all";
  const products = await getCategoryProducts(categoryId);
  return Response.json(products);
}
