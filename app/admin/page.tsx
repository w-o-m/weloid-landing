import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseService } from "@/lib/supabase-service";
import type { CaseRow } from "@/lib/database.types";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: "Admin — Cases",
  robots: { index: false, follow: false },
};

async function logout() {
  "use server";
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  let cases: CaseRow[] = [];
  let loadError: string | null = null;

  try {
    const supabase = getSupabaseService();
    const { data, error } = await supabase
      .from("cases")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      loadError = error.message;
    } else {
      cases = data;
    }
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Could not load cases.";
  }

  return (
    <div className={`shell noise ${styles.page}`}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Cases</h1>
          {!loadError && <span className={styles.count}>{cases.length} total</span>}
        </div>
        <form action={logout}>
          <button type="submit" className={styles.logoutBtn}>
            LOG OUT
          </button>
        </form>
      </div>

      {loadError && <p className={styles.error}>Could not load cases: {loadError}</p>}

      {!loadError && cases.length === 0 && <p className={styles.empty}>No cases filed yet.</p>}

      {!loadError && cases.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Name</th>
                <th>Email</th>
                <th>Statement</th>
                <th>Evidence</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c.id}>
                  <td className={styles.dateCell}>
                    {new Date(c.created_at).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className={styles.typeCell}>{c.case_type}</td>
                  <td className={styles.nameCell}>{c.name}</td>
                  <td>
                    <a href={`mailto:${c.email}`}>{c.email}</a>
                  </td>
                  <td className={styles.statementCell}>{c.statement}</td>
                  <td>{c.evidence_note || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
