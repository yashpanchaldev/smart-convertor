export function Skeleton({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-xl animate-pulse ${className}`}
      style={{ background: "var(--border)", ...style }}
    />
  );
}

export function ToolPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex gap-8">
        <div className="flex-1 min-w-0 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Skeleton style={{ height: 28, width: "40%" }} />
            <Skeleton style={{ height: 16, width: "65%" }} />
          </div>
          {/* Upload box */}
          <Skeleton style={{ height: 200 }} />
        </div>
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <Skeleton style={{ height: 600 }} />
        </aside>
      </div>
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero */}
      <div className="pt-20 pb-16 flex flex-col items-center gap-4">
        <Skeleton style={{ height: 24, width: 260 }} />
        <Skeleton style={{ height: 48, width: 420 }} />
        <Skeleton style={{ height: 48, width: 300 }} />
        <Skeleton style={{ height: 16, width: 340 }} />
        <div className="flex gap-8 mt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Skeleton style={{ height: 24, width: 64 }} />
              <Skeleton style={{ height: 12, width: 80 }} />
            </div>
          ))}
        </div>
      </div>
      {/* Ad slot */}
      <Skeleton className="mb-12 max-w-3xl mx-auto" style={{ height: 90 }} />
      {/* Tool grid */}
      <div className="space-y-10 pb-16">
        {[...Array(2)].map((_, s) => (
          <div key={s}>
            <Skeleton style={{ height: 20, width: 120, marginBottom: 20 }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} style={{ height: 160 }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
