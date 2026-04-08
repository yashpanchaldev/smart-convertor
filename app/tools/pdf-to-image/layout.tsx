import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to Image – Convert PDF Pages to JPG/PNG Free",
  description:
    "Convert PDF pages to high-quality JPG or PNG images online for free. No upload needed — runs entirely in your browser. Fast and private.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/pdf-to-image" },
  openGraph: {
    title: "PDF to Image – Convert PDF Pages to JPG/PNG Free",
    description: "Convert PDF pages to high-quality JPG or PNG images online for free.",
    url: "https://smart-convertor.vercel.app/tools/pdf-to-image",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
