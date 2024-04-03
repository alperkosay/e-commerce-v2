import { ProductCard } from "@/components/Product/Cards/ProductCard";
import React from "react";

import { api } from "@/trpc/server";

export default async function Products() {
  const productResponse = await api.product.getAll();

  return productResponse.data?.map((data, index) => (
    <ProductCard productData={data} key={data.id} />
  ));
}
