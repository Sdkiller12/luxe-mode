// ─────────────────────────────────────────────────────────────────────────────
// Landing Page — Full cinematic homepage
// Sections:
//   1. Hero (fullscreen, GSAP parallax)
//   2. Marquee divider
//   3. Scroll Story (3 narrative panels)
//   4. Marquee divider
//   5. New Collection (staggered grid)
//   6. Final CTA section
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/home/ScrollStory";
import NewCollection from "@/components/home/NewCollection";
import Marquee from "@/components/ui/Marquee";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Luxe Mode — Mode de Luxe Féminine | Silence is Luxury",
  description:
    "Découvrez notre collection de mode de luxe féminine. Manteaux, robes, sacs et accessoires d'exception. Chaque pièce est une déclaration de permanence.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic hero */}
      <Hero />

      {/* 2. Scrolling marquee divider */}
      <Marquee speed={28} />

      {/* 3. Scroll storytelling — 3 narrative panels */}
      <ScrollStory />

      {/* 4. Second marquee, reversed */}
      <Marquee speed={22} direction="right" />

      {/* 5. Featured products grid */}
      <NewCollection />

      {/* 6. Full-bleed CTA section */}
      <section className="relative py-36 overflow-hidden bg-[#0A0A0A]">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              rgba(201,169,110,0.3) 40px,
              rgba(201,169,110,0.3) 41px
            )`,
          }}
          aria-hidden
        />

        <div className="relative z-10 container-luxe flex flex-col items-center text-center gap-8">
          <span className="text-label text-[#C9A96E]">Collection Complète</span>

          <h2 className="text-display font-serif text-[#F5F0EA] font-light max-w-2xl leading-tight">
            Explorez chaque pièce.<br />
            <em className="text-[#C9A96E] not-italic">Trouvez la vôtre.</em>
          </h2>

          <p className="text-[#888070] text-sm max-w-md leading-relaxed">
            Douze pièces. Douze intentions. Une seule conviction : 
            le luxe se mérite, se choisit, se garde.
          </p>

          <div className="flex items-center gap-5 mt-4">
            <Link
              href="/shop"
              className="btn-primary"
              aria-label="Accéder à toute la collection"
            >
              <span>Voir la Collection</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Decorative line */}
          <div className="w-px h-16 bg-gradient-to-b from-[#C9A96E] to-transparent mt-4" aria-hidden />
        </div>
      </section>
    </>
  );
}
