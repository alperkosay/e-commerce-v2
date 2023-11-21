import { ProductCard, ProductCardSkeleton } from "@/components/Product/Product";
import Products from "./Products";
import { Suspense } from "react";

export default async function Home() {
    return (
        <main className="min-h-[200vh]">
            <div className="container my-20 grid grid-cols-4 gap-4">
                <Suspense
                    fallback={[...Array(4)].map((_, idx) => (
                        <ProductCardSkeleton key={idx} />
                    ))}
                >
                    <Products />
                </Suspense>
            </div>
        </main>
    );
}
