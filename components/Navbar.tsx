"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const pdfLinks = [
  { label: "Text → PDF",      href: "/tools/text-to-pdf" },
  { label: "PDF → Text",      href: "/tools/pdf-to-text" },
  { label: "PDF → Word",      href: "/tools/pdf-to-word" },
  { label: "DOC → PDF",       href: "/tools/doc-to-pdf" },
  { label: "HTML → PDF",      href: "/tools/html-to-pdf" },
  { label: "PDF Merge",       href: "/tools/pdf-merge" },
  { label: "PDF Split",       href: "/tools/pdf-split" },
  { label: "PDF Compress ⭐", href: "/tools/pdf-compress" },
  { label: "PDF Rotate",      href: "/tools/pdf-rotate" },
  { label: "PDF → Image",     href: "/tools/pdf-to-image" },
];

const imageLinks = [
  { label: "Image → PDF",        href: "/tools/image-to-pdf" },
  { label: "Image → Text (OCR)", href: "/tools/image-to-text" },
  { label: "Image Compress ⭐",  href: "/tools/image-compress" },
  { label: "Resize Image",       href: "/tools/image-resize" },
  { label: "JPG ↔ PNG",          href: "/tools/image-convert" },
  { label: "JPG → PNG",          href: "/tools/jpg-to-png" },
  { label: "PNG → JPG",          href: "/tools/png-to-jpg" },
  { label: "PNG → WebP",         href: "/tools/png-to-webp" },
  { label: "SVG → PNG",          href: "/tools/svg-to-png" },
  { label: "Image → SVG",        href: "/tools/image-to-svg" },
  { label: "QR Code Generator",  href: "/tools/qr-code" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  return (
    <nav className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{ background: "color-mix(in srgb, var(--background) 80%, transparent)", borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between" style={{ height: 56 }}>
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo.svg"
            alt="SmartConverter logo"
            width={32}
            height={32}
            className="rounded-xl transition-transform group-hover:scale-105"
          />
          <span className="font-semibold text-sm tracking-tight" style={{ color: "var(--foreground)" }}>
            Smart<span style={{ color: "var(--accent)" }}>Converter</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <NavDropdown label="PDF Tools" links={pdfLinks} />
          <NavDropdown label="Image Tools" links={imageLinks} />
          <div className="w-px h-4 mx-2" style={{ background: "var(--border)" }} />
          <button onClick={toggle} aria-label="Toggle dark mode"
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-105"
            style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}>
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavDropdown({ label, links }: { label: string; links: { label: string; href: string }[] }) {
  return (
    <div className="hidden md:block relative group">
      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:opacity-80"
        style={{ color: "var(--muted)" }}>
        {label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className="transition-transform duration-200 group-hover:rotate-180">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="absolute top-full left-0 mt-2 w-52 rounded-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50"
        style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}>
        <div className="p-1.5">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors"
              style={{ color: "var(--foreground)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--card-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
