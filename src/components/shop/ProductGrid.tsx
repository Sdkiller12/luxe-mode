"use client";
// ─────────────────────────────────────────────────────────────────────────────
// ProductGrid — Asymmetric masonry-style grid with AnimatePresence filtering
// Technique: Framer Motion AnimatePresence for smooth add/remove on filter change
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories, Category, getProductsByCategory } from "@/lib/data";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";

export default function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState<Category>("Tous");
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(
    () => getProductsByCategory(activeFilter),
    [activeFilter]
  );

  const visible = filtered.slice(0, visibleCount);

  // Category counts
  const counts = useMemo(() => {
    const c: Record<string, number> = { Tous: products.length };
    categories.slice(1).forEach((cat) => {
      c[cat] = products.filter((p) => p.category === cat).length;
    });
    return c;
  }, []);

  const handleFilterChange = (cat: Category) => {
    setActiveFilter(cat);
    setVisibleCount(8);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((v) => v + 4);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Sticky filters */}
      <div className="sticky top-[70px] z-40 bg-[rgba(10,10,10,0.92)] backdrop-blur-xl py-5 -mx-6 px-6 md:-mx-16 md:px-16 border-b border-[rgba(201,169,110,0.06)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <FilterBar
            active={activeFilter}
            onChange={handleFilterChange}
            counts={counts}
          />
          <span className="text-[#888070] text-[0.65rem] tracking-wider shrink-0">
            {filtered.length} pièce{filtered.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} index={i} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load more */}
      {visibleCount < filtered.length && (
        <div className="flex justify-center pt-8">
          <motion.button
            onClick={handleLoadMore}
            className="btn-ghost flex items-center gap-3 min-w-[240px] justify-center"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={loading}
            aria-label="Charger plus de produits"
            id="load-more-btn"
          >
            {loading ? (
              <>
                <motion.div
                  className="w-3 h-3 border border-[#C9A96E] border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                <span>Chargement…</span>
              </>
            ) : (
              <>
                <span>Voir plus</span>
                <span className="text-[#888070]">({filtered.length - visibleCount} restants)</span>
              </>
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
}
