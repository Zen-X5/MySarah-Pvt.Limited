"use client";

import { useEffect, useState } from "react";
import AdminDashboardHeader from "@/app/admin/AdminDashboardHeader";
import AdminFeedbackComplianceTable from "@/components/admin/AdminFeedbackComplianceTable";
import AdminLeadsTable from "@/components/admin/AdminLeadsTable";

type AdminView = "solar" | "contact" | "feedback" | "traffic";

function TrafficCheatSheet() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState<{
    activeUsers5m: number;
    visitorsToday: number;
    pageViewsToday: number;
    activityEventsLastHour: number;
  } | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch("/api/admin/traffic/summary", { method: "GET", cache: "no-store" });
        const data = await response.json();
        if (!response.ok) {
          setError(data.error || "Unable to load traffic metrics.");
          return;
        }
        setSummary(data.data);
      } catch {
        setError("Unable to load traffic metrics.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="admin-traffic-sheet" aria-label="Traffic cheat sheet">
      <header className="admin-traffic-head">
        <p className="admin-kicker">Traffic</p>
        <h2>Live traffic snapshot and daily thresholds</h2>
        <p className="admin-subtitle">
          Use this quick guide to decide whether traffic is healthy, warning-level, or needs immediate action.
        </p>
      </header>

      {loading ? <p className="admin-subtitle">Loading traffic metrics...</p> : null}
      {error ? <p className="admin-subtitle">{error}</p> : null}

      {summary ? (
        <section className="admin-kpi-grid" aria-label="Traffic metrics overview">
          <article className="admin-kpi-card">
            <p>Active users (last 5 min)</p>
            <strong>{summary.activeUsers5m}</strong>
          </article>
          <article className="admin-kpi-card">
            <p>Visitors today</p>
            <strong>{summary.visitorsToday}</strong>
          </article>
          <article className="admin-kpi-card">
            <p>Page views today</p>
            <strong>{summary.pageViewsToday}</strong>
          </article>
          <article className="admin-kpi-card">
            <p>Activity events (last hour)</p>
            <strong>{summary.activityEventsLastHour}</strong>
          </article>
        </section>
      ) : null}

      <div className="admin-traffic-grid">
        <article className="admin-traffic-card admin-traffic-green">
          <h3>Green</h3>
          <p>Normal traffic and stable operations.</p>
          <ul>
            <li>Mixed concurrent users: up to 600</li>
            <li>Lead form submitters: up to 180 sustained</li>
            <li>Solar upload applicants: up to 70 sustained</li>
            <li>API error rate: below 1%</li>
          </ul>
        </article>

        <article className="admin-traffic-card admin-traffic-yellow">
          <h3>Yellow</h3>
          <p>Performance is under pressure. Watch closely.</p>
          <ul>
            <li>Mixed concurrent users: 600 to 900</li>
            <li>Lead form submitters: 180 to 250 sustained</li>
            <li>Solar upload applicants: 70 to 100 sustained</li>
            <li>API error rate: 1% to 2%</li>
          </ul>
        </article>

        <article className="admin-traffic-card admin-traffic-red">
          <h3>Red</h3>
          <p>High risk of failures and user-impact.</p>
          <ul>
            <li>Mixed concurrent users: above 900 sustained</li>
            <li>Lead form submitters: above 250 sustained</li>
            <li>Solar upload applicants: above 100 sustained</li>
            <li>API error rate: above 2%</li>
          </ul>
        </article>
      </div>

      <div className="admin-traffic-actions-card">
        <h3>Immediate Action Rules</h3>
        <ol>
          <li>If in yellow for more than 15 minutes, pause campaigns and monitor API latency + errors.</li>
          <li>If in red for more than 5 minutes, reduce traffic sources and move to a higher hosting tier.</li>
          <li>Re-run load tests weekly or before any major campaign launch.</li>
        </ol>
      </div>
    </section>
  );
}

export default function AdminDashboardShell() {
  const [activeView, setActiveView] = useState<AdminView>("solar");

  return (
    <div className="admin-dashboard-shell">
      <div className="admin-shell">
        <AdminDashboardHeader />
      </div>

      <div className="admin-dashboard-grid">
        <aside className="admin-sidebar" aria-label="Admin sections">
          <button
            type="button"
            className={activeView === "solar" ? "admin-sidebar-link is-active" : "admin-sidebar-link"}
            onClick={() => setActiveView("solar")}
          >
            Solar Installation Forms
          </button>
          <button
            type="button"
            className={activeView === "contact" ? "admin-sidebar-link is-active" : "admin-sidebar-link"}
            onClick={() => setActiveView("contact")}
          >
            Contact Us Forms
          </button>
          <button
            type="button"
            className={activeView === "feedback" ? "admin-sidebar-link is-active" : "admin-sidebar-link"}
            onClick={() => setActiveView("feedback")}
          >
            Feedback and Compliance
          </button>
          <button
            type="button"
            className={activeView === "traffic" ? "admin-sidebar-link is-active" : "admin-sidebar-link"}
            onClick={() => setActiveView("traffic")}
          >
            Traffic
          </button>
        </aside>

        <section className="admin-content-panel">
          {activeView === "solar" ? <AdminLeadsTable mode="solar" /> : null}
          {activeView === "contact" ? <AdminLeadsTable mode="contact" /> : null}
          {activeView === "feedback" ? <AdminFeedbackComplianceTable /> : null}
          {activeView === "traffic" ? <TrafficCheatSheet /> : null}
        </section>
      </div>
    </div>
  );
}
