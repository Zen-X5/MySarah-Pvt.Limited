import { Schema, model, models } from "mongoose";

const LeadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["quote", "contact", "order"],
      required: true,
    },
    message: { type: String, required: true, trim: true },
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
  },
);

export const Lead = models.Lead || model("Lead", LeadSchema);
