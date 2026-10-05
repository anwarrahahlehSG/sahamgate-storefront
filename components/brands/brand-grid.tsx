import { cn } from "cn";
import Image from "next/image";
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

// Official logos where we have them; otherwise the brand name set in the display face.
export function BrandGrid({ brands }: BrandGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
      {brands.map((brand) => (
        <li key={brand.name}>
          <Link
            href={brandUrl(brand)}
            className={cn(
              "flex h-28 items-center justify-center px-5 text-center transition-opacity hover:opacity-80 md:h-36",
              brand.logo?.isOnDark ? "bg-foreground" : "bg-surface-alt",
            )}
          >
            {brand.logo ? (
              <span className="relative h-14 w-full max-w-40 md:h-20">
                <Image
                  src={brand.logo.src}
                  alt={brand.name}
                  fill
                  sizes="100vw"
                  unoptimized={brand.logo.src.endsWith(".svg")}
                  // Multiply drops the white boxes some brands ship around their logos.
                  className={cn("object-contain", !brand.logo.isOnDark && "mix-blend-multiply")}
                />
              </span>
            ) : (
              <span className="font-display text-xl text-foreground md:text-2xl">{brand.name}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
