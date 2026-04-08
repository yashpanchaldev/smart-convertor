import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Merge – Combine Multiple PDFs into One Free",
  description:
    "Merge multiple PDF files into one document online for free. Drag to reorder pages. No upload, no signup — 100% browser-based.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/pdf-merge" },
  openGraph: {
    title: "PDF Merge – Combine Multiple PDFs into One Free",
    description: "Merge multiple PDF files into one document online for free. Drag to reorder pages.",
    url: "https://smart-convertor.vercel.app/tools/pdf-merge",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
