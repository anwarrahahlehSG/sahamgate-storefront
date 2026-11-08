import { Suspense } from "react";

import { ProductCard, ProductCardSkeleton } from "@/components/product-card/product-card";
import { Container } from "@/components/ui/container";
import { Rail } from "@/components/ui/rail";
import { getCollectionProductsPreview } from "@/lib/collections/server";
import type { SectionOfType } from "@/lib/sections/schema";

import { SectionHeading } from "./section-heading";

const ITEM_CLASS = "w-[44vw] shrink-0 snap-start sm:w-56 lg:w-64";

// The heading streams with the products so an empty or missing collection hides the whole section.
export function ProductRailSection({ section }: { section: SectionOfType<"productRail"> }) {
  return (
    <Suspense
      fallback={<ProductRailSkeleton count={Math.min(section.limit, 5)} section={section} />}
    >
      <ProductRail section={section} />
    </Suspense>
  );
}

async function ProductRail({ section }: { section: SectionOfType<"productRail"> }) {
  const products = await getCollectionProductsPreview({
    handle: section.collection,
    limit: section.limit,
  });
  if (products.length === 0) return null;
  return (
    <Container>
      <div className="grid grid-cols-1 gap-4">
        <SectionHeading cta={section.cta} title={section.title} />
        <Rail label={section.title} nextLabel="More products" previousLabel="Previous products">
          {products.map((product) => (
            <li key={product.id} className={ITEM_CLASS}>
              <ProductCard outOfStockText="Out of Stock" product={product} />
            </li>
          ))}
        </Rail>
      </div>
    </Container>
  );
}

function ProductRailSkeleton({
  count,
  section,
}: {
  count: number;
  section: SectionOfType<"productRail">;
}) {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-4">
        <SectionHeading cta={section.cta} title={section.title} />
        <div className="-mx-5 flex gap-3 overflow-hidden px-5 lg:-mx-10 lg:gap-5 lg:px-10">
          {Array.from({ length: count }, (_, index) => (
            <ProductCardSkeleton key={index} className={ITEM_CLASS} />
          ))}
        </div>
      </div>
    </Container>
  );
}
