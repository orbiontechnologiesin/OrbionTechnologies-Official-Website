import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { getPublicBlogPostBySlug } from "@/services/cms-blog.service";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Orbion Technologies",
    };
  }

  const title = post.metaTitle || `${post.title} | Orbion Technologies`;
  const description = post.metaDescription || post.excerpt || "Engineering perspective from Orbion Technologies.";

  return {
    title,
    description,
    alternates: {
      canonical: post.canonicalUrl || `https://orbiontechnologies.in/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://orbiontechnologies.in/blog/${post.slug}`,
      siteName: "Orbion Technologies",
      type: "article",
      publishedTime: post.publishedAt || undefined,
      images: post.ogImage || post.featuredImage ? [post.ogImage || post.featuredImage!] : undefined,
    },
  };
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublicBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Safe server-side markdown parsing for public rendering
  function renderFormattedContent(md: string) {
    const lines = md.split("\n");
    const htmlLines: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) {
        htmlLines.push(`<h3 class="text-xl font-bold text-graphite mt-6 mb-2 tracking-tight">${escapeHtml(trimmed.slice(4))}</h3>`);
      } else if (trimmed.startsWith("## ")) {
        htmlLines.push(`<h2 class="text-2xl font-bold text-graphite mt-8 mb-3 tracking-tight">${escapeHtml(trimmed.slice(3))}</h2>`);
      } else if (trimmed.startsWith("# ")) {
        htmlLines.push(`<h1 class="text-3xl font-extrabold text-graphite mt-10 mb-4 tracking-tight">${escapeHtml(trimmed.slice(2))}</h1>`);
      } else if (trimmed.startsWith("> ")) {
        htmlLines.push(`<blockquote class="border-l-4 border-copper pl-4 py-2 italic my-4 text-graphite-muted bg-limestone-card/50 rounded-r">${escapeHtml(trimmed.slice(2))}</blockquote>`);
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        htmlLines.push(`<li class="ml-6 list-disc text-graphite my-1">${formatInline(trimmed.slice(2))}</li>`);
      } else if (trimmed === "") {
        htmlLines.push('<div class="h-4"></div>');
      } else {
        htmlLines.push(`<p class="text-graphite leading-relaxed my-3 text-base">${formatInline(trimmed)}</p>`);
      }
    }

    return htmlLines.join("");
  }

  function escapeHtml(text: string) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function formatInline(text: string) {
    let formatted = escapeHtml(text);
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
    formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-graphite/10 px-1 py-0.5 rounded font-mono text-sm">$1</code>');
    formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-copper underline hover:text-copper-hover">$1</a>');
    return formatted;
  }

  return (
    <div className="min-h-screen flex flex-col bg-limestone-light text-graphite selection:bg-petrol selection:text-pure-white">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <Container>
          {/* Back Navigation */}
          <div className="max-w-3xl mx-auto mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono text-graphite-muted hover:text-copper transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Perspectives</span>
            </Link>
          </div>

          {/* Article Header */}
          <article className="max-w-3xl mx-auto">
            <header className="space-y-4 pb-8 border-b border-graphite-border">
              {post.categoryName && (
                <span className="inline-block px-3 py-1 rounded-full bg-limestone border border-graphite-border text-xs font-mono text-copper font-medium">
                  {post.categoryName}
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-graphite tracking-tight leading-tight">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-lg text-graphite-muted leading-relaxed font-normal">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center gap-6 pt-4 text-xs font-mono text-graphite-subtle">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-sage" />
                  <span className="text-graphite font-medium">{post.authorName || "Orbion Engineering"}</span>
                </div>

                {post.publishedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-sage" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="my-8 rounded-2xl overflow-hidden border border-graphite-border bg-limestone-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-auto max-h-[480px] object-cover"
                />
              </div>
            )}

            {/* Article Body */}
            <div
              className="prose prose-lg max-w-none text-graphite pt-6"
              dangerouslySetInnerHTML={{ __html: renderFormattedContent(post.content) }}
            />

            {/* Post Footer CTA */}
            <footer className="mt-16 pt-8 border-t border-graphite-border bg-limestone-card p-8 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-graphite">Orbion Technologies Perspectives</h3>
                <p className="text-xs text-graphite-muted mt-0.5">
                  Designed, engineered, and maintained by our distributed systems and product teams.
                </p>
              </div>
              <Link
                href="/contact"
                className="px-4 py-2 bg-copper hover:bg-copper-hover text-pure-white rounded-lg text-xs font-mono font-medium transition-colors shadow-xs"
              >
                Engage Our Team
              </Link>
            </footer>
          </article>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
