export type ContactIntake = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const CONTACT_LIMITS = {
  name: { min: 2, max: 160 },
  email: { max: 320 },
  subject: { min: 2, max: 200 },
  message: { min: 10, max: 10_000 },
  requestBytes: 16_384,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactIntake(value: unknown): { data: ContactIntake } | { error: string } {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { error: "Invalid request body." };
  }

  const input = value as Record<string, unknown>;
  if (typeof input.name !== "string") return { error: "Name is required." };
  if (typeof input.email !== "string") return { error: "Enter a valid email." };
  if (typeof input.subject !== "string") return { error: "Subject is required." };
  if (typeof input.message !== "string") return { error: "Tell us how we can help." };

  const name = input.name.trim();
  const email = input.email.trim();
  const subject = input.subject.trim();
  const message = input.message.trim();

  if (name.length < CONTACT_LIMITS.name.min || name.length > CONTACT_LIMITS.name.max) {
    return { error: `Name must be ${CONTACT_LIMITS.name.min}-${CONTACT_LIMITS.name.max} characters.` };
  }
  if (email.length > CONTACT_LIMITS.email.max || !EMAIL_PATTERN.test(email)) {
    return { error: "Enter a valid email." };
  }
  if (subject.length < CONTACT_LIMITS.subject.min || subject.length > CONTACT_LIMITS.subject.max) {
    return { error: `Subject must be ${CONTACT_LIMITS.subject.min}-${CONTACT_LIMITS.subject.max} characters.` };
  }
  if (message.length < CONTACT_LIMITS.message.min || message.length > CONTACT_LIMITS.message.max) {
    return { error: `Message must be ${CONTACT_LIMITS.message.min}-${CONTACT_LIMITS.message.max.toLocaleString()} characters.` };
  }

  return { data: { name, email, subject, message } };
}
