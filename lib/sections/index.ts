import { cacheLife, cacheTag } from "next/cache";

import { nextScheduleChange, resolveAnnouncements, resolveSections } from "./resolve";
import type { Announcement, Section } from "./schema";
import { localAnnouncements, localPages } from "./sources/local";

// Content without dates caches like the catalog ("max", refreshed by the `content` tag). When
// something is scheduled, the entry revalidates at that moment, so it flips on or off on time
// without a redeploy and without shortening every page's cache.
function cacheUntilNextChange(raw: unknown[], now: number): void {
  const next = nextScheduleChange(raw, now);
  if (next === null) {
    cacheLife("max");
    return;
  }
  const seconds = Math.max(60, Math.ceil((next - now) / 1000));
  cacheLife({ expire: Math.max(seconds, 3600), revalidate: seconds, stale: 60 });
}

export async function getPageSections(slug: string): Promise<Section[]> {
  "use cache";
  cacheTag("content", `content-${slug}`);
  const raw = localPages[slug] ?? [];
  const now = Date.now();
  cacheUntilNextChange(raw, now);
  return resolveSections(raw, now);
}

export async function getAnnouncements(): Promise<Announcement[]> {
  "use cache";
  cacheTag("content", "content-announcements");
  const now = Date.now();
  cacheUntilNextChange(localAnnouncements, now);
  return resolveAnnouncements(localAnnouncements, now);
}
