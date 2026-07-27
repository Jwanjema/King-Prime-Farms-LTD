"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Shared create/edit form. `action` is a Server Action bound to the product
// id for edits, or the plain create action for new products (see the two
// page.jsx files that render this).
export default function ProductForm({ product, action }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const submit = async (formData) => {
    setPending(true);
    await action(formData);
    setPending(false);
    router.push("/admin/products");
  };

  return (
    <form action={submit}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required defaultValue={product?.name} placeholder="Ribeye" />
      </div>
      <div className="field">
        <label htmlFor="tag">Tag</label>
        <input id="tag" name="tag" defaultValue={product?.tag} placeholder="Dry-aged 21 days" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="field">
          <label htmlFor="price">Price (KES)</label>
          <input id="price" name="price" type="number" min="0" step="1" required defaultValue={product?.price} />
        </div>
        <div className="field">
          <label htmlFor="unit">Unit</label>
          <input id="unit" name="unit" defaultValue={product?.unit || "per kg"} placeholder="per kg" />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="field">
          <label htmlFor="badge">Badge (optional)</label>
          <input id="badge" name="badge" defaultValue={product?.badge || ""} placeholder="Dry-aged, Premium, Wholesale…" />
        </div>
        <div className="field">
          <label htmlFor="cat">Category</label>
          <input id="cat" name="cat" defaultValue={product?.cat || "Beef"} placeholder="Beef, Aged, Goat & Lamb, Choma…" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="cutId">Illustration (optional)</label>
        <input id="cutId" name="cutId" defaultValue={product?.cutId || ""} placeholder="ribeye, sirloin, tbone… (see CutArt.jsx for ids)" />
        <p style={{ fontSize: 11.5, color: "#8b8a7c", marginTop: 6 }}>
          Matches one of the hand-drawn SVG cuts. Leave blank to fall back to a generic ribeye icon, or set an image URL below to use a photo instead.
        </p>
      </div>
      <div className="field">
        <label htmlFor="imageUrl">Image URL (optional)</label>
        <input id="imageUrl" name="imageUrl" defaultValue={product?.imageUrl || ""} placeholder="https://firebasestorage.googleapis.com/…" />
        <p style={{ fontSize: 11.5, color: "#8b8a7c", marginTop: 6 }}>
          If set, this photo replaces the illustration on the product card.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="field">
          <label htmlFor="sortOrder">Sort order</label>
          <input id="sortOrder" name="sortOrder" type="number" defaultValue={product?.sortOrder ?? 0} />
        </div>
        <div className="field" style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 24 }}>
          <input id="active" name="active" type="checkbox" style={{ width: "auto" }} defaultChecked={product?.active ?? true} />
          <label htmlFor="active" style={{ marginBottom: 0 }}>Active (visible on the site)</label>
        </div>
      </div>
      <button type="submit" className="btn btn-gold" disabled={pending}>
        {pending ? "Saving…" : product ? "Save changes" : "Create product"}
      </button>
    </form>
  );
}
