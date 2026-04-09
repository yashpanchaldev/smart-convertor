import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "SVG to PNG – Convert SVG to PNG Free Online",
  description: "Convert SVG vector files to PNG images online for free. No upload, no signup — instant SVG to PNG in your browser.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/svg-to-png" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
