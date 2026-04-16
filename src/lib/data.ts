// ─────────────────────────────────────────────────────────────────────────────
// Product Data — 12 luxury fashion items mockées
// Images: Unsplash curated editorial fashion
// ─────────────────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "Manteau" | "Robe" | "Sac" | "Chaussures" | "Accessoires";
  price: number;
  currency: string;
  description: string;
  details: string[];
  images: string[];
  featured?: boolean;
  isNew?: boolean;
  color: string;
  sizes: string[];
}

export const products: Product[] = [
  {
    id: "p-001",
    slug: "manteau-oversize-camel",
    name: "Manteau Oversize Camello",
    category: "Manteau",
    price: 1_895_000,
    currency: "FCFA",
    color: "Camello",
    sizes: ["XS", "S", "M", "L"],
    featured: true,
    isNew: true,
    description:
      "Un manteau sculpté dans la laine bouillie la plus pure. La coupe oversized révèle une architecture qui efface le corps tout en lui rendant hommage. Silence et présence.",
    details: [
      "100% laine bouillie italienne",
      "Coupe oversize — silhouette architecturale",
      "Doublure en soie ivoire",
      "Fermeture cachée à pression",
      "Fabriqué à Milan, Italie",
    ],
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&fit=crop",
    ],
  },
  {
    id: "p-002",
    slug: "robe-fourreau-noir",
    name: "Robe Fourreau Ebène",
    category: "Robe",
    price: 1_085_000,
    currency: "FCFA",
    color: "Ébène",
    sizes: ["XS", "S", "M"],
    featured: true,
    description:
      "La forme la plus pure de l'élégance. Un fourreau en crêpe de soie qui épouse chaque mouvement comme une seconde peau. Le noir comme déclaration d'intention.",
    details: [
      "100% crêpe de soie",
      "Coupe fourreau ajustée",
      "Encolure bateau",
      "Fermeture à glissière invisible dorsale",
      "Atelier parisien",
    ],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=85&fit=crop",
    ],
  },
  {
    id: "p-003",
    slug: "sac-cuir-slouchy",
    name: "Sac Slouchy Woven",
    category: "Sac",
    price: 2_100_000,
    currency: "FCFA",
    color: "Terra",
    sizes: ["Unique"],
    featured: true,
    isNew: true,
    description:
      "Tissé à la main en cuir plongé végétal. La forme souple s'adapte, respire, vit. Un objet que l'on hérite, pas que l'on possède.",
    details: [
      "Cuir véau plongé végétal",
      "Tissage intrecciato signature",
      "Doublure en suède",
      "Anse en cuir tressé — portée main ou épaule",
      "Artisanat florentin",
    ],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=85&fit=crop",
    ],
  },
  {
    id: "p-004",
    slug: "escarpins-mule-cuir",
    name: "Mules Sculptées Ivoire",
    category: "Chaussures",
    price: 510_000,
    currency: "FCFA",
    color: "Ivoire",
    sizes: ["36", "37", "38", "39", "40"],
    description:
      "La mule réinventée comme sculpture. Un talon bloc massif, une bride unique. La chaussure qui commence là où le sol finit.",
    details: [
      "Cuir lisse naturel",
      "Semelle cuir",
      "Talon bloc 6cm",
      "Semelle intérieure en cuir capitonné",
      "Fait en Espagne",
    ],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=85&fit=crop",
    ],
  },
  {
    id: "p-005",
    slug: "blazer-tailleur-blanc",
    name: "Blazer Structure Blanc Optique",
    category: "Manteau",
    price: 880_000,
    currency: "FCFA",
    color: "Blanc Optique",
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    description:
      "La puissance du blanc. Un blazer tailleur en laine froide, coupe masculine retravaillée sur un corps féminin. L'équilibre parfait entre rigueur et fluidité.",
    details: [
      "98% laine froide, 2% élasthanne",
      "Col tailleur classique",
      "Boutonnage simple",
      "Poches plaquées",
      "Fabriqué en Roumanie",
    ],
    images: [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=85&fit=crop",
    ],
  },
  {
    id: "p-006",
    slug: "collier-or-chainon",
    name: "Collier Chaîne Golden Dusk",
    category: "Accessoires",
    price: 210_000,
    currency: "FCFA",
    color: "Or 18K",
    sizes: ["Unique"],
    description:
      "Chaque maillon forgé à la main. Un objet quotidien élevé au rang de rituel. L'or comme mémoire.",
    details: [
      "Or jaune 18 carats",
      "Longueur 45cm — réglable",
      "Fermoir mousqueton",
      "Livré dans son écrin signature",
    ],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=85&fit=crop",
    ],
  },
  {
    id: "p-007",
    slug: "robe-asymetrique-ecru",
    name: "Robe Asymétrique Écru",
    category: "Robe",
    price: 735_000,
    currency: "FCFA",
    color: "Écru",
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    description:
      "Une robe qui questionne la symétrie. L'asymétrie comme écriture d'un corps libre qui refuse les conventions.",
    details: [
      "100% coton popeline",
      "Encolure asymétrique",
      "Ceinture tissu incluse",
      "Longueur mi-mollet",
      "Atelier lisbonnais",
    ],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=85&fit=crop",
    ],
  },
  {
    id: "p-008",
    slug: "sac-mini-cuir-noir",
    name: "Mini Bag Obsidian",
    category: "Sac",
    price: 1_240_000,
    currency: "FCFA",
    color: "Noir",
    sizes: ["Unique"],
    featured: true,
    description:
      "La radicalité du minimal. Un sac minuscule en cuir box noir qui contient juste l'essentiel. L'espace vide est une déclaration de luxe.",
    details: [
      "Cuir box veau lisse",
      "Quincaillerie dorée mate",
      "Bandoulière amovible dorée",
      "Intérieur suède noir",
      "Maroquinerie parisienne",
    ],
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85&fit=crop",
    ],
  },
  {
    id: "p-009",
    slug: "pantalon-large-noir",
    name: "Pantalon Wide Leg Noir",
    category: "Accessoires",
    price: 445_000,
    currency: "FCFA",
    color: "Noir",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Le pantalon wide leg comme posture. Une jambe large, haute et fluide qui transforme chaque pas en statement.",
    details: [
      "100% crêpe de viscose",
      "Taille haute structurée",
      "Pinces frontales",
      "Jambe ultra-wide",
      "Fermeture zip et bouton pression",
    ],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4bae62?w=800&q=85&fit=crop",
    ],
  },
  {
    id: "p-010",
    slug: "sandales-plateforme",
    name: "Sandales Plateforme Terre",
    category: "Chaussures",
    price: 365_000,
    currency: "FCFA",
    color: "Terre",
    sizes: ["36", "37", "38", "39", "40", "41"],
    description:
      "Une plateforme qui grandit le regard, pas le pas. Le cuir patiné, les brides géométriques — une architecture portée.",
    details: [
      "Cuir suède terre",
      "Semelle plateforme 4cm",
      "Brides ajustables",
      "Intérieur cuir naturel",
      "Artisanat portugais",
    ],
    images: [
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1536301869701-ccd94c22ab57?w=800&q=85&fit=crop",
    ],
  },
  {
    id: "p-011",
    slug: "cache-coeur-soie",
    name: "Cache-cœur en Soie Fluide",
    category: "Robe",
    price: 320_000,
    currency: "FCFA",
    color: "Crème",
    sizes: ["XS", "S", "M"],
    isNew: true,
    description:
      "La soie qui glisse comme une confidence. Un cache-cœur à nouer, à porter seul ou superposé, toujours à sa place.",
    details: [
      "100% soie habotai",
      "Lacets satin pour le nœud",
      "Tombant fluide",
      "Finitions roulottées à la main",
      "Fabriqué en France",
    ],
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=85&fit=crop",
    ],
  },
  {
    id: "p-012",
    slug: "lunettes-oversize",
    name: "Lunettes Oversize Acetate",
    category: "Accessoires",
    price: 255_000,
    currency: "FCFA",
    color: "Écaille",
    sizes: ["Unique"],
    description:
      "Voir et être vue. Une monture acétate XXL qui transforme le regard. La protection solaire comme masque de théâtre.",
    details: [
      "Acétate premium",
      "Verres minéraux gris",
      "Protection UV400",
      "Charnières métal doré",
      "Fabriqué en Italie",
    ],
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=800&q=85&fit=crop",
    ],
  },
];

export const categories = ["Tous", "Manteau", "Robe", "Sac", "Chaussures", "Accessoires"] as const;
export type Category = (typeof categories)[number];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(cat: string): Product[] {
  if (cat === "Tous") return products;
  return products.filter((p) => p.category === cat);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}

export function formatPrice(price: number, currency = "CFA"): string {
  // Format the number to use space as thousands separator and add CFA at the end
  return new Intl.NumberFormat("fr-FR").format(price) + " " + currency;
}
