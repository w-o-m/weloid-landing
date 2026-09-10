"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CASE_LIMITS, CASE_TYPES, combineCaseDetails, isCaseType, parseCaseIntake } from "@/lib/case-intake";
import styles from "./page.module.css";

type Status = "idle" | "submitting" | "success" | "error";
type CaseReceipt = { referenceId: string; receivedAt: string };

type CaseFormProps = {
  initialCaseType?: string;
  initialStatement?: string;
};

export default function CaseForm({ initialCaseType, initialStatement }: CaseFormProps) {
  const [caseType, setCaseType] = useState(
    isCaseType(initialCaseType) ? initialCaseType : "Rescue"
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [receipt, setReceipt] = useState<CaseReceipt | null>(null);
  const [statement, setStatement] = useState(initialStatement || "");
  const [evidence, setEvidence] = useState("");
  const formId = useId();
  const idempotencyKey = useRef<string | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const combinedLength = combineCaseDetails(statement.trim(), evidence.trim()).length;

  useEffect(() => {
    if (status === "error" || status === "success") feedbackRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    idempotencyKey.current ||= crypto.randomUUID();
    const trimmedStatement = String(data.get("statement") || "").trim();
    const trimmedEvidence = String(data.get("evidenceNote") || "").trim();
    if (trimmedStatement.length < CASE_LIMITS.details.min) {
      setStatus("error");
      setErrorMessage(`Tell us what is happening in at least ${CASE_LIMITS.details.min} characters.`);
      return;
    }
    const intake = parseCaseIntake({
      caseType,
      name: data.get("name"),
      email: data.get("email"),
      details: combineCaseDetails(trimmedStatement, trimmedEvidence),
    });
    if ("error" in intake) {
      setStatus("error");
      setErrorMessage(intake.error);
      return;
    }

    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey.current },
        signal: AbortSignal.timeout(12_000),
        body: JSON.stringify({ ...intake.data, websiteUrl: data.get("websiteUrl") }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(body.error || "Could not file the case. Try again shortly.");
        return;
      }

      if (
        !body.data ||
        typeof body.data.referenceId !== "string" ||
        typeof body.data.receivedAt !== "string"
      ) {
        setStatus("error");
        setErrorMessage("The case was sent, but its receipt could not be confirmed. Please try again.");
        return;
      }

      setReceipt(body.data);
      setStatus("success");
      idempotencyKey.current = null;
      form.reset();
      setStatement("");
      setEvidence("");
      setCaseType("Rescue");
    } catch {
      setStatus("error");
      setErrorMessage("Could not reach the server. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div ref={feedbackRef} role="status" tabIndex={-1} className={styles.successPanel}>
        <div className={styles.successTitle}>Case filed.</div>
        <p className={styles.successDesc}>
          Read within 24h by an engineer, not a bot.
          <br />
          We&apos;ll reply from a real inbox with next steps.
        </p>
        <p className={styles.receipt}>
          Reference <strong>{receipt?.referenceId}</strong>
          <br />
          Received <time dateTime={receipt?.receivedAt}>{receipt?.receivedAt}</time>
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="websiteUrl"
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
          value={statement}
          onChange={(event) => setStatement(event.target.value)}
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
            minLength={CASE_LIMITS.name.min}
            maxLength={CASE_LIMITS.name.max}
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
            maxLength={CASE_LIMITS.email.max}
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
          value={evidence}
          onChange={(event) => setEvidence(event.target.value)}
          className={`${styles.dropzone} ${styles.dropzoneInput}`}
          placeholder="Repo link or archive URL — or hand it over after we talk."
        />
        <div className={styles.characterCount}>
          Statement and context: {combinedLength.toLocaleString()} / {CASE_LIMITS.details.max.toLocaleString()} characters
        </div>
      </div>

      {combinedLength > CASE_LIMITS.details.max && (
        <div className={styles.errorNote} role="alert">
          Shorten the statement or context so their combined total is no more than {CASE_LIMITS.details.max.toLocaleString()} characters.
        </div>
      )}

      {status === "error" && <div ref={feedbackRef} role="alert" tabIndex={-1} className={styles.errorNote}>{errorMessage}</div>}

      <button
        type="submit"
        disabled={status === "submitting" || combinedLength > CASE_LIMITS.details.max}
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
