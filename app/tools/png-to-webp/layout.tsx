import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "PNG to WebP – Convert PNG to WebP Free Online",
  description: "Convert PNG images to WebP format online for free. Smaller file sizes, same quality. No upload, instant results.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/png-to-webp" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
