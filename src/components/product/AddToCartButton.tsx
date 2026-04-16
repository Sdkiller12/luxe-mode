"use client";
// ─────────────────────────────────────────────────────────────────────────────
// AddToCartButton — CTA with confirmation animation
// States: idle → adding (spinner) → added (checkmark pulse) → idle
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/data";
import { useCartStore } from "@/lib/store";

interface AddToCartButtonProps {
  product: Product;
  selectedSize: string;
}

type BtnState = "idle" | "adding" | "added";

export default function AddToCartButton({ product, selectedSize }: AddToCartButtonProps) {
  const [state, setState] = useState<BtnState>("idle");
  const { addItem } = useCartStore();

  const handleClick = () => {
    if (state !== "idle" || !selectedSize) return;
    setState("adding");
    setTimeout(() => {
      addItem(product, selectedSize);
      setState("added");
      setTimeout(() => setState("idle"), 2200);
    }, 500);
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={state !== "idle"}
      className={`btn-primary w-full h-14 overflow-hidden ${
        !selectedSize ? "opacity-50 cursor-not-allowed" : ""
      }`}
      whileHover={state === "idle" && selectedSize ? { scale: 1.005 } : {}}
      whileTap={state === "idle" && selectedSize ? { scale: 0.995 } : {}}
      aria-label={
        state === "added"
          ? "Produit ajouté au panier"
          : state === "adding"
          ? "Ajout en cours"
          : selectedSize
          ? `Ajouter ${product.name} au panier`
          : "Veuillez sélectionner une taille"
      }
      id="add-to-cart-btn"
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            className="flex items-center justify-center gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span>
              {selectedSize ? "Ajouter au Panier" : "Sélectionner une taille"}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </motion.span>
        )}

        {state === "adding" && (
          <motion.span
            key="adding"
            className="flex items-center justify-center gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <motion.svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
              <path d="M12 2a10 10 0 0110 10"/>
            </motion.svg>
            <span>Ajout…</span>
          </motion.span>
        )}

        {state === "added" && (
          <motion.span
            key="added"
            className="flex items-center justify-center gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <motion.svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <polyline points="20 6 9 17 4 12"/>
            </motion.svg>
            <span>Ajouté au panier</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
