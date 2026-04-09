import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "JPG to PNG – Convert JPG to PNG Free Online",
  description: "Convert JPG images to PNG format online for free. Preserves transparency. No upload, no signup — instant in your browser.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/jpg-to-png" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
