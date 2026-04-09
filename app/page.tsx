import type { Metadata } from "next";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlot";

/* ─── SEO Meta ──────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "SmartConverter – Free Online File Converter Tool",
  description:
    "Convert PDF, images & documents free online. No signup, no uploads. Browser-based file converter for students, freelancers & office users.",
};

/* ─── Tool data ─────────────────────────────────────────────────────────── */

const pdfTools = [
  {
    title: "Text to PDF", href: "/tools/text-to-pdf", badge: "Popular",
    description: "Turn plain text into a clean, shareable PDF instantly.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  },
  {
    title: "PDF to Text", href: "/tools/pdf-to-text",
    description: "Extract all readable text from any PDF file in seconds.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" /></svg>,
  },
  {
    title: "PDF to Word", href: "/tools/pdf-to-word", badge: "New",
    description: "Convert PDF files to editable .docx Word documents instantly.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /><line x1="9" y1="14" x2="15" y2="14" /><line x1="9" y1="17" x2="13" y2="17" /></svg>,
  },
  {
    title: "DOC to PDF", href: "/tools/doc-to-pdf",
    description: "Convert Word .docx documents to PDF with formatting intact.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>,
  },
  {
    title: "HTML to PDF", href: "/tools/html-to-pdf",
    description: "Render any HTML snippet or page into a pixel-perfect PDF.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  },
  {
    title: "PDF Merge", href: "/tools/pdf-merge",
    description: "Combine multiple PDFs into one file. Drag to reorder pages.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3" /><polyline points="15 3 12 6 9 3" /><line x1="12" y1="6" x2="12" y2="14" /></svg>,
  },
  {
    title: "PDF Split", href: "/tools/pdf-split",
    description: "Split a PDF into separate files by custom page ranges.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="12" y1="2" x2="12" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  },
  {
    title: "PDF Compress", href: "/tools/pdf-compress", badge: "🔥 Hot",
    description: "Shrink PDF file size while keeping quality. Instant results.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></svg>,
  },
  {
    title: "PDF to Image", href: "/tools/pdf-to-image",
    description: "Export every PDF page as a high-quality JPG or PNG image.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
  },
  {
    title: "PDF Rotate", href: "/tools/pdf-rotate",
    description: "Rotate all pages in a PDF by 90°, 180°, or 270° in one click.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>,
  },
];

const imageTools = [
  {
    title: "Image to PDF", href: "/tools/image-to-pdf",
    description: "Combine JPG, PNG, or WebP images into a single PDF.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
  },
  {
    title: "Image to Text (OCR)", href: "/tools/image-to-text", badge: "New",
    description: "Extract text from any image using OCR. Supports JPG, PNG, WebP.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="14" y2="13" /><line x1="8" y1="17" x2="12" y2="17" /></svg>,
  },
  {
    title: "Image Compress", href: "/tools/image-compress", badge: "🔥 Hot",
    description: "Compress images up to 90% smaller with no visible quality loss.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></svg>,
  },
  {
    title: "Resize Image", href: "/tools/image-resize",
    description: "Resize to exact pixel dimensions with optional aspect ratio lock.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>,
  },
  {
    title: "JPG ↔ PNG", href: "/tools/image-convert",
    description: "Convert between JPG, PNG, WebP and SVG formats in one click.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>,
  },
  {
    title: "JPG to PNG", href: "/tools/jpg-to-png", badge: "New",
    description: "Convert JPG images to PNG format. Preserves transparency instantly.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
  },
  {
    title: "PNG to JPG", href: "/tools/png-to-jpg", badge: "New",
    description: "Convert PNG images to JPG. White background applied automatically.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
  },
  {
    title: "PNG to WebP", href: "/tools/png-to-webp", badge: "New",
    description: "Convert PNG to WebP for smaller file sizes with same quality.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>,
  },
  {
    title: "SVG to PNG", href: "/tools/svg-to-png", badge: "New",
    description: "Convert SVG vector files to PNG images instantly in your browser.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  },
  {
    title: "Image to SVG", href: "/tools/image-to-svg", badge: "New",
    description: "Wrap JPG, PNG, or WebP images inside an SVG container instantly.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  },
  {
    title: "QR Code Generator", href: "/tools/qr-code",
    description: "Generate a QR code for any URL or text. Download as PNG instantly.",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="3" height="3" /><line x1="19" y1="14" x2="21" y2="14" /><line x1="19" y1="17" x2="21" y2="17" /><line x1="19" y1="20" x2="21" y2="20" /></svg>,
  },
];

/* ─── Static content ────────────────────────────────────────────────────── */

const stats = [
  { value: "22", label: "Free tools" },
  { value: "100%", label: "Browser-based" },
  { value: "0 KB", label: "Data stored" },
  { value: "< 5s", label: "Avg. speed" },
];

const features = [
  { icon: "🔒", title: "100% Private", desc: "Files never leave your browser. Zero server uploads, zero risk." },
  { icon: "⚡", title: "Instant Results", desc: "Client-side processing — no upload wait, no server queue." },
  { icon: "🆓", title: "Always Free", desc: "No subscriptions, no limits, no credit card needed. Ever." },
  { icon: "🌐", title: "Works Everywhere", desc: "Any browser, any OS — Chrome, Safari, Firefox, Edge, mobile." },
  { icon: "📁", title: "22 File Tools", desc: "PDF, images, documents — all conversion tools in one place." },
  { icon: "🚀", title: "WebAssembly Speed", desc: "Native-speed conversions powered by Wasm technology." },
];

const useCases = [
  {
    role: "Students", icon: "🎓",
    items: [
      "Convert assignment notes to PDF before submitting",
      "Compress large PDF textbooks to save device storage",
      "Merge multiple lecture PDFs into one study guide",
    ],
  },
  {
    role: "Freelancers", icon: "💼",
    items: [
      "Send client proposals as polished, professional PDFs",
      "Compress portfolio images for faster email delivery",
      "Convert HTML mockups to PDF for client review",
    ],
  },
  {
    role: "Office Users", icon: "🏢",
    items: [
      "Batch-convert Word docs to PDF for archiving",
      "Split large reports into individual shareable sections",
      "Resize product images for website or email uploads",
    ],
  },
];

const faqs = [
  {
    q: "Is SmartConverter really free to use?",
    a: "Yes, completely. All 13 tools are free with no hidden fees, no subscription, and no credit card required. We keep it free by showing non-intrusive ads.",
  },
  {
    q: "Are my files safe? Do you store them?",
    a: "Your files never leave your device. Every conversion happens entirely inside your browser using WebAssembly. We have zero access to your files — nothing is uploaded to any server.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account, no signup, no email. Just open a tool and start converting. We believe privacy means not collecting data you never needed to share.",
  },
  {
    q: "What file formats does SmartConverter support?",
    a: "We support PDF, DOCX, HTML, plain text, JPG, PNG, and WebP. Convert between formats, compress, merge, split, rotate, extract text via OCR, and generate QR codes — all from your browser.",
  },
  {
    q: "How fast is the conversion?",
    a: "Most conversions finish in under 5 seconds. Because everything runs locally in your browser, there's no upload wait time or server queue.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes. SmartConverter is fully responsive and works on any modern browser — Chrome, Safari, Firefox, Edge — on desktop, tablet, or phone.",
  },
  {
    q: "What makes SmartConverter different from other online converters?",
    a: "Most online converters upload your files to their servers. SmartConverter processes everything in your browser, so your files stay private, conversions are faster, and there's no file size limit imposed by server quotas.",
  },
];

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4">

      {/* ── Hero ── */}
      <section className="relative pt-20 pb-20 text-center overflow-hidden">
        <div className="hero-glow" />

        <div
          className="animate-fade-up inline-flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-full mb-7 font-medium"
          style={{ background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-soft-border)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          No signup · No storage · 100% free
        </div>

        <h1
          className="animate-fade-up text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5"
          style={{ animationDelay: "0.05s" }}
        >
          Free Online File Converter
          <br />
          <span className="gradient-text">Fast. Private. Free.</span>
        </h1>

        <p
          className="animate-fade-up text-base md:text-lg max-w-2xl mx-auto mb-4 leading-relaxed"
          style={{ color: "var(--muted)", animationDelay: "0.1s" }}
        >
          SmartConverter is a free online file converter that works entirely in your browser.
          Convert PDF to text, compress images, merge documents, resize photos — no uploads,
          no account, no waiting. Just pick a tool and go.
        </p>

        <p
          className="animate-fade-up text-sm max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--muted)", animationDelay: "0.12s" }}
        >
          Trusted by students, freelancers, and office teams who need fast, private file
          conversion without installing software or sharing files with third-party servers.
          13 tools. One tab. Zero cost.
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-up flex flex-wrap items-center justify-center gap-3 mb-14"
          style={{ animationDelay: "0.15s" }}
        >
          <Link
            href="/tools/pdf-compress"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, var(--accent), #a78bfa)", boxShadow: "0 4px 14px rgba(99,102,241,0.35)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" />
              <line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" />
            </svg>
            Try PDF Compress — Free
          </Link>
          <Link
            href="/tools/image-compress"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)", boxShadow: "var(--shadow-sm)" }}
          >
            Compress Images →
          </Link>
        </div>

        {/* Stats */}
        <div
          className="animate-fade-up flex flex-wrap justify-center gap-8"
          style={{ animationDelay: "0.2s" }}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ad slot ── */}
      <AdSlot label="Advertisement · 728×90" height={90} className="mb-14 max-w-3xl mx-auto" />

      {/* ── Features ── */}
      <section aria-label="Features" className="mb-16">
        <h2 className="text-xl font-bold text-center mb-2" style={{ color: "var(--foreground)" }}>
          Why thousands choose SmartConverter
        </h2>
        <p className="text-sm text-center mb-8" style={{ color: "var(--muted)" }}>
          No installs. No accounts. No file size limits. Just fast, private conversions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-3 px-5 py-4 rounded-2xl text-sm"
              style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
            >
              <span className="text-xl mt-0.5">{f.icon}</span>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{f.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PDF Tools ── */}
      <ToolSection title="PDF Tools" count={pdfTools.length} tools={pdfTools} />

      {/* ── Image Tools ── */}
      <ToolSection title="Image Tools" count={imageTools.length} tools={imageTools} />

      {/* ── Use Cases ── */}
      <section aria-label="Use cases" className="pb-16">
        <h2 className="text-xl font-bold text-center mb-2" style={{ color: "var(--foreground)" }}>
          Who uses SmartConverter?
        </h2>
        <p className="text-sm text-center mb-8" style={{ color: "var(--muted)" }}>
          From students to office teams — here's how people use it every day.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {useCases.map((uc) => (
            <div
              key={uc.role}
              className="rounded-2xl p-6"
              style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{uc.icon}</span>
                <h3 className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{uc.role}</h3>
              </div>
              <ul className="space-y-2.5">
                {uc.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 flex-shrink-0" style={{ color: "var(--success)" }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mid-page CTA ── */}
      <section className="pb-16 text-center">
        <div
          className="rounded-3xl p-10 relative overflow-hidden"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, var(--accent-soft), transparent)" }} />
          <div className="relative">
            <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--foreground)" }}>
              Ready to convert your first file?
            </h2>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--muted)" }}>
              No signup. No software. Just open a tool and your file is ready in seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/tools/pdf-compress"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--accent), #a78bfa)", boxShadow: "0 4px 14px rgba(99,102,241,0.35)" }}
              >
                Start Converting — It&apos;s Free
              </Link>
              <Link
                href="/tools/image-compress"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--foreground)" }}
              >
                Compress an Image
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section aria-label="Frequently asked questions" className="pb-16">
        <h2 className="text-xl font-bold text-center mb-2" style={{ color: "var(--foreground)" }}>
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-center mb-8" style={{ color: "var(--muted)" }}>
          Everything you need to know about SmartConverter.
        </p>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl px-6 py-5"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--foreground)" }}>{faq.q}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust banner ── */}
      <section className="pb-20">
        <div
          className="relative rounded-3xl overflow-hidden p-8 md:p-10"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 0%, var(--accent-soft), transparent)" }} />
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 animate-float"
              style={{ background: "linear-gradient(135deg, var(--accent-soft), color-mix(in srgb, #a78bfa 15%, transparent))", border: "1px solid var(--accent-soft-border)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: "var(--accent)" }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-1" style={{ color: "var(--foreground)" }}>
                Your files never leave your device
              </h3>
              <p className="text-sm leading-relaxed max-w-xl" style={{ color: "var(--muted)" }}>
                Every conversion runs entirely in your browser using WebAssembly and JavaScript.
                No uploads, no servers, no logs. Your data stays yours — always.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col gap-2 text-xs" style={{ color: "var(--muted)" }}>
              {["No server uploads", "No account needed", "No data retention"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--success)" }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ─── ToolSection ───────────────────────────────────────────────────────── */

function ToolSection({
  title, count, tools,
}: {
  title: string;
  count: number;
  tools: { title: string; description: string; href: string; badge?: string; icon: React.ReactNode }[];
}) {
  return (
    <section className="pb-14">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{title}</h2>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-semibold"
          style={{ background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-soft-border)" }}
        >
          {count} tools
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => <ToolCard key={tool.href} {...tool} />)}
      </div>
    </section>
  );
}
