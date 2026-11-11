import { cn } from "cn";
import Link from "next/link";
import { Suspense } from "react";

import { ProductCard, ProductCardSkeleton } from "@/components/product-card/product-card";
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema";
import { Container } from "@/components/ui/container";
import { getCollectionProductsPreview } from "@/lib/collections/server";
import { type LandingPageConfig, landingViewAllUrl } from "@/lib/landing";

import { FreeShippingBand } from "./free-shipping-band";

const TONE_CLASS: Record<LandingPageConfig["tone"], string> = {
  amber: "bg-atmosphere-amber",
  dune: "bg-surface-alt",
};

const GRID_CLASS =
  "grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12";

const LINK_CLASS =
  "inline-flex h-12 items-center justify-center rounded-lg px-6 text-sm font-medium transition-colors duration-(--brand-duration-quick) ease-brand";

// A focused page for ad traffic: shipping promise, one heading, the products, and a way onward.
// No filters or sort, so the first screen is products, not controls.
export function LandingPage({ page }: { page: LandingPageConfig }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: page.title, path: page.path },
        ]}
      />
      <FreeShippingBand />

      <div className={cn("text-foreground", TONE_CLASS[page.tone])}>
        <Container className="flex flex-col items-start gap-3 pt-4 pb-7 md:gap-4 md:pt-8 md:pb-14">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link className="hover:text-foreground" href="/">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page">{page.title}</li>
            </ol>
          </nav>
          <p className="hidden pt-8 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground md:block">
            {page.eyebrow}
          </p>
          <h1 className="max-w-3xl pt-2 font-display text-3xl md:pt-0 md:text-6xl">{page.title}</h1>
          <p className="max-w-xl text-sm text-muted-foreground md:text-lg">{page.intro}</p>
        </Container>
      </div>

      <Container className="pt-5 pb-16 md:pt-12 md:pb-24" id="products">
        <h2 className="sr-only">Products</h2>
        <Suspense fallback={<LandingGridSkeleton />}>
          <LandingProducts page={page} />
        </Suspense>
      </Container>
    </>
  );
}

async function LandingProducts({ page }: { page: LandingPageConfig }) {
  // One extra product tells us whether there is more than the page shows.
  const fetched = await getCollectionProductsPreview({
    filters: page.filters,
    handle: page.handle,
    limit: page.limit + 1,
  });
  const { maxPrice } = page;
  const matching =
    maxPrice === undefined
      ? fetched
      : fetched.filter((product) => Number(product.price.amount) <= maxPrice);
  const products = matching.slice(0, page.limit);
  const hasMore = matching.length > page.limit;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="font-display text-2xl">Nothing in stock here right now</p>
        <p className="max-w-md text-muted-foreground">
          New stock arrives often. In the meantime, every perfume is one tap away.
        </p>
        <Link
          className={cn(LINK_CLASS, "bg-primary text-primary-foreground hover:bg-primary-deep")}
          href="/collections/perfumes"
        >
          Shop all perfumes
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:gap-10">
      <p className="text-sm text-muted-foreground">
        {hasMore ? `Showing ${products.length}` : products.length}{" "}
        {products.length === 1 ? "product" : "products"}
        {hasMore ? "" : " in stock"}
      </p>
      <ul className={GRID_CLASS}>
        {products.map((product, index) => (
          <li key={product.id}>
            <ProductCard
              loading={index < 4 ? "eager" : "lazy"}
              outOfStockText="Out of Stock"
              product={product}
            />
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center justify-center gap-3 border-t border-border pt-10">
        {hasMore && (
          <Link
            className={cn(LINK_CLASS, "bg-primary text-primary-foreground hover:bg-primary-deep")}
            href={landingViewAllUrl(page)}
          >
            View all
          </Link>
        )}
        <Link
          className={cn(LINK_CLASS, "border border-border hover:bg-surface-alt")}
          href={page.crossLink.url}
        >
          {page.crossLink.title}
        </Link>
        <Link
          className={cn(LINK_CLASS, "border border-border hover:bg-surface-alt")}
          href="/collections/perfumes"
        >
          All perfumes
        </Link>
      </div>
    </div>
  );
}

function LandingGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-10">
      <div className="h-5" />
      <div className={GRID_CLASS}>
        {Array.from({ length: 8 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
