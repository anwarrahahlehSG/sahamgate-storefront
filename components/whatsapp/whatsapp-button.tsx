import { cn } from "cn";

import { SocialIcon } from "@/components/footer/social-links";
import { shopConfig } from "@/lib/config";
import { getWhatsAppUrl } from "@/lib/contact";

export function WhatsAppButton() {
  const url = getWhatsAppUrl();
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "fixed right-5 z-30 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
        // Sit above the agent ActionBar pill when it renders.
        shopConfig.agent.isEnabled ? "bottom-20" : "bottom-5",
      )}
    >
      <SocialIcon platform="whatsapp" className="size-7" />
    </a>
  );
}
