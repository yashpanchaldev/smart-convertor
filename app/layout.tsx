import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageProgress from "@/components/PageProgress";

const BASE_URL = "https://smart-convertor.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SmartConverter – Free Online File Converter",
    template: "%s | SmartConverter",
  },
  description:
    "Free online file converter. Convert PDF, images & documents in your browser. No signup, no uploads, no limits. 17 tools — 100% private.",
  keywords: [
    "free pdf converter online",
    "compress pdf online free",
    "convert images to pdf",
    "pdf to word converter",
    "image compressor online",
    "pdf merge online",
    "pdf split online",
    "ocr image to text",
    "qr code generator",
    "browser based file converter",
  ],
  authors: [{ name: "SmartConverter" }],
  creator: "SmartConverter",
  publisher: "SmartConverter",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "B74z6DyxgoGRoMNAF5F0Ou1vAiVG05hoHHqppna-swM",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "SmartConverter",
    title: "SmartConverter – Free Online File Converter",
    description:
      "Convert PDF, images & documents free in your browser. No signup, no uploads. 17 tools, 100% private.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SmartConverter – Free Online File Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartConverter – Free Online File Converter",
    description:
      "Convert PDF, images & documents free in your browser. No signup, no uploads. 17 tools, 100% private.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SmartConverter",
  url: BASE_URL,
  description:
    "Free browser-based file converter. Convert PDF, images and documents with 17 tools. No uploads, no signup.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <div
            className="min-h-screen flex flex-col"
            style={{ background: "var(--background)", color: "var(--foreground)" }}
          >
            <PageProgress />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
