import { NextResponse } from "next/server";
import { CASE_LIMITS, parseCaseIntake } from "@/lib/case-intake";

const UPSTREAM_TIMEOUT_MS = 8_000;
const TRUSTED_IP_HEADERS = ["cf-connecting-ip", "fly-client-ip", "x-vercel-forwarded-for"] as const;

type FastApiError = {
  detail?: string | Array<{ msg?: string }>;
  code?: string;
  errors?: Array<{ field?: string; message?: string; type?: string }>;
  requestId?: string;
};

type CaseReceiptEnvelope = {
  data?: {
    referenceId?: unknown;
    receivedAt?: unknown;
  };
  message?: unknown;
};

class CaseConfigurationError extends Error {}

function getCasesEndpoint() {
  const apiBaseUrl = process.env.WELOID_API_BASE_URL?.trim();
  if (!apiBaseUrl) {
    throw new CaseConfigurationError("Case intake is not configured.");
  }

  let url: URL;
  try {
    url = new URL("/api/v1/public/cases", apiBaseUrl);
  } catch {
    throw new CaseConfigurationError("Case intake API URL is invalid.");
  }
  if (url.protocol !== "https:" && process.env.NODE_ENV === "production") {
    throw new CaseConfigurationError("Case intake API must use HTTPS in production.");
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new CaseConfigurationError("Case intake API URL must use HTTP or HTTPS.");
  }
  return url;
}

function errorMessage(body: FastApiError | null) {
  if (typeof body?.detail === "string") return body.detail;
  if (Array.isArray(body?.detail)) return body.detail.find((item) => typeof item.msg === "string")?.msg;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function trustedClientIp(request: Request) {
  const configured = process.env.WELOID_TRUSTED_CLIENT_IP_HEADER?.trim().toLowerCase();
  if (!configured || !TRUSTED_IP_HEADERS.includes(configured as (typeof TRUSTED_IP_HEADERS)[number])) return null;
  const value = request.headers.get(configured)?.split(",", 1)[0].trim();
  return value && /^[0-9a-f:.]+$/i.test(value) ? value : null;
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > CASE_LIMITS.requestBytes) {
    return NextResponse.json({ error: "Request body is too large.", requestId }, { status: 413 });
  }

  let body: unknown;
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).byteLength > CASE_LIMITS.requestBytes) {
      return NextResponse.json({ error: "Request body is too large.", requestId }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid request body.", requestId }, { status: 400 });
  }

  if (typeof body === "object" && body !== null && "websiteUrl" in body && typeof body.websiteUrl === "string" && body.websiteUrl.trim()) {
    return NextResponse.json(
      { data: { referenceId: crypto.randomUUID(), receivedAt: new Date().toISOString() } },
      { status: 201 }
    );
  }
  const parsed = parseCaseIntake(body);
  if ("error" in parsed) return NextResponse.json({ error: parsed.error, requestId }, { status: 400 });

  let casesEndpoint: URL;
  try {
    casesEndpoint = getCasesEndpoint();
  } catch (err) {
    console.error("[api/cases] configuration error", { requestId, error: err instanceof Error ? err.name : "UnknownError" });
    return NextResponse.json({ error: "Case intake is unavailable.", requestId }, { status: 500 });
  }

  try {
    const suppliedIdempotencyKey = request.headers.get("idempotency-key");
    const headers = new Headers({
      "Content-Type": "application/json",
      "Idempotency-Key": suppliedIdempotencyKey && isUuid(suppliedIdempotencyKey)
        ? suppliedIdempotencyKey
        : crypto.randomUUID(),
      "X-Request-ID": requestId,
    });
    const clientIp = trustedClientIp(request);
    if (clientIp) headers.set("X-Forwarded-For", clientIp);
    const response = await fetch(casesEndpoint, {
      method: "POST",
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      const responseBody = (await response.json().catch(() => null)) as FastApiError | null;
      console.error("[api/cases] upstream rejected request", { requestId, status: response.status });
      const responseHeaders = new Headers();
      if (response.status === 429) {
        const retryAfter = response.headers.get("retry-after");
        if (retryAfter) responseHeaders.set("Retry-After", retryAfter);
      }
      return NextResponse.json(
        {
          error: errorMessage(responseBody) || "Could not file the case. Try again shortly.",
          ...(responseBody?.detail !== undefined ? { detail: responseBody.detail } : {}),
          ...(typeof responseBody?.code === "string" ? { code: responseBody.code } : {}),
          ...(Array.isArray(responseBody?.errors) ? { errors: responseBody.errors } : {}),
          requestId: responseBody?.requestId || requestId,
        },
        { status: response.status >= 400 && response.status < 500 ? response.status : 502, headers: responseHeaders }
      );
    }

    const responseBody = (await response.json().catch(() => null)) as CaseReceiptEnvelope | null;
    const referenceId = responseBody?.data?.referenceId;
    const receivedAt = responseBody?.data?.receivedAt;
    if (typeof referenceId !== "string" || !referenceId || typeof receivedAt !== "string" || !receivedAt) {
      console.error("[api/cases] invalid upstream success response", { requestId, status: response.status });
      return NextResponse.json({ error: "Could not confirm the filed case. Try again shortly.", requestId }, { status: 502 });
    }

    return NextResponse.json(
      {
        data: { referenceId, receivedAt },
        ...(typeof responseBody?.message === "string" ? { message: responseBody.message } : {}),
      },
      { status: response.status }
    );
  } catch (err) {
    console.error("[api/cases] upstream request failed", { requestId, error: err instanceof Error ? err.name : "UnknownError" });
    return NextResponse.json({ error: "Could not file the case. Try again shortly.", requestId }, { status: 504 });
  }
}
