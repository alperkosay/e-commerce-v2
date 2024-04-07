"use client";
import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { Product } from "@/services/api/product/types";
import { useToast } from "./use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

type ComponentProps = {
  id: number;
  count: number;
};
export default function AddToCart({ id, count }: ComponentProps) {
  const router = useRouter();
  const { addToBasket, items } = useCartStore();
  const { toast } = useToast();
  const productInBasket = items.some((x) => x.id === id);

  const handleClick = async () => {
    if (productInBasket) {
      router.push("/cart");
      return;
    }

    const response = await addToBasket(id, count);
    if (response) {
      toast({
        title: "Ürün başarıyla sepete eklendi!",
        duration: 800,
      });
    } else {
      toast({
        title: "Ürün sepete eklenirken bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleClick}
          variant={productInBasket ? "outline" : "default"}
        >
          {productInBasket ? "Sepete Git" : "Sepete Ekle"}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {productInBasket ? "Bu ürün sepetinizde mevcut" : "Ürünü Sepete Ekle"}
      </TooltipContent>
    </Tooltip>
  );
}
