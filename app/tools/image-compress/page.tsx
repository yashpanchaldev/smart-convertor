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

export default function ImageCompressPage() {
  const [state, setState] = useState<State>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [maxSizeMB, setMaxSizeMB] = useState(1);
  const [result, setResult] = useState<{ blob: Blob; url: string; originalSize: number; compressedSize: number } | null>(null);

  const handleFile = async (f: File) => {
    setState("processing");
    setFile(f);
    try {
      const { compressImage } = await import("@/lib/converters/imageCompress");
      const res = await compressImage(f, maxSizeMB);
      setResult(res);
      setState("done");
    } catch {
      setState("idle");
      alert("Compression failed. Please try a different image.");
    }
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setState("idle");
  };

  const savings = result ? Math.max(0, Math.round((1 - result.compressedSize / result.originalSize) * 100)) : 0;

  return (
    <ToolLayout title="Image Compressor ⭐" description="Compress JPG, PNG, and WebP images without visible quality loss.">
      {state === "idle" && (
        <div className="space-y-4">
          <div className="rounded-xl p-4 space-y-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              Target max size: {maxSizeMB} MB
            </label>
            <input type="range" min={0.1} max={5} step={0.1} value={maxSizeMB}
              onChange={(e) => setMaxSizeMB(parseFloat(e.target.value))}
              className="w-full accent-[var(--accent)]" />
            <div className="flex justify-between text-xs" style={{ color: "var(--muted)" }}>
              <span>0.1 MB (max compression)</span>
              <span>5 MB (light compression)</span>
            </div>
          </div>
          <UploadBox accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            acceptLabel="JPG, PNG, WebP" onFile={handleFile} />
        </div>
      )}
      {state === "processing" && <ProgressBar label="Compressing image..." />}
      {state === "done" && result && file && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Compression complete</span>
            </div>
            <button onClick={reset} className="text-xs hover:opacity-70" style={{ color: "var(--muted)" }}>Compress another</button>
          </div>

          <div className="px-5 py-5 grid grid-cols-3 gap-4 text-center" style={{ borderBottom: "1px solid var(--border)" }}>
            <div>
              <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>Original</p>
              <p className="text-base font-semibold" style={{ color: "var(--foreground)" }}>{formatBytes(result.originalSize)}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>Compressed</p>
              <p className="text-base font-semibold" style={{ color: "var(--foreground)" }}>{formatBytes(result.compressedSize)}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>Saved</p>
              <p className="text-base font-semibold" style={{ color: savings > 0 ? "#22c55e" : "var(--foreground)" }}>
                {savings > 0 ? `${savings}%` : "~0%"}
              </p>
            </div>
          </div>

          <div className="p-4 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.url} alt="Compressed" className="max-w-full rounded-xl object-contain" style={{ maxHeight: 320, border: "1px solid var(--border)" }} />
          </div>

          <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
            <button onClick={() => downloadBlob(result.blob, `${getFileNameWithoutExt(file.name)}-compressed.${file.name.split(".").pop()}`)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "var(--accent)" }}>
              Download Compressed Image
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
