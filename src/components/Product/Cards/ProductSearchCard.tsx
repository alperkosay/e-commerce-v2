"use client"
import Link from "next/link";
import { ProductCardType } from "../Product";
import Image from "next/image";
import Price from "@/components/ui/price";

export default function ProductSearchCard({ productData }: ProductCardType) {
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
                <Price
                    price={productData.attributes.price}
                    discountedPrice={productData.attributes.discountedPrice}
                />
            </div>
        </Link>
    );
}
