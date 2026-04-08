import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to PDF – Convert JPG/PNG to PDF Free Online",
  description:
    "Convert JPG, PNG, or WebP images to PDF online for free. Combine multiple images into one PDF. No upload, no signup — instant in your browser.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/image-to-pdf" },
  openGraph: {
    title: "Image to PDF – Convert JPG/PNG to PDF Free Online",
    description: "Convert JPG, PNG, WebP images to PDF free. Combine multiple images into one PDF.",
    url: "https://smart-convertor.vercel.app/tools/image-to-pdf",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
