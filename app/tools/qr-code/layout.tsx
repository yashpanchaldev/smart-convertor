import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator – Create QR Codes Free Online",
  description:
    "Generate QR codes for any URL, text, or contact info online for free. Custom colors and sizes. Download as PNG instantly — no signup needed.",
  alternates: { canonical: "https://smart-convertor.vercel.app/tools/qr-code" },
  openGraph: {
    title: "QR Code Generator – Create QR Codes Free Online",
    description: "Generate QR codes for any URL or text free. Custom colors, download as PNG instantly.",
    url: "https://smart-convertor.vercel.app/tools/qr-code",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
