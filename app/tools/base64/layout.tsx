import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Base64 Encoder / Decoder – Free Online Tool",
  description: "Encode or decode Base64 strings online for free. Instant, browser-based, no upload needed.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/base64" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
