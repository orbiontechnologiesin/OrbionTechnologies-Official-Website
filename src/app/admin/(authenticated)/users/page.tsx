import React from "react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { UserManagementTable } from "@/components/admin/UserManagementTable";
import { getStaffUsers } from "@/services/admin-users.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Administrator Management | Orbion Technologies Admin",
};

export default async function AdminUsersPage() {
  const session = await requireAdminSession("users:read", "/admin/users");
  const users = await getStaffUsers();

  return (
    <>
      <AdminHeader
        title="Administrator Management"
        description="Oversee internal staff accounts, role-based capabilities, and invitations."
        role={session.profile.role}
        fullName={session.profile.fullName}
      />

      <main className="p-8 space-y-6">
        <UserManagementTable
          initialUsers={users}
          currentUserId={session.user.id}
        />
      </main>
    </>
  );
}

