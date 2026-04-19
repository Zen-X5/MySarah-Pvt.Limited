export type FeedbackCategory = "feedback" | "compliance" | "grievance" | "suggestion";

export interface FeedbackComplianceInput {
  name: string;
  email: string;
  phone?: string;
  category: FeedbackCategory;
  message: string;
}

export interface FeedbackComplianceRecord extends FeedbackComplianceInput {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
