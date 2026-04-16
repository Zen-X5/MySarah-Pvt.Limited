import nodemailer from "nodemailer";
import type { LeadInput } from "@/types/lead";

const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const to = process.env.ALERT_EMAIL_TO;

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  if (!host || !port || !user || !pass) {
    return null;
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: {
      user,
      pass,
    },
    connectionTimeout: 7000,
    greetingTimeout: 7000,
    socketTimeout: 10000,
  });

  return cachedTransporter;
}

export async function sendLeadEmail(lead: LeadInput) {
  if (!host || !port || !user || !pass || !to) {
    return;
  }

  const transporter = getTransporter();
  if (!transporter) {
    return;
  }

  const attachmentSummary = lead.attachments && lead.attachments.length > 0
    ? `\n\nUploaded Documents:\n${lead.attachments
        .map((attachment) => `${attachment.label}: ${attachment.url}`)
        .join("\n")}`
    : "";

  await transporter.sendMail({
    from: `Mysarah Website <${user}>`,
    to,
    subject: `New ${lead.type.toUpperCase()} lead from ${lead.name}`,
    text: `Name: ${lead.name}\nPhone: ${lead.phone}\nLocation: ${lead.location}\nType: ${lead.type}\nMessage: ${lead.message}${attachmentSummary}`,
  });
}
