# Luxe Mode — E-Commerce de Mode de Luxe Féminine

> *"Silence is luxury."*

Site e-commerce portfolio démontrant une maîtrise avancée de l'animation, UI/UX haut de gamme et architecture frontend moderne. Inspiré de Celine, The Row et Bottega Veneta.

---

## Stack Technique

| Technologie | Rôle |
|---|---|
| **Next.js 14** (App Router) | Framework SSR/SSG |
| **React 18 + TypeScript** | Interface utilisateur |
| **Tailwind CSS v3** | Styling utilitaire |
| **Framer Motion v11** | Animations React |
| **GSAP + ScrollTrigger** | Animations scroll avancées |
| **Zustand** | State management panier |
| **Lenis** | Smooth scroll inertia |
| **next/font** | Google Fonts (Cormorant Garamond + Inter) |

---

## Installation Rapide

```bash
# 1. Cloner le projet
git clone <repo-url>
cd luxe-mode

# 2. Installer les dépendances
npm install

# 3. Démarrer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Structure du Projet

```
src/
├── app/
│   ├── layout.tsx           # Root layout — fonts, Lenis, Navbar, CartDrawer
│   ├── page.tsx             # Landing page (Hero + Story + Collection)
│   ├── globals.css          # Design system global
│   ├── shop/
│   │   └── page.tsx         # Catalogue avec filtres animés
│   └── product/
│       └── [slug]/
│           ├── layout.tsx   # generateStaticParams
│           └── page.tsx     # Page produit (galerie + CTA)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Navigation sticky + mobile menu
│   │   └── Footer.tsx       # Footer éditorial + newsletter
│   ├── ui/
│   │   ├── CustomCursor.tsx # Curseur deux couches (dot + ring spring)
│   │   ├── LoadingScreen.tsx# Intro cinématique avec compteur
│   │   ├── AnimatedText.tsx # Text reveal (words / chars / lines)
│   │   ├── LenisProvider.tsx# Smooth scroll GSAP sync
│   │   └── Marquee.tsx      # Ruban texte défilant infini
│   ├── home/
│   │   ├── Hero.tsx         # Hero fullscreen GSAP parallax
│   │   ├── ScrollStory.tsx  # 3 panels narratifs au scroll
│   │   └── NewCollection.tsx# Grille produits featured staggerée
│   ├── shop/
│   │   ├── ProductCard.tsx  # Carte produit hover + quick-add
│   │   ├── FilterBar.tsx    # Filtres catégories Framer Motion tabs
│   │   └── ProductGrid.tsx  # Grille avec AnimatePresence filter
│   ├── product/
│   │   ├── ProductGallery.tsx # Galerie crossfade + thumbnails
│   │   └── AddToCartButton.tsx# CTA 3 états animés
│   └── cart/
│       └── CartDrawer.tsx   # Drawer slide-in Framer Motion
└── lib/
    ├── data.ts              # 12 produits mockés + helpers
    └── store.ts             # Zustand cart store (persisté)
```

---

## Variables d'Environnement

Aucune variable d'environnement requise pour la version portfolio.

En production, ajouter dans `.env.local` :

```env
# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Stripe (si paiement réel)
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

---

## Palette & Design System

```
Fond          #0A0A0A   Obsidian
Accent        #C9A96E   Or Champagne
Texte         #F5F0EA   Ivoire
Secondaire    #888070   Sable
Surface       #111111   Surface 1
```

**Typographie**
- Titres : `Cormorant Garamond` 300–600wt (serif éditorial)
- Corps : `Inter` 300–600wt (sans-serif neutre)

---

## Choix Techniques d'Animation

### Pourquoi Lenis + GSAP et non ScrollTrigger seul ?
Lenis remplace le scroll natif par une inertie personnalisée. GSAP ScrollTrigger est synchronisé via `lenis.on('scroll', ScrollTrigger.update)` pour que les deux systèmes ne se désynchronisent pas.

### Curseur custom : deux couches
- **Dot** : mise à jour directe DOM via `style.left/top` — instantané, 0 latence
- **Ring** : `useSpring` Framer Motion — friction naturelle (stiffness 120, damping 20)

### CartDrawer : `AnimatePresence` + `layout`
Chaque ligne du panier utilise `layout` de Framer Motion : quand un item est supprimé, les items restants se repositionnent avec une spring animation, pas un saut.

### Filtres produit : `layoutId`
Le chip actif utilise un `layoutId="filter-active"` partagé. Framer Motion interpole automatiquement la position du fond entre les chips — effet "sliding highlight".

---

## Performance Lighthouse

Optimisations incluses :
- `next/image` avec `priority` sur les images above-fold
- `loading="lazy"` sur toutes les images below-fold
- `will-change: transform` uniquement sur les éléments animés
- `display: swap` sur les fonts (pas de FOUT)
- Images servies en AVIF/WebP via Next.js image optimization
- `partialize` Zustand : seul le panier est persisté (pas l'état UI)

---

## Scripts

```bash
npm run dev      # Développement (localhost:3000)
npm run build    # Build production
npm run start    # Serveur production
npm run lint     # ESLint
```

---

*Portfolio project — Luxe Mode, Paris 2025*
