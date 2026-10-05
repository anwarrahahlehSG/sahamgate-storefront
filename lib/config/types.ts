import type { ConsentConfig, I18nConfig } from "@shopify/hydrogen";
import type { initBotId } from "botid/client/core";
import type { NextConfig } from "next";

export interface BrandConfig {
  assets: {
    favicon: string;
    logo: string;
    logoDark: string;
    ogImage: string;
  };
  // Product brands the store carries, in display order. A brand opens its Shopify collection when
  // it has one; otherwise it opens a title search until product vendors are corrected.
  brands: ShopBrand[];
  // Descriptive brand facts only; Shopify pricing context comes from `localization`.
  country: string;
  currency: string;
  defaultLocale: string;
  description: string;
  domain: string | null;
  // Homepage composition. Collection handles must exist in the store; missing ones are skipped.
  home: {
    featuredCollections: string[];
    hero: {
      eyebrow: string;
      heading: string;
      primaryCta: BrandLink;
      secondaryCta: BrandLink | null;
    };
  };
  name: string;
  // Top-level header links, in order.
  navigation: BrandLink[];
  social: Record<BrandSocialPlatform, string | null>;
  supportEmail: string | null;
  supportedLocales: string[];
}

export type ShopBrand = ({ collection: string } | { searchQuery: string }) & {
  // Official logo saved under public/brand/logos; see the README there for sources.
  logo?: BrandLogo;
  name: string;
};

export interface BrandLogo {
  // Light-coloured logos need a dark tile to stay visible.
  isOnDark?: boolean;
  src: string;
}

export interface BrandLink {
  title: string;
  url: string;
}

export type BrandSocialPlatform =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "whatsapp"
  | "x"
  | "youtube";

export type CommerceLocale = Pick<I18nConfig, "country" | "language">;

export interface NextConfigContext {
  defaultConfig: NextConfig;
}

export type NextConfigFactory = (
  phase: string,
  context: NextConfigContext,
) => NextConfig | Promise<NextConfig>;

export type NextConfigInput = NextConfig | NextConfigFactory;

export type NextConfigPlugin = (config: NextConfig) => NextConfigInput | Promise<NextConfigInput>;

export interface ShopConfig {
  agent: {
    isEnabled: boolean;
  };
  analytics: {
    shopify: {
      consent: {
        isEnabled: boolean;
        mode: NonNullable<ConsentConfig["mode"]>;
      };
      isEnabled: boolean;
    };
    speedInsights: {
      isEnabled: boolean;
    };
    vercel: {
      isEnabled: boolean;
    };
  };
  auth: {
    isEnabled: boolean;
  };
  botid: {
    checkLevel: NonNullable<
      NonNullable<
        Parameters<typeof initBotId>[0]["protect"][number]["advancedOptions"]
      >["checkLevel"]
    >;
    isEnabled: boolean;
  };
  brand: BrandConfig;
  localization: CommerceLocale & {
    locale: string;
  };
  merchandising: {
    // Percentage-off pills. Off for SahamGate: a markdown shows only as a muted compare-at price.
    discountBadge: {
      isEnabled: boolean;
    };
  };
  pdp: {
    bundles: {
      isEnabled: boolean;
    };
    buyWithShop: {
      isEnabled: boolean;
    };
    complementaryProducts: {
      isEnabled: boolean;
    };
    quantityPicker: {
      isEnabled: boolean;
    };
    relatedProducts: {
      isEnabled: boolean;
    };
  };
  redirects: {
    shopifyNotFound: {
      isEnabled: boolean;
    };
  };
  search: {
    isEnabled: boolean;
  };
  shopify: {
    webmcp: {
      isEnabled: boolean;
    };
  };
  site: {
    description: string;
    name: string;
    url: string;
  };
}
