"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import {
    TooltipContent,
    Tooltip,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import useClickOutside from "@/hooks/useClickOutside";
import useKeyClose from "@/hooks/useKeyClose";
import { cn } from "@/lib/utils";

export default function Search({ className }: { className?: string }) {
    const searchAreaRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [isSearchMenuActive, setIsSearchMenuActive] =
        useState<boolean>(false);
    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setIsSearchMenuActive(val.length > 0);
    };

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
                        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4 px-4">
                            {[...Array(20)].map((_, idx) => (
                                <div className="space-y-2" key={idx}>
                                    <Image
                                        src={"https://picsum.photos/150/200"}
                                        width={150}
                                        height={200}
                                        alt="test"
                                        className="w-full h-auto"
                                    />
                                    <p>Lorem ipsum dolor sit amet.</p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    <Button asChild variant={"link"}>
                        <Link href={"/"}>Diğer ürünlere göz at...</Link>
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
}

export function SearchSkeleton() {
    return <Skeleton className="flex-1 h-10 rounded" />;
}
