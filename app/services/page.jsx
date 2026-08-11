import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { services } from "@/data/site";

export const metadata = { title: "Our services" };

export default function Services() {
  return (
    <>
      <div className="page-hero" style={{ position: "relative", overflow: "hidden" }}>
        <Image src="/images/services-hero.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", zIndex: 0 }} />
        <div className="page-hero-veil" />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow tag">What we do</div>
          <h1>Our services</h1>
          <p className="lead">Eight business lines, one standard of quality — from live animal to finished cut.</p>
        </div>
      </div>

      <section className="tex-pine on-dark" style={{ paddingTop: 60 }}>
        <div className="wrap">
          <div className="svc-grid">
            {services.map((s) => (
              <Link key={s.num} href={`/blog/${s.slug}`} className="svc-card-link">
                <Reveal className="svc-card">
                  <div className="svc-card-media">
                    <Image src={s.img} alt="" fill sizes="(max-width: 640px) 90vw, (max-width: 920px) 45vw, 28vw" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="svc-card-body">
                    <span className="tagnum tag">{s.num} / {s.cat}</span>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    <span className="svc-card-more tag">Read more →</span>
                  </div>
                </Reveal>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ textAlign: "center" }}>
        <div className="wrap">
          <SectionHead
            center
            eyebrow="Work with us"
            title="Wholesale, finishing or retail?"
            sub="Whether you need a reliable bulk supply program, contract finishing for your herd, or premium cuts delivered to your door — start the conversation."
          />
          <div className="btn-row" style={{ justifyContent: "center", marginTop: 30 }}>
            <Link href="/contact" className="btn btn-gold">Make an enquiry</Link>
            <Link href="/products" className="btn btn-outline-dark">Shop retail cuts</Link>
          </div>
        </div>
      </section>
    </>
  );
}
