import Image from "next/image";
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
            sub="The operation in pictures — feedlot, cattle, aging room and butchery."
          />
          <div className="gallery-grid">
            {galleryItems.map((g) => (
              <div key={g.label} className={`g-item ${g.tall ? "tall" : ""}`}>
                <Image src={g.img} alt={g.label} fill sizes="(max-width: 920px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                <div className="glabel">{g.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
