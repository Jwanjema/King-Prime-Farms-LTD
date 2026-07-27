import Image from "next/image";
import Tilt from "@/components/Tilt";
import CutArt from "@/components/CutArt";
import { RETAIL_SITE_URL } from "@/data/site";

export default function ProductCard({ product }) {
  return (
    <Tilt>
      <article className="prod-card" style={{ height: "100%" }}>
        <div className="prod-thumb">
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 640px) 50vw, 25vw" style={{ objectFit: "cover" }} />
          ) : (
            <CutArt id={product.cutId || product.id} />
          )}
          {product.badge && <span className="cut-badge tag">{product.badge}</span>}
        </div>
        <h4>{product.name}</h4>
        <div className="p-tag tag">{product.tag}</div>
        <div className="p-price">
          KES {product.price.toLocaleString()} <span>{product.unit}</span>
        </div>
        <div className="p-actions">
          <a
            href={RETAIL_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-beef btn-sm"
            style={{ flex: 1, justifyContent: "center" }}
          >
            Shop Retail
          </a>
        </div>
      </article>
    </Tilt>
  );
}
