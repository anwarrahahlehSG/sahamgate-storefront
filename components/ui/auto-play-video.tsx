"use client";

import { cn } from "cn";
import Image from "next/image";
import { type ComponentProps, useEffect, useRef, useState } from "react";

interface AutoPlayVideoPreviewImage {
  src: string;
  alt: string;
}

interface AutoPlayVideoProps extends Omit<
  ComponentProps<"video">,
  "autoPlay" | "loop" | "muted" | "onCanPlay" | "playsInline" | "ref" | "src"
> {
  // Source for phones. With `requireMobileSource`, phones without one keep the preview image.
  mobileSrc?: string;
  requireMobileSource?: boolean;
  src?: string;
  previewImage?: AutoPlayVideoPreviewImage | null;
  previewImageFetchPriority?: "auto" | "high" | "low";
  previewImageLoading?: "eager" | "lazy";
}
const MOBILE = "(max-width: 767px)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function prefersSavedData(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(connection?.saveData);
}

// Reduced-motion and Save-Data visitors keep the still image. `<source media>` is unreliable on
// video, so the phone cut is picked here.
function pickSource(
  src: string | undefined,
  mobileSrc: string | undefined,
  requireMobileSource: boolean,
): string | undefined {
  if (window.matchMedia(REDUCED_MOTION).matches || prefersSavedData()) return undefined;
  if (!window.matchMedia(MOBILE).matches) return src;
  return mobileSrc ?? (requireMobileSource ? undefined : src);
}

export function AutoPlayVideo({
  mobileSrc,
  requireMobileSource = false,
  previewImage,
  previewImageFetchPriority,
  previewImageLoading,
  className,
  src,
  ...props
}: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  // A boolean, not the object: callers pass a fresh preview object on every render.
  const hasPreview = Boolean(previewImage);

  // The source is attached after mount (never in the server render), so reduced-motion,
  // Save-Data and phone checks run before any video bytes are requested.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const source = pickSource(src, mobileSrc, requireMobileSource);
    // Without a preview image, a still first frame is better than an empty box.
    if (!source) {
      if (!hasPreview && src) el.src = src;
      return;
    }
    el.src = source;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasPreview, mobileSrc, requireMobileSource, src]);

  return (
    <>
      {previewImage && !videoReady && (
        <Image
          src={previewImage.src}
          alt={previewImage.alt}
          fill
          className={cn("object-cover", className)}
          sizes="100vw"
          fetchPriority={previewImageFetchPriority}
          loading={previewImageLoading}
          draggable={false}
        />
      )}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        onCanPlay={() => setVideoReady(true)}
        className={cn(className, !videoReady && "opacity-0")}
        {...props}
      />
    </>
  );
}
