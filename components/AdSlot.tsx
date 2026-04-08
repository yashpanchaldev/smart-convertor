interface AdSlotProps {
  label?: string;
  className?: string;
  height?: number;
}

export default function AdSlot({ label = "Advertisement", className = "", height = 90 }: AdSlotProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl text-xs ${className}`}
      style={{
        height,
        background: "var(--card)",
        border: "1px dashed var(--border)",
        color: "var(--muted)",
      }}
    >
      {label}
    </div>
  );
}
