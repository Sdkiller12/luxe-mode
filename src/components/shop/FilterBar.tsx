"use client";
// ─────────────────────────────────────────────────────────────────────────────
// FilterBar — Animated category filter chips (no page reload)
// Technique: Framer Motion layout transition on active chip underline
// ─────────────────────────────────────────────────────────────────────────────
import { motion } from "framer-motion";
import { categories, Category } from "@/lib/data";

interface FilterBarProps {
  active: Category;
  onChange: (cat: Category) => void;
  counts: Record<string, number>;
}

export default function FilterBar({ active, onChange, counts }: FilterBarProps) {
  return (
    <div
      className="flex items-center gap-1 overflow-x-auto pb-px scrollbar-none"
      role="tablist"
      aria-label="Filtrer par catégorie"
    >
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            role="tab"
            aria-selected={isActive}
            className="relative filter-chip shrink-0"
            id={`filter-${cat.toLowerCase()}`}
          >
            <span>{cat}</span>
            {counts[cat] !== undefined && (
              <span className="ml-1.5 text-[0.55rem] opacity-60">
                ({counts[cat]})
              </span>
            )}

            {/* Animated active indicator */}
            {isActive && (
              <motion.div
                layoutId="filter-active"
                className="absolute inset-0 border border-[#C9A96E] bg-[rgba(201,169,110,0.05)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ zIndex: -1 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
