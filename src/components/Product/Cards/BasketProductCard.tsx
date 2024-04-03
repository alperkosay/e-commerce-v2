"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Price from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import ProductCount from "@/components/ui/product-count";
import { CartProduct, useCartStore } from "@/store/cart";

export function BasketProductCard({
  productData,
}: {
  productData: CartProduct;
}) {
  const { removeFromBasket } = useCartStore();

  return (
    <div className="flex border border-muted p-2">
      <Link
        href={`/products/${productData.attributes.slug}`}
        className="flex flex-1 flex-row group/product"
        title={productData.attributes.title}
      >
        <div className="relative flex overflow-hidden">
          {productData.attributes.productImages?.data?.map(
            (imageData, index) =>
              index === 0 && (
                <Image
                  src={imageData.attributes.url}
                  width={imageData.attributes.width}
                  height={imageData.attributes.height}
                  alt={imageData.attributes.alternativeText || ""}
                  className={`w-20 object-contain`}
                  key={index}
                />
              )
          )}
        </div>
        <div className="px-2 flex flex-col flex-1 gap-2">
          <span className="text-base font-medium flex-1 line-clamp-2">
            {productData.attributes.title}
          </span>
          <Price
            price={productData.attributes.price}
            discountedPrice={productData.attributes.discountedPrice}
          />
        </div>
      </Link>
      <div className="flex flex-col items-end gap-3">
        <Button
          className="w-6 h-6"
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
