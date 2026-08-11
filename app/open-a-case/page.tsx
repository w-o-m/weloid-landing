import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import CaseForm from "./CaseForm";

export const metadata: Metadata = {
  title: "Open a Case",
  description:
    "Tell us what happened. No judgement — however the codebase got this way, we've seen worse. Response within 24 hours.",
};

const EVIDENCE = [
  { label: "A git repository", tag: "ideal", color: "#8a8271" },
  { label: "A zip from the old agency", tag: "common", color: "#8a8271" },
  { label: "Production access + prayers", tag: "workable", color: "#8a8271" },
  { label: "“The AI built it”", tag: "our specialty", color: "#d94f2b" },
];

export default async function OpenACasePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; statement?: string }>;
}) {
  const { type, statement } = await searchParams;
  return (
    <div className="shell noise">
      <Header active="open-a-case" />

      <div className={styles.grid}>
        <div className={styles.left}>
          <div className="eyebrow" style={{ marginBottom: 38 }}>
            <span className="dash" />
            CASE INTAKE — RESPONSE WITHIN 24H
          </div>
          <h1 className={styles.heroTitle}>
            Open a{" "}
            <span style={{ font: "italic 400 clamp(36px, 7vw, 88px)/1.02 var(--font-serif)", color: "#d94f2b" }}>
              case
            </span>
            .
          </h1>
          <p className={styles.heroLead}>
            Tell us what happened. No judgement — however the codebase got this way, we&apos;ve seen worse.
          </p>

          <div className={styles.evidenceLabel}>EVIDENCE ACCEPTED</div>
          <div className={styles.evidenceList}>
            {EVIDENCE.map((e, i) => (
              <div
                key={e.label}
                className={`${styles.evidenceRow}${i === EVIDENCE.length - 1 ? ` ${styles.noBorder}` : ""}`}
              >
                <span>{e.label}</span>
                <span style={{ color: e.color }}>{e.tag}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.caseBadge}>CASE 0053 — YOURS</div>
          <CaseForm initialCaseType={type} initialStatement={statement} />
        </div>
      </div>

      <Footer
        theme="dark"
        bgDark
        tagline="Bring us the repository."
        taglineStyle={{ font: "italic 400 20px/1 var(--font-serif)", color: "#b5af9e" }}
      />
    </div>
  );
}
