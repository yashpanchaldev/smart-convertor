"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import ProgressBar from "@/components/ProgressBar";
import { downloadBlob, getFileNameWithoutExt } from "@/lib/utils";

type State = "idle" | "processing" | "done";

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

export default function PdfCompressPage() {
  const [state, setState] = useState<State>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);

  const handleFile = async (f: File) => {
    setState("processing");
    setFile(f);
    try {
      const { compressPdf } = await import("@/lib/converters/pdfCompress");
      const blob = await compressPdf(f);
      setResult({ blob, url: URL.createObjectURL(blob) });
      setState("done");
    } catch {
      setState("idle");
      alert("Compression failed. Make sure the file is a valid PDF.");
    }
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setState("idle");
  };

  const savings = file && result
    ? Math.max(0, Math.round((1 - result.blob.size / file.size) * 100))
    : 0;

  return (
    <ToolLayout title="PDF Compress ⭐" description="Reduce PDF file size while preserving quality. No quality loss on text-based PDFs.">
      {state === "idle" && (
        <UploadBox accept=".pdf,application/pdf" acceptLabel=".pdf files" onFile={handleFile} />
      )}
      {state === "processing" && <ProgressBar label="Compressing PDF..." />}
      {state === "done" && result && file && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Compression complete</span>
            </div>
            <button onClick={reset} className="text-xs hover:opacity-70" style={{ color: "var(--muted)" }}>Compress another</button>
          </div>

          {/* Stats */}
          <div className="px-5 py-5 grid grid-cols-3 gap-4 text-center" style={{ borderBottom: "1px solid var(--border)" }}>
            <div>
              <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>Original</p>
              <p className="text-base font-semibold" style={{ color: "var(--foreground)" }}>{formatBytes(file.size)}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>Compressed</p>
              <p className="text-base font-semibold" style={{ color: "var(--foreground)" }}>{formatBytes(result.blob.size)}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>Saved</p>
              <p className="text-base font-semibold" style={{ color: savings > 0 ? "#22c55e" : "var(--foreground)" }}>
                {savings > 0 ? `${savings}%` : "~0%"}
              </p>
            </div>
          </div>

          {/* Progress bar visual */}
          <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${100 - savings}%` }} />
            </div>
            <p className="text-xs mt-1.5" style={{ color: "var(--muted)" }}>
              {savings > 0 ? `File reduced by ${savings}%` : "File is already well-optimized"}
            </p>
          </div>

          <div className="p-4">
            <iframe src={result.url} className="w-full rounded-xl" style={{ height: 360, border: "1px solid var(--border)" }} title="Compressed PDF" />
          </div>

          <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
            <button onClick={() => downloadBlob(result.blob, `${getFileNameWithoutExt(file.name)}-compressed.pdf`)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "var(--accent)" }}>
              Download Compressed PDF
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
