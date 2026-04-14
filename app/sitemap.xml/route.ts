const BASE_URL = "https://smart-convertor.vercel.app";

const urls = [
  { loc: BASE_URL,                                    changefreq: "weekly",  priority: "1.0" },
  { loc: `${BASE_URL}/privacy`,                       changefreq: "yearly",  priority: "0.3" },
  { loc: `${BASE_URL}/terms`,                         changefreq: "yearly",  priority: "0.3" },
  { loc: `${BASE_URL}/tools/text-to-pdf`,             changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/pdf-to-text`,             changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/pdf-to-word`,             changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/doc-to-pdf`,              changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/html-to-pdf`,             changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/pdf-merge`,               changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/pdf-split`,               changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/pdf-compress`,            changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/pdf-to-image`,            changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/pdf-rotate`,              changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/image-to-pdf`,            changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/image-to-text`,           changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/image-compress`,          changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/image-resize`,            changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/image-convert`,           changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/qr-code`,                 changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/jpg-to-png`,              changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/png-to-jpg`,              changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/png-to-webp`,             changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/svg-to-png`,              changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/tools/image-to-svg`,            changefreq: "monthly", priority: "0.8" },
];

const LASTMOD = "2025-04-14";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}
