import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";

export const metadata = { title: "About us" };

const values = [
  { num: "01", title: "Animal welfare", body: "Space, nutrition and handling standards audited every season." },
  { num: "02", title: "Food safety", body: "Hygienic processing from pen to package." },
  { num: "03", title: "Traceability", body: "Every carcass linked back to its pen and feeding record." },
  { num: "04", title: "Consistency", body: "The same grade and marbling, delivery after delivery." },
];

export default function About() {
  return (
    <>
      <div className="page-hero tex-pine">
        <div className="wrap">
          <div className="eyebrow tag">Our story</div>
          <h1>Built on land, raised on standards.</h1>
          <p className="lead">
            A full-cycle beef operation — feedlot, dry-aging and butchery under one roof, and one standard.
          </p>
        </div>
      </div>

      <section>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 70 }}>
          <Reveal>
            <h2 style={{ fontSize: 30, marginBottom: 18 }}>History</h2>
            <p style={{ color: "#4A4A40", marginBottom: 16 }}>
              King Prime Farms Ltd began as a working feedlot with a simple conviction: Kenyan
              beef can compete with the best in the world when it's raised, finished and processed
              with discipline. Over the years the operation has grown into a complete value chain —
              feedlot operations, dry-aging rooms and an in-house butchery — serving retail
              customers, hotels, butcheries and wholesale partners.
            </p>
            <h2 style={{ fontSize: 30, margin: "34px 0 18px" }}>Mission</h2>
            <p style={{ color: "#4A4A40", marginBottom: 16 }}>
              Raise cattle well, finish them properly, and put beef on the table that tastes like
              the care that went into it.
            </p>
            <h2 style={{ fontSize: 30, margin: "34px 0 18px" }}>Vision</h2>
            <p style={{ color: "#4A4A40" }}>
              To be East Africa's most trusted name in premium beef and professional feedlot
              management — and to carry Kenyan beef confidently into international markets.
            </p>
          </Reveal>
          <Reveal className="tex-pine" style={{ aspectRatio: "3/4", position: "relative", alignSelf: "start" }}>
            <div style={{ position: "absolute", left: 16, bottom: 16, background: "rgba(20,24,15,0.72)", color: "var(--cream)", fontSize: 11, padding: "8px 12px" }}>
              Founders / farm photo slot
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--cream-dim)" }}>
        <div className="wrap">
          <SectionHead eyebrow="What we stand for" title="Core values" />
          <div className="timeline" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
            {values.map((v) => (
              <Reveal key={v.num} className="t-step">
                <span className="tnum">{v.num}</span>
                <h4>{v.title}</h4>
                <p>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
