import { searchProducts } from "@/lib/campdavid/catalog";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  if (!query.trim()) return Response.json([]);
  const products = await searchProducts(query);
  return Response.json(products);
}
