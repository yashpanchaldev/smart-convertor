import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "JSON Formatter & Validator – Format JSON Online Free",
  description: "Format, beautify, minify and validate JSON online for free. Instant results, no upload needed. Browser-based JSON formatter.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/json-formatter" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
