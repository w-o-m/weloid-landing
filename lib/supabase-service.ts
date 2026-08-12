import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

let client: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Secret-key Supabase client (Supabase's current name for what used to be
 * called the service_role key). Bypasses RLS entirely, so it must only ever
 * be called from the password-gated admin route — never from anything a
 * visitor can reach unauthenticated.
 */
export function getSupabaseService() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "Supabase service role is not configured: set SUPABASE_SECRET_KEY."
    );
  }

  client = createClient<Database>(url, secretKey, {
    auth: { persistSession: false },
  });
  return client;
}
