import { ProductCard } from "@/components/Product/Product";
import api from "@/services/api";
import React from "react";
import { ParamsProps } from "./page";

export default async function ProductsCategory({ params }: ParamsProps) {
    const { data } = await api.product.findByCategory({ slug: params.slug });

    return data.map((product, index) => (
        <ProductCard productData={product} key={index} />
    ));
}
