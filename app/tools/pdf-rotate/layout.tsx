import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Rotate – Rotate PDF Pages Free Online",
  description:
    "Rotate all pages in a PDF by 90°, 180°, or 270° online for free. No upload, no signup — instant PDF rotation in your browser.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/pdf-rotate" },
  openGraph: {
    title: "PDF Rotate – Rotate PDF Pages Free Online",
    description: "Rotate all pages in a PDF by 90°, 180°, or 270° online for free. Instant, private.",
    url: "https://smart-convertor.vercel.app/tools/pdf-rotate",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
