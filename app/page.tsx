import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Software Engineering for Difficult Problems",
  description:
    "Weloid builds, rescues, investigates and scales software. Bring us a new product, broken application, unexplained failure or difficult engineering problem.",
  alternates: { canonical: "/" },
};

// Campfire has no URL yet — left unlinked until one is provided.
const TRUSTED = [
  { name: "D8N", url: "https://d8n.tech" },
  { name: "JustJapa", url: "https://justjapa.com" },
  { name: "Nunki", url: "https://nunki-frontend.vercel.app/" },
  { name: "Cybele Fleet", url: "https://dbnz28bgyxhfy.cloudfront.net/login" },
  { name: "Campfire", url: "" },
];

const METERS = [
  { label: "Architecture", value: 72, color: "#cfc9b8" },
  { label: "Code Quality", value: 61, color: "#cfc9b8" },
  { label: "Security", value: 48, color: "#e8a15c" },
  { label: "Test Coverage", value: 24, color: "#ff6b4a" },
  { label: "Scalability", value: 67, color: "#cfc9b8" },
];

const CASES = [
  {
    id: "CASE 0044",
    status: "CLOSED",
    open: false,
    title: "The vanished freelancer",
    desc: "A fintech MVP, 80% done, developer unreachable for three months. Reconstructed intent from commit history, finished the remaining flows, hardened auth.",
    metaLeft: "9 days to prod",
    metaRight: "2 engineers",
  },
  {
    id: "CASE 0047",
    status: "CLOSED",
    open: false,
    title: "The $30k zip file",
    desc: "An agency delivered a marketplace as a zip and an invoice. No tests, no docs, secrets in the repo. Autopsied, rebuilt the payment core, shipped to 40k users.",
    metaLeft: "6 weeks",
    metaRight: "rescue team ×4",
  },
  {
    id: "CASE 0051",
    status: "OPEN",
    open: true,
    title: "The confident machine",
    desc: "A founder vibe-coded a full product. It demos beautifully and fails under load. AI-bloat audit found 61% removable code and three fabricated libraries.",
    metaLeft: "in autopsy",
    metaRight: "report due fri",
  },
];

const QUADRANTS = [
  { href: "/build", label: "BUILD", sub: "when you need something built", active: false },
  { href: "/rescue", label: "RESCUE", sub: "when your product is unfinished", active: true },
  { href: "/investigate", label: "INVESTIGATE", sub: "when nobody knows why", active: false },
  { href: "/scale", label: "SCALE", sub: "when you need the right team", active: false },
];

export default function HomePage() {
  return (
    <div className="shell noise">
      <Marquee />
      <Header active="home" />

      <div className={styles.hero}>
        <div className={styles.badge}>
          <span style={{ font: "500 9px/1 var(--font-mono)", letterSpacing: ".24em" }}>WELOID</span>
          <span
            style={{
              font: "600 15px/1 var(--font-heading)",
              letterSpacing: ".14em",
              borderTop: "1px solid #d94f2b",
              borderBottom: "1px solid #d94f2b",
              padding: "5px 0",
            }}
          >
            EVIDENCE
          </span>
          <span style={{ font: "500 9px/1 var(--font-mono)", letterSpacing: ".2em" }}>NO. 0052</span>
        </div>

        <div className={`eyebrow ${styles.heroEyebrow}`} style={{ marginBottom: 42 }}>
          <span className="dash" />
          BUILD · RESCUE · INVESTIGATE · SCALE
        </div>

        <h1 className={styles.heroTitle}>
          Software problems?
          <br />
          <span
            style={{
              font: "italic 400 clamp(46px, 9.3vw, 132px)/.96 var(--font-serif)",
              letterSpacing: "-.01em",
              color: "#d94f2b",
            }}
          >
            Bring us the difficult ones.
          </span>
        </h1>

        <div className={styles.heroBottom}>
          <p style={{ margin: 0, maxWidth: 470, font: "300 17px/1.7 var(--font-body)", color: "#57523f" }}>
            Weloid builds custom software, rescues broken products, investigates technical failures, and provides engineering teams for difficult problems.
          </p>
          <div className="cta-row" style={{ flex: "none" }}>
            <Link href="/open-a-case" className="btn btn-shadow">
              TELL US WHAT&apos;S HAPPENING
            </Link>
            <Link href="/investigate" className="btn btn-outline">
              SEE HOW THE AUDIT WORKS
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.trusted}>
        <span style={{ font: "400 10px/1 var(--font-mono)", letterSpacing: ".22em", color: "#8a8271", flex: "none" }}>
          SELECTED CLIENTS
        </span>
        <div className={styles.trustedNames}>
          {TRUSTED.map((t) =>
            t.url ? (
              <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer">
                {t.name}
              </a>
            ) : (
              <span key={t.name}>{t.name}</span>
            )
          )}
        </div>
      </div>

      <div className={styles.autopsyGrid}>
        <div className={styles.terminal}>
          <div className={styles.terminalHead}>
            <span>repo: acquired-saas/main</span>
            <span>
              AUTOPSY —{" "}
              <span className={styles.liveBadge}>
                <span className={styles.liveDot} />
                LIVE
              </span>
            </span>
          </div>
          <div className={styles.terminalBody}>
            <div>
              <span style={{ color: "#5c574a" }}>$</span> weloid autopsy ./repository
            </div>
            <div>
              ▸ secrets in history ... <span style={{ color: "#ff6b4a" }}>FOUND (7)</span>
            </div>
            <div>
              ▸ ai-generated code .... <span style={{ color: "#e8a15c" }}>~61% of diff since v0.9</span>
            </div>
            <div>
              ▸ tests ................ <span style={{ color: "#e8a15c" }}>24% coverage, 11 always-pass</span>
            </div>
            <div>
              ▸ cause of failure ..... <span style={{ color: "#efe9dd" }}>reconstructed → report §4</span>{" "}
              <span className="blink" />
            </div>
          </div>
        </div>
        <div className={styles.statsCol}>
          <div className={styles.statRow}>
            <div className={styles.statNumber}>
              88<span style={{ font: "italic 400 34px/1 var(--font-serif)", color: "#d94f2b" }}>%</span>
            </div>
            <div className={styles.statCaption}>OF RESCUED SYSTEMS REACH PRODUCTION WITHIN 8 WEEKS</div>
          </div>
          <div className={styles.statRow}>
            <div className={styles.statNumber}>0</div>
            <div className={styles.statCaption}>JUDGEMENT. HOWEVER THE CODEBASE GOT THIS WAY.</div>
          </div>
        </div>
      </div>

      <div className={styles.cases}>
        <div className={styles.casesHead}>
          <h2 className={styles.casesTitle}>
            Selected{" "}
            <span style={{ font: "italic 400 clamp(36px, 6.2vw, 60px)/1 var(--font-serif)", color: "#d94f2b" }}>
              work
            </span>
          </h2>
        </div>
        <div className={styles.caseGrid}>
          {CASES.map((c) => (
            <div key={c.id} className={`${styles.caseCard}${c.open ? ` ${styles.open}` : ""}`}>
              <div className={styles.caseTag}>{c.status === "OPEN" ? "IN PROGRESS" : "COMPLETED"}</div>
              <div className={styles.caseId}>{c.id}</div>
              <div className={styles.caseBody}>
                <h3 className={styles.caseTitle}>{c.title}</h3>
                <p className={styles.caseDesc}>{c.desc}</p>
                <div className={styles.caseMeta}>
                  <span>{c.metaLeft}</span>
                  <span>{c.metaRight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.signature}>
        <div>
          <div className="eyebrow on-dark" style={{ marginBottom: 30 }}>
            <span className="dash" />
            THE SIGNATURE — WELOID RESCUE
          </div>
          <h2 className={styles.signatureTitle}>
            Your software isn&apos;t finished.{" "}
            <span style={{ font: "italic 400 clamp(36px, 5.7vw, 62px)/1.04 var(--font-serif)", color: "#d94f2b" }}>
              We finish it.
            </span>
          </h2>
          <p className={styles.signatureLead}>
            We diagnose before we prescribe. First comes the Software Autopsy, then a scored health report, then a clear choice: fix it yourself or have Weloid execute the repair.
          </p>
          <Link href="/rescue" className="btn btn-cream" style={{ marginTop: 36, padding: "20px 36px" }}>
            SEE THE RESCUE PROCESS
          </Link>
        </div>

        <div className={styles.reportCard}>
          <div className={styles.reportHead}>
            <span>SOFTWARE HEALTH REPORT</span>
            <span>REV. 2026.08</span>
          </div>
          <div className={styles.reportMeters}>
            {METERS.map((m) => (
              <div
                key={m.label}
                className={`meter-row ${styles.reportMeterRow}`}
                style={{ color: m.color }}
              >
                <span>{m.label}</span>
                <span className={styles.reportMeterTrack}>
                  <span className={styles.reportMeterFill} style={{ width: `${m.value}%`, background: m.color }} />
                </span>
                <span style={{ textAlign: "right" }}>{m.value}/100</span>
              </div>
            ))}
          </div>
          <div className={styles.reportSplit}>
            <div className={styles.reportSplitCell}>
              <span style={{ color: "#8a8271" }}>AI Bloat</span>
              <span style={{ color: "#e8a15c" }}>HIGH</span>
            </div>
            <div className={styles.reportSplitCell}>
              <span style={{ color: "#8a8271" }}>Production Ready</span>
              <span style={{ color: "#ff6b4a" }}>NO</span>
            </div>
          </div>
          <div className={styles.reportFoot}>
            <span style={{ font: "400 12px/1 var(--font-mono)", color: "#57523f" }}>
              Estimated rescue: 4–6 weeks
            </span>
            <span style={{ font: "500 11px/1 var(--font-heading)", letterSpacing: ".16em", color: "#d94f2b" }}>
              FIX IT →
            </span>
          </div>
        </div>
      </div>

      <div className={styles.quadrants}>
        {QUADRANTS.map((q) => (
          <Link
            key={q.label}
            href={q.href}
            className={`${styles.quadCell}${q.active ? ` ${styles.active}` : ""}`}
          >
            <div className={styles.quadLabel}>{q.label}</div>
            <div className={styles.quadSub}>{q.sub}</div>
          </Link>
        ))}
      </div>

      <div className={styles.finalCta}>
        <div className={styles.finalCtaLabel}>
          WHAT YOU CAN BRING: A GIT REPO · A ZIP FROM THE OLD AGENCY · PROD ACCESS + PRAYERS · &quot;THE AI BUILT IT&quot;
        </div>
        <h2 className={styles.finalCtaTitle}>
          Tell us what&apos;s <span style={{ color: "#d94f2b" }}>happening</span>.
        </h2>
        <Link href="/open-a-case" className="btn btn-dark" style={{ marginTop: 44, padding: "22px 48px" }}>
          OPEN A CASE
        </Link>
      </div>

      <Footer
        theme="dark"
        bgDark
        tagline="© 2026 WELOID — BUILD · RESCUE · INVESTIGATE · SCALE"
        taglineStyle={{ font: "400 11px/1 var(--font-mono)", letterSpacing: ".18em", color: "#6e6857" }}
      />
    </div>
  );
}
