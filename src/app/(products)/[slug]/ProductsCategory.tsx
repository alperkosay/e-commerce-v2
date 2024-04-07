import { ProductCard } from "@/components/Product/Cards/ProductCard";
import React from "react";
import { ParamsProps } from "./page";
import { api } from "@/trpc/server";

export default async function ProductsCategory({
  params,
  searchParams,
}: ParamsProps) {
  const productResponse = await api.product.getByCategory({
    filterQuery: searchParams,
    slug: params.slug,
  });

  await new Promise((resolve) => setTimeout(resolve, 300));
  return productResponse.data?.map((product, index) => (
    <ProductCard productData={product} key={index} />
  ));
}
