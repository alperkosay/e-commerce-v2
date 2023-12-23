"use client";
import React from "react";
import { Product } from "@/services/api/product/types";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

export type ProductCardType = {
    productData: Product;
};

export const ProductCardSkeleton = ({ className }: { className?: string }) => {
    return <Skeleton className={cn("w-full h-[300px]", className)} />;
};
