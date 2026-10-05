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
  country: "AE",
  currency: "AED",
  defaultLocale: "en-AE",
  description:
    "A UAE-based online marketplace offering perfumes, beauty products, fashion, accessories, electronics, and lifestyle products.",
  domain: null,
  name: "SahamGate",
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
    country: "US",
    language: "EN",
    locale: "en-US" as const,
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
