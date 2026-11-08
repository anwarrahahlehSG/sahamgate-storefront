import { z } from "zod";

// Page content is data: sections reference collections by handle and never carry prices, stock or
// variants, which always come from Shopify when the section renders.

const isoDate = z.iso.datetime({ offset: true });

const schedule = {
  enabled: z.boolean(),
  endsAt: isoDate.optional(),
  startsAt: isoDate.optional(),
};

const linkSchema = z.object({
  title: z.string().min(1),
  url: z.string().startsWith("/"),
});

const imageSchema = z.object({
  alt: z.string(),
  height: z.number().int().positive(),
  kind: z.literal("image"),
  src: z.string().min(1),
  width: z.number().int().positive(),
});

const videoSchema = z.object({
  alt: z.string(),
  kind: z.literal("video"),
  // Phones only play video when a mobile cut exists.
  mobileSrc: z.string().min(1).optional(),
  poster: z.string().min(1),
  src: z.string().min(1),
});

export const mediaSchema = z.discriminatedUnion("kind", [imageSchema, videoSchema]);

// Each tone maps onto brand tokens, so slides never hardcode colours.
export const toneSchema = z.enum(["ivory", "dune", "oud", "amber", "gulf"]);

const heroSlideSchema = z.object({
  ...schedule,
  align: z.enum(["start", "center"]),
  eyebrow: z.string().optional(),
  headline: z.string().min(1),
  id: z.string().min(1),
  media: mediaSchema.optional(),
  primaryCta: linkSchema,
  secondaryCta: linkSchema.optional(),
  subheadline: z.string().optional(),
  tone: toneSchema,
});

const sectionBase = {
  ...schedule,
  id: z.string().min(1),
  order: z.number().int(),
};

const heroSectionSchema = z.object({
  ...sectionBase,
  autoplayMs: z.number().int().min(5000).optional(),
  slides: z.array(heroSlideSchema).min(1),
  type: z.literal("hero"),
});

const collectionDoorwaysSectionSchema = z.object({
  ...sectionBase,
  handles: z.array(z.string().min(1)).min(1),
  title: z.string().min(1),
  type: z.literal("collectionDoorways"),
});

const brandRailSectionSchema = z.object({
  ...sectionBase,
  cta: linkSchema.optional(),
  title: z.string().min(1),
  type: z.literal("brandRail"),
});

const productRailSectionSchema = z.object({
  ...sectionBase,
  collection: z.string().min(1),
  cta: linkSchema.optional(),
  limit: z.number().int().min(1).max(24),
  title: z.string().min(1),
  type: z.literal("productRail"),
});

export const sectionSchema = z.discriminatedUnion("type", [
  heroSectionSchema,
  collectionDoorwaysSectionSchema,
  brandRailSectionSchema,
  productRailSectionSchema,
]);

export const announcementSchema = z.object({
  ...schedule,
  id: z.string().min(1),
  link: linkSchema.optional(),
  text: z.string().min(1),
});

export type Media = z.infer<typeof mediaSchema>;
export type Tone = z.infer<typeof toneSchema>;
export type HeroSlide = z.infer<typeof heroSlideSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type SectionOfType<T extends Section["type"]> = Extract<Section, { type: T }>;
export type Announcement = z.infer<typeof announcementSchema>;
