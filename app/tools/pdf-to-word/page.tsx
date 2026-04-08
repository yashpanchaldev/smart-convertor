"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import ProgressBar from "@/components/ProgressBar";
import { downloadBlob, getFileNameWithoutExt } from "@/lib/utils";

type State = "idle" | "processing" | "done";

export default function PdfToWordPage() {
  const [state, setState] = useState<State>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Blob | null>(null);

  const handleFile = async (f: File) => {
    setState("processing");
    setFile(f);
    try {
      const { pdfToWord } = await import("@/lib/converters/pdfToWord");
      const blob = await pdfToWord(f);
      setResult(blob);
      setState("done");
    } catch {
      setState("idle");
      alert("Conversion failed. Make sure the file is a valid PDF.");
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setState("idle");
  };

  return (
    <ToolLayout
      title="PDF to Word"
      description="Convert PDF files to editable .docx Word documents — right in your browser."
    >
      {state === "idle" && (
        <UploadBox accept=".pdf,application/pdf" acceptLabel=".pdf files" onFile={handleFile} />
      )}
      {state === "processing" && <ProgressBar label="Converting PDF to Word..." />}
      {state === "done" && result && file && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Conversion complete</span>
            </div>
            <button onClick={reset} className="text-xs hover:opacity-70" style={{ color: "var(--muted)" }}>Convert another</button>
          </div>

          <div className="px-5 py-8 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--accent-soft), color-mix(in srgb, #a78bfa 10%, transparent))", border: "1px solid var(--accent-soft-border)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: "var(--accent)" }}>
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>
                {getFileNameWithoutExt(file.name)}.docx
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Ready to download · {(result.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>

          <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
            <button
              onClick={() => downloadBlob(result, `${getFileNameWithoutExt(file.name)}.docx`)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "var(--accent)" }}
            >
              Download .docx
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
