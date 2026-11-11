import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { getBlogCategories } from "@/services/cms-blog.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "New Blog Article | Orbion Admin",
};

export default async function NewBlogPostPage() {
  const session = await requireAdminSession("cms:create", "/admin/blog/new");
  const categories = await getBlogCategories();

  return (
    <>
      <AdminHeader
        title="Compose New Article"
        description="Draft thought leadership, technology insights, or corporate announcements."
        role={session.profile.role}
        fullName={session.profile.fullName}
        actions={
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-limestone-light border border-graphite-border hover:bg-limestone-card text-graphite rounded-md text-xs font-mono font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-sage" />
            <span>Back to Articles</span>
          </Link>
        }
      />

      <main className="p-8">
        <BlogPostForm categories={categories} userRole={session.profile.role} />
      </main>
    </>
  );
}

