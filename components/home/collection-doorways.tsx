import Image from "next/image";
import Link from "next/link";

import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { getCollectionsListing } from "@/lib/collections/server";

const PANEL_GRID = "grid grid-cols-2 gap-5 lg:grid-cols-4";

interface CollectionDoorwaysProps {
  handles: string[];
  title: string;
}

// Tall collection panels in configured order. Handles the store doesn't have are skipped.
export async function CollectionDoorways({ handles, title }: CollectionDoorwaysProps) {
  const listing = await getCollectionsListing({});
  const collections = handles.flatMap((handle) => {
    const collection = listing.find((c) => c.handle === handle);
    return collection ? [collection] : [];
  });
  if (collections.length === 0) return null;

  return (
    <div className="grid gap-4">
      <h2 className="font-display text-2xl sm:text-3xl">{title}</h2>
      <ul className={PANEL_GRID}>
        {collections.map((collection) => {
          const image = collection.image ?? collection.thumbnail;
          return (
            <li key={collection.handle}>
              <Link href={collection.path} className="group flex flex-col gap-2.5">
                <div className="relative aspect-3/4 overflow-hidden bg-surface-alt">
                  {image ? (
                    <Image
                      alt={image.altText || collection.title}
                      className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-103"
                      fill
                      sizes="100vw"
                      src={image.url}
                    />
                  ) : (
                    <ImagePlaceholder className="size-full" />
                  )}
                </div>
                <span className="text-sm font-medium text-foreground">{collection.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function CollectionDoorwaysSkeleton({ count, title }: { count: number; title: string }) {
  return (
    <div className="grid gap-4">
      <h2 className="font-display text-2xl sm:text-3xl">{title}</h2>
      <div className={PANEL_GRID}>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="flex flex-col gap-2.5">
            <ImagePlaceholder className="aspect-3/4 animate-pulse" />
            <div className="h-5 w-24 bg-accent animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
