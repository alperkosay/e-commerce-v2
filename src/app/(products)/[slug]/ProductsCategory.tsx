import { ProductCard } from "@/components/Product/Cards/ProductCard";
import api from "@/services/api";
import React from "react";
import { ParamsProps } from "./page";

export default async function ProductsCategory({
    params,
    searchParams,
}: ParamsProps) {
    const { data } = await api.product.findByCategory({
        slug: params.slug,
        filterQuery: searchParams,
    });
    await new Promise((resolve) => setTimeout(resolve, 300));
    return data.map((product, index) => (
        <ProductCard productData={product} key={index} />
    ));
}
