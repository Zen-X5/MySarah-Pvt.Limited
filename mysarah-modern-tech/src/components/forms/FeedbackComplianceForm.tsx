"use client";

import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import StatusPopup from "@/components/shared/StatusPopup";
import { trackEvent } from "@/lib/analytics";
import type { FeedbackCategory } from "@/types/feedback";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  category: "feedback" as FeedbackCategory,
  message: "",
};

export default function FeedbackComplianceForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ ...initialForm });
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ message: string; tone: "success" | "error" } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNotice(null);

    trackEvent("feedback_compliance_submit_attempt", {
      category: form.category,
      form_name: "feedback_compliance_form",
    });

    try {
      const response = await fetch("/api/feedback-compliance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const fieldMessages = data?.fieldErrors ? Object.values(data.fieldErrors).flat().join(" ") : "";
        setNotice({
          message: [data?.error || "Unable to submit right now.", fieldMessages].filter(Boolean).join(" "),
          tone: "error",
        });
        trackEvent("feedback_compliance_submit_failed", {
          category: form.category,
          form_name: "feedback_compliance_form",
          status_code: response.status,
        });
        return;
      }

      setForm({ ...initialForm });
      setNotice({ message: "Submitted successfully. Our team will review this shortly.", tone: "success" });
      trackEvent("feedback_compliance_submit_success", {
        category: form.category,
        form_name: "feedback_compliance_form",
      });
    } catch {
      setNotice({ message: "Network issue. Please try again.", tone: "error" });
      trackEvent("feedback_compliance_submit_failed", {
        category: form.category,
        form_name: "feedback_compliance_form",
        status_code: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lead-form-wrap contact-feedback-card">
      {notice ? <StatusPopup message={notice.message} tone={notice.tone} onClose={() => setNotice(null)} /> : null}
      <h3>Feedback & Compliance</h3>
      <p className="contact-feedback-subtitle">
        Share feedback, compliance concerns, grievances, or suggestions. This goes to a dedicated review queue.
      </p>

      <form className="lead-form" onSubmit={handleSubmit}>
        <label>
          {t("Name")}
          <input
            type="text"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            minLength={2}
            maxLength={80}
            required
          />
        </label>

        <label>
          {t("Email")}
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            maxLength={120}
            required
          />
        </label>

        <label>
          {t("Phone")}
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            minLength={7}
            maxLength={20}
            pattern="[0-9+\- ()]{7,20}"
          />
        </label>

        <label>
          Category
          <select
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value as FeedbackCategory }))}
          >
            <option value="feedback">Feedback</option>
            <option value="compliance">Compliance</option>
            <option value="grievance">Grievance</option>
            <option value="suggestion">Suggestion</option>
          </select>
        </label>

        <label>
          Message
          <textarea
            rows={4}
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            minLength={10}
            maxLength={1500}
            required
          />
        </label>

        <button type="submit" className="button" disabled={loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}
