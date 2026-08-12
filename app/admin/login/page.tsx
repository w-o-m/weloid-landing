import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { ADMIN_COOKIE, sessionToken, verifyPassword } from "@/lib/admin-auth";
import styles from "../admin.module.css";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") || "");

  if (!verifyPassword(password)) {
    redirect("/admin/login?error=1");
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, await sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className={`shell noise ${styles.loginWrap}`}>
      <div className={styles.loginCard}>
        <div className={styles.loginLogo}>
          <Logo variant="header" theme="light" />
        </div>
        <form action={login}>
          <div className={styles.loginLabel}>ADMIN PASSWORD</div>
          {error && <p className={styles.loginError}>Wrong password. Try again.</p>}
          <input
            type="password"
            name="password"
            required
            autoFocus
            className={styles.loginInput}
            placeholder="••••••••"
          />
          <button type="submit" className="btn btn-shadow" style={{ display: "block", width: "100%" }}>
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
}
