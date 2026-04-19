import { Schema, model, models } from "mongoose";

const FeedbackComplianceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: false, trim: true, default: "" },
    category: {
      type: String,
      enum: ["feedback", "compliance", "grievance", "suggestion"],
      required: true,
      default: "feedback",
    },
    message: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    collection: "feedback_compliance_forms",
  },
);

FeedbackComplianceSchema.index({ createdAt: -1 });
FeedbackComplianceSchema.index({ category: 1, createdAt: -1 });
FeedbackComplianceSchema.index({ email: 1 });

export const FeedbackCompliance = models.FeedbackCompliance || model("FeedbackCompliance", FeedbackComplianceSchema);
