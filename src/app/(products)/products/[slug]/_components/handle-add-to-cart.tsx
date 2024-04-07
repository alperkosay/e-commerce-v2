"use client";
import AddToCart from "@/components/ui/add-to-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

export default function HandleAddToCart({ productId }: { productId: number }) {
  // const { handleQuantity, items } = useCartStore();
  // const product = items.find((x) => x.id === productID);
  const [productCount, setProductCount] = useState(1);

  return (
    <div className="my-4 flex gap-4">
      <div className="flex w-32">
        <Button
          size={"icon"}
          className="rounded-r-none"
          onClick={() => {
            //   handleQuantity(productID, "decrease");
            setProductCount((prev) => {
              if (prev <= 1) {
                return prev;
              }
              return prev - 1;
            });
          }}
        >
          <Minus />
        </Button>
        <div className="flex-1">
          <Input
            type="number"
            min={1}
            minLength={1}
            className="rounded-l-none rounded-r-none text-center"
            value={productCount}
            onChange={(e) => {
              if (Number(e.target.value) <= 0) {
                return null;
              }
              setProductCount(Number(e.target.value));
            }}
          />
          <p className="mt-1 text-center text-sm">Adet</p>
        </div>
        <Button
          size={"icon"}
          className="rounded-l-none"
          onClick={() => {
            setProductCount((prev) => {
              if (prev >= 99) {
                return prev;
              }
              return prev + 1;
            });
          }}
        >
          <Plus />
        </Button>
      </div>
      <AddToCart id={productId} count={productCount} />
    </div>
  );
}
