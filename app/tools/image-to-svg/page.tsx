"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import ProgressBar from "@/components/ProgressBar";
import ImageResultCard from "@/components/ImageResultCard";

type State = "idle" | "processing" | "done";

export default function ImageToSvgPage() {
  const [state, setState] = useState<State>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);

  const handleFile = async (f: File) => {
    setState("processing");
    setFile(f);
    try {
      const { convertImageFormat } = await import("@/lib/converters/imageConvert");
      const res = await convertImageFormat(f, "svg");
      setResult(res);
      setState("done");
    } catch {
      setState("idle");
      alert("Conversion failed. Please try a different image.");
    }
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null); setResult(null); setState("idle");
  };

  return (
    <ToolLayout
      title="Image to SVG Converter"
      description="Wrap JPG, PNG, or WebP images inside an SVG container. Free, instant, no upload needed."
    >
      {state === "idle" && (
        <>
          <div className="rounded-xl px-4 py-3 mb-4 text-xs" style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-soft-border)", color: "var(--accent)" }}>
            ℹ️ This embeds your raster image inside an SVG wrapper. For full vector tracing, use a dedicated tool like Inkscape.
          </div>
          <UploadBox
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            acceptLabel="JPG, PNG, WebP"
            onFile={handleFile}
          />
        </>
      )}
      {state === "processing" && <ProgressBar label="Wrapping image as SVG..." />}
      {state === "done" && result && file && (
        <ImageResultCard result={result} file={file} ext="svg" label="SVG" onReset={reset} />
      )}
    </ToolLayout>
  );
}
