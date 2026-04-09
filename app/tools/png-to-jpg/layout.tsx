import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "PNG to JPG – Convert PNG to JPG Free Online",
  description: "Convert PNG images to JPG format online for free. White background applied automatically. No upload, instant results.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/png-to-jpg" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
