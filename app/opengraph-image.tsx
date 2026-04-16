import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SmartConverter – Free Online File Converter";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top: logo + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 18,
            background: "linear-gradient(135deg, #6366f1, #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="44" height="44" viewBox="0 0 64 64" fill="none"
              stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 18 Q14 12 20 12 L30 12 Q36 12 36 18 Q36 24 30 27 L20 30 Q14 33 14 39 Q14 45 20 45 L36 45" />
              <path d="M50 20 Q44 12 36 14 Q28 16 28 32 Q28 48 36 50 Q44 52 50 44" />
            </svg>
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: "white" }}>Smart</span>
            <span style={{ fontSize: 32, fontWeight: 700, color: "#a78bfa" }}>Converter</span>
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 68, fontWeight: 800, color: "white", lineHeight: 1.1 }}>
              Free Online
            </span>
            <span style={{ fontSize: 68, fontWeight: 800, color: "#a78bfa", lineHeight: 1.1 }}>
              File Converter
            </span>
          </div>
          <span style={{ fontSize: 26, color: "#94a3b8" }}>
            24 tools · PDF · Images · Documents · Developer Tools
          </span>
        </div>

        {/* Bottom: pills + url */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {["No Signup", "No Uploads", "100% Free", "100% Private"].map((label) => (
              <div key={label} style={{
                display: "flex",
                padding: "10px 22px", borderRadius: 24,
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.3)",
                color: "#a78bfa", fontSize: 18, fontWeight: 600,
              }}>
                {label}
              </div>
            ))}
          </div>
          <span style={{ fontSize: 20, color: "#475569" }}>
            smart-convertor.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
