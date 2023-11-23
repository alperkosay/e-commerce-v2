import React from "react";
import Products from "../Products";
import ProductsCategory from "./ProductsCategory";
export type ParamsProps = {
    params: {
        slug: string;
    };
};
export default function page({params}:ParamsProps) {
    return (
        <main>
            <section>
                <div className="container">
                    <div className="grid grid-cols-4 gap-10">
                        <ProductsCategory params={params} />
                    </div>
                </div>
            </section>
        </main>
    );
}
