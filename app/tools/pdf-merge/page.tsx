"use client";

import { useCallback, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ProgressBar from "@/components/ProgressBar";
import { downloadBlob } from "@/lib/utils";

type State = "idle" | "processing" | "done";

export default function PdfMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const pdfs = Array.from(incoming).filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfs]);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const remove = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const moveUp = (i: number) => {
    if (i === 0) return;
    setFiles((prev) => {
      const arr = [...prev];
      [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
      return arr;
    });
  };

  const merge = async () => {
    if (files.length < 2) return;
    setState("processing");
    try {
      const { mergePdfs } = await import("@/lib/converters/pdfMerge");
      const blob = await mergePdfs(files);
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setState("done");
    } catch {
      setState("idle");
      alert("Merge failed. Make sure all files are valid PDFs.");
    }
  };

  const reset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFiles([]);
    setResultBlob(null);
    setResultUrl(null);
    setState("idle");
  };

  return (
    <ToolLayout title="PDF Merge" description="Combine multiple PDF files into one. Drag to reorder pages.">
      {state === "idle" && (
        <div className="space-y-4">
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => document.getElementById("pdf-merge-input")?.click()}
            className="cursor-pointer rounded-2xl border-2 border-dashed py-10 flex flex-col items-center gap-2 transition-all"
            style={{
              borderColor: dragging ? "var(--accent)" : "var(--border)",
              background: dragging ? "color-mix(in srgb, var(--accent) 4%, var(--background))" : "var(--card)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--accent)" }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Drop PDF files here or <span style={{ color: "var(--accent)" }}>browse</span>
            </p>
            <input id="pdf-merge-input" type="file" accept=".pdf,application/pdf" multiple className="hidden"
              onChange={(e) => e.target.files && addFiles(e.target.files)} />
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              {files.map((f, i) => (
                <div key={`${f.name}-${i}`} className="flex items-center gap-3 px-4 py-3 text-sm"
                  style={{ borderBottom: i < files.length - 1 ? "1px solid var(--border)" : "none", background: "var(--card)" }}>
                  <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "var(--border)", color: "var(--muted)" }}>{i + 1}</span>
                  <span className="flex-1 truncate" style={{ color: "var(--foreground)" }}>{f.name}</span>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>{(f.size / 1024).toFixed(0)} KB</span>
                  <button onClick={() => moveUp(i)} disabled={i === 0} className="text-xs px-2 py-1 rounded transition-opacity disabled:opacity-30 hover:opacity-70"
                    style={{ color: "var(--muted)" }}>↑</button>
                  <button onClick={() => remove(i)} className="text-xs hover:opacity-70 transition-opacity" style={{ color: "var(--muted)" }}>✕</button>
                </div>
              ))}
            </div>
          )}

          <button onClick={merge} disabled={files.length < 2}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-40"
            style={{ background: "var(--accent)" }}>
            Merge {files.length > 0 ? `${files.length} PDFs` : "PDFs"}
          </button>
          {files.length < 2 && <p className="text-xs text-center" style={{ color: "var(--muted)" }}>Add at least 2 PDF files to merge</p>}
        </div>
      )}

      {state === "processing" && <ProgressBar label="Merging PDFs..." />}

      {state === "done" && resultUrl && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Merged successfully — {files.length} files combined</span>
            </div>
            <button onClick={reset} className="text-xs hover:opacity-70" style={{ color: "var(--muted)" }}>Start over</button>
          </div>
          <div className="p-4">
            <iframe src={resultUrl} className="w-full rounded-xl" style={{ height: 400, border: "1px solid var(--border)" }} title="Merged PDF" />
          </div>
          <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
            <button onClick={() => resultBlob && downloadBlob(resultBlob, "merged.pdf")}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "var(--accent)" }}>
              Download merged.pdf
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
