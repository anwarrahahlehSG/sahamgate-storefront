import type { BrandConfig, ShopConfig } from "./types";

const defaultUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

// Swap this block to run the same storefront for another brand.
const brand: BrandConfig = {
  assets: {
    favicon: "/brand/favicon.ico",
    logo: "/brand/logo.svg",
    logoDark: "/brand/logo-dark.svg",
    ogImage: "/brand/og-default.jpg",
  },
  brands: [
    {
      name: "Ibrahim Al Qurashi",
      collection: "ibraq-ibraheem-al-qurashi",
      logo: { src: "/brand/logos/ibrahim-al-qurashi.png" },
    },
    { name: "Match", searchQuery: "Match", logo: { src: "/brand/logos/match.png" } },
    { name: "Bloom", searchQuery: "Bloom", logo: { src: "/brand/logos/bloom.png" } },
    {
      name: "Abdul Samad Al Qurashi",
      collection: "abdul-samad-alqurashi",
      logo: { src: "/brand/logos/abdul-samad-al-qurashi.png" },
    },
    {
      name: "Assaf",
      searchQuery: "Assaf",
      logo: { isOnDark: true, src: "/brand/logos/assaf.png" },
    },
    { name: "Laverne", searchQuery: "Laverne", logo: { src: "/brand/logos/laverne.png" } },
    { name: "Rasasi", searchQuery: "Rasasi", logo: { src: "/brand/logos/rasasi.png" } },
    {
      name: "Ahmed Al Maghribi",
      searchQuery: "Ahmad",
      logo: { src: "/brand/logos/ahmed-al-maghribi.svg" },
    },
    {
      name: "Lattafa",
      collection: "lattafa-perfumes",
      logo: { src: "/brand/logos/lattafa.png" },
    },
    { name: "Ajmal", searchQuery: "Ajmal", logo: { src: "/brand/logos/ajmal.svg" } },
  ],
  country: "AE",
  currency: "AED",
  defaultLocale: "en-AE",
  description:
    "A UAE-based online marketplace offering perfumes, beauty products, fashion, accessories, electronics, and lifestyle products.",
  domain: null,
  home: {
    featuredCollections: [
      "perfumes",
      "ibraq-ibraheem-al-qurashi",
      "abdul-samad-alqurashi",
      "gifts-sets",
    ],
    hero: {
      eyebrow: "UAE online marketplace",
      heading: "Find a scent that feels like you",
      primaryCta: { title: "Explore perfumes", url: "/collections/perfumes" },
      secondaryCta: { title: "Shop everything", url: "/collections/all" },
    },
  },
  name: "SahamGate",
  navigation: [
    { title: "Perfumes", url: "/collections/perfumes" },
    { title: "Brands", url: "/brands" },
    { title: "Gift sets", url: "/collections/gifts-sets" },
    { title: "Collections", url: "/collections" },
    { title: "Shop all", url: "/collections/all" },
  ],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61575978154923",
    instagram: "https://www.instagram.com/sahamgateshop",
    tiktok: "https://www.tiktok.com/@saham.gate",
    whatsapp: null,
    x: null,
    youtube: null,
  },
  supportEmail: null,
  supportedLocales: ["en-AE", "ar-AE"],
};

export const shopConfig = {
  agent: {
    isEnabled: false,
  },
  analytics: {
    shopify: {
      consent: {
        isEnabled: false,
        mode: "default-banner",
      },
      isEnabled: false,
    },
    speedInsights: {
      isEnabled: false,
    },
    vercel: {
      isEnabled: false,
    },
  },
  auth: {
    isEnabled: false,
  },
  botid: {
    checkLevel: "basic",
    isEnabled: false,
  },
  brand,
  localization: {
    country: "AE",
    language: "EN",
    locale: "en-AE" as const,
  },
  merchandising: {
    discountBadge: {
      isEnabled: false,
    },
  },
  pdp: {
    bundles: {
      isEnabled: true,
    },
    buyWithShop: {
      isEnabled: true,
    },
    complementaryProducts: {
      isEnabled: true,
    },
    quantityPicker: {
      isEnabled: true,
    },
    relatedProducts: {
      isEnabled: true,
    },
  },
  redirects: {
    shopifyNotFound: {
      isEnabled: false,
    },
  },
  search: {
    isEnabled: true,
  },
  shopify: {
    webmcp: {
      isEnabled: false,
    },
  },
  site: {
    description: brand.description,
    name: brand.name,
    url: defaultUrl,
  },
} satisfies ShopConfig;

export const isShopifyScriptsEnabled =
  shopConfig.analytics.shopify.isEnabled ||
  shopConfig.analytics.shopify.consent.isEnabled ||
  shopConfig.shopify.webmcp.isEnabled;
