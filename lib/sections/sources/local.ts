import { shopConfig } from "@/lib/config";

// Typed content for now; a Shopify metaobject source can replace this file without touching
// components. Entries are validated in resolve.ts, so a typo here drops one section, not the page.
const { brand } = shopConfig;

export const localPages: Record<string, unknown[]> = {
  home: [
    {
      autoplayMs: 7000,
      enabled: true,
      id: "home-hero",
      order: 0,
      slides: [
        {
          align: "start",
          enabled: true,
          eyebrow: brand.home.hero.eyebrow,
          headline: brand.home.hero.heading,
          id: "find-your-scent",
          primaryCta: brand.home.hero.primaryCta,
          secondaryCta: brand.home.hero.secondaryCta ?? undefined,
          subheadline: brand.description,
          tone: "oud",
        },
        {
          align: "start",
          enabled: true,
          eyebrow: "Featured house",
          headline: "Ibrahim Al Qurashi",
          id: "house-ibrahim-al-qurashi",
          primaryCta: { title: "Explore the house", url: "/collections/ibraq-ibraheem-al-qurashi" },
          secondaryCta: { title: "All brands", url: "/brands" },
          tone: "amber",
        },
        {
          align: "start",
          enabled: true,
          eyebrow: "Gift sets",
          headline: "Gifts, ready to give",
          id: "gift-sets",
          primaryCta: { title: "Shop gift sets", url: "/collections/gifts-sets" },
          tone: "dune",
        },
      ],
      type: "hero",
    },
    {
      enabled: true,
      handles: brand.home.featuredCollections,
      id: "home-doorways",
      order: 10,
      title: "Shop by collection",
      type: "collectionDoorways",
    },
    {
      collection: "perfumes",
      cta: { title: "View all", url: "/collections/perfumes" },
      enabled: true,
      id: "home-perfumes-rail",
      limit: 12,
      order: 20,
      title: "Perfumes",
      type: "productRail",
    },
    {
      cta: { title: "All brands", url: "/brands" },
      enabled: brand.brands.length > 0,
      id: "home-brands",
      order: 30,
      title: "Shop by brand",
      type: "brandRail",
    },
    {
      collection: "gifts-sets",
      cta: { title: "View all", url: "/collections/gifts-sets" },
      enabled: true,
      id: "home-gifts-rail",
      limit: 12,
      order: 40,
      title: "Gift sets",
      type: "productRail",
    },
  ],
};

export const localAnnouncements: unknown[] = [
  {
    enabled: true,
    id: "authentic",
    text: "Authentic brands only",
  },
  {
    enabled: true,
    id: "houses",
    link: { title: "Shop by brand", url: "/brands" },
    text: "Perfume houses from Ibrahim Al Qurashi to Rasasi",
  },
  {
    enabled: true,
    id: "gifts",
    link: { title: "Shop gift sets", url: "/collections/gifts-sets" },
    text: "Gift sets for every occasion",
  },
];
