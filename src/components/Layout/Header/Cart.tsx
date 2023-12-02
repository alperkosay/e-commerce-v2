"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShoppingCartIcon } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import React, { useEffect, useState } from "react";
import { HorizontalProductCard } from "@/components/Product/Product";
import { ProductCartItem } from "@/app/api/basket/route";

export default function Cart() {
    const [cartData, setCartData] = useState<ProductCartItem[]>([]);

    const addProduct = () =>{
        fetch("/api/basket",{
            method: "POST",
            headers: {
                'Content-Type': 'application'
            },
            body: JSON.stringify({count: 1, id: 4242} as ProductCartItem)
        })
    }
    useEffect(() => {
        fetch("/api/basket")
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
            });

            addProduct()
    }, []);
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size={"icon"}>
                        <ShoppingCartIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Sepetiniz</SheetTitle>
                    </SheetHeader>
                    <div className="w-full">
                        <HorizontalProductCard />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}

export function CartSkeleton() {
    return <Skeleton className="w-10 h-10" />;
}
