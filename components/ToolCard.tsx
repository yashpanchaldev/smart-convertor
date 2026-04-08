"use client";

import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

export default function ToolCard({ title, description, href, icon, badge }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="card-shine group flex flex-col rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-soft-border)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
          style={{
            background: "linear-gradient(135deg, var(--accent-soft), color-mix(in srgb, #a78bfa 10%, transparent))",
            border: "1px solid var(--accent-soft-border)",
          }}
        >
          <span style={{ color: "var(--accent)" }}>{icon}</span>
        </div>
        {badge && (
          <span
            className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-soft-border)" }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <h3 className="font-semibold text-sm mb-1.5 leading-snug" style={{ color: "var(--foreground)" }}>
        {title}
      </h3>
      <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
        {description}
      </p>

      {/* CTA */}
      <div className="mt-4 flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
        style={{ color: "var(--accent)" }}>
        Open tool
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className="transition-transform group-hover:translate-x-0.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
