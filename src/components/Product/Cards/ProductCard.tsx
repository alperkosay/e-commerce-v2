"use client";
import { useState } from "react";
import { ProductCardType } from "../Product";
import Image from "next/image";
import Price from "@/components/ui/price";
import Link from "next/link";
import AddToCart from "@/components/ui/add-to-cart";

export function ProductCard({ productData }: ProductCardType) {
  const productImages = productData.attributes.productImages?.data;
  const productImagesCount = productImages?.length || 0;
  const [activeImage, setActiveImage] = useState<number>(0);

  return (
    <div className="flex flex-col justify-between">
      <Link
        href={`/products/${productData.attributes.slug}`}
        className="space-y-2 flex flex-col group/product"
        title={productData.attributes.title}
      >
        <div className="relative flex overflow-hidden w-full">
          {productData.attributes.productImages?.data?.map(
            (imageData, index) =>
              index === activeImage && (
                <Image
                  src={imageData.attributes.url}
                  data-src={imageData.attributes.url}
                  width={imageData.attributes.width}
                  height={imageData.attributes.height}
                  alt={imageData.attributes.alternativeText || ""}
                  className={`w-full transition-all duration-200 max-h-[296px] object-cover ${
                    index === activeImage
                      ? "opacity-1 scale-100"
                      : "opacity-0 scale-105 -z-10 absolute"
                  }`}
                  key={index}
                  loading="lazy"
                />
              )
          )}
          <div className="absolute inset-0 flex">
            {[...Array(productImagesCount > 4 ? 4 : productImagesCount)].map(
              (_, idx) => (
                <div
                  className="flex-1 h-full flex items-end group"
                  key={idx}
                  onMouseOver={(e) => {
                    setActiveImage(idx);
                  }}
                  onMouseOut={() => {
                    setActiveImage(0);
                  }}
                >
                  <div className="w-full transition-all duration-200 h-1/6 group-hover:h-3/6 bg-gradient-to-t from-primary to-transparent opacity-50 group-hover:opacity-70"></div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="p-3 flex flex-col flex-1 gap-3">
          <h2 className="text-lg md:text-xl leading-snug font-semibold flex-1 line-clamp-3">
            {productData.attributes.title}
          </h2>
          <Price
            price={productData.attributes.price}
            discountedPrice={productData.attributes.discountedPrice}
            priceSize="xl"
            discountedPriceSize="base"
          />
        </div>
      </Link>
      <AddToCart count={1} id={productData.id} />
    </div>
  );
}
