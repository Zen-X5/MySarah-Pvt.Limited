import type { Metadata } from "next";
import TermsContent from "@/app/terms/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service | Mysarah Modern Tech",
  description:
    "Terms of Service for Mysarah Modern Tech Private Limited covering service scope, responsibilities, and usage conditions.",
};

export default function TermsPage() {
  return <TermsContent />;
}
