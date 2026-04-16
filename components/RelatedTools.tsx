import Link from "next/link";
import type { RelatedTool } from "@/lib/relatedTools";

interface Props {
  tools: RelatedTool[];
}

export default function RelatedTools({ tools }: Props) {
  if (!tools.length) return null;

  return (
    <section className="mt-12" aria-label="Related tools">
      <h2 className="text-base font-semibold mb-4" style={{ color: "var(--foreground)" }}>
        Related Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:-translate-y-0.5"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-soft-border)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ color: "var(--accent)" }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>{tool.title}</p>
              <p className="text-xs truncate" style={{ color: "var(--muted)" }}>{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
