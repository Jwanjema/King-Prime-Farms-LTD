import Link from "next/link";
import dynamic from "next/dynamic";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import ProductCard from "@/components/ProductCard";
import Counter from "@/components/Counter";
import { services, products, feedlotStages, whyUs } from "@/data/site";

const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });

const marqueeItems = ["Dry-aged ribeye", "Feedlot finished", "Farm-to-table trace", "Wholesale supply", "Nairobi · Kenya", "Grade A beef"];

export default function Home() {
  return (
    <>
      <section className="hero" style={{ padding: 0 }}>
        <Hero3D />
        <div className="hero-veil" />
        <div className="wrap hero-fg" style={{ padding: "110px 32px 90px" }}>
          <div className="hero-grid">
            <div>
              <div className="eyebrow tag">Nairobi, Kenya · Feedlot & butchery</div>
              <h1>
                Premium beef.<br />
                Expert feedlot<br />
                management, <em>done right.</em>
              </h1>
              <p className="lead">
                From our feedlot to your table — dry-aged excellence and trusted livestock
                production, raised, finished and processed under one roof.
              </p>
              <div className="btn-row">
                <Link href="/products" className="btn btn-gold">Shop meat</Link>
                <Link href="/contact" className="btn btn-outline">Visit our farm</Link>
              </div>
              <div className="hero-stats">
                <div><div className="num"><Counter value={1200} suffix="+" /></div><div className="lbl tag">Head on feed</div></div>
                <div><div className="num"><Counter value={21} suffix="-day" /></div><div className="lbl tag">Dry-age minimum</div></div>
                <div><div className="num"><Counter value={100} suffix="%" /></div><div className="lbl tag">Traceable origin</div></div>
              </div>
            </div>
            <div className="stamp" aria-hidden>
              <div className="stamp-inner">
                <div className="crown">♛</div>
                <div className="l1">King Prime</div>
                <div className="l2">GRADE · A · BEEF</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>

      <section>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 70, alignItems: "center" }} data-about-grid>
          <Reveal className="tex-pine" style={{ aspectRatio: "4/5", position: "relative" }}>
            <div style={{ position: "absolute", left: 16, bottom: 16, background: "rgba(20,24,15,0.72)", color: "var(--cream)", fontSize: 11, padding: "8px 12px" }}>
              Feedlot — photography slot
            </div>
          </Reveal>
          <Reveal>
            <div className="sec-eyebrow tag">Our story</div>
            <h2 style={{ fontSize: 34, marginBottom: 18 }}>Built on land, raised on standards.</h2>
            <p style={{ color: "#4A4A40", marginBottom: 16, maxWidth: 520 }}>
              King Prime Farms Ltd began as a working feedlot and has grown into a full-cycle
              beef operation — from animal selection through finishing, dry-aging and butchery.
              Every step stays under our own supervision, so quality is never handed off.
            </p>
            <Link href="/about" className="btn btn-outline-dark btn-sm">Read our story</Link>
          </Reveal>
        </div>
      </section>

      <section className="tex-pine on-dark">
        <div className="wrap">
          <SectionHead eyebrow="What we do" title="Our services" sub="Six business lines, one standard of quality — from live animal to finished cut." />
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
        <div className="wrap">
          <SectionHead eyebrow="The cuts" title="Shop premium beef" sub="Add cuts to your order and check out on WhatsApp — we confirm weight, delivery and payment." />
          <div className="grid-4">
            {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div style={{ marginTop: 34, textAlign: "center" }}>
            <Link href="/products" className="btn btn-beef">View the full catalogue</Link>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--cream-dim)" }}>
        <div className="wrap">
          <SectionHead eyebrow="Pen to plate" title="Inside the feedlot" sub="The six stages every animal moves through before it earns the King Prime grade." />
          <div className="timeline">
            {feedlotStages.map((t) => (
              <Reveal key={t.num} className="t-step">
                <span className="tnum">Stage {t.num}</span>
                <h4>{t.title}</h4>
                <p>{t.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead eyebrow="Why us" title="Why choose King Prime Farms" />
          <div className="line-grid cols-4">
            {whyUs.slice(0, 8).map((w) => (
              <Reveal key={w.title} className="why-card">
                <div className="wicon">{w.icon}</div>
                <h4>{w.title}</h4>
                <p>{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="testi">
        <div className="wrap">
          <blockquote>
            "The most consistent beef supplier we've worked with — every delivery is graded
            exactly like the last."
          </blockquote>
          <cite className="tag">— Wholesale partner, Nairobi</cite>
        </div>
      </section>
    </>
  );
}
