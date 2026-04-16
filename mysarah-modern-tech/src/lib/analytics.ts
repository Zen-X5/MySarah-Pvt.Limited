"use client";

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, eventName: string, params?: AnalyticsParams) => void;
  }
}

function hasGtag() {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

export function trackPageView(path: string) {
  if (!hasGtag()) {
    return;
  }

  window.gtag!("event", "page_view", {
    page_path: path,
  });
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (!hasGtag()) {
    return;
  }

  window.gtag!("event", eventName, params);
}
