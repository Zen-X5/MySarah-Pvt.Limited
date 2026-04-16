"use client";

import { useTranslation } from "react-i18next";

export default function AdminDashboardHeader() {
  const { t } = useTranslation();

  return (
    <header className="admin-head">
      <div>
        <p className="admin-kicker">{t("admin.dashboard.kicker")}</p>
        <h1>{t("admin.dashboard.title")}</h1>
        <p className="admin-subtitle">{t("admin.dashboard.subtitle")}</p>
      </div>
      <form action="/api/admin/logout" method="POST">
        <button className="button button-outline" type="submit">
          {t("admin.dashboard.logout")}
        </button>
      </form>
    </header>
  );
}
