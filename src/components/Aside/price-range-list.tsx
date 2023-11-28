"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import useFilters from "@/hooks/filterHooks/useFilters";

export default function PriceRangeList() {
    const { currentParams, setParam, getParam } = useFilters();

    const [prices, setPrices] = useState({
        minPrice: getParam("minPrice") || 0,
        maxPrice: getParam("maxPrice") || 0,
    });

    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrices((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const HandleFilter = () => {
        const _maxPrice = Math.max(
            Number(prices.minPrice),
            Number(prices.maxPrice)
        );
        const _minPrice = Math.min(
            Number(prices.minPrice),
            Number(prices.maxPrice)
        );

        const filterObject = {
            minPrice: _minPrice,
            maxPrice: _maxPrice,
        };

        setPrices(filterObject);
        setParam({
            minPrice: filterObject.minPrice.toString(),
            maxPrice: filterObject.maxPrice.toString(),
        });
    };
    return (
        <div className="space-y-2">
            <p>Fiyat Aralığı</p>
            <div className="flex justify-between gap-2">
                <Input
                    placeholder="En az"
                    type="number"
                    name="minPrice"
                    className="text-xs py-1.5 px-2"
                    min={0}
                    value={prices.minPrice || undefined}
                    onChange={handlePrice}
                />
                <Input
                    placeholder="En Çok"
                    type="number"
                    name="maxPrice"
                    className="text-xs py-1.5 px-2 "
                    min={0}
                    value={prices.maxPrice || undefined}
                    onChange={handlePrice}
                />
                <div>
                    <Button size={"icon"} onClick={HandleFilter}>
                        <Search size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
