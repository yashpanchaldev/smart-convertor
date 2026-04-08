import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to PDF – Convert Text to PDF Free Online",
  description:
    "Convert plain text to a clean, shareable PDF online for free. Paste text or upload a .txt file. No signup, no upload — instant in your browser.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/text-to-pdf" },
  openGraph: {
    title: "Text to PDF – Convert Text to PDF Free Online",
    description: "Convert plain text to PDF free online. Paste or upload .txt — instant, private.",
    url: "https://smart-convertor.vercel.app/tools/text-to-pdf",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
