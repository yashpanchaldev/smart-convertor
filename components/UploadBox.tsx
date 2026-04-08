"use client";

import { useCallback, useRef, useState } from "react";

interface UploadBoxProps {
  accept: string;
  acceptLabel: string;
  onFile: (file: File) => void;
  onText?: (text: string) => void;
  showPaste?: boolean;
  maxSizeMB?: number;
}

export default function UploadBox({
  accept, acceptLabel, onFile, onText, showPaste = false, maxSizeMB = 20,
}: UploadBoxProps) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"file" | "paste">("file");
  const [pasteValue, setPasteValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large. Max ${maxSizeMB} MB.`);
      return;
    }
    setError(null);
    onFile(file);
  }, [onFile, maxSizeMB]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="w-full space-y-3">
      {/* Tab switcher */}
      {showPaste && (
        <div className="inline-flex p-1 rounded-xl gap-1"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          {(["file", "paste"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={tab === t
                ? { background: "var(--accent)", color: "#fff", boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }
                : { color: "var(--muted)" }}>
              {t === "file" ? "📁 Upload File" : "📋 Paste Text"}
            </button>
          ))}
        </div>
      )}

      {tab === "file" ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-4 py-16 px-6 text-center group ${dragging ? "drag-active" : ""}`}
          style={{
            borderColor: dragging ? "var(--accent)" : "var(--border)",
            background: dragging
              ? "var(--accent-soft)"
              : "var(--card)",
          }}
        >
          {/* Subtle grid pattern */}
          {!dragging && (
            <div className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />
          )}

          {/* Upload icon */}
          <div className="relative">
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-2xl"
              style={{
                background: "var(--accent-soft)",
                animation: dragging ? "pulse-ring 1s ease-out infinite" : "none",
              }} />
            <div
              className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{
                background: dragging
                  ? "var(--accent)"
                  : "linear-gradient(135deg, var(--accent-soft), color-mix(in srgb, #a78bfa 10%, transparent))",
                border: "1px solid var(--accent-soft-border)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                style={{ color: dragging ? "#fff" : "var(--accent)" }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
              {dragging ? "Release to upload" : (
                <>Drop your file here, or{" "}
                  <span style={{ color: "var(--accent)" }}>browse</span>
                </>
              )}
            </p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {acceptLabel} · Max {maxSizeMB} MB
            </p>
          </div>

          <input ref={inputRef} type="file" accept={accept} className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
          <textarea
            value={pasteValue}
            onChange={(e) => setPasteValue(e.target.value)}
            placeholder="Paste your text or HTML here..."
            rows={9}
            className="w-full p-4 text-sm resize-none outline-none leading-relaxed"
            style={{ background: "var(--card)", color: "var(--foreground)" }}
          />
          <div className="px-4 py-3 flex items-center justify-between"
            style={{ borderTop: "1px solid var(--border)", background: "var(--card)" }}>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {pasteValue.length > 0 ? `${pasteValue.trim().split(/\s+/).filter(Boolean).length} words` : "Start typing…"}
            </span>
            <button
              onClick={() => { if (pasteValue.trim() && onText) { onText(pasteValue.trim()); setError(null); } }}
              disabled={!pasteValue.trim()}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, var(--accent), #a78bfa)", boxShadow: pasteValue.trim() ? "0 2px 10px rgba(99,102,241,0.3)" : "none" }}>
              Convert →
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl"
          style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
