import React from "react";
import PriceRangeList from "./price-range-list";

export default function Sidebar() {
    return (
        <aside className="w-52 my-8 px-3 py-6 border border-secondary rounded-md text-sm">
            {/* Price Range */}
            <PriceRangeList />
        </aside>
    );
}
