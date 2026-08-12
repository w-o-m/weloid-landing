"use client";

import { useId, useState, type FormEvent } from "react";
import styles from "./page.module.css";

const CASE_TYPES = ["Rescue", "Build", "Autopsy only", "Team", "Not sure"];

type Status = "idle" | "submitting" | "success" | "error";

type CaseFormProps = {
  initialCaseType?: string;
  initialStatement?: string;
};

export default function CaseForm({ initialCaseType, initialStatement }: CaseFormProps) {
  const [caseType, setCaseType] = useState(
    initialCaseType && CASE_TYPES.includes(initialCaseType) ? initialCaseType : "Rescue"
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formId = useId();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseType,
          statement: data.get("statement"),
          name: data.get("name"),
          email: data.get("email"),
          evidenceNote: data.get("evidenceNote"),
          company: data.get("company"),
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(body.error || "Could not file the case. Try again shortly.");
        return;
      }

      setStatus("success");
      form.reset();
      setCaseType("Rescue");
    } catch {
      setStatus("error");
      setErrorMessage("Could not reach the server. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.successPanel}>
        <div className={styles.successTitle}>Case filed.</div>
        <p className={styles.successDesc}>
          Read within 24h by an engineer, not a bot.
          <br />
          We&apos;ll reply from a real inbox with next steps.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className={styles.honeypot}
        aria-hidden="true"
      />

      <div>
        <div className={styles.fieldLabel}>01 — WHAT KIND OF CASE</div>
        <div className={styles.pills} role="radiogroup" aria-label="Case type">
          {CASE_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={caseType === t}
              className={`${styles.pill}${caseType === t ? ` ${styles.selected}` : ""}`}
              onClick={() => setCaseType(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={styles.fieldLabel} htmlFor={`${formId}-statement`}>
          02 — WHAT&apos;S HAPPENING
        </label>
        <textarea
          id={`${formId}-statement`}
          name="statement"
          required
          minLength={10}
          defaultValue={initialStatement}
          className={styles.textarea}
          placeholder="“We paid an agency $30k. They sent a zip file and stopped answering…”"
        />
      </div>

      <div className={styles.row2}>
        <div>
          <label className={styles.fieldLabel} htmlFor={`${formId}-name`}>
            03 — NAME
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            required
            className={styles.input}
            placeholder="Ada Obi"
          />
        </div>
        <div>
          <label className={styles.fieldLabel} htmlFor={`${formId}-email`}>
            04 — EMAIL
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            className={styles.input}
            placeholder="ada@company.com"
          />
        </div>
      </div>

      <div>
        <label className={styles.fieldLabel} htmlFor={`${formId}-evidence`}>
          05 — REPOSITORY OR CONTEXT (OPTIONAL)
        </label>
        <input
          id={`${formId}-evidence`}
          name="evidenceNote"
          className={`${styles.dropzone} ${styles.dropzoneInput}`}
          placeholder="Repo link or archive URL — or hand it over after we talk."
        />
      </div>

      {status === "error" && <div className={styles.errorNote}>{errorMessage}</div>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-shadow"
        style={{ display: "block", width: "100%", padding: "21px 0", opacity: status === "submitting" ? 0.7 : 1 }}
      >
        {status === "submitting" ? "FILING…" : "FILE THE CASE"}
      </button>

      <div className={styles.submitFootnote}>
        Read within 24h by a real engineer, not a bot.
        <br />
        NDA available before you share anything.
      </div>
    </form>
  );
}
