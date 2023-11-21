import { ProductCard } from "@/components/Product/Product";
import api from "@/services/api";
import React from "react";

export default async function Products() {
    const { data, error } = await api.product.findMany();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return data.map((data, index) => (
        <ProductCard productData={data} key={index} />
    ));
}
