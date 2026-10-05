import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { BrandGrid } from "@/components/brands/brand-grid";
import {
  CollectionDoorways,
  CollectionDoorwaysSkeleton,
} from "@/components/home/collection-doorways";
import { HomeHero } from "@/components/home/hero";
import { ProductsGrid } from "@/components/product/products-grid";
import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Home";
  const description = shopConfig.site.description;
  return {
    title: `${title} | ${shopConfig.site.name}`,
    description,
    alternates: buildAlternates({ pathname: "/" }),
    openGraph: buildOpenGraph({
      title,
      description,
      url: "/",
      type: "website",
    }),
  };
}

export default function HomePage() {
  const { featuredCollections, hero } = shopConfig.brand.home;
  const doorwaysTitle = "Shop by collection";
  return (
    <Page className="pt-0">
      <Sections>
        <HomeHero
          description={shopConfig.site.description}
          eyebrow={hero.eyebrow}
          heading={hero.heading}
          primaryCta={hero.primaryCta}
          secondaryCta={hero.secondaryCta}
        />

        {featuredCollections.length > 0 && (
          <Container>
            <Suspense
              fallback={
                <CollectionDoorwaysSkeleton
                  count={featuredCollections.length}
                  title={doorwaysTitle}
                />
              }
            >
              <CollectionDoorways handles={featuredCollections} title={doorwaysTitle} />
            </Suspense>
          </Container>
        )}

        {shopConfig.brand.brands.length > 0 && (
          <Container>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl sm:text-3xl">Shop by brand</h2>
                <Link
                  href="/brands"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  All brands
                </Link>
              </div>
              <BrandGrid brands={shopConfig.brand.brands.slice(0, 5)} />
            </div>
          </Container>
        )}

        <Container>
          <ProductsGrid
            title="Explore the collection"
            eagerCount={0}
            limit={8}
            collectionUrl="/collections/all"
          />
        </Container>
      </Sections>
    </Page>
  );
}
