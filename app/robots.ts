import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://smart-convertor.vercel.app/sitemap.xml",
    host: "https://smart-convertor.vercel.app",
  };
}
