"use client";
// ─────────────────────────────────────────────────────────────────────────────
// ProductCard — Reusable card for shop grid
// Technique: CSS hover with GPU-accelerated transform, subtle overlay reveal
// ─────────────────────────────────────────────────────────────────────────────
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { formatPrice, Product } from "@/lib/data";
import { useCartStore } from "@/lib/store";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  index?: number;
}

export default function ProductCard({ product, priority = false, index = 0 }: ProductCardProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    addItem(product, defaultSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.07,
      }}
      className="product-card group"
    >
      <Link
        href={`/product/${product.slug}`}
        aria-label={`${product.name} — ${formatPrice(product.price)}`}
      >
        {/* Image container */}
        <div
          className="product-card__image-wrap relative"
          style={{ aspectRatio: "3/4" }}
          onMouseEnter={() => product.images[1] && setImgIdx(1)}
          onMouseLeave={() => setImgIdx(0)}
        >
          {/* Main image */}
          <Image
            src={product.images[imgIdx] ?? product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.isNew && (
              <span className="text-label bg-[#C9A96E] text-[#0A0A0A] px-2 py-1">
                Nouveau
              </span>
            )}
          </div>

          {/* Hover overlay */}
          <div className="product-card__overlay flex-col items-center justify-end gap-3 pb-4">
            {/* Quick add button */}
            <motion.button
              onClick={handleQuickAdd}
              className="w-full max-w-[200px] py-3 text-[0.6rem] tracking-widest uppercase font-medium transition-all"
              style={{
                background: added ? "rgba(201,169,110,0.9)" : "rgba(245,240,234,0.9)",
                color: "#0A0A0A",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={added ? "Ajouté !" : `Ajouter ${product.name} au panier`}
            >
              {added ? "✓ Ajouté" : "Ajouter"}
            </motion.button>
          </div>

          {/* Image indicator dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {product.images.map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full transition-colors"
                  style={{ background: i === imgIdx ? "#C9A96E" : "rgba(245,240,234,0.4)" }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 pt-4">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[#F5F0EA] text-sm font-light leading-snug flex-1">
              {product.name}
            </p>
            <span className="font-serif text-[#C9A96E] text-xl font-light whitespace-nowrap">
              {formatPrice(product.price)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-label text-[#888070] text-[0.6rem]">
              {product.category} · {product.color}
            </span>
            <span className="text-[#888070] text-[0.6rem]">
              {product.sizes.length} tailles
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
