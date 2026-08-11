import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const STEPS = [
  {
    num: "01",
    label: "The Autopsy",
    desc: "Repository, architecture, dependencies, security, database, infrastructure, tests, AI-generated code, technical debt, unfinished features, production readiness.",
    dark: false,
  },
  {
    num: "02",
    label: "The Report",
    desc: "A scored, evidence-based picture of what you actually own. Take it and act on it yourself, or hand it back to us.",
    dark: false,
  },
];

const METERS = [
  { label: "Architecture", value: 72, color: "#17150f" },
  { label: "Code Quality", value: 61, color: "#17150f" },
  { label: "Security", value: 48, color: "#b3411e" },
  { label: "Test Coverage", value: 24, color: "#b3411e" },
  { label: "Scalability", value: 67, color: "#17150f" },
];

const STATS = [
  { num: "7", label: "CRITICAL", color: "#b3411e" },
  { num: "14", label: "HIGH PRIORITY", color: "#8a8271" },
  { num: "31", label: "TECH DEBT", color: "#8a8271" },
  { num: "4–6", label: "WEEKS", color: "#8a8271" },
];

export default function RescuePage() {
  return (
    <div className="shell noise">
      <Header active="rescue" />

      <div className={styles.hero}>
        <div className={styles.badge}>
          <span style={{ font: "500 9px/1 var(--font-mono)", letterSpacing: ".24em" }}>WELOID</span>
          <span
            style={{
              font: "600 13px/1 var(--font-heading)",
              letterSpacing: ".14em",
              borderTop: "1px solid #57523f",
              borderBottom: "1px solid #57523f",
              padding: "5px 0",
            }}
          >
            RESCUE
          </span>
          <span style={{ font: "500 9px/1 var(--font-mono)", letterSpacing: ".2em" }}>SIGNATURE</span>
        </div>

        <div className={styles.heroLabel}>WELOID RESCUE — THE SIGNATURE SERVICE</div>
        <h1 className={styles.heroTitle}>
          Your software isn&apos;t finished.
          <br />
          <span style={{ font: "italic 400 100px/1 var(--font-serif)", color: "#d94f2b" }}>We finish it.</span>
        </h1>
        <p className={styles.heroLead}>
          Maybe you spent $30k with an agency. Maybe a freelancer disappeared. Maybe you vibe-coded 80% of the
          product and cannot get the remaining 20% working. Maybe the MVP works but you&apos;re terrified of
          putting real customers on it.
        </p>
      </div>

      <div className={styles.steps}>
        {STEPS.map((s) => (
          <div key={s.num} className={styles.step}>
            <div className={styles.stepHead}>
              <span className={styles.stepNum}>{s.num}</span>
              <span className={styles.stepLabel}>{s.label}</span>
            </div>
            <p className={styles.stepDesc}>{s.desc}</p>
          </div>
        ))}
        <div className={`${styles.step} ${styles.dark}`}>
          <div className={styles.stepHead}>
            <span className={styles.stepNum}>03</span>
            <span className={styles.stepLabel}>
              Two words:{" "}
              <span style={{ font: "italic 400 32px/1 var(--font-serif)", color: "#d94f2b" }}>
                &quot;fix it.&quot;
              </span>
            </span>
          </div>
          <p className={styles.stepDesc}>Fixed scope, fixed window, the team we would put on it. Say the words and we start.</p>
        </div>
      </div>

      <div className={styles.reportSection}>
        <div>
          <h2 className={styles.reportHeading}>
            Weloid Software
            <br />
            Health <span style={{ font: "italic 400 54px/1.06 var(--font-serif)", color: "#d94f2b" }}>Report</span>
          </h2>
          <p className={styles.reportLead}>
            Every finding with severity, effort and the order we would tackle it in. Plus an AI-bloat
            inventory: what the AI actually built, what is unnecessary, and what should never reach production.
          </p>
          <div className={styles.reportBtns}>
            <Link
              href="/open-a-case"
              className="btn btn-shadow"
              style={{ padding: "19px 34px", font: "500 11px/1 var(--font-heading)", letterSpacing: ".16em" }}
            >
              FIX IT
            </Link>
            <Link
              href="/open-a-case"
              className="btn btn-outline"
              style={{ padding: "19px 34px", font: "500 11px/1 var(--font-heading)", letterSpacing: ".16em" }}
            >
              JUST THE REPORT
            </Link>
          </div>
          <div className={styles.reportNote}>
            Later: connect GitHub / GitLab →<br />
            automated analysis + human review →<br />
            continuous software-health monitoring.
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardBadge}>CONFIDENTIAL</div>
          <div className={styles.cardHead}>
            <span>SOFTWARE HEALTH REPORT</span>
            <span>REV. 2026.08</span>
          </div>
          <div className={styles.cardMeters}>
            {METERS.map((m) => (
              <div key={m.label} className={`meter-row ${styles.meterRow}`} style={{ color: m.color }}>
                <span>{m.label}</span>
                <span className={styles.meterTrack}>
                  <span className={styles.meterFill} style={{ width: `${m.value}%`, background: m.color }} />
                </span>
                <span style={{ textAlign: "right" }}>{m.value}/100</span>
              </div>
            ))}
          </div>
          <div className={styles.cardSplit}>
            <div className={styles.cardSplitCell}>
              <span style={{ color: "#8a8271" }}>AI Bloat</span>
              <span style={{ color: "#b3411e" }}>HIGH</span>
            </div>
            <div className={styles.cardSplitCell}>
              <span style={{ color: "#8a8271" }}>Production Ready</span>
              <span style={{ color: "#d94f2b" }}>NO</span>
            </div>
          </div>
          <div className={styles.statStrip}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statCell}>
                <div className={styles.statCellNum}>{s.num}</div>
                <div className={styles.statCellLabel} style={{ color: s.color }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.band}>
        <h2 className={styles.bandTitle}>
          We don&apos;t sell rescues
          <br />
          that <span style={{ color: "#d94f2b" }}>shouldn&apos;t happen</span>.
        </h2>
        <Link
          href="/investigate"
          className="btn btn-orange-solid"
          style={{ padding: "22px 44px", flex: "none" }}
        >
          START WITH THE AUTOPSY
        </Link>
      </div>

      <Footer
        tagline="Bring us the repository."
        taglineStyle={{ font: "italic 400 18px/1 var(--font-serif)", color: "#8a8271" }}
      />
    </div>
  );
}
