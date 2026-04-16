"use client";

import { useReportWebVitals } from "next/web-vitals";
import { trackEvent } from "@/lib/analytics";

const VITAL_EVENT_NAME = "web_vital";

export default function AnalyticsWebVitals() {
  useReportWebVitals((metric) => {
    trackEvent(VITAL_EVENT_NAME, {
      metric_name: metric.name,
      metric_id: metric.id,
      metric_value: Math.round(metric.value),
      metric_delta: Math.round(metric.delta),
      metric_rating: metric.rating,
      non_interaction: true,
    });
  });

  return null;
}
