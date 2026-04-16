"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import StatusPopup from "@/components/shared/StatusPopup";

export default function AdminLoginPage() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState<{ message: string; tone: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNotice(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const fieldMessages = data.fieldErrors ? Object.values(data.fieldErrors).flat().join(" ") : "";
        setNotice({
          message: [data.error || t("admin.login.failed"), fieldMessages].filter(Boolean).join(" "),
          tone: "error",
        });
      } else {
        setNotice({ message: t("admin.login.successRedirecting"), tone: "success" });
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setNotice({ message: t("admin.login.unable"), tone: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section container auth-wrap">
      <div className="content-card auth-card">
        {notice ? <StatusPopup message={notice.message} tone={notice.tone} onClose={() => setNotice(null)} /> : null}
        <h1>{t("admin.login.title")}</h1>
        <form className="lead-form" onSubmit={onSubmit}>
          <label>
            {t("admin.login.username")}
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required minLength={3} maxLength={40} autoComplete="username" />
          </label>
          <label>
            {t("admin.login.password")}
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} maxLength={200} autoComplete="current-password" />
          </label>
          <button type="submit" className="button" disabled={loading}>
            {loading ? t("admin.login.signingIn") : t("admin.login.signIn")}
          </button>
        </form>
      </div>
    </main>
  );
}
