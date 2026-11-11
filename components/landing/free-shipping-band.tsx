import { TruckIcon } from "lucide-react";
import Link from "next/link";

import { shopConfig } from "@/lib/config";
import { formatPrice } from "@/lib/money";

// The shipping promise, first thing under the header so visitors from an ad see it before the
// products. Without a confirmed minimum order it repeats the live store's own wording.
export function FreeShippingBand() {
  const { freeShipping } = shopConfig.merchandising;
  if (!freeShipping.isEnabled) return null;

  const headline =
    freeShipping.minimumOrderAmount === null
      ? "Free shipping on qualifying orders"
      : `Free shipping on orders over ${formatPrice({
          amount: String(freeShipping.minimumOrderAmount),
          currencyCode: shopConfig.brand.currency,
        })}`;

  return (
    <div className="bg-primary-deep text-primary-foreground">
      <div className="mx-auto flex w-full max-w-384 flex-wrap items-center justify-center gap-x-4 gap-y-1 px-5 py-3 text-center text-sm lg:px-10">
        <p className="flex items-center gap-2 font-medium">
          <TruckIcon aria-hidden className="size-4 shrink-0" />
          {headline}
        </p>
        {freeShipping.deliveryEstimate && (
          <p className="opacity-85">{freeShipping.deliveryEstimate}</p>
        )}
        <Link
          className="underline decoration-current/40 underline-offset-4 transition-colors duration-(--brand-duration-quick) ease-brand hover:decoration-current"
          href={freeShipping.policyUrl}
        >
          Shipping details
        </Link>
      </div>
    </div>
  );
}
