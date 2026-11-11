import React from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  Eye,
  Edit,
  Tag,
} from "lucide-react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ContentStatusBadge } from "@/components/admin/ContentStatusBadge";
import { getBlogPostsAdmin, getBlogCategories } from "@/services/cms-blog.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog Management | Orbion Admin",
};

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    status?: string;
    categoryId?: string;
    search?: string;
  }>;
}) {
  const session = await requireAdminSession("cms:read", "/admin/blog");
  const params = await searchParams;

  const page = parseInt(params.page || "1", 10);
  const status = params.status || "all";
  const categoryId = params.categoryId || "all";
  const search = params.search || "";

  const [{ posts, total, totalPages }, categories] = await Promise.all([
    getBlogPostsAdmin({ page, limit: 15, status, categoryId, search }),
    getBlogCategories(),
  ]);

  return (
    <>
      <AdminHeader
        title="Blog Articles"
        description="Author, review, publish, and manage corporate thought leadership articles."
        role={session.profile.role}
        fullName={session.profile.fullName}
        actions={
          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/blog/categories"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-limestone-light border border-graphite-border hover:bg-limestone-card text-graphite rounded-md text-xs font-mono font-medium transition-colors"
            >
              <Tag className="w-3.5 h-3.5 text-sage" />
              <span>Categories</span>
            </Link>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-copper hover:bg-copper-hover text-pure-white rounded-md text-xs font-mono font-medium transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>New Article</span>
            </Link>
          </div>
        }
      />

      <main className="p-8 space-y-6">
        {/* Filter Controls Bar */}
        <section className="bg-limestone-card p-4 rounded-xl border border-graphite-border shadow-xs flex items-center justify-between gap-4 flex-wrap">
          <form method="GET" className="flex items-center gap-3 flex-1 min-w-[280px]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-graphite-subtle pointer-events-none" />
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search articles by title..."
                className="w-full pl-9 pr-4 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
              />
            </div>

            <select
              name="status"
              defaultValue={status}
              className="bg-limestone-light/50 border border-graphite-border rounded-lg px-3 py-2 text-xs font-mono text-graphite focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Drafts</option>
              <option value="in_review">In Review</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>

            <select
              name="categoryId"
              defaultValue={categoryId}
              className="bg-limestone-light/50 border border-graphite-border rounded-lg px-3 py-2 text-xs font-mono text-graphite focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="px-3.5 py-2 bg-petrol text-pure-white rounded-lg text-xs font-mono hover:bg-petrol-light transition-colors"
            >
              Filter
            </button>
          </form>

          <span className="text-xs font-mono text-graphite-muted">
            {total} {total === 1 ? "article" : "articles"} registered
          </span>
        </section>

        {/* Blog Posts Table */}
        <section className="bg-limestone-card rounded-xl border border-graphite-border shadow-xs overflow-hidden">
          {posts.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-12 h-12 rounded-full bg-limestone-light text-graphite-subtle flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-sage" />
              </div>
              <h3 className="text-sm font-semibold text-graphite">No articles found</h3>
              <p className="text-xs text-graphite-subtle mt-1 max-w-sm mx-auto">
                No articles match your filter criteria. Create your first post or adjust your filters.
              </p>
              <Link
                href="/admin/blog/new"
                className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-copper text-pure-white rounded-md text-xs font-mono font-medium hover:bg-copper-hover transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Draft</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-limestone-light/60 font-mono uppercase text-[10px] tracking-wider text-graphite-muted border-b border-graphite-border">
                  <tr>
                    <th className="px-6 py-3">Article Title & Slug</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Author</th>
                    <th className="px-6 py-3">Published Date</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-graphite-border/60">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-limestone-light/40 transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="font-medium text-graphite hover:text-copper transition-colors block text-sm"
                        >
                          {post.title}
                        </Link>
                        <span className="font-mono text-[11px] text-graphite-subtle block mt-0.5">
                          /blog/{post.slug}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-0.5 rounded bg-limestone-light border border-graphite-border text-[11px] font-mono text-graphite-muted">
                          {post.categoryName || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <ContentStatusBadge status={post.status} />
                      </td>
                      <td className="px-6 py-4 text-graphite font-medium">
                        {post.authorName || "Staff"}
                      </td>
                      <td className="px-6 py-4 font-mono text-[11px] text-graphite-muted">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {post.status === "published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 p-1.5 text-graphite-subtle hover:text-graphite rounded transition-colors"
                            title="View Public Post"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-copper hover:text-copper-hover bg-copper-subtle/50 rounded border border-copper/20 transition-colors"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Edit</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-graphite-border/70 flex items-center justify-between text-xs font-mono text-graphite-muted">
              <span>
                Page {page} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/admin/blog?page=${page - 1}&status=${status}&categoryId=${categoryId}&search=${search}`}
                    className="px-3 py-1 rounded border border-graphite-border hover:bg-limestone-light"
                  >
                    Previous
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={`/admin/blog?page=${page + 1}&status=${status}&categoryId=${categoryId}&search=${search}`}
                    className="px-3 py-1 rounded border border-graphite-border hover:bg-limestone-light"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
