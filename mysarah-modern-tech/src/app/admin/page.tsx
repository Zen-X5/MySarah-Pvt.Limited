import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminLeadsTable from "@/components/admin/AdminLeadsTable";
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
      <div className="admin-head">
        <h1>Lead Dashboard</h1>
        <form action="/api/admin/logout" method="POST">
          <button className="button button-outline" type="submit">
            Logout
          </button>
        </form>
      </div>
      <AdminLeadsTable />
    </main>
  );
}
