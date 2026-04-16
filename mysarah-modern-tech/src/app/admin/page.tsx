import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminDashboardShell from "@/app/admin/AdminDashboardShell";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard | Mysarah Modern Tech",
  description: "Mini CRM dashboard for lead management.",
};

export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="section container">
      <AdminDashboardShell />
    </main>
  );
}
