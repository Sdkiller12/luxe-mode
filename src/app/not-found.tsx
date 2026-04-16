// ─────────────────────────────────────────────────────────────────────────────
// 404 Not Found Page
// ─────────────────────────────────────────────────────────────────────────────
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable — 404",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 text-center px-6">
      <div className="flex flex-col items-center gap-4">
        <span className="font-serif text-[8rem] text-[rgba(201,169,110,0.15)] font-light leading-none">
          404
        </span>
        <span className="accent-line mx-auto" />
        <p className="text-label text-[#C9A96E] mt-2">Page introuvable</p>
        <h1 className="font-serif text-[#F5F0EA] text-3xl font-light max-w-sm">
          Cette page n&apos;existe pas, ou n&apos;existe plus.
        </h1>
        <p className="text-[#888070] text-sm max-w-xs">
          Comme les éditions limitées, certaines choses disparaissent.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/" className="btn-primary">
          <span>Accueil</span>
        </Link>
        <Link href="/shop" className="btn-ghost">
          <span>Collection</span>
        </Link>
      </div>
    </div>
  );
}
