import AdSlot from "./AdSlot";
import RelatedTools from "./RelatedTools";
import type { RelatedTool } from "@/lib/relatedTools";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  relatedTools?: RelatedTool[];
}

export default function ToolLayout({ title, description, children, relatedTools }: ToolLayoutProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
              {title}
            </h1>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {description}
            </p>
          </div>
          {children}
          {/* Ad below result */}
          <AdSlot label="Advertisement · 728×90" height={90} className="mt-10" />
          {/* Related tools */}
          {relatedTools && relatedTools.length > 0 && (
            <RelatedTools tools={relatedTools} />
          )}
        </div>

        {/* Sidebar ad (desktop only) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-20">
            <AdSlot label="Advertisement · 300×600" height={600} />
          </div>
        </aside>
      </div>
    </div>
  );
}
