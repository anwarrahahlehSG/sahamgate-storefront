import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/landing-page";
import { shopConfig } from "@/lib/config";
import { landingPages } from "@/lib/landing";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const page = landingPages.giftSets;

export const metadata: Metadata = {
  title: `${page.title} | ${shopConfig.site.name}`,
  description: page.description,
  alternates: buildAlternates({ pathname: page.path }),
  openGraph: buildOpenGraph({
    title: page.title,
    description: page.description,
    url: page.path,
    type: "website",
  }),
};

export default function Page() {
  return <LandingPage page={page} />;
}
