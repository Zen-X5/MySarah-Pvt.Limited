"use client";

const SESSION_STORAGE_KEY = "mysarah.session.id";

function createSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getTrafficSessionId() {
  const existing = localStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const next = createSessionId();
  localStorage.setItem(SESSION_STORAGE_KEY, next);
  return next;
}

export function sendTrafficEvent(eventType: "page_view" | "heartbeat", path?: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const sessionId = getTrafficSessionId();
    const payload = JSON.stringify({
      sessionId,
      eventType,
      path,
    });

    const url = "/api/traffic/event";

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon(url, blob);
      return;
    }

    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
  } catch {
    // Ignore client telemetry failures.
  }
}
