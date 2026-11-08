import { PredictiveSearchProvider } from "@shopify/hydrogen/react";
import Link from "next/link";
import { Suspense } from "react";

import { brandUrl } from "@/components/brands/brand-grid";
import { Container } from "@/components/ui/container";
import { shopConfig } from "@/lib/config";
import type { BrandLink, BrandNavLink } from "@/lib/config/types";
import type { MenuItem } from "@/lib/menu/types";

import { NavAccount, NavAccountFallback } from "./account";
import { CartIcon, CartIconFallback } from "./cart";
import { MobileMenu } from "./mobile-menu";
import { QuickLinks } from "./quick-links";
import { SearchModal } from "./search-modal";

const BRANDS_PER_COLUMN = 5;

function brandColumns(): Array<{ links: BrandLink[]; title: string }> {
  const links = shopConfig.brand.brands.map((brand) => ({
    title: brand.name,
    url: brandUrl(brand),
  }));
  const columns = [];
  for (let start = 0; start < links.length; start += BRANDS_PER_COLUMN) {
    columns.push({
      links: links.slice(start, start + BRANDS_PER_COLUMN),
      title: start === 0 ? "Houses" : "More houses",
    });
  }
  return columns;
}

// Column headings have no URL of their own; the menus render them as labels.
function toMenuItem(link: BrandNavLink): MenuItem {
  const id = `nav-${link.url}`;
  const columns = [...(link.columns ?? []), ...(link.withBrands ? brandColumns() : [])];
  return {
    id,
    items: columns.map((column, index) => ({
      id: `${id}-column-${index}`,
      items: column.links.map((leaf) => ({
        id: `${id}-${leaf.url}`,
        items: [],
        title: leaf.title,
        url: leaf.url,
      })),
      title: column.title,
      url: "",
    })),
    title: link.title,
    url: link.url,
  };
}

export function Nav() {
  const items = shopConfig.brand.navigation.map(toMenuItem);
  return (
    <nav
      className="sticky top-0 z-30 w-full border-b border-border bg-background pt-[env(safe-area-inset-top,0px)] transition-shadow duration-250"
      id="nav-outer"
    >
      <Container className="flex h-16 items-center gap-2.5 md:gap-5">
        <MobileMenu items={items} />

        <Link className="flex items-center shrink-0" href="/">
          <span className="font-display text-2xl leading-none">{shopConfig.site.name}</span>
        </Link>

        <QuickLinks items={items} />

        <div className="flex items-center gap-5 ml-auto">
          {shopConfig.search.isEnabled && (
            <PredictiveSearchProvider
              debounceInMs={300}
              limit={3}
              types={["PRODUCT", "COLLECTION", "QUERY"]}
            >
              <SearchModal />
            </PredictiveSearchProvider>
          )}
          {shopConfig.auth.isEnabled && (
            <Suspense fallback={<NavAccountFallback />}>
              <NavAccount />
            </Suspense>
          )}
          <Suspense fallback={<CartIconFallback />}>
            <CartIcon />
          </Suspense>
        </div>
      </Container>
    </nav>
  );
}
