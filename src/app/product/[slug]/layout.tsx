// ─────────────────────────────────────────────────────────────────────────────
// Product [slug] layout — minimal wrapper, no duplicate Navbar/Footer
// generateStaticParams is in page.tsx (Server Component)
// ─────────────────────────────────────────────────────────────────────────────
export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
