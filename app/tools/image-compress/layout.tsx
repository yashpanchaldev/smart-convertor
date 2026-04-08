import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Compressor – Compress Images Online Free",
  description:
    "Compress JPG, PNG, and WebP images online for free. Reduce image file size by up to 90% without visible quality loss. No upload, instant results.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/image-compress" },
  openGraph: {
    title: "Image Compressor – Compress Images Online Free",
    description: "Compress JPG, PNG, WebP images online free. Reduce size by 90% without quality loss.",
    url: "https://smart-convertor.vercel.app/tools/image-compress",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
