import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { BrandLink } from "@/lib/config/types";

interface HomeHeroProps {
  description: string;
  eyebrow: string;
  heading: string;
  primaryCta: BrandLink;
  secondaryCta: BrandLink | null;
}

// Typographic hero on the brand's alternate surface. It renders in the static shell, so the
// heading is the LCP element until campaign photography exists.
export function HomeHero({
  description,
  eyebrow,
  heading,
  primaryCta,
  secondaryCta,
}: HomeHeroProps) {
  return (
    <section className="bg-surface-alt">
      <div className="mx-auto flex max-w-384 flex-col items-center gap-5 px-5 py-16 text-center md:py-28 lg:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl font-display text-4xl text-foreground md:text-6xl">{heading}</h1>
        <p className="max-w-xl text-sm text-muted-foreground md:text-base">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-5 pt-2.5">
          <Button render={<Link href={primaryCta.url} />} size="lg">
            {primaryCta.title}
          </Button>
          {secondaryCta && (
            <Link
              href={secondaryCta.url}
              className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {secondaryCta.title}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
