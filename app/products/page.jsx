import Image from "next/image";
import CategoryFilterGrid from "@/components/CategoryFilterGrid";
import SectionHead from "@/components/SectionHead";
import CowChart from "@/components/CowChart";
import { getCategories, getCategoryProducts } from "@/lib/campdavid/catalog";

export const metadata = { title: "Shop premium beef" };
export const revalidate = 60;

export default async function Products() {
  const [categories, products] = await Promise.all([getCategories(), getCategoryProducts("all")]);
  return (
    <>
      <div className="page-hero" style={{ position: "relative", overflow: "hidden" }}>
        <Image src="/images/products-hero.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", zIndex: 0 }} />
        <div className="page-hero-veil" />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow tag">The cuts</div>
          <h1>Premium meat products</h1>
          <p className="lead">
            Browse our cuts and order straight from this site — pickup or delivery. Wholesale
            volumes welcome via enquiry.
          </p>
        </div>
      </div>

      <section style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Butcher's chart"
            title="Know your cuts"
            sub="Every animal maps to the cuts below — hover the chart to see where yours comes from."
          />
          <CowChart />
        </div>
      </section>

      <section style={{ paddingTop: 40 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Retail & wholesale"
            title="The catalogue"
            sub="Prices are indicative per kg; final weight is confirmed at packing."
          />
          <CategoryFilterGrid categories={categories} initialProducts={products} />
        </div>
      </section>
    </>
  );
}
