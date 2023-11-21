"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/services/api/product/types";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

export function HorizontalProductCard() {
    return <div>Product</div>;
}

export function ProductCard({ productData }: { productData: Product }) {
    const productImages = productData.attributes.productImages?.data;
    const productImagesCount = productImages?.length || 0;
    const [activeImage, setActiveImage] = useState<number>(0);

    return (
        <Link
            href={`/products/${productData.attributes.slug}`}
            className="space-y-2 flex flex-col group/product"
            title={productData.attributes.title}
        >
            <div className="relative flex overflow-hidden w-full">
                {productData.attributes.productImages?.data?.map(
                    (imageData, index) => (
                        <Image
                            src={imageData.attributes.url}
                            width={imageData.attributes.width}
                            height={imageData.attributes.height}
                            alt={imageData.attributes.alternativeText || ""}
                            className={`w-full transition-all duration-200 ${
                                index === activeImage
                                    ? "opacity-1 scale-100"
                                    : "opacity-0 scale-105 -z-10 absolute"
                            }`}
                            key={index}
                        />
                    )
                )}
                <div className="absolute inset-0 flex">
                    {[
                        ...Array(
                            productImagesCount > 4 ? 4 : productImagesCount
                        ),
                    ].map((_, idx) => (
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
                    ))}
                </div>
            </div>
            <div className="p-3 flex flex-col flex-1 gap-3">
                <h2 className="text-xl font-semibold flex-1 line-clamp-3">
                    {productData.attributes.title}
                </h2>
                <p className="font-semibold text-primary">
                    {productData.attributes.price} TL
                </p>
                <Button className="w-full">Sepete Ekle</Button>
            </div>
        </Link>
    );
}

export const ProductCardSkeleton = () => {
    return <Skeleton className="w-full h-[300px]" />;
};
