import React, { Suspense } from "react";
import CartProducts from "./CartProducts";
import { Skeleton } from "@/components/ui/skeleton";
import SectionTitle from "@/components/ui/section-title";

export default async function page() {
    return (
        <main className="min-h-screen py-6">
            <section>
                <div className="container">
                    <SectionTitle>
                        <h1>Sepet</h1>
                    </SectionTitle>
                    <div className="space-y-2">
                        <Suspense
                            fallback={[...Array(1)].map((_) => (
                                <Skeleton className="w-full h-20" />
                            ))}
                        >
                            <CartProducts />
                        </Suspense>
                    </div>
                </div>
            </section>
        </main>
    );
}
