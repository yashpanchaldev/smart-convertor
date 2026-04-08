import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageProgress from "@/components/PageProgress";

export const metadata: Metadata = {
  title: "Smart Converter Toolkit – Convert Files Instantly",
  description:
    "Free online file converter. Convert Text to PDF, PDF to Text, DOC to PDF, HTML to PDF. No signup required. Files auto-deleted after processing.",
  verification: {
    google: "B74z6DyxgoGRoMNAF5F0Ou1vAiVG05hoHHqppna-swM",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
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
