import { Product } from "@/services/api/product/types";
import Link from "next/link";
import React from "react";

export default function CategoryBreadcrumb({
    productData,
}: {
    productData: Product;
}) {
    return (
        <ul className="flex gap-4">
            {productData.attributes.categories.data.map((data, index) => (
                <React.Fragment key={index}>
                    <li>
                        <Link href={`/${data.attributes.slug}`}>
                            {data.attributes.title}
                        </Link>
                    </li>
                    <li> {">"}</li>
                </React.Fragment>
            ))}
        </ul>
    );
}
