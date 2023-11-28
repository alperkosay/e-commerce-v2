"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import {
    TooltipContent,
    Tooltip,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import useClickOutside from "@/hooks/useClickOutside";
import useKeyClose from "@/hooks/useKeyClose";
import { cn } from "@/lib/utils";
import { Product } from "@/services/api/product/types";
import api from "@/services/api";
import {
    ProductCard,
    ProductCardSkeleton,
    ProductSearchCard,
} from "@/components/Product/Product";

export default function Search({ className }: { className?: string }) {
    const searchAreaRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [isSearchMenuActive, setIsSearchMenuActive] =
        useState<boolean>(false);

    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchValue(e.target.value);
        setIsSearchMenuActive(val.length > 0);
    };

    useEffect(() => {
        setIsSearching(true);

        const searchDebounce = setTimeout(async () => {
            if (searchValue.length) {
                const { data } = await api.product.findByCategoryOrTitle(
                    searchValue
                );
                setSearchResults(data);
            }
            setIsSearching(false);
        }, 1500);

        return () => clearTimeout(searchDebounce);
    }, [searchValue]);

    useClickOutside((e) => {
        if (
            !searchAreaRef.current?.contains(e.target as Node) &&
            !searchInputRef.current?.contains(e.target as Node)
        ) {
            setIsSearchMenuActive(false);
        }
    });
    useKeyClose((e) => {
        if (e.key === "Escape") {
            setIsSearchMenuActive(false);
        }
    });

    return (
        <React.Fragment>
            <div className={cn("flex-1 flex gap-1 relative z-30", className)}>
                <div className="flex-1 relative">
                    <Input
                        ref={searchInputRef}
                        onChange={searchHandler}
                        placeholder="Ürün veya kategori ara..."
                        className="rounded-r-none"
                    />
                </div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size={"icon"}
                            variant={"outline"}
                            className="rounded-l-none"
                        >
                            <SearchIcon />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Arama Yap</p>
                    </TooltipContent>
                </Tooltip>
                <div
                    ref={searchAreaRef}
                    className={`top-12 h-auto px-3 py-2 w-full rounded z-30 absolute bg-background border-2 border-primary space-y-2 ${
                        !isSearchMenuActive && "hidden"
                    }`}
                >
                    <p className="font-medium text-lg">Bulunan ürünler...</p>
                    <ScrollArea className="h-[500px]">
                        <div className="flex flex-col gap-y-4 py-4 px-4">
                            {isSearching ? (
                                [...Array(10)].map((_, idx) => (
                                    <ProductCardSkeleton
                                        className="h-20"
                                        key={idx}
                                    />
                                ))
                            ) : searchResults.length ? (
                                searchResults.map((data, idx) => (
                                    <ProductSearchCard
                                        productData={data}
                                        key={idx}
                                    />
                                ))
                            ) : (
                                <p>Aradığınız ürün bulunamadı</p>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </React.Fragment>
    );
}

export function SearchSkeleton() {
    return <Skeleton className="flex-1 h-10 rounded" />;
}
