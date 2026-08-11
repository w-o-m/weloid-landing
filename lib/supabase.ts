import "server-only";
import { createClient } from "@supabase/supabase-js";

type CaseInsert = {
  case_type: string;
  statement: string;
  name: string;
  email: string;
  evidence_note?: string | null;
};

type Database = {
  public: {
    Tables: {
      cases: {
        Row: CaseInsert & { id: string; created_at: string };
        Insert: CaseInsert;
        Update: Partial<CaseInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

let client: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Publishable-key Supabase client. Safe by design if ever exposed, but kept
 * server-only anyway so every insert goes through this route's validation
 * and honeypot check rather than being callable directly from the browser.
 * Relies on an RLS policy scoping it to INSERT-only on `cases` — see
 * README/setup notes for the exact SQL.
 */
export function getSupabase() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  client = createClient<Database>(url, publishableKey, {
    auth: { persistSession: false },
  });
  return client;
}
