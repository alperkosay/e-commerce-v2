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

import React from "react";
import { HorizontalProductCard } from "@/components/Product/Product";
import useBasket from "@/hooks/useBasket";

export default function Cart() {
    const { basketProducts } = useBasket();

    console.log("basketProducts", basketProducts);
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
