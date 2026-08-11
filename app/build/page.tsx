import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const PILLARS = [
  {
    title: "Products & SaaS",
    desc: "MVP to production platform. Web, mobile, APIs. Scoped in weeks, shipped with tests, docs and a handover you can read.",
  },
  {
    title: "Internal systems",
    desc: "Operations platforms, dashboards, integrations — the unglamorous software companies actually run on.",
  },
  {
    title: "AI systems",
    desc: "AI products built by people who audit AI-generated code for a living. No hallucinated dependencies. No 61% bloat.",
  },
];

export default function BuildPage() {
  return (
    <div className="shell noise">
      <Header active="build" />

      <div className={styles.hero}>
        <div className="eyebrow" style={{ marginBottom: 40 }}>
          <span className="dash" />
          PILLAR I — BUILD · WHEN IT DOESN&apos;T EXIST YET
        </div>
        <h1 className={styles.heroTitle}>
          Built like something
          <br />
          we&apos;d have to{" "}
          <span style={{ font: "italic 400 104px/1 var(--font-serif)", color: "#d94f2b" }}>
            rescue later
          </span>{" "}
          —<br />
          <span style={{ color: "#c0b8a4" }}>so we never do.</span>
        </h1>
        <div className={styles.heroBottom}>
          <p style={{ margin: 0, maxWidth: 520, font: "300 17px/1.7 var(--font-body)", color: "#57523f" }}>
            We spend half our lives inside other people&apos;s broken systems. It teaches you exactly how
            software fails — and therefore how to build it so it doesn&apos;t.
          </p>
          <Link href="/open-a-case" className="btn btn-shadow" style={{ flex: "none" }}>
            START A BUILD
          </Link>
        </div>
      </div>

      <div className={styles.pillars}>
        {PILLARS.map((p) => (
          <div key={p.title} className={styles.pillar}>
            <div className={styles.pillarTitle}>{p.title}</div>
            <p className={styles.pillarDesc}>{p.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.band}>
        <div className={styles.bandText}>
          <span style={{ color: "#6e6857" }}>EVERY BUILD SHIPS WITH ITS OWN AUTOPSY:</span>
          <br />
          a Weloid Health Report on our own code — architecture, security, tests, readiness — before you ever
          see an invoice.
        </div>
        <Link
          href="/investigate"
          className="btn btn-outline-orange"
          style={{ padding: "20px 36px", flex: "none" }}
        >
          SEE THE HEALTH REPORT
        </Link>
      </div>

      <Footer
        tagline="BUILD · RESCUE · INVESTIGATE · SCALE"
        taglineStyle={{ font: "400 11px/1 var(--font-mono)", letterSpacing: ".18em", color: "#8a8271" }}
      />
    </div>
  );
}
