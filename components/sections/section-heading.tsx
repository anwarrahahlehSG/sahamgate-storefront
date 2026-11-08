import Link from "next/link";

interface SectionHeadingProps {
  cta?: { title: string; url: string };
  title: string;
}

export function SectionHeading({ cta, title }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-5">
      <h2 className="font-display text-2xl sm:text-3xl">{title}</h2>
      {cta && (
        <Link
          href={cta.url}
          className="shrink-0 text-sm font-medium text-muted-foreground transition-colors duration-(--brand-duration-quick) ease-brand hover:text-foreground"
        >
          {cta.title}
        </Link>
      )}
    </div>
  );
}
