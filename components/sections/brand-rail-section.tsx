import { BrandTile } from "@/components/brands/brand-grid";
import { Container } from "@/components/ui/container";
import { Rail } from "@/components/ui/rail";
import { shopConfig } from "@/lib/config";
import type { SectionOfType } from "@/lib/sections/schema";

import { SectionHeading } from "./section-heading";

// Brands come from brand config (official logos), in its order.
export function BrandRailSection({ section }: { section: SectionOfType<"brandRail"> }) {
  const { brands } = shopConfig.brand;
  if (brands.length === 0) return null;
  return (
    <Container>
      <div className="grid grid-cols-1 gap-4">
        <SectionHeading cta={section.cta} title={section.title} />
        <Rail label={section.title} nextLabel="More brands" previousLabel="Previous brands">
          {brands.map((brand) => (
            <li key={brand.name} className="w-40 shrink-0 snap-start md:w-56">
              <BrandTile brand={brand} />
            </li>
          ))}
        </Rail>
      </div>
    </Container>
  );
}
