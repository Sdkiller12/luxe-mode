import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";
import LenisProvider from "@/components/ui/LenisProvider";

// ────────────────────────────────────────────────────────────────────────────
// Font loading via next/font — zero FOUT, subset optimized, self-hosted
// Cormorant Garamond: editorial serif for luxury feel
// Inter: neutral sans-serif for body & UI
// ────────────────────────────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luxe Mode — Mode de Luxe Féminine",
    template: "%s | Luxe Mode",
  },
  description:
    "Collections de mode de luxe féminine. Pièces intemporelles, matières rares, savoir-faire artisanal. Silence is luxury.",
  keywords: ["mode luxe", "fashion", "couture", "vêtements femme", "luxe"],
  authors: [{ name: "Luxe Mode" }],
  creator: "Luxe Mode",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Luxe Mode — Silence is Luxury",
    description: "Collections de mode de luxe féminine. Pièces intemporelles.",
    siteName: "Luxe Mode",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        {/* Loading screen: only runs on initial mount */}
        <LoadingScreen />

        {/* Lenis smooth scroll provider */}
        <LenisProvider>
          {/* Premium custom cursor */}
          <CustomCursor />

          {/* Sticky navigation */}
          <Navbar />

          {/* Cart slide-in drawer */}
          <CartDrawer />

          {/* Page content */}
          <main id="main-content">{children}</main>

          {/* Footer */}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
