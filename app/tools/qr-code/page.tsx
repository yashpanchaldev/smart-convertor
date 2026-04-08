"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { downloadBlob } from "@/lib/utils";

type State = "idle" | "processing" | "done";

export default function QrCodePage() {
  const [state, setState] = useState<State>("idle");
  const [text, setText] = useState("");
  const [size, setSize] = useState(300);
  const [darkColor, setDarkColor] = useState("#000000");
  const [lightColor, setLightColor] = useState("#ffffff");
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [qrBlob, setQrBlob] = useState<Blob | null>(null);

  const generate = async () => {
    if (!text.trim()) return;
    setState("processing");
    try {
      const { generateQrCode } = await import("@/lib/converters/qrCode");
      const blob = await generateQrCode({ text: text.trim(), size, darkColor, lightColor });
      if (qrUrl) URL.revokeObjectURL(qrUrl);
      const url = URL.createObjectURL(blob);
      setQrBlob(blob);
      setQrUrl(url);
      setState("done");
    } catch {
      setState("idle");
      alert("QR generation failed. Please try again.");
    }
  };

  const reset = () => {
    if (qrUrl) URL.revokeObjectURL(qrUrl);
    setQrUrl(null);
    setQrBlob(null);
    setState("idle");
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate a QR code for any URL, text, or contact info. Download as PNG instantly."
    >
      <div className="space-y-4">
        {/* Input */}
        <div className="rounded-xl p-4 space-y-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Text or URL</label>
          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value); if (state === "done") setState("idle"); }}
            placeholder="https://example.com or any text…"
            rows={3}
            className="w-full p-3 rounded-xl text-sm resize-none outline-none leading-relaxed"
            style={{ background: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>Size: {size}px</label>
              <input type="range" min={100} max={600} step={50} value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-[var(--accent)]" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>Dark</label>
                <input type="color" value={darkColor} onChange={(e) => setDarkColor(e.target.value)}
                  className="w-full h-9 rounded-lg cursor-pointer" style={{ border: "1px solid var(--border)" }} />
              </div>
              <div className="flex-1">
                <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>Light</label>
                <input type="color" value={lightColor} onChange={(e) => setLightColor(e.target.value)}
                  className="w-full h-9 rounded-lg cursor-pointer" style={{ border: "1px solid var(--border)" }} />
              </div>
            </div>
          </div>

          <button
            onClick={generate}
            disabled={!text.trim() || state === "processing"}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, var(--accent), #a78bfa)" }}
          >
            {state === "processing" ? "Generating…" : "Generate QR Code"}
          </button>
        </div>

        {/* Preview */}
        {state === "done" && qrUrl && qrBlob && (
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
            <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>QR Code ready</span>
              </div>
              <button onClick={reset} className="text-xs hover:opacity-70" style={{ color: "var(--muted)" }}>Reset</button>
            </div>

            <div className="p-6 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt="Generated QR Code" width={size} height={size}
                className="rounded-xl" style={{ maxWidth: "100%", border: "1px solid var(--border)" }} />
            </div>

            <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
              <button
                onClick={() => downloadBlob(qrBlob, "qrcode.png")}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ background: "var(--accent)" }}
              >
                Download QR Code (PNG)
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
