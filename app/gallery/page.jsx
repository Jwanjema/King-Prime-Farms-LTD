import SectionHead from "@/components/SectionHead";
import Slideshow from "@/components/Slideshow";
import { galleryItems } from "@/data/site";

export const metadata = { title: "Gallery" };

export default function Gallery() {
  return (
    <>
      <div className="page-hero tex-pine">
        <div className="wrap">
          <div className="eyebrow tag">In the field</div>
          <h1>Gallery</h1>
          <p className="lead">Feedlot and cattle, straight from the pens — the operation in pictures.</p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <SectionHead
            eyebrow="Photo & video"
            title="Around the farm"
            sub="Real shots from our pens, unedited. Use the arrows, or pick a frame below."
          />
          <Slideshow items={galleryItems} />
        </div>
      </section>
    </>
  );
}
