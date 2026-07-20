import ProductCard from "@/components/ProductCard";
import SectionHead from "@/components/SectionHead";
import CowChart from "@/components/CowChart";
import { products } from "@/data/site";

export const metadata = { title: "Shop premium beef" };

export default function Products() {
  return (
    <>
      <div className="page-hero tex-beef">
        <div className="wrap">
          <div className="eyebrow tag">The cuts</div>
          <h1>Premium meat products</h1>
          <p className="lead">
            Add cuts to your order and check out on WhatsApp — we confirm final weight, delivery
            and payment on chat. Wholesale volumes welcome.
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
          <div className="grid-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
