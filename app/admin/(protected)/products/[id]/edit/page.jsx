import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { adminDb } from "@/lib/firebase-admin";
import { updateProduct } from "@/lib/admin/products-actions";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProduct({ params }) {
  await requireAdmin();
  const doc = await adminDb.collection("products").doc(params.id).get();
  if (!doc.exists) notFound();
  const product = { id: doc.id, ...doc.data() };

  return (
    <div style={{ padding: "40px 0", maxWidth: 560 }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Edit product</h1>
      <ProductForm product={product} action={updateProduct.bind(null, product.id)} />
    </div>
  );
}
