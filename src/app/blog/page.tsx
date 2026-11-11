import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Calendar, User, FileText } from "lucide-react";
import { getPublicBlogPosts, getBlogCategories } from "@/services/cms-blog.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & Engineering Perspectives | Orbion Technologies",
  description:
    "Architectural principles, product engineering insights, and technical thought leadership from the Orbion Technologies engineering team.",
  openGraph: {
    title: "Blog & Engineering Perspectives | Orbion Technologies",
    description:
      "Architectural principles, product engineering insights, and technical thought leadership from the Orbion Technologies engineering team.",
    url: "https://orbiontechnologies.in/blog",
    siteName: "Orbion Technologies",
    type: "website",
  },
};

export default async function PublicBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const categorySlug = params.category;
  const page = parseInt(params.page || "1", 10);

  const [{ posts }, categories] = await Promise.all([
    getPublicBlogPosts({ page, limit: 12, categorySlug }),
    getBlogCategories(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-limestone-light text-graphite selection:bg-petrol selection:text-pure-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO HEADER */}
        <section className="pt-36 pb-16 bg-gradient-to-b from-limestone/50 to-limestone-light border-b border-graphite-border">
          <Container>
            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-copper font-semibold block mb-2">
                Perspectives & Insights
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-graphite tracking-tight">
                Architectural Clarity.
                <br />
                <span className="text-petrol font-serif italic font-normal">
                  Engineering Principles.
                </span>
              </h1>
              <p className="mt-4 text-base text-graphite-muted leading-relaxed max-w-2xl">
                Essays, architectural breakdowns, and product updates from the engineering and design teams at Orbion Technologies.
              </p>

              {/* Category Filter Pills */}
              {categories.length > 0 && (
                <div className="mt-8 flex items-center gap-2 flex-wrap">
                  <Link
                    href="/blog"
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                      !categorySlug
                        ? "bg-petrol text-pure-white font-semibold"
                        : "bg-limestone-card text-graphite hover:bg-limestone border border-graphite-border"
                    }`}
                  >
                    All Topics
                  </Link>
                  {categories.map((c) => {
                    const active = categorySlug === c.slug;
                    return (
                      <Link
                        key={c.id}
                        href={`/blog?category=${c.slug}`}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                          active
                            ? "bg-petrol text-pure-white font-semibold"
                            : "bg-limestone-card text-graphite hover:bg-limestone border border-graphite-border"
                        }`}
                      >
                        {c.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* ARTICLES GRID */}
        <section className="py-20">
          <Container>
            {posts.length === 0 ? (
              <div className="p-20 text-center bg-limestone-card rounded-2xl border border-graphite-border max-w-2xl mx-auto shadow-xs">
                <div className="w-12 h-12 rounded-full bg-limestone-light flex items-center justify-center mx-auto mb-4 text-copper">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-graphite">Articles in Development</h2>
                <p className="text-sm text-graphite-muted mt-2 leading-relaxed">
                  Our engineering team is actively preparing technical perspectives and system design case studies. Check back shortly for our initial publications.
                </p>
                <div className="mt-6">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-mono text-copper hover:text-copper-hover transition-colors font-medium"
                  >
                    <span>Return to Homepage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-limestone-card rounded-2xl border border-graphite-border hover:border-copper/40 transition-all duration-300 overflow-hidden flex flex-col shadow-xs hover:shadow-md"
                  >
                    {/* Featured Image */}
                    {post.featuredImage ? (
                      <div className="h-48 relative overflow-hidden bg-limestone-light">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-40 bg-gradient-to-br from-petrol/10 via-limestone-light to-copper/10 flex items-center justify-center border-b border-graphite-border/60">
                        <span className="font-mono text-xs uppercase tracking-widest text-graphite-subtle">
                          {post.categoryName || "Orbion Engineering"}
                        </span>
                      </div>
                    )}

                    {/* Content Box */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        {post.categoryName && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-limestone border border-graphite-border text-[11px] font-mono text-copper font-medium mb-3">
                            {post.categoryName}
                          </span>
                        )}

                        <h2 className="text-xl font-bold text-graphite group-hover:text-copper transition-colors leading-snug">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>

                        {post.excerpt && (
                          <p className="mt-2.5 text-xs text-graphite-muted line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}
                      </div>

                      {/* Footer Meta */}
                      <div className="pt-4 border-t border-graphite-border/70 flex items-center justify-between text-[11px] font-mono text-graphite-subtle">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3 h-3 text-sage" />
                          <span>{post.authorName || "Orbion Staff"}</span>
                        </div>

                        {post.publishedAt && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-sage" />
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
