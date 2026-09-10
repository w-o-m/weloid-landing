const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const fallbackSiteUrl = "https://weloid.com";

export const SITE_URL = new URL(configuredSiteUrl || fallbackSiteUrl).origin;
