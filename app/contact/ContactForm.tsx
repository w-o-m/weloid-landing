"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import CONSTANTS from "@/lib/constants";
import { CONTACT_LIMITS, parseContactIntake } from "@/lib/contact-intake";
import styles from "./page.module.css";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const formId = useId();
  const idempotencyKey = useRef<string | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "error" || status === "success") feedbackRef.current?.focus();
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = parseContactIntake({ name: data.get("name"), email: data.get("email"), subject: data.get("subject"), message: data.get("message") });
    if ("error" in parsed) {
      setError(parsed.error);
      setStatus("error");
      return;
    }
    idempotencyKey.current ||= crypto.randomUUID();

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey.current },
        signal: AbortSignal.timeout(12_000),
        body: JSON.stringify({ ...parsed.data, websiteUrl: data.get("websiteUrl") }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(body.error || "Could not send your message. Try again shortly.");
        setStatus("error");
        return;
      }
      if (!body.data || typeof body.data.referenceId !== "string" || typeof body.data.receivedAt !== "string") {
        setError("Your message was sent, but its receipt could not be confirmed. Please try again.");
        setStatus("error");
        return;
      }
      form.reset();
      idempotencyKey.current = null;
      setStatus("success");
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return <div ref={feedbackRef} role="status" tabIndex={-1} className={styles.success}><strong>Message received.</strong><p>We&apos;ll reply from a real inbox as soon as we can.</p></div>;
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <input name="websiteUrl" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.honeypot} />
      <div className={styles.formHeader}><span>DIRECT MESSAGE</span><span>SECURE CHANNEL</span></div>
      <div className={styles.fieldRow}>
        <div><label htmlFor={`${formId}-name`}>01 — NAME</label><input id={`${formId}-name`} name="name" required minLength={CONTACT_LIMITS.name.min} maxLength={CONTACT_LIMITS.name.max} autoComplete="name" /></div>
        <div><label htmlFor={`${formId}-email`}>02 — EMAIL</label><input id={`${formId}-email`} name="email" type="email" required maxLength={CONTACT_LIMITS.email.max} autoComplete="email" /></div>
      </div>
      <div><label htmlFor={`${formId}-subject`}>03 — SUBJECT</label><input id={`${formId}-subject`} name="subject" required minLength={CONTACT_LIMITS.subject.min} maxLength={CONTACT_LIMITS.subject.max} /></div>
      <div><label htmlFor={`${formId}-message`}>04 — MESSAGE</label><textarea id={`${formId}-message`} name="message" required minLength={CONTACT_LIMITS.message.min} maxLength={CONTACT_LIMITS.message.max} rows={6} /></div>
      {status === "error" && <div ref={feedbackRef} role="alert" tabIndex={-1} className={styles.error}>{error}</div>}
      <button className="btn btn-shadow" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "SENDING..." : "SEND MESSAGE"}</button>
      <p className={styles.fallback}>Prefer email? <a href={`mailto:${CONSTANTS.email}`}>{CONSTANTS.email}</a></p>
    </form>
  );
}
