import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Split – Split PDF into Separate Pages Free",
  description:
    "Split a PDF into separate files by custom page ranges. Free online PDF splitter — no upload, no account, instant results in your browser.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/pdf-split" },
  openGraph: {
    title: "PDF Split – Split PDF into Separate Pages Free",
    description: "Split a PDF into separate files by custom page ranges. Free, instant, browser-based.",
    url: "https://smart-convertor.vercel.app/tools/pdf-split",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
