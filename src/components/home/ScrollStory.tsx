"use client";
// ─────────────────────────────────────────────────────────────────────────────
// ScrollStory — 3 narrative sections revealed progressively on scroll
// Technique: GSAP ScrollTrigger with scrubbed opacity + translateY on each panel
// The text appears as if materializing out of dark silence
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    id: "craft",
    number: "01",
    label: "Savoir-Faire",
    title: "L'art de la\nmatière rare.",
    body: "Chaque tissu est sélectionné pour son silence au toucher. Les mains qui façonnent chaque pièce portent des décennies de tradition. Nous ne créons pas des vêtements. Nous créons des témoins du temps.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&q=85&fit=crop",
    imageAlt: "Atelier de couture — gros plan sur tirage de tissu",
    reverse: false,
  },
  {
    id: "form",
    number: "02",
    label: "Forme & Silence",
    title: "L'espace vide\nest le design.",
    body: "Nos silhouettes sont pensées comme des sculptures. Ce qui n'est pas là est aussi important que ce qui l'est. Le minimalisme radical n'est pas une tendance — c'est une posture éthique.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1000&q=85&fit=crop",
    imageAlt: "Silhouette de femme en manteau blanc architectural",
    reverse: true,
  },
  {
    id: "time",
    number: "03",
    label: "Permanence",
    title: "Pour toujours,\nou pas du tout.",
    body: "Nous n'avons pas de soldes. Nos pièces ne sont pas remplaçables. Elles sont achetées une fois, portées toute une vie, héritées avec soin. La lenteur est notre seul luxe incompressible.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&q=85&fit=crop",
    imageAlt: "Détail de vêtement haut de gamme — texture tissu",
    reverse: false,
  },
];

export default function ScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each story panel
      gsap.utils.toArray<HTMLElement>(".story-panel").forEach((panel) => {
        const text = panel.querySelector(".story-text") as HTMLElement;
        const image = panel.querySelector(".story-image") as HTMLElement;

        // Text reveal
        gsap.fromTo(
          text,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 75%",
              end: "top 25%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Image parallax
        gsap.fromTo(
          image,
          { scale: 1.08, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="story" className="py-24 md:py-36">
      <div className="container-luxe">
        {/* Section header */}
        <div className="flex items-center gap-6 mb-20">
          <span className="accent-line" />
          <span className="text-label text-[#C9A96E]">Notre Manifeste</span>
        </div>

        <div className="flex flex-col gap-32 md:gap-48">
          {stories.map((story) => (
            <div
              key={story.id}
              id={story.id}
              className={`story-panel grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
                story.reverse ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              {/* Text side */}
              <div className="story-text flex flex-col gap-6" style={{ opacity: 0 }}>
                <div className="flex items-center gap-4">
                  <span className="font-serif text-[#C9A96E] text-6xl font-light opacity-30">
                    {story.number}
                  </span>
                  <span className="text-label text-[#888070]">{story.label}</span>
                </div>

                <h3 className="text-display text-[#F5F0EA] font-serif font-light whitespace-pre-line">
                  {story.title}
                </h3>

                <div className="w-12 h-px bg-[rgba(201,169,110,0.4)]" />

                <p className="text-[#888070] leading-relaxed max-w-md">
                  {story.body}
                </p>
              </div>

              {/* Image side */}
              <div
                className={`story-image relative h-[400px] md:h-[600px] overflow-hidden ${
                  story.reverse ? "md:order-1" : ""
                }`}
                style={{ opacity: 0 }}
              >
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.3)] to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
