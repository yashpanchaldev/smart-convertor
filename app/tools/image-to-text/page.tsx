"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import { downloadBlob } from "@/lib/utils";

type State = "idle" | "processing" | "done";

export default function ImageToTextPage() {
  const [state, setState] = useState<State>("idle");
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleFile = async (f: File) => {
    setState("processing");
    setProgress(0);
    try {
      const { imageToText } = await import("@/lib/converters/imageToText");
      const result = await imageToText(f, setProgress);
      setText(result.text);
      setConfidence(result.confidence);
      setState("done");
    } catch {
      setState("idle");
      alert("OCR failed. Please try a clearer image.");
    }
  };

  const reset = () => {
    setText("");
    setProgress(0);
    setState("idle");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Image to Text (OCR)"
      description="Extract text from any image — JPG, PNG, or WebP — using OCR. No uploads needed."
    >
      {state === "idle" && (
        <UploadBox
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          acceptLabel="JPG, PNG, WebP"
          onFile={handleFile}
        />
      )}

      {state === "processing" && (
        <div className="rounded-2xl p-8 text-center" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-soft-border)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: "var(--accent)" }}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="14" y2="13" /><line x1="8" y1="17" x2="12" y2="17" />
            </svg>
          </div>
          <p className="text-sm font-medium mb-3" style={{ color: "var(--foreground)" }}>Reading text from image…</p>
          <div className="w-full h-2 rounded-full overflow-hidden mb-2" style={{ background: "var(--border)" }}>
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: "var(--accent)" }} />
          </div>
          <p className="text-xs" style={{ color: "var(--muted)" }}>{progress}% complete</p>
        </div>
      )}

      {state === "done" && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                Text extracted · {confidence}% confidence
              </span>
            </div>
            <button onClick={reset} className="text-xs hover:opacity-70" style={{ color: "var(--muted)" }}>Try another</button>
          </div>

          <textarea
            readOnly
            value={text}
            rows={12}
            className="w-full p-4 text-sm resize-none outline-none leading-relaxed"
            style={{ background: "var(--card)", color: "var(--foreground)" }}
          />

          <div className="px-5 py-4 flex gap-3" style={{ borderTop: "1px solid var(--border)" }}>
            <button
              onClick={copy}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-soft-border)" }}
            >
              {copied ? "Copied!" : "Copy Text"}
            </button>
            <button
              onClick={() => downloadBlob(new Blob([text], { type: "text/plain" }), "extracted-text.txt")}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "var(--accent)" }}
            >
              Download .txt
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
