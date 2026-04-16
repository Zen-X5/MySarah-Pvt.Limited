"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import type { LeadRecord } from "@/types/lead";
import {
  isImageAttachment,
  isPdfAttachment,
  getAttachmentRatio,
  parseApplicationSummary,
  sanitizePdfFileName,
  sortLeadAttachments,
} from "@/lib/lead-document";

function formatAdminDateTime(value: string | Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(new Date(value));
}

function formatAdminDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default function LeadDocumentSheet({ lead }: { lead: LeadRecord }) {
  const { t } = useTranslation();
  const [activeAttachment, setActiveAttachment] = useState<LeadRecord["attachments"][number] | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const exportContainerRef = useRef<HTMLDivElement | null>(null);

  const attachments = sortLeadAttachments(lead.attachments);

  const featuredAttachment =
    attachments.find((attachment) => attachment.label.toLowerCase().includes("passport")) ??
    attachments[0] ??
    null;

  const passportAttachments = attachments.filter((attachment) => attachment.label.toLowerCase().includes("passport"));
  const applicationSummary = parseApplicationSummary(lead.message || "");

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveAttachment(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const previewAttachment = activeAttachment;

  function openAttachment(attachment: LeadRecord["attachments"][number]) {
    setActiveAttachment(attachment);
  }

  async function exportPageAsPdf() {
    if (!exportContainerRef.current || isExportingPdf) {
      return;
    }

    try {
      setIsExportingPdf(true);
      setActiveAttachment(null);

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);

      const canvas = await html2canvas(exportContainerRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.scrollWidth,
      });

      const imageData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = pageWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      let remainingHeight = imageHeight;
      let offsetY = 0;

      pdf.addImage(imageData, "JPEG", 0, offsetY, imageWidth, imageHeight, undefined, "FAST");
      remainingHeight -= pageHeight;

      while (remainingHeight > 0) {
        offsetY = remainingHeight - imageHeight;
        pdf.addPage();
        pdf.addImage(imageData, "JPEG", 0, offsetY, imageWidth, imageHeight, undefined, "FAST");
        remainingHeight -= pageHeight;
      }

      pdf.save(sanitizePdfFileName(lead.name || "lead"));
    } catch (error) {
      console.error("[LeadDocumentSheet] PDF export failed", error);
    } finally {
      setIsExportingPdf(false);
    }
  }

  return (
    <div className="content-card admin-detail-card admin-detail-card-document" ref={exportContainerRef}>
      <div className="admin-detail-head">
        <div>
          <p className="admin-detail-kicker">{t("admin.leadSheet.documentFile")}</p>
          <h3>{t("admin.leadSheet.applicantDossier")}</h3>
        </div>
        <div className="table-actions">
          <button type="button" className="button button-outline" onClick={exportPageAsPdf} disabled={isExportingPdf}>
            {isExportingPdf ? t("admin.leadSheet.preparingPdf") : t("admin.leadSheet.downloadPdf")}
          </button>
          <Link className="button button-outline" href="/admin">
            {t("admin.leadSheet.backToDashboard")}
          </Link>
        </div>
      </div>

      <div className="admin-document-layout">
        <section className="admin-document-hero" aria-label={t("admin.leadSheet.applicantOverview")}>
          <button type="button" className="admin-document-preview admin-document-preview-button" onClick={() => featuredAttachment && openAttachment(featuredAttachment)}>
            {featuredAttachment ? (
              isImageAttachment(featuredAttachment.fileName, featuredAttachment.url) ? (
                <img src={featuredAttachment.url} alt={featuredAttachment.label} className="admin-document-preview-image" crossOrigin="anonymous" />
              ) : (
                <div className="admin-document-preview-fallback">
                  <strong>{featuredAttachment.label}</strong>
                  <span>{isPdfAttachment(featuredAttachment.fileName, featuredAttachment.url) ? t("admin.leadSheet.pdfDocument") : featuredAttachment.fileName}</span>
                </div>
              )
            ) : (
              <div className="admin-document-preview-fallback">
                <strong>{t("admin.leadSheet.noPrimaryDocument")}</strong>
                <span>{t("admin.leadSheet.passportWillAppear")}</span>
              </div>
            )}

            <div className="admin-document-preview-caption">
              <p>{t("admin.leadSheet.primaryDocument")}</p>
              <strong>{featuredAttachment?.label || t("admin.leadSheet.passportSizePhoto")}</strong>
              <span>{featuredAttachment ? t("admin.leadSheet.clickToEnlarge") : t("admin.leadSheet.uploadPassportPhoto")}</span>
            </div>
          </button>

          <div className="admin-document-summary">
            <div className="admin-document-summary-header">
              <p className="admin-detail-kicker">{t("admin.leadSheet.identitySummary")}</p>
              <h4>{lead.name}</h4>
              <span>{lead.location}</span>
            </div>

            <div className="admin-document-summary-grid">
              <div>
                <strong>{t("Phone")}</strong>
                <span>{lead.phone}</span>
              </div>
              <div>
                <strong>{t("admin.leads.type")}</strong>
                <span>{lead.type}</span>
              </div>
              <div>
                <strong>{t("admin.leads.filter.status")}</strong>
                <span>{lead.status}</span>
              </div>
              <div>
                <strong>{t("admin.leadSheet.submitted")}</strong>
                <span>{formatAdminDate(lead.createdAt)}</span>
              </div>
            </div>

            <div className="admin-document-summary-badges">
              <span className={`admin-status-badge admin-status-${lead.status}`}>{lead.status}</span>
              <span className={`workflow-step ${lead.visitConfirmed ? "workflow-step-done" : ""}`}>
                {lead.visitConfirmed ? "✓" : "○"} {t("admin.leads.option.visitConfirmed")}
              </span>
              <span className={`workflow-step ${lead.installationCompleted ? "workflow-step-done" : ""}`}>
                {lead.installationCompleted ? "✓" : "○"} {t("admin.leads.option.installed")}
              </span>
            </div>

            <div className="admin-document-summary-snapshot">
              <div>
                <strong>{t("Email")}</strong>
                <span>{applicationSummary.fields.Email || t("admin.leadSheet.notProvided")}</span>
              </div>
              <div>
                <strong>{t("Property Type")}</strong>
                <span>{applicationSummary.fields["Property Type"] || t("admin.leadSheet.notProvided")}</span>
              </div>
              <div>
                <strong>{t("Roof Type")}</strong>
                <span>{applicationSummary.fields["Roof Type"] || t("admin.leadSheet.notProvided")}</span>
              </div>
              <div>
                <strong>{t("Installation Timeline")}</strong>
                <span>{applicationSummary.fields["Installation Timeline"] || t("admin.leadSheet.notProvided")}</span>
              </div>
            </div>

            <div className="admin-document-summary-footer">
              <strong>{t("admin.leadSheet.submittedAt")}</strong>
              <span>{formatAdminDateTime(lead.createdAt)}</span>
            </div>
          </div>
        </section>

        <section className="admin-document-section">
          <div className="admin-document-section-head">
            <div>
              <p className="admin-detail-kicker">{t("admin.leadSheet.applicationSummary")}</p>
              <h4>{applicationSummary.headline}</h4>
            </div>
          </div>

          <div className="admin-application-grid">
            {Object.entries(applicationSummary.fields).map(([label, value]) => (
              <div className="admin-application-field" key={label}>
                <strong>{label}</strong>
                <span>{value}</span>
              </div>
            ))}
          </div>

          {applicationSummary.requiredDocuments.length > 0 ? (
            <div className="admin-document-checklist">
              <p className="admin-detail-kicker">{t("admin.leadSheet.documentStatus")}</p>
              <div className="admin-document-checklist-grid">
                {applicationSummary.requiredDocuments.map((item) => (
                  <div className="admin-document-checklist-item" key={`${item.label}-${item.value}`}>
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {applicationSummary.notes ? (
            <div className="admin-application-notes">
              <p className="admin-detail-kicker">{t("admin.leadSheet.notes")}</p>
              <p>{applicationSummary.notes}</p>
            </div>
          ) : null}
        </section>

        {passportAttachments.length > 0 ? (
          <section className="admin-document-section">
            <div className="admin-document-section-head">
              <div>
                <p className="admin-detail-kicker">{t("admin.leadSheet.passportPhotos")}</p>
                <h4>{t("admin.leadSheet.bothCopies")}</h4>
              </div>
              <span>{passportAttachments.length} {t("admin.leadSheet.photos")}</span>
            </div>

            <div className="admin-passport-grid">
              {passportAttachments.map((attachment, index) => (
                <article className="admin-passport-card" key={`${attachment.label}-${attachment.publicId}-${index}`}>
                  <button
                    type="button"
                    className="admin-document-media admin-document-media-button admin-passport-media"
                    onClick={() => openAttachment(attachment)}
                  >
                    <img src={attachment.url} alt={attachment.label} className="admin-document-media-image" crossOrigin="anonymous" />
                  </button>
                  <div className="admin-document-card-body">
                    <strong>{attachment.label}</strong>
                    <span>{attachment.fileName}</span>
                    <button type="button" className="admin-document-link" onClick={() => openAttachment(attachment)}>
                      {t("admin.leadSheet.openPreview")}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="admin-document-section">
          <div className="admin-document-section-head">
            <div>
              <p className="admin-detail-kicker">{t("admin.leadSheet.applicationRecord")}</p>
              <h4>{t("admin.leadSheet.structuredDetails")}</h4>
            </div>
          </div>
          <div className="admin-detail-grid">
            <p>
              <strong>{t("Name")}</strong>
              <span>{lead.name}</span>
            </p>
            <p>
              <strong>{t("Phone")}</strong>
              <span>{lead.phone}</span>
            </p>
            <p>
              <strong>{t("Location")}</strong>
              <span>{lead.location}</span>
            </p>
            <p>
              <strong>{t("admin.leads.type")}</strong>
              <span>{lead.type}</span>
            </p>
            <p>
              <strong>{t("admin.leads.filter.status")}</strong>
              <span>{lead.status}</span>
            </p>
            <p>
              <strong>{t("admin.leads.option.visitConfirmed")}</strong>
              <span>{lead.visitConfirmed ? t("Yes") : t("No")}</span>
            </p>
            <p>
              <strong>{t("admin.leadSheet.installationCompleted")}</strong>
              <span>{lead.installationCompleted ? t("Yes") : t("No")}</span>
            </p>
            <p>
              <strong>{t("admin.leadSheet.submittedAt")}</strong>
              <span>{formatAdminDateTime(lead.createdAt)}</span>
            </p>
          </div>
        </section>

        {attachments.length > 0 ? (
          <section className="admin-document-section">
            <div className="admin-document-section-head">
              <div>
                <p className="admin-detail-kicker">{t("admin.leadSheet.uploadedDocuments")}</p>
                <h4>{t("admin.leadSheet.documentArchive")}</h4>
              </div>
              <span>{attachments.length} {t("admin.leadSheet.files")}</span>
            </div>

            <div className="admin-document-archive">
              {attachments.map((attachment) => {
                const ratioClass = getAttachmentRatio(attachment.label);
                const fileTypeLabel = isPdfAttachment(attachment.fileName, attachment.url)
                  ? t("admin.leadSheet.fileTypePdf")
                  : isImageAttachment(attachment.fileName, attachment.url)
                    ? t("admin.leadSheet.fileTypeImage")
                    : t("admin.leadSheet.fileTypeGeneric");

                return (
                  <article className="admin-document-card" key={`${attachment.label}-${attachment.publicId}`}>
                    <button
                      type="button"
                      className={`admin-document-media admin-document-media-button ${ratioClass}`}
                      onClick={() => openAttachment(attachment)}
                    >
                      {isImageAttachment(attachment.fileName, attachment.url) ? (
                        <img src={attachment.url} alt={attachment.label} className="admin-document-media-image" crossOrigin="anonymous" />
                      ) : (
                        <div className="admin-document-media-fallback">
                          <strong>{fileTypeLabel}</strong>
                          <span>{attachment.label}</span>
                        </div>
                      )}
                    </button>
                    <div className="admin-document-card-body">
                      <strong>{attachment.label}</strong>
                      <span>{attachment.fileName}</span>
                      <button type="button" className="admin-document-link" onClick={() => openAttachment(attachment)}>
                        {t("admin.leadSheet.openPreview")}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>

      {previewAttachment ? (
        <div className="admin-document-modal-backdrop" role="dialog" aria-modal="true" aria-label={previewAttachment.label} onClick={() => setActiveAttachment(null)}>
          <div className="admin-document-modal" onClick={(event) => event.stopPropagation()}>
            <div className="admin-document-modal-head">
              <div>
                <p className="admin-detail-kicker">{t("admin.leadSheet.documentPreview")}</p>
                <h4>{previewAttachment.label}</h4>
              </div>
              <button type="button" className="button button-outline" onClick={() => setActiveAttachment(null)}>
                {t("Close")}
              </button>
            </div>

            <div className="admin-document-modal-body">
              {isImageAttachment(previewAttachment.fileName, previewAttachment.url) ? (
                <img src={previewAttachment.url} alt={previewAttachment.label} className="admin-document-modal-image" crossOrigin="anonymous" />
              ) : isPdfAttachment(previewAttachment.fileName, previewAttachment.url) ? (
                <iframe src={previewAttachment.url} title={previewAttachment.label} className="admin-document-modal-frame" />
              ) : (
                <div className="admin-document-preview-fallback">
                  <strong>{previewAttachment.label}</strong>
                  <span>{previewAttachment.fileName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
