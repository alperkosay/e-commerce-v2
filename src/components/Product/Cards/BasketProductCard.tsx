"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Price from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import ProductCount from "@/components/ui/product-count";
import { CartProduct, useCartStore } from "@/store/cart";
import { env } from "@/env";

export function BasketProductCard({
  productData,
}: {
  productData: CartProduct;
}) {
  const { removeFromBasket, items } = useCartStore();
  const product = items.find((x) => x.id === productData.id);

  return (
    <div className="flex border border-muted p-2">
      <Link
        href={`/products/${productData.attributes.slug}`}
        className="group/product flex flex-1 flex-row"
        title={productData.attributes.title}
      >
        <div className="relative flex overflow-hidden">
          {productData.attributes.productImages?.data?.map(
            (imageData, index) =>
              index === 0 && (
                <Image
                  src={env.NEXT_PUBLIC_MEDIA_PREFIX + imageData.attributes.url}
                  width={imageData.attributes.width}
                  height={imageData.attributes.height}
                  alt={imageData.attributes.alternativeText || ""}
                  className={`w-20 object-contain`}
                  key={index}
                />
              ),
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 px-2">
          <span className="line-clamp-2 flex-1 text-base font-medium">
            {productData.attributes.title}
          </span>
          <Price
            price={productData.attributes.price * (product?.quantity ?? 1)}
            discountedPrice={
              productData.attributes.discountedPrice
                ? productData.attributes.discountedPrice *
                  (product?.quantity ?? 1)
                : undefined
            }
          />
        </div>
      </Link>
      <div className="flex flex-col items-end gap-3">
        <Button
          className="h-6 w-6"
          size={"icon"}
          variant={"destructive"}
          onClick={() => {
            removeFromBasket(productData.id);
          }}
        >
          <X size={14} />
        </Button>
        <ProductCount productID={productData.id} />
      </div>
    </div>
  );
}
