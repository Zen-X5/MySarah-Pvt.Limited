import { Schema, model, models } from "mongoose";

const ContactLeadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["contact"],
      default: "contact",
    },
    message: { type: String, required: true, trim: true },
    attachments: {
      type: [
        {
          label: { type: String, required: true, trim: true },
          url: { type: String, required: true, trim: true },
          fileName: { type: String, required: true, trim: true },
          publicId: { type: String, required: true, trim: true },
        },
      ],
      default: [],
    },
    status: {
      type: String,
      enum: ["new", "in-progress", "closed"],
      default: "new",
    },
    visitConfirmed: { type: Boolean, default: false },
    installationCompleted: { type: Boolean, default: false },
    installedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    collection: "contact_forms",
  },
);

ContactLeadSchema.index({ createdAt: -1 });
ContactLeadSchema.index({ status: 1, createdAt: -1 });
ContactLeadSchema.index({ location: 1 });

export const ContactLead = models.ContactLead || model("ContactLead", ContactLeadSchema);
