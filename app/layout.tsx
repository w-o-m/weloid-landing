import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const DEFAULT_TITLE = "Weloid — Forensic Software Engineering";
const DEFAULT_DESCRIPTION =
  "Every broken system has a story. We find it. Then we rewrite the ending. Weloid builds, rescues and investigates software.";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Weloid",
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  areaServed: "Worldwide",
  serviceType: [
    "Custom software development",
    "Software rescue",
    "Software audits",
    "Technical investigations",
    "Dedicated engineering teams",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s — Weloid",
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    siteName: "Weloid",
    type: "website",
    url: SITE_URL,
    images: [{ url: "/images/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/og-image.png"],
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
      <body>
        <main>{children}</main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
      </body>
    </html>
  );
}
