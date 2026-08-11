import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const CASE_TYPES = ["Rescue", "Build", "Autopsy only", "Team", "Not sure"];

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { caseType, statement, name, email, evidenceNote, company } = body as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (typeof caseType !== "string" || !CASE_TYPES.includes(caseType)) {
    return NextResponse.json({ error: "Choose a valid case type." }, { status: 400 });
  }
  if (typeof statement !== "string" || statement.trim().length < 10) {
    return NextResponse.json({ error: "Tell us a bit more about what happened." }, { status: 400 });
  }
  if (typeof name !== "string" || name.trim().length < 1) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("cases").insert({
      case_type: caseType,
      statement: statement.trim(),
      name: name.trim(),
      email: email.trim(),
      evidence_note: typeof evidenceNote === "string" ? evidenceNote.trim() || null : null,
    });

    if (error) {
      console.error("[api/cases] insert failed:", error.message);
      return NextResponse.json({ error: "Could not file the case. Try again shortly." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/cases]", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Case intake is not configured yet." }, { status: 500 });
  }
}
