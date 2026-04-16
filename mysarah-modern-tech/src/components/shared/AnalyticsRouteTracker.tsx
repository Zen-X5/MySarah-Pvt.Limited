"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";
import { sendTrafficEvent } from "@/lib/traffic-client";

export default function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedRef = useRef<string>("");

  useEffect(() => {
    const query = searchParams.toString();
    const fullPath = query ? `${pathname}?${query}` : pathname;

    if (!fullPath || fullPath === lastTrackedRef.current) {
      return;
    }

    trackPageView(fullPath);
    sendTrafficEvent("page_view", fullPath);
    lastTrackedRef.current = fullPath;
  }, [pathname, searchParams]);

  return null;
}
