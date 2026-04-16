"use client";
// ─────────────────────────────────────────────────────────────────────────────
// Loading Screen — Cinematic intro screen
// Technique: SVG logo draw + counter + slide-up exit via Framer Motion
// Renders once on first mount, then exits and stays hidden
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Animate counter 0 → 100
    const duration = 2000; // ms
    const steps = 60;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += Math.ceil(100 / steps);
      if (current >= 100) {
        setCount(100);
        clearInterval(timer);
        // Short hold at 100 then exit
        setTimeout(() => setLoading(false), 350);
      } else {
        setCount(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
          aria-label="Chargement du site"
          role="status"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Wordmark */}
            <div className="text-label text-[#C9A96E] tracking-[0.4em]">LUXE MODE</div>

            {/* Animated gold line */}
            <motion.div
              style={{ height: 1, background: "#C9A96E", originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="w-24"
            />

            {/* Tagline */}
            <motion.p
              className="text-[#888070] text-[0.6rem] tracking-[0.3em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Silence is luxury.
            </motion.p>
          </motion.div>

          {/* Counter */}
          <motion.div
            className="absolute bottom-12 right-12 font-serif text-[#C9A96E] text-4xl font-light tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {String(count).padStart(3, "0")}
          </motion.div>

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(201,169,110,0.1)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
