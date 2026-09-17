import posthog from "posthog-js";
import { captureGoogleAnalyticsEvent } from "@/lib/google-analytics";

export type AnalyticsProperties = Record<string, boolean | number | string>;

export function captureAnalyticsEvent(
  eventName: string,
  properties: AnalyticsProperties = {},
): void {
  if (typeof window === "undefined") return;

  if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
    posthog.capture(eventName, properties);
  }
  captureGoogleAnalyticsEvent(eventName, properties);
}
