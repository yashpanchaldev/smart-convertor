import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";

const BASE_URL = "https://smart-convertor.vercel.app";
const LAST_MODIFIED = "2025-04-15";

const toolPaths = [
  "/tools/text-to-pdf",
  "/tools/pdf-to-text",
  "/tools/pdf-to-word",
  "/tools/doc-to-pdf",
  "/tools/html-to-pdf",
  "/tools/pdf-merge",
  "/tools/pdf-split",
  "/tools/pdf-compress",
  "/tools/pdf-to-image",
  "/tools/pdf-rotate",
  "/tools/image-to-pdf",
  "/tools/image-to-text",
  "/tools/image-compress",
  "/tools/image-resize",
  "/tools/image-convert",
  "/tools/qr-code",
  "/tools/jpg-to-png",
  "/tools/png-to-jpg",
  "/tools/png-to-webp",
  "/tools/svg-to-png",
  "/tools/image-to-svg",
  "/tools/json-formatter",
  "/tools/base64",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL,                    lastModified: LAST_MODIFIED, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/blog`,          lastModified: LAST_MODIFIED, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/privacy`,       lastModified: LAST_MODIFIED, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/terms`,         lastModified: LAST_MODIFIED, changeFrequency: "yearly",  priority: 0.3 },
    ...toolPaths.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
