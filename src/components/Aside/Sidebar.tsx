"use client";
import React from "react";
import PriceRangeList from "./price-range-list";
import { Skeleton } from "../ui/skeleton";
import SubCategoryList from "./sub-category-list";
import { Separator } from "../ui/separator";
import FilterClear from "./filter-clear";

export default function Sidebar() {
    return (
        <aside className="w-52 my-8 space-y-4 px-3 py-6 border border-secondary rounded-md text-sm">
            {/* Price Range */}
            <PriceRangeList />
            <Separator />
            <SubCategoryList />
            <Separator />
            <FilterClear />
        </aside>
    );
}

export function SidebarSkeleton() {
    return <Skeleton className="w-52 rounded-md my-8" />;
}
