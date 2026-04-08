import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG to PNG Converter – Convert Images Free Online",
  description:
    "Convert JPG to PNG, PNG to JPG, or any image to WebP online for free. One-click image format converter — no upload, no signup, instant results.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/image-convert" },
  openGraph: {
    title: "JPG to PNG Converter – Convert Images Free Online",
    description: "Convert JPG to PNG, PNG to JPG, or WebP online for free. One-click, instant, private.",
    url: "https://smart-convertor.vercel.app/tools/image-convert",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
