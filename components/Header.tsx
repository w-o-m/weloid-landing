import Link from "next/link";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

type Page =
  | "home"
  | "build"
  | "rescue"
  | "investigate"
  | "scale"
  | "lab"
  | "open-a-case";

type HeaderProps = {
  active: Page;
  theme?: "light" | "dark";
};

const LEFT_LINKS: { href: string; label: string; page: Page }[] = [
  { href: "/build", label: "BUILD", page: "build" },
  { href: "/rescue", label: "RESCUE", page: "rescue" },
  { href: "/investigate", label: "INVESTIGATE", page: "investigate" },
];

const RIGHT_LINKS: { href: string; label: string; page: Page }[] = [
  { href: "/scale", label: "SCALE", page: "scale" },
  { href: "/lab", label: "THE LAB", page: "lab" },
];

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

export default function Header({ active, theme = "light" }: HeaderProps) {
  const onDark = theme === "dark";
  const isOpenACase = active === "open-a-case";

  return (
    <header className={`site-header${onDark ? " on-dark" : ""}`}>
      <MobileMenu links={ALL_LINKS} active={active} onDark={onDark} />

      <nav className={`site-nav desktop-only${onDark ? " on-dark" : ""}`}>
        {LEFT_LINKS.map((l) => (
          <Link
            key={l.page}
            href={l.href}
            className={active === l.page ? "active" : ""}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <Link href="/" className="logo">
        <Logo variant="header" theme={onDark ? "dark" : "light"} />
      </Link>

      <div className="site-nav-right-group">
        <nav className={`site-nav desktop-only${onDark ? " on-dark" : ""}`}>
          {RIGHT_LINKS.map((l) => (
            <Link
              key={l.page}
              href={l.href}
              className={active === l.page ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/open-a-case"
          className="nav-cta"
          style={{
            background: isOpenACase ? "#d94f2b" : onDark ? "#efe9dd" : "#17150f",
            color: isOpenACase || onDark ? "#17150f" : "#efe9dd",
          }}
        >
          OPEN A CASE
        </Link>
      </div>
    </header>
  );
}
