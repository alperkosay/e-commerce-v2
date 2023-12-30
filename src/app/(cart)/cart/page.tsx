import React, { Suspense } from "react";
import CartProducts from "./_components/CartProducts";
import { Skeleton } from "@/components/ui/skeleton";
import SectionTitle from "@/components/ui/section-title";

import dynamic from "next/dynamic";
import { CheckoutSidebarSkeleton } from "./_components/CheckoutSidebar";
import { ProductSliderSkeleton } from "@/components/Product/ProductSlider";
import api from "@/services/api";
const CheckoutSidebar = dynamic(() => import("./_components/CheckoutSidebar"), {
  ssr: false,
  loading: () => <CheckoutSidebarSkeleton />,
});

const ProductSlider = dynamic(
  () => import("@/components/Product/ProductSlider"),
  {
    ssr: false,
    loading: () => <ProductSliderSkeleton />,
  }
);

export default async function page() {
  const { data: products } = await api.product.findMany();
  return (
    <main className="min-h-screen py-6">
      <section className="mb-40">
        <div className="container">
          <SectionTitle>
            <h1>Sepet</h1>
          </SectionTitle>
          <div className="flex gap-10">
            <div className="space-y-2 flex-1">
              <Suspense
                key={Math.random()}
                fallback={[...Array(1)].map((_, index) => (
                  <Skeleton className="w-full h-20" key={index} />
                ))}
              >
                <CartProducts />
              </Suspense>
            </div>
            <CheckoutSidebar />
          </div>
        </div>
      </section>
      <section className="my-20">
        <div className="container">
          <SectionTitle>
            <h2>Diğer ürünler</h2>
          </SectionTitle>
          <ProductSlider products={products} />
        </div>
      </section>
    </main>
  );
}
