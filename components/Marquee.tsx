const ITEMS = [
  {
    text: (
      <>
        CASE 0047 <span style={{ color: "#c2bcab" }}>CLOSED</span> — ABANDONED
        MVP SHIPPED TO 40K USERS
      </>
    ),
  },
  {
    text: (
      <>
        CASE 0051 <span style={{ color: "#d94f2b" }}>OPEN</span> —
        AI-GENERATED CODEBASE, 61% BLOAT
      </>
    ),
  },
  {
    text: (
      <>
        CASE 0044 <span style={{ color: "#c2bcab" }}>CLOSED</span> — VANISHED
        FREELANCER, 9 DAYS TO PRODUCTION
      </>
    ),
  },
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-track">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "flex" }}>
            <span className="marquee-item">{item.text}</span>
            <span className="marquee-sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
