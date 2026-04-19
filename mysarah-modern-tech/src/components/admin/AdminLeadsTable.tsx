"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { LeadProgressUpdate, LeadRecord } from "@/types/lead";
import StatusPopup from "@/components/shared/StatusPopup";

interface AdminLeadsTableProps {
  mode?: "solar" | "contact";
}

export default function AdminLeadsTable({ mode = "solar" }: AdminLeadsTableProps) {
  const { t } = useTranslation();
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState<{ message: string; tone: "success" | "error" } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadRecord["status"]>("all");
  const [progressFilter, setProgressFilter] = useState<"all" | "visit-pending" | "visit-confirmed" | "installed">("all");
  const isContactView = mode === "contact";
  const apiBasePath = isContactView ? "/api/admin/contacts" : "/api/admin/leads";

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(apiBasePath, { method: "GET", cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        const fieldMessages = data.fieldErrors ? Object.values(data.fieldErrors).flat().join(" ") : "";
        setError([data.error || t("admin.leads.fetchError"), fieldMessages].filter(Boolean).join(" "));
        return;
      }
      setLeads(data.data || []);
    } catch {
      setError(t("admin.leads.fetchError"));
    } finally {
      setLoading(false);
    }
  }, [apiBasePath, t]);

  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  const totals = {
    all: leads.length,
    installed: leads.filter((lead) => lead.installationCompleted).length,
    visitConfirmed: leads.filter((lead) => lead.visitConfirmed).length,
    openPipeline: leads.filter((lead) => !lead.installationCompleted).length,
  };

  const filteredLeads = leads.filter((lead) => {
    const normalizedQuery = searchTerm.trim().toLowerCase();
    const matchesQuery =
      normalizedQuery.length === 0 ||
      lead.name.toLowerCase().includes(normalizedQuery) ||
      lead.phone.toLowerCase().includes(normalizedQuery) ||
      lead.location.toLowerCase().includes(normalizedQuery);

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

    const matchesProgress =
      progressFilter === "all" ||
      (progressFilter === "visit-pending" && !lead.visitConfirmed) ||
      (progressFilter === "visit-confirmed" && lead.visitConfirmed && !lead.installationCompleted) ||
      (progressFilter === "installed" && lead.installationCompleted);

    return matchesQuery && matchesStatus && (isContactView ? true : matchesProgress);
  });

  async function updateLead(id: string, payload: LeadProgressUpdate) {
    if (isContactView) {
      return;
    }

    setNotice(null);
    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const fieldMessages = data.fieldErrors ? Object.values(data.fieldErrors).flat().join(" ") : "";
        setNotice({
          message: [data.error || t("admin.leads.updateError"), fieldMessages].filter(Boolean).join(" "),
          tone: "error",
        });
        return;
      }

      await loadLeads();
      setNotice({ message: t("admin.leads.updated"), tone: "success" });
    } catch {
      setNotice({ message: t("admin.leads.updateError"), tone: "error" });
    }
  }

  async function removeLead(id: string) {
    const confirmed = window.confirm(
      isContactView
        ? "Mark this request as resolved and permanently delete it from the database?"
        : "Delete this lead permanently from the database?",
    );

    if (!confirmed) {
      return;
    }

    setNotice(null);
    try {
      const response = await fetch(`${apiBasePath}/${id}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        const fieldMessages = data.fieldErrors ? Object.values(data.fieldErrors).flat().join(" ") : "";
        setNotice({
          message: [
            data.error || (isContactView ? "Unable to resolve request." : t("admin.leads.deleteError")),
            fieldMessages,
          ]
            .filter(Boolean)
            .join(" "),
          tone: "error",
        });
        return;
      }

      await loadLeads();
      setNotice({ message: isContactView ? "Request resolved and removed." : t("admin.leads.deleted"), tone: "success" });
    } catch {
      setNotice({ message: isContactView ? "Unable to resolve request." : t("admin.leads.deleteError"), tone: "error" });
    }
  }

  if (loading) {
    return <p>{t("admin.leads.loading")}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (leads.length === 0) {
    return <p>{isContactView ? "No contact form submissions found." : "No solar installation form submissions found."}</p>;
  }

  return (
    <>
      {notice ? <StatusPopup message={notice.message} tone={notice.tone} onClose={() => setNotice(null)} /> : null}
      <section className="admin-kpi-grid" aria-label="Lead overview">
        <article className="admin-kpi-card">
          <p>{isContactView ? "Total Contact Us Forms" : "Total Solar Installation Forms"}</p>
          <strong>{totals.all}</strong>
        </article>
        {isContactView ? (
          <article className="admin-kpi-card">
            <p>Open Requests</p>
            <strong>{leads.filter((lead) => lead.status !== "closed").length}</strong>
          </article>
        ) : (
          <>
            <article className="admin-kpi-card">
              <p>{t("admin.leads.kpi.installed")}</p>
              <strong>{totals.installed}</strong>
            </article>
            <article className="admin-kpi-card">
              <p>{t("admin.leads.kpi.visitConfirmed")}</p>
              <strong>{totals.visitConfirmed}</strong>
            </article>
            <article className="admin-kpi-card">
              <p>{t("admin.leads.kpi.openPipeline")}</p>
              <strong>{totals.openPipeline}</strong>
            </article>
          </>
        )}
      </section>

      <section className="admin-toolbar" aria-label="Lead filters">
        <label>
          {t("admin.leads.filter.search")}
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={t("admin.leads.filter.searchPlaceholder")}
          />
        </label>
        <label>
          {t("admin.leads.filter.status")}
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as "all" | LeadRecord["status"])}
          >
            <option value="all">{t("admin.leads.option.all")}</option>
            <option value="new">{t("admin.leads.option.new")}</option>
            <option value="in-progress">{t("admin.leads.option.inProgress")}</option>
            <option value="closed">{t("admin.leads.option.closed")}</option>
          </select>
        </label>
        {!isContactView ? (
          <label>
            {t("admin.leads.filter.progress")}
            <select
              value={progressFilter}
              onChange={(event) =>
                setProgressFilter(event.target.value as "all" | "visit-pending" | "visit-confirmed" | "installed")
              }
            >
              <option value="all">{t("admin.leads.option.all")}</option>
              <option value="visit-pending">{t("admin.leads.option.visitPending")}</option>
              <option value="visit-confirmed">{t("admin.leads.option.visitConfirmed")}</option>
              <option value="installed">{t("admin.leads.option.installed")}</option>
            </select>
          </label>
        ) : null}
        <button type="button" className="button button-outline" onClick={loadLeads}>
          {t("admin.leads.refresh")}
        </button>
      </section>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t("Name")}</th>
              <th>{t("Phone")}</th>
              <th>{t("Location")}</th>
              {!isContactView ? <th>{t("admin.leads.type")}</th> : null}
              <th>{t("admin.leads.date")}</th>
              {!isContactView ? <th>{t("admin.leads.workflow")}</th> : null}
              <th>{t("admin.leads.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead._id}>
                <td data-label={t("Name")}>
                  <div className="admin-primary-cell">
                    <strong>{lead.name}</strong>
                  </div>
                </td>
                <td data-label={t("Phone")}>{lead.phone}</td>
                <td data-label={t("Location")}>{lead.location}</td>
                {!isContactView ? <td data-label={t("admin.leads.type")}>{lead.type}</td> : null}
                <td data-label={t("admin.leads.date")}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                {!isContactView ? (
                  <td data-label={t("admin.leads.workflow")}>
                    <div className="workflow-steps">
                      <button
                        type="button"
                        className={`workflow-step ${lead.visitConfirmed ? "workflow-step-done" : ""}`}
                        onClick={() => {
                          const nextVisitConfirmed = !lead.visitConfirmed;
                          updateLead(lead._id, {
                            visitConfirmed: nextVisitConfirmed,
                            installationCompleted: nextVisitConfirmed ? lead.installationCompleted : false,
                          });
                        }}
                      >
                        {lead.visitConfirmed ? "✓" : "○"} {t("admin.leads.option.visitConfirmed")}
                      </button>
                      <button
                        type="button"
                        className={`workflow-step ${lead.installationCompleted ? "workflow-step-done" : ""}`}
                        onClick={() =>
                          updateLead(lead._id, {
                            visitConfirmed: true,
                            installationCompleted: !lead.installationCompleted,
                          })
                        }
                      >
                        {lead.installationCompleted ? "✓" : "○"} {t("admin.leads.option.installed")}
                      </button>
                    </div>
                  </td>
                ) : null}
                <td data-label={t("admin.leads.actions")}>
                  <div className="table-actions">
                    <span className={`admin-status-badge admin-status-${lead.status}`}>{lead.status}</span>
                    {!isContactView ? (
                      <Link className="button button-outline" href={`/admin/leads/${lead._id}`}>
                        {t("admin.leads.view")}
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      className={isContactView ? "button" : "button button-danger"}
                      onClick={() => removeLead(lead._id)}
                    >
                      {isContactView ? "Mark as Resolved" : t("admin.leads.delete")}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLeads.length === 0 ? <p className="admin-empty-state">{t("admin.leads.noMatch")}</p> : null}
    </>
  );
}
