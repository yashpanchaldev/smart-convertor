"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import ProgressBar from "@/components/ProgressBar";
import ImageResultCard from "@/components/ImageResultCard";

type State = "idle" | "processing" | "done";

export default function SvgToPngPage() {
  const [state, setState] = useState<State>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);

  const handleFile = async (f: File) => {
    setState("processing");
    setFile(f);
    try {
      const { convertImageFormat } = await import("@/lib/converters/imageConvert");
      const res = await convertImageFormat(f, "png");
      setResult(res);
      setState("done");
    } catch {
      setState("idle");
      alert("Conversion failed. Please try a different SVG.");
    }
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null); setResult(null); setState("idle");
  };

  return (
    <ToolLayout
      title="SVG to PNG Converter"
      description="Convert SVG vector files to PNG images instantly. Free, browser-based, no upload needed."
    >
      {state === "idle" && (
        <UploadBox accept="image/svg+xml,.svg" acceptLabel="SVG files" onFile={handleFile} />
      )}
      {state === "processing" && <ProgressBar label="Converting SVG to PNG..." />}
      {state === "done" && result && file && (
        <ImageResultCard result={result} file={file} ext="png" label="PNG" onReset={reset} />
      )}
    </ToolLayout>
  );
}
