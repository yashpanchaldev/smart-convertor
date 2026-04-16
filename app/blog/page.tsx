import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog – File Conversion Tips & Guides",
  description:
    "Free guides on PDF compression, image conversion, file formats, and developer tools. Learn how to convert files faster and smarter.",
  alternates: { canonical: "https://smart-convertor.vercel.app/blog" },
  openGraph: {
    title: "Blog – SmartConverter Tips & Guides",
    description: "Free guides on PDF compression, image conversion, and developer tools.",
    url: "https://smart-convertor.vercel.app/blog",
  },
};

const categoryColors: Record<string, string> = {
  PDF:       "rgba(99,102,241,0.12)",
  Image:     "rgba(16,185,129,0.12)",
  Developer: "rgba(245,158,11,0.12)",
};
const categoryText: Record<string, string> = {
  PDF:       "#6366f1",
  Image:     "#10b981",
  Developer: "#f59e0b",
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
          Tips, Guides & How-Tos
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
          Learn how to compress PDFs, convert images, format JSON, and more — all for free in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl p-6 transition-all hover:-translate-y-1"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs px-2.5 py-1 rounded-full font-semibold"
                style={{
                  background: categoryColors[post.category] ?? "var(--accent-soft)",
                  color: categoryText[post.category] ?? "var(--accent)",
                }}
              >
                {post.category}
              </span>
              <span className="text-xs" style={{ color: "var(--muted)" }}>{post.readTime}</span>
            </div>

            <h2 className="text-base font-bold mb-2 leading-snug group-hover:opacity-80 transition-opacity"
              style={{ color: "var(--foreground)" }}>
              {post.title}
            </h2>

            <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: "var(--muted)" }}>
              {post.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <span className="text-xs font-semibold flex items-center gap-1 transition-all group-hover:gap-2"
                style={{ color: "var(--accent)" }}>
                Read more
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
