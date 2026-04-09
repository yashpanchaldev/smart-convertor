"use client";

import { downloadBlob, getFileNameWithoutExt } from "@/lib/utils";

interface Props {
  result: { blob: Blob; url: string };
  file: File;
  ext: string;
  label: string;
  onReset: () => void;
}

export default function ImageResultCard({ result, file, ext, label, onReset }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Converted to {label}</span>
        </div>
        <button onClick={onReset} className="text-xs hover:opacity-70" style={{ color: "var(--muted)" }}>
          Convert another
        </button>
      </div>

      <div className="p-4 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={result.url}
          alt="Converted"
          className="max-w-full rounded-xl object-contain"
          style={{ maxHeight: 320, border: "1px solid var(--border)" }}
        />
      </div>

      <div className="px-5 py-3 text-xs" style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}>
        💾 {(result.blob.size / 1024).toFixed(1)} KB · {label}
      </div>

      <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
        <button
          onClick={() => downloadBlob(result.blob, `${getFileNameWithoutExt(file.name)}.${ext}`)}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ background: "var(--accent)" }}
        >
          Download .{ext}
        </button>
      </div>
    </div>
  );
}
