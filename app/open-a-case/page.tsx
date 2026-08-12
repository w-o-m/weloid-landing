import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import CaseForm from "./CaseForm";

export const metadata: Metadata = {
  title: "Contact Weloid About a Software Problem",
  description:
    "Tell Weloid what is happening with your software. No polished brief required. A real engineer reviews every submission and responds within 24 hours.",
  alternates: { canonical: "/open-a-case" },
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
            CASE INTAKE — A REAL ENGINEER RESPONDS WITHIN 24H
          </div>
          <h1 className={styles.heroTitle}>
            Tell us what&apos;s{" "}
            <span style={{ font: "italic 400 clamp(36px, 7vw, 88px)/1.02 var(--font-serif)", color: "#d94f2b" }}>
              happening
            </span>
            .
          </h1>
          <p className={styles.heroLead}>
            Tell us what is happening, what you have, and what needs to change. You do not need a polished brief. We&apos;ll review the situation and recommend the most sensible next step.
          </p>

          <div className={styles.evidenceLabel}>WHAT YOU CAN SEND US</div>
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
