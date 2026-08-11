import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const INSTRUMENTS = [
  {
    num: "01",
    status: "service",
    title: "Software Autopsy™",
    desc: "Full repository examination producing the Weloid Health Report™. The entry point to everything else.",
  },
  {
    num: "02",
    status: "service",
    title: "AI Code Detox™",
    desc: "AI helped you ship it. We make sure humans can maintain it — hallucinated dependencies, dead abstractions, duplicated code, insecure patterns.",
  },
  {
    num: "03",
    status: "calibrating",
    title: "Health Score™",
    desc: "A standardized 0–100 software-health score, comparable across codebases. The number the report is built around.",
  },
  {
    num: "04",
    status: "calibrating",
    title: "Dependency Intelligence",
    desc: "Abandoned, vulnerable and unnecessary dependencies, found before they find you.",
  },
  {
    num: "05",
    status: "calibrating",
    title: "Production Readiness Test",
    desc: "One question, answered with evidence: can this thing actually survive users?",
  },
  {
    num: "06",
    status: "calibrating",
    title: "Technical Debt Map",
    desc: "Where your engineering effort is actually being consumed, drawn on one map.",
  },
];

export default function LabPage() {
  return (
    <div className={`shell ${styles.page}`}>
      <Header active="lab" theme="dark" />

      <div className={styles.hero}>
        <div className="eyebrow on-dark" style={{ marginBottom: 40 }}>
          <span className="dash" />
          THE LAB — WHERE THE PRACTICE BECOMES INSTRUMENTS
        </div>
        <h1 className={styles.heroTitle}>
          Every case sharpens
          <br />
          an <span style={{ font: "italic 400 100px/1 var(--font-serif)", color: "#d94f2b" }}>instrument</span>.
        </h1>
        <p className={styles.heroLead}>
          The tools we build to run investigations become products. Human-led today, automated piece by piece,
          eventually self-serve.
        </p>
      </div>

      <div className={styles.grid}>
        {INSTRUMENTS.map((it) => (
          <div key={it.num} className={styles.cell}>
            <div className={styles.cellHead}>
              <span className={styles.cellNum}>INSTRUMENT {it.num}</span>
              <span className={it.status === "service" ? styles.badgeService : styles.badgeCalibrating}>
                {it.status === "service" ? "IN SERVICE" : "CALIBRATING"}
              </span>
            </div>
            <div className={styles.cellTitle}>{it.title}</div>
            <p className={styles.cellDesc}>{it.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.band}>
        <span className={styles.bandText}>
          Later: connect GitHub → automated analysis + human review →{" "}
          <span style={{ color: "#d94f2b" }}>continuous software health.</span>
        </span>
        <Link
          href="/open-a-case"
          className="btn btn-outline-orange"
          style={{ padding: "20px 36px", flex: "none" }}
        >
          GET EARLY ACCESS
        </Link>
      </div>

      <Footer
        theme="dark"
        tagline="THE LAB — SERVICES TODAY, PRODUCTS TOMORROW"
        taglineStyle={{ font: "400 11px/1 var(--font-mono)", letterSpacing: ".18em", color: "#6e6857" }}
      />
    </div>
  );
}
