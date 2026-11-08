import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";

import { AutoPlayVideo } from "@/components/ui/auto-play-video";
import type { HeroSlide, Tone } from "@/lib/sections/schema";

const TONE_CLASS: Record<Tone, string> = {
  amber: "bg-atmosphere-amber text-foreground",
  dune: "bg-surface-alt text-foreground",
  gulf: "bg-primary-deep text-primary-foreground",
  ivory: "bg-background text-foreground",
  oud: "bg-atmosphere-oud text-atmosphere-oud-foreground",
};

export function isDarkSlide(slide: HeroSlide): boolean {
  return Boolean(slide.media) || slide.tone === "oud" || slide.tone === "gulf";
}

interface HomeHeroSlideProps {
  // The first slide's media is the LCP element, so it loads eagerly at high priority.
  isFirst: boolean;
  slide: HeroSlide;
}

// A slide is a tonal field with type until campaign photography exists; with media, the image or
// video fills it under a bottom scrim so the type stays legible.
export function HomeHeroSlide({ isFirst, slide }: HomeHeroSlideProps) {
  const { media } = slide;
  const dark = isDarkSlide(slide);
  const Heading = isFirst ? "h1" : "h2";
  return (
    <div
      className={cn(
        "relative flex min-h-120 flex-col justify-end overflow-hidden md:min-h-0 md:aspect-16/7",
        media ? "bg-atmosphere-oud text-atmosphere-oud-foreground" : TONE_CLASS[slide.tone],
      )}
    >
      {media?.kind === "image" && (
        <Image
          alt={media.alt}
          className="object-cover"
          fetchPriority={isFirst ? "high" : "auto"}
          fill
          loading={isFirst ? "eager" : "lazy"}
          preload={isFirst}
          sizes="100vw"
          src={media.src}
        />
      )}
      {media?.kind === "video" && (
        <AutoPlayVideo
          aria-label={media.alt}
          className="absolute inset-0 size-full object-cover"
          mobileSrc={media.mobileSrc}
          preload="none"
          requireMobileSource
          previewImage={{ alt: media.alt, src: media.poster }}
          previewImageFetchPriority={isFirst ? "high" : "auto"}
          previewImageLoading={isFirst ? "eager" : "lazy"}
          src={media.src}
        />
      )}
      {media && (
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/55 to-transparent" />
      )}

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-384 flex-col gap-5 px-5 pt-16 pb-24 lg:px-10 lg:pb-28",
          slide.align === "center" ? "items-center text-center" : "items-start text-start",
        )}
      >
        {slide.eyebrow && (
          <p className="text-xs font-medium uppercase tracking-[0.2em] opacity-80">
            {slide.eyebrow}
          </p>
        )}
        <Heading className="max-w-3xl font-display text-4xl md:text-6xl lg:text-7xl">
          {slide.headline}
        </Heading>
        {slide.subheadline && (
          <p className="max-w-xl text-sm opacity-85 md:text-base">{slide.subheadline}</p>
        )}
        <div className="flex flex-wrap items-center gap-3 pt-2.5">
          <Link
            href={slide.primaryCta.url}
            className={cn(
              "inline-flex h-12 items-center justify-center rounded-lg px-6 text-sm font-medium transition-colors duration-(--brand-duration-quick) ease-brand",
              dark
                ? "bg-background text-foreground hover:bg-background/90"
                : "bg-primary text-primary-foreground hover:bg-primary-deep",
            )}
          >
            {slide.primaryCta.title}
          </Link>
          {slide.secondaryCta && (
            <Link
              href={slide.secondaryCta.url}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-current/40 px-6 text-sm font-medium transition-colors duration-(--brand-duration-quick) ease-brand hover:bg-current/10"
            >
              {slide.secondaryCta.title}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
