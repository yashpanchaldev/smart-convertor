"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import ProgressBar from "@/components/ProgressBar";
import { downloadBlob } from "@/lib/utils";
import type { SplitResult } from "@/lib/converters/pdfSplit";

type State = "idle" | "loading" | "ready" | "processing" | "done";

export default function PdfSplitPage() {
  const [state, setState] = useState<State>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [ranges, setRanges] = useState([{ from: "1", to: "1" }]);
  const [results, setResults] = useState<SplitResult[]>([]);

  const handleFile = async (f: File) => {
    setState("loading");
    setFile(f);
    try {
      const { getPdfPageCount } = await import("@/lib/converters/pdfSplit");
      const count = await getPdfPageCount(f);
      setPageCount(count);
      setRanges([{ from: "1", to: String(count) }]);
      setState("ready");
    } catch {
      setState("idle");
      alert("Could not read PDF. Make sure it's a valid file.");
    }
  };

  const addRange = () => setRanges((r) => [...r, { from: "1", to: String(pageCount) }]);
  const removeRange = (i: number) => setRanges((r) => r.filter((_, idx) => idx !== i));
  const updateRange = (i: number, key: "from" | "to", val: string) =>
    setRanges((r) => r.map((range, idx) => idx === i ? { ...range, [key]: val } : range));

  const split = async () => {
    if (!file) return;
    setState("processing");
    try {
      const { splitPdf } = await import("@/lib/converters/pdfSplit");
      const parsed = ranges.map((r) => ({
        from: Math.max(1, parseInt(r.from) || 1),
        to: Math.min(pageCount, parseInt(r.to) || pageCount),
      }));
      const res = await splitPdf(file, parsed);
      setResults(res);
      setState("done");
    } catch {
      setState("ready");
      alert("Split failed. Please check your page ranges.");
    }
  };

  const reset = () => { setFile(null); setResults([]); setState("idle"); };

  return (
    <ToolLayout title="PDF Split" description="Split a PDF into multiple files by page range.">
      {state === "idle" && (
        <UploadBox accept=".pdf,application/pdf" acceptLabel=".pdf files" onFile={handleFile} />
      )}
      {(state === "loading" || state === "processing") && (
        <ProgressBar label={state === "loading" ? "Reading PDF..." : "Splitting PDF..."} />
      )}
      {state === "ready" && file && (
        <div className="space-y-4">
          <div className="rounded-2xl p-4 text-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <span style={{ color: "var(--foreground)" }}>{file.name}</span>
            <span className="ml-3" style={{ color: "var(--muted)" }}>{pageCount} pages</span>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Page ranges</p>
            {ranges.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs w-16" style={{ color: "var(--muted)" }}>Part {i + 1}</span>
                <div className="flex items-center gap-2 flex-1">
                  <input type="number" min={1} max={pageCount} value={r.from}
                    onChange={(e) => updateRange(i, "from", e.target.value)}
                    className="w-20 px-3 py-1.5 rounded-lg text-sm outline-none"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }} />
                  <span className="text-xs" style={{ color: "var(--muted)" }}>to</span>
                  <input type="number" min={1} max={pageCount} value={r.to}
                    onChange={(e) => updateRange(i, "to", e.target.value)}
                    className="w-20 px-3 py-1.5 rounded-lg text-sm outline-none"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }} />
                </div>
                {ranges.length > 1 && (
                  <button onClick={() => removeRange(i)} className="text-xs hover:opacity-70" style={{ color: "var(--muted)" }}>✕</button>
                )}
              </div>
            ))}
            <button onClick={addRange} className="text-xs mt-1 hover:opacity-70 transition-opacity" style={{ color: "var(--accent)" }}>
              + Add range
            </button>
          </div>

          <div className="flex gap-3">
            <button onClick={reset} className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-70"
              style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
              Change file
            </button>
            <button onClick={split} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)" }}>
              Split PDF
            </button>
          </div>
        </div>
      )}

      {state === "done" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{results.length} parts created</span>
            </div>
            <button onClick={reset} className="text-xs hover:opacity-70" style={{ color: "var(--muted)" }}>Start over</button>
          </div>
          {results.map((r, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{r.name}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>{r.pages} page{r.pages !== 1 ? "s" : ""} · {(r.blob.size / 1024).toFixed(0)} KB</p>
              </div>
              <button onClick={() => downloadBlob(r.blob, r.name)}
                className="text-xs px-3 py-1.5 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--accent)" }}>
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
