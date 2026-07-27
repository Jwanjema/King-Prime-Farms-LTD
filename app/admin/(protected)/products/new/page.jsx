import { requireAdmin } from "@/lib/admin/auth";
import { createProduct } from "@/lib/admin/products-actions";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProduct() {
  await requireAdmin();
  return (
    <div style={{ padding: "40px 0", maxWidth: 560 }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>New product</h1>
      <ProductForm action={createProduct} />
    </div>
  );
}
