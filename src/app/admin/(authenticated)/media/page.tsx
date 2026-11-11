import React from "react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { getMediaAssets } from "@/services/cms-media.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Media Library | Orbion Admin",
};

export default async function AdminMediaPage() {
  const session = await requireAdminSession("media:read", "/admin/media");
  const { assets, total } = await getMediaAssets({ page: 1, limit: 36 });

  return (
    <>
      <AdminHeader
        title="Supabase Media Storage"
        description="Upload, organize, preview, and copy URLs for blog graphics, mockups, and corporate collateral."
        role={session.profile.role}
        fullName={session.profile.fullName}
      />

      <main className="p-8">
        <MediaLibrary initialAssets={assets} total={total} userRole={session.profile.role} />
      </main>
    </>
  );
}

