"use client";

interface PreviewPanelProps {
  type: "pdf" | "text";
  url?: string;
  text?: string;
  fileName?: string;
  fileSize?: number;
  wordCount?: number;
  pageCount?: number;
  onDownload: () => void;
  onReset: () => void;
  suggestions?: string[];
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PreviewPanel({
  type,
  url,
  text,
  fileName,
  fileSize,
  wordCount,
  pageCount,
  onDownload,
  onReset,
  suggestions,
}: PreviewPanelProps) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Conversion complete
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs transition-opacity hover:opacity-70"
          style={{ color: "var(--muted)" }}
        >
          Convert another
        </button>
      </div>

      {/* File insights */}
      {(fileName || fileSize !== undefined || wordCount !== undefined || pageCount !== undefined) && (
        <div className="px-5 py-3 flex flex-wrap gap-4 text-xs" style={{ borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>
          {fileName && <span>📄 {fileName}</span>}
          {fileSize !== undefined && <span>💾 {formatBytes(fileSize)}</span>}
          {pageCount !== undefined && <span>📑 {pageCount} page{pageCount !== 1 ? "s" : ""}</span>}
          {wordCount !== undefined && <span>📝 {wordCount.toLocaleString()} words</span>}
        </div>
      )}

      {/* Preview */}
      <div className="p-4">
        {type === "pdf" && url && (
          <iframe
            src={url}
            className="w-full rounded-xl"
            style={{ height: "420px", border: "1px solid var(--border)" }}
            title="PDF Preview"
          />
        )}
        {type === "text" && text && (
          <pre
            className="w-full rounded-xl p-4 text-xs leading-relaxed overflow-auto"
            style={{
              maxHeight: "420px",
              background: "var(--background)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {text}
          </pre>
        )}
      </div>

      {/* Suggestions */}
      {suggestions && suggestions.length > 0 && (
        <div className="px-5 py-3 flex flex-wrap gap-2" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="text-xs" style={{ color: "var(--muted)" }}>Suggestions:</span>
          {suggestions.map((s) => (
            <span
              key={s}
              className="text-xs px-2.5 py-1 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                color: "var(--accent)",
                border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Download */}
      <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
        <button
          onClick={onDownload}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          Download File
        </button>
      </div>
    </div>
  );
}
