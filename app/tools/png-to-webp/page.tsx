"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import ProgressBar from "@/components/ProgressBar";
import ImageResultCard from "@/components/ImageResultCard";

type State = "idle" | "processing" | "done";

export default function PngToWebpPage() {
  const [state, setState] = useState<State>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);

  const handleFile = async (f: File) => {
    setState("processing");
    setFile(f);
    try {
      const { convertImageFormat } = await import("@/lib/converters/imageConvert");
      const res = await convertImageFormat(f, "webp");
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
      title="PNG to WebP Converter"
      description="Convert PNG images to WebP format for smaller file sizes. Free, instant, no upload needed."
    >
      {state === "idle" && (
        <UploadBox accept="image/png,.png" acceptLabel="PNG files" onFile={handleFile} />
      )}
      {state === "processing" && <ProgressBar label="Converting PNG to WebP..." />}
      {state === "done" && result && file && (
        <ImageResultCard result={result} file={file} ext="webp" label="WebP" onReset={reset} />
      )}
    </ToolLayout>
  );
}
