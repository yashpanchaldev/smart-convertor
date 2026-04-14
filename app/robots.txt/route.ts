export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: https://smart-convertor.vercel.app/sitemap.xml`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
