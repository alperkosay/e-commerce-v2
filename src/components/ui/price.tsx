import { priceFormatter } from "@/lib/utils";
import React from "react";

type PriceSizes = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";

export default function Price({
  price,
  discountedPrice,
  priceSize = "sm",
  discountedPriceSize = "xs",
  price,
  discountedPrice,
  priceSize = "sm",
  discountedPriceSize = "xs",
}: {
  price: number;
  discountedPrice?: number;
  priceSize?: PriceSizes;
  discountedPriceSize?: PriceSizes;
  price: number;
  discountedPrice?: number;
  priceSize?: PriceSizes;
  discountedPriceSize?: PriceSizes;
}) {
  return (
    <div className="space-y-1">
      {!!discountedPrice && (
        <p
          className={`line-through font-semibold text-muted-foreground text-${discountedPriceSize}`}
        >
          {priceFormatter(discountedPrice)}
        </p>
      )}
      <p className={`font-semibold text-primary text-${priceSize}`}>
        {priceFormatter(price)}
      </p>
    </div>
  );
}
