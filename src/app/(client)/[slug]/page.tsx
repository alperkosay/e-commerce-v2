import React, { Suspense } from "react";
import ProductsCategory from "./ProductsCategory";
import ProductGrid from "@/components/Sections/Product/ProductGrid";
import { ProductCardSkeleton } from "@/components/Product/Product";
import api from "@/services/api";
import { redirect } from "next/navigation";
export type ParamsProps = {
    params: {
        slug: string;
    };
};
export default async function page({ params }: ParamsProps) {
    const { data } = await api.category.findBySlug(params.slug);
    if (!data.length) {
        redirect("/");
    }
    return (
        <main>
            <ProductGrid sectionTitle={data[0]?.attributes.title}>
                <Suspense
                    fallback={[...Array(4)].map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                >
                    <ProductsCategory params={params} />
                </Suspense>
            </ProductGrid>
        </main>
    );
}
