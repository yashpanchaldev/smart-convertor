const BASE_URL = "https://smart-convertor.vercel.app";
const LAST_MODIFIED = "2025-04-11";

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
];

const pages = [
  { url: BASE_URL, priority: "1.0", changefreq: "weekly" },
  { url: `${BASE_URL}/privacy`, priority: "0.3", changefreq: "yearly" },
  { url: `${BASE_URL}/terms`, priority: "0.3", changefreq: "yearly" },
  ...toolPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    priority: "0.8",
    changefreq: "monthly",
  })),
];

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ({ url, priority, changefreq }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}
