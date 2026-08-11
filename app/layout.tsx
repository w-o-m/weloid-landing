import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const DEFAULT_TITLE = "Weloid — Forensic Software Engineering";
const DEFAULT_DESCRIPTION =
  "Every broken system has a story. We find it. Then we rewrite the ending. Weloid builds, rescues and investigates software.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s — Weloid",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    siteName: "Weloid",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Space+Grotesk:wght@300;400;500&family=Karla:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
