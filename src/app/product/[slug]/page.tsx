// ─────────────────────────────────────────────────────────────────────────────
// Product [slug] — Server Component wrapper
// Handles: generateStaticParams, generateMetadata, notFound()
// Delegates rendering to ProductPageClient (client component)
// ─────────────────────────────────────────────────────────────────────────────
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductBySlug, formatPrice } from "@/lib/data";
import ProductPageClient from "./ProductPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produit introuvable" };

  return {
    title: product.name,
    description: `${product.description} — ${formatPrice(product.price)}`,
    openGraph: {
      title: `${product.name} | Luxe Mode`,
      description: product.description,
      images: [{ url: product.images[0], width: 800, height: 1067 }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductPageClient product={product} />;
}
