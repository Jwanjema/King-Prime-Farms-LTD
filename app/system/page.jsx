import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Counter from "@/components/Counter";
import SystemScreens from "@/components/SystemScreens";
import { SYSTEM_PLAY_STORE_URL, systemPitch, traceChain, systemStats, systemModuleGroups, systemExtras, systemScreens } from "@/data/site";

export const metadata = {
  title: "Livestock & Feedlot Management System",
  description:
    "The full traceability, costing and reporting software behind Kings Prime Farms — from animal purchase to retail cut — now available for other feedlot and butchery operators.",
};

export default function System() {
  return (
    <>
      <div className="page-hero" style={{ position: "relative", overflow: "hidden" }}>
        <Image src="/images/feedlot-hero.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", zIndex: 0 }} />
        <div className="page-hero-veil" />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow tag">{systemPitch.eyebrow}</div>
          <h1>{systemPitch.title}</h1>
          <p className="lead">{systemPitch.lead}</p>
          <div className="btn-row" style={{ marginTop: 28 }}>
            <Link href="/contact?type=system" className="btn btn-gold">Request a demo</Link>
            <Link href="#modules" className="btn btn-outline">See what's included</Link>
            <a href={SYSTEM_PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Get POSNEXT on Google Play">
              <Image src="/images/google-play-badge.png" alt="Get POSNEXT on Google Play" width={135} height={40} style={{ height: 40, width: "auto" }} />
            </a>
          </div>
        </div>
      </div>

      {/* Signature: the trace chain — the animal's actual path through the business */}
      <section className="trace-band">
        <div className="wrap">
          <div className="sec-eyebrow tag" style={{ color: "var(--gold)", marginBottom: 12 }}>Full traceability</div>
          <h2 style={{ color: "var(--cream)", fontSize: 30, maxWidth: 520, marginBottom: 40 }}>
            Every animal leaves a paper trail — this system writes it automatically
          </h2>
          <div className="trace-chain">
            {traceChain.map((t) => (
              <Reveal key={t.step} className="trace-node">
                <span className="tn-step">{t.step}</span>
                <h4>{t.title}</h4>
                <p>{t.body}</p>
              </Reveal>
            ))}
          </div>
          <p className="trace-caption">
            <strong>One record, start to finish.</strong> Trace any retail cut back through the
            carcass, the pen and the weigh-ins to the animal it came from — and the exact cost it carried at every step.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="stat-strip">
            {systemStats.map((s) => (
              <div key={s.label}>
                <div className="num"><Counter value={s.value} suffix={s.suffix} /></div>
                <div className="lbl tag">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead
            eyebrow="Real screens"
            title="The actual app, running on our own herd"
            sub="No mockups — these are live screens from the system tracking Kings Prime Farms cattle today."
          />
          <SystemScreens screens={systemScreens} />
        </div>
      </section>

      <section id="modules" className="tex-pine on-dark" style={{ scrollMarginTop: 90 }}>
        <div className="wrap">
          <SectionHead eyebrow="Core modules" title="Everything a feedlot and butchery operator needs" />
          <div className="mod-groups">
            {systemModuleGroups.map((g) => (
              <Reveal key={g.tag} className="mod-group">
                <div className="mod-group-head">
                  <span className="mg-tag">{g.tag}</span>
                  <h3>{g.title}</h3>
                </div>
                <div className="mod-list">
                  {g.modules.map((m) => (
                    <div key={m.title} className="mod-item">
                      <h4>{m.title}</h4>
                      <p>{m.body}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead eyebrow="Also included" title="Built for the whole operation, not just the pens" />
          <div className="line-grid cols-3">
            {systemExtras.map((e) => (
              <Reveal key={e.title} className="why-card">
                <h4>{e.title}</h4>
                <p>{e.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--cream-dim)", textAlign: "center" }}>
        <div className="wrap">
          <SectionHead
            center
            eyebrow="Proven in-house"
            title="Not a pitch deck — this runs our own feedlot"
            sub="Every module here is in daily use at Kings Prime Farms. See it running on real animals, real pens and real numbers before you decide."
          />
          <div className="btn-row" style={{ justifyContent: "center", marginTop: 30 }}>
            <Link href="/contact?type=system" className="btn btn-gold">Request a demo</Link>
            <Link href="/feedlot" className="btn btn-outline-dark">See our feedlot</Link>
            <a href={SYSTEM_PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Get POSNEXT on Google Play">
              <Image src="/images/google-play-badge.png" alt="Get POSNEXT on Google Play" width={135} height={40} style={{ height: 40, width: "auto" }} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
