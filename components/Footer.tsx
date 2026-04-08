import Link from "next/link";

const toolLinks = [
  { label: "Text to PDF",      href: "/tools/text-to-pdf" },
  { label: "PDF to Text",      href: "/tools/pdf-to-text" },
  { label: "PDF to Word",      href: "/tools/pdf-to-word" },
  { label: "PDF Compress",     href: "/tools/pdf-compress" },
  { label: "Image Compress",   href: "/tools/image-compress" },
  { label: "Image to Text",    href: "/tools/image-to-text" },
  { label: "PDF Merge",        href: "/tools/pdf-merge" },
  { label: "QR Code Generator",href: "/tools/qr-code" },
];

export default function Footer() {
  return (
    <footer className="border-t mt-8" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                style={{ background: "linear-gradient(135deg, var(--accent), #a78bfa)" }}>SC</div>
              <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                Smart<span style={{ color: "var(--accent)" }}>Converter</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              Fast, private, and free file conversion tools. Everything runs in your browser — no uploads, no accounts.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
              style={{ background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-soft-border)" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Files auto-delete after processing
            </div>
          </div>

          {/* Popular tools */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--muted)" }}>
              Popular Tools
            </p>
            <ul className="space-y-2.5">
              {toolLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}
                    className="text-sm transition-colors hover:opacity-80 flex items-center gap-2"
                    style={{ color: "var(--muted)" }}>
                    <span className="w-1 h-1 rounded-full" style={{ background: "var(--border-strong)" }} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + trust */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--muted)" }}>
              Company
            </p>
            <ul className="space-y-2.5 mb-6">
              {[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href}
                    className="text-sm transition-colors hover:opacity-80 flex items-center gap-2"
                    style={{ color: "var(--muted)" }}>
                    <span className="w-1 h-1 rounded-full" style={{ background: "var(--border-strong)" }} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-1.5 text-xs" style={{ color: "var(--muted)" }}>
              {["No server uploads", "No account required", "No data stored"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ color: "var(--success)" }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}>
          <p>© {new Date().getFullYear()} SmartConverter. All rights reserved.</p>
          <p>Built with privacy in mind. No tracking. No ads in the way.</p>
        </div>
      </div>
    </footer>
  );
}
