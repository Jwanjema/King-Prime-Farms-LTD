import SectionHead from "@/components/SectionHead";
import { jobs, site } from "@/data/site";

export const metadata = { title: "Careers" };

export default function Careers() {
  return (
    <>
      <div className="page-hero tex-pine">
        <div className="wrap">
          <div className="eyebrow tag">Join the team</div>
          <h1>Careers at King Prime Farms</h1>
          <p className="lead">We hire people who take pride in doing things properly — on the feedlot, in the butchery, and on the road.</p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <SectionHead eyebrow="Open roles" title="Current openings" />
          <div style={{ display: "grid", gap: 14, maxWidth: 780 }}>
            {jobs.map((j) => (
              <article key={j.title} style={{ border: "1px solid var(--line-dark)", padding: "26px 28px", display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "center", background: "var(--cream)" }}>
                <div style={{ maxWidth: 480 }}>
                  <div className="sec-eyebrow tag" style={{ marginBottom: 6 }}>{j.type} · {j.loc}</div>
                  <h3 style={{ fontSize: 20, marginBottom: 6 }}>{j.title}</h3>
                  <p style={{ fontSize: 13.5, color: "#6b6b60" }}>{j.body}</p>
                </div>
                <a
                  className="btn btn-outline-dark btn-sm"
                  href={`mailto:${site.email}?subject=${encodeURIComponent("Application: " + j.title)}`}
                >
                  Apply by email
                </a>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 30, fontSize: 14, color: "#5B5B50" }}>
            Nothing that fits? Send an open application to <a href={`mailto:${site.email}`} style={{ color: "var(--gold-deep)", fontWeight: 600 }}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
