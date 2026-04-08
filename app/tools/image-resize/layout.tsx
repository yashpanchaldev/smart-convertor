import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resize Image – Resize Images Online Free",
  description:
    "Resize images to exact pixel dimensions online for free. Lock aspect ratio, set custom width and height. No upload, instant results in your browser.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/image-resize" },
  openGraph: {
    title: "Resize Image – Resize Images Online Free",
    description: "Resize images to exact pixel dimensions online for free. Lock aspect ratio, instant.",
    url: "https://smart-convertor.vercel.app/tools/image-resize",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
