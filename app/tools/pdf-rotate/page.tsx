"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import ProgressBar from "@/components/ProgressBar";
import { downloadBlob, getFileNameWithoutExt } from "@/lib/utils";
import type { RotateAngle } from "@/lib/converters/pdfRotate";

type State = "idle" | "processing" | "done";

const ANGLES: { label: string; value: RotateAngle }[] = [
  { label: "90° Clockwise", value: 90 },
  { label: "180°", value: 180 },
  { label: "270° (90° CCW)", value: 270 },
];

export default function PdfRotatePage() {
  const [state, setState] = useState<State>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<RotateAngle>(90);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);

  const handleFile = async (f: File) => {
    setState("processing");
    setFile(f);
    try {
      const { rotatePdf } = await import("@/lib/converters/pdfRotate");
      const blob = await rotatePdf(f, angle);
      setResult({ blob, url: URL.createObjectURL(blob) });
      setState("done");
    } catch {
      setState("idle");
      alert("Rotation failed. Make sure the file is a valid PDF.");
    }
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setState("idle");
  };

  return (
    <ToolLayout
      title="PDF Rotate"
      description="Rotate all pages in a PDF by 90°, 180°, or 270°. Instant, browser-based."
    >
      {state === "idle" && (
        <div className="space-y-4">
          {/* Angle picker */}
          <div className="rounded-xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--foreground)" }}>Rotation angle</p>
            <div className="flex flex-wrap gap-2">
              {ANGLES.map((a) => (
                <button
                  key={a.value}
                  onClick={() => setAngle(a.value)}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={angle === a.value
                    ? { background: "var(--accent)", color: "#fff", boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }
                    : { background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          <UploadBox accept=".pdf,application/pdf" acceptLabel=".pdf files" onFile={handleFile} />
        </div>
      )}

      {state === "processing" && <ProgressBar label="Rotating PDF pages..." />}

      {state === "done" && result && file && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                Rotated {angle}° · All pages
              </span>
            </div>
            <button onClick={reset} className="text-xs hover:opacity-70" style={{ color: "var(--muted)" }}>Rotate another</button>
          </div>

          <div className="p-4">
            <iframe src={result.url} className="w-full rounded-xl" style={{ height: 360, border: "1px solid var(--border)" }} title="Rotated PDF" />
          </div>

          <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
            <button
              onClick={() => downloadBlob(result.blob, `${getFileNameWithoutExt(file.name)}-rotated.pdf`)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "var(--accent)" }}
            >
              Download Rotated PDF
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
