"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCartIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import React, { useEffect } from "react";
import { BasketProductCard } from "@/components/Product/Cards/BasketProductCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Price from "@/components/ui/price";
import Link from "next/link";
import { useCartStore } from "@/store/cart";

export default function Cart() {
  const { items, basketPrices, init } = useCartStore();
  useEffect(() => {
    const initializeCart = async () => {
      await init();
    };

    initializeCart();
  }, []); // Boş dependency array, yalnızca bir kere çalıştırılmasını sağlar.

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"} className="relative">
            <ShoppingCartIcon />
            {!!items.length && (
              <Badge
                className="pointer-events-none absolute -right-2 -top-2 cursor-none"
                variant={"secondary"}
              >
                {items.length}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="grid h-full grid-rows-[auto_1fr_auto]">
            <SheetHeader>
              <SheetTitle>Sepetiniz</SheetTitle>
            </SheetHeader>
            <ScrollArea className="">
              <div className="w-full space-y-4">
                {items.map((product, index) => (
                  <BasketProductCard productData={product} key={index} />
                ))}
              </div>
            </ScrollArea>
            <div className="space-y-2">
              <div>
                <p>Toplam</p>
                <Price
                  priceSize="lg"
                  discountedPriceSize="base"
                  price={basketPrices.totalPrice}
                  discountedPrice={basketPrices.discountedPrice}
                />
              </div>
              <Button asChild className="w-full">
                <Link href={"/cart"}>Sepete Git</Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export function CartSkeleton() {
  return <Skeleton className="h-10 w-10" />;
}
