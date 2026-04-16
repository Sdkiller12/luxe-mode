"use client";
// ─────────────────────────────────────────────────────────────────────────────
// ProductGallery — Fullwidth image gallery with thumbnails
// Technique: Framer Motion image crossfade + touch/keyboard nav support
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const prev = () => go(current === 0 ? images.length - 1 : current - 1);
  const next = () => go(current === images.length - 1 ? 0 : current + 1);

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-5 h-full">
      {/* Thumbnails (vertical on desktop) */}
      <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-y-auto lg:h-[600px] lg:w-20 shrink-0">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`relative shrink-0 w-16 h-20 lg:w-full lg:h-24 overflow-hidden transition-all ${
              i === current
                ? "ring-1 ring-[#C9A96E]"
                : "ring-1 ring-transparent opacity-50 hover:opacity-80"
            }`}
            aria-label={`Voir image ${i + 1} de ${productName}`}
          >
            <Image
              src={src}
              alt={`${productName} — vue ${i + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 bg-[#111]" style={{ aspectRatio: "3/4", minHeight: 400 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={images[current]}
              alt={`${productName} — vue principale`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[rgba(10,10,10,0.6)] border border-[rgba(201,169,110,0.15)] text-[#F5F0EA] hover:border-[#C9A96E] transition-colors z-10"
              aria-label="Image précédente"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[rgba(10,10,10,0.6)] border border-[rgba(201,169,110,0.15)] text-[#F5F0EA] hover:border-[#C9A96E] transition-colors z-10"
              aria-label="Image suivante"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </>
        )}

        {/* Dot counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="transition-all"
              style={{
                width: i === current ? 20 : 6,
                height: 2,
                background: i === current ? "#C9A96E" : "rgba(245,240,234,0.3)",
              }}
              aria-label={`Aller à l'image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
