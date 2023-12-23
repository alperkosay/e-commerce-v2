"use client";
import { BasketProductCard } from "@/components/Product/Cards/BasketProductCard";
import useBasket from "@/hooks/useBasket";
import React from "react";

export default function CartProducts() {
    const { basketProducts } = useBasket();

    return basketProducts.length ? (
        basketProducts.map((product, index) => (
            <BasketProductCard productData={product} key={index} />
        ))
    ) : (
        <div className="text-center">
            <p className="text-2xl">Sepetiniz boş</p>
        </div>
    );
}
