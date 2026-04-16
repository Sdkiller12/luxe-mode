"use client";
// ─────────────────────────────────────────────────────────────────────────────
// Marquee — Infinite scrolling text ribbon
// Technique: CSS animation + duplicate of items to create seamless loop
// Used as a divider section with editorial "silence is luxury" quotes
// ─────────────────────────────────────────────────────────────────────────────

const items = [
  "Silence is Luxury",
  "✦",
  "Savoir-Faire",
  "✦",
  "Paris 2025",
  "✦",
  "Mode Intemporelle",
  "✦",
  "Artisanat Premium",
  "✦",
  "Précision & Silence",
  "✦",
];

interface MarqueeProps {
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export default function Marquee({ speed = 25, direction = "left", className = "" }: MarqueeProps) {
  const duplicated = [...items, ...items]; // duplicate for seamless loop

  return (
    <div
      className={`overflow-hidden border-y border-[rgba(201,169,110,0.1)] py-5 ${className}`}
      aria-hidden
    >
      <div
        className="flex items-center gap-10 whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite ${direction === "right" ? "reverse" : ""}`,
          width: "max-content",
        }}
      >
        {duplicated.map((item, i) => (
          <span
            key={i}
            className={
              item === "✦"
                ? "text-[#C9A96E] text-sm"
                : "text-label text-[#888070] tracking-[0.25em]"
            }
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
