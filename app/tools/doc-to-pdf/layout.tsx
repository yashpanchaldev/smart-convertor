import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DOC to PDF – Convert Word to PDF Free Online",
  description:
    "Convert Word .docx documents to PDF online for free. Formatting preserved. No upload, no signup — instant DOC to PDF in your browser.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/doc-to-pdf" },
  openGraph: {
    title: "DOC to PDF – Convert Word to PDF Free Online",
    description: "Convert Word .docx documents to PDF online for free. Formatting preserved, instant.",
    url: "https://smart-convertor.vercel.app/tools/doc-to-pdf",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
