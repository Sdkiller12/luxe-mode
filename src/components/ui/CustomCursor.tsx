"use client";
// ─────────────────────────────────────────────────────────────────────────────
// Custom Cursor — Replaces default cursor with a two-layer premium cursor
// Technique: requestAnimationFrame-based smooth follow + Framer Motion for state
// Layer 1: Magnetic dot (instant, 1:1)
// Layer 2: Ring (lerped 0.12 friction — lagging behind)
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  // Spring-animated ring position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    // Direct DOM update for the dot (no spring, instant)
    const moveCursor = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      // Instant dot
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      // Spring ring via motion values
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Detect interactive elements for hover state
    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        setHovering(true);
      }
    };
    const handleLeave = () => setHovering(false);
    const handleLeaveWindow = () => setVisible(false);
    const handleEnterWindow = () => setVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleEnter);
    window.addEventListener("mouseout", handleLeave);
    document.documentElement.addEventListener("mouseleave", handleLeaveWindow);
    document.documentElement.addEventListener("mouseenter", handleEnterWindow);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleEnter);
      window.removeEventListener("mouseout", handleLeave);
      document.documentElement.removeEventListener("mouseleave", handleLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", handleEnterWindow);
    };
  }, [mouseX, mouseY, visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null; // No custom cursor on touch devices
  }

  return (
    <div
      className={`cursor ${hovering ? "cursor--hover" : ""}`}
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
      aria-hidden="true"
    >
      {/* Instant dot */}
      <div
        ref={dotRef}
        className="cursor__dot"
        style={{ position: "fixed", pointerEvents: "none" }}
      />
      {/* Lagging ring */}
      <motion.div
        ref={ringRef}
        className="cursor__ring"
        style={{
          position: "fixed",
          left: springX,
          top: springY,
          pointerEvents: "none",
        }}
        animate={{
          scale: hovering ? 1 : 1,
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
