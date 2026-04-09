"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import ProgressBar from "@/components/ProgressBar";
import ImageResultCard from "@/components/ImageResultCard";

type State = "idle" | "processing" | "done";

export default function JpgToPngPage() {
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
      alert("Conversion failed. Please try a different image.");
    }
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null); setResult(null); setState("idle");
  };

  return (
    <ToolLayout
      title="JPG to PNG Converter"
      description="Convert JPG images to PNG format instantly. Preserves transparency. Free, no upload needed."
    >
      {state === "idle" && (
        <UploadBox accept="image/jpeg,.jpg,.jpeg" acceptLabel="JPG / JPEG files" onFile={handleFile} />
      )}
      {state === "processing" && <ProgressBar label="Converting JPG to PNG..." />}
      {state === "done" && result && file && (
        <ImageResultCard result={result} file={file} ext="png" label="PNG" onReset={reset} />
      )}
    </ToolLayout>
  );
}
