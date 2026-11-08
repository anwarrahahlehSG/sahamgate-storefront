import { Suspense } from "react";

import {
  CollectionDoorways,
  CollectionDoorwaysSkeleton,
} from "@/components/home/collection-doorways";
import { Container } from "@/components/ui/container";
import type { SectionOfType } from "@/lib/sections/schema";

export function CollectionDoorwaysSection({
  section,
}: {
  section: SectionOfType<"collectionDoorways">;
}) {
  return (
    <Container>
      <Suspense
        fallback={
          <CollectionDoorwaysSkeleton count={section.handles.length} title={section.title} />
        }
      >
        <CollectionDoorways handles={section.handles} title={section.title} />
      </Suspense>
    </Container>
  );
}
