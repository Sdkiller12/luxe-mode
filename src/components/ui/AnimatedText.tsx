"use client";
// ─────────────────────────────────────────────────────────────────────────────
// AnimatedText — Reusable text reveal component
// Techniques:
//   - "words": splits into word spans, staggered fade-up via Framer Motion
//   - "chars": splits into char spans for letter-by-letter reveals
//   - "lines": full line clip-path slide-up (editorial style)
// Usage: <AnimatedText text="Hello World" type="words" delay={0.2} />
// ─────────────────────────────────────────────────────────────────────────────
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

type AnimType = "words" | "chars" | "lines";

interface AnimatedTextProps {
  text: string;
  type?: AnimType;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const charVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const lineVariants: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AnimatedText({
  text,
  type = "words",
  className = "",
  delay = 0,
  stagger = 0.06,
  once = true,
  tag: Tag = "p",
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "0px 0px -60px 0px" });

  if (type === "lines") {
    return (
      <motion.div
        style={{ overflow: "hidden" }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={lineVariants}
        transition={{ delay }}
        className={className}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        {text}
      </motion.div>
    );
  }

  const tokens = type === "chars" ? text.split("") : text.split(" ");

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className} aria-label={text}>
      <motion.span
        style={{ display: "flex", flexWrap: "wrap", gap: type === "words" ? "0.28em" : "0px" }}
        variants={containerVariants}
        custom={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ delayChildren: delay }}
        aria-hidden
      >
        {tokens.map((token, i) => (
          <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
            <motion.span
              style={{ display: "inline-block" }}
              variants={type === "chars" ? charVariants : wordVariants}
            >
              {token}{type === "words" && i < tokens.length - 1 ? "" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
