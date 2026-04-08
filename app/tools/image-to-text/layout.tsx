import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to Text (OCR) – Extract Text from Image Free",
  description:
    "Extract text from images online for free using OCR. Supports JPG, PNG, WebP. No upload, no signup — instant image to text conversion in your browser.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/image-to-text" },
  openGraph: {
    title: "Image to Text (OCR) – Extract Text from Image Free",
    description: "Extract text from images free using OCR. Supports JPG, PNG, WebP. Instant, private.",
    url: "https://smart-convertor.vercel.app/tools/image-to-text",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
