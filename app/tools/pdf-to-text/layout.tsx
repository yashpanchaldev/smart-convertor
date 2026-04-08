import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to Text – Extract Text from PDF Free Online",
  description:
    "Extract readable text from any PDF file instantly. Free online PDF to text converter — no upload, no signup, works in your browser.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/pdf-to-text" },
  openGraph: {
    title: "PDF to Text – Extract Text from PDF Free Online",
    description: "Extract readable text from any PDF file instantly. Free, private, browser-based.",
    url: "https://smart-convertor.vercel.app/tools/pdf-to-text",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
