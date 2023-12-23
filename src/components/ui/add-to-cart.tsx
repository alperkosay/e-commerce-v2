"use client";
import React from "react";
import { Button } from "./button";
import useBasket from "@/hooks/useBasket";
import { useRouter } from "next/navigation";

type ComponentProps = {
    id: number;
    count: number;
};
export default function AddToCart({ id, count }: ComponentProps) {
    const { setProduct, basketProducts } = useBasket();
    const router = useRouter();
    const productInBasket = basketProducts.some((x) => x.id === id);

    const handleClick = () => {
        if (productInBasket) {
            router.push("/cart")
            return;
        }
        setProduct({ id, count });
    };

    return (
        <Button
            onClick={handleClick}
            variant={productInBasket ? "outline" : "default"}
        >
            {productInBasket ? "Sepete Git" : "Sepete Ekle"}
        </Button>
    );
}
