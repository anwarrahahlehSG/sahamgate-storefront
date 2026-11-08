import type { Metadata } from "next";

import { SectionRenderer } from "@/components/sections/section-renderer";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { shopConfig } from "@/lib/config";
import { getPageSections } from "@/lib/sections";
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

export default async function HomePage() {
  const sections = await getPageSections("home");
  return (
    <Page className="pt-0">
      <Sections className="grid-cols-1 gap-14 md:gap-20">
        <SectionRenderer sections={sections} />
      </Sections>
    </Page>
  );
}
