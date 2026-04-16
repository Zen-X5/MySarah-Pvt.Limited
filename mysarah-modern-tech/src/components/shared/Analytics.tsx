import Script from "next/script";
import AnalyticsRouteTracker from "@/components/shared/AnalyticsRouteTracker";
import AnalyticsWebVitals from "@/components/shared/AnalyticsWebVitals";
import TrafficHeartbeat from "@/components/shared/TrafficHeartbeat";

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${gaId}', { send_page_view: false, anonymize_ip: true });`}
      </Script>
      <AnalyticsRouteTracker />
      <AnalyticsWebVitals />
      <TrafficHeartbeat />
    </>
  );
}
