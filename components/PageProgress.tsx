"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    // Start
    setProgress(0);
    setVisible(true);

    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 85) { clearInterval(timerRef.current!); return 85; }
        return p + Math.random() * 12;
      });
    }, 120);

    // Finish after a short delay
    const finish = setTimeout(() => {
      clearInterval(timerRef.current!);
      setProgress(100);
      setTimeout(() => setVisible(false), 300);
    }, 600);

    return () => {
      clearInterval(timerRef.current!);
      clearTimeout(finish);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[9999] h-[2px] transition-all duration-200 ease-out"
      style={{
        width: `${progress}%`,
        background: "var(--accent)",
        boxShadow: "0 0 8px var(--accent)",
        opacity: progress >= 100 ? 0 : 1,
        transition: progress >= 100
          ? "opacity 0.3s ease, width 0.2s ease"
          : "width 0.2s ease",
      }}
    />
  );
}
