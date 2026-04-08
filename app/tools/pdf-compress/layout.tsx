import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Compress – Reduce PDF File Size Free Online",
  description:
    "Compress PDF files online for free. Reduce PDF size by up to 80% without losing quality. No upload, no signup — runs entirely in your browser.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/pdf-compress" },
  openGraph: {
    title: "PDF Compress – Reduce PDF File Size Free Online",
    description: "Compress PDF files online for free. Reduce PDF size by up to 80% without losing quality.",
    url: "https://smart-convertor.vercel.app/tools/pdf-compress",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
