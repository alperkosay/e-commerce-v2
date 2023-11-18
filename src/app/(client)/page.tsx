import { ProductCard } from "@/components/Product/Product";

export default async function Home() {
    return (
        <main className="min-h-[200vh]">
            <div className="container my-20 grid grid-cols-3 gap-4">
                {[...Array(20)].map(() => (
                    <ProductCard />
                ))}
            </div>
        </main>
    );
}
