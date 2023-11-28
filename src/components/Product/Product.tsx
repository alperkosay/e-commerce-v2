"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/services/api/product/types";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type ProductCardType = {
    productData: Product;
};

export function HorizontalProductCard() {
    return <div>Product</div>;
}

export function ProductCard({ productData }: ProductCardType) {
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
                    (imageData, index) =>
                        index === activeImage && (
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
                <h2 className="text-lg md:text-xl leading-snug font-semibold flex-1 line-clamp-3">
                    {productData.attributes.title}
                </h2>
                <div className="space-y-1">
                    {productData.attributes.discountedPrice && (
                        <p className="line-through font-semibold text-muted-foreground text-sm">
                            {productData.attributes.discountedPrice} TL
                        </p>
                    )}
                    <p className="font-semibold text-primary">
                        {productData.attributes.price} TL
                    </p>
                </div>
                <Button className="w-full">Sepete Ekle</Button>
            </div>
        </Link>
    );
}

export function ProductSearchCard({ productData }: ProductCardType) {
    return (
        <Link
            href={`/products/${productData.attributes.slug}`}
            className="space-y-2 flex flex-row group/product"
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
            <div className="p-3 flex flex-col flex-1 gap-2">
                <h2 className="text-base leading-tight font-medium flex-1 line-clamp-3">
                    {productData.attributes.title}
                </h2>
                <div className="space-y-1">
                    {productData.attributes.discountedPrice && (
                        <p className="line-through font-semibold text-muted-foreground text-xs">
                            {productData.attributes.discountedPrice} TL
                        </p>
                    )}
                    <p className="font-semibold text-primary text-sm">
                        {productData.attributes.price} TL
                    </p>
                </div>
            </div>
        </Link>
    );
}

export const ProductCardSkeleton = ({ className }: { className?: string }) => {
    return <Skeleton className={cn("w-full h-[300px]", className)} />;
};
