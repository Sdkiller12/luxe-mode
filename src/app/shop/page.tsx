// ─────────────────────────────────────────────────────────────────────────────
// Shop / Catalogue Page
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";
import ProductGrid from "@/components/shop/ProductGrid";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Parcourez toute notre collection de mode de luxe féminine. Manteaux, robes, sacs, chaussures et accessoires d'exception.",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen pt-[70px]">
      {/* Hero header */}
      <div className="relative h-[35vh] min-h-[240px] flex flex-col items-center justify-end pb-12 overflow-hidden bg-[#111111]">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,169,110,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,169,110,1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
          aria-hidden
        />

        <div className="relative z-10 text-center flex flex-col items-center gap-3">
          <span className="text-label text-[#C9A96E]">2025 — Collection</span>
          <h1 className="text-display font-serif text-[#F5F0EA] font-light">
            Toutes les Pièces
          </h1>
          <p className="text-[#888070] text-sm mt-2">
            Silence · Matière · Intention
          </p>
        </div>
      </div>

      <div className="container-luxe py-16">
        {/* Product grid with filters */}
        <ProductGrid />
      </div>
    </div>
  );
}
