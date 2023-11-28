import CategoryBreadcrumb from "@/components/Breadcrumbs/CategoryBreadcrumb";
import ProductImageSlider from "@/components/Product/ProductImageSlider";
import { BrandName } from "@/lib/consts";
import api from "@/services/api";
import { Metadata } from "next";

type PageProps = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params }: PageProps) {
    const { data } = await api.product.findBySlug(params.slug);
    const productData = data[0];
    return {
        title: `${BrandName} - ${productData.attributes.title}`,
        description: productData.attributes.description,
    } as Metadata;
}

export default async function page({ params }: PageProps) {
    const { data } = await api.product.findBySlug(params.slug);
    const productData = data[0];
    return (
        <>
            <section className="py-6">
                <div className="container">
                    <CategoryBreadcrumb productData={productData} />
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="grid grid-cols-2 gap-20">
                        <ProductImageSlider
                            productImages={productData.attributes.productImages}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
