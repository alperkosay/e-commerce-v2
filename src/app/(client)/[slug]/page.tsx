import React, { Suspense } from "react";
import ProductsCategory from "./ProductsCategory";
import ProductGrid from "@/components/Sections/Product/ProductGrid";
import { ProductCardSkeleton } from "@/components/Product/Product";
import api from "@/services/api";
import { ParamType } from "@/hooks/filterHooks/useFilters";

export type ParamsProps = {
    params: {
        slug: string;
    };
    searchParams?: ParamType;
};
export default async function page({ params, searchParams }: ParamsProps) {
    const { data } = await api.category.findBySlug(params.slug);

    return (
        <main>
            <ProductGrid sectionTitle={data[0]?.attributes.title}>
                <Suspense
                    key={Math.floor(Math.random() * 2000)}
                    fallback={[...Array(4)].map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                >
                    <ProductsCategory
                        params={params}
                        searchParams={searchParams}
                    />
                </Suspense>
            </ProductGrid>
        </main>
    );
}
