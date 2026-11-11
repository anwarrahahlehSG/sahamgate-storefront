import type { ProductFilter } from "@shopify/hydrogen";
import { serializeCollectionParams } from "@shopify/hydrogen";

import type { Tone } from "@/lib/sections/schema";

// Campaign landing pages that ads point to. Each one is a fixed, in-stock slice of a real Shopify
// collection; products, prices and stock always come from Shopify when the page renders.
export interface LandingPageConfig {
  // Shown under the grid so a visitor who wants something else has one obvious next step.
  crossLink: { title: string; url: string };
  description: string;
  eyebrow: string;
  handle: string;
  // Storefront API filters applied on top of the collection.
  filters: ProductFilter[];
  intro: string;
  // Products shown before the "view all" link takes over.
  limit: number;
  // Upper price bound in shop currency, re-checked on the server so a store without the price
  // filter enabled in Search & Discovery still never shows a product above it.
  maxPrice?: number;
  path: string;
  title: string;
  tone: Extract<Tone, "amber" | "dune">;
}

const IN_STOCK: ProductFilter = { available: true };

export const UNDER_199_MAX_PRICE = 199;

export const landingPages = {
  giftSets: {
    crossLink: { title: "Perfumes under 199 AED", url: "/perfumes-under-199" },
    description:
      "Perfume gift sets from SahamGate, ready to give. Free shipping on qualifying orders across the UAE.",
    eyebrow: "Gift sets",
    filters: [IN_STOCK],
    handle: "gifts-sets",
    intro: "Perfume sets, ready to give.",
    limit: 48,
    path: "/gift-sets",
    title: "Gift sets",
    tone: "amber",
  },
  perfumesUnder199: {
    crossLink: { title: "Shop gift sets", url: "/gift-sets" },
    description: `Perfumes under ${UNDER_199_MAX_PRICE} AED from SahamGate. Free shipping on qualifying orders across the UAE.`,
    eyebrow: "Perfumes",
    filters: [IN_STOCK, { price: { max: UNDER_199_MAX_PRICE } }],
    handle: "perfumes",
    intro: `Every perfume here is ${UNDER_199_MAX_PRICE} AED or less.`,
    limit: 48,
    maxPrice: UNDER_199_MAX_PRICE,
    path: "/perfumes-under-199",
    title: `Perfumes under ${UNDER_199_MAX_PRICE} AED`,
    tone: "dune",
  },
} satisfies Record<string, LandingPageConfig>;

// The full, filtered collection page, for when a landing page has more products than it shows.
export function landingViewAllUrl(page: LandingPageConfig): string {
  const search = serializeCollectionParams({
    filters: page.filters,
    reverse: false,
    sortKey: undefined,
  }).toString();
  return `/collections/${page.handle}${search ? `?${search}` : ""}`;
}
