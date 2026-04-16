"use client";

import { useEffect } from "react";
import { sendTrafficEvent } from "@/lib/traffic-client";

export default function TrafficHeartbeat() {
  useEffect(() => {
    sendTrafficEvent("heartbeat", window.location.pathname);

    const interval = window.setInterval(() => {
      if (!document.hidden) {
        sendTrafficEvent("heartbeat", window.location.pathname);
      }
    }, 60_000);

    function onVisibilityChange() {
      if (!document.hidden) {
        sendTrafficEvent("heartbeat", window.location.pathname);
      }
    }

    window.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return null;
}
