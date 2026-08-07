"use client";
import { useState, useTransition } from "react";
import ProductCard from "@/components/ProductCard";

export default function CategoryFilterGrid({ categories, initialProducts }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState(initialProducts);
  const [isPending, startTransition] = useTransition();

  async function selectCategory(categoryId) {
    setActiveCategory(categoryId);
    const res = await fetch(`/api/catalog/products?category_id=${encodeURIComponent(categoryId)}`);
    const data = await res.json();
    startTransition(() => setProducts(data));
  }

  return (
    <>
      <div className="tab-row" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
        <button
          type="button"
          onClick={() => selectCategory("all")}
          className={`btn btn-sm ${activeCategory === "all" ? "btn-beef" : "btn-outline-dark"}`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => selectCategory(c.id)}
            className={`btn btn-sm ${activeCategory === c.id ? "btn-beef" : "btn-outline-dark"}`}
          >
            {c.short_name || c.name}
          </button>
        ))}
      </div>
      <div className="grid-4" style={{ opacity: isPending ? 0.6 : 1, transition: "opacity .15s" }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {products.length === 0 && <p>No products in this category yet.</p>}
    </>
  );
}
