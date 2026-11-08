import { HomeHeroSlide, isDarkSlide } from "@/components/home/hero";
import { HeroCarousel } from "@/components/home/hero-carousel";
import type { SectionOfType } from "@/lib/sections/schema";

const DEFAULT_AUTOPLAY_MS = 7000;

export function HeroSection({ section }: { section: SectionOfType<"hero"> }) {
  return (
    <HeroCarousel
      autoplayMs={section.autoplayMs ?? DEFAULT_AUTOPLAY_MS}
      label="Featured"
      slides={section.slides.map((slide, index) => ({
        id: slide.id,
        isDark: isDarkSlide(slide),
        label: slide.headline,
        node: <HomeHeroSlide isFirst={index === 0} slide={slide} />,
      }))}
    />
  );
}
