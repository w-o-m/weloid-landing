"use client";

import { useState } from "react";
import Link from "next/link";

type NavLink = { href: string; label: string; page: string };

export default function MobileMenu({
  links,
  active,
  onDark,
}: {
  links: NavLink[];
  active: string;
  onDark: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`mobile-nav-toggle${onDark ? " on-dark" : ""}`}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
      {open && (
        <nav className={`mobile-nav-panel${onDark ? " on-dark" : ""}`}>
          {links.map((l) => (
            <Link
              key={l.page}
              href={l.href}
              className={active === l.page ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
