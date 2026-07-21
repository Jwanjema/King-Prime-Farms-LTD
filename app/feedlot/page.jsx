import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { feedlotStages } from "@/data/site";

export const metadata = { title: "Feedlot activities" };

const qaPhotos = [
  { src: "/images/feedlot-housing.jpg", label: "Modern housing" },
  { src: "/images/feedlot-nutrition.jpg", label: "Nutrition program" },
  { src: "/images/feedlot-vet.jpg", label: "Veterinary care" },
];

export default function Feedlot() {
  return (
    <>
      <div className="page-hero" style={{ position: "relative", overflow: "hidden" }}>
        <Image src="/images/feedlot-hero.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", zIndex: 0 }} />
        <div className="page-hero-veil" />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow tag">Pen to plate</div>
          <h1>Inside the feedlot</h1>
          <p className="lead">
            A feedlot is only as good as its routine. These are the six stages every animal moves
            through before it earns the Kings Prime grade.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--cream-dim)" }}>
        <div className="wrap">
          <div className="timeline stages-grid">
            {feedlotStages.map((t) => (
              <Reveal key={t.num} className="t-step" style={{ paddingTop: 20 }}>
                <span className="tnum">Stage {t.num}</span>
                <h4 style={{ fontSize: 18 }}>{t.title}</h4>
                <p style={{ fontSize: 14 }}>{t.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead
            eyebrow="Quality assurance"
            title="Welfare and QA, audited"
            sub="Housing, handling and health standards are reviewed every season — not once at setup."
          />
          <div className="qa-grid">
            {qaPhotos.map((p) => (
              <Reveal key={p.label} style={{ aspectRatio: "4/3", position: "relative", overflow: "hidden" }}>
                <Image src={p.src} alt={p.label} fill sizes="(max-width: 920px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                <div className="glabel" style={{ position: "absolute", left: 10, bottom: 10, color: "var(--cream)", fontSize: 10, background: "rgba(20,24,15,0.6)", padding: "5px 9px", zIndex: 1 }}>{p.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
