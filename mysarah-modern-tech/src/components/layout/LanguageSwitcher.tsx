"use client";

import { useTranslation } from "react-i18next";
import { trackEvent } from "@/lib/analytics";
import { languageOptions, type LanguageCode, LANGUAGE_STORAGE_KEY } from "@/lib/i18";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value as LanguageCode;
    trackEvent("language_change", {
      previous_language: i18n.language,
      next_language: next,
    });
    void i18n.changeLanguage(next);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
  }

  return (
    <div className="language-switcher-wrap">
      <label htmlFor="site-language" className="language-switcher-label">
        {t("Language")}
      </label>
      <select id="site-language" value={i18n.language} onChange={handleChange} className="language-switcher" aria-label={t("Select language")}>
        {languageOptions.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}