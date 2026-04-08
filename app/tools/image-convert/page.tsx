"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import ProgressBar from "@/components/ProgressBar";
import { downloadBlob, getFileNameWithoutExt } from "@/lib/utils";
import type { ImageFormat } from "@/lib/converters/imageConvert";

type State = "idle" | "processing" | "done";

const FORMATS: ImageFormat[] = ["jpeg", "png", "webp"];

export default function ImageConvertPage() {
  const [state, setState] = useState<State>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>("png");
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);

  const handleFile = async (f: File) => {
    setState("processing");
    setFile(f);
    try {
      const { convertImageFormat } = await import("@/lib/converters/imageConvert");
      const res = await convertImageFormat(f, targetFormat);
      setResult(res);
      setState("done");
    } catch {
      setState("idle");
      alert("Conversion failed. Please try a different image.");
    }
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setState("idle");
  };

  const ext = targetFormat === "jpeg" ? "jpg" : targetFormat;

  return (
    <ToolLayout title="JPG ↔ PNG Converter" description="Convert images between JPG, PNG, and WebP formats instantly.">
      {state === "idle" && (
        <div className="space-y-4">
          <div className="rounded-xl p-4 space-y-2" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Convert to</p>
            <div className="flex gap-2">
              {FORMATS.map((f) => (
                <button key={f} onClick={() => setTargetFormat(f)}
                  className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
                  style={targetFormat === f
                    ? { background: "var(--accent)", color: "#fff" }
                    : { background: "var(--background)", border: "1px solid var(--border)", color: "var(--muted)" }}>
                  {f === "jpeg" ? "JPG" : f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <UploadBox accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
            acceptLabel="JPG, PNG, WebP, GIF" onFile={handleFile} />
        </div>
      )}
      {state === "processing" && <ProgressBar label={`Converting to ${targetFormat.toUpperCase()}...`} />}
      {state === "done" && result && file && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                Converted to {targetFormat === "jpeg" ? "JPG" : targetFormat.toUpperCase()}
              </span>
            </div>
            <button onClick={reset} className="text-xs hover:opacity-70" style={{ color: "var(--muted)" }}>Convert another</button>
          </div>
          <div className="p-4 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.url} alt="Converted" className="max-w-full rounded-xl object-contain" style={{ maxHeight: 320, border: "1px solid var(--border)" }} />
          </div>
          <div className="px-5 py-3 text-xs" style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}>
            💾 {(result.blob.size / 1024).toFixed(1)} KB · {targetFormat === "jpeg" ? "JPG" : targetFormat.toUpperCase()}
          </div>
          <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
            <button onClick={() => downloadBlob(result.blob, `${getFileNameWithoutExt(file.name)}.${ext}`)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "var(--accent)" }}>
              Download .{ext}
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
