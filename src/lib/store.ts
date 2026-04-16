// ─────────────────────────────────────────────────────────────────────────────
// Zustand Cart Store — Global state management for cart drawer
// Uses Zustand with immer-like mutations for clean state updates
// ─────────────────────────────────────────────────────────────────────────────
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./data";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  /** Unique key = product.id + size */
  key: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, size: string) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;

  // Selectors
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, size) => {
        const key = `${product.id}-${size}`;
        const existing = get().items.find((i) => i.key === key);

        if (existing) {
          // Increment quantity if already in cart
          set((s) => ({
            items: s.items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }));
        } else {
          set((s) => ({
            items: [...s.items, { product, quantity: 1, size, key }],
          }));
        }
        // Always open cart on add
        set({ isOpen: true });
      },

      removeItem: (key) =>
        set((s) => ({ items: s.items.filter((i) => i.key !== key) })),

      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          get().removeItem(key);
          return;
        }
        set((s) => ({
          items: s.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    {
      name: "luxe-mode-cart",
      // Only persist items, not UI state
      partialize: (s) => ({ items: s.items }),
    }
  )
);
