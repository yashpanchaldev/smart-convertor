"use client";

import { useEffect, useState } from "react";

interface ProgressBarProps {
  label?: string;
}

const STEPS = [
  { pct: 15, msg: "Reading your file..." },
  { pct: 35, msg: "Parsing content..." },
  { pct: 55, msg: "Processing data..." },
  { pct: 75, msg: "Generating output..." },
  { pct: 90, msg: "Almost there..." },
];

const DOTS = Array.from({ length: 6 }, (_, i) => ({
  size: 3 + Math.random() * 4,
  x: 10 + Math.random() * 80,
  delay: i * 0.4,
  duration: 2 + Math.random() * 2,
}));

export default function ProgressBar({ label }: ProgressBarProps) {
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    // Animate progress percentage smoothly
    let current = 0;
    const target = STEPS[step]?.pct ?? 90;

    const tick = setInterval(() => {
      current += (target - current) * 0.08;
      setPct(Math.round(current));
      if (Math.abs(target - current) < 0.5) clearInterval(tick);
    }, 40);

    return () => clearInterval(tick);
  }, [step]);

  useEffect(() => {
    // Advance through steps
    if (step >= STEPS.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), 1200 + step * 300);
    return () => clearTimeout(t);
  }, [step]);

  const message = label ?? STEPS[step]?.msg ?? "Processing...";

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      {/* Ambient glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, var(--accent) 8%, transparent), transparent)",
        }}
      />

      {/* Floating dots */}
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.x}%`,
            bottom: "20%",
            background: "var(--accent)",
            opacity: 0.18,
            animation: `float-dot ${d.duration}s ${d.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      <div className="relative px-8 py-10 flex flex-col items-center gap-6">
        {/* Animated icon ring */}
        <div className="relative flex items-center justify-center">
          {/* Outer spinning ring */}
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            className="absolute"
            style={{ animation: "spin-slow 2.4s linear infinite" }}
          >
            <circle
              cx="36" cy="36" r="32"
              fill="none"
              strokeWidth="2"
              stroke="var(--accent)"
              strokeOpacity="0.15"
            />
            <circle
              cx="36" cy="36" r="32"
              fill="none"
              strokeWidth="2.5"
              stroke="var(--accent)"
              strokeLinecap="round"
              strokeDasharray="50 150"
              strokeDashoffset="0"
            />
          </svg>

          {/* Inner counter-spin ring */}
          <svg
            width="54"
            height="54"
            viewBox="0 0 54 54"
            className="absolute"
            style={{ animation: "spin-slow 1.8s linear infinite reverse" }}
          >
            <circle
              cx="27" cy="27" r="22"
              fill="none"
              strokeWidth="1.5"
              stroke="var(--accent)"
              strokeOpacity="0.25"
              strokeDasharray="20 80"
            />
          </svg>

          {/* Center icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "color-mix(in srgb, var(--accent) 14%, transparent)",
              border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
            }}
          >
            <svg
              width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.8"
              style={{ color: "var(--accent)", animation: "pulse-icon 1.6s ease-in-out infinite" }}
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <polyline points="13 2 13 9 20 9" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="16" y2="17" />
            </svg>
          </div>
        </div>

        {/* Label */}
        <div className="text-center space-y-1">
          <p
            className="text-sm font-medium transition-all duration-500"
            style={{ color: "var(--foreground)" }}
          >
            {message}
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            This usually takes a few seconds
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full space-y-2">
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--border)" }}
          >
            {/* Shimmer track */}
            <div
              className="h-full rounded-full relative overflow-hidden transition-all duration-700 ease-out"
              style={{
                width: `${pct}%`,
                background: "var(--accent)",
              }}
            >
              <span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                  animation: "shimmer 1.4s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              {STEPS.map((_, i) => (
                <span
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i <= step ? 16 : 6,
                    height: 6,
                    background: i <= step ? "var(--accent)" : "var(--border)",
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>
              {pct}%
            </span>
          </div>
        </div>

        {/* Privacy note */}
        <div
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
          style={{
            background: "color-mix(in srgb, var(--accent) 6%, transparent)",
            color: "var(--muted)",
            border: "1px solid color-mix(in srgb, var(--accent) 12%, transparent)",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Processing locally — your file never leaves this device
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-icon {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.88); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes float-dot {
          from { transform: translateY(0px); }
          to   { transform: translateY(-18px); }
        }
      `}</style>
    </div>
  );
}
