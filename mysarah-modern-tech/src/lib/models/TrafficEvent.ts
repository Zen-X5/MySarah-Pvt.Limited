import { Schema, model, models } from "mongoose";

const TrafficEventSchema = new Schema(
  {
    sessionId: { type: String, required: true, trim: true, index: true },
    eventType: { type: String, enum: ["page_view", "heartbeat"], required: true, index: true },
    path: { type: String, required: false, trim: true, maxlength: 240 },
    userAgent: { type: String, required: false, trim: true, maxlength: 300 },
  },
  {
    timestamps: true,
  },
);

TrafficEventSchema.index({ createdAt: -1 });
TrafficEventSchema.index({ eventType: 1, createdAt: -1 });
TrafficEventSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 45 });

export const TrafficEvent = models.TrafficEvent || model("TrafficEvent", TrafficEventSchema);
