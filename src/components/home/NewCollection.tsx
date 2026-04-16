"use client";
// ─────────────────────────────────────────────────────────────────────────────
// NewCollection — Staggered product grid on the landing page
// Technique: Framer Motion staggered children with Intersection Observer
// Asymmetric layout: alternating large/small cards for editorial rhythm
// ─────────────────────────────────────────────────────────────────────────────
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getFeaturedProducts, formatPrice } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function NewCollection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const products = getFeaturedProducts();

  return (
    <section className="section bg-[#0A0A0A]">
      <div className="container-luxe">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <span className="accent-line" />
              <span className="text-label text-[#C9A96E]">Nouvelle Collection</span>
            </div>
            <h2 className="text-display text-[#F5F0EA] font-serif font-light">
              Pièces Signature
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-label text-[#888070] hover:text-[#C9A96E] transition-colors flex items-center gap-2 self-start md:self-auto"
            aria-label="Voir toute la collection"
          >
            Voir tout
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>

        {/* Asymmetric grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {products.slice(0, 4).map((product, i) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              // Every other card is taller for asymmetric rhythm
              className={i % 2 === 0 ? "md:row-span-2" : ""}
            >
              <Link
                href={`/product/${product.slug}`}
                className="product-card group block"
                aria-label={`${product.name} — ${formatPrice(product.price)}`}
              >
                <div
                  className="product-card__image-wrap"
                  style={{
                    height: i % 2 === 0 ? "min(600px, 60vw)" : "min(360px, 35vw)",
                    position: "relative",
                  }}
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority={i < 2}
                  />
                  {/* Hover overlay */}
                  <div className="product-card__overlay">
                    {product.isNew && (
                      <span className="text-label text-[#C9A96E] mb-3">Nouveau</span>
                    )}
                    <span className="btn-ghost text-[0.6rem]">Voir le produit</span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-1 pt-3">
                  <p className="text-[#F5F0EA] text-sm font-light">{product.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#888070] text-[0.65rem] uppercase tracking-wider">
                      {product.category}
                    </span>
                    <span className="font-serif text-[#C9A96E] text-lg font-light">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
