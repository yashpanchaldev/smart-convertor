import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #6366f1, #a78bfa)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="110"
          height="110"
          viewBox="0 0 64 64"
          fill="none"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 18 Q14 12 20 12 L30 12 Q36 12 36 18 Q36 24 30 27 L20 30 Q14 33 14 39 Q14 45 20 45 L36 45" />
          <path d="M50 20 Q44 12 36 14 Q28 16 28 32 Q28 48 36 50 Q44 52 50 44" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
