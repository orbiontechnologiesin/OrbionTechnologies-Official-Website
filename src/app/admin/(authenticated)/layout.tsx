import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AuthenticatedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-limestone-light flex">
      {/* Fixed Sidebar */}
      <AdminSidebar
        role={session.profile.role}
        fullName={session.profile.fullName}
        email={session.profile.email}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

