export const CASE_TYPES = ["Rescue", "Build", "Autopsy only", "Team", "Not sure"] as const;

export type CaseType = (typeof CASE_TYPES)[number];

export type CaseIntake = {
  caseType: CaseType;
  name: string;
  email: string;
  details: string;
};

export const CASE_LIMITS = {
  name: { min: 2, max: 160 },
  email: { max: 320 },
  details: { min: 10, max: 10_000 },
  requestBytes: 16_384,
} as const;

export const EVIDENCE_PREFIX = "Evidence available: ";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isCaseType(value: unknown): value is CaseType {
  return typeof value === "string" && (CASE_TYPES as readonly string[]).includes(value);
}

export function combineCaseDetails(statement: string, evidence: string) {
  return evidence ? `${statement}\n\n${EVIDENCE_PREFIX}${evidence}` : statement;
}

export function parseCaseIntake(value: unknown): { data: CaseIntake } | { error: string } {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { error: "Invalid request body." };
  }

  const input = value as Record<string, unknown>;
  if (!isCaseType(input.caseType)) return { error: "Choose a valid case type." };
  if (typeof input.name !== "string") return { error: "Name is required." };
  if (typeof input.email !== "string") return { error: "Enter a valid email." };
  if (typeof input.details !== "string") return { error: "Tell us a bit more about what happened." };

  const name = input.name.trim();
  const email = input.email.trim();
  const details = input.details.trim();

  if (name.length < CASE_LIMITS.name.min || name.length > CASE_LIMITS.name.max) {
    return { error: `Name must be ${CASE_LIMITS.name.min}–${CASE_LIMITS.name.max} characters.` };
  }
  if (email.length > CASE_LIMITS.email.max || !EMAIL_PATTERN.test(email)) {
    return { error: "Enter a valid email." };
  }
  if (details.length < CASE_LIMITS.details.min || details.length > CASE_LIMITS.details.max) {
    return { error: `Details must be ${CASE_LIMITS.details.min}–${CASE_LIMITS.details.max.toLocaleString()} characters.` };
  }

  return { data: { caseType: input.caseType, name, email, details } };
}
