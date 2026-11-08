import { type Announcement, announcementSchema, type Section, sectionSchema } from "./schema";

interface Scheduled {
  enabled: boolean;
  endsAt?: string;
  startsAt?: string;
}

export function isLive(item: Scheduled, now: number): boolean {
  if (!item.enabled) return false;
  if (item.startsAt && Date.parse(item.startsAt) > now) return false;
  if (item.endsAt && Date.parse(item.endsAt) <= now) return false;
  return true;
}

// A badly configured section is dropped and logged; the rest of the page still renders.
export function resolveSections(raw: unknown[], now: number): Section[] {
  return raw
    .flatMap((entry) => {
      const parsed = sectionSchema.safeParse(entry);
      if (!parsed.success) {
        console.error("[sections] Skipping invalid section", parsed.error.issues);
        return [];
      }
      return [parsed.data];
    })
    .filter((section) => isLive(section, now))
    .map((section) =>
      section.type === "hero"
        ? { ...section, slides: section.slides.filter((slide) => isLive(slide, now)) }
        : section,
    )
    .filter((section) => section.type !== "hero" || section.slides.length > 0)
    .toSorted((a, b) => a.order - b.order);
}

export function resolveAnnouncements(raw: unknown[], now: number): Announcement[] {
  return raw.flatMap((entry) => {
    const parsed = announcementSchema.safeParse(entry);
    if (!parsed.success) {
      console.error("[sections] Skipping invalid announcement", parsed.error.issues);
      return [];
    }
    return isLive(parsed.data, now) ? [parsed.data] : [];
  });
}

// The soonest future start or end date anywhere in the content, so the cache can expire exactly
// when something scheduled should appear or disappear.
export function nextScheduleChange(raw: unknown[], now: number): number | null {
  let next: number | null = null;
  const visit = (value: unknown) => {
    if (Array.isArray(value)) return value.forEach(visit);
    if (!value || typeof value !== "object") return;
    for (const [key, field] of Object.entries(value)) {
      if ((key === "startsAt" || key === "endsAt") && typeof field === "string") {
        const time = Date.parse(field);
        if (time > now && (next === null || time < next)) next = time;
      } else {
        visit(field);
      }
    }
  };
  visit(raw);
  return next;
}
