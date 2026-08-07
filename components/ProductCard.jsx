import Image from "next/image";
import Link from "next/link";
import Tilt from "@/components/Tilt";
import CutArt from "@/components/CutArt";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }) {
  const price = product.hasOffer && product.offerPrice ? product.offerPrice : product.selling_price;
  return (
    <Tilt>
      <article className="prod-card" style={{ height: "100%" }}>
        <Link href={`/products/${product.id}`} style={{ display: "contents" }}>
          <div className="prod-thumb">
            {product.imageUrl ? (
              <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 640px) 50vw, 25vw" style={{ objectFit: "cover" }} />
            ) : (
              <CutArt id={product.cutId || product.id} />
            )}
            {product.hasOffer ? <span className="cut-badge tag">Offer</span> : product.isFeatured ? <span className="cut-badge tag">Featured</span> : null}
          </div>
          <h4>{product.name}</h4>
          <div className="p-tag tag">{product.category?.name || ""}</div>
        </Link>
        <div className="p-price">
          KES {Number(price).toLocaleString()} <span>per {product.unit_short || "unit"}</span>
        </div>
        <div className="p-actions">
          <AddToCartButton product={product} compact />
        </div>
      </article>
    </Tilt>
  );
}
