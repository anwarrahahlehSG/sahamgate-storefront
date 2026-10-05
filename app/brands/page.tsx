import type { Metadata } from "next";

import { BrandGrid } from "@/components/brands/brand-grid";
import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Brands";
  const description = `Shop perfumes and more by brand at ${shopConfig.site.name}.`;
  return {
    title,
    description,
    alternates: buildAlternates({ pathname: "/brands" }),
    openGraph: buildOpenGraph({ title, description, url: "/brands" }),
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shopConfig.brand.assets.ogImage],
    },
  };
}

export default function BrandsPage() {
  return (
    <Page className="pt-2.5 md:pt-10">
      <Container>
        <Sections className="gap-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl">Brands</h1>
          <BrandGrid brands={shopConfig.brand.brands} />
        </Sections>
      </Container>
    </Page>
  );
}
