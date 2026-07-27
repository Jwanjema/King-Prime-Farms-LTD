import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { adminDb } from "@/lib/firebase-admin";
import { deleteProduct } from "@/lib/admin/products-actions";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

async function getAllProducts() {
  const snap = await adminDb.collection("products").orderBy("sortOrder").get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export default async function AdminProducts() {
  await requireAdmin();
  const products = await getAllProducts();

  return (
    <div style={{ padding: "40px 0" }}>
      <div className="admin-list-head">
        <h1 style={{ fontSize: 28 }}>Products</h1>
        <Link href="/admin/products/new" className="btn btn-gold btn-sm">New product</Link>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.cat}</td>
                <td>KES {p.price?.toLocaleString()} {p.unit}</td>
                <td>{p.active ? "Yes" : "No"}</td>
                <td className="admin-table-actions">
                  <Link href={`/admin/products/${p.id}/edit`} className="btn btn-outline-dark btn-sm">Edit</Link>
                  <DeleteButton action={deleteProduct.bind(null, p.id)} confirmLabel={`Delete "${p.name}"?`} />
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={5} style={{ color: "#8b8a7c", padding: "20px 0" }}>No products yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
