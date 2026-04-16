"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import { downloadBlob } from "@/lib/utils";

type Tab = "format" | "minify" | "validate";
type IndentSize = 2 | 4;

function formatJson(raw: string, indent: IndentSize): string {
  const parsed = JSON.parse(raw);
  return JSON.stringify(parsed, null, indent);
}

function minifyJson(raw: string): string {
  return JSON.stringify(JSON.parse(raw));
}

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [tab, setTab] = useState<Tab>("format");
  const [indent, setIndent] = useState<IndentSize>(2);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [validMsg, setValidMsg] = useState<string | null>(null);

  const run = useCallback(() => {
    setError(null);
    setValidMsg(null);
    if (!input.trim()) return;
    try {
      if (tab === "format") {
        setOutput(formatJson(input, indent));
      } else if (tab === "minify") {
        setOutput(minifyJson(input));
      } else {
        JSON.parse(input);
        setValidMsg("✅ Valid JSON");
        setOutput(formatJson(input, indent));
      }
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input, tab, indent]);

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setInput(""); setOutput(""); setError(null); setValidMsg(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      name: "SmartConverter",
      version: "1.0.0",
      tools: ["JSON Formatter", "PDF Compress", "Image Convert"],
      meta: { free: true, browserBased: true, uploads: false },
    }));
    setError(null); setOutput(""); setValidMsg(null);
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: "format",   label: "Format / Beautify" },
    { key: "minify",   label: "Minify / Compact" },
    { key: "validate", label: "Validate" },
  ];

  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, beautify, minify and validate JSON online. Free, instant, runs in your browser."
    >
      <div className="space-y-4">

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => { setTab(t.key); setError(null); setValidMsg(null); }}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={tab === t.key
                ? { background: "var(--accent)", color: "#fff", boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }
                : { background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}>
              {t.label}
            </button>
          ))}
          {tab === "format" && (
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs" style={{ color: "var(--muted)" }}>Indent:</span>
              {([2, 4] as IndentSize[]).map((n) => (
                <button key={n} onClick={() => setIndent(n)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={indent === n
                    ? { background: "var(--accent)", color: "#fff" }
                    : { background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}>
                  {n} spaces
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Editor area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input */}
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <div className="px-4 py-2.5 flex items-center justify-between"
              style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
              <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>INPUT</span>
              <div className="flex gap-2">
                <button onClick={loadSample} className="text-xs px-2.5 py-1 rounded-lg transition-all hover:opacity-80"
                  style={{ background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-soft-border)" }}>
                  Sample
                </button>
                <button onClick={clear} className="text-xs px-2.5 py-1 rounded-lg transition-all hover:opacity-80"
                  style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}>
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(null); setValidMsg(null); }}
              placeholder={'Paste your JSON here...\n{\n  "key": "value"\n}'}
              spellCheck={false}
              className="w-full p-4 text-sm font-mono resize-none outline-none leading-relaxed"
              style={{ background: "var(--background)", color: "var(--foreground)", minHeight: 360 }}
            />
          </div>

          {/* Output */}
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <div className="px-4 py-2.5 flex items-center justify-between"
              style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
              <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>OUTPUT</span>
              {output && (
                <button onClick={copy} className="text-xs px-2.5 py-1 rounded-lg transition-all hover:opacity-80"
                  style={{ background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-soft-border)" }}>
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <textarea
              readOnly
              value={output}
              placeholder="Output will appear here..."
              spellCheck={false}
              className="w-full p-4 text-sm font-mono resize-none outline-none leading-relaxed"
              style={{ background: "var(--background)", color: "var(--foreground)", minHeight: 360 }}
            />
          </div>
        </div>

        {/* Error / valid message */}
        {error && (
          <div className="flex items-start gap-2 px-4 py-3 rounded-xl text-sm"
            style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 flex-shrink-0">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="font-mono text-xs">{error}</span>
          </div>
        )}
        {validMsg && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
            style={{ background: "rgba(34,197,94,0.08)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>
            {validMsg}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button onClick={run}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, var(--accent), #a78bfa)", minWidth: 140 }}>
            {tab === "format" ? "Format / Beautify" : tab === "minify" ? "Minify / Compact" : "Validate JSON"}
          </button>
          {output && (
            <button
              onClick={() => downloadBlob(new Blob([output], { type: "application/json" }), "formatted.json")}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
              Download .json
            </button>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
