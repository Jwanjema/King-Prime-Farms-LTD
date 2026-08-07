import Image from "next/image";
import { notFound } from "next/navigation";
import CutArt from "@/components/CutArt";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductDetails } from "@/lib/campdavid/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const product = await getProductDetails(params.id);
  return { title: product ? product.name : "Product" };
}

export default async function ProductDetail({ params }) {
  const product = await getProductDetails(params.id);
  if (!product) notFound();

  const price = product.hasOffer && product.offerPrice ? product.offerPrice : product.selling_price;

  return (
    <section style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="wrap grid-2-even" style={{ gap: 50, alignItems: "start" }}>
        <div className="prod-thumb" style={{ aspectRatio: "1/1", position: "relative" }}>
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 920px) 100vw, 45vw" style={{ objectFit: "cover" }} />
          ) : (
            <CutArt id={product.id} />
          )}
        </div>
        <div>
          <div className="p-tag tag">{product.category?.name || ""}</div>
          <h1 style={{ marginTop: 6 }}>{product.name}</h1>
          <div className="p-price" style={{ fontSize: 24, margin: "18px 0" }}>
            KES {Number(price).toLocaleString()} <span>per {product.unit_short || "unit"}</span>
          </div>
          {product.description && (
            <div style={{ color: "#4A4A40", marginBottom: 24 }} dangerouslySetInnerHTML={{ __html: product.description }} />
          )}
          <AddToCartButton product={product} />
        </div>
      </div>
    </section>
  );
}
