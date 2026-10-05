import Link from "next/link";

import type { ShopBrand } from "@/lib/config/types";

export function brandUrl(brand: ShopBrand): string {
  return "collection" in brand
    ? `/collections/${brand.collection}`
    : `/search?q=${encodeURIComponent(brand.searchQuery)}`;
}

interface BrandGridProps {
  brands: ShopBrand[];
}

// Typographic brand tiles: brands have no logos in the store yet, and names render instantly.
export function BrandGrid({ brands }: BrandGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
      {brands.map((brand) => (
        <li key={brand.name}>
          <Link
            href={brandUrl(brand)}
            className="flex h-28 items-center justify-center bg-surface-alt px-5 text-center transition-colors hover:bg-secondary/70 md:h-36"
          >
            <span className="font-display text-xl text-foreground md:text-2xl">{brand.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
