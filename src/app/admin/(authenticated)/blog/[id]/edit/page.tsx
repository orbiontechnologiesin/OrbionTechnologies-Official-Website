import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye } from "lucide-react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { getBlogPostById, getBlogCategories } from "@/services/cms-blog.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Blog Article | Orbion Admin",
};

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAdminSession("cms:update", "/admin/blog");
  const { id } = await params;

  const [post, categories] = await Promise.all([
    getBlogPostById(id),
    getBlogCategories(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <>
      <AdminHeader
        title={`Edit: ${post.title}`}
        description={`Author: ${post.authorName || "Staff"} • Slug: /blog/${post.slug}`}
        role={session.profile.role}
        fullName={session.profile.fullName}
        actions={
          <div className="flex items-center gap-2.5">
            {post.status === "published" && (
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-limestone-light border border-graphite-border hover:bg-limestone-card text-graphite rounded-md text-xs font-mono font-medium transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-sage" />
                <span>View Live</span>
              </Link>
            )}
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-limestone-light border border-graphite-border hover:bg-limestone-card text-graphite rounded-md text-xs font-mono font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-sage" />
              <span>Back to Articles</span>
            </Link>
          </div>
        }
      />

      <main className="p-8">
        <BlogPostForm initialPost={post} categories={categories} userRole={session.profile.role} />
      </main>
    </>
  );
}

