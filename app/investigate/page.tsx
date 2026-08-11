import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { caseLink } from "@/lib/case-link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Investigate — Software Autopsy™",
  description:
    "Give us the repository. We'll tell you what you actually own. Fixed price, fixed timeline, executive-grade report covering architecture, security, AI-generated code and production readiness.",
};

const SECTIONS = [
  "§1 Architecture",
  "§7 Test coverage",
  "§2 Code quality",
  "§8 AI-generated code",
  "§3 Security",
  "§9 Technical debt",
  "§4 Dependencies",
  "§10 Unfinished features",
  "§5 Database",
  "§11 Performance",
  "§6 Infrastructure",
  "§12 Production readiness",
];

const QUOTES = [
  "“We acquired this company — tell us what the hell they built.”",
  "“Claude built this thing and now nobody understands it.”",
  "“The MVP works but I'm terrified of putting real customers on it.”",
  "“Production fails every Sunday and nobody knows why.”",
];

export default function InvestigatePage() {
  return (
    <div className="shell noise">
      <Header active="investigate" />

      <div className={styles.hero}>
        <div className={styles.badge}>
          <span style={{ font: "500 9px/1 var(--font-mono)", letterSpacing: ".24em" }}>WELOID</span>
          <span
            style={{
              font: "600 13px/1 var(--font-heading)",
              letterSpacing: ".14em",
              borderTop: "1px solid #d94f2b",
              borderBottom: "1px solid #d94f2b",
              padding: "5px 0",
            }}
          >
            AUTOPSY™
          </span>
          <span style={{ font: "500 9px/1 var(--font-mono)", letterSpacing: ".2em" }}>FIXED PRICE</span>
        </div>

        <div className="eyebrow" style={{ marginBottom: 40 }}>
          <span className="dash" />
          PILLAR III — INVESTIGATE · WHEN NOBODY KNOWS WHY
        </div>
        <h1 className={styles.heroTitle}>
          Software{" "}
          <span style={{ font: "italic 400 clamp(40px, 7.8vw, 104px)/1 var(--font-serif)", color: "#d94f2b" }}>
            Autopsy™
          </span>
        </h1>
        <p className={styles.heroLead}>
          Give us the repository. We&apos;ll tell you what you actually own. Fixed price, fixed timeline,
          executive-grade report.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.sectionLabel}>THE EXAMINATION COVERS</div>
          <div className={styles.examList}>
            {SECTIONS.map((s, i) => (
              <div
                key={s}
                className={`${styles.examItem}${i >= SECTIONS.length - 2 ? ` ${styles.noBorder}` : ""}`}
              >
                {s}
              </div>
            ))}
          </div>
          <div className={styles.noteBox}>
            <div className={styles.noteTitle}>Also read by lawyers and acquirers.</div>
            <p className={styles.noteDesc}>
              The same examination serves acquisition due diligence: we tell you what the company you&apos;re
              buying actually built.
            </p>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.rightHead}>
            <span>WHO OPENS A CASE</span>
            <span>VERBATIM</span>
          </div>
          <div className={styles.quotes}>
            {QUOTES.map((q, i) => (
              <div key={q} className={`${styles.quote}${i === QUOTES.length - 1 ? ` ${styles.noBorder}` : ""}`}>
                {q}
              </div>
            ))}
          </div>
          <Link
            href={caseLink("Autopsy only", "Give us the repository — we'll tell you what you actually own.")}
            className={styles.cta}
          >
            ORDER AN AUTOPSY
          </Link>
          <p className={styles.ctaNote}>
            Deliverable: the Weloid Health Report™ — twelve sections, scored 0–100, findings ordered by severity
            and effort. Yours whatever you decide next.
          </p>
        </div>
      </div>

      <Footer
        tagline="Bring us the repository."
        taglineStyle={{ font: "italic 400 18px/1 var(--font-serif)", color: "#8a8271" }}
      />
    </div>
  );
}
