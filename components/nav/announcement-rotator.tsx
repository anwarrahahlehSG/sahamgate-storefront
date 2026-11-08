"use client";

import { cn } from "cn";
import { Pause, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AnnouncementMessage {
  id: string;
  link?: { title: string; url: string };
  text: string;
}

interface AnnouncementRotatorProps {
  label: string;
  messages: AnnouncementMessage[];
}

const ROTATE_MS = 5000;

// One line at a time. Rotation pauses on hover or focus, never runs for reduced motion, and has a
// visible pause control because it moves for longer than five seconds.
export function AnnouncementRotator({ label, messages }: AnnouncementRotatorProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHeld, setIsHeld] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const canRotate = messages.length > 1;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const isPlaying = canRotate && !isPaused && !isHeld && !reducedMotion;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % messages.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(timer);
  }, [isPlaying, messages.length]);

  return (
    <div
      aria-label={label}
      className="bg-surface-alt text-foreground"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsHeld(false);
      }}
      onFocus={() => setIsHeld(true)}
      onMouseEnter={() => setIsHeld(true)}
      onMouseLeave={() => setIsHeld(false)}
      role="region"
    >
      <div className="relative mx-auto flex h-9 max-w-384 items-center justify-center px-12 lg:px-10">
        <ul className="relative h-5 w-full overflow-hidden text-center text-xs sm:text-sm">
          {messages.map((message, position) => (
            <li
              key={message.id}
              aria-hidden={position !== index}
              inert={position !== index}
              className={cn(
                "absolute inset-0 flex items-center justify-center gap-2 transition-[opacity,translate] duration-(--brand-duration-slow) ease-brand",
                position === index ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
            >
              <span className="truncate">{message.text}</span>
              {message.link && (
                <Link
                  href={message.link.url}
                  className="shrink-0 font-medium underline underline-offset-4"
                >
                  {message.link.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
        {canRotate && (
          <button
            type="button"
            aria-label={isPaused ? "Play announcements" : "Pause announcements"}
            onClick={() => setIsPaused((paused) => !paused)}
            className="absolute end-2 flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground lg:end-8"
          >
            {isPaused ? (
              <Play className="size-3.5" aria-hidden="true" />
            ) : (
              <Pause className="size-3.5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
