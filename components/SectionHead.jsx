export default function SectionHead({ eyebrow, title, sub, center = false }) {
  return (
    <div className={center ? "sec-head sec-head-center" : "sec-head"}>
      <div>
        {eyebrow && <div className="sec-eyebrow tag">{eyebrow}</div>}
        <h2>{title}</h2>
      </div>
      {sub && <p className="sec-sub">{sub}</p>}
    </div>
  );
}
