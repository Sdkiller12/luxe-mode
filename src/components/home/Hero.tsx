"use client";
// ─────────────────────────────────────────────────────────────────────────────
// Hero — Landing page fullscreen hero section
// Technique: GSAP ScrollTrigger pinning + Framer Motion text reveals
// - Cinematic title rendered in staggered spans
// - Parallax layer on scroll (image moves at 0.5x scroll speed)
// - Vertical scroll cue animation
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the image: moves up slower than scroll = depth effect
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] flex flex-col overflow-hidden"
      aria-label="Section Hero"
    >
      {/* Background image with parallax */}
      <div ref={imageRef} className="absolute inset-0 scale-110" style={{ willChange: "transform" }}>
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&q=85&fit=crop"
          alt="Mode de luxe féminine — collection printemps"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.55)] via-[rgba(10,10,10,0.3)] to-[rgba(10,10,10,0.85)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,10,0.4)] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxe flex flex-col h-full pt-32 pb-16">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2.8 }}
          className="flex items-center gap-4 mb-auto"
        >
          <span className="accent-line" />
          <span className="text-label text-[#C9A96E]">Nouvelle Collection — 2025</span>
        </motion.div>

        {/* Main title — cinematic reveal */}
        <div className="flex flex-col gap-2 mb-8">
          {["Le", "Silence", "Est", "Un Luxe."].map((word, i) => (
            <div key={word} style={{ overflow: "hidden" }}>
              <motion.span
                className="block text-hero text-[#F5F0EA] font-serif leading-none"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 2.9 + i * 0.1,
                }}
              >
                {word === "Est" ? (
                  <em className="not-italic text-[#C9A96E]">{word}</em>
                ) : (
                  word
                )}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Tagline + CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 3.4 }}
        >
          <div className="flex flex-col gap-4">
            <p className="text-[#888070] text-sm max-w-xs leading-relaxed">
              Des pièces pensées pour durer. Au-delà des tendances,<br />
              au-delà des saisons.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/shop" className="btn-primary" aria-label="Explorer la collection">
                <span>Explorer</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/#story" className="btn-ghost" aria-label="Découvrir notre histoire">
                <span>Notre histoire</span>
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-3 pb-2">
            <motion.div
              className="w-px h-12 bg-[rgba(201,169,110,0.3)]"
              style={{ originY: 0 }}
              animate={{ scaleY: [0, 1, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />
            <span className="text-label text-[#888070] rotate-90 origin-bottom-left translate-x-6">
              Scroll
            </span>
          </div>
        </motion.div>
      </div>

      {/* Right sidebar text */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 1 }}
        aria-hidden
      >
        {"PARIS   2025".split("").map((char, i) => (
          <span
            key={i}
            className="text-[0.55rem] text-[rgba(201,169,110,0.4)] tracking-widest"
          >
            {char}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
