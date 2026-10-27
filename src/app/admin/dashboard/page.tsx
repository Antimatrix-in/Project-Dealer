import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { getAllInquiries } from "@/lib/inquiries";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard - AntiMatrix Project Center",
  description: "Secure administrator dashboard for managing project consultation requests.",
};

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const session = verifySessionToken(token);

  // Server-side authentication check: unauthenticated users cannot access dashboard
  if (!session) {
    redirect("/admin/login");
  }

  const initialInquiries = await getAllInquiries();

  return (
    <AdminDashboardClient
      adminEmail={session.email}
      initialInquiries={initialInquiries}
    />
  );
}
