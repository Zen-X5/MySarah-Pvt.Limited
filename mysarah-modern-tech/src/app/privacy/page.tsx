import type { Metadata } from "next";
import PrivacyContent from "@/app/privacy/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Notice | Mysarah Modern Tech",
  description:
    "Privacy Notice for Mysarah Modern Tech Private Limited covering personal data collection, usage, protection, and user rights.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
