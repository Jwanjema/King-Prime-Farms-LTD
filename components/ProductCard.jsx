"use client";
import { useCart } from "@/lib/cart-context";
import Tilt from "@/components/Tilt";
import CutArt from "@/components/CutArt";

export default function ProductCard({ product }) {
  const { add } = useCart();
  return (
    <Tilt>
      <article className="prod-card" style={{ height: "100%" }}>
        <div className="prod-thumb">
          <CutArt id={product.id} />
          {product.badge && <span className="cut-badge tag">{product.badge}</span>}
        </div>
        <h4>{product.name}</h4>
        <div className="p-tag tag">{product.tag}</div>
        <div className="p-price">
          KES {product.price.toLocaleString()} <span>{product.unit}</span>
        </div>
        <div className="p-actions">
          <button className="btn btn-beef btn-sm" style={{ flex: 1, justifyContent: "center" }} onClick={() => add(product)}>
            Add to order
          </button>
        </div>
      </article>
    </Tilt>
  );
}
