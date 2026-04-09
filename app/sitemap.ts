import type { MetadataRoute } from "next";

const BASE_URL = "https://smart-convertor.vercel.app";

const tools = [
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = tools.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...toolRoutes];
}
