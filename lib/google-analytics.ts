type GoogleAnalyticsValue = boolean | number | string;
type GoogleAnalyticsProperties = Record<string, GoogleAnalyticsValue>;
type GtagCommand = "config" | "consent" | "event" | "js";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, target: string | Date, properties?: unknown) => void;
  }
}

export function captureGoogleAnalyticsEvent(
  eventName: string,
  properties: GoogleAnalyticsProperties = {},
): void {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return;

  window.gtag?.("event", eventName, properties);
}
