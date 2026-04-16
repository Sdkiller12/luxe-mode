"use client";
// ─────────────────────────────────────────────────────────────────────────────
// CartDrawer — Slide-in cart panel from right
// Technique: Framer Motion AnimatePresence with x translateX animation
// Each item row animates in/out with layout animations
// ─────────────────────────────────────────────────────────────────────────────
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCartStore, CartItem } from "@/lib/store";
import { formatPrice } from "@/lib/data";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const total = totalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeCart}
            aria-hidden
          />

          {/* Drawer panel */}
          <motion.aside
            className="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Panier"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-[rgba(201,169,110,0.1)]">
              <div>
                <p className="text-label text-[#C9A96E] mb-1">Votre Sélection</p>
                <h2 className="font-serif text-[#F5F0EA] text-2xl font-light">
                  Panier ({items.length})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center text-[#888070] hover:text-[#F5F0EA] transition-colors border border-[rgba(201,169,110,0.1)] hover:border-[rgba(201,169,110,0.3)]"
                aria-label="Fermer le panier"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {items.length === 0 ? (
                <EmptyCart onClose={closeCart} />
              ) : (
                <motion.ul layout className="divide-y divide-[rgba(201,169,110,0.06)]">
                  <AnimatePresence>
                    {items.map((item) => (
                      <CartItemRow
                        key={item.key}
                        item={item}
                        onRemove={() => removeItem(item.key)}
                        onQtyChange={(q) => updateQuantity(item.key, q)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.ul>
              )}
            </div>

            {/* Footer summary */}
            {items.length > 0 && (
              <div className="p-8 border-t border-[rgba(201,169,110,0.1)]">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-label text-[#888070]">Sous-total</span>
                  <span className="font-serif text-[#F5F0EA] text-2xl font-light">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="text-[0.65rem] text-[#888070] mb-6">
                  Livraison et taxes calculées à la commande.
                </p>
                <motion.button
                  className="btn-primary w-full"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  aria-label="Procéder au paiement"
                >
                  <span>Commander</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.button>
                <button
                  onClick={closeCart}
                  className="mt-3 w-full text-center text-[#888070] text-[0.65rem] tracking-widest uppercase hover:text-[#F5F0EA] transition-colors py-2"
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Cart Item Row ──────────────────────────────────────────────────────────
function CartItemRow({
  item,
  onRemove,
  onQtyChange,
}: {
  item: CartItem;
  onRemove: () => void;
  onQtyChange: (q: number) => void;
}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.3 } }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 p-6"
    >
      {/* Product image */}
      <div className="relative w-20 h-24 flex-shrink-0 bg-[#1A1A1A] overflow-hidden">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[#F5F0EA] text-sm font-light leading-snug">{item.product.name}</p>
            <p className="text-[#888070] text-[0.65rem] mt-0.5 uppercase tracking-wider">
              Taille: {item.size} · {item.product.color}
            </p>
          </div>
          <button
            onClick={onRemove}
            className="text-[#888070] hover:text-[#F5F0EA] transition-colors mt-0.5"
            aria-label={`Retirer ${item.product.name} du panier`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Qty + price */}
        <div className="flex items-center justify-between mt-auto pt-2">
          {/* Qty stepper */}
          <div className="flex items-center border border-[rgba(201,169,110,0.15)]">
            <button
              onClick={() => onQtyChange(item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-[#888070] hover:text-[#F5F0EA] transition-colors"
              aria-label="Diminuer la quantité"
            >
              −
            </button>
            <span className="w-8 text-center text-[#F5F0EA] text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => onQtyChange(item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-[#888070] hover:text-[#F5F0EA] transition-colors"
              aria-label="Augmenter la quantité"
            >
              +
            </button>
          </div>
          <span className="font-serif text-[#C9A96E] text-lg font-light">
            {formatPrice(item.product.price * item.quantity)}
          </span>
        </div>
      </div>
    </motion.li>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────
function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full gap-6 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-16 h-16 border border-[rgba(201,169,110,0.2)] flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#888070" strokeWidth="1">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
      </div>
      <div className="text-center">
        <p className="font-serif text-[#F5F0EA] text-xl font-light mb-2">Votre panier est vide</p>
        <p className="text-[#888070] text-sm">Explorez notre collection pour trouver vos pièces.</p>
      </div>
      <button
        onClick={onClose}
        className="btn-ghost text-sm"
        aria-label="Continuer mes achats"
      >
        Découvrir la collection
      </button>
    </motion.div>
  );
}
