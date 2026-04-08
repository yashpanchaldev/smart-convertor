import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML to PDF – Convert HTML to PDF Free Online",
  description:
    "Convert HTML code or web pages to pixel-perfect PDF online for free. No upload, no signup — instant HTML to PDF conversion in your browser.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/html-to-pdf" },
  openGraph: {
    title: "HTML to PDF – Convert HTML to PDF Free Online",
    description: "Convert HTML code or web pages to pixel-perfect PDF online for free. Instant, private.",
    url: "https://smart-convertor.vercel.app/tools/html-to-pdf",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
