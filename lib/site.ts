const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

if (process.env.NODE_ENV === "production" && !configuredSiteUrl) {
  console.warn(
    "NEXT_PUBLIC_SITE_URL is not set. Sitemap and social metadata will use the local development URL."
  );
}

export const SITE_URL = configuredSiteUrl || "https://weloid.com";
