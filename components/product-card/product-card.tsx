import Link from "next/link";

import { buildProductUrl } from "@/lib/product";
import type { ProductCard as ProductCardType } from "@/lib/product/types";

import {
  ProductCardContent,
  ProductCardImage,
  ProductCardImageContainer,
  ProductCardPrice,
  ProductCard as ProductCardRoot,
  ProductCardSkeleton,
  ProductCardTitle,
} from "./components";
import { QuickAddButton } from "./quick-add-button";

export interface ProductCardProps {
  loading?: "eager" | "lazy";
  outOfStockText?: string;
  product: ProductCardType;
}

export function ProductCard({ loading, outOfStockText, product }: ProductCardProps) {
  const href = buildProductUrl(product.handle, product.defaultVariantSelectedOptions ?? []);
  return (
    <ProductCardRoot className="relative">
      <Link href={href} className="group/card">
        <ProductCardImageContainer>
          <ProductCardImage
            src={product.featuredImage?.url}
            alt={product.featuredImage?.altText || product.title}
            height={product.featuredImage?.height}
            loading={loading}
            outOfStock={!product.availableForSale}
            outOfStockText={outOfStockText}
            width={product.featuredImage?.width}
          />
          <ProductCardContent>
            <ProductCardTitle>{product.title}</ProductCardTitle>
            <ProductCardPrice
              amount={product.price.amount}
              currencyCode={product.price.currencyCode}
              maxAmount={product.maxPrice.amount}
              compareAtAmount={product.compareAtPrice?.amount}
              compareAtCurrencyCode={product.compareAtPrice?.currencyCode}
            />
          </ProductCardContent>
        </ProductCardImageContainer>
      </Link>
      {/* A sibling of the link, never inside it: a button nested in an anchor is invalid. */}
      {product.quickAddVariantId && (
        <QuickAddButton
          className="absolute end-2.5 top-2.5"
          label={`Add ${product.title} to cart`}
          merchandiseId={product.quickAddVariantId}
        />
      )}
    </ProductCardRoot>
  );
}

export { ProductCardSkeleton };
