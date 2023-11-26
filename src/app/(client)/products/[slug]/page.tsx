import { BrandName } from "@/lib/consts";
import api from "@/services/api";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
type PageProps = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params }: PageProps) {
    const { data } = await api.product.findBySlug(params.slug);
    const productData = data[0];
    return {
        title: `${BrandName} - ${productData.attributes.title}`,
        description: productData.attributes.description,
    } as Metadata;
}

export default async function page({ params }: PageProps) {
    const { data } = await api.product.findBySlug(params.slug);
    const productData = data[0];
    return (
        <div>
            <ul className="flex gap-4">
                {productData.attributes.categories.data.map((data, index) => (
                    <>
                        <li key={index}>{data.attributes.title}</li>
                        <li> {">"}</li>
                    </>
                ))}
            </ul>
            <Image
                src={
                    productData.attributes.productImages?.data[0].attributes
                        .url!
                }
                width={
                    productData.attributes.productImages?.data[0].attributes
                        .width
                }
                height={
                    productData.attributes.productImages?.data[0].attributes
                        .height
                }
                alt={productData.attributes.title!}
            />
        </div>
    );
}
