"use client";
import { BasketProductCard } from "@/components/Product/Cards/BasketProductCard";
import { useCartStore } from "@/store/cart";
import React from "react";

export default function CartProducts() {
  const { items } = useCartStore();
  return items.length ? (
    items.map((product, index) => (
      <BasketProductCard productData={product} key={index} />
    ))
  ) : (
    <div className="text-center">
      <p className="text-2xl">Sepetiniz boş</p>
    </div>
  );
}
