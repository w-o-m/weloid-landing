import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { caseLink } from "@/lib/case-link";
import ServiceFaq from "@/components/ServiceFaq";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Dedicated Engineering Teams",
  description:
    "Hire a ready-made engineering unit, not five separate people. Dedicated and satellite teams, from two specialist engineers to a complete product team.",
  alternates: { canonical: "/scale" },
};

const FAQS = [
  {
    question: "What is a dedicated engineering team?",
    answer:
      "A dedicated engineering team is a managed group of specialists assembled around a defined product or technical problem, rather than a collection of unrelated individual contractors.",
  },
  {
    question: "Can Weloid work alongside our existing team?",
    answer:
      "Yes. Weloid can provide a satellite team or specialist engineers who operate alongside your organization, repository, processes and working hours.",
  },
];

const SHAPES = [
  { title: "2 Engineers", desc: "Extra hands on an existing team.", active: false },
  { title: "Product Squad", desc: "Design, build and ship a product line.", active: false },
  { title: "Satellite Team", desc: "A full product team operating alongside yours.", active: false },
  { title: "Specialist Team", desc: "One hard domain, done properly.", active: false },
  { title: "Rescue Team", desc: "Inherit and finish troubled software.", active: true },
  { title: "Custom Team", desc: "Tell us the problem, we compose it.", active: false },
];

const FILLED_ROLES = ["Tech Lead ×1", "Backend ×2", "Frontend ×1"];
const GHOST_ROLES = ["+ Mobile", "+ DevOps", "+ QA", "+ Product / Design", "+ AI / Data", "+ Security", "+ Payments"];

export default function ScalePage() {
  return (
    <div className="shell noise">
      <Header active="scale" />

      <div className={styles.hero}>
        <div className="eyebrow" style={{ marginBottom: 38 }}>
          <span className="dash" />
          DEDICATED &amp; SATELLITE ENGINEERING TEAMS
        </div>
        <h1 className={styles.heroTitle}>
          Hire a ready-made engineering{" "}
          <span
            style={{
              font: "italic 400 clamp(34px, 6.6vw, 86px)/1.02 var(--font-serif)",
              letterSpacing: "-.01em",
              color: "#d94f2b",
            }}
          >
            team
          </span>
          ,<br />
          not five separate people.
        </h1>
        <p className={styles.heroLead}>
          Add experienced engineers around a defined product or technical problem. From two specialists to a complete satellite product team, Weloid brings technical ownership without a six-month hiring process.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.stepLabel}>1 — CHOOSE THE TEAM YOU NEED</div>
          <div className={styles.shapeGrid}>
            {SHAPES.map((s) => (
              <div key={s.title} className={`${styles.shapeCard}${s.active ? ` ${styles.active}` : ""}`}>
                <div className={styles.shapeTitle}>{s.title}</div>
                <div className={styles.shapeDesc}>{s.desc}</div>
              </div>
            ))}
          </div>

          <div className={styles.stepLabel}>2 — ADD THE SPECIALISTS</div>
          <div className={styles.roles}>
            {FILLED_ROLES.map((r) => (
              <span key={r} className={styles.roleFilled}>
                {r}
              </span>
            ))}
            {GHOST_ROLES.map((r) => (
              <span key={r} className={styles.roleGhost}>
                {r}
              </span>
            ))}
          </div>

          <div className={styles.stepLabel}>3 — OR BORROW TECHNICAL LEADERSHIP</div>
          <div className={styles.leadershipBox}>
            <div>
              <div className={styles.leadershipTitle}>Fractional Engineering Leadership</div>
              <p className={styles.leadershipDesc}>
                CTO-level direction without hiring a full-time CTO: architecture decisions, engineering process,
                hiring, roadmap review, vendor evaluation and technical strategy.
              </p>
            </div>
            <Link
              href={caseLink("Team", "Interested in Fractional Engineering Leadership.")}
              className={styles.leadershipAdd}
            >
              ADD →
            </Link>
          </div>
        </div>

        <aside className={styles.aside}>
          <div className={styles.asideBadge}>
            <span style={{ font: "500 8px/1 var(--font-mono)", letterSpacing: ".22em" }}>WELOID</span>
            <span
              style={{
                font: "600 12px/1 var(--font-heading)",
                letterSpacing: ".12em",
                borderTop: "1px solid #d94f2b",
                borderBottom: "1px solid #d94f2b",
                padding: "4px 0",
              }}
            >
              UNIT
            </span>
            <span style={{ font: "500 8px/1 var(--font-mono)", letterSpacing: ".18em" }}>SPEC</span>
          </div>

          <div className={styles.asideLabel}>YOUR TEAM</div>
          <div className={styles.asideTitle}>
            Rescue Team
            <br />
            <span style={{ font: "italic 400 22px/1 var(--font-serif)", color: "#d94f2b" }}>4 engineers</span>
          </div>

          <div className={styles.asideList}>
            <div className={styles.asideRow}>
              <span>Tech Lead</span>
              <span>1</span>
            </div>
            <div className={styles.asideRow}>
              <span>Backend</span>
              <span>2</span>
            </div>
            <div className={styles.asideRow}>
              <span>Frontend</span>
              <span>1</span>
            </div>
            <div className={`${styles.asideRow} ${styles.divider}`}>
              <span>Engagement</span>
              <span>4–6 weeks</span>
            </div>
            <div className={styles.asideRow}>
              <span>Start</span>
              <span>~10 days</span>
            </div>
            <div className={styles.asideRow}>
              <span>Working hours</span>
              <span>GMT / CET</span>
            </div>
          </div>

          <Link
            href={caseLink(
              "Team",
              "Requesting a Rescue Team — 4 engineers (Tech Lead ×1, Backend ×2, Frontend ×1), 4–6 week engagement."
            )}
            className={styles.asideCta}
          >
            REQUEST THIS TEAM
          </Link>
          <p className={styles.asideNote}>
            You are not buying a list of developers. You are getting a team assembled to solve a difficult software problem.
          </p>
        </aside>
      </div>

      <ServiceFaq items={FAQS} />

      <Footer
        tagline="BUILD · RESCUE · INVESTIGATE · SCALE"
        taglineStyle={{ font: "400 11px/1 var(--font-mono)", letterSpacing: ".18em", color: "#8a8271" }}
      />
    </div>
  );
}
