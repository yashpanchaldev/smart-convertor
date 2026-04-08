"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import ProgressBar from "@/components/ProgressBar";
import { downloadBlob } from "@/lib/utils";
import type { PageImage } from "@/lib/converters/pdfToImage";

type State = "idle" | "processing" | "done";
type Format = "jpeg" | "png";

export default function PdfToImagePage() {
  const [state, setState] = useState<State>("idle");
  const [format, setFormat] = useState<Format>("jpeg");
  const [images, setImages] = useState<PageImage[]>([]);
  const [fileName, setFileName] = useState("");

  const handleFile = async (file: File) => {
    setState("processing");
    setFileName(file.name.replace(".pdf", ""));
    try {
      const { pdfToImages } = await import("@/lib/converters/pdfToImage");
      const imgs = await pdfToImages(file, format);
      setImages(imgs);
      setState("done");
    } catch {
      setState("idle");
      alert("Conversion failed. Make sure the PDF is valid.");
    }
  };

  const downloadAll = async () => {
    for (const img of images) {
      const res = await fetch(img.dataUrl);
      const blob = await res.blob();
      downloadBlob(blob, `${fileName}-page-${img.page}.${format}`);
      await new Promise((r) => setTimeout(r, 100));
    }
  };

  const reset = () => { setImages([]); setState("idle"); };

  return (
    <ToolLayout title="PDF to Image" description="Convert each PDF page to a JPG or PNG image.">
      {state === "idle" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {(["jpeg", "png"] as Format[]).map((f) => (
              <button key={f} onClick={() => setFormat(f)}
                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={format === f
                  ? { background: "var(--accent)", color: "#fff" }
                  : { background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}>
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <UploadBox accept=".pdf,application/pdf" acceptLabel=".pdf files" onFile={handleFile} />
        </div>
      )}
      {state === "processing" && <ProgressBar label="Rendering PDF pages..." />}
      {state === "done" && images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{images.length} page{images.length !== 1 ? "s" : ""} converted</span>
            </div>
            <div className="flex gap-2">
              <button onClick={downloadAll} className="text-xs px-3 py-1.5 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--accent)" }}>
                Download All
              </button>
              <button onClick={reset} className="text-xs hover:opacity-70" style={{ color: "var(--muted)" }}>Start over</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((img) => (
              <div key={img.page} className="rounded-xl overflow-hidden group relative"
                style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.dataUrl} alt={`Page ${img.page}`} className="w-full object-cover" style={{ maxHeight: 200 }} />
                <div className="px-3 py-2 flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--muted)" }}>Page {img.page}</span>
                  <button onClick={async () => {
                    const res = await fetch(img.dataUrl);
                    const blob = await res.blob();
                    downloadBlob(blob, `${fileName}-page-${img.page}.${format}`);
                  }} className="text-xs hover:opacity-70 transition-opacity" style={{ color: "var(--accent)" }}>
                    ↓ Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
