"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { downloadBlob } from "@/lib/utils";

type Mode = "encode" | "decode";

export default function Base64Page() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const run = () => {
    setError(null);
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))));
      }
    } catch {
      setError("Invalid input for " + mode);
      setOutput("");
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout title="Base64 Encoder / Decoder" description="Encode or decode Base64 strings instantly in your browser. Free, no upload.">
      <div className="space-y-4">
        <div className="flex gap-2">
          {(["encode", "decode"] as Mode[]).map((m) => (
            <button key={m} onClick={() => { setMode(m); setOutput(""); setError(null); }}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize"
              style={mode === m
                ? { background: "var(--accent)", color: "#fff" }
                : { background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}>
              {m}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <div className="px-4 py-2.5" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
              <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>INPUT</span>
            </div>
            <textarea value={input} onChange={(e) => { setInput(e.target.value); setError(null); }}
              placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
              spellCheck={false}
              className="w-full p-4 text-sm font-mono resize-none outline-none"
              style={{ background: "var(--background)", color: "var(--foreground)", minHeight: 280 }} />
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <div className="px-4 py-2.5 flex items-center justify-between"
              style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
              <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>OUTPUT</span>
              {output && <button onClick={copy} className="text-xs px-2.5 py-1 rounded-lg"
                style={{ background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-soft-border)" }}>
                {copied ? "Copied!" : "Copy"}
              </button>}
            </div>
            <textarea readOnly value={output} placeholder="Result appears here..."
              spellCheck={false}
              className="w-full p-4 text-sm font-mono resize-none outline-none"
              style={{ background: "var(--background)", color: "var(--foreground)", minHeight: 280 }} />
          </div>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl text-xs font-mono"
            style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={run}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90"
            style={{ background: "linear-gradient(135deg, var(--accent), #a78bfa)" }}>
            {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
          </button>
          {output && (
            <button onClick={() => downloadBlob(new Blob([output], { type: "text/plain" }), `base64-${mode}d.txt`)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90"
              style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
              Download
            </button>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
