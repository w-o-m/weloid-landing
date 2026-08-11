import type { ReactNode } from "react";
import Logo from "./Logo";

type FooterProps = {
  theme?: "light" | "dark";
  bgDark?: boolean;
  tagline: ReactNode;
  taglineStyle?: React.CSSProperties;
};

export default function Footer({
  theme = "light",
  bgDark = false,
  tagline,
  taglineStyle,
}: FooterProps) {
  const onDark = theme === "dark" || bgDark;
  return (
    <footer
      className={`site-footer${theme === "dark" ? " on-dark" : ""}${
        bgDark ? " bg-dark" : ""
      }`}
    >
      <Logo variant="footer" theme={onDark ? "dark" : "light"} />
      <span style={taglineStyle}>{tagline}</span>
    </footer>
  );
}
