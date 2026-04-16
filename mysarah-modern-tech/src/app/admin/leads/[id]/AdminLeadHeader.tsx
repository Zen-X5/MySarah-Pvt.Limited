"use client";

import { useTranslation } from "react-i18next";

export default function AdminLeadHeader() {
  const { t } = useTranslation();

  return (
    <header className="admin-head">
      <div>
        <p className="admin-kicker">{t("admin.dashboard.kicker")}</p>
        <h1>{t("admin.leadSheet.title")}</h1>
        <p className="admin-subtitle">{t("admin.leadSheet.subtitle")}</p>
      </div>
    </header>
  );
}
