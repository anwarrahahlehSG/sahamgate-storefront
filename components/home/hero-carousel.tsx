"use client";

import { cn } from "cn";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { type ReactNode, useCallback, useEffect, useState } from "react";

interface HeroCarouselSlide {
  id: string;
  // Dark slides get light controls drawn over them.
  isDark: boolean;
  label: string;
  node: ReactNode;
}

interface HeroCarouselProps {
  autoplayMs: number;
  label: string;
  slides: HeroCarouselSlide[];
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Slides are server-rendered; this island owns swiping, arrows, dots and autoplay. Autoplay stops
// for reduced motion, on hover or keyboard focus, while the tab is hidden, and behind a visible
// pause control (WCAG 2.2.2 for motion that lasts more than five seconds).
export function HeroCarousel({ autoplayMs, label, slides }: HeroCarouselProps) {
  // Direction only feeds Embla's options, never the markup, so reading it once is hydration-safe.
  const [direction] = useState<"ltr" | "rtl">(() =>
    typeof document !== "undefined" && document.documentElement.dir === "rtl" ? "rtl" : "ltr",
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction, loop: true });
  const [selected, setSelected] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHeld, setIsHeld] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION);
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const isPlaying = !isPaused && !isHeld && !reducedMotion && slides.length > 1;

  // Every slide change (swipe, arrow, dot or autoplay) restarts the countdown.
  useEffect(() => {
    if (!emblaApi || !isPlaying) return;
    let timer = 0;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (document.visibilityState === "visible") emblaApi.scrollNext();
        else schedule();
      }, autoplayMs);
    };
    schedule();
    emblaApi.on("select", schedule);
    return () => {
      window.clearTimeout(timer);
      emblaApi.off("select", schedule);
    };
  }, [autoplayMs, emblaApi, isPlaying]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  if (slides.length === 1) {
    return <section aria-label={label}>{slides[0].node}</section>;
  }

  return (
    <section
      aria-label={label}
      aria-roledescription="carousel"
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsHeld(false);
      }}
      onFocus={() => setIsHeld(true)}
      onMouseEnter={() => setIsHeld(true)}
      onMouseLeave={() => setIsHeld(false)}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              aria-hidden={index !== selected}
              aria-label={`${index + 1} of ${slides.length}: ${slide.label}`}
              aria-roledescription="slide"
              className="min-w-0 flex-[0_0_100%]"
              inert={index !== selected}
              role="group"
            >
              {slide.node}
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 transition-colors duration-(--brand-duration-base) ease-brand",
          slides[selected]?.isDark ? "text-background" : "text-foreground",
        )}
      >
        <div className="mx-auto flex max-w-384 items-center justify-end gap-2 px-5 pb-5 lg:px-10 lg:pb-8">
          <ol className="me-auto flex items-center gap-2 md:me-2" aria-label="Choose a slide">
            {slides.map((slide, index) => (
              <li key={slide.id}>
                <button
                  type="button"
                  aria-current={index === selected ? "true" : undefined}
                  aria-label={`Show slide ${index + 1}: ${slide.label}`}
                  onClick={() => scrollTo(index)}
                  className="group flex h-11 items-center"
                >
                  <span
                    className={cn(
                      "relative block h-0.5 overflow-hidden rounded-full bg-current/30 transition-[width] duration-(--brand-duration-base) ease-brand",
                      index === selected ? "w-12" : "w-6 group-hover:bg-current/60",
                    )}
                  >
                    {index === selected && (
                      <span
                        key={`${selected}-${isPlaying}`}
                        className={cn(
                          "absolute inset-y-0 start-0 bg-current",
                          isPlaying ? "animate-hero-progress" : "w-full",
                        )}
                        style={{ animationDuration: `${autoplayMs}ms` }}
                      />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <ControlButton
            label={isPaused ? "Play slideshow" : "Pause slideshow"}
            onClick={() => setIsPaused((paused) => !paused)}
          >
            {isPaused ? (
              <Play className="size-4" aria-hidden="true" />
            ) : (
              <Pause className="size-4" aria-hidden="true" />
            )}
          </ControlButton>
          <ControlButton label="Previous slide" onClick={() => emblaApi?.scrollPrev()}>
            <ChevronLeft className="size-5 rtl:rotate-180" aria-hidden="true" />
          </ControlButton>
          <ControlButton label="Next slide" onClick={() => emblaApi?.scrollNext()}>
            <ChevronRight className="size-5 rtl:rotate-180" aria-hidden="true" />
          </ControlButton>
        </div>
      </div>
    </section>
  );
}

function ControlButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-11 items-center justify-center rounded-full border border-current/30 transition-colors duration-(--brand-duration-quick) ease-brand hover:bg-current/10"
    >
      {children}
    </button>
  );
}
