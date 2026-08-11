"use client";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Lightbox, { useLightbox } from "@/components/Lightbox";

export default function SystemScreens({ screens }) {
  const { index, open, close, prev, next } = useLightbox(screens);

  return (
    <>
      <div className="screens-grid">
        {screens.map((s, i) => (
          <Reveal key={s.label} className="screen-card">
            <div className="screen-frame" onClick={() => open(i)} role="button" tabIndex={0} aria-label={`Expand ${s.label}`}>
              <Image src={s.img} alt={s.label} fill sizes="(max-width: 640px) 90vw, (max-width: 920px) 45vw, 320px" />
            </div>
            <div className="screen-label">{s.label}</div>
          </Reveal>
        ))}
      </div>
      <Lightbox items={screens} index={index} onClose={close} onPrev={prev} onNext={next} />
    </>
  );
}
