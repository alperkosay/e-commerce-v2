"use client";
import Link from "next/link";
import { ProductCardType } from "../Product";
import Image from "next/image";
import Price from "@/components/ui/price";
import { env } from "@/env";

export default function ProductSearchCard({ productData }: ProductCardType) {
  return (
    <Link
      href={`/products/${productData.attributes.slug}`}
      className="group/product flex flex-row space-y-2 rounded p-1 hover:bg-muted"
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
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h2 className="line-clamp-3 flex-1 text-base font-medium leading-tight">
          {productData.attributes.title}
        </h2>
        <Price
          price={productData.attributes.price}
          discountedPrice={productData.attributes.discountedPrice}
        />
      </div>
    </Link>
  );
}
