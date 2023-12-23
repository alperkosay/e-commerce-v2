import { ProductCard } from "@/components/Product/Cards/ProductCard";
import SectionTitle from "@/components/ui/section-title";
import { Product } from "@/services/api/product/types";
import React from "react";
type ComponentProps = {
    productData?: Product[];
    sectionTitle?: string;
    children?: React.ReactNode;
};
export default function ProductGrid({
    productData,
    sectionTitle,
    children,
}: ComponentProps) {
    return (
        <section className="py-6">
            <div className="container">
                <SectionTitle>
                    <h2>{sectionTitle}</h2>
                </SectionTitle>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {children ||
                        productData?.map((data, index) => (
                            <ProductCard productData={data} key={index} />
                        ))}
                </div>
            </div>
        </section>
    );
}
