"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import StatusPopup from "@/components/shared/StatusPopup";
import type { FeedbackComplianceRecord } from "@/types/feedback";

export default function AdminFeedbackComplianceTable() {
  const [entries, setEntries] = useState<FeedbackComplianceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState<{ message: string; tone: "success" | "error" } | null>(null);
  const [query, setQuery] = useState("");

  const loadEntries = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/feedback-compliance", { method: "GET", cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        const fieldMessages = data.fieldErrors ? Object.values(data.fieldErrors).flat().join(" ") : "";
        setError([data.error || "Unable to load entries.", fieldMessages].filter(Boolean).join(" "));
        return;
      }

      setEntries(data.data || []);
    } catch {
      setError("Unable to load entries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEntries();
  }, [loadEntries]);

  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return entries;
    }

    return entries.filter((entry) =>
      [entry.name, entry.email, entry.phone || "", entry.category, entry.message]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [entries, query]);

  async function resolveEntry(id: string) {
    const confirmed = window.confirm("Mark this item as resolved and delete it permanently?");
    if (!confirmed) {
      return;
    }

    setNotice(null);

    try {
      const response = await fetch(`/api/admin/feedback-compliance/${id}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        const fieldMessages = data.fieldErrors ? Object.values(data.fieldErrors).flat().join(" ") : "";
        setNotice({
          message: [data.error || "Unable to resolve this entry.", fieldMessages].filter(Boolean).join(" "),
          tone: "error",
        });
        return;
      }

      await loadEntries();
      setNotice({ message: "Feedback/compliance entry resolved and removed.", tone: "success" });
    } catch {
      setNotice({ message: "Unable to resolve this entry.", tone: "error" });
    }
  }

  if (loading) {
    return <p>Loading feedback/compliance entries...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {notice ? <StatusPopup message={notice.message} tone={notice.tone} onClose={() => setNotice(null)} /> : null}

      <section className="admin-kpi-grid" aria-label="Feedback overview">
        <article className="admin-kpi-card">
          <p>Total Submissions</p>
          <strong>{entries.length}</strong>
        </article>
        <article className="admin-kpi-card">
          <p>Compliance</p>
          <strong>{entries.filter((item) => item.category === "compliance").length}</strong>
        </article>
        <article className="admin-kpi-card">
          <p>Grievance</p>
          <strong>{entries.filter((item) => item.category === "grievance").length}</strong>
        </article>
        <article className="admin-kpi-card">
          <p>Suggestions</p>
          <strong>{entries.filter((item) => item.category === "suggestion").length}</strong>
        </article>
      </section>

      <section className="admin-toolbar" aria-label="Feedback filters">
        <label>
          Search
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, email, category, or message"
          />
        </label>
        <button type="button" className="button button-outline" onClick={loadEntries}>
          Refresh
        </button>
      </section>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry) => (
              <tr key={entry._id}>
                <td data-label="Name">
                  <div className="admin-primary-cell">
                    <strong>{entry.name}</strong>
                  </div>
                </td>
                <td data-label="Email">{entry.email}</td>
                <td data-label="Phone">{entry.phone || "-"}</td>
                <td data-label="Category">{entry.category}</td>
                <td data-label="Message">{entry.message.length > 120 ? `${entry.message.slice(0, 120)}...` : entry.message}</td>
                <td data-label="Date">{new Date(entry.createdAt).toLocaleDateString()}</td>
                <td data-label="Actions">
                  <div className="table-actions">
                    <button type="button" className="button" onClick={() => resolveEntry(entry._id)}>
                      Mark as Resolved
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEntries.length === 0 ? <p className="admin-empty-state">No matching feedback/compliance entries.</p> : null}
    </>
  );
}
