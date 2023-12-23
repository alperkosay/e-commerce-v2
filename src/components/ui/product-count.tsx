"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Minus, Plus } from "lucide-react";
import { Input } from "./input";
import useBasket from "@/hooks/useBasket";
import { StorageProduct } from "@/context/BasketContext";

export default function ProductCount({ productID }: { productID: number }) {
    const { handleCount, lsProducts, getCount } = useBasket();

    return (
        <div className="flex w-32">
            <Button
                size={"icon"}
                className="rounded-r-none"
                onClick={() => handleCount("dec", productID)}
            >
                <Minus />
            </Button>
            <div className="flex-1">
                <Input
                    type="number"
                    value={getCount(productID)}
                    min={1}
                    minLength={1}
                    className="rounded-l-none rounded-r-none text-center"
                    onChange={(e) => {
                        // setCount(Number(e.target.value));
                    }}
                />
                <p className="text-center text-sm mt-1">Adet</p>
            </div>
            <Button
                size={"icon"}
                className="rounded-l-none"
                onClick={() => handleCount("inc", productID)}
            >
                <Plus />
            </Button>
        </div>
    );
}
