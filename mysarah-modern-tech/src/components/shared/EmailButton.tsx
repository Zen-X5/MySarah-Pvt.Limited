"use client";

import { company } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { useTranslation } from "react-i18next";

export default function EmailButton() {
  const { t } = useTranslation();
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(company.email)}`;

  return (
    <a
      href={gmailComposeUrl}
      className="email-fab"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("cta_click", {
          cta_channel: "email",
          cta_location: "floating_button",
        })
      }
      aria-label={t("Send email")}
      title={t("Send email")}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Zm2.5-.5a.5.5 0 0 0-.5.5v.38l7 4.67 7-4.67V5.5a.5.5 0 0 0-.5-.5h-13Zm13.5 3.28-6.45 4.3a1 1 0 0 1-1.1 0L5 8.28v10.22a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V8.28Z"
        />
      </svg>
    </a>
  );
}
