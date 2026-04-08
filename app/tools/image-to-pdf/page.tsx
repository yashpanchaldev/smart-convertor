"use client";

import { useCallback, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ProgressBar from "@/components/ProgressBar";
import { downloadBlob } from "@/lib/utils";

type State = "idle" | "processing" | "done";

const ACCEPTED = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const imgs = Array.from(incoming).filter((f) => ACCEPTED.includes(f.type));
    setFiles((prev) => [...prev, ...imgs]);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const convert = async () => {
    if (!files.length) return;
    setState("processing");
    try {
      const { imagesToPdf } = await import("@/lib/converters/imageToPdf");
      const blob = await imagesToPdf(files);
      setResult({ blob, url: URL.createObjectURL(blob) });
      setState("done");
    } catch {
      setState("idle");
      alert("Conversion failed. Please check your images.");
    }
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFiles([]);
    setResult(null);
    setState("idle");
  };

  return (
    <ToolLayout title="Image to PDF" description="Combine one or more images (JPG, PNG, WebP) into a single PDF.">
      {state === "idle" && (
        <div className="space-y-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => document.getElementById("img-pdf-input")?.click()}
            className="cursor-pointer rounded-2xl border-2 border-dashed py-10 flex flex-col items-center gap-2 transition-all"
            style={{
              borderColor: dragging ? "var(--accent)" : "var(--border)",
              background: dragging ? "color-mix(in srgb, var(--accent) 4%, var(--background))" : "var(--card)",
            }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--accent)" }}>
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
            </svg>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Drop images here or <span style={{ color: "var(--accent)" }}>browse</span>
            </p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>JPG, PNG, WebP, GIF</p>
            <input id="img-pdf-input" type="file" accept="image/*" multiple className="hidden"
              onChange={(e) => e.target.files && addFiles(e.target.files)} />
          </div>

          {files.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {files.map((f, i) => {
                const url = URL.createObjectURL(f);
                return (
                  <div key={i} className="relative rounded-xl overflow-hidden aspect-square"
                    style={{ border: "1px solid var(--border)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={f.name} className="w-full h-full object-cover" onLoad={() => URL.revokeObjectURL(url)} />
                    <button onClick={() => setFiles((p) => p.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center"
                      style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}>✕</button>
                  </div>
                );
              })}
            </div>
          )}

          <button onClick={convert} disabled={!files.length}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-40"
            style={{ background: "var(--accent)" }}>
            Convert {files.length > 0 ? `${files.length} image${files.length !== 1 ? "s" : ""}` : "images"} to PDF
          </button>
        </div>
      )}

      {state === "processing" && <ProgressBar label="Building PDF from images..." />}

      {state === "done" && result && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>PDF created from {files.length} image{files.length !== 1 ? "s" : ""}</span>
            </div>
            <button onClick={reset} className="text-xs hover:opacity-70" style={{ color: "var(--muted)" }}>Start over</button>
          </div>
          <div className="p-4">
            <iframe src={result.url} className="w-full rounded-xl" style={{ height: 380, border: "1px solid var(--border)" }} title="PDF Preview" />
          </div>
          <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
            <button onClick={() => downloadBlob(result.blob, "images.pdf")}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "var(--accent)" }}>
              Download PDF
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
