"use client";
// ─────────────────────────────────────────────────────────────────────────────
// ProductPageClient — Client-side rendering of the product detail page
// Receives the resolved `product` from the Server Component parent
// Handles: size selection, cart interaction, scroll-based reveals
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { products, formatPrice, Product } from "@/lib/data";
import ProductGallery from "@/components/product/ProductGallery";
import AddToCartButton from "@/components/product/AddToCartButton";

interface Props {
  product: Product;
}

export default function ProductPageClient({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState("");
  const detailsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(detailsRef, { once: true, margin: "0px 0px -80px 0px" });

  // Related products: same category, exclude current
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-[70px]">
      {/* Breadcrumb */}
      <div className="container-luxe pt-8 pb-4">
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 flex-wrap">
          {[
            { label: "Accueil", href: "/" },
            { label: "Collection", href: "/shop" },
            { label: product.name, href: "#" },
          ].map((crumb, i, arr) => (
            <span key={crumb.href} className="flex items-center gap-2">
              {i < arr.length - 1 ? (
                <>
                  <Link
                    href={crumb.href}
                    className="text-[#888070] text-[0.65rem] tracking-wider hover:text-[#C9A96E] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                  <span className="text-[#333] text-[0.55rem]">/</span>
                </>
              ) : (
                <span className="text-[#F5F0EA] text-[0.65rem] tracking-wider truncate max-w-[180px]">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Main product layout */}
      <div className="container-luxe">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 py-8 items-start">

          {/* ── Gallery (sticky on desktop) ── */}
          <div className="lg:sticky lg:top-[86px]">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* ── Product Info ── */}
          <div className="flex flex-col gap-8 py-2">

            {/* Category + badge */}
            <div className="flex items-center gap-4">
              <span className="text-label text-[#888070]">{product.category}</span>
              {product.isNew && (
                <span className="text-label text-[#C9A96E] border border-[rgba(201,169,110,0.3)] px-2 py-0.5">
                  Nouveau
                </span>
              )}
            </div>

            {/* Title */}
            <div className="flex flex-col gap-3">
              <h1 className="font-serif text-[#F5F0EA] font-light leading-tight"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[#C9A96E] text-3xl font-light">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[#888070] text-xs">TVA incluse</span>
              </div>
            </div>

            <div className="divider" />

            {/* Color */}
            <div className="flex items-center justify-between">
              <span className="text-label text-[#888070]">Couleur</span>
              <span className="text-[#F5F0EA] text-xs font-light">{product.color}</span>
            </div>

            {/* Size selector */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-label text-[#888070]">Taille</span>
                {selectedSize && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[#C9A96E] text-[0.65rem] tracking-wider"
                  >
                    Sélectionné : {selectedSize}
                  </motion.span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[52px] h-11 px-3 border text-sm transition-all duration-300 ${
                      selectedSize === size
                        ? "border-[#C9A96E] text-[#C9A96E] bg-[rgba(201,169,110,0.06)]"
                        : "border-[rgba(245,240,234,0.12)] text-[#888070] hover:border-[rgba(245,240,234,0.3)] hover:text-[#F5F0EA]"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    aria-pressed={selectedSize === size}
                    aria-label={`Taille ${size}`}
                    id={`size-${size}`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-[#888070] text-[0.65rem]">
                  Veuillez sélectionner une taille pour ajouter au panier
                </p>
              )}
            </div>

            {/* CTA */}
            <AddToCartButton product={product} selectedSize={selectedSize} />

            {/* Trust signals */}
            <div className="flex flex-col gap-2.5 pt-1">
              {[
                {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5">
                      <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                  ),
                  text: "Livraison offerte dès 300€ — 3 à 5 jours ouvrés",
                },
                {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5">
                      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
                    </svg>
                  ),
                  text: "Retour gratuit sous 14 jours",
                },
                {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                  ),
                  text: "Paiement 100% sécurisé — 3D Secure",
                },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-[#888070] text-xs">
                  {icon}
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="divider" />

            {/* Description + details (scroll reveal) */}
            <motion.div
              ref={detailsRef}
              className="flex flex-col gap-7"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Description */}
              <div className="flex flex-col gap-3">
                <h2 className="text-label text-[#C9A96E]">Description</h2>
                <p className="text-[#888070] leading-relaxed text-sm">{product.description}</p>
              </div>

              {/* Detail list */}
              <div className="flex flex-col gap-2">
                <h2 className="text-label text-[#C9A96E]">Composition & Détails</h2>
                <ul className="flex flex-col gap-2 mt-1">
                  {product.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-sm text-[#888070]">
                      <span className="text-[#C9A96E] shrink-0 mt-0.5">—</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <section className="py-20 border-t border-[rgba(201,169,110,0.08)]">
            <div className="flex items-center gap-4 mb-12">
              <span className="accent-line" />
              <span className="text-label text-[#C9A96E]">Du même univers</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                >
                  <Link
                    href={`/product/${rel.slug}`}
                    className="product-card group block"
                    aria-label={`${rel.name} — ${formatPrice(rel.price)}`}
                  >
                    <div
                      className="relative overflow-hidden bg-[#111]"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <Image
                        src={rel.images[0]}
                        alt={rel.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                    <div className="pt-3 flex justify-between items-baseline gap-2">
                      <p className="text-[#F5F0EA] text-sm font-light">{rel.name}</p>
                      <span className="font-serif text-[#C9A96E] text-lg font-light whitespace-nowrap">
                        {formatPrice(rel.price)}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
