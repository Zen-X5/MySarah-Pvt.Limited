"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type StatusTone = "success" | "error" | "info";

interface StatusPopupProps {
  message: string;
  tone?: StatusTone;
  onClose: () => void;
  autoHideMs?: number;
}

export default function StatusPopup({
  message,
  tone = "info",
  onClose,
  autoHideMs = 5000,
}: StatusPopupProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = window.setTimeout(() => {
      onClose();
    }, autoHideMs);

    return () => window.clearTimeout(timer);
  }, [autoHideMs, message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className={`status-popup status-popup-${tone}`} role="alert" aria-live="assertive">
      <p>{message}</p>
      <button type="button" className="status-popup-close" onClick={onClose} aria-label={t("Close notification")}>
        x
      </button>
    </div>
  );
}
