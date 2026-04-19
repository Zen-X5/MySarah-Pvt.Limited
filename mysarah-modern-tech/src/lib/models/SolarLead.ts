import { Schema, model, models } from "mongoose";

const SolarLeadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["quote", "order"],
      default: "quote",
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
    collection: "solar_installation_forms",
  },
);

SolarLeadSchema.index({ createdAt: -1 });
SolarLeadSchema.index({ installedAt: -1 });
SolarLeadSchema.index({ installationCompleted: 1, installedAt: -1 });
SolarLeadSchema.index({ visitConfirmed: 1 });
SolarLeadSchema.index({ status: 1, createdAt: -1 });
SolarLeadSchema.index({ location: 1 });

export const SolarLead = models.SolarLead || model("SolarLead", SolarLeadSchema);
