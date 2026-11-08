import { getAnnouncements } from "@/lib/sections";

import { AnnouncementRotator } from "./announcement-rotator";

export async function AnnouncementBar() {
  const announcements = await getAnnouncements();
  if (announcements.length === 0) return null;
  return (
    <AnnouncementRotator
      label="Announcements"
      messages={announcements.map(({ id, link, text }) => ({ id, link, text }))}
    />
  );
}
