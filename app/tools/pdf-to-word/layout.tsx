import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to Word – Convert PDF to DOCX Free Online",
  description:
    "Convert PDF files to editable Word .docx documents online for free. No upload, no signup — instant PDF to Word conversion in your browser.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/pdf-to-word" },
  openGraph: {
    title: "PDF to Word – Convert PDF to DOCX Free Online",
    description: "Convert PDF files to editable Word .docx documents online for free. Instant, private.",
    url: "https://smart-convertor.vercel.app/tools/pdf-to-word",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
