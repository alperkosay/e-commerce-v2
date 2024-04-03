import CategoryBreadcrumb from "@/components/Breadcrumbs/CategoryBreadcrumb";
import ProductImageSlider from "@/components/Product/ProductImageSlider";
import AddToCart from "@/components/ui/add-to-cart";
import { Button } from "@/components/ui/button";
import Price from "@/components/ui/price";
import ProductCount from "@/components/ui/product-count";
import { Separator } from "@/components/ui/separator";
import api from "@/services/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const { data } = await api.product.findBySlug(params.slug);
  const productData = data[0];

  if (!productData) {
    return notFound();
  }
  return {
    title: `${productData.attributes.title}`,
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
          <div className="flex flex-col md:grid grid-cols-2 gap-10">
            <ProductImageSlider
              productImages={productData.attributes.productImages}
            />

            <div>
              <h1 className="text-bold text-2xl">
                {productData.attributes.title}
              </h1>
              <Separator className="my-4" />
              <div className="mt-2 mb-4">
                <p>{productData.attributes.description}</p>
              </div>
              <Price
                price={productData.attributes.price}
                discountedPrice={productData.attributes.discountedPrice}
                discountedPriceSize="xl"
                priceSize="3xl"
              />
              <div className="flex my-4 gap-4">
                <ProductCount productID={productData.id} />
                <AddToCart id={productData.id}  count={1} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
