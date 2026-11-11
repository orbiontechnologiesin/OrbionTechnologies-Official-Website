import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye } from "lucide-react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { CaseStudyForm } from "@/components/admin/CaseStudyForm";
import { getCaseStudyById } from "@/services/cms-case-studies.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Case Study | Orbion Admin",
};

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAdminSession("cms:update", "/admin/case-studies");
  const { id } = await params;
  const study = await getCaseStudyById(id);

  if (!study) {
    notFound();
  }

  return (
    <>
      <AdminHeader
        title={`Edit: ${study.title}`}
        description={`Client: ${study.clientName || "Confidential"} • Slug: /case-studies/${study.slug}`}
        role={session.profile.role}
        fullName={session.profile.fullName}
        actions={
          <div className="flex items-center gap-2.5">
            {study.status === "published" && (
              <Link
                href={`/case-studies/${study.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-limestone-light border border-graphite-border hover:bg-limestone-card text-graphite rounded-md text-xs font-mono font-medium transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-sage" />
                <span>View Live</span>
              </Link>
            )}
            <Link
              href="/admin/case-studies"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-limestone-light border border-graphite-border hover:bg-limestone-card text-graphite rounded-md text-xs font-mono font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-sage" />
              <span>Back to Case Studies</span>
            </Link>
          </div>
        }
      />

      <main className="p-8">
        <CaseStudyForm initialStudy={study} userRole={session.profile.role} />
      </main>
    </>
  );
}

