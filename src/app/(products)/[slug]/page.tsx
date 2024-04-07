import React, { Suspense } from "react";
import ProductsCategory from "./ProductsCategory";
import ProductGrid from "@/components/Sections/Product/ProductGrid";
import { ProductCardSkeleton } from "@/components/Product/Product";
import { ParamType } from "@/hooks/filterHooks/useFilters";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "@/trpc/server";

export async function generateMetadata({ params }: ParamsProps) {
  const categoryResponse = await api.category.getBySlug({ slug: params.slug });
  if (!categoryResponse) {
    return notFound();
  }

  return {
    title: `${categoryResponse.attributes.title}`,
    description: categoryResponse.attributes.description,
  } as Metadata;
}

export type ParamsProps = {
  params: {
    slug: string;
  };
  searchParams?: ParamType;
};
export default async function page({ params, searchParams }: ParamsProps) {
  const categoryResponse = await api.category.getBySlug({ slug: params.slug });
  if (!categoryResponse) {
    return notFound();
  }

  return (
    <main>
      <ProductGrid sectionTitle={categoryResponse.attributes.title}>
        <Suspense
          key={Math.floor(Math.random() * 2000)}
          fallback={[...Array(4)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        >
          <ProductsCategory params={params} searchParams={searchParams} />
        </Suspense>
      </ProductGrid>
    </main>
  );
}
