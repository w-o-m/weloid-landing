import posthog from "posthog-js";
import { captureAnalyticsEvent } from "@/lib/analytics";

let postHogInitialized = false;
let clickTrackingAttached = false;

function classifyDestination(pathname: string): string | undefined {
  if (pathname === "/open-a-case") return "open_a_case";
  if (pathname === "/contact") return "contact";
  if (pathname === "/build") return "build";
  if (pathname === "/rescue") return "rescue";
  if (pathname === "/investigate") return "investigate";
  if (pathname === "/scale") return "scale";
  if (pathname === "/lab") return "lab";
  if (pathname === "/") return "home";
  return undefined;
}

function captureTrackedClick(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const anchor = target.closest<HTMLAnchorElement>("a[href]");
  if (!anchor) return;

  const destination = new URL(anchor.href, window.location.origin);
  if (destination.origin !== window.location.origin) return;

  const destinationType = classifyDestination(destination.pathname);
  if (destinationType) {
    captureAnalyticsEvent("navigation_link_clicked", {
      destination_type: destinationType,
      destination_path: destination.pathname,
      source_path: window.location.pathname,
    });
  }

  if (anchor.matches(".btn, .nav-cta")) {
    captureAnalyticsEvent("cta_clicked", {
      destination_path: destination.pathname,
      source_path: window.location.pathname,
      cta_label: anchor.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) || "unlabelled",
    });
  }
}

function initializePostHog(): void {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token || postHogInitialized) return;

  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    defaults: "2026-01-30",
    person_profiles: "identified_only",
  });
  postHogInitialized = true;
  posthog.opt_in_capturing();
}

function attachClickTracking(): void {
  if (clickTrackingAttached) return;
  document.addEventListener("click", captureTrackedClick);
  clickTrackingAttached = true;
}

initializePostHog();

if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
  attachClickTracking();
}
