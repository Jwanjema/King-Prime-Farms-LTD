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
          <p className="lead">Six business lines, one standard of quality — from live animal to finished cut.</p>
        </div>
      </div>

      <section className="tex-pine on-dark" style={{ paddingTop: 60 }}>
        <div className="wrap">
          <div className="line-grid cols-3">
            {services.map((s) => (
              <Reveal key={s.num} className="svc-card">
                <span className="tagnum tag">{s.num} / {s.cat}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ textAlign: "center" }}>
          <SectionHead eyebrow="Work with us" title="Wholesale, finishing or retail?" />
          <p style={{ color: "#5B5B50", maxWidth: 560, margin: "-24px auto 30px" }}>
            Whether you need a reliable bulk supply program, contract finishing for your herd, or
            premium cuts delivered to your door — start the conversation.
          </p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link href="/contact" className="btn btn-gold">Make an enquiry</Link>
            <Link href="/products" className="btn btn-outline-dark">Shop retail cuts</Link>
          </div>
        </div>
      </section>
    </>
  );
}
