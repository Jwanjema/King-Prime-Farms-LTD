import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { feedlotStages } from "@/data/site";

export const metadata = { title: "Feedlot activities" };

export default function Feedlot() {
  return (
    <>
      <div className="page-hero tex-pine">
        <div className="wrap">
          <div className="eyebrow tag">Pen to plate</div>
          <h1>Inside the feedlot</h1>
          <p className="lead">
            A feedlot is only as good as its routine. These are the six stages every animal moves
            through before it earns the King Prime grade.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--cream-dim)" }}>
        <div className="wrap">
          <div className="timeline" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
            <Reveal className="tex-pine" style={{ aspectRatio: "4/3", position: "relative" }}>
              <div className="glabel" style={{ position: "absolute", left: 10, bottom: 10, color: "var(--cream)", fontSize: 10, background: "rgba(20,24,15,0.6)", padding: "5px 9px" }}>Modern housing</div>
            </Reveal>
            <Reveal className="tex-pine2" style={{ aspectRatio: "4/3", position: "relative" }}>
              <div className="glabel" style={{ position: "absolute", left: 10, bottom: 10, color: "var(--cream)", fontSize: 10, background: "rgba(20,24,15,0.6)", padding: "5px 9px" }}>Nutrition program</div>
            </Reveal>
            <Reveal className="tex-pine" style={{ aspectRatio: "4/3", position: "relative" }}>
              <div className="glabel" style={{ position: "absolute", left: 10, bottom: 10, color: "var(--cream)", fontSize: 10, background: "rgba(20,24,15,0.6)", padding: "5px 9px" }}>Veterinary care</div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
