import api from "@/services/api";
import Image from "next/image";
import React from "react";
type PageProps = {
    params: {
        slug: string;
    };
};
export default async function page({ params }: PageProps) {
    const { data } = await api.product.findBySlug(params.slug);
    const productData = data[0];
    return (
        <div>
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
