export default function SectionHead({ eyebrow, title, sub }) {
  return (
    <div className="sec-head">
      <div>
        {eyebrow && <div className="sec-eyebrow tag">{eyebrow}</div>}
        <h2>{title}</h2>
      </div>
      {sub && <p className="sec-sub">{sub}</p>}
    </div>
  );
}
