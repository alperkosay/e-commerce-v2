import React, { Suspense } from "react";
import CartProducts from "./_components/CartProducts";
import { Skeleton } from "@/components/ui/skeleton";
import SectionTitle from "@/components/ui/section-title";

import dynamic from "next/dynamic";
import { CheckoutSidebarSkeleton } from "./_components/CheckoutSidebar";
const CheckoutSidebar = dynamic(() => import("./_components/CheckoutSidebar"), {
  ssr: false,
  loading: () => <CheckoutSidebarSkeleton />,
});

export default async function page() {
  return (
    <main className="min-h-screen py-6">
      <section className="mb-40">
        <div className="container">
          <SectionTitle>
            <h1>Sepet</h1>
          </SectionTitle>
          <div className="flex gap-10">
            <div className="flex-1 space-y-2">
              <Suspense
                key={Math.random()}
                fallback={[...Array(1)].map((_, index) => (
                  <Skeleton className="h-20 w-full" key={index} />
                ))}
              >
                <CartProducts />
              </Suspense>
            </div>
            <CheckoutSidebar />
          </div>
        </div>
      </section>
    </main>
  );
}
