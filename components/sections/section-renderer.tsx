import type { Section } from "@/lib/sections/schema";

import { BrandRailSection } from "./brand-rail-section";
import { CollectionDoorwaysSection } from "./collection-doorways-section";
import { HeroSection } from "./hero-section";
import { ProductRailSection } from "./product-rail-section";

// Sections arrive validated, live and ordered (lib/sections/resolve.ts). Each type maps to one
// component; a type with no component yet renders nothing rather than breaking the page.
export function SectionRenderer({ sections }: { sections: Section[] }) {
  return sections.map((section) => {
    switch (section.type) {
      case "hero":
        return <HeroSection key={section.id} section={section} />;
      case "collectionDoorways":
        return <CollectionDoorwaysSection key={section.id} section={section} />;
      case "brandRail":
        return <BrandRailSection key={section.id} section={section} />;
      case "productRail":
        return <ProductRailSection key={section.id} section={section} />;
      default:
        return null;
    }
  });
}
