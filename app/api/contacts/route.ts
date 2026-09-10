import { NextResponse } from "next/server";
import { CONTACT_LIMITS, parseContactIntake } from "@/lib/contact-intake";

const UPSTREAM_TIMEOUT_MS = 8_000;

type UpstreamError = { detail?: string | Array<{ msg?: string }>; code?: string; requestId?: string };
type ContactReceiptEnvelope = { data?: { referenceId?: unknown; receivedAt?: unknown }; message?: unknown };

function contactsEndpoint() {
  const apiBaseUrl = process.env.WELOID_API_BASE_URL?.trim();
  if (!apiBaseUrl) throw new Error("Contact API is not configured.");
  const url = new URL("/api/v1/public/contacts", apiBaseUrl);
  if (url.protocol !== "https:" && process.env.NODE_ENV === "production") throw new Error("Contact API must use HTTPS.");
  if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("Invalid contact API protocol.");
  return url;
}

function errorMessage(body: UpstreamError | null) {
  if (typeof body?.detail === "string") return body.detail;
  if (Array.isArray(body?.detail)) return body.detail.find((item) => typeof item.msg === "string")?.msg;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > CONTACT_LIMITS.requestBytes) {
    return NextResponse.json({ error: "Request body is too large.", requestId }, { status: 413 });
  }

  let body: unknown;
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).byteLength > CONTACT_LIMITS.requestBytes) {
      return NextResponse.json({ error: "Request body is too large.", requestId }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid request body.", requestId }, { status: 400 });
  }

  if (typeof body === "object" && body !== null && "websiteUrl" in body && typeof body.websiteUrl === "string" && body.websiteUrl.trim()) {
    return NextResponse.json({ data: { referenceId: crypto.randomUUID(), receivedAt: new Date().toISOString() } }, { status: 201 });
  }
  const parsed = parseContactIntake(body);
  if ("error" in parsed) return NextResponse.json({ error: parsed.error, requestId }, { status: 400 });

  let endpoint: URL;
  try {
    endpoint = contactsEndpoint();
  } catch (error) {
    console.error("[api/contacts] configuration error", { requestId, error: error instanceof Error ? error.name : "UnknownError" });
    return NextResponse.json({ error: "Contact form is unavailable.", requestId }, { status: 500 });
  }

  try {
    const suppliedKey = request.headers.get("idempotency-key");
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": suppliedKey && isUuid(suppliedKey) ? suppliedKey : crypto.randomUUID(),
        "X-Request-ID": requestId,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      const responseBody = (await response.json().catch(() => null)) as UpstreamError | null;
      console.error("[api/contacts] upstream rejected request", { requestId, status: response.status });
      const headers = new Headers();
      if (response.status === 429 && response.headers.get("retry-after")) headers.set("Retry-After", response.headers.get("retry-after")!);
      return NextResponse.json({
        error: errorMessage(responseBody) || "Could not send your message. Try again shortly.",
        ...(typeof responseBody?.code === "string" ? { code: responseBody.code } : {}),
        requestId: responseBody?.requestId || requestId,
      }, { status: response.status >= 400 && response.status < 500 ? response.status : 502, headers });
    }

    const responseBody = (await response.json().catch(() => null)) as ContactReceiptEnvelope | null;
    const referenceId = responseBody?.data?.referenceId;
    const receivedAt = responseBody?.data?.receivedAt;
    if (typeof referenceId !== "string" || !referenceId || typeof receivedAt !== "string" || !receivedAt) {
      console.error("[api/contacts] invalid upstream success response", { requestId, status: response.status });
      return NextResponse.json({ error: "Could not confirm your message. Try again shortly.", requestId }, { status: 502 });
    }
    return NextResponse.json({ data: { referenceId, receivedAt }, ...(typeof responseBody?.message === "string" ? { message: responseBody.message } : {}) }, { status: response.status });
  } catch (error) {
    console.error("[api/contacts] upstream request failed", { requestId, error: error instanceof Error ? error.name : "UnknownError" });
    return NextResponse.json({ error: "Could not send your message. Try again shortly.", requestId }, { status: 504 });
  }
}
