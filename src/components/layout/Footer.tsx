"use client";
// ─────────────────────────────────────────────────────────────────────────────
// Footer — Minimal editorial layout
// ─────────────────────────────────────────────────────────────────────────────
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const footerLinks = {
  Boutique: [
    { label: "Collection", href: "/shop" },
    { label: "Nouveautés", href: "/shop?filter=new" },
    { label: "Lookbook", href: "/shop#lookbook" },
  ],
  Maison: [
    { label: "À propos", href: "/#story" },
    { label: "Savoir-faire", href: "/#craft" },
    { label: "Contact", href: "/contact" },
  ],
  Légal: [
    { label: "Mentions légales", href: "/legal" },
    { label: "Politique de confidentialité", href: "/privacy" },
    { label: "CGV", href: "/cgv" },
  ],
};

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <footer
      ref={ref}
      className="bg-[#0A0A0A] border-t border-[rgba(201,169,110,0.08)] pt-20 pb-10"
    >
      <div className="container-luxe">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-16 border-b border-[rgba(201,169,110,0.08)]">
          {/* Brand col */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/" className="font-serif text-3xl text-[#F5F0EA] tracking-[0.15em] font-light">
                Luxe<span className="text-[#C9A96E]">.</span>
              </Link>
            </motion.div>

            <motion.p
              className="text-[#888070] text-sm leading-relaxed max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Mode de luxe féminine. Des créations qui s'inscrivent dans le temps, 
              au-delà des saisons.
            </motion.p>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex flex-col gap-3 mt-2"
            >
              <p className="text-label text-[#C9A96E]">Newsletter</p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex border border-[rgba(201,169,110,0.2)] focus-within:border-[#C9A96E] transition-colors"
              >
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 bg-transparent px-4 py-3 text-[#F5F0EA] text-xs placeholder:text-[#888070] outline-none"
                  aria-label="Adresse email newsletter"
                />
                <button
                  type="submit"
                  className="px-4 text-[#C9A96E] text-[0.6rem] tracking-widest uppercase hover:bg-[rgba(201,169,110,0.08)] transition-colors"
                  aria-label="S'inscrire à la newsletter"
                >
                  Ok
                </button>
              </form>
            </motion.div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], colI) => (
            <motion.div
              key={title}
              className="flex flex-col gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 * (colI + 2) }}
            >
              <p className="text-label text-[#C9A96E]">{title}</p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#888070] text-sm hover:text-[#F5F0EA] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-[#888070] text-[0.65rem] tracking-wider">
            © {new Date().getFullYear()} Luxe Mode. Tous droits réservés.
          </p>
          <p className="text-[0.6rem] text-[#333] tracking-wider uppercase">
            Fait avec intention — Paris
          </p>
        </div>
      </div>
    </footer>
  );
}
