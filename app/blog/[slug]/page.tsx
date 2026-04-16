import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getBlogPost } from "@/lib/blog";

const BASE_URL = "https://smart-convertor.vercel.app";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Parse content into sections split by ## headings
  const sections = post.content.split(/\n(?=## )/);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "SmartConverter" },
    publisher: { "@type": "Organization", name: "SmartConverter", url: BASE_URL },
    url: `${BASE_URL}/blog/${post.slug}`,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: "var(--muted)" }}>
        <Link href="/" className="hover:opacity-70">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:opacity-70">Blog</Link>
        <span>/</span>
        <span style={{ color: "var(--foreground)" }}>{post.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{ background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-soft-border)" }}>
            {post.category}
          </span>
          <span className="text-xs" style={{ color: "var(--muted)" }}>{post.readTime}</span>
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-4" style={{ color: "var(--foreground)" }}>
          {post.title}
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          {post.description}
        </p>
      </header>

      {/* Content */}
      <article className="space-y-6 mb-12">
        {sections.map((section, i) => {
          const lines = section.trim().split("\n");
          const firstLine = lines[0];
          const isHeading = firstLine.startsWith("## ");
          const heading = isHeading ? firstLine.replace("## ", "") : null;
          const body = isHeading ? lines.slice(1).join("\n").trim() : section.trim();

          return (
            <div key={i}>
              {heading && (
                <h2 className="text-xl font-bold mb-3" style={{ color: "var(--foreground)" }}>
                  {heading}
                </h2>
              )}
              {body.split("\n\n").map((para, j) => {
                if (para.startsWith("- ") || para.includes("\n- ")) {
                  const items = para.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={j} className="space-y-1.5 mb-3 ml-4">
                      {items.map((item, k) => (
                        <li key={k} className="flex items-start gap-2 text-sm leading-relaxed"
                          style={{ color: "var(--muted)" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2.5" className="mt-1 flex-shrink-0" style={{ color: "var(--accent)" }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {item.replace("- ", "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (para.startsWith("**") && para.includes("**")) {
                  const parts = para.split(/\*\*(.*?)\*\*/g);
                  return (
                    <p key={j} className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                      {parts.map((part, k) =>
                        k % 2 === 1
                          ? <strong key={k} style={{ color: "var(--foreground)" }}>{part}</strong>
                          : part
                      )}
                    </p>
                  );
                }
                return (
                  <p key={j} className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                    {para}
                  </p>
                );
              })}
            </div>
          );
        })}
      </article>

      {/* Related tools CTA */}
      {post.relatedTools.length > 0 && (
        <section className="rounded-2xl p-6 mb-10"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h2 className="text-base font-bold mb-4" style={{ color: "var(--foreground)" }}>
            Try These Free Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            {post.relatedTools.map((tool) => (
              <Link key={tool.href} href={tool.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--accent), #a78bfa)", color: "#fff" }}>
                {tool.title} →
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to blog */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
        style={{ color: "var(--accent)" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </Link>
    </div>
  );
}
