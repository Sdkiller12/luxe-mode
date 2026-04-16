"use client";
// ─────────────────────────────────────────────────────────────────────────────
// Navbar — Transparent → frosted-glass transition on scroll
// Features: cart badge, mobile hamburger, animated underline links
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";

const navLinks = [
  { label: "Collection", href: "/shop" },
  { label: "Lookbook", href: "/shop#lookbook" },
  { label: "Maison", href: "/#story" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, totalItems } = useCartStore();
  const count = totalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 2.6 }}
        style={{
          background: scrolled
            ? "rgba(10,10,10,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,169,110,0.08)" : "1px solid transparent",
          transition: "background 0.5s, backdrop-filter 0.5s, border-color 0.5s",
        }}
      >
        <div className="container-luxe flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-[#F5F0EA] text-xl tracking-[0.25em] uppercase font-light"
            aria-label="Luxe Mode — Retour accueil"
          >
            Luxe<span className="text-[#C9A96E]">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-6">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 text-label text-[#888070] hover:text-[#F5F0EA] transition-colors"
              aria-label={`Panier — ${count} article${count !== 1 ? "s" : ""}`}
              id="cart-toggle-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#C9A96E] text-[#0A0A0A] text-[0.55rem] font-bold flex items-center justify-center"
                  >
                    {count > 9 ? "9+" : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              id="mobile-menu-toggle"
            >
              {[0, 1, 2].map((i) => (
                <span key={i} className="block w-5 h-px bg-[#888070]" />
              ))}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-[#0A0A0A] z-[9990]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col h-full p-8">
                {/* Close */}
                <div className="flex justify-between items-center mb-16">
                  <span className="font-serif text-[#F5F0EA] text-xl tracking-[0.25em]">
                    Luxe<span className="text-[#C9A96E]">.</span>
                  </span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="text-[#888070] hover:text-[#F5F0EA] transition-colors"
                    aria-label="Fermer le menu"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>

                {/* Links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.08 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        className="block font-serif text-4xl text-[#F5F0EA] font-light py-3 border-b border-[rgba(201,169,110,0.08)] hover:text-[#C9A96E] transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Bottom tagline */}
                <div className="mt-auto">
                  <p className="text-label text-[#888070]">Silence is luxury.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
