import { connectDb } from "@/lib/db";
import { FeedbackCompliance } from "@/lib/models/FeedbackCompliance";
import type { FeedbackComplianceInput } from "@/types/feedback";

export async function createFeedbackCompliance(input: FeedbackComplianceInput) {
  await connectDb();
  return FeedbackCompliance.create(input);
}

export async function getFeedbackComplianceEntries() {
  await connectDb();
  return FeedbackCompliance.find(
    {},
    {
      _id: 1,
      name: 1,
      email: 1,
      phone: 1,
      category: 1,
      message: 1,
      createdAt: 1,
      updatedAt: 1,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
}

export async function deleteFeedbackComplianceEntry(id: string) {
  await connectDb();
  return FeedbackCompliance.findByIdAndDelete(id).lean();
}
