type LogoProps = {
  variant?: "header" | "footer";
  theme?: "light" | "dark";
};

export default function Logo({ variant = "header", theme = "light" }: LogoProps) {
  return (
    <span className={`logo-mark logo-mark-${variant} logo-${theme}`}>
      welo
      <span className="logo-dot-wrap">
        ı
        <span className={`logo-dot logo-dot-${variant}`} />
      </span>
      d
    </span>
  );
}
