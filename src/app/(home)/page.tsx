import { ProductCardSkeleton } from "@/components/Product/Product";
import Products from "./Products";
import { Suspense } from "react";
import ProductGrid from "@/components/Sections/Product/ProductGrid";

export default async function Home() {
  return (
    <main className="min-h-[200vh]">
      <ProductGrid sectionTitle="Son gelen ürünler">
        <Suspense
          fallback={[...Array(4)].map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        >
          <Products />
        </Suspense>
      </ProductGrid>
    </main>
  );
}
