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
    "Free online file converter. Convert PDF, images & documents in your browser. No signup, no uploads, no limits. 24 tools — 100% private.",
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
    "json formatter online",
    "base64 encoder decoder",
    "browser based file converter",
  ],
  authors: [{ name: "SmartConverter", url: BASE_URL }],
  creator: "SmartConverter",
  publisher: "SmartConverter",
  applicationName: "SmartConverter",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg",    type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: "/favicon.ico",
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
      "Convert PDF, images & documents free in your browser. No signup, no uploads. 24 tools, 100% private.",
    images: [
      {
        url: `${BASE_URL}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "SmartConverter – Free Online File Converter",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartConverter – Free Online File Converter",
    description:
      "Convert PDF, images & documents free in your browser. No signup, no uploads. 24 tools, 100% private.",
    images: [`${BASE_URL}/og-image.svg`],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

// Organization schema tells Google the site name + logo to show in search results
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SmartConverter",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.svg`,
    width: 64,
    height: 64,
  },
  sameAs: [BASE_URL],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SmartConverter",
  url: BASE_URL,
  description:
    "Free browser-based file converter. Convert PDF, images and documents with 24 tools. No uploads, no signup.",
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
        {/* Explicit favicon links — overrides Vercel defaults */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
