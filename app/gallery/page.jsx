import SectionHead from "@/components/SectionHead";
import { galleryItems } from "@/data/site";

export const metadata = { title: "Gallery" };

export default function Gallery() {
  return (
    <>
      <div className="page-hero tex-pine">
        <div className="wrap">
          <div className="eyebrow tag">In the field</div>
          <h1>Gallery</h1>
          <p className="lead">Feedlot, cattle, aging rooms, butchery, staff and fleet — the operation in pictures.</p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <SectionHead
            eyebrow="Photo & video"
            title="Around the farm"
            sub="Placeholder tiles — final photography and video drop straight into this grid."
          />
          <div className="gallery-grid">
            {galleryItems.map((g, i) => (
              <div key={g.label} className={`g-item ${g.tall ? "tall" : ""} ${i % 2 ? "tex-pine2" : "tex-pine"}`}>
                <div className="glabel">{g.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
