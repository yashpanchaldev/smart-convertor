"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import ProgressBar from "@/components/ProgressBar";
import { downloadBlob, getFileNameWithoutExt } from "@/lib/utils";

type State = "idle" | "loading" | "ready" | "processing" | "done";

export default function ImageResizePage() {
  const [state, setState] = useState<State>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [origDims, setOrigDims] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockAspect, setLockAspect] = useState(true);
  const [result, setResult] = useState<{ blob: Blob; url: string; width: number; height: number } | null>(null);

  const handleFile = async (f: File) => {
    setState("loading");
    setFile(f);
    try {
      const { getImageDimensions } = await import("@/lib/converters/imageResize");
      const dims = await getImageDimensions(f);
      setOrigDims(dims);
      setWidth(String(dims.width));
      setHeight(String(dims.height));
      setState("ready");
    } catch {
      setState("idle");
      alert("Could not read image dimensions.");
    }
  };

  const onWidthChange = (val: string) => {
    setWidth(val);
    if (lockAspect && origDims.width && val) {
      const ratio = origDims.height / origDims.width;
      setHeight(String(Math.round(parseInt(val) * ratio)));
    }
  };

  const onHeightChange = (val: string) => {
    setHeight(val);
    if (lockAspect && origDims.height && val) {
      const ratio = origDims.width / origDims.height;
      setWidth(String(Math.round(parseInt(val) * ratio)));
    }
  };

  const resize = async () => {
    if (!file) return;
    setState("processing");
    try {
      const { resizeImage } = await import("@/lib/converters/imageResize");
      const res = await resizeImage(file, parseInt(width) || 0, parseInt(height) || 0, lockAspect);
      setResult(res);
      setState("done");
    } catch {
      setState("ready");
      alert("Resize failed. Please try again.");
    }
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setState("idle");
  };

  return (
    <ToolLayout title="Resize Image" description="Resize any image to exact dimensions or by percentage.">
      {state === "idle" && (
        <UploadBox accept="image/*" acceptLabel="Any image format" onFile={handleFile} />
      )}
      {state === "loading" && <ProgressBar label="Reading image..." />}
      {state === "ready" && (
        <div className="space-y-4">
          <div className="rounded-xl p-4 text-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <span style={{ color: "var(--foreground)" }}>{file?.name}</span>
            <span className="ml-3" style={{ color: "var(--muted)" }}>{origDims.width} × {origDims.height}px</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>Width (px)</label>
                <input type="number" value={width} onChange={(e) => onWidthChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }} />
              </div>
              <div className="pt-5">
                <button onClick={() => setLockAspect((v) => !v)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    background: lockAspect ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "var(--card)",
                    border: "1px solid var(--border)",
                    color: lockAspect ? "var(--accent)" : "var(--muted)",
                  }}
                  title={lockAspect ? "Unlock aspect ratio" : "Lock aspect ratio"}>
                  🔗
                </button>
              </div>
              <div className="flex-1">
                <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>Height (px)</label>
                <input type="number" value={height} onChange={(e) => onHeightChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }} />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={reset} className="flex-1 py-2.5 rounded-xl text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
              Change image
            </button>
            <button onClick={resize} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "var(--accent)" }}>
              Resize
            </button>
          </div>
        </div>
      )}
      {state === "processing" && <ProgressBar label="Resizing image..." />}
      {state === "done" && result && file && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                Resized to {result.width} × {result.height}px
              </span>
            </div>
            <button onClick={reset} className="text-xs hover:opacity-70" style={{ color: "var(--muted)" }}>Resize another</button>
          </div>
          <div className="p-4 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.url} alt="Resized" className="max-w-full rounded-xl object-contain" style={{ maxHeight: 320, border: "1px solid var(--border)" }} />
          </div>
          <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
            <button onClick={() => downloadBlob(result.blob, `${getFileNameWithoutExt(file.name)}-${result.width}x${result.height}.${file.name.split(".").pop()}`)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "var(--accent)" }}>
              Download Resized Image
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
