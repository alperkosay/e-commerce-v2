"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Minus, Plus } from "lucide-react";
import { Input } from "./input";
import { useCartStore } from "@/store/cart";

export default function ProductCount({ productID }: { productID: number }) {
  const { handleQuantity, items } = useCartStore();
  const product = items.find((x) => x.id === productID);

  return (
    <div className="flex w-32">
      <Button
        size={"icon"}
        className="rounded-r-none"
        onClick={() => {
          handleQuantity(productID, "decrease");
        }}
      >
        <Minus />
      </Button>
      <div className="flex-1">
        <Input
          type="number"
          value={product?.quantity}
          min={1}
          minLength={1}
          className="rounded-l-none rounded-r-none text-center"
          onChange={(e) => {
            if (Number(e.target.value) <= 0) {
              return null;
            }
            handleQuantity(productID, "decrease", Number(e.target.value));
          }}
        />
        <p className="mt-1 text-center text-sm">Adet</p>
      </div>
      <Button
        size={"icon"}
        className="rounded-l-none"
        onClick={() => {
          handleQuantity(productID, "increase");
        }}
      >
        <Plus />
      </Button>
    </div>
  );
}
