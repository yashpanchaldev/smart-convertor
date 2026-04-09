import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Image to SVG – Convert Image to SVG Free Online",
  description: "Convert JPG, PNG, or WebP images to SVG format online for free. Embed raster images in SVG containers. No upload, instant.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/image-to-svg" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
