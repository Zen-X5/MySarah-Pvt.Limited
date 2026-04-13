"use client";

import { useEffect, useState } from "react";
import type { LeadProgressUpdate, LeadRecord } from "@/types/lead";

export default function AdminLeadsTable() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<LeadRecord | null>(null);

  async function loadLeads() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/leads", { method: "GET", cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Unable to fetch leads.");
        return;
      }
      setLeads(data.data || []);
    } catch {
      setError("Unable to fetch leads.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  async function updateLead(id: string, payload: LeadProgressUpdate) {
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    loadLeads();
  }

  async function removeLead(id: string) {
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    loadLeads();
  }

  if (loading) {
    return <p>Loading leads...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (leads.length === 0) {
    return <p>No leads found yet.</p>;
  }

  return (
    <>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Type</th>
              <th>Date</th>
              <th>Workflow</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.location}</td>
                <td>{lead.type}</td>
                <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td>
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
                      {lead.visitConfirmed ? "✓" : "○"} Visit Confirmed
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
                      {lead.installationCompleted ? "✓" : "○"} Installation Done
                    </button>
                  </div>
                </td>
                <td>
                  <div className="table-actions">
                    <button type="button" className="button button-outline" onClick={() => setSelected(lead)}>
                      View
                    </button>
                    <button type="button" className="button button-danger" onClick={() => removeLead(lead._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected ? (
        <div className="content-card" style={{ marginTop: "1rem" }}>
          <h3>Lead Details</h3>
          <p>Name: {selected.name}</p>
          <p>Phone: {selected.phone}</p>
          <p>Location: {selected.location}</p>
          <p>Type: {selected.type}</p>
          <p>Status: {selected.status}</p>
          <p>Visit Confirmed: {selected.visitConfirmed ? "Yes" : "No"}</p>
          <p>Installation Completed: {selected.installationCompleted ? "Yes" : "No"}</p>
          <p>Message: {selected.message}</p>
          <p>Date: {new Date(selected.createdAt).toLocaleString()}</p>
        </div>
      ) : null}
    </>
  );
}
