import "server-only";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "weloid_admin_session";

async function sha256Hex(input: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function requireAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("Admin is not configured: set ADMIN_PASSWORD.");
  }
  return password;
}

/** The value a valid session cookie must equal — derived from the server-only password. */
export async function sessionToken() {
  return sha256Hex(requireAdminPassword());
}

export function verifyPassword(candidate: string) {
  return candidate === requireAdminPassword();
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const cookie = store.get(ADMIN_COOKIE)?.value;
  if (!cookie) return false;
  return cookie === (await sessionToken());
}
