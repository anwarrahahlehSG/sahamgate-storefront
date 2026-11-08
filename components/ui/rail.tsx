"use client";

import { cn } from "cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

interface RailProps {
  children: ReactNode;
  className?: string;
  label: string;
  nextLabel?: string;
  previousLabel?: string;
}

// Native scroll-snap does the swiping; this island only owns the arrow buttons. Items are
// server-rendered `<li>` children, so a rail adds almost no JavaScript per card.
export function Rail({
  children,
  className,
  label,
  nextLabel = "Next",
  previousLabel = "Previous",
}: RailProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ atEnd: true, atStart: true });

  const updateEdges = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    // scrollLeft is negative in RTL, so compare magnitudes.
    const position = Math.abs(list.scrollLeft);
    const max = list.scrollWidth - list.clientWidth;
    setEdges({ atEnd: position >= max - 1, atStart: position <= 1 });
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    updateEdges();
    const observer = new ResizeObserver(updateEdges);
    observer.observe(list);
    list.addEventListener("scroll", updateEdges, { passive: true });
    return () => {
      observer.disconnect();
      list.removeEventListener("scroll", updateEdges);
    };
  }, [updateEdges]);

  function scrollByPage(direction: 1 | -1) {
    const list = listRef.current;
    if (!list) return;
    const isRtl = getComputedStyle(list).direction === "rtl";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollBy({
      behavior: reduceMotion ? "auto" : "smooth",
      left: direction * (isRtl ? -1 : 1) * list.clientWidth * 0.9,
    });
  }

  const hasOverflow = !(edges.atStart && edges.atEnd);

  return (
    <div className={cn("relative", className)} role="region" aria-label={label}>
      <ul
        ref={listRef}
        className="scrollbar-hide -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto overscroll-x-contain px-5 lg:-mx-10 lg:scroll-px-10 lg:gap-5 lg:px-10"
      >
        {children}
      </ul>
      {hasOverflow && (
        <div className="pointer-events-none absolute inset-x-0 top-1/3 hidden justify-between md:flex">
          <RailButton
            disabled={edges.atStart}
            label={previousLabel}
            onClick={() => scrollByPage(-1)}
            className="-ms-5"
          >
            <ChevronLeft className="size-5 rtl:rotate-180" aria-hidden="true" />
          </RailButton>
          <RailButton
            disabled={edges.atEnd}
            label={nextLabel}
            onClick={() => scrollByPage(1)}
            className="-me-5"
          >
            <ChevronRight className="size-5 rtl:rotate-180" aria-hidden="true" />
          </RailButton>
        </div>
      )}
    </div>
  );
}

function RailButton({
  children,
  className,
  disabled,
  label,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  disabled: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "pointer-events-auto flex size-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-opacity duration-(--brand-duration-quick) ease-brand hover:bg-surface-alt disabled:pointer-events-none disabled:opacity-0",
        className,
      )}
    >
      {children}
    </button>
  );
}
